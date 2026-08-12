/**
 * The eval case registry.
 *
 * One directory per skill under test, mirrored by one directory per skill under
 * fixtures/. Inside a suite, one file per concern.
 *
 *   cases/asdste100/{trigger,audit,fix,reporting}.ts
 *   cases/adr/trigger.ts
 *   cases/objectives/trigger.ts
 *
 * Register a suite here and it joins every runner, the self-test included —
 * which fails the build if any case lacks a working negative control.
 */

import type { CaseKind, EvalCase, Suite } from "./types.ts";
import { ASDSTE100_CASES } from "./asdste100/index.ts";
import { ADR_CASES } from "./adr/index.ts";
import { OBJECTIVES_CASES } from "./objectives/index.ts";

export * from "./types.ts";

export const SUITES = {
  asdste100: ASDSTE100_CASES,
  adr: ADR_CASES,
  objectives: OBJECTIVES_CASES,
} satisfies Record<Suite, EvalCase[]>;

export const SUITE_NAMES = Object.keys(SUITES) as Suite[];

export const CASES: EvalCase[] = Object.values(SUITES).flat();

export const bySuite = (suite: Suite): EvalCase[] => SUITES[suite] ?? [];

export const byKind = (kind: CaseKind): EvalCase[] => CASES.filter((c) => c.kind === kind);

export const byId = (id: string): EvalCase | undefined => CASES.find((c) => c.id === id);

const KINDS: CaseKind[] = ["trigger", "audit", "fix", "reporting", "write"];

/**
 * Resolve an EVAL_ONLY selector, in order of specificity:
 *   a case id            → that case
 *   a suite name         → every case for that skill
 *   a kind               → that kind across all suites
 *   "suite:kind"         → one kind within one suite
 *   undefined            → everything
 */
export function select(selector?: string): EvalCase[] {
  if (!selector) return CASES;

  const single = byId(selector);
  if (single) return [single];

  if (selector in SUITES) return bySuite(selector as Suite);

  if (KINDS.includes(selector as CaseKind)) return byKind(selector as CaseKind);

  if (selector.includes(":")) {
    const [suite, kind] = selector.split(":", 2);
    if (suite && suite in SUITES && kind) {
      return bySuite(suite as Suite).filter((c) => c.kind === kind);
    }
  }
  return [];
}

/** Selector help, printed when EVAL_ONLY matches nothing. */
export const selectorHelp = (): string =>
  [
    "Valid EVAL_ONLY values:",
    `  suites: ${SUITE_NAMES.join(", ")}`,
    `  kinds:  ${[...new Set(CASES.map((c) => c.kind))].join(", ")}`,
    "  scoped: asdste100:audit",
    "  or any case id",
  ].join("\n");

// --- registry invariants ---------------------------------------------------

const seen = new Set<string>();
for (const testCase of CASES) {
  if (seen.has(testCase.id)) throw new Error(`duplicate eval case id: ${testCase.id}`);
  seen.add(testCase.id);
  if (!testCase.suite) throw new Error(`case ${testCase.id} has no suite; wrap it with inSuite()`);
}
