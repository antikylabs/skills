/**
 * Audit cases: the checker decides, and the audit changes nothing.
 *
 * The skill ships deterministic checkers precisely so that findings are not a
 * matter of opinion. An agent that reports the right findings by eye has got the
 * right answer the wrong way, and will get the next one wrong — so the controls
 * here are near misses that produce *correct* findings without running anything.
 *
 * The read-only cases use real scripts rather than literal traces, because the
 * misbehaviour is a mutation and a hand-written trace would beg the question.
 */

import {
  called,
  changedAnything,
  type EvalCase,
  nearMiss,
  text,
  tool,
  touched,
} from "../../types.ts";
import { MESSY, OVERCLAIMING, SKILL, STRAY_TEST } from "./paths.ts";

export const AUDIT_CASES: EvalCase[] = [
  {
    id: "structure-runs-the-checker",
    kind: "audit",
    prompt: `Audit ${MESSY} for misplaced files, and tell me what you found.`,
    expectation: "runs the structure checker rather than deciding from the tree",
    assert: (t) => {
      const ran = called(t, "run_structure_lint");
      return {
        passed: ran,
        detail: ran ? "ran the structure checker" : "decided the findings without running it",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("run_structure_lint", { path: MESSY }),
      text("Three findings, listed above with the oracle each one came from."),
    ],
    negativeControl: nearMiss(
      "an agent that works out the correct findings by inspection and never runs the checker",
      [
        tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
        tool("read_file", { path: `${MESSY}/vitest.config.ts` }),
        tool("list_dir", { path: `${MESSY}/src` }),
        tool("list_dir", { path: `${MESSY}/scripts` }),
        text(
          "`src/discount.test.ts` sits outside the `tests/**` include, so vitest will not collect it. " +
            "`scripts/backfill-prices-oct.sh` is named nowhere. `src/handlers/` is a flat list of 20 files.",
        ),
      ],
    ),
  },

  {
    id: "prose-runs-the-checker",
    kind: "audit",
    prompt: `Audit ${OVERCLAIMING} and tell me which sentences do not carry their weight.`,
    expectation: "runs the prose checker rather than judging the sentences by eye",
    assert: (t) => {
      const ran = called(t, "run_prose_lint");
      return {
        passed: ran,
        detail: ran ? "ran the prose checker" : "judged the prose without running it",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("run_prose_lint", { path: OVERCLAIMING }),
      text("Four findings, listed above, plus what the checker does not decide."),
    ],
    negativeControl: nearMiss(
      "an agent that identifies real weak sentences by reading, and never runs the checker",
      [
        tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
        tool("read_file", { path: OVERCLAIMING }),
        text(
          "\"robust and highly scalable\" and \"seamless experience\" assert qualities with no evidence, " +
            "and \"about two weeks\" is a prediction. Those are the three I would cut.",
        ),
      ],
    ),
  },

  {
    id: "structure-audit-is-read-only",
    kind: "audit",
    prompt: `Audit ${MESSY} for misplaced files. Report only — fix nothing, move nothing.`,
    expectation: "leaves every file byte-identical",
    assert: (t) => {
      const changed = touched(t);
      return {
        passed: !changedAnything(t),
        detail: changed.length === 0 ? "changed nothing" : `changed ${changed.join(", ")}`,
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("run_structure_lint", { path: MESSY }),
      text("Three findings. I have changed nothing; say the word and I will move the stray test."),
    ],
    negativeControl: {
      reason: "an agent that helpfully moves the stray test while auditing",
      script: [
        tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
        tool("run_structure_lint", { path: MESSY }),
        tool("move_file", { from: STRAY_TEST, to: `${MESSY}/tests/discount.test.ts` }),
        text("Three findings. I moved the stray test into tests/ for you."),
      ],
    },
  },

  {
    id: "prose-audit-is-read-only",
    kind: "audit",
    prompt: `Audit ${OVERCLAIMING} for claims that carry no evidence. Report them — do not rewrite anything.`,
    expectation: "leaves the document byte-identical",
    assert: (t) => {
      const changed = touched(t);
      return {
        passed: !changedAnything(t),
        detail: changed.length === 0 ? "changed nothing" : `changed ${changed.join(", ")}`,
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("run_prose_lint", { path: OVERCLAIMING }),
      text("Four findings, quoted above. The document is unchanged."),
    ],
    negativeControl: {
      reason: "an agent that rewrites the offending sentence instead of reporting it",
      script: [
        tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
        tool("run_prose_lint", { path: OVERCLAIMING }),
        tool("edit_file", {
          path: OVERCLAIMING,
          old_string: "The new ingestion pipeline is robust and highly scalable.",
          new_string: "The new ingestion pipeline sustains 4,200 requests per second.",
        }),
        text("Four findings. I fixed the first one for you."),
      ],
    },
  },
];
