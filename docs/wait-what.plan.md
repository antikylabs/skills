# Plan — `general-wait-what`

**Status:** proposal, not started
**Source:** [`mattpocock/skills:skills/productivity/wait-what`](https://github.com/mattpocock/skills)

## What it is

The smallest skill in this repository. Matt Pocock's version is four lines:

```markdown
---
name: wait-what
description: Stop. That last message did not land — re-pitch it.
disable-model-invocation: true
---

Wait — I don't understand where you've got to here. Re-pitch that: give me a little bit of
context, talk in ASD-STE100 Simplified Technical English, and use the ubiquitous language from
`CONTEXT.md`.
```

You invoke it when an agent has said something you did not follow. It does not summarise, apologise,
or start over — it re-pitches the same claim in controlled language with context restored.

Two details do the work:

**`disable-model-invocation: true`** — the model can never trigger this. It is a human's interrupt.
An agent deciding for itself that it was unclear is the opposite of the point, and our
`skills.ts` already honours the flag: `loadCatalog` filters those skills out of the catalog, so it
costs nothing in the trigger budget.

**It names a controlled language and a vocabulary source.** "Explain it more simply" produces a
different kind of vague. "Re-pitch in STE using the ubiquitous language from CONTEXT.md" produces a
specific rewrite with a checkable standard behind it.

## Why it fits here

We already ship the standard the original reaches for. `general-simplified-technical-english`
carries the controlled vocabulary and a deterministic linter, so our version can compose with a real
tool rather than gesturing at a spec — the re-pitch can be linted.

## Design

```
skills/general-wait-what/
  SKILL.md          the whole skill, under 30 lines
  agents/openai.yaml
```

No `reference/`. No commands. If it grows a router it has stopped being this skill.

Frontmatter:

- `name: general-wait-what`
- `disable-model-invocation: true`
- a `description` written for a human reading a command list, since the model never routes on it

Body, roughly:

> Stop. That last message did not land.
>
> Re-pitch the same claim. Do not summarise what you said, do not apologise, and do not start the
> work again.
>
> - Restore the context: what were you looking at, and what were you trying to establish?
> - Write it in ASD-STE100 Simplified Technical English — short active sentences, one topic each,
>   approved vocabulary. Load `general-simplified-technical-english` if you need the rules.
> - Use the project's ubiquitous language. Read the nearest `CONTEXT.md`, `AGENTS.md`, or glossary
>   for the terms this repository actually uses, and use those terms.
> - If the thing you said was wrong rather than unclear, say that instead of re-pitching it.

That last bullet is mine, not the original's, and it matters: sometimes the message did not land
because it was incorrect, and a fluent re-pitch of a wrong claim is worse than the first attempt.

## Open question

**What is our `CONTEXT.md`?** The original names a specific file. We do not have one. Candidates:
the nearest `AGENTS.md`, `docs/GOOD_ENGINEERING_H.md`, the ADR corpus as a de-facto glossary, or a
new `CONTEXT.md` holding Antiky's ubiquitous language — entity, component, render driver, slice,
objective, goal, revision.

A real one would be worth more than this skill. Right now an agent's terminology comes from whatever
it last read, which is exactly the drift the ADRs exist to prevent. I would raise creating one as
its own piece of work; until then the skill should say "the nearest `AGENTS.md` or glossary" rather
than name a file that does not exist.

## Evaluation

Mostly not evaluable by our harness, and that is fine.

The harness measures whether a skill gets *loaded* and *followed*. This skill is never loaded by a
model — `disable-model-invocation: true` keeps it out of the catalog entirely — so every trigger
case is meaningless by construction.

What can be tested:

- **A unit test**, not an eval: `loadCatalog` must exclude it. That exercises the
  `disableModelInvocation` filter in `skills.ts`, which is currently written and never covered.
- **One behavioural case**, injecting the skill body directly as if the user had invoked it, then
  asserting the re-pitch is shorter, avoids the jargon of the original, and passes `ste_lint.mjs`
  with no errors. That last assertion is the interesting one — we can check the re-pitch
  mechanically because we ship the linter.

If that case turns out to need harness changes to inject a user-invoked skill, it is not worth it
for one skill. Ship with the unit test and revisit when a second `disable-model-invocation` skill
exists.

## Risks

- **It is trivial to write and easy to get wrong in tone.** The failure is a skill that produces an
  apology and a summary. The body must forbid both explicitly.
- **Attribution.** The idea and its shape are Matt Pocock's, MIT-licensed. A one-line credit in
  `SKILL.md` and a row in the README, the same treatment ponytail gets in the engineering plan.

## Acceptance

- `general-wait-what` ships, under 30 lines, no `reference/`, `disable-model-invocation: true`.
- A unit test proves it is excluded from the catalog.
- The `CONTEXT.md` question is answered or explicitly deferred in the skill's text.
- Attribution to mattpocock/skills.
