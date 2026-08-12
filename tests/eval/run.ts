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

import { select, selectorHelp, toolPath } from "./cases/index.ts";
import {
  detectRuntime,
  ensureImage,
  openRunLog,
  runInSandbox,
  systemPrompt,
  thinkingLevel,
} from "./container.ts";
import { renderReport, writeReportFiles, type ArmResult, type CaseResult } from "./report.ts";

const PROVIDER = (process.env.EVAL_PROVIDER ?? "faux") as "faux" | "openrouter";
const MODEL_ID = process.env.EVAL_MODEL ?? "deepseek/deepseek-v4-flash";
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

  const results: CaseResult[] = [];
  let heading = "";

  for (const testCase of selected) {
    const current = `${testCase.suite} / ${testCase.kind}`;
    if (current !== heading) {
      heading = current;
      log.note(`\n  ${heading}`);
    }

    const runArm = async (withSkill: boolean): Promise<ArmResult> => {
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
      return {
        verdict: trace.error ? { passed: false, detail: trace.error } : testCase.assert(trace),
        usage: (trace as { usage?: ArmResult["usage"] }).usage,
        toolPath: toolPath(trace),
        error: trace.error,
      };
    };

    const withSkill = await runArm(true);
    const withoutSkill = PAIRED ? await runArm(false) : undefined;

    const mark = withSkill.verdict.passed ? "PASS" : "FAIL";
    const baseline = withoutSkill
      ? `  baseline: ${withoutSkill.verdict.passed ? "pass" : "fail"}`
      : "";
    log.note(
      `  ${mark}  ${testCase.id.padEnd(34)} ${withSkill.verdict.detail}${baseline}\n` +
        `        expected: ${testCase.expectation}\n` +
        `        tools:    ${withSkill.toolPath}`,
    );

    results.push({ testCase, withSkill, withoutSkill });
  }

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
