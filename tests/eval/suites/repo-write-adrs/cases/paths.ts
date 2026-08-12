/** Fixtures and skill name for the Antiky ADR-conventions suite. */

import { fixture, SKILLS } from "../../types.ts";

export const SKILL = SKILLS.repoAdrs;

/** framework/ holds 0001–0002; cli/ holds 0001–0005. Per-area gives 0003, global gives 0006. */
export const ADR_ROOT = fixture("repo-write-adrs", "");
export const PROPOSAL = fixture("repo-write-adrs", "decision-notes.md");
export const ACCEPTED = fixture("repo-write-adrs", "framework/0002-accepted-decision_H.md");
