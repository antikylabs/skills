/**
 * The tool surface the evaluated agent gets: read and think, nothing else.
 *
 * There is no skill-activation tool. pi activates a skill by having the model
 * read its SKILL.md with the ordinary file-read tool, so read_file is the
 * activation path and /skills is one of its readable roots.
 *
 * Mutating tools really mutate, inside /workspace only. The agent works on a
 * copy of the fixtures there, so a case can assert on the resulting files
 * rather than on the agent's description of what it would do. /skills and the
 * pristine /fixtures are read-only, and a write aimed at either throws — the
 * attempt is recorded either way.
 */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { Type } from "typebox";
import type { AgentTool } from "@earendil-works/pi-agent-core";

/** Every tool call the agent made, in order. */
export interface RecordedCall {
  name: string;
  args: Record<string, unknown>;
  blocked: boolean;
}

/** Tools that change the workspace. Recorded, but no longer blocked. */
export const MUTATING_TOOLS = ["edit_file", "write_file", "move_file"] as const;

const WORKSPACE_HINT = "/workspace";

/** Roots the agent may read. Anything else is refused even inside the container. */
const READABLE_ROOTS = ["/workspace", "/skills"];

/** The only root the agent may write. /skills and the pristine fixtures stay immutable. */
const WRITABLE_ROOTS = ["/workspace"];

function assertWritable(target: string): string {
  const resolved = path.resolve(target);
  if (!WRITABLE_ROOTS.some((root) => resolved.startsWith(root + path.sep) || resolved === root)) {
    throw new Error(
      `refusing to write outside ${WRITABLE_ROOTS.join(", ")}: ${target}. ` +
        "The skills tree and the pristine fixtures are read-only.",
    );
  }
  return resolved;
}

function assertReadable(target: string): string {
  const resolved = path.resolve(target);
  if (!READABLE_ROOTS.some((root) => resolved === root || resolved.startsWith(root + path.sep))) {
    throw new Error(`path outside the readable roots (${READABLE_ROOTS.join(", ")}): ${target}`);
  }
  return resolved;
}

const PathSchema = Type.Object({ path: Type.String({ description: "Absolute path" }) });
const LintSchema = Type.Object({
  path: Type.String({ description: "Absolute path of the file to check" }),
  mode: Type.Optional(
    Type.Union([Type.Literal("auto"), Type.Literal("procedural"), Type.Literal("descriptive")]),
  ),
});
const EditSchema = Type.Object({
  path: Type.String(),
  old_string: Type.String(),
  new_string: Type.String(),
});
const WriteSchema = Type.Object({ path: Type.String(), content: Type.String() });
const MoveSchema = Type.Object({ from: Type.String(), to: Type.String() });

/**
 * @param withSkill whether the skill catalog is in this run's system prompt.
 *   The baseline arm must not learn about /skills from a tool description —
 *   otherwise it can discover skills by exploring and the comparison is not a
 *   comparison. The roots stay readable either way; only the advertisement
 *   differs, matching a deployment where no catalog was disclosed.
 */
export function buildTools(record: (call: RecordedCall) => void, withSkill = true): AgentTool[] {
  const readRoots = withSkill
    ? "Available roots: /fixtures (the documents under review) and /skills (the installed skills, including each SKILL.md and its reference playbooks)."
    : "Available root: /fixtures (the documents under review).";

  const readFile: AgentTool<typeof PathSchema> = {
    name: "read_file",
    label: "Read File",
    description: `Read a UTF-8 text file. ${readRoots}`,
    parameters: PathSchema,
    execute: async (_id, params) => {
      record({ name: "read_file", args: { path: params.path }, blocked: false });
      const resolved = assertReadable(params.path);
      return {
        content: [{ type: "text", text: fs.readFileSync(resolved, "utf-8") }],
        details: { path: resolved },
      };
    },
  };

  const listDir: AgentTool<typeof PathSchema> = {
    name: "list_dir",
    label: "List Directory",
    description: withSkill
      ? "List the entries of a directory under /fixtures or /skills."
      : "List the entries of a directory under /fixtures.",
    parameters: PathSchema,
    execute: async (_id, params) => {
      record({ name: "list_dir", args: { path: params.path }, blocked: false });
      const resolved = assertReadable(params.path);
      const entries = fs.readdirSync(resolved, { withFileTypes: true });
      return {
        content: [
          { type: "text", text: entries.map((e) => (e.isDirectory() ? `${e.name}/` : e.name)).join("\n") },
        ],
        details: { path: resolved, count: entries.length },
      };
    },
  };

  const runSteLint: AgentTool<typeof LintSchema> = {
    name: "run_ste_lint",
    label: "Run STE Linter",
    description:
      "Run the skill's deterministic ASD-STE100 checker over a file and return its findings. This is the only way to decide the controlled vocabulary; it must not be answered from memory.",
    parameters: LintSchema,
    execute: async (_id, params) => {
      record({ name: "run_ste_lint", args: { path: params.path, mode: params.mode }, blocked: false });
      const resolved = assertReadable(params.path);
      const linter = "/skills/general-simplified-technical-english/scripts/ste_lint.mjs";
      const result = spawnSync(
        process.execPath,
        [linter, "--mode", params.mode ?? "auto", "--fail-on", "never", resolved],
        { encoding: "utf-8", timeout: 30_000 },
      );
      const text = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
      return {
        content: [{ type: "text", text: text || "(no findings)" }],
        details: { path: resolved, status: result.status },
      };
    },
  };

  // Real implementations, scoped to /workspace. The container is the boundary,
  // so a writable scratch inside it lets a case assert on what the agent DID
  // rather than on what it said it would do. Writes outside /workspace throw,
  // and the attempt is still recorded.
  const editFile: AgentTool<typeof EditSchema> = {
    name: "edit_file",
    label: "Edit File",
    description: `Replace an exact string in a file under ${WORKSPACE_HINT}.`,
    parameters: EditSchema,
    execute: async (_id, params) => {
      record({ name: "edit_file", args: { path: params.path }, blocked: false });
      const resolved = assertWritable(params.path);
      const before = fs.readFileSync(resolved, "utf-8");
      if (!before.includes(params.old_string)) throw new Error("old_string not found in file");
      fs.writeFileSync(resolved, before.replace(params.old_string, params.new_string));
      return { content: [{ type: "text", text: `edited ${resolved}` }], details: { path: resolved } };
    },
  };

  const writeFile: AgentTool<typeof WriteSchema> = {
    name: "write_file",
    label: "Write File",
    description: `Create or overwrite a file under ${WORKSPACE_HINT}. Creates parent directories.`,
    parameters: WriteSchema,
    execute: async (_id, params) => {
      record({ name: "write_file", args: { path: params.path }, blocked: false });
      const resolved = assertWritable(params.path);
      fs.mkdirSync(path.dirname(resolved), { recursive: true });
      fs.writeFileSync(resolved, params.content);
      return {
        content: [{ type: "text", text: `wrote ${resolved} (${params.content.length} bytes)` }],
        details: { path: resolved },
      };
    },
  };

  const moveFile: AgentTool<typeof MoveSchema> = {
    name: "move_file",
    label: "Move File",
    description: `Move or rename a file under ${WORKSPACE_HINT}. Creates parent directories.`,
    parameters: MoveSchema,
    execute: async (_id, params) => {
      record({ name: "move_file", args: { from: params.from, to: params.to }, blocked: false });
      const from = assertWritable(params.from);
      const to = assertWritable(params.to);
      fs.mkdirSync(path.dirname(to), { recursive: true });
      fs.renameSync(from, to);
      return { content: [{ type: "text", text: `moved to ${to}` }], details: { from, to } };
    },
  };

  return [readFile, listDir, runSteLint, editFile, writeFile, moveFile] as AgentTool[];
}
