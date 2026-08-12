/**
 * ADR trigger cases — routing for `general-write-adrs`.
 *
 * The skill body is still a stub, so there is no procedure to evaluate yet.
 * The description is not a stub, and routing is decided entirely by it, so
 * these cases are meaningful now and will keep their value once the body
 * lands.
 *
 * The collision cases matter most. `general-write-adrs` and
 * `general-simplified-technical-english` both plausibly match "review this ADR",
 * and nothing in either description currently separates them. If these fail,
 * the fix is a description change, not a case change.
 */

import {
  type EvalCase,
  SKILLS,
  saying,
  skillInvoked,
  text,
  tool,
  toolPath,
} from "../../types.ts";
import { ACCEPTED, PROPOSAL, SKILL } from "./paths.ts";

export const TRIGGER_CASES: EvalCase[] = [
  {
    id: "adr-trigger-write-new",
    kind: "trigger",
    prompt: `We decided to keep BroMetal behind the render driver. Write that up as an ADR. My notes are in ${PROPOSAL}.`,
    expectation: `invokes ${SKILL}`,
    assert: (t) => ({
      passed: skillInvoked(t, SKILL),
      detail: skillInvoked(t, SKILL) ? "skill invoked" : `skill not invoked; tools: ${toolPath(t)}`,
    }),
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("read_file", { path: PROPOSAL }),
      text("Loaded the ADR skill. Drafting the five-part record."),
    ],
    negativeControl: {
      reason: "an agent that writes an ADR freehand without loading the skill",
      trace: saying("# 0022: Keep BroMetal behind the render driver\n\nStatus: Accepted"),
    },
  },

  {
    id: "adr-trigger-supersede",
    kind: "trigger",
    prompt: `${ACCEPTED} is out of date — we changed our minds. What is the correct way to record that?`,
    expectation: `invokes ${SKILL} for a supersede question`,
    assert: (t) => ({
      passed: skillInvoked(t, SKILL),
      detail: skillInvoked(t, SKILL) ? "skill invoked" : "skill not invoked",
    }),
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      text("An accepted decision is not edited in place. Write a new ADR and mark the old one Superseded."),
    ],
    negativeControl: {
      reason: "an agent that offers to edit the accepted record in place",
      trace: saying("I can update the Decision section of that file to reflect the new choice."),
    },
  },

  {
    id: "adr-trigger-not-ste",
    kind: "trigger",
    prompt: `Write a new ADR recording that we selected Rapier for CPU physics. Notes are in ${PROPOSAL}.`,
    expectation: `invokes ${SKILL}, not the language skill, for authoring work`,
    assert: (t) => {
      const adr = skillInvoked(t, SKILL);
      const ste = skillInvoked(t, SKILLS.ste);
      return {
        passed: adr && !ste,
        detail: !adr
          ? "ADR skill not invoked"
          : ste
            ? "also pulled in the STE skill for an authoring task"
            : "routed to the ADR skill alone",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("read_file", { path: PROPOSAL }),
      text("Drafting the ADR."),
    ],
    negativeControl: {
      reason: "an agent that reaches for the language skill when asked to author a record",
      trace: {
        toolCalls: [{ name: "read_file", args: { path: `/skills/${SKILLS.ste}/SKILL.md` }, blocked: false }],
        finalText: "Loaded the STE skill to write the ADR.",
      },
    },
  },
];
