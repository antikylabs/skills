/**
 * Classification cases.
 *
 * The type decision is what every other command depends on, and it is the one a
 * model is most likely to skip — prose is visible, structure is not.
 */

import { type EvalCase, mentions, saying, skillInvoked, text, tool, toolPath } from "../../types.ts";
import { CLEAN_HOWTO, GETTING_STARTED, POINT_LIGHT, SKILL } from "./paths.ts";

export const CLASSIFY_CASES: EvalCase[] = [
  {
    id: "docs-trigger-confusing-page",
    kind: "trigger",
    prompt: `${POINT_LIGHT} is confusing and I do not know why. Have a look.`,
    expectation: `invokes ${SKILL}`,
    assert: (t) => ({
      passed: skillInvoked(t, SKILL),
      detail: skillInvoked(t, SKILL) ? "skill invoked" : `not invoked; tools: ${toolPath(t)}`,
    }),
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("read_file", { path: POINT_LIGHT }),
      text("This is four page types in one. Classifying it first."),
    ],
    negativeControl: {
      reason: "an agent that edits the prose without establishing what the page is",
      trace: saying("I tightened up some of the sentences and fixed the passive voice."),
    },
  },

  {
    id: "docs-classify-names-the-mix",
    kind: "classify",
    prompt: `What kind of page is ${POINT_LIGHT}?`,
    expectation: "names more than one type present, not just one label",
    assert: (t) => {
      const named = ["tutorial", "how-to", "howto", "reference", "explanation"].filter((ty) =>
        new RegExp(ty, "i").test(t.finalText ?? ""),
      );
      return {
        passed: named.length >= 2,
        detail:
          named.length >= 2
            ? `identified a mix: ${named.join(", ")}`
            : `named only ${named.join(", ") || "no type"} — the page holds several`,
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/reference/types.md` }),
      tool("read_file", { path: POINT_LIGHT }),
      text(
        "Mixed. It opens as reference (identity, bindings), has a tutorial-shaped procedure, " +
          "an explanation section about ADR 0021, and a reference parameter table. Primary type " +
          "should be explanation or reference — the procedure belongs in a how-to.",
      ),
    ],
    negativeControl: {
      reason: "an agent that assigns one confident label to a page that is plainly several",
      trace: saying("This is a reference page."),
    },
  },

  {
    id: "docs-classify-buried-goal",
    kind: "audit",
    prompt: `Audit ${POINT_LIGHT}.`,
    expectation: "reports the opening as the most damaging defect",
    assert: (t) => {
      const said = t.finalText ?? "";
      const buried = /open|first paragraph|lead|begins|buried|starts with/i.test(said);
      const aboutTheOpening = /identity|render binding|component record|implementation|architecture/i.test(said);
      return {
        passed: buried && aboutTheOpening,
        detail:
          buried && aboutTheOpening
            ? "flagged the implementation-first opening"
            : "did not identify the buried goal",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/reference/audit.md` }),
      tool("read_file", { path: POINT_LIGHT }),
      text(
        "The worst defect is the opening: it leads with stable identity, component records, and " +
          "render bindings before saying what a point light is. A reader arriving cold learns " +
          "nothing usable in the first screen.",
      ),
    ],
    negativeControl: {
      reason: "an audit that lists prose nits and misses the buried goal",
      trace: saying(
        "A few notes: the parameter table could use a units column, and 'colour' should be " +
          "spelled consistently. Otherwise it reads well.",
      ),
    },
  },

  {
    id: "docs-audit-accepts-a-sound-page",
    kind: "audit",
    prompt: `Audit ${CLEAN_HOWTO}.`,
    expectation: "reports it as sound rather than inventing defects",
    assert: (t) => {
      const said = t.finalText ?? "";
      const approves = /sound|correct|no (significant |major )?(defect|issue|problem)|holds|nothing.*wrong|well.formed|fit for/i.test(said);
      const invents = /should be split|wrong type|mixes|buried/i.test(said);
      return {
        passed: approves && !invents,
        detail: invents
          ? "invented a defect in a sound page"
          : approves
            ? "correctly reported it as sound"
            : "neither approved nor faulted it",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/reference/audit.md` }),
      tool("read_file", { path: CLEAN_HOWTO }),
      text(
        "This is a sound how-to. Titled as the task, straight into the action, assumes competence, " +
          "states the finish condition. No defects worth reporting.",
      ),
    ],
    negativeControl: {
      reason: "an agent that finds something wrong with every page it is shown",
      trace: saying(
        "This page mixes types and buries its goal. The steps should be split from the explanation.",
      ),
    },
  },

  {
    id: "docs-split-two-readers",
    kind: "split",
    prompt: `${GETTING_STARTED} seems to serve two different people. What should happen?`,
    expectation: "proposes a split and names both readers",
    assert: (t) => {
      const said = t.finalText ?? "";
      const splits = /split|two pages|separate page/i.test(said);
      const bothReaders = /(first.tim|new|beginner|never used).*(experienc|already|expert|mid.task)|(experienc|already|expert).*(first.tim|new|beginner)/is.test(said);
      return {
        passed: splits && bothReaders,
        detail: splits
          ? bothReaders
            ? "proposed a split and named both readers"
            : "proposed a split without naming who each page serves"
          : "did not propose a split",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/reference/split.md` }),
      tool("read_file", { path: GETTING_STARTED }),
      text(
        "Two pages. A tutorial for a first-timer with one path and no branches, and a how-to for " +
          "someone who already has a project and wants the dev server running. The branching is " +
          "the seam.",
      ),
    ],
    negativeControl: {
      reason: "an agent that reorganises one page instead of recognising two readers",
      trace: saying("I would reorder the steps and move the platform note to the end."),
    },
  },
];
