import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SKILLS_DIR = path.resolve(HERE, "../../skills");

/** Build a temporary /skills tree containing exactly the named skills. */
export function buildSkillSet(names: string[]): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "antiky-skill-set-"));

  for (const name of names) {
    const source = path.join(SKILLS_DIR, name);
    const skill = path.join(source, "SKILL.md");
    if (!fs.existsSync(skill)) throw new Error(`unknown skill: ${name}`);
    fs.cpSync(source, path.join(root, name), { recursive: true });
  }

  return root;
}
