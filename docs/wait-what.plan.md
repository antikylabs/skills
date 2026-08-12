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
different kind of vague. Naming a standard and a glossary produces a specific rewrite with something
checkable behind it. Ours names the standard we ship; the glossary is the part we do not have — see
below.

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
> - Use the terms this repository already uses. Read the nearest `AGENTS.md`, and the ADRs for
>   anything architectural. Do not reach for a synonym that reads better.
> - If the thing you said was wrong rather than unclear, say that instead of re-pitching it.

That last bullet is mine, not the original's, and it matters: sometimes the message did not land
because it was incorrect, and a fluent re-pitch of a wrong claim is worse than the first attempt.

## Where the vocabulary comes from

The original names `CONTEXT.md`. **We do not have one and are not adopting the idea for now**, so
the skill must not name a file that does not exist — an instruction to read a missing file is worse
than no instruction, because the agent either invents its contents or stalls.

Instead: *"use the terms this repository already uses — read the nearest `AGENTS.md`, and the ADRs
for anything architectural."* That is true today, needs no new file, and degrades gracefully in a
repository that has neither.

Worth noting rather than acting on: an agent's terminology currently comes from whatever it last
read, which is the drift ADRs exist to prevent. If a glossary ever appears — under any name — this
skill should point at it, and that is a one-line change.

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
- The skill names no file that does not exist. Vocabulary comes from the nearest `AGENTS.md`
  and the ADRs.
- Attribution to mattpocock/skills.
