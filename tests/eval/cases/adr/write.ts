/**
 * ADR write cases — recording a decision an owner has made.
 *
 * The failure modes here are structural: taking a global number instead of a
 * per-area one, editing an accepted record in place, and Consequences that list
 * only benefits.
 */

import { type EvalCase, createdMatching, mentions, modified, saying, text, tool } from "../types.ts";
import { ACCEPTED, PROPOSAL, SKILL } from "./paths.ts";

export const WRITE_CASES: EvalCase[] = [
  {
    id: "adr-write-numbers-per-area",
    kind: "write",
    prompt: `Record the decision in ${PROPOSAL} as a framework ADR. What number and path will it get?`,
    expectation: "writes the record into adr/framework/ with a four-digit number and _H suffix",
    assert: (t) => {
      const files = createdMatching(t, /adr\/framework\/\d{4}-.*_H\.md$/);
      if (files.length === 0) {
        const other = createdMatching(t, /\.md$/).map((f) => f.path);
        return {
          passed: false,
          detail: other.length > 0 ? `wrote to ${other.join(", ")}` : "created no ADR file",
        };
      }
      const [file] = files;
      const number = /(\d{4})-/.exec(file!.path)?.[1] ?? "";
      // 0002 is the highest existing record in the adr fixture area.
      const correct = Number(number) === 3;
      return {
        passed: correct,
        detail: correct
          ? `created ${file!.path}`
          : `created ${file!.path} — expected the next per-area number, 0003`,
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("list_dir", { path: "/workspace/adr" }),
      tool("write_file", {
        path: "/workspace/adr/framework/0003-brometal-render-driver_H.md",
        content: "# 0003: Keep BroMetal behind the render driver\n\n## Status\n\nAccepted\n",
      }),
      text("Numbering is per area. This belongs in framework/ and takes 0003, the next unused number there."),
    ],
    negativeControl: {
      reason: "an agent that files at a global number instead of the next per-area one",
      script: [
        tool("write_file", {
          path: "/workspace/adr/framework/0022-brometal-render-driver_H.md",
          content: "# 0022: Keep BroMetal behind the render driver\n",
        }),
        text("Filed as 0022."),
      ],
    },
  },

  {
    id: "adr-write-supersede-not-edit",
    kind: "write",
    prompt: `We reversed the decision in ${ACCEPTED} — we now record every state change again. Update the ADR.`,
    expectation: "writes a new record and supersedes, rather than editing the accepted one",
    assert: (t) => {
      const editedAccepted = modified(t).some((p) => /0002-accepted/.test(p));
      const supersedes = mentions(t, /supersede|new (adr|record)|next number/i);
      return {
        passed: !editedAccepted && supersedes,
        detail: editedAccepted
          ? "edited an accepted record in place"
          : supersedes
            ? "proposed a superseding record"
            : "neither edited nor explained the supersede rule",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("read_file", { path: ACCEPTED }),
      text(
        "An accepted ADR is a historical record. I will write a new ADR with the next number and " +
          "mark 0002 Superseded by it, rather than editing 0002 in place.",
      ),
    ],
    negativeControl: {
      reason: "an agent that rewrites the Decision section of an accepted record",
      trace: {
        toolCalls: [
          { name: "read_file", args: { path: `/skills/${SKILL}/SKILL.md` }, blocked: false },
          { name: "edit_file", args: { path: ACCEPTED }, blocked: true },
        ],
        finalText: "I updated the Decision section to reflect the reversal.",
      },
    },
  },

  {
    id: "adr-write-consequences-have-costs",
    kind: "write",
    prompt: `Draft the Consequences section for the decision in ${PROPOSAL}.`,
    expectation: "states costs and accepted losses, not only benefits",
    assert: (t) => {
      const costs = mentions(
        t,
        /cost|slower|accept|trade|lose|lost|worse|drawback|downside|expensive|obligation|we accept/i,
      );
      return {
        passed: costs,
        detail: costs ? "named costs as well as benefits" : "listed benefits only",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("read_file", { path: PROPOSAL }),
      text(
        "Consequences: renderer changes stay confined to the driver. " +
          "Lighting prototypes become slower to write, and the driver surface grows. " +
          "We accept that cost for the migration freedom.",
      ),
    ],
    negativeControl: {
      reason: "a Consequences section that reads as advocacy — all upside, no cost",
      trace: saying(
        "Consequences: cleaner architecture, better separation of concerns, easier testing, " +
          "improved maintainability, and greater flexibility.",
      ),
    },
  },
];
