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

const PROVIDER = (process.env.EVAL_PROVIDER ?? "faux") as "faux" | "openrouter";
const MODEL_ID = process.env.EVAL_MODEL ?? "openai/gpt-5.6-luna";
// A baseline arm doubles the spend, so it is opt-in — and meaningless on faux,
// where the responses are scripted regardless of what the agent can see.
const PAIRED = process.env.EVAL_BASELINE === "1" && PROVIDER !== "faux";

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

  log.note(
    `\nskill-behavior eval — runtime=${runtime} provider=${PROVIDER}` +
      (PROVIDER === "openrouter" ? ` model=${MODEL_ID} thinking=${thinking}` : " (deterministic)") +
      (PAIRED ? " +baseline" : "") +
      `\nlogs: ${log.dir}\n${"─".repeat(78)}`,
  );

  const limit = concurrency();
  log.note(`  running ${selected.length} case${selected.length === 1 ? "" : "s"}${PAIRED ? " × 2 arms" : ""}, ${limit} at a time\n`);

  const runArm = async (testCase: (typeof selected)[number], withSkill: boolean): Promise<ArmResult> => {
    const arm = withSkill ? "with-skill" : "no-skill";
    const trace = await runInSandbox(runtime, {
      prompt: testCase.prompt,
      provider: PROVIDER,
      modelId: MODEL_ID,
      systemPrompt: withSkill ? promptWith : promptWithout,
      thinkingLevel: thinking,
      withSkill,
      // A live run must not be handed the scripted answer.
      script: PROVIDER === "faux" ? testCase.script : undefined,
      logFile: log.casePath(testCase.id, arm, "log"),
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

  // Both arms of a case run concurrently with each other and with other cases.
  // Results come back in input order, so the report is stable no matter what
  // order they finish in.
  let done = 0;
  const results: CaseResult[] = await mapLimit(selected, limit, async (testCase) => {
    const [withSkill, withoutSkill] = await Promise.all([
      runArm(testCase, true),
      PAIRED ? runArm(testCase, false) : Promise.resolve(undefined),
    ]);

    // Printed on completion rather than in order: a live run is long, and
    // knowing which cases have landed is worth more than a tidy sequence.
    done += 1;
    const mark = withSkill.verdict.passed ? "PASS" : "FAIL";
    const baseline = withoutSkill ? `  baseline: ${withoutSkill.verdict.passed ? "pass" : "fail"}` : "";
    log.note(
      `  ${String(done).padStart(3)}/${selected.length}  ${mark}  ${testCase.suite}/${testCase.id}\n` +
        `           ${withSkill.verdict.detail}${baseline}\n` +
        `           tools: ${withSkill.toolPath}`,
    );

    return { testCase, withSkill, withoutSkill };
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
