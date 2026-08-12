/** Fixtures and skill name for the ADR suite. */

import { fixture, SKILLS } from "../types.ts";

export const SKILL = SKILLS.adr;

/** An accepted record, for supersede-versus-edit questions. */
export const ACCEPTED = fixture("team-write-adrs", "0002-accepted-decision_H.md");

/** A decision described in prose, waiting to be written up as an ADR. */
export const PROPOSAL = fixture("team-write-adrs", "decision-notes.md");
