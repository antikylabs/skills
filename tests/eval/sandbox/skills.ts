/**
 * Skill discovery, on pi's own API.
 *
 * pi-agent-core ships `loadSkills()` and a `Skill` type, and its harness emits
 * an `<available_skills>` catalog per the Agent Skills spec. This file uses
 * them rather than reimplementing discovery, so the eval measures the loading
 * path the deployment actually uses.
 *
 * Activation follows pi's model: **the catalog carries name, description and
 * location, and the model loads a skill by reading that path with its ordinary
 * file-read tool.** There is deliberately no `activate_skill` tool. The spec
 * permits a dedicated tool, but pi does not use one, and offering it here would
 * make invocation far more salient than in production and inflate every trigger
 * result.
 *
 * `loadSkills` needs an ExecutionEnv (FileSystem & Shell). It calls exactly
 * five read-only methods, so the adapter below implements those and refuses
 * everything else — the harness cannot write or shell out even by accident.
 */

import fs from "node:fs";
import path from "node:path";
import { loadSkills, type Skill } from "@earendil-works/pi-agent-core";
import type { ExecutionEnv, FileInfo } from "@earendil-works/pi-agent-core";

const ok = <T,>(value: T) => ({ ok: true as const, value });
const fail = (message: string, path: string) => ({
  ok: false as const,
  error: { code: "not_found" as const, message, path },
});

function toFileInfo(target: string): FileInfo {
  const stat = fs.lstatSync(target);
  return {
    name: path.basename(target),
    path: target,
    kind: stat.isDirectory() ? "directory" : stat.isSymbolicLink() ? "symlink" : "file",
    size: stat.size,
    mtimeMs: stat.mtimeMs,
  };
}

/**
 * The five read-only methods `loadSkills` calls, and nothing else.
 *
 * Every other member of FileSystem and Shell throws. If pi starts calling a
 * sixth method the eval fails loudly rather than silently degrading, which is
 * the behaviour we want from a pinned dependency.
 */
export function readOnlyEnv(cwd = "/"): ExecutionEnv {
  const refuse = (name: string) => () => {
    throw new Error(`${name} is not available: the eval environment is read-only`);
  };

  const env = {
    cwd,
    async absolutePath(target: string) {
      return ok(path.resolve(cwd, target));
    },
    async joinPath(parts: string[]) {
      return ok(path.join(...parts));
    },
    async canonicalPath(target: string) {
      try {
        return ok(fs.realpathSync(target));
      } catch {
        return fail("cannot canonicalize", target);
      }
    },
    async fileInfo(target: string) {
      try {
        return ok(toFileInfo(target));
      } catch {
        return fail("no such path", target);
      }
    },
    async listDir(target: string) {
      try {
        return ok(fs.readdirSync(target).map((name) => toFileInfo(path.join(target, name))));
      } catch {
        return fail("cannot list", target);
      }
    },
    async readTextFile(target: string) {
      try {
        return ok(fs.readFileSync(target, "utf-8"));
      } catch {
        return fail("cannot read", target);
      }
    },
  } as unknown as Record<string, unknown>;

  for (const name of [
    "readTextLines", "readBinaryFile", "writeFile", "appendFile", "renameFile",
    "deleteFile", "createDirectory", "exec", "spawn", "which",
  ]) {
    if (!(name in env)) env[name] = refuse(name);
  }

  return env as unknown as ExecutionEnv;
}

export interface SkillCatalog {
  skills: Skill[];
  /** The `<available_skills>` block, or "" when no skills were found. */
  catalogXml: string;
  /** Loader warnings — a malformed SKILL.md shows up here rather than vanishing. */
  diagnostics: { code: string; message: string; path: string }[];
}

/**
 * Load every skill under `dir` and render the spec catalog.
 *
 * The format follows agentskills.io: name, description, and location, so the
 * model can read the SKILL.md itself. Tier 1 of progressive disclosure — the
 * body is never in the catalog.
 */
export async function loadCatalog(dir: string): Promise<SkillCatalog> {
  const { skills, diagnostics } = await loadSkills(readOnlyEnv(), dir);

  const visible = skills.filter((s) => !s.disableModelInvocation);
  if (visible.length === 0) {
    return { skills: [], catalogXml: "", diagnostics };
  }

  const entries = visible
    .map(
      (s) =>
        `  <skill>\n` +
        `    <name>${s.name}</name>\n` +
        `    <description>${escapeXml(s.description)}</description>\n` +
        `    <location>${s.filePath}</location>\n` +
        `  </skill>`,
    )
    .join("\n");

  return {
    skills: visible,
    catalogXml: `<available_skills>\n${entries}\n</available_skills>`,
    diagnostics,
  };
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * The behavioural instruction the spec pairs with a file-read catalog.
 * Quoted closely from agentskills.io so the eval does not accidentally coach
 * the model harder than a real harness would.
 */
export const SKILL_INSTRUCTIONS = `The following skills provide specialized instructions for specific tasks.
When a task matches a skill's description, use your file-read tool to load
the SKILL.md at the listed location before proceeding.
When a skill references relative paths, resolve them against the skill's
directory (the parent of SKILL.md) and use absolute paths in tool calls.`;
