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
const MODEL_ID = process.env.EVAL_MODEL ?? "openai/gpt-5.6-luna";
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

  const arms = ["with-skill", ...(PAIRED ? ["no-skill"] : []), ...(SHAM ? ["sham"] : [])] as const;
  const limit = concurrency();
  log.note(
    `  running ${selected.length} case${selected.length === 1 ? "" : "s"} × ${arms.length} arm${
      arms.length === 1 ? "" : "s"
    }${REPEAT > 1 ? ` × ${REPEAT} repeats` : ""}, ${limit} at a time\n`,
  );

  type Arm = (typeof arms)[number];

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
      shamSkillsDir: arm === "sham" ? shamDir : undefined,
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

  // Every arm of a case runs concurrently with the others and with other cases.
  // Results come back in input order, so the report is stable no matter what
  // order they finish in.
  let done = 0;
  const results: CaseResult[] = await mapLimit(selected, limit, async (testCase) => {
    const [withSkill, withoutSkill, sham] = await Promise.all([
      runArm(testCase, "with-skill"),
      PAIRED ? runArm(testCase, "no-skill") : Promise.resolve(undefined),
      SHAM ? runArm(testCase, "sham") : Promise.resolve(undefined),
    ]);

    // Printed on completion rather than in order: a live run is long, and
    // knowing which cases have landed is worth more than a tidy sequence.
    done += 1;
    const mark = withSkill.verdict.passed ? "PASS" : "FAIL";
    const other = (label: string, r?: ArmResult) => (r ? `  ${label}: ${r.verdict.passed ? "pass" : "fail"}` : "");
    const baseline = other("baseline", withoutSkill) + other("sham", sham);
    const stability = withSkill.repeats ? ` [${withSkill.repeats.passed}/${withSkill.repeats.total}]` : "";
    log.note(
      `  ${String(done).padStart(3)}/${selected.length}  ${mark}${stability}  ${testCase.suite}/${testCase.id}\n` +
        `           ${withSkill.verdict.detail}${baseline}\n` +
        `           tools: ${withSkill.toolPath}`,
    );

    return { testCase, withSkill, withoutSkill, sham };
  });

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
