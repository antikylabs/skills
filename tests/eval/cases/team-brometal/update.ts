/**
 * Update cases — bumping BroMetal and retiring what landed.
 *
 * The costly mistakes here are asymmetric. Keeping a dead patch wastes a little
 * effort; retiring a live one breaks the build for everyone. So the cases weight
 * toward the checks that prevent early retirement, and toward surfacing the
 * patch nobody can retire at all.
 */

import { type EvalCase, deleted, mentions, saying, text, tool } from "../types.ts";
import { ALLOWLIST, PATCH_DIR, RETIRABLE, RUNNER, SKILL, UNRELEASED, UNTAGGED } from "./paths.ts";

export const UPDATE_CASES: EvalCase[] = [
  {
    id: "brometal-update-merged-is-not-released",
    kind: "update",
    prompt:
      `We are bumping BroMetal from 0.17.2 to 0.18.0. Upstream PR #4 (${UNRELEASED}) is merged, but ` +
      "it merged after 0.18.0 was cut and is not in that release. Should that patch be retired?",
    expectation: "keeps a patch whose fix merged but is not in the target release",
    assert: (t) => {
      const removed = deleted(t).some((p) => /offscreen-multisampling/.test(p));
      const understood = mentions(
        t,
        /not (yet )?(in|released)|merged (but|is not)|keep|still needed|after 0\.18|not in that release/i,
      );
      return {
        passed: !removed && understood,
        detail: removed
          ? "deleted a patch whose fix is not in the target release"
          : understood
            ? "kept it — merged is not released"
            : "did not delete it, but did not say why it stays",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("read_file", { path: `/skills/${SKILL}/reference/update.md` }),
      tool("read_file", { path: UNRELEASED }),
      text(
        "PR #4 merged after 0.18.0 was cut, so the fix is not in the version we are installing. " +
          "The patch stays. Retiring it now would break the build. I have noted the release that " +
          "will retire it.",
      ),
    ],
    negativeControl: {
      reason: "an agent that retires on 'merged' alone and breaks the build",
      script: [
        tool("read_file", { path: UNRELEASED }),
        tool("move_file", { from: UNRELEASED, to: "/workspace/team-brometal/.deleted.mjs" }),
        text("PR #4 is merged, so I removed the patch."),
      ],
    },
  },

  {
    id: "brometal-update-flags-untagged-patch",
    kind: "update",
    prompt: `Take stock of the patches in ${PATCH_DIR} before we bump BroMetal. Anything wrong?`,
    expectation: "reports the patch that carries no upstream pull request",
    assert: (t) => {
      const flagged = mentions(t, /legacy-hack/i) && mentions(t, /no upstream|without.*(pr|pull request)|not.*upstream|never be retired|cannot be retired|missing/i);
      return {
        passed: flagged,
        detail: flagged ? "flagged legacy-hack as having no upstream PR" : "did not surface the untagged patch",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/reference/update.md` }),
      tool("list_dir", { path: PATCH_DIR }),
      tool("read_file", { path: UNTAGGED }),
      text(
        "legacy-hack.mjs carries no upstream URL, so nobody can decide whether it is still needed. " +
          "That is a defect in its own right — it needs a PR opened before the bump.",
      ),
    ],
    negativeControl: {
      reason: "an agent that reports the patch set as healthy without noticing the untagged one",
      trace: saying("Three patches, all with upstream PRs. Ready to bump."),
    },
  },

  {
    id: "brometal-update-retires-all-three-places",
    kind: "update",
    prompt:
      `PR #3 is merged and shipped in BroMetal 0.18.0, which we are installing. Retire ` +
      `${RETIRABLE}. The runner is ${RUNNER} and the allowlist is ${ALLOWLIST}.`,
    expectation: "deletes the module and removes it from the runner and the allowlist",
    assert: (t) => {
      const removedModule = deleted(t).some((p) => /render-target-filtering/.test(p));
      const namesAll =
        mentions(t, /PATCHES|runner|patch-brometal\.mjs/i) &&
        mentions(t, /allowlist|repository-policy/i);
      return {
        passed: removedModule && namesAll,
        detail: !removedModule
          ? "did not delete the module"
          : namesAll
            ? "deleted the module and updated the runner and allowlist"
            : "deleted the module but left the runner or allowlist referencing it",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/reference/update.md` }),
      tool("read_file", { path: RETIRABLE }),
      tool("move_file", { from: RETIRABLE, to: "/workspace/team-brometal/.retired-render-target-filtering.mjs" }),
      tool("edit_file", {
        path: RUNNER,
        old_string: "  renderTargetFiltering,\n",
        new_string: "",
      }),
      tool("edit_file", {
        path: ALLOWLIST,
        old_string: "  'patch-brometal/render-target-filtering.mjs',\n",
        new_string: "",
      }),
      text(
        "Retired in all three places: deleted the module, dropped it from PATCHES in the runner, " +
          "and removed it from the scripts/ allowlist in repository-policy.test.mjs.",
      ),
    ],
    negativeControl: {
      reason: "an agent that deletes the module and leaves the runner importing a file that no longer exists",
      script: [
        tool("move_file", { from: RETIRABLE, to: "/workspace/team-brometal/.gone.mjs" }),
        text("Deleted the patch module. Done."),
      ],
    },
  },
];
