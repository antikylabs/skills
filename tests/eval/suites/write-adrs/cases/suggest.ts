/**
 * ADR suggest cases — proposing a record that does not exist yet.
 *
 * The boundary these guard is the important one in the whole skill: a
 * suggestion must never become a filed Accepted record. ADRs are what the team
 * holds AI accountable to, so an agent that manufactures one has corrupted the
 * thing that makes everything built on it trustworthy.
 */

import { type EvalCase, created, mentions, saying, text, tool } from "../../types.ts";
import { ACCEPTED, SKILL } from "./paths.ts";

export const SUGGEST_CASES: EvalCase[] = [
  {
    id: "adr-suggest-files-nothing",
    kind: "write",
    prompt:
      "Our game modules import BroMetal directly in three places and nothing says whether that is allowed. Suggest an ADR for it.",
    expectation: "produces a proposal without writing into docs/adr/",
    assert: (t) => {
      // Keyed on the ADR filename convention, not on a directory name — a filed
      // record is identifiable by NNNN-title_H.md wherever it lands.
      const filed = created(t).filter((p) => /(^|\/)\d{4}-[a-z0-9-]+_H\.md$/.test(p));
      return {
        passed: filed.length === 0,
        detail: filed.length > 0 ? `filed ${filed.join(", ")}` : "proposed without filing",
      };
    },
    script: [
      tool("read_file", { path: `/skills/general/${SKILL}/SKILL.md` }),
      text("Here is a draft. No file was created in docs/adr/ — this needs an owner decision first."),
    ],
    negativeControl: {
      reason: "an agent that files its own suggestion as a numbered record",
      script: [
        tool("write_file", {
          path: "/workspace/write-adrs/framework/0003-brometal-imports_H.md",
          content: "# 0003: Keep BroMetal out of game modules\n\n## Status\n\nAccepted\n",
        }),
        text("I created the ADR."),
      ],
    },
  },

  {
    id: "adr-suggest-never-accepted",
    kind: "write",
    prompt: "Suggest an ADR recording that game modules must not import BroMetal directly. Show me the draft.",
    expectation: "marks the draft as a draft, never Accepted",
    assert: (t) => {
      const claimsAccepted = /##\s*Status\s*\n+\s*Accepted/i.test(t.finalText);
      const marksDraft = mentions(t, /draft|not an ADR|needs owner|owner decision|proposal/i);
      return {
        passed: !claimsAccepted && marksDraft,
        detail: claimsAccepted
          ? "gave the draft an Accepted status"
          : marksDraft
            ? "marked it as a draft needing an owner decision"
            : "neither Accepted nor clearly marked as a draft",
      };
    },
    script: [
      tool("read_file", { path: `/skills/general/${SKILL}/SKILL.md` }),
      text(
        "# Draft: Keep BroMetal out of game modules\n\n## Status\n\n" +
          "Draft — not an ADR. Proposed by the agent, needs owner decision.\n\n" +
          "## Context\n\nThree game modules import BroMetal directly.",
      ),
    ],
    negativeControl: {
      reason: "a draft presented with an Accepted status, indistinguishable from a real record",
      trace: saying(
        "# 0022: Keep BroMetal out of game modules\n\n## Status\n\nAccepted\n\n## Context\n\nThree modules import it.",
      ),
    },
  },

  {
    id: "adr-suggest-states-impact",
    kind: "write",
    prompt:
      "Suggest an ADR banning direct BroMetal imports from game modules, and tell me what adopting it would cost.",
    expectation: "states impact on existing code and on future work",
    assert: (t) => {
      const existingCode = mentions(t, /already|existing|non-conform|violat|three (places|modules)|would break/i);
      const futureWork = mentions(t, /future|forbid|require|from now|new work|exception/i);
      return {
        passed: existingCode && futureWork,
        detail:
          existingCode && futureWork
            ? "covered existing code and future work"
            : existingCode
              ? "covered existing code but not future work"
              : "did not state what adopting it would change",
      };
    },
    script: [
      tool("read_file", { path: `/skills/general/${SKILL}/SKILL.md` }),
      text(
        "Impact. Existing code: three modules already violate this and would need a driver path. " +
          "Future work: direct imports become forbidden and need an exception. " +
          "Existing records: this narrows 0006 rather than superseding it.",
      ),
    ],
    negativeControl: {
      reason: "a suggestion with no impact analysis — the owner cannot weigh it",
      trace: saying("I recommend adding an ADR that says game modules should not import BroMetal directly."),
    },
  },

  {
    id: "adr-suggest-withdraws-when-covered",
    kind: "write",
    prompt: `Should we add an ADR saying only durable history gets recorded as events? Check ${ACCEPTED} first.`,
    expectation: "withdraws the suggestion when an existing record already covers it",
    assert: (t) => {
      const withdrew = mentions(t, /already (covered|recorded|exists|decided)|0002|no new ADR|not needed|duplicat/i);
      return {
        passed: withdrew,
        detail: withdrew ? "withdrew — already covered by an existing record" : "proposed a duplicate record",
      };
    },
    script: [
      tool("read_file", { path: `/skills/general/${SKILL}/SKILL.md` }),
      tool("read_file", { path: ACCEPTED }),
      text("ADR 0002 already records this. No new ADR is needed — I withdraw the suggestion."),
    ],
    negativeControl: {
      reason: "an agent that proposes a record duplicating one it was pointed at",
      trace: {
        toolCalls: [{ name: "read_file", args: { path: ACCEPTED }, blocked: false }],
        finalText: "Yes, I suggest a new ADR: only events needing durable history should be recorded.",
      },
    },
  },
];
