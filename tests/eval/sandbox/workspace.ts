/**
 * The agent's writable workspace.
 *
 * Earlier revisions of this harness refused every mutating tool, so a case could
 * only assert on what the agent *said* it would do. That tests prose, not
 * behaviour: an agent can describe the right ADR path and never create a file.
 *
 * The container is already the security boundary — read-only rootfs, no host
 * filesystem, non-root, all capabilities dropped, no network on faux runs — so a
 * writable scratch inside it costs nothing. `/workspace` is a tmpfs seeded with
 * a copy of the fixtures. The agent edits that; `/fixtures` stays pristine so
 * the run can be diffed against it afterwards.
 *
 * Writes outside `/workspace` still refuse. That keeps `/skills` and the
 * pristine fixtures immutable, and keeps an out-of-bounds attempt observable.
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export const WORKSPACE = "/workspace";
export const PRISTINE = "/fixtures";

/** Copy the fixtures into the writable workspace. Called once per run. */
export function seedWorkspace(): void {
  fs.mkdirSync(WORKSPACE, { recursive: true });
  fs.cpSync(PRISTINE, WORKSPACE, { recursive: true });
}

function hashFile(target: string): string {
  return crypto.createHash("sha256").update(fs.readFileSync(target)).digest("hex").slice(0, 16);
}

function walk(root: string): Map<string, string> {
  const out = new Map<string, string>();
  if (!fs.existsSync(root)) return out;
  const stack = [root];
  while (stack.length > 0) {
    const dir = stack.pop()!;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (entry.isFile()) out.set(path.relative(root, full), hashFile(full));
    }
  }
  return out;
}

/** What the agent changed, relative to the pristine fixtures. */
export interface Mutations {
  created: string[];
  modified: string[];
  deleted: string[];
  /** Contents of created files, so a case can assert on what was written. */
  contents: Record<string, string>;
}

/**
 * Diff the workspace against the pristine fixtures.
 *
 * `contents` carries created files only, capped, because a case usually needs to
 * check what was written and a modified file's diff is rarely what the assertion
 * turns on.
 */
export function collectMutations(maxBytes = 20_000): Mutations {
  const before = walk(PRISTINE);
  const after = walk(WORKSPACE);

  const created: string[] = [];
  const modified: string[] = [];
  const deleted: string[] = [];
  const contents: Record<string, string> = {};

  for (const [rel, hash] of after) {
    const prior = before.get(rel);
    if (prior === undefined) {
      created.push(rel);
      const full = path.join(WORKSPACE, rel);
      try {
        const stat = fs.statSync(full);
        if (stat.size <= maxBytes) contents[rel] = fs.readFileSync(full, "utf-8");
        else contents[rel] = `(${stat.size} bytes, truncated)`;
      } catch {
        /* unreadable: leave it out of contents */
      }
    } else if (prior !== hash) {
      modified.push(rel);
    }
  }
  for (const rel of before.keys()) if (!after.has(rel)) deleted.push(rel);

  created.sort();
  modified.sort();
  deleted.sort();
  return { created, modified, deleted, contents };
}
