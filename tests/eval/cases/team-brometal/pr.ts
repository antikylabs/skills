/**
 * PR cases — sending a patch upstream.
 *
 * The two that matter: implementing against the fork's source rather than the
 * `dist/` we patched locally, and writing the PR URL back into the module
 * header. The second is what makes `update` possible at all — an untagged patch
 * is permanent by default.
 */

import { type EvalCase, mentions, modified, saying, text, tool } from "../types.ts";
import { RETIRABLE, SKILL, UNTAGGED } from "./paths.ts";

export const PR_CASES: EvalCase[] = [
  {
    id: "brometal-pr-against-source-not-dist",
    kind: "pr",
    prompt:
      "Send our render-target filtering patch upstream. The local patch edits " +
      "`node_modules/brometal/dist/runtime/webgpu.js`. Where does the upstream change go?",
    expectation: "implements against the fork's TypeScript source, never dist/",
    assert: (t) => {
      const source = mentions(t, /source|typescript|\bsrc\b|not.*dist|against dist.*wrong/i);
      const wrong = mentions(t, /patch dist|edit dist|change.*dist\/runtime.*upstream/i);
      return {
        passed: source && !wrong,
        detail: wrong
          ? "proposed sending a dist/ change upstream"
          : source
            ? "targets the fork's source"
            : "did not say where the upstream change goes",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/reference/pr.md` }),
      text(
        "dist/ is compiled output — right to patch locally, wrong to send upstream. Clone the fork, " +
          "branch from upstream/main, and implement in the TypeScript source. That also surfaces " +
          "things the compiled output hides.",
      ),
    ],
    negativeControl: {
      reason: "an agent that offers the maintainer a diff against compiled output",
      trace: saying("I will open a PR with the same change to dist/runtime/webgpu.js."),
    },
  },

  {
    id: "brometal-pr-tags-the-patch",
    kind: "pr",
    prompt:
      `We opened https://github.com/ericdrowell/brometal/pull/9 for the patch in ${UNTAGGED}. Record it.`,
    expectation: "writes the PR URL into the module header on disk",
    assert: (t) => {
      const touched = modified(t).some((p) => /legacy-hack/.test(p));
      const saidIt = mentions(t, /pull\/9|#9/);
      return {
        passed: touched && saidIt,
        detail: touched
          ? "wrote the URL into the module header"
          : saidIt
            ? "mentioned the PR but left the header untouched"
            : "did not record the PR against the patch",
      };
    },
    script: [
      tool("read_file", { path: UNTAGGED }),
      tool("edit_file", {
        path: UNTAGGED,
        old_string: " * Added in a hurry before a demo. Nobody has checked whether it is still needed.",
        new_string:
          " * Added in a hurry before a demo.\n *\n" +
          " * **Upstream: https://github.com/ericdrowell/brometal/pull/9**\n" +
          " * uniform buffer: widen alignment\n *\n" +
          " * Retire this file when #9 is merged or released. Remove the module, drop it from\n" +
          " * PATCHES in ../patch-brometal.mjs, and from the scripts/ allowlist.",
      }),
      text("Recorded #9 in the header, with the retirement steps. `update` can now check it."),
    ],
    negativeControl: {
      reason: "an agent that opens the PR and never links it to the patch, leaving it unretirable",
      trace: saying("Opened https://github.com/ericdrowell/brometal/pull/9. The patch stays for now."),
    },
  },

  {
    id: "brometal-pr-hands-over-control",
    kind: "pr",
    prompt: `Draft the pull request body for the patch in ${RETIRABLE}.`,
    expectation: "includes the closing section that invites rejection",
    assert: (t) => {
      const handsOver = mentions(
        t,
        /over to you|close it|no offence|is this applicable|better approach|nothing of ours is blocked/i,
      );
      return {
        passed: handsOver,
        detail: handsOver ? "closed by handing the maintainer control" : "no closing hand-over section",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/reference/pr-template.md` }),
      text(
        "## Over to you\n\nGenuine questions, not politeness:\n\n" +
          "- **Is this applicable at all?** If it does not fit where the project is going, say so " +
          "and close it — no offence taken. We carry it as a local patch today, so nothing of ours " +
          "is blocked.\n- **Is there a better approach?** We would rather write your version.",
      ),
    ],
    negativeControl: {
      reason: "a PR body that argues for merging without inviting the maintainer to decline",
      trace: saying(
        "## Summary\n\nThis fixes the nearest-filtering bug. Please merge.\n\n## Tests\n\nAll pass.",
      ),
    },
  },
];
