/**
 * Simple-goal cases — the un-nested variant.
 *
 * The same lifecycle at smaller scale, under `objectives/goals/<goal-name>/`
 * rather than inside an objective. The failures worth catching are scaffolding
 * a full objective for a two-hour change, loosening the contract because the
 * work is small, and archiving to the wrong place.
 */

import { type EvalCase, mentions, saying, text, tool } from "../../types.ts";
import { SIMPLE_GOAL, SKILL } from "./paths.ts";

export const SIMPLE_GOAL_CASES: EvalCase[] = [
  {
    id: "objectives-simple-scale-chosen",
    kind: "write",
    prompt:
      "I want to add a --json flag to the inspection CLI. One flag, maybe half a day. Set that up as work.",
    expectation: "scaffolds a simple goal rather than a full objective",
    assert: (t) => {
      const simple = mentions(t, /simple goal|--simple|objectives\/goals\/|one bounded|goal\.md/i);
      const fullObjective = mentions(t, /objective\.md|create-plan|plan documents|research phase/i);
      return {
        passed: simple && !fullObjective,
        detail: fullObjective
          ? "scaffolded a full objective for a half-day change"
          : simple
            ? "chose the simple-goal scale"
            : "did not state which scale it chose",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      text(
        "This is one bounded deliverable, so it is a simple goal, not an objective. " +
          "Creating docs/objectives/goals/inspection-json-flag/goal.md.",
      ),
    ],
    negativeControl: {
      reason: "an agent that scaffolds a full objective, with research and plan phases, for one flag",
      trace: saying(
        "Created docs/objectives/inspection-json-flag/objective.md. Next run create-research, " +
          "then create-plan to produce the plan documents.",
      ),
    },
  },

  {
    id: "objectives-simple-keeps-full-contract",
    kind: "write",
    prompt: `Write the goal contract for ${SIMPLE_GOAL}. It is small, so keep it brief.`,
    expectation: "keeps the full contract sections even though the work is small",
    assert: (t) => {
      const sections = [
        /completion definition|complete only when/i,
        /non-goal|do not/i,
        /test|evidence|prove/i,
      ].filter((re) => re.test(t.finalText)).length;
      return {
        passed: sections >= 2,
        detail:
          sections >= 2
            ? `kept ${sections} of the contract sections`
            : "dropped the contract because the work is small",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      text(
        "Smaller in scope, not looser in contract.\n\n## Required tests and evidence\n\n" +
          "At minimum, prove: --json emits parseable JSON for every subcommand.\n\n" +
          "## Explicit non-goals\n\nDo not change the human-readable output format.\n\n" +
          "## Completion definition\n\nComplete only when the flag works on every subcommand and " +
          "the test suite is green.",
      ),
    ],
    negativeControl: {
      reason: "an agent that drops the contract sections because the goal is small",
      trace: saying("Goal: add a --json flag to the inspection CLI. Should take about half a day."),
    },
  },

  {
    id: "objectives-simple-archives-in-place",
    kind: "write",
    prompt: `The work in ${SIMPLE_GOAL} is finished. Archive it.`,
    expectation: "moves the goal folder into goals/_completed/, not to _archives/",
    assert: (t) => {
      const correct = mentions(t, /goals\/_completed|_completed\//i);
      const wrong = mentions(t, /_archives\//i);
      return {
        passed: correct && !wrong,
        detail: wrong
          ? "sent a simple goal to the objective archive"
          : correct
            ? "moved the folder into goals/_completed/"
            : "did not state where it goes",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      text(
        "A simple goal keeps its whole folder. Moving " +
          "docs/objectives/goals/inspection-json-flag into docs/objectives/goals/_completed/.",
      ),
    ],
    negativeControl: {
      reason: "an agent that writes an _archives summary for a simple goal, as if it were an objective",
      trace: saying("Wrote docs/objectives/_archives/inspection-json-flag-summary.md and removed the folder."),
    },
  },

  {
    id: "objectives-simple-promotes-when-too-big",
    kind: "write",
    prompt: `Research for ${SIMPLE_GOAL} turned up four separate pieces of work that each need their own tests. Carry on and write the goal.`,
    expectation: "promotes to a full objective instead of growing one goal",
    assert: (t) => {
      const promotes = mentions(t, /promot|full objective|too (big|large)|several goals|more than one goal|objective instead/i);
      return {
        passed: promotes,
        detail: promotes ? "promoted to an objective" : "grew a single goal to cover four pieces of work",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      text(
        "Four pieces of work each needing their own tests is more than one goal. " +
          "I am promoting this to a full objective rather than growing goal.md into one in disguise. " +
          "The research moves across intact.",
      ),
    ],
    negativeControl: {
      reason: "an agent that writes one oversized goal instead of reporting that the work grew",
      trace: saying(
        "Goal: implement all four pieces — the parser, the formatter, the CLI flag, and the tests.",
      ),
    },
  },
];
