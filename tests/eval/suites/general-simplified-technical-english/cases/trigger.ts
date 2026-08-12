import {
  type EvalCase,
  skillInvoked,
  text,
  tool,
  toolPath,
} from "../../types.ts";
import { DRAFT, SKILL } from "./paths.ts";

export const TRIGGER_CASES: EvalCase[] = [
  {
    id: "trigger-explicit-audit",
    kind: "trigger",
    prompt: `Audit ${DRAFT} against ASD-STE100 Simplified Technical English and tell me what is wrong.`,
    expectation: `invokes ${SKILL}`,
    assert: (t) => ({
      passed: skillInvoked(t),
      detail: skillInvoked(t) ? "skill invoked" : `skill not invoked; tools: ${toolPath(t)}`,
    }),
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      text("Loaded the audit playbook. I will run the linter next."),
    ],
    negativeControl: {
      reason: "an agent that reads the document, names real STE violations, and never opens the skill",
      script: [
        tool("read_file", { path: DRAFT }),
        text(
          "Three problems: 'ensure' is not approved — use 'make sure'; 'utilise' is not approved — " +
            "use 'use'; and the second paragraph is passive where it should be an instruction.",
        ),
      ],
    },
  },

  {
    id: "trigger-implicit-ste",
    kind: "trigger",
    prompt: `This maintenance instruction has to be readable by non-native English speakers and follow our controlled-language standard. Check ${DRAFT}.`,
    expectation: `invokes ${SKILL} without the standard being named`,
    assert: (t) => ({
      passed: skillInvoked(t),
      detail: skillInvoked(t) ? "skill invoked from an implicit cue" : "skill not invoked",
    }),
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      text("A controlled-language standard for non-native readers is ASD-STE100."),
    ],
    negativeControl: {
      reason: "an agent that reads the file but never connects the cue to the skill",
      trace: {
        toolCalls: [{ name: "read_file", args: { path: DRAFT }, blocked: false }],
        finalText: "The instruction looks reasonably clear to me.",
      },
    },
  },

  {
    id: "trigger-negative-unrelated",
    kind: "trigger",
    prompt: `Read ${DRAFT} and tell me how many numbered steps it contains.`,
    expectation: `does NOT invoke ${SKILL} for a plain counting question`,
    assert: (t) => ({
      passed: !skillInvoked(t),
      detail: skillInvoked(t) ? "false trigger on unrelated work" : "correctly did not trigger",
    }),
    script: [tool("read_file", { path: DRAFT }), text("The document contains 4 numbered steps.")],
    negativeControl: {
      reason: "an over-eager agent that loads the STE skill to count list items",
      trace: {
        toolCalls: [{ name: "read_file", args: { path: `/skills/${SKILL}/SKILL.md` }, blocked: false }],
        finalText: "I loaded the STE skill. The document contains 4 numbered steps.",
      },
    },
  },
];
