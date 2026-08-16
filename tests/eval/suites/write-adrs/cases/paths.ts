/** Fixtures and skill name for the ADR suite. */

import { fixture, SKILLS } from "../../types.ts";

export const SKILL = SKILLS.adr;

/** The ADR tree root, with framework/ and cli/ areas carrying separate sequences. */
export const ADR_ROOT = fixture("write-adrs", "");

/** An accepted record in the framework area, for supersede-versus-edit questions. */
export const ACCEPTED = fixture("write-adrs", "framework/0002-accepted-decision_H.md");

/** A decision described in prose, waiting to be written up as an ADR. */
export const PROPOSAL = fixture("write-adrs", "decision-notes.md");
