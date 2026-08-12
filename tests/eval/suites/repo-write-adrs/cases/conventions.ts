/**
 * Antiky ADR-convention cases.
 *
 * The fixture is built so per-area and global numbering disagree: framework/
 * holds 0001–0002 and cli/ holds 0001–0005. Per-area gives 0003; a global
 * maximum gives 0006. Only 0003 is right, so the case can discriminate.
 */

import { type EvalCase, createdMatching, mentions, saying, skillInvoked, text, tool } from "../../types.ts";
import { ACCEPTED, ADR_ROOT, PROPOSAL, SKILL } from "./paths.ts";

export const CONVENTION_CASES: EvalCase[] = [
  {
    id: "repoadrs-numbers-per-area",
    kind: "write",
    prompt: `Record the decision in ${PROPOSAL} as a framework ADR. The tree is at ${ADR_ROOT} — write it.`,
    expectation: "takes the next number in framework/, not the global maximum",
    assert: (t) => {
      const files = createdMatching(t, /framework\/\d{4}-[a-z0-9-]+_H\.md$/);
      if (files.length === 0) {
        const other = createdMatching(t, /\.md$/).map((f) => f.path);
        return { passed: false, detail: other.length ? `wrote to ${other.join(", ")}` : "created no ADR" };
      }
      const n = Number(/(\d{4})-/.exec(files[0]!.path)?.[1] ?? "0");
      if (n === 6) return { passed: false, detail: `${files[0]!.path} — that is the global maximum` };
      return {
        passed: n === 3,
        detail: n === 3 ? `created ${files[0]!.path}` : `created ${files[0]!.path} — expected 0003`,
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("list_dir", { path: `${ADR_ROOT}/framework` }),
      tool("write_file", {
        path: `${ADR_ROOT}/framework/0003-keep-brometal-behind-the-driver_H.md`,
        content: "# 0003: Keep BroMetal behind the render driver\n\n## Status\n\nAccepted\n",
      }),
      text("Numbering is per area. framework/ holds 0001 and 0002, so this is 0003."),
    ],
    negativeControl: {
      reason: "an agent that takes the highest number anywhere in the tree",
      script: [
        tool("write_file", {
          path: `${ADR_ROOT}/framework/0006-keep-brometal-behind-the-driver_H.md`,
          content: "# 0006: Keep BroMetal behind the render driver\n",
        }),
        text("Filed as 0006, the next number in the tree."),
      ],
    },
  },

  {
    id: "repoadrs-trigger",
    kind: "trigger",
    prompt: `Where does a new CLI ADR go in ${ADR_ROOT}, and what number?`,
    expectation: `invokes ${SKILL}`,
    assert: (t) => ({
      passed: skillInvoked(t, SKILL),
      detail: skillInvoked(t, SKILL) ? "skill invoked" : "skill not invoked",
    }),
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("list_dir", { path: `${ADR_ROOT}/cli` }),
      text("docs/adr/cli/0006-<title>_H.md — cli/ has its own sequence and holds 0001 through 0005."),
    ],
    negativeControl: {
      reason: "an agent that guesses the location and numbering",
      trace: saying("Put it in docs/adr/0022-cli-thing.md."),
    },
  },

  {
    id: "repoadrs-defers-craft",
    kind: "write",
    prompt: `What has to be in the record I write for ${PROPOSAL}?`,
    expectation: "reaches for general-write-adrs for the format rather than restating it",
    assert: (t) => {
      const usedCraft =
        skillInvoked(t, "general-write-adrs") || mentions(t, /general-write-adrs|five.part|Nygard/i);
      return {
        passed: usedCraft,
        detail: usedCraft ? "used the craft skill for the format" : "did not reach for the craft skill",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("read_file", { path: "/skills/general-write-adrs/reference/format.md" }),
      text("The five-part format comes from general-write-adrs. This skill only says where it goes."),
    ],
    negativeControl: {
      reason: "an agent that invents a record structure rather than loading the format",
      trace: saying("Include a title, a summary, some background, and next steps."),
    },
  },
];
