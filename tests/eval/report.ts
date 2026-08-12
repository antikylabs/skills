/**
 * Eval reporting: cost, token accounting, and the with/without-skill assessment.
 *
 * The paired comparison is the point. A pass rate on its own says the cases are
 * satisfiable; the delta against a baseline that has the same tools but no skill
 * says whether the skill is doing the work.
 */

import fs from "node:fs";
import path from "node:path";
import type { EvalCase, Verdict } from "./suites/index.ts";

export interface UsageTotals {
  input: number;
  output: number;
  cacheRead: number;
  cacheWrite: number;
  reasoning: number;
  totalTokens: number;
  costUsd: number;
  turns: number;
}

export interface ArmResult {
  verdict: Verdict;
  usage?: UsageTotals;
  toolPath: string;
  /** What the agent actually said. Kept so a failure is diagnosable without re-running it. */
  finalText?: string;
  error?: string;
}

export interface CaseResult {
  testCase: EvalCase;
  withSkill: ArmResult;
  withoutSkill?: ArmResult;
}

export const zeroUsage = (): UsageTotals => ({
  input: 0, output: 0, cacheRead: 0, cacheWrite: 0,
  reasoning: 0, totalTokens: 0, costUsd: 0, turns: 0,
});

export function sumUsage(items: (UsageTotals | undefined)[]): UsageTotals {
  const total = zeroUsage();
  for (const u of items) {
    if (!u) continue;
    total.input += u.input;
    total.output += u.output;
    total.cacheRead += u.cacheRead;
    total.cacheWrite += u.cacheWrite;
    total.reasoning += u.reasoning;
    total.totalTokens += u.totalTokens;
    total.costUsd += u.costUsd;
    total.turns += u.turns;
  }
  return total;
}

const n = (value: number) => value.toLocaleString("en-US");
const usd = (value: number) => `$${value.toFixed(4)}`;
const pad = (text: string, width: number) => text.padEnd(width);
const padStart = (text: string, width: number) => text.padStart(width);

function delta(a: number, b: number): string {
  const d = a - b;
  if (d === 0) return "0";
  return `${d > 0 ? "+" : ""}${n(d)}`;
}

function ratio(a: number, b: number): string {
  if (b === 0) return a === 0 ? "—" : "∞";
  return `${(a / b).toFixed(2)}×`;
}

export interface ReportInput {
  results: CaseResult[];
  provider: string;
  modelId: string;
  thinking: string;
  runtime: string;
  paired: boolean;
  runId: string;
  durationMs: number;
}

/** The full end-of-run report. */
export function renderReport(input: ReportInput): string {
  const { results, paired } = input;
  const line = "─".repeat(78);
  const out: string[] = [];

  const withPass = results.filter((r) => r.withSkill.verdict.passed).length;
  const withoutPass = results.filter((r) => r.withoutSkill?.verdict.passed).length;
  const total = results.length;

  const withUsage = sumUsage(results.map((r) => r.withSkill.usage));
  const withoutUsage = sumUsage(results.map((r) => r.withoutSkill?.usage));

  out.push("", line, "EVAL REPORT", line);
  out.push(`  run          ${input.runId}`);
  out.push(`  runtime      ${input.runtime}`);
  out.push(`  provider     ${input.provider}${input.provider === "faux" ? " (deterministic)" : ""}`);
  if (input.provider !== "faux") {
    out.push(`  model        ${input.modelId}`);
    out.push(`  thinking     ${input.thinking}`);
  }
  out.push(`  duration     ${(input.durationMs / 1000).toFixed(1)}s`);
  out.push(`  cases        ${total}${paired ? " × 2 arms" : ""}`);

  // --- results -------------------------------------------------------------

  out.push("", "RESULTS");
  if (paired) {
    const pct = (v: number) => `${((v / total) * 100).toFixed(0)}%`;
    out.push(`  with skill      ${withPass}/${total}  (${pct(withPass)})`);
    out.push(`  without skill   ${withoutPass}/${total}  (${pct(withoutPass)})`);
    const d = withPass - withoutPass;
    out.push(`  skill delta     ${d > 0 ? "+" : ""}${d} cases  (${d >= 0 ? "+" : ""}${(((withPass - withoutPass) / total) * 100).toFixed(0)} pp)`);
  } else {
    out.push(`  passed          ${withPass}/${total}`);
  }

  // --- tokens --------------------------------------------------------------

  const anyUsage = withUsage.totalTokens > 0 || withoutUsage.totalTokens > 0;
  if (anyUsage) {
    out.push("", "TOKENS");
    if (paired) {
      out.push(`  ${pad("", 14)}${padStart("with skill", 14)}${padStart("without", 14)}${padStart("delta", 14)}${padStart("ratio", 8)}`);
      const row = (label: string, a: number, b: number) =>
        out.push(`  ${pad(label, 14)}${padStart(n(a), 14)}${padStart(n(b), 14)}${padStart(delta(a, b), 14)}${padStart(ratio(a, b), 8)}`);
      row("input", withUsage.input, withoutUsage.input);
      row("output", withUsage.output, withoutUsage.output);
      row("cache read", withUsage.cacheRead, withoutUsage.cacheRead);
      row("cache write", withUsage.cacheWrite, withoutUsage.cacheWrite);
      row("reasoning", withUsage.reasoning, withoutUsage.reasoning);
      row("total", withUsage.totalTokens, withoutUsage.totalTokens);
      out.push(`  ${pad("llm turns", 14)}${padStart(n(withUsage.turns), 14)}${padStart(n(withoutUsage.turns), 14)}${padStart(delta(withUsage.turns, withoutUsage.turns), 14)}`);
    } else {
      const row = (label: string, v: number) => out.push(`  ${pad(label, 14)}${padStart(n(v), 14)}`);
      row("input", withUsage.input);
      row("output", withUsage.output);
      row("cache read", withUsage.cacheRead);
      row("cache write", withUsage.cacheWrite);
      row("reasoning", withUsage.reasoning);
      row("total", withUsage.totalTokens);
      row("llm turns", withUsage.turns);
    }

    // --- cost --------------------------------------------------------------

    out.push("", "COST (USD)");
    if (paired) {
      out.push(`  ${pad("with skill", 14)}${padStart(usd(withUsage.costUsd), 14)}`);
      out.push(`  ${pad("without skill", 14)}${padStart(usd(withoutUsage.costUsd), 14)}`);
      out.push(`  ${pad("run total", 14)}${padStart(usd(withUsage.costUsd + withoutUsage.costUsd), 14)}`);
      if (total > 0) {
        out.push(`  ${pad("per case", 14)}${padStart(usd((withUsage.costUsd + withoutUsage.costUsd) / total), 14)}`);
      }
    } else {
      out.push(`  ${pad("run total", 14)}${padStart(usd(withUsage.costUsd), 14)}`);
    }
  } else if (input.provider !== "faux") {
    out.push("", "TOKENS", "  no usage reported by the provider");
  }

  // --- assessment ----------------------------------------------------------

  out.push("", "ASSESSMENT");
  out.push(...assess(input, withUsage, withoutUsage));

  out.push(line, "");
  return out.join("\n");
}

function assess(input: ReportInput, withUsage: UsageTotals, withoutUsage: UsageTotals): string[] {
  const { results, paired } = input;
  const out: string[] = [];
  const total = results.length;

  const failed = results.filter((r) => !r.withSkill.verdict.passed);

  if (!paired) {
    out.push(
      input.provider === "faux"
        ? "  Deterministic run: this exercises the harness, not a model. It cannot say"
        : "  Single-arm run: no baseline, so this cannot say",
    );
    out.push("  whether the skill helps. Run with EVAL_BASELINE=1 for the paired comparison.");
    if (failed.length > 0) {
      out.push("", `  ${failed.length} failing:`);
      for (const r of failed) out.push(`    - ${r.testCase.id}: ${r.withSkill.verdict.detail}`);
    }
    return out;
  }

  const onlyWith = results.filter((r) => r.withSkill.verdict.passed && !r.withoutSkill?.verdict.passed);
  const onlyWithout = results.filter((r) => !r.withSkill.verdict.passed && r.withoutSkill?.verdict.passed);
  const bothPass = results.filter((r) => r.withSkill.verdict.passed && r.withoutSkill?.verdict.passed);
  const neither = results.filter((r) => !r.withSkill.verdict.passed && !r.withoutSkill?.verdict.passed);

  const tokenRatio = withoutUsage.totalTokens > 0 ? withUsage.totalTokens / withoutUsage.totalTokens : 0;
  const costRatio = withoutUsage.costUsd > 0 ? withUsage.costUsd / withoutUsage.costUsd : 0;

  if (onlyWith.length > 0) {
    out.push(`  The skill carried ${onlyWith.length} case${onlyWith.length === 1 ? "" : "s"} the baseline failed:`);
    for (const r of onlyWith) out.push(`    + ${r.testCase.id} — ${r.testCase.expectation}`);
  } else {
    out.push("  No case passed with the skill that failed without it.");
    out.push("  On this set the skill is not yet demonstrating value.");
  }

  if (onlyWithout.length > 0) {
    out.push("", `  REGRESSION — ${onlyWithout.length} case${onlyWithout.length === 1 ? "" : "s"} the skill made worse:`);
    for (const r of onlyWithout) out.push(`    - ${r.testCase.id}: ${r.withSkill.verdict.detail}`);
  }

  if (bothPass.length > 0) {
    out.push("", `  ${bothPass.length} case${bothPass.length === 1 ? "" : "s"} passed in both arms. These measure nothing about`);
    out.push("  the skill — the baseline already satisfies them. Consider sharpening");
    out.push("  them or accepting them as regression guards:");
    for (const r of bothPass) out.push(`    = ${r.testCase.id}`);
  }

  if (neither.length > 0) {
    out.push("", `  ${neither.length} case${neither.length === 1 ? "" : "s"} failed in both arms — the skill does not address them:`);
    for (const r of neither) out.push(`    ! ${r.testCase.id}: ${r.withSkill.verdict.detail}`);
  }

  if (tokenRatio > 0) {
    out.push("", `  Cost of the skill: ${tokenRatio.toFixed(2)}× the tokens and ${costRatio.toFixed(2)}× the spend`);
    out.push(`  of the baseline, for ${onlyWith.length - onlyWithout.length >= 0 ? "+" : ""}${onlyWith.length - onlyWithout.length} net case${Math.abs(onlyWith.length - onlyWithout.length) === 1 ? "" : "s"}.`);
    if (withUsage.cacheRead === 0 && withUsage.input > 50_000) {
      out.push("  No cache reads: every run paid full price for the skill text. A provider");
      out.push("  or prompt layout that caches the system prompt would cut this materially.");
    }
  }

  const errored = results.filter((r) => r.withSkill.error || r.withoutSkill?.error);
  if (errored.length > 0) {
    out.push("", `  ${errored.length} case${errored.length === 1 ? "" : "s"} errored rather than failing an assertion:`);
    for (const r of errored) {
      out.push(`    ? ${r.testCase.id}: ${(r.withSkill.error ?? r.withoutSkill?.error ?? "").slice(0, 90)}`);
    }
  }

  void total;
  return out;
}

/** The same report as Markdown, for pasting into a PR or an objective summary. */
export function renderMarkdown(input: ReportInput): string {
  const { results, paired } = input;
  const out: string[] = [];

  const withPass = results.filter((r) => r.withSkill.verdict.passed).length;
  const withoutPass = results.filter((r) => r.withoutSkill?.verdict.passed).length;
  const total = results.length;
  const withUsage = sumUsage(results.map((r) => r.withSkill.usage));
  const withoutUsage = sumUsage(results.map((r) => r.withoutSkill?.usage));

  out.push(`# Skill-behavior eval — ${input.runId}`, "");

  out.push("| | |", "| --- | --- |");
  out.push(`| Runtime | \`${input.runtime}\` |`);
  out.push(`| Provider | \`${input.provider}\`${input.provider === "faux" ? " (deterministic)" : ""} |`);
  if (input.provider !== "faux") {
    out.push(`| Model | \`${input.modelId}\` |`);
    out.push(`| Thinking | \`${input.thinking}\` |`);
  }
  out.push(`| Duration | ${(input.durationMs / 1000).toFixed(1)}s |`);
  out.push(`| Cases | ${total}${paired ? " × 2 arms" : ""} |`);
  out.push("");

  // --- results -----------------------------------------------------------

  out.push("## Results", "");
  const pct = (v: number) => `${((v / total) * 100).toFixed(0)}%`;
  if (paired) {
    const d = withPass - withoutPass;
    out.push("| Arm | Passed | Rate |", "| --- | ---: | ---: |");
    out.push(`| With skill | ${withPass}/${total} | ${pct(withPass)} |`);
    out.push(`| Without skill | ${withoutPass}/${total} | ${pct(withoutPass)} |`);
    out.push(`| **Delta** | **${d > 0 ? "+" : ""}${d}** | **${d > 0 ? "+" : ""}${(((withPass - withoutPass) / total) * 100).toFixed(0)} pp** |`);
  } else {
    out.push(`**${withPass}/${total} passed** (${pct(withPass)})`);
  }
  out.push("");

  // --- per case ----------------------------------------------------------

  out.push("### Cases", "");
  out.push(
    paired
      ? "| Suite | Case | With | Without | Detail |"
      : "| Suite | Case | Result | Detail |",
  );
  out.push(paired ? "| --- | --- | :---: | :---: | --- |" : "| --- | --- | :---: | --- |");
  const tick = (ok: boolean | undefined) => (ok === undefined ? "—" : ok ? "✅" : "❌");
  for (const r of results) {
    const detail = r.withSkill.verdict.detail.replace(/\|/g, "\\|").slice(0, 90);
    out.push(
      paired
        ? `| ${r.testCase.suite} | \`${r.testCase.id}\` | ${tick(r.withSkill.verdict.passed)} | ${tick(r.withoutSkill?.verdict.passed)} | ${detail} |`
        : `| ${r.testCase.suite} | \`${r.testCase.id}\` | ${tick(r.withSkill.verdict.passed)} | ${detail} |`,
    );
  }
  out.push("");

  // --- tokens and cost ---------------------------------------------------

  if (withUsage.totalTokens > 0 || withoutUsage.totalTokens > 0) {
    out.push("## Tokens", "");
    if (paired) {
      out.push("| | With skill | Without | Delta | Ratio |", "| --- | ---: | ---: | ---: | ---: |");
      const row = (label: string, a: number, b: number) =>
        out.push(`| ${label} | ${n(a)} | ${n(b)} | ${delta(a, b)} | ${ratio(a, b)} |`);
      row("input", withUsage.input, withoutUsage.input);
      row("output", withUsage.output, withoutUsage.output);
      row("cache read", withUsage.cacheRead, withoutUsage.cacheRead);
      row("cache write", withUsage.cacheWrite, withoutUsage.cacheWrite);
      row("reasoning", withUsage.reasoning, withoutUsage.reasoning);
      out.push(`| **total** | **${n(withUsage.totalTokens)}** | **${n(withoutUsage.totalTokens)}** | **${delta(withUsage.totalTokens, withoutUsage.totalTokens)}** | **${ratio(withUsage.totalTokens, withoutUsage.totalTokens)}** |`);
      out.push(`| llm turns | ${n(withUsage.turns)} | ${n(withoutUsage.turns)} | ${delta(withUsage.turns, withoutUsage.turns)} | |`);
      out.push("");
      out.push("## Cost", "");
      out.push("| | USD |", "| --- | ---: |");
      out.push(`| With skill | ${usd(withUsage.costUsd)} |`);
      out.push(`| Without skill | ${usd(withoutUsage.costUsd)} |`);
      out.push(`| **Run total** | **${usd(withUsage.costUsd + withoutUsage.costUsd)}** |`);
      out.push(`| Per case | ${usd((withUsage.costUsd + withoutUsage.costUsd) / Math.max(total, 1))} |`);
    } else {
      out.push("| | Tokens |", "| --- | ---: |");
      out.push(`| input | ${n(withUsage.input)} |`);
      out.push(`| output | ${n(withUsage.output)} |`);
      out.push(`| cache read | ${n(withUsage.cacheRead)} |`);
      out.push(`| cache write | ${n(withUsage.cacheWrite)} |`);
      out.push(`| reasoning | ${n(withUsage.reasoning)} |`);
      out.push(`| **total** | **${n(withUsage.totalTokens)}** |`);
      out.push("", `**Cost:** ${usd(withUsage.costUsd)}`);
    }
    out.push("");
  }

  // --- assessment --------------------------------------------------------

  out.push("## Assessment", "");
  if (!paired) {
    out.push(
      input.provider === "faux"
        ? "> Deterministic run. This exercises the harness, not a model, and cannot say whether the skill helps."
        : "> Single-arm run. No baseline, so this cannot attribute anything to the skill.",
      "",
      "Run with `EVAL_BASELINE=1` for the paired comparison.",
      "",
    );
    const failed = results.filter((r) => !r.withSkill.verdict.passed);
    if (failed.length > 0) {
      out.push(`### Failing (${failed.length})`, "");
      for (const r of failed) out.push(`- \`${r.testCase.id}\` — ${r.withSkill.verdict.detail}`);
    }
    return out.join("\n") + "\n";
  }

  const onlyWith = results.filter((r) => r.withSkill.verdict.passed && !r.withoutSkill?.verdict.passed);
  const onlyWithout = results.filter((r) => !r.withSkill.verdict.passed && r.withoutSkill?.verdict.passed);
  const bothPass = results.filter((r) => r.withSkill.verdict.passed && r.withoutSkill?.verdict.passed);
  const neither = results.filter((r) => !r.withSkill.verdict.passed && !r.withoutSkill?.verdict.passed);

  const section = (title: string, note: string, rows: typeof results, fmt: (r: CaseResult) => string) => {
    if (rows.length === 0) return;
    out.push(`### ${title} (${rows.length})`, "", note, "");
    for (const r of rows) out.push(fmt(r));
    out.push("");
  };

  section(
    "Carried by the skill", "Passed with the skill, failed without it. This is the skill's value.",
    onlyWith, (r) => `- ✅ \`${r.testCase.id}\` — ${r.testCase.expectation}`,
  );
  section(
    "Regressions", "**Passed without the skill, failed with it.** The skill made these worse.",
    onlyWithout, (r) => `- ⚠️ \`${r.testCase.id}\` — ${r.withSkill.verdict.detail}`,
  );
  section(
    "Passed in both arms", "These measure nothing about the skill — the baseline already satisfies them. Sharpen them, or keep them as regression guards.",
    bothPass, (r) => `- ➖ \`${r.testCase.id}\``,
  );
  section(
    "Failed in both arms", "The skill does not address these.",
    neither, (r) => `- ❌ \`${r.testCase.id}\` — ${r.withSkill.verdict.detail}`,
  );

  if (withoutUsage.totalTokens > 0) {
    const net = onlyWith.length - onlyWithout.length;
    out.push("### Cost of the skill", "");
    out.push(
      `${ratio(withUsage.totalTokens, withoutUsage.totalTokens)} the tokens and ` +
        `${ratio(withUsage.costUsd, withoutUsage.costUsd)} the spend of the baseline, ` +
        `for **${net >= 0 ? "+" : ""}${net} net case${Math.abs(net) === 1 ? "" : "s"}**.`,
      "",
    );
    if (net <= 0) {
      out.push(
        "> On this set the skill is not paying for itself. Either the cases do not",
        "> exercise what it teaches, or the instructions are not landing.",
        "",
      );
    }
  }

  return out.join("\n") + "\n";
}

/** Machine-readable report, written beside the logs. */
export function writeReportFiles(dir: string, input: ReportInput, text: string): void {
  fs.writeFileSync(path.join(dir, "report.md"), renderMarkdown(input));
  fs.writeFileSync(path.join(dir, "report.txt"), text);
  fs.writeFileSync(
    path.join(dir, "report.json"),
    JSON.stringify(
      {
        runId: input.runId,
        provider: input.provider,
        model: input.modelId,
        thinking: input.thinking,
        runtime: input.runtime,
        paired: input.paired,
        durationMs: input.durationMs,
        totals: {
          withSkill: sumUsage(input.results.map((r) => r.withSkill.usage)),
          withoutSkill: sumUsage(input.results.map((r) => r.withoutSkill?.usage)),
        },
        cases: input.results.map((r) => ({
          id: r.testCase.id,
          suite: r.testCase.suite,
          kind: r.testCase.kind,
          expectation: r.testCase.expectation,
          withSkill: {
            passed: r.withSkill.verdict.passed,
            detail: r.withSkill.verdict.detail,
            tools: r.withSkill.toolPath,
            finalText: r.withSkill.finalText,
            usage: r.withSkill.usage,
            error: r.withSkill.error,
          },
          withoutSkill: r.withoutSkill && {
            passed: r.withoutSkill.verdict.passed,
            detail: r.withoutSkill.verdict.detail,
            tools: r.withoutSkill.toolPath,
            finalText: r.withoutSkill.finalText,
            usage: r.withoutSkill.usage,
            error: r.withoutSkill.error,
          },
        })),
      },
      null,
      2,
    ),
  );
}
