/** Fixtures and skill name for the objectives suite. */

import { fixture, SKILLS } from "../types.ts";

export const SKILL = SKILLS.objectives;

/** An active objective with a roadmap, for planning and archiving questions. */
export const ROADMAP = fixture("team-write-objectives", "roadmap.md");

/** A raw objective.md with intent but no research and no plan behind it yet. */
export const OBJECTIVE = fixture("team-write-objectives", "objective.md");

/** A simple (un-nested) goal folder, for the smaller-scale lifecycle. */
export const SIMPLE_GOAL = fixture("team-write-objectives", "goals/inspection-json-flag/goal.md");
