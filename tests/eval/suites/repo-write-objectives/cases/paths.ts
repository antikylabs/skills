/** Fixtures and skill name for the Antiky objective-conventions suite. */

import { fixture, SKILLS } from "../../types.ts";

export const SKILL = SKILLS.repoObjectives;

export const OBJECTIVES_ROOT = fixture("repo-write-objectives", "docs/objectives");
export const TOWN = fixture("repo-write-objectives", "docs/objectives/town-lighting");
export const GOAL = fixture(
  "repo-write-objectives",
  "docs/objectives/town-lighting/goals/execute-goal-00.md",
);
