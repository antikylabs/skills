import {
  type EvalCase,
  anyMutation,
  before,
  created,
  createdMatching,
  mentions,
  pathMatching,
  modified,
  nearMiss,
  saying,
  skillInvoked,
  text,
  tool,
} from "../../types.ts";
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
      if (n !== 3) return { passed: false, detail: `created ${files[0]!.path} — expected 0003` };
      // Order matters as much as the answer. Writing the record and *then*
      // listing the area is a guess that happened to land; only a look before
      // the write is evidence the rule was followed.
      const looked = before(t, pathMatching(/framework\/?$/), anyMutation);
      return {
        passed: looked,
        detail: looked ? `created ${files[0]!.path}` : `created ${files[0]!.path} without reading the area first`,
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
    negativeControl: nearMiss(
      "an agent that reads the tree, gives a well-formed and locally plausible answer, and never opens the skill",
      [
        tool("list_dir", { path: ADR_ROOT }),
        tool("list_dir", { path: `${ADR_ROOT}/cli` }),
        text("docs/adr/cli/0006-<title>.md — cli/ holds 0001 through 0005, so the next one is 0006."),
      ],
    ),
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

/**
 * Trap cases: the assertion targets a consequence the prompt never named.
 *
 * Modelled on ponytail's `trace-transfer` probe, where the bug report names
 * transfers and the scorer exercises a withdrawal. A prompt that names the thing
 * being checked can be satisfied by keyword-following; a prompt that does not
 * can only be satisfied by knowing the convention.
 *
 * Each of these is scored on two axes, kept separate on purpose:
 *   gate      — is the record itself right? A trap answer that breaks the record
 *               is not evidence about the trap.
 *   measured  — the unnamed consequence.
 */
export const TRAP_CASES: EvalCase[] = [
  {
    id: "repoadrs-index-unnamed",
    kind: "write",
    // The prompt says nothing about an index. It is a plain request to file a
    // record, phrased the way an owner would phrase it.
    prompt: `Write up the decision in ${PROPOSAL} as a framework ADR under ${ADR_ROOT}.`,
    expectation: "adds the index entry in the same change, unprompted",
    assert: (t) => {
      const records = createdMatching(t, /framework\/\d{4}-[a-z0-9-]+_H\.md$/);
      // Gate first. Without a well-formed record there is nothing to index, and
      // reporting "missed the index" would be a misleading way to say "wrote no ADR".
      if (records.length === 0) return { passed: false, detail: "gate: no well-formed framework record" };

      const indexTouched = [...modified(t), ...created(t)].filter((p) => /README\.md$/.test(p));
      if (indexTouched.length === 0) {
        return { passed: false, detail: `wrote ${records[0]!.path} but left the index untouched` };
      }
      const body = t.mutations?.contents[indexTouched[0]!] ?? "";
      const slug = records[0]!.path.split("/").pop() ?? "";
      const linked = body.includes(slug);
      return {
        passed: linked,
        detail: linked ? `indexed ${slug}` : "touched the index but did not link the new record",
      };
    },
    script: [
      tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
      tool("list_dir", { path: `${ADR_ROOT}/framework` }),
      tool("read_file", { path: `${ADR_ROOT}/README.md` }),
      tool("write_file", {
        path: `${ADR_ROOT}/framework/0003-keep-brometal-behind-the-driver_H.md`,
        content: "# 0003: Keep BroMetal behind the render driver\n\n## Status\n\nAccepted\n",
      }),
      tool("edit_file", {
        path: `${ADR_ROOT}/README.md`,
        old_string: "### CLI",
        new_string:
          "- [0003: Keep BroMetal behind the render driver](framework/0003-keep-brometal-behind-the-driver_H.md)\n\n### CLI",
      }),
      text("Filed as framework/0003 and added the index entry in the same change."),
    ],
    negativeControl: nearMiss(
      // Correct on the happy path. It cuts exactly one corner — the one the
      // prompt never mentioned.
      "an agent that files a flawless record at the right number and never touches the index",
      [
        tool("read_file", { path: `/skills/${SKILL}/SKILL.md` }),
        tool("list_dir", { path: `${ADR_ROOT}/framework` }),
        tool("write_file", {
          path: `${ADR_ROOT}/framework/0003-keep-brometal-behind-the-driver_H.md`,
          content: "# 0003: Keep BroMetal behind the render driver\n\n## Status\n\nAccepted\n",
        }),
        text("Filed as framework/0003."),
      ],
    ),
  },
];
