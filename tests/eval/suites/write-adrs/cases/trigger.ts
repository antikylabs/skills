import {
  type EvalCase,
  SKILLS,
  nearMiss,
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
      tool("read_file", { path: `/skills/general/${SKILL}/SKILL.md` }),
      tool("read_file", { path: PROPOSAL }),
      text("Loaded the ADR skill. Drafting the five-part record."),
    ],
    negativeControl: nearMiss(
      "an agent that reads the notes, writes a well-formed record, and never opens the skill",
      [
        tool("read_file", { path: PROPOSAL }),
        text(
          "# 0022: Keep BroMetal behind the render driver\n\n" +
            "## Status\n\nAccepted\n\n## Context\n\nThe renderer had grown direct BroMetal calls.\n\n" +
            "## Decision\n\nAll BroMetal access goes through the render driver.",
        ),
      ],
    ),
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
      tool("read_file", { path: `/skills/general/${SKILL}/SKILL.md` }),
      text("An accepted decision is not edited in place. Write a new ADR and mark the old one Superseded."),
    ],
    negativeControl: nearMiss(
      "an agent that reads the record, gets the shape of the answer right, and never opens the skill",
      [
        tool("read_file", { path: ACCEPTED }),
        text(
          "That record is Accepted, so I would update its Status and rewrite the Decision section " +
            "to match what we now believe.",
        ),
      ],
    ),
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
      tool("read_file", { path: `/skills/general/${SKILL}/SKILL.md` }),
      tool("read_file", { path: PROPOSAL }),
      text("Drafting the ADR."),
    ],
    negativeControl: {
      reason: "an agent that reaches for the language skill when asked to author a record",
      trace: {
        toolCalls: [{ name: "read_file", args: { path: `/skills/general/${SKILLS.ste}/SKILL.md` }, blocked: false }],
        finalText: "Loaded the STE skill to write the ADR.",
      },
    },
  },
];
