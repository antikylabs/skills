/**
 * Skill-behavior eval: the host-side orchestrator.
 *
 * This process does the bookkeeping — selecting cases, spawning containers,
 * collecting traces, writing logs and reports. It never loads the pi SDK. Every
 * agent run happens inside a container, and there is no host fallback.
 *
 *   npm run test:skill-behavior         # faux provider: deterministic, free
 *   npm run test:skill-behavior:live    # real model over OpenRouter
 *   npm run test:skill-behavior:paired  # live, with a without-skill baseline
 *
 * Every run writes logs and reports to eval/runs/<id>/, which is gitignored.
 * EVAL_TAIL=1 streams the pi event log to the console while it runs.
 *
 * Run `npm run test:sandbox` first. A green result here means nothing unless
 * the assertions have been shown capable of failing.
 */

import { select, selectorHelp, toolPath } from "./suites/index.ts";
import {
  detectRuntime,
  runBatchInSandbox,
  ensureImage,
  openRunLog,
  runInSandbox,
  systemPrompt,
  thinkingLevel,
} from "./container.ts";
import { renderReport, writeReportFiles, type ArmResult, type CaseResult } from "./report.ts";
import { concurrency, mapLimit } from "./pool.ts";
import { buildShamSkills } from "./sham.ts";

const PROVIDER = (process.env.EVAL_PROVIDER ?? "faux") as "faux" | "openrouter";
const MODEL_ID = "deepseek/deepseek-v4-flash-0731";
// A baseline arm doubles the spend, so it is opt-in — and meaningless on faux,
// where the responses are scripted regardless of what the agent can see.
const PAIRED = process.env.EVAL_BASELINE === "1" && PROVIDER !== "faux";
// The third arm: same catalog, generic bodies. Isolates what the writing is
// worth from what merely having a document is worth. Live-only for the same
// reason the baseline is — a scripted response ignores what the agent can see.
const SHAM = process.env.EVAL_SHAM === "1" && PROVIDER !== "faux";
/**
 * Runs per arm per case; the reported verdict is the majority.
 *
 * Repeats multiply the bill: three arms at five repeats is fifteen container
 * runs per case. Left at 1 unless asked, and worth raising only when a number
 * is going to be quoted somewhere.
 */
const REPEAT = Math.max(1, Number(process.env.EVAL_REPEAT ?? "1") || 1);

async function main(): Promise<number> {
  const selected = select(process.env.EVAL_ONLY);
  if (selected.length === 0) {
    process.stderr.write(`no case matched EVAL_ONLY=${process.env.EVAL_ONLY}\n\n${selectorHelp()}\n`);
    return 2;
  }

  const runtime = detectRuntime();
  ensureImage(runtime, process.env.EVAL_REBUILD === "1");

  const started = Date.now();
  const stamp = new Date(started).toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const log = openRunLog(PROVIDER === "faux" ? "faux" : MODEL_ID.replace(/\//g, "-"), stamp);
  const thinking = thinkingLevel();

  const promptWith = systemPrompt(true);
  const promptWithout = systemPrompt(false);
  const shamDir = SHAM ? buildShamSkills() : undefined;

  log.note(
    `\nskill-behavior eval — runtime=${runtime} provider=${PROVIDER}` +
      (PROVIDER === "openrouter" ? ` model=${MODEL_ID} thinking=${thinking}` : " (deterministic)") +
      (PAIRED ? " +baseline" : "") +
      (SHAM ? " +sham" : "") +
      (REPEAT > 1 ? ` repeat=${REPEAT}` : "") +
      `\nlogs: ${log.dir}\n${"─".repeat(78)}`,
  );

  type Arm = "with-skill" | "no-skill" | "sham";
  const arms: Arm[] = [
    "with-skill",
    ...(PAIRED ? ["no-skill" as const] : []),
    ...(SHAM ? ["sham" as const] : []),
  ];
  const limit = concurrency();
  log.note(
    `  running ${selected.length} case${selected.length === 1 ? "" : "s"} × ${arms.length} arm${
      arms.length === 1 ? "" : "s"
    }${REPEAT > 1 ? ` × ${REPEAT} repeats` : ""}, ${limit} at a time\n`,
  );

  const skillsDirFor = (arm: Arm): string | undefined => {
    if (arm === "sham") return shamDir;
    return undefined;
  };

  const runOnce = async (
    testCase: (typeof selected)[number],
    arm: Arm,
    attempt: number,
  ): Promise<ArmResult> => {
    const suffix = REPEAT > 1 ? `${arm}-${attempt + 1}` : arm;
    const trace = await runInSandbox(runtime, {
      prompt: testCase.prompt,
      provider: PROVIDER,
      modelId: MODEL_ID,
      systemPrompt: arm === "no-skill" ? promptWithout : promptWith,
      thinkingLevel: thinking,
      withSkill: arm !== "no-skill",
      shamSkillsDir: skillsDirFor(arm),
      // A live run must not be handed the scripted answer.
      script: PROVIDER === "faux" ? testCase.script : undefined,
      logFile: log.casePath(testCase.id, suffix, "log"),
    });
    // An assertion is arbitrary user code running on a trace that may be
    // partial. A throw here used to abort the whole run — and on a paid live
    // suite that means losing every case that had already completed.
    let verdict;
    try {
      verdict = trace.error ? { passed: false, detail: trace.error } : testCase.assert(trace);
    } catch (error) {
      verdict = { passed: false, detail: `assertion threw: ${String(error).slice(0, 160)}` };
    }
    return {
      verdict,
      usage: (trace as { usage?: ArmResult["usage"] }).usage,
      toolPath: toolPath(trace),
      finalText: (trace.finalText ?? "").slice(0, 4000),
      error: trace.error,
    };
  };

  /**
   * Run one arm `REPEAT` times and reduce to a majority verdict.
   *
   * The representative detail and tool path come from a run that agreed with
   * the majority, so a report never shows a passing verdict beside the trace of
   * a failing run.
   */
  const runArm = async (testCase: (typeof selected)[number], arm: Arm): Promise<ArmResult> => {
    if (REPEAT === 1) return await runOnce(testCase, arm, 0);
    const runs = await Promise.all(
      Array.from({ length: REPEAT }, (_, i) => runOnce(testCase, arm, i)),
    );
    const passed = runs.filter((r) => r.verdict.passed).length;
    const majority = passed * 2 > REPEAT;
    const representative = runs.find((r) => r.verdict.passed === majority) ?? runs[0]!;
    return { ...representative, repeats: { total: REPEAT, passed } };
  };

  /** One unit of work: a case, an arm, and which repeat it is. */
  interface Slot {
    testCase: (typeof selected)[number];
    caseIndex: number;
    arm: Arm;
    attempt: number;
  }

  const slots: Slot[] = [];
  for (const [caseIndex, testCase] of selected.entries()) {
    for (const arm of arms) {
      for (let attempt = 0; attempt < REPEAT; attempt++) {
        slots.push({ testCase, caseIndex, arm, attempt });
      }
    }
  }

  const verdictFor = (testCase: Slot["testCase"], trace: Parameters<typeof toolPath>[0]): ArmResult => {
    // An assertion is arbitrary user code running on a trace that may be
    // partial. A throw here used to abort the whole run — and on a paid live
    // suite that means losing every case that had already completed.
    let verdict;
    try {
      verdict = trace.error ? { passed: false, detail: trace.error } : testCase.assert(trace);
    } catch (error) {
      verdict = { passed: false, detail: `assertion threw: ${String(error).slice(0, 160)}` };
    }
    return {
      verdict,
      usage: (trace as { usage?: ArmResult["usage"] }).usage,
      toolPath: toolPath(trace),
      finalText: (trace.finalText ?? "").slice(0, 4000),
      error: trace.error,
    };
  };

  /**
   * Run a group of slots as one batched container.
   *
   * Grouped by whether the arm needs the sham `/skills` mount, because that is a
   * container-level mount and cannot vary per job inside one. Everything else
   * shares a container, which is the point: the concurrency ceiling stops being
   * VM memory divided by the size of a Node process.
   */
  const results: CaseResult[] = await (async () => {
    const armResults = new Map<string, ArmResult[]>();
    const key = (caseIndex: number, arm: Arm) => `${caseIndex}:${arm}`;

    const grouped = new Map<string, { skillsDir?: string; slots: Slot[] }>();
    for (const slot of slots) {
      const skillsDir = skillsDirFor(slot.arm);
      const groupKey = skillsDir ?? "<baked-in>";
      const group = grouped.get(groupKey) ?? { skillsDir, slots: [] };
      group.slots.push(slot);
      grouped.set(groupKey, group);
    }
    const groups = [...grouped.values()];

    let landed = 0;
    for (const group of groups) {
      const traces = await runBatchInSandbox(runtime, {
        jobs: group.slots.map((s) => ({
          id: s.testCase.id,
          prompt: s.testCase.prompt,
          systemPrompt: s.arm === "no-skill" ? promptWithout : promptWith,
          withSkill: s.arm !== "no-skill",
          script: PROVIDER === "faux" ? s.testCase.script : undefined,
        })),
        provider: PROVIDER,
        modelId: MODEL_ID,
        thinkingLevel: thinking,
        concurrency: limit,
        shamSkillsDir: group.skillsDir,
        logFor: (_job, index) => {
          const s = group.slots[index];
          return s ? log.casePath(s.testCase.id, REPEAT > 1 ? `${s.arm}-${s.attempt + 1}` : s.arm, "log") : undefined;
        },
        onResult: (index) => {
          const s = group.slots[index];
          if (!s) return;
          landed += 1;
          if (landed % 10 === 0 || landed === slots.length) {
            log.note(`  ${String(landed).padStart(4)}/${slots.length} runs complete`);
          }
        },
      });

      for (const [index, s] of group.slots.entries()) {
        const list = armResults.get(key(s.caseIndex, s.arm)) ?? [];
        list.push(verdictFor(s.testCase, traces[index]!));
        armResults.set(key(s.caseIndex, s.arm), list);
      }
    }

    /** Collapse a case's repeats into one verdict: the majority. */
    const reduce = (runs: ArmResult[] | undefined): ArmResult | undefined => {
      if (!runs || runs.length === 0) return undefined;
      if (runs.length === 1) return runs[0];
      const passed = runs.filter((r) => r.verdict.passed).length;
      const majority = passed * 2 > runs.length;
      const representative = runs.find((r) => r.verdict.passed === majority) ?? runs[0]!;
      return { ...representative, repeats: { total: runs.length, passed } };
    };

    return selected.map((testCase, caseIndex) => {
      const withSkill = reduce(armResults.get(key(caseIndex, "with-skill")))!;
      const withoutSkill = reduce(armResults.get(key(caseIndex, "no-skill")));
      const sham = reduce(armResults.get(key(caseIndex, "sham")));

      const mark = withSkill.verdict.passed ? "PASS" : "FAIL";
      const other = (label: string, r?: ArmResult) => {
        if (!r) return "";
        const repeats = r.repeats ? ` [${r.repeats.passed}/${r.repeats.total}]` : "";
        return `  ${label}: ${r.verdict.passed ? "pass" : "fail"}${repeats}`;
      };
      const stability = withSkill.repeats ? ` [${withSkill.repeats.passed}/${withSkill.repeats.total}]` : "";
      log.note(
        `  ${String(caseIndex + 1).padStart(3)}/${selected.length}  ${mark}${stability}  ${testCase.suite}/${testCase.id}\n` +
          `           ${withSkill.verdict.detail}${other("baseline", withoutSkill)}${other("sham", sham)}\n` +
          `           tools: ${withSkill.toolPath}`,
      );

      return { testCase, withSkill, withoutSkill, sham };
    });
  })();

  const report = renderReport({
    results,
    provider: PROVIDER,
    modelId: MODEL_ID,
    thinking,
    runtime,
    paired: PAIRED,
    runId: log.id,
    durationMs: Date.now() - started,
  });

  log.note(report);
  writeReportFiles(
    log.dir,
    {
      results, provider: PROVIDER, modelId: MODEL_ID, thinking, runtime,
      paired: PAIRED, runId: log.id, durationMs: Date.now() - started,
    },
    report,
  );

  return results.every((r) => r.withSkill.verdict.passed) ? 0 : 1;
}

process.exitCode = await main();
