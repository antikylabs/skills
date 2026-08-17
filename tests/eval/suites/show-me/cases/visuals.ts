/**
 * Show-me cases.
 *
 * These check the routing decision and four deliberately different visual
 * shapes. A response that dumps every available representation should fail:
 * the skill exists to select the smallest useful one.
 */

import {
  type EvalCase,
  createdMatching,
  nearMiss,
  saying,
  skillInvoked,
  text,
  tool,
  toolPath,
  touched,
} from "../../types.ts";
import { RUN_STATES, SESSION_FLOW, SKILL } from "./paths.ts";

const isConcise = (value: string, limit = 700): boolean => value.length <= limit;

export const VISUAL_CASES: EvalCase[] = [
  {
    id: "show-me-trigger-visual-explanation",
    kind: "trigger",
    prompt: `The session code in ${SESSION_FLOW} is hard to follow. Show me what calls what at runtime.`,
    expectation: `invokes ${SKILL} for a visual explanation request`,
    assert: (trace) => ({
      passed: skillInvoked(trace, SKILL),
      detail: skillInvoked(trace, SKILL)
        ? "skill invoked"
        : `skill not invoked; tools: ${toolPath(trace)}`,
    }),
    script: [
      tool("read_file", { path: `/skills/general/${SKILL}/SKILL.md` }),
      tool("read_file", { path: SESSION_FLOW }),
      text("Showing the runtime shape as a call tree."),
    ],
    negativeControl: nearMiss(
      "an agent that explains the file plausibly without loading the visual skill",
      [
        tool("read_file", { path: SESSION_FLOW }),
        text("submitForm creates the session, persists the prompt, launches the agent, and then navigates."),
      ],
    ),
  },

  {
    id: "show-me-selects-call-tree",
    kind: "reporting",
    prompt: `Use $show-me on ${SESSION_FLOW}. I only need the runtime call shape.`,
    expectation: "uses one concise call tree rather than prose or a heavier diagram",
    assert: (trace) => {
      const said = trace.finalText ?? "";
      const tree = /submitForm\s*\n\s{2,}createSession\s*\n\s{4,}persistPrompt\s*\n\s{4,}launchAgent\s*\n\s{2,}navigateToSession/m.test(said);
      const overbuilt = /sequenceDiagram|flowchart|<html|<!doctype/i.test(said);
      return {
        passed: tree && !overbuilt && isConcise(said),
        detail: !tree
          ? "did not preserve the call hierarchy"
          : overbuilt
            ? "used a heavier visual than the call shape needs"
            : isConcise(said)
              ? "used one concise call tree"
              : "call tree was buried in excessive prose",
      };
    },
    script: [
      tool("read_file", { path: `/skills/general/${SKILL}/SKILL.md` }),
      tool("read_file", { path: SESSION_FLOW }),
      text(
        "```text\n" +
          "submitForm\n" +
          "  createSession\n" +
          "    persistPrompt\n" +
          "    launchAgent\n" +
          "  navigateToSession\n" +
          "```",
      ),
    ],
    negativeControl: {
      reason: "a prose explanation with every right function but no visible call hierarchy",
      script: [
        tool("read_file", { path: `/skills/general/${SKILL}/SKILL.md` }),
        tool("read_file", { path: SESSION_FLOW }),
        text(
          "submitForm calls createSession. createSession calls persistPrompt and launchAgent. " +
            "After that, submitForm calls navigateToSession.",
        ),
      ],
    },
  },

  {
    id: "show-me-selects-diff-for-a-change",
    kind: "reporting",
    prompt:
      "Use $show-me. The current call tree launches the agent and then navigates. Add " +
      "expandSkillMention before launchAgent and subscribeToEvents after navigateToSession. " +
      "Show only what changes.",
    expectation: "shows additions as a focused diff rather than redrawing the whole flow",
    assert: (trace) => {
      const said = trace.finalText ?? "";
      const fencedDiff = /```diff[\s\S]*\n\+\s+expandSkillMention[\s\S]*\n\+\s+subscribeToEvents[\s\S]*```/i.test(said);
      const wholeImplementation = /function\s+submitForm|async\s+function|class\s+/i.test(said);
      return {
        passed: fencedDiff && !wholeImplementation && isConcise(said),
        detail: !fencedDiff
          ? "did not express both additions as a diff"
          : wholeImplementation
            ? "redrew an implementation when only the delta was requested"
            : isConcise(said)
              ? "used a focused diff"
              : "diff was buried in excessive prose",
      };
    },
    script: [
      tool("read_file", { path: `/skills/general/${SKILL}/SKILL.md` }),
      text(
        "```diff\n" +
          " submitForm\n" +
          "   createSession\n" +
          "+    expandSkillMention\n" +
          "     launchAgent\n" +
          "   navigateToSession\n" +
          "+    subscribeToEvents\n" +
          "```",
      ),
    ],
    negativeControl: {
      reason: "a full replacement tree that contains the additions but hides what changed",
      trace: saying(
        "```text\n" +
          "submitForm\n" +
          "  createSession\n" +
          "    expandSkillMention\n" +
          "    launchAgent\n" +
          "  navigateToSession\n" +
          "    subscribeToEvents\n" +
          "```",
      ),
    },
  },

  {
    id: "show-me-selects-mermaid-for-interaction",
    kind: "reporting",
    prompt:
      "Use $show-me to show this interaction: the user chooses a command, the UI sends the " +
      "expanded prompt to the daemon, and the daemon streams the result back.",
    expectation: "uses one compact Mermaid sequence diagram with the three actors",
    assert: (trace) => {
      const said = trace.finalText ?? "";
      const mermaid = /```mermaid[\s\S]*sequenceDiagram[\s\S]*participant User[\s\S]*participant UI[\s\S]*participant Daemon[\s\S]*User->>UI[\s\S]*UI->>Daemon[\s\S]*Daemon-->>UI[\s\S]*```/i.test(said);
      return {
        passed: mermaid && isConcise(said),
        detail: mermaid
          ? isConcise(said)
            ? "used a compact sequence diagram"
            : "sequence diagram was buried in excessive prose"
          : "did not preserve the actors and direction in Mermaid",
      };
    },
    script: [
      tool("read_file", { path: `/skills/general/${SKILL}/SKILL.md` }),
      text(
        "```mermaid\n" +
          "sequenceDiagram\n" +
          "    participant User\n" +
          "    participant UI\n" +
          "    participant Daemon\n" +
          "    User->>UI: choose command\n" +
          "    UI->>Daemon: send expanded prompt\n" +
          "    Daemon-->>UI: stream result\n" +
          "```",
      ),
    ],
    negativeControl: {
      reason: "a correct prose list that loses the interaction direction",
      trace: saying(
        "The actors are the user, UI, and daemon. The steps are choosing a command, sending a " +
          "prompt, and streaming a result.",
      ),
    },
  },

  {
    id: "show-me-writes-html-for-dense-ui-comparison",
    kind: "write",
    prompt:
      `Use $show-me on ${RUN_STATES}. Put the four UI states side by side so I can compare ` +
      "their layout and state changes on desktop and mobile.",
    expectation: "creates one focused responsive HTML comparison with the real state labels",
    assert: (trace) => {
      const files = createdMatching(trace, /^show-me\/show-me-run-states\.html$/);
      const html = files[0]?.content ?? "";
      const labels = ["Ready", "Running", "Needs approval", "Complete"].every((label) =>
        html.includes(label),
      );
      const document = /<!doctype html/i.test(html) && /<meta[^>]+viewport/i.test(html);
      const responsive = /@media\s*\([^)]*(max-width|width)/i.test(html);
      const focused = files.length === 1 && touched(trace).length === 1;
      return {
        passed: focused && document && labels && responsive,
        detail: files.length === 0
          ? "created no focused HTML artifact"
          : !focused
            ? `touched ${touched(trace).join(", ")}`
            : !document
              ? "HTML is not a complete document"
              : !labels
                ? "HTML omitted one or more fixture states"
                : responsive
                  ? "created one focused responsive comparison"
                  : "HTML has no mobile treatment",
      };
    },
    script: [
      tool("read_file", { path: `/skills/general/${SKILL}/SKILL.md` }),
      tool("read_file", { path: RUN_STATES }),
      tool("write_file", {
        path: "/workspace/show-me/show-me-run-states.html",
        content:
          "<!doctype html><html><head><meta name=\"viewport\" content=\"width=device-width\">" +
          "<style>body{font-family:Inter,sans-serif;background:#0b1020;color:#f7f9ff}" +
          ".states{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.state{padding:16px;" +
          "border:1px solid #52617a;border-radius:12px}@media(max-width:700px){" +
          ".states{grid-template-columns:1fr}}</style></head><body><main class=\"states\">" +
          "<section class=\"state\">Ready</section><section class=\"state\">Running</section>" +
          "<section class=\"state\">Needs approval</section>" +
          "<section class=\"state\">Complete</section></main></body></html>",
      }),
      text("Created one responsive comparison at show-me/show-me-run-states.html."),
    ],
    negativeControl: {
      reason: "a Mermaid diagram that names every state but does not provide the requested UI comparison artifact",
      script: [
        tool("read_file", { path: `/skills/general/${SKILL}/SKILL.md` }),
        tool("read_file", { path: RUN_STATES }),
        text(
          "```mermaid\nstateDiagram-v2\nReady --> Running\nRunning --> NeedsApproval\n" +
            "NeedsApproval --> Complete\n```",
        ),
      ],
    },
  },
];
