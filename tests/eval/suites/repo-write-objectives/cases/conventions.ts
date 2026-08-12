/**
 * Antiky objective-convention cases.
 *
 * These guard the two things that break silently: goal filenames (links between
 * goals already point at execute-goal-NN.md) and where a completed objective's
 * summary goes.
 */

import { type EvalCase, mentions, saying, skillInvoked, text, tool } from "../../types.ts";
import { GOAL, OBJECTIVES_ROOT, SKILL, TOWN } from "./paths.ts";

export const CONVENTION_CASES: EvalCase[] = [
  {
    id: "repoobj-goal-filename",
    kind: "write",
    prompt: `Add the next goal to ${TOWN}/goals/. What is it called?`,
    expectation: "execute-goal-01.md, not 01-execute-goal.md",
    assert: (t) => {
      const said = t.finalText ?? "";
      const right = /execute-goal-01\.md/.test(said);
      const wrong = /01-execute-goal\.md/.test(said);
      return {
        passed: right && !wrong,
        detail: wrong ? "used the reversed filename form" : right ? "execute-goal-01.md" : "did not name the file",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("list_dir", { path: `${TOWN}/goals` }),
      text("execute-goal-01.md — goal 00 exists, and the pattern is execute-goal-NN.md."),
    ],
    negativeControl: {
      reason: "an agent that reverses the filename, breaking the links between goals",
      trace: saying("Call it 01-execute-goal.md, following the numbered-prefix convention."),
    },
  },

  {
    id: "repoobj-archive-location",
    kind: "write",
    prompt: `The objective at ${TOWN} is finished. Where does its summary go?`,
    expectation: "_archives/<name>-summary.md, and the folder is removed",
    assert: (t) => {
      const said = t.finalText ?? "";
      const archive = /_archives\/.*summary|_archives\//i.test(said);
      const removes = /remove|git rm|delete the folder|replaced by/i.test(said);
      return {
        passed: archive && removes,
        detail: archive
          ? removes
            ? "named _archives and the folder removal"
            : "named _archives but not the folder removal"
          : "did not name the archive location",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      text(
        "docs/objectives/_archives/town-lighting-summary.md, and the objective folder is removed " +
          "with git rm -r — the summary replaces it so finished plans do not linger.",
      ),
    ],
    negativeControl: {
      reason: "an agent that leaves the folder in place beside the summary",
      trace: saying("Write a SUMMARY.md inside the objective folder and mark it done."),
    },
  },

  {
    id: "repoobj-trigger",
    kind: "trigger",
    prompt: `I am starting a new objective. Where does it go under ${OBJECTIVES_ROOT}?`,
    expectation: `invokes ${SKILL}`,
    assert: (t) => ({
      passed: skillInvoked(t, SKILL),
      detail: skillInvoked(t, SKILL) ? "skill invoked" : "skill not invoked",
    }),
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      text("docs/objectives/<kebab-name>/, with objective.md and nothing else until it has content."),
    ],
    negativeControl: {
      reason: "an agent that invents a layout",
      trace: saying("Create docs/plans/new-objective/ with a README and a tasks file."),
    },
  },
];
