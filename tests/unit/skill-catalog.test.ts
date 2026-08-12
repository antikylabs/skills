/**
 * Tests for skill discovery — what reaches the model's catalog, and what does not.
 *
 *   npm run test:unit
 *
 * These exercise `loadCatalog` against the real `skills/` tree rather than a
 * fixture, because the thing worth testing is that *our* skills are disclosed
 * the way we intend. A fixture would prove the filter works and say nothing
 * about whether we used it correctly.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadCatalog } from "../eval/sandbox/skills.ts";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SKILLS = path.resolve(HERE, "..", "..", "skills");

/** Skill directories whose SKILL.md sets disable-model-invocation. */
function humanOnlySkills(): string[] {
  return fs
    .readdirSync(SKILLS, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .filter((e) => {
      const md = path.join(SKILLS, e.name, "SKILL.md");
      return fs.existsSync(md) && /^disable-model-invocation:\s*true/m.test(fs.readFileSync(md, "utf-8"));
    })
    .map((e) => e.name);
}

describe("skill catalog", () => {
  it("loads every skill directory", async () => {
    const { skills } = await loadCatalog(SKILLS);
    const onDisk = fs
      .readdirSync(SKILLS, { withFileTypes: true })
      .filter((e) => e.isDirectory() && fs.existsSync(path.join(SKILLS, e.name, "SKILL.md")))
      .map((e) => e.name);

    // loadCatalog returns only model-visible skills, so the visible set plus the
    // human-only set must account for everything on disk.
    const accounted = new Set([...skills.map((s) => s.name), ...humanOnlySkills()]);
    for (const name of onDisk) {
      assert.ok(accounted.has(name), `${name} is on disk but neither visible nor human-only`);
    }
  });

  it("reports no loader diagnostics", async () => {
    // A malformed SKILL.md parses into a diagnostic rather than throwing, so a
    // silent frontmatter error would otherwise ship unnoticed.
    const { diagnostics } = await loadCatalog(SKILLS);
    assert.deepEqual(
      diagnostics.map((d) => `${d.code}: ${d.path}`),
      [],
    );
  });

  it("excludes human-only skills from the model's catalog", async () => {
    const humanOnly = humanOnlySkills();
    assert.ok(humanOnly.length > 0, "no skill sets disable-model-invocation — this test proves nothing");

    const { skills, catalogXml } = await loadCatalog(SKILLS);
    for (const name of humanOnly) {
      assert.ok(!skills.some((s) => s.name === name), `${name} is human-only but reached the catalog`);
      assert.ok(!catalogXml.includes(name), `${name} appears in the catalog XML`);
    }
  });

  it("states its refusal to overwrite where the instruction is given", () => {
    // wait-what init generates a CONTEXT.md. The destructive failure is
    // regenerating one a human has curated, so the refusal has to be in the
    // playbook and not merely intended. Asserted on the text because the
    // command is prose, not code — there is nothing else to point a test at.
    const init = fs.readFileSync(path.join(SKILLS, "general-wait-what", "reference", "init.md"), "utf-8");
    assert.match(init, /Refuse if one exists/i);
    assert.match(init, /Do not overwrite an existing `CONTEXT\.md`/i);
  });

  it("puts every model-visible skill in the catalog with a description and a location", async () => {
    const { skills, catalogXml } = await loadCatalog(SKILLS);
    for (const skill of skills) {
      assert.ok(catalogXml.includes(`<name>${skill.name}</name>`), `${skill.name} missing from catalog`);
      assert.ok(skill.description.length > 0, `${skill.name} has no description`);
      // The location is how a model activates a skill: it reads that path.
      assert.ok(catalogXml.includes(skill.filePath), `${skill.name} has no location in the catalog`);
    }
  });
});
