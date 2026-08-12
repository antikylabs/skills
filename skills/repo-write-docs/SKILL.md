---
name: repo-write-docs
description: House standards for user-facing documentation in Antiky repositories — where pages live, which are generated and must never be hand-edited, the ownership suffixes, the banned planning vocabulary, and the contract test. Use alongside general-write-docs when writing or restructuring a page under docs/user-facing-docs/.
---

# Antiky documentation standards

**This skill is the standard.** It is not a summary of a file kept somewhere else — the conventions
live here, so every Antiky repository gets the same ones from one place, and changing them is one
edit rather than one per repository.

A repository's `AGENTS.md` points at this skill. It does not restate what is below.

## First: the craft is elsewhere

Load **`general-write-docs`** for how to write the page: the Diátaxis types, choosing one, drafting
reader-goal-first, auditing. That skill is portable and says nothing about placement.

This skill says only what is true *here*. If you find yourself explaining what a tutorial is, you
are in the wrong file.

## Where pages live

```
docs/user-facing-docs/
  api/          GENERATED — see below
  cli/          the command-line surface
  framework/    the framework, hand-written
  mcp/          the MCP tool surface
  studio/       Antiky Studio
  assets/       images and diagrams
```

## `api/` is generated. Never hand-edit it.

Every page under `api/` is produced by a generator. An edit there survives until the next
generation and then disappears silently, taking the work with it and leaving no trace of why the
page changed back.

To change a generated page, change what generates it:

```bash
# edit packages/framework/scripts/api-reference-content.mjs, or the generator itself
npm run docs:api --workspace @antiky/framework
```

Then commit the regenerated output with the source change.

If you are asked to fix something in `api/`, say that it is generated, name the generator, and make
the change there. Do not make the edit "just this once".

> The generated pages do not currently carry an ownership suffix that would mark them, so the path
> is the only signal. Treat everything under `api/` as generated regardless of its name.

## Ownership suffixes

A suffix on a filename says who owns it:

| Suffix | Owner | An agent may |
| --- | --- | --- |
| `_H` | Human | Read it. Change it only on the owner's explicit instruction |
| `_A` | Agent | Maintain it as part of normal work |
| `_S` | Script | Never edit. Change what generates it |

`DOCUMENTATION_STANDARDS_A.md` is agent-owned, which is why an agent may keep it current where it
may not touch an `_H` record unasked.

An unsuffixed file carries no ownership claim, which is not the same as being unowned. Ask before
rewriting one wholesale.

## No planning vocabulary

These docs are for a developer who has the framework and CLI and knows nothing about how this
repository is run. The words **slice**, **objective**, **checkpoint**, and **evidence** carry
internal meaning and must not appear.

This is a real trap when you have just been working in `general-write-objectives`, where that
vocabulary is correct and current in your context. Check for it before delivering.

Internal planning, delivery status, and verification records live under `docs/objectives/`.

## Audience and examples

Write for a developer integrating Antiky into their own game. They have the released CLI, framework,
and Studio. They do not have this repository, its delivery plan, or its demos.

- Describe behaviour available from the released boundary.
- Use generic, adaptable examples. A repository demo may be *labelled* as an example, but it must
  never define the product contract.
- Prefer public names, stable errors, and observable behaviour over internal implementation detail.
- Keep command, config, MCP tool, and API names synchronised with the source.

## Verification

Before committing documentation work:

1. **Update the contract test** — `packages/cli/tests/user-docs.test.ts` — whenever a public name or
   workflow changes. It is the thing that catches documentation drifting from the product.
2. Run that test and the affected package tests.
3. If you changed anything under `api/`, confirm you changed the generator and regenerated, and that
   `git status` shows the generated output rather than a hand edit.

## Report

- the page, its Diátaxis type, and the reader it serves;
- whether anything you touched was generated, and what you ran;
- whether the contract test needed updating, and whether you ran it;
- any planning vocabulary you removed;
- anything that needed an `_H` owner's decision.
