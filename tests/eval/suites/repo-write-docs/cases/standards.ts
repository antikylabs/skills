/**
 * Antiky documentation-standards cases.
 *
 * The generated-page case is the one that matters: an edit under api/ survives
 * until the next generation and then disappears, taking the work with it. It is
 * asserted on the filesystem, not on what the agent says.
 */

import {
  type EvalCase,
  created,
  mentions,
  modified,
  saying,
  skillInvoked,
  text,
  tool,
} from "../../types.ts";
import { DOCS_ROOT, GENERATED, LIGHTING, SKILL } from "./paths.ts";

export const STANDARDS_CASES: EvalCase[] = [
  {
    id: "repodocs-never-edits-generated",
    kind: "write",
    prompt:
      `The default for \`radius\` in ${GENERATED} is wrong — it should be 25.0, not 10.0. Fix it.`,
    expectation: "leaves the generated page untouched and names the generator",
    assert: (t) => {
      const touched = modified(t).some((p) => /api\//.test(p));
      const namesGenerator = mentions(t, /api-reference-content|docs:api|generator|generated/i);
      return {
        passed: !touched && namesGenerator,
        detail: touched
          ? "hand-edited a generated page — the next generation destroys this silently"
          : namesGenerator
            ? "left it alone and pointed at the generator"
            : "did not edit it, but did not say why",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("read_file", { path: GENERATED }),
      text(
        "That page is generated. Editing it here would be destroyed by the next run. Change " +
          "packages/framework/scripts/api-reference-content.mjs and run " +
          "`npm run docs:api --workspace @antiky/framework`, then commit the regenerated output.",
      ),
    ],
    negativeControl: {
      reason: "an agent that helpfully fixes the number in the generated file",
      script: [
        tool("edit_file", { path: GENERATED, old_string: "`10.0`", new_string: "`25.0`" }),
        text("Updated the default to 25.0."),
      ],
    },
  },

  {
    id: "repodocs-strips-planning-vocabulary",
    kind: "audit",
    prompt: `Review ${LIGHTING} against our documentation standards.`,
    expectation: "catches slice / checkpoint / evidence in a user-facing page",
    assert: (t) => {
      const said = t.finalText ?? "";
      const caught = /slice|checkpoint|evidence|planning (language|vocabulary|terminology)|internal (language|vocabulary|terminology)/i.test(said);
      return {
        passed: caught,
        detail: caught ? "flagged the internal planning vocabulary" : "missed the planning vocabulary",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("read_file", { path: LIGHTING }),
      text(
        "This leaks internal planning vocabulary: 'slice', 'checkpoint', and 'evidence' all appear. " +
          "A developer integrating Antiky has no idea what those mean. That paragraph belongs in " +
          "docs/objectives/, not here.",
      ),
    ],
    negativeControl: {
      reason: "a review that reads the page as fine because the prose is clear",
      trace: saying("Reads well. The opening sentence is clear and the lamp analogy is good."),
    },
  },

  {
    id: "repodocs-trigger-from-the-tree",
    kind: "trigger",
    prompt: `I need to add a page about directional lights under ${DOCS_ROOT}. Where does it go?`,
    expectation: `invokes ${SKILL}`,
    assert: (t) => ({
      passed: skillInvoked(t, SKILL),
      detail: skillInvoked(t, SKILL) ? "skill invoked" : "skill not invoked",
    }),
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      text("framework/ — it is hand-written framework documentation, not generated API reference."),
    ],
    negativeControl: {
      reason: "an agent that guesses a location without loading the standards",
      trace: saying("Put it in docs/user-facing-docs/lights/directional.md."),
    },
  },

  {
    id: "repodocs-defers-craft-to-general",
    kind: "write",
    prompt: `Write a new page under ${DOCS_ROOT}/framework/ explaining how shadows work.`,
    expectation: "reaches for general-write-docs for the craft rather than restating Diátaxis",
    assert: (t) => {
      const usedCraft =
        skillInvoked(t, "general-write-docs") ||
        mentions(t, /general-write-docs|Diátaxis|Diataxis|page type|explanation|how-to/i);
      return {
        passed: usedCraft,
        detail: usedCraft
          ? "used the craft skill for the page shape"
          : "wrote without establishing the page type",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("read_file", { path: "/skills/general-write-docs/SKILL.md" }),
      text(
        "Loading general-write-docs for the craft. 'How shadows work' is an explanation, not a " +
          "how-to — it builds a model rather than finishing a task. It goes in framework/.",
      ),
    ],
    negativeControl: {
      reason: "an agent that drafts a page without deciding what kind of page it is",
      trace: saying("# Shadows\n\nShadows are areas where light is blocked. Here is how to add one."),
    },
  },
];
