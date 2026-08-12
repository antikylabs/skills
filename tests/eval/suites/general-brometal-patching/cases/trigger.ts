import {
  type EvalCase,
  skillInvoked,
  text,
  tool,
  toolPath,
} from "../../types.ts";
import { PATCH_DIR, SKILL } from "./paths.ts";

export const TRIGGER_CASES: EvalCase[] = [
  {
    id: "brometal-trigger-blocked-by-defect",
    kind: "trigger",
    prompt:
      "BroMetal drops the depth attachment on the second render pass and it is blocking the town demo. " +
      "We cannot wait for a release. What do we do?",
    expectation: `invokes ${SKILL}`,
    assert: (t) => ({
      passed: skillInvoked(t, SKILL),
      detail: skillInvoked(t, SKILL) ? "skill invoked" : `skill not invoked; tools: ${toolPath(t)}`,
    }),
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      text("Patch locally to unblock, then send it upstream. ADR 0021 requires the PR."),
    ],
    negativeControl: {
      reason: "an agent that reads the defect report, proposes a real remedy, and never opens the skill",
      script: [
        tool("list_dir", { path: PATCH_DIR }),
        text(
          "The fix is small and upstream is quiet. Fork BroMetal, apply the fix on the fork, and " +
            "point the dependency at it until upstream moves.",
        ),
      ],
    },
  },

  {
    id: "brometal-trigger-upgrade",
    kind: "trigger",
    prompt: "Can we move to BroMetal 0.18.0? What has to happen to our patches?",
    expectation: `invokes ${SKILL} for a version bump`,
    assert: (t) => ({
      passed: skillInvoked(t, SKILL),
      detail: skillInvoked(t, SKILL) ? "skill invoked" : "skill not invoked",
    }),
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("list_dir", { path: PATCH_DIR }),
      text("Bump, re-apply, see what throws, then retire the patches whose fixes shipped."),
    ],
    negativeControl: {
      reason: "an agent that checks the installed version, gives a correct upgrade command, and never opens the skill",
      script: [
        tool("list_dir", { path: PATCH_DIR }),
        text("Three patches are applied. Run `npm install brometal@0.18.0` and re-run the test suite."),
      ],
    },
  },

  {
    id: "brometal-trigger-not-authoring",
    kind: "trigger",
    prompt: "Write me a BroMetal shader that does a two-pass gaussian blur.",
    expectation: `does NOT invoke ${SKILL} — that is authoring, not dependency practice`,
    assert: (t) => ({
      passed: !skillInvoked(t, SKILL),
      detail: skillInvoked(t, SKILL)
        ? "loaded the dependency-patching skill for a shader-authoring task"
        : "correctly did not trigger",
    }),
    script: [text("Here is a two-pass gaussian blur shader.")],
    negativeControl: {
      reason: "an agent that treats any mention of BroMetal as a patching task",
      trace: {
        toolCalls: [{ name: "read_file", args: { path: `/skills/${SKILL}/SKILL.md` }, blocked: false }],
        finalText: "Loaded the BroMetal patching skill to write the shader.",
      },
    },
  },
];
