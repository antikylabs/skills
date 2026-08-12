/**
 * Patch cases — adding a local patch.
 *
 * Two traps this suite guards. First, patching a defect that upstream already
 * fixed: we did that once while four releases behind. Second, writing a module
 * with no upstream URL, which produces a patch nobody can ever retire — the
 * exact defect `legacy-hack.mjs` represents in the fixture.
 */

import { type EvalCase, createdMatching, mentions, saying, text, tool } from "../types.ts";
import { PATCH_DIR, RETIRABLE, SKILL } from "./paths.ts";

export const PATCH_CASES: EvalCase[] = [
  {
    id: "brometal-patch-checks-latest-first",
    kind: "patch",
    prompt:
      "BroMetal drops the depth attachment on the second render pass and it is blocking the town demo. " +
      "We are on 0.17.2. Write the patch.",
    expectation: "confirms the defect exists in the latest published version before patching",
    assert: (t) => {
      const checks = mentions(
        t,
        /latest (published |release)?version|npm view|current release|already fixed|newer version|check.*upstream.*first|releases behind/i,
      );
      return {
        passed: checks,
        detail: checks ? "checked the latest version first" : "went straight to patching 0.17.2",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/reference/patch.md` }),
      text(
        "Before patching: we are on 0.17.2 and need to confirm the defect still exists in the " +
          "latest published version. We have written a patch while four releases behind before. " +
          "Run `npm view brometal version` and read the current source first.",
      ),
    ],
    negativeControl: {
      reason: "an agent that patches the installed version without checking upstream fixed it already",
      trace: saying(
        "Added scripts/patch-brometal/depth-attachment.mjs replacing the drawTo call in 0.17.2.",
      ),
    },
  },

  {
    id: "brometal-patch-module-names-its-pr",
    kind: "patch",
    prompt:
      `Write the patch module for the depth-attachment defect. Follow the header convention used in ${RETIRABLE}.`,
    expectation: "the module header carries the upstream PR line and the retirement steps",
    assert: (t) => {
      const files = createdMatching(t, /patch-brometal\/.*\.mjs$/);
      const body = files.map((f) => f.content).join("\n") + "\n" + t.finalText;
      const hasUpstream = /\*\*Upstream:/i.test(body) || /upstream:.*pull\/|not yet opened/i.test(body);
      const hasRetire = /retire this file|retire it when|drop it from PATCHES/i.test(body);
      return {
        passed: hasUpstream && hasRetire,
        detail:
          hasUpstream && hasRetire
            ? "header names the upstream PR and the retirement steps"
            : hasUpstream
              ? "named the PR but not how to retire it"
              : "wrote a patch with no upstream line — nobody can retire it",
      };
    },
    script: [
      tool("read_file", { path: RETIRABLE }),
      tool("write_file", {
        path: `${PATCH_DIR}/depth-attachment.mjs`,
        content:
          "/**\n * Keep the depth attachment on subsequent render passes.\n *\n" +
          " * **Upstream: (not yet opened — opening in this change)**\n" +
          " * drawTo: preserve the depth attachment across passes\n *\n" +
          " * Retire this file when the PR is merged or released. Remove the module, drop it from\n" +
          " * PATCHES in ../patch-brometal.mjs, and from the scripts/ allowlist.\n */\n" +
          "export const name = 'depth-attachment';\n",
      }),
      text("Module written with the upstream line and retirement steps. Opening the PR next."),
    ],
    negativeControl: {
      reason: "a patch module with no upstream line — permanent by default",
      script: [
        tool("write_file", {
          path: `${PATCH_DIR}/depth-attachment.mjs`,
          content: "// Fixes the depth attachment bug.\nexport const name = 'depth-attachment';\n",
        }),
        text("Added the patch."),
      ],
    },
  },

  {
    id: "brometal-patch-one-module-per-contribution",
    kind: "patch",
    prompt:
      "This fix touches five BroMetal files — the builtins, the public surface, the analyzer, the " +
      "emitter and the optimizer — but it is one idea. How many patch modules?",
    expectation: "one module, because the unit is what gets sent upstream and retired",
    assert: (t) => {
      const one = mentions(t, /one (patch )?module|single module|one file|one PR|one contribution/i);
      // Only count the wrong answer when it is asserted, not when it is ruled
      // out. "The unit is one upstream contribution, not one module per file"
      // is the correct answer and contains the phrase verbatim. A lookbehind is
      // too narrow — the negation can sit several words earlier — so this looks
      // for a negation anywhere in the same clause.
      const said = t.finalText ?? "";
      const WRONG = /(five modules|one per file|module per file|per file touched)/i;
      const NEGATED = /\b(not|never|rather than|instead of|as opposed to)\b[^.;!?]{0,60}?(five modules|one per file|module per file|per file touched)/i;
      const perFile = WRONG.test(said) && !NEGATED.test(said);
      return {
        passed: one && !perFile,
        detail: perFile
          ? "split by file touched instead of by contribution"
          : one
            ? "one module — split by what goes upstream"
            : "did not say how many",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/reference/patch.md` }),
      text(
        "One module. Split by what you would send upstream, because that is the unit that gets " +
          "retired — five files, one idea, one PR, and when it merges you delete exactly one file.",
      ),
    ],
    negativeControl: {
      reason: "an agent that splits by file touched, producing five modules that must retire together",
      trace: saying("Five modules, one per file, so each change is isolated."),
    },
  },
];
