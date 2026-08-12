/**
 * Objectives trigger cases — routing for `team-write-objectives`.
 *
 * Body is a stub; the description is not. See the note in ../adr/trigger.ts —
 * the same reasoning applies, and the same collision risk exists between
 * planning work and ADR work.
 */

import { type EvalCase, SKILLS, saying, skillInvoked, text, tool, toolPath } from "../types.ts";
import { ROADMAP, SKILL } from "./paths.ts";

export const TRIGGER_CASES: EvalCase[] = [
  {
    id: "objectives-trigger-new-plan",
    kind: "trigger",
    prompt: "We are starting a new objective for the town lighting work. Set up its roadmap.",
    expectation: `invokes ${SKILL}`,
    assert: (t) => ({
      passed: skillInvoked(t, SKILL),
      detail: skillInvoked(t, SKILL) ? "skill invoked" : `skill not invoked; tools: ${toolPath(t)}`,
    }),
    script: [tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }), text("Loaded the objectives skill.")],
    negativeControl: {
      reason: "an agent that invents a plan format instead of loading the skill",
      trace: saying("Here is a roadmap:\n\n1. Research\n2. Prototype\n3. Ship"),
    },
  },

  {
    id: "objectives-trigger-archive",
    kind: "trigger",
    prompt: `The objective in ${ROADMAP} is finished. What do we do with the folder?`,
    expectation: `invokes ${SKILL} for archiving`,
    assert: (t) => ({
      passed: skillInvoked(t, SKILL),
      detail: skillInvoked(t, SKILL) ? "skill invoked" : "skill not invoked",
    }),
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("read_file", { path: ROADMAP }),
      text("A completed objective is replaced by one durable summary in _archives/."),
    ],
    negativeControl: {
      reason: "an agent that answers an archival-convention question from general habit",
      trace: saying("You could delete it, or move it to an old/ directory."),
    },
  },

  {
    id: "objectives-trigger-not-adr",
    kind: "trigger",
    prompt: "Plan the next three goals for the town objective and write them into the roadmap.",
    expectation: `invokes ${SKILL}, not the ADR skill, for planning work`,
    assert: (t) => {
      const objectives = skillInvoked(t, SKILL);
      const adr = skillInvoked(t, SKILLS.adr);
      return {
        passed: objectives && !adr,
        detail: !objectives
          ? "objectives skill not invoked"
          : adr
            ? "also pulled in the ADR skill for planning work"
            : "routed to the objectives skill alone",
      };
    },
    script: [tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }), text("Planning the goals.")],
    negativeControl: {
      reason: "an agent that treats a planning task as a decision record",
      trace: {
        toolCalls: [{ name: "read_file", args: { path: `/skills/${SKILLS.adr}/SKILL.md` }, blocked: false }],
        finalText: "Loaded the ADR skill to record the plan.",
      },
    },
  },
];
