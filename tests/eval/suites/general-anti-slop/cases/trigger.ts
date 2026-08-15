/**
 * Trigger cases: does the skill get opened when it is the right tool?
 *
 * Neither prompt names the skill, a rule, or a checker. They are the two ways
 * this work actually arrives — "an agent left a mess" and "this document reads
 * oddly" — and the question is whether the description routes on them.
 *
 * Every control here is a near miss: the agent does real, competent work on the
 * real fixture and answers plausibly. It simply never opens the skill. That is
 * what separates "read the skill" from "read some files".
 */

import { type EvalCase, nearMiss, skillInvoked, text, tool } from "../../types.ts";
import { MESSY, OVERCLAIMING, SKILL } from "./paths.ts";

export const TRIGGER_CASES: EvalCase[] = [
  {
    id: "trigger-on-agent-mess",
    kind: "trigger",
    prompt: `I let an agent loose in ${MESSY} for an afternoon. Is anything wrong with how it is laid out now?`,
    expectation: "opens general-anti-slop rather than eyeballing the tree",
    assert: (t) => {
      const opened = skillInvoked(t, SKILL);
      return {
        passed: opened,
        detail: opened ? "opened the skill" : "answered without opening the skill",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("read_file", { path: `/skills/${SKILL}/reference/structure.md` }),
      tool("run_structure_lint", { path: MESSY }),
      text(
        "Three findings. Two are facts read from the project's own configuration: " +
          "`src/discount.test.ts` is not collected by vitest.config.ts, and " +
          "`scripts/backfill-prices-oct.sh` is invoked by nothing. One is a proxy: " +
          "`src/handlers/` holds 20 files in four prefix families.",
      ),
    ],
    negativeControl: nearMiss(
      "an agent that inspects the tree carefully and reports plausible findings, without opening the skill",
      [
        tool("list_dir", { path: MESSY }),
        tool("list_dir", { path: `${MESSY}/src` }),
        tool("read_file", { path: `${MESSY}/package.json` }),
        tool("read_file", { path: `${MESSY}/vitest.config.ts` }),
        text(
          "The layout looks reasonable. `src/` holds the modules, `tests/` holds the tests, " +
            "and `scripts/` holds one migration script. Nothing stands out as misplaced.",
        ),
      ],
    ),
  },

  {
    id: "trigger-on-confident-document",
    kind: "trigger",
    prompt: `${OVERCLAIMING} reads very confidently. Is it actually telling me anything?`,
    expectation: "opens general-anti-slop rather than reviewing the prose by eye",
    assert: (t) => {
      const opened = skillInvoked(t, SKILL);
      return {
        passed: opened,
        detail: opened ? "opened the skill" : "reviewed the prose without opening the skill",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("read_file", { path: `/skills/${SKILL}/reference/prose.md` }),
      tool("run_prose_lint", { path: OVERCLAIMING }),
      text(
        "Four findings. The Overview asserts qualities with nothing a reader could check, " +
          "the rollout offers two durations as predictions, and two metaphors stand in for " +
          "mechanisms. The Operations section is fine: those durations are facts, not forecasts.",
      ),
    ],
    negativeControl: nearMiss(
      "an agent that reads the document and critiques the writing on instinct, without opening the skill",
      [
        tool("read_file", { path: OVERCLAIMING }),
        text(
          "It is a bit marketing-flavoured in places. I would tighten the Overview and cut some " +
            "adjectives, but the structure is fine and the rollout section is clear.",
        ),
      ],
    ),
  },
];
