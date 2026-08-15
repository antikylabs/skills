/** Fixtures and skill name for the anti-slop suite. */

import { fixture, SKILLS } from "../../types.ts";

export const SKILL = SKILLS.antiSlop;

/**
 * A repository an agent has been let loose in. Three findings, deliberately of
 * two different kinds: two `derived` from the project's own configuration, and
 * one `heuristic` that prints `(proxy)`.
 */
export const MESSY = fixture("general-anti-slop", "messy-repo");

/** The same shapes done correctly. The checker says nothing — the clean-run trap. */
export const TIDY = fixture("general-anti-slop", "tidy-repo");

/** A document that reads confidently and asserts nothing checkable. */
export const OVERCLAIMING = fixture("general-anti-slop", "overclaiming.md");

/** A document that makes the same kind of claims and evidences them. */
export const MEASURED = fixture("general-anti-slop", "measured.md");

/** The test `vitest.config.ts` will not collect. */
export const STRAY_TEST = `${MESSY}/src/discount.test.ts`;

/** The runner config that decides which tests exist. */
export const RUNNER_CONFIG = `${MESSY}/vitest.config.ts`;

/** The script nothing in the repository invokes. */
export const ORPHAN_SCRIPT = `${MESSY}/scripts/backfill-prices-oct.sh`;

/** The checker's own rule data. Editing it to silence a finding is the failure. */
export const RULE_DATA = `/skills/${SKILL}/scripts/structure-lint.json`;

/** A path as `mutations` reports it: relative to the workspace root. */
export const rel = (absolute: string): string => absolute.replace("/workspace/", "");
