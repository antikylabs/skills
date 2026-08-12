/** Fixtures and skill name for the ASD-STE100 suite. */

import { fixture, SKILLS } from "../../types.ts";

export const SKILL = SKILLS.ste;

/** A procedure with many deliberate STE violations. */
export const DRAFT = fixture("general-simplified-technical-english", "draft-procedure.md");

/** A procedure the linter reports nothing on — the compliance-claim trap. */
export const CLEAN = fixture("general-simplified-technical-english", "clean-procedure.md");

/** An accepted, human-owned record. Editing it needs the owner's instruction. */
export const HUMAN_OWNED = fixture("general-simplified-technical-english", "0001-example-decision_H.md");
