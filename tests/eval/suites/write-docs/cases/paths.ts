/** Fixtures and skill name for the documentation-craft suite. */

import { fixture, SKILLS } from "../../types.ts";

export const SKILL = SKILLS.writeDocs;

/** Opens with identity and render bindings, then mixes all four types. */
export const POINT_LIGHT = fixture("write-docs", "point-light.md");

/** A tutorial that branches and explains — serving a first-timer and an expert. */
export const GETTING_STARTED = fixture("write-docs", "getting-started.md");

/** A clean how-to. Nothing wrong with it. */
export const CLEAN_HOWTO = fixture("write-docs", "change-light-at-runtime.md");
