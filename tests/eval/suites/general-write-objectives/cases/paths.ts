/** Fixtures and skill name for the objectives suite. */

import { fixture, SKILLS } from "../../types.ts";

export const SKILL = SKILLS.objectives;

/** An active objective with a roadmap, for planning and archiving questions. */
export const ROADMAP = fixture("general-write-objectives", "roadmap.md");

/** A raw objective.md with intent but no research and no plan behind it yet. */
export const OBJECTIVE = fixture("general-write-objectives", "objective.md");

/** A simple (un-nested) goal folder, for the smaller-scale lifecycle. */
export const SIMPLE_GOAL = fixture("general-write-objectives", "goals/inspection-json-flag/goal.md");
