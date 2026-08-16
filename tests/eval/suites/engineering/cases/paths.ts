/** Fixtures and skill name for the engineering-sidekick suite. */

import { fixture, SKILLS } from "../../types.ts";

export const SKILL = SKILLS.engineering;

/** A small, well-reasoned proposal. The correct verdict is "build it". */
export const SOUND = fixture("engineering", "sound-proposal.md");

/** A plugin system for a two-case problem. Rung 1 of the ladder. */
export const OVERBUILT = fixture("engineering", "overbuilt-proposal.md");

/** A problem statement that is already clear. talk-it-out should stop. */
export const CLEAR = fixture("engineering", "clear-problem.md");

/** Simplification that would remove validation at a trust boundary. */
export const VALIDATION = fixture("engineering", "validation-shortcut.md");
