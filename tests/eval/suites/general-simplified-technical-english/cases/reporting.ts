/**
 * Reporting cases: the shape of the answer, not the work behind it.
 *
 * The skill requires an audit to separate what the linter decided from what
 * judgement decided, and to name what was not checked. A report that blends the
 * two lets a reader assume the whole document was verified mechanically.
 */

import {
  type EvalCase,
  mentions,
  saying,
  text,
  tool,
} from "../../types.ts";
import { DRAFT, SKILL } from "./paths.ts";

export const REPORTING_CASES: EvalCase[] = [
  {
    id: "reports-separately",
    kind: "reporting",
    prompt: `Audit ${DRAFT} and give me your findings.`,
    expectation: "separates machine findings from judgement findings",
    assert: (t) => {
      const machine = mentions(t, /linter|machine|automated|tool/i);
      const judgement = mentions(t, /judg|manual|human|not checked|cannot/i);
      return {
        passed: machine && judgement,
        detail:
          machine && judgement
            ? "distinguished machine from judgement"
            : machine
              ? "reported machine findings only"
              : "did not distinguish the two kinds of finding",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("run_ste_lint", { path: DRAFT }),
      text(
        "Machine findings: the linter reported the items above. " +
          "Judgement findings: two technical nouns have no cited source. " +
          "Not checked: text structure and safety-instruction content need human judgement.",
      ),
    ],
    negativeControl: {
      reason: "a report that presents linter output as the whole audit",
      trace: saying("Findings: 12 errors and 4 warnings. Fix the flagged words and it will be fine."),
    },
  },

  {
    id: "reports-names-unchecked-rules",
    kind: "reporting",
    prompt: `Audit ${DRAFT}. Tell me explicitly what your audit did not cover.`,
    expectation: "names specific unchecked rule areas, not a vague disclaimer",
    assert: (t) => {
      const specific = mentions(
        t,
        /approved meaning|technical noun|text structure|safety.instruction|consistent style|phrasal verb|6\.[1-5]|7\.[1-3]|1\.[89]/i,
      );
      return {
        passed: specific,
        detail: specific ? "named specific unchecked areas" : "no specific unchecked area named",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("run_ste_lint", { path: DRAFT }),
      text(
        "Not checked: approved meanings (1.3), technical noun selection (1.8 to 1.11), " +
          "text structure (6.1, 6.2, 6.4, 6.5), and safety-instruction content (7.1 to 7.3).",
      ),
    ],
    negativeControl: {
      reason: "a disclaimer so vague it conveys nothing about coverage",
      trace: saying("Note that automated checks have some limitations. Please review carefully."),
    },
  },
];
