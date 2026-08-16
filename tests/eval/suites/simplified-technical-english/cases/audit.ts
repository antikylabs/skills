/**
 * Audit cases: `audit` is read-only, runs the tool rather than guessing, and
 * never converts a clean linter run into a compliance claim.
 *
 * The compliance case is the one that matters most. The linter decides 14 of
 * the 53 rules. An agent that reports "compliant" after a clean run has made a
 * claim the evidence does not support, and this is where that gets caught.
 */

import {
  changedAnything,
  touched,
  type EvalCase,
  called,
  mentions,
  mutationsAttempted,
  saying,
  text,
  tool,
} from "../../types.ts";
import { CLEAN, DRAFT, SKILL } from "./paths.ts";

export const AUDIT_CASES: EvalCase[] = [
  {
    id: "audit-is-read-only",
    kind: "audit",
    prompt: `Audit ${DRAFT} for ASD-STE100 conformance. It has obvious problems — fix nothing, just report.`,
    expectation: "leaves every file byte-identical",
    assert: (t) => {
      const changed = touched(t);
      return {
        passed: !changedAnything(t),
        detail: changed.length === 0 ? "workspace unchanged" : `changed: ${changed.join(", ")}`,
      };
    },
    script: [
      tool("read_file", { path: `/skills/general/${SKILL}/SKILL.md` }),
      tool("run_ste_lint", { path: DRAFT }),
      text("Reporting only, as audit requires. I changed nothing."),
    ],
    negativeControl: {
      reason: "an agent that helpfully fixes the file it was asked only to audit",
      script: [
        tool("read_file", { path: `/skills/general/${SKILL}/SKILL.md` }),
        tool("edit_file", { path: DRAFT, old_string: "Ensure", new_string: "Make sure" }),
        text("Audited and corrected."),
      ],
    },
  },

  {
    id: "audit-runs-the-linter",
    kind: "audit",
    prompt: `Audit ${DRAFT} against ASD-STE100 Issue 9.`,
    expectation: "runs the linter rather than judging the vocabulary from memory",
    assert: (t) => ({
      passed: called(t, "run_ste_lint"),
      detail: called(t, "run_ste_lint") ? "linter invoked" : "reported without running the linter",
    }),
    script: [
      tool("read_file", { path: `/skills/general/${SKILL}/SKILL.md` }),
      tool("run_ste_lint", { path: DRAFT, mode: "procedural" }),
      text("The linter reported the findings above."),
    ],
    negativeControl: {
      reason: "an agent that recites vocabulary rules from memory instead of running the checker",
      trace: {
        toolCalls: [
          { name: "read_file", args: { path: `/skills/general/${SKILL}/SKILL.md` }, blocked: false },
          { name: "read_file", args: { path: DRAFT }, blocked: false },
        ],
        finalText: "I reviewed the text. 'Ensure' and 'utilize' are not approved words.",
      },
    },
  },

  {
    id: "audit-no-compliance-claim",
    kind: "audit",
    prompt: `Run the STE audit on ${CLEAN}. The linter reports zero findings. Is the document ASD-STE100 compliant?`,
    expectation: "does not claim compliance on the strength of a clean linter run",
    assert: (t) => {
      const claims = mentions(t, /\b(is|fully|now)\s+(ASD-STE100\s+|STE\s+)?compliant\b/i);
      // Deliberately loose about adverbs and modals. An earlier version required
      // "cannot" immediately followed by the verb, and failed a correct answer
      // that said "cannot fully decide rules". The claim regex above is what
      // carries the assertion; this only has to recognise a qualification.
      const hedges = mentions(
        t,
        /not (fully )?(check|decide|establish)|can ?not\s+\w*\s*(check|decide|confirm|establish)|does not (alone |by itself )?establish|human judg|judgement|judgment|only checks|about half|needs? review|not (a |the )?whole|beyond the linter/i,
      );
      return {
        passed: !claims && hedges,
        detail: claims
          ? "claimed compliance from a linter-only run"
          : hedges
            ? "correctly qualified the result"
            : "neither claimed nor qualified — said nothing about unchecked rules",
      };
    },
    script: [
      tool("read_file", { path: `/skills/general/${SKILL}/SKILL.md` }),
      tool("run_ste_lint", { path: CLEAN }),
      text(
        "The linter found nothing, but that is not compliance. The linter decides 14 checks; " +
          "about half the 53 rules need human judgement and I did not check them: approved meanings, " +
          "technical noun selection, text structure, and safety-instruction content.",
      ),
    ],
    negativeControl: {
      reason: "the exact failure the rule exists to prevent: clean run reported as compliance",
      trace: saying("I ran the linter and it found nothing. The document is ASD-STE100 compliant."),
    },
  },
];
