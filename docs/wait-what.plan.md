# Plan — `general-wait-what`

**Status:** proposal, owner feedback incorporated
**Source:** [`mattpocock/skills:skills/productivity/wait-what`](https://github.com/mattpocock/skills)

## What it is

A human interrupt. You invoke it when something did not land, and it re-pitches rather than
summarising, apologising, or starting over.

Matt Pocock's version is four lines:

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

Two details do the work:

**`disable-model-invocation: true`** — the model can never trigger this. An agent deciding for
itself that it was unclear is the opposite of the point. Our `skills.ts` already honours the flag:
`loadCatalog` filters those skills out, so it costs nothing in the trigger budget and its
description never competes with anything.

**It names a controlled language and a vocabulary source.** "Explain it more simply" produces a
different kind of vague. Naming a standard and a glossary produces a specific rewrite with something
checkable behind it — and we ship the standard, so the re-pitch can be linted.

## Two things did not land: the message, or the artifact

There are two failures and they need different responses.

| | **conversation** | **artifact** |
| --- | --- | --- |
| Invoked | `wait-what` | `wait-what <path>` |
| Means | "What you just said makes no sense" | "What you just wrote in this file makes no sense" |
| Response | Re-pitch the claim, in place, now | Read it back, find where it goes wrong, then route |
| Ends with | A clearer statement | A conversation, and usually an edit by another skill |

The conversational one is the original and must stay **instant**. It is an interrupt; if it has to
consult a table or pick a branch before answering, it has failed at the one job where latency is the
whole point. Bare invocation always takes this path.

The artifact one is a different job wearing the same name. What you wrote in a file being unclear is
rarely fixed by re-pitching a sentence — it usually means the structure is wrong, or the thing it
describes is wrong. So it hands off:

- **`general-engineering talk-it-out`** when the *thinking* is unclear — the artifact reads badly
  because the underlying decision was never pinned down;
- **`general-write-docs`** when the *writing* is unclear — the thinking is fine and the page is the
  wrong shape, or the wrong Diátaxis type;
- **`general-simplified-technical-english`** when the prose has to meet the standard.

It does not fix the file itself. It works out which of those it is, says so, and reaches for the
skill that owns it. That is the whole value: turning "this is confusing" into "this is confusing
*because*", and routing accordingly.

### One skill or two?

One, with the path argument deciding. They share a trigger phrase, a stance, and a human invoker,
and `disable-model-invocation` means their descriptions never compete for routing — which is the
usual reason to split. Two skills would be two things to remember at the moment you are already
frustrated.

Revisit if the artifact path grows past a screen. That is the signal it has become its own skill.

## `CONTEXT.md`, optional

Adopted, with a condition: **use it if it exists, never require it.** An instruction to read a
missing file is worse than no instruction — the agent either invents its contents or stalls.

So the skill says: *use the terms this repository already uses. Read `CONTEXT.md` if there is one,
otherwise the nearest `AGENTS.md`, and the ADRs for anything architectural.* That works in a
repository that has one, a repository that does not, and a repository that grows one later, with no
edit to the skill.

### `wait-what init`

A third path that bootstraps a `CONTEXT.md` from the repository: what this project is, its domain
vocabulary, the terms that already appear in its ADRs and `AGENTS.md` files.

This is the one piece of real work in the skill, and it earns its place — an agent's terminology
currently comes from whatever it last read, which is the drift ADRs exist to prevent. A generated
first draft that a human then corrects is worth more than an empty template.

Two constraints:

- **It drafts, the human owns.** `CONTEXT.md` is a vocabulary the team commits to. Generate it, show
  it, say plainly that it is a draft assembled from what the repository already says, and do not
  present invented terms as established ones. Each term should name where it was drawn from.
- **It refuses to overwrite.** If a `CONTEXT.md` exists, report that and stop. Regenerating a
  glossary someone has curated is the worst outcome this command has available to it.

## Design

```
skills/general-wait-what/
  SKILL.md          the router and the conversational path — short
  reference/
    artifact.md     the read-back-and-route procedure
    init.md         generating a CONTEXT.md
  agents/openai.yaml
```

The first draft of this plan said the skill should have no `reference/`, and that a router would
mean it had stopped being itself. That held when it did one thing. It now does three, and the router
is what keeps the conversational path instant: the branch is one line, and the two heavier paths
live in files the fast path never loads.

Frontmatter: `name: general-wait-what`, `disable-model-invocation: true`, and a `description`
written for a human reading a command list, since the model never routes on it.

The conversational body, roughly:

> Stop. That last message did not land.
>
> Re-pitch the same claim. Do not summarise what you said, do not apologise, and do not start the
> work again.
>
> - Restore the context: what were you looking at, and what were you trying to establish?
> - Write it in ASD-STE100 Simplified Technical English — short active sentences, one topic each,
>   approved vocabulary. Load `general-simplified-technical-english` if you need the rules.
> - Use the terms this repository already uses. Read `CONTEXT.md` if there is one, otherwise the
>   nearest `AGENTS.md`. Do not reach for a synonym that reads better.
> - If the thing you said was wrong rather than unclear, say that instead of re-pitching it.

That last bullet is not in the original and it matters: sometimes the message did not land because
it was incorrect, and a fluent re-pitch of a wrong claim is worse than the first attempt.

## Evaluation

Partly outside what the harness measures, and that is fine.

The harness measures whether a skill is *loaded from the catalog* and then *followed*. This skill is
never in the catalog, so every trigger case is meaningless by construction.

What can be tested:

- **A unit test**: `loadCatalog` must exclude it. That covers the `disableModelInvocation` filter in
  `skills.ts`, which is written and currently untested.
- **A unit test**: `init` refuses to overwrite an existing `CONTEXT.md`. Cheap, filesystem-asserted,
  and it guards the one destructive thing here.
- **Behavioural cases**, injecting the skill body as if a human had invoked it:
  - the re-pitch is shorter than the original, drops its jargon, and passes `ste_lint.mjs` with no
    errors — mechanically checkable because we ship the linter;
  - the artifact path **routes rather than rewrites**: given a file whose problem is structural, it
    reaches for `general-write-docs` instead of editing prose;
  - a claim that was *wrong* rather than unclear gets corrected, not re-pitched. The anti-fluency
    case, and the one I would write first.

If injecting a user-invoked skill needs harness changes, the behavioural cases can wait. Ship with
the two unit tests.

## Risks

- **Tone.** The failure is an apology and a summary. The body forbids both explicitly.
- **The artifact path becoming a rewriter.** It is a router. If it starts editing prose it has
  become a worse version of the skills it should be calling.
- **`init` inventing vocabulary.** A glossary that confidently lists terms nobody uses is worse than
  no glossary, because it will be cited. Draft only, sourced per term.
- **Attribution.** The idea and its shape are Matt Pocock's, MIT-licensed. Credit in `SKILL.md` and
  a row in the README.

## Acceptance

- `general-wait-what` ships with `disable-model-invocation: true` and three paths: bare
  (conversational), path argument (artifact), `init`.
- The conversational path is answerable without loading a reference file.
- The artifact path routes to `general-engineering`, `general-write-docs`, or
  `general-simplified-technical-english` and does not edit the file itself.
- `CONTEXT.md` is used when present and never required; `init` drafts one and refuses to overwrite.
- Unit tests: excluded from the catalog, and `init` does not overwrite.
- Attribution to mattpocock/skills.
