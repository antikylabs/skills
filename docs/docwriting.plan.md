# Plan — documentation writing skills

**Status:** proposal, not started
**Sources read:** [Diátaxis](https://diataxis.fr/),
`antikylabs/antiky@feat/marketing-stuff2:docs/user-facing-docs/` (`DOCUMENTATION_STANDARDS_A.md`,
`AGENTS.md`)

## The split

Two skills, not one:

| Skill | Carries | Works in |
| --- | --- | --- |
| `general-write-docs` | The craft: Diátaxis, reader-goal-first, what each page type is and how it fails | any repository |
| `repo-write-docs` | The placement: where pages go, what is generated, what vocabulary is banned, which test guards the contract | Antiky repositories |

This is the separation you asked for, and it maps onto the prefix taxonomy: `general-` is portable
practice, `repo-` is working inside an Antiky repository.

Note that neither is `antiky-`. That prefix is for helping someone **use** Antiky — a game developer
with the released CLI who does not have this repository. Writing this repository's documentation is
repository work, however much of it is about Antiky.

`repo-write-docs` is thin and **depends on** the general skill: its SKILL.md says "load
`general-write-docs` first, then apply what follows". It never restates the craft. That keeps one
copy of the Diátaxis rules and lets the conventions change without touching them.

## `general-write-docs`

### Commands

| Command | Purpose | Writes |
| --- | --- | --- |
| `classify [target]` | Decide which of the four types a page is, or should be | no |
| `write [topic]` | Draft a page of one declared type | yes |
| `audit [target]` | Report where a page mixes types, buries the goal, or leads with implementation | no |
| `split [target]` | Propose the split when a page has become two documents joined together | no |

`classify` is the default for a bare target. It is the cheapest useful thing and it is the decision
everything else depends on.

### What the craft reference has to carry

**The four types, and the failure mode of each.** Diátaxis is easy to quote and hard to apply; the
value is in the failure modes, not the definitions:

| Type | Reader need | Fails when |
| --- | --- | --- |
| Tutorial | Learn by completing something | It explains why, or branches on the reader's choices |
| How-to | Finish a specific real task | It teaches concepts the task does not need |
| Reference | Look up a fact while working | It has a narrative, or an opinion |
| Explanation | Understand why it is like this | It tries to be actionable |

**The two axes** — practical/theoretical and learning/lookup — as the tool for classifying a page
whose type is unclear, rather than as trivia.

**Reader-goal-first**, from the Antiky standards but true generally: answer *who is reading this*,
*what are they trying to finish*, *what is the shortest path to a useful result* before drafting.
The worked example in `DOCUMENTATION_STANDARDS_A.md` — opening a point-light page with stable
identity and render bindings versus "a point light shines from one position in every direction,
like a lamp or torch" — is the clearest statement of the rule I have seen and should be carried
across, generalised.

**One primary type per page.** A supporting section of another type is fine; a page that becomes
two full documents joined together must be split and linked, not duplicated.

### Not ASD-STE100

**This skill teaches Diátaxis, not STE.** They answer different questions — Diátaxis decides what a
page is for and how it is shaped; STE constrains the vocabulary and sentence form of a procedure
aimed at readers whose first language is not English. Product documentation wants to be *readable*,
which is not the same as *controlled*.

The two skills stay separate and neither invokes the other. An owner who wants a specific page in
STE can ask for it, and `general-simplified-technical-english` is right there — but
`general-write-docs` must not reach for it by default, or every tutorial ends up written like a
maintenance manual.

## `repo-write-docs`

The house standards for Antiky documentation, carried by a skill so every repository gets the same
ones. See "The skill is the authority" below — this is not a mirror of what a repository already
says, it is where those rules live.

- **Where pages live**: `docs/user-facing-docs/{api,cli,framework,mcp,studio}/`, `assets/`.
- **`api/` is generated.** Do not hand-edit. Change
  `packages/framework/scripts/api-reference-content.mjs` or the generator, then run
  `npm run docs:api --workspace @antiky/framework`. An agent that hand-edits a generated page has
  produced work that the next generation silently destroys — this is the single most valuable rule
  in the overlay.
- **Planning vocabulary is banned**: no *slice*, *objective*, *checkpoint*, or *evidence*. Those
  belong in `docs/objectives/`. This is a real trap for an agent that has just been working in the
  objectives skill, where that vocabulary is correct.
- **The contract test**: `packages/cli/tests/user-docs.test.ts` must be updated whenever a public
  name or workflow changes, and run before committing.
- **Audience**: a developer with the framework and CLI and no knowledge of this repository's
  delivery plan or demos. A repository demo may be *labelled* an example but must not define the
  product contract.
- **Ownership suffixes.** Antiky marks who owns a file: `_H` human, `_A` agent, `_S` script
  (generated). `DOCUMENTATION_STANDARDS_A.md` is agent-owned, which is why an agent may maintain it
  where it may not touch an `_H` record without instruction. The overlay states all three, because
  an agent that knows only `_H` will treat everything unsuffixed as fair game.

- **The generated pages do not carry `_S`, and probably should.** I checked: every page under
  `api/` — `engine-session.md`, `identity.md`, `point-light-core.md`, and the rest — is unsuffixed,
  and `DOCUMENTATION_STANDARDS_A.md` is the only suffixed file in the whole tree. So the "never
  hand-edit" rule cannot lean on the marker; it has to name the `api/` path, and an agent that
  reaches a generated page by any other route sees nothing telling it to stop.

  Renaming them `*_S.md` would make the rule self-evident at the point of use instead of requiring
  path knowledge, and would let the overlay's eval assert on a suffix rather than a directory. That
  is a change to the Antiky repository and a suggestion, not part of this plan — worth raising as
  its own piece of work. Until then the overlay names the path.

## The skill is the authority, not the repository

Decided, and it inverts the usual reading of "overlay". `repo-write-docs` does not *mirror* what
`docs/user-facing-docs/AGENTS.md` says — it **replaces** it. That file shrinks to a pointer:

```markdown
Use the `repo-write-docs` skill when writing or restructuring a page in this folder.
```

The standards and the placement rules live in the skill.

**The reason is reuse.** Standards stored inside one repository serve that repository only. The same
standards carried by a skill can be installed everywhere at once — every Antiky repository that
writes user-facing documentation gets the same rules from one place, and a change to them is one
edit rather than one per repository. That is what makes this worth doing at all; an overlay that
only ever serves `antikylabs/antiky` would not justify a second skill.

It also removes the drift risk outright. There is no second copy to fall behind, because there is
no second copy.

Two consequences to handle when building:

- The skill must not say "read `AGENTS.md` as the authority", which is what `general-write-adrs`
  does today and what I had drafted here. It *is* the authority.
- Facts that are genuinely per-repository — a generator command, a test path — either get stated as
  a pattern the skill can check for, or stay in `AGENTS.md` as the small remainder. Do not let that
  remainder quietly grow back into the standards.

## Routing

Not a risk, as it turns out. The two skills reach an agent by **different mechanisms**:

- `general-write-docs` is model-invoked, from the catalog, on description match. Default behaviour.
- `repo-write-docs` is reached because `AGENTS.md` names it — deterministic, not a trigger contest.

That matters more than it looks. Every routing problem measured so far — `adr-trigger-not-ste`
flipping between runs, objectives scoring 7/13 against four competing descriptions — comes from
skills competing on description match. A skill an `AGENTS.md` points at directly does not compete,
so its description can be narrow and unassertive without costing it anything.

Still worth one collision case in each direction, cheap to write, but this is no longer the thing
that would sink the design.

## Evaluation

A new suite at `tests/eval/suites/general-write-docs/` and another for the overlay. Cases worth
having, each with the negative control the harness requires:

- classifying a how-to written as a tutorial, and vice versa;
- a page that leads with implementation detail — does the audit catch the buried goal?
- **hand-editing a generated `api/` page** — the overlay's highest-value case, asserted on the
  filesystem: the file must be unchanged and the agent must name the generator;
- planning vocabulary leaking into a user-facing page;
- a page serving two tasks — does `split` propose two pages rather than reorganising one?

The generated-page case is the one I would write first. It is behavioural, it is cheap to assert,
and getting it wrong destroys work silently.

## Acceptance

- `general-write-docs` ships with `classify`, `write`, `audit`, `split`, and a craft reference that
  carries the failure modes rather than the definitions. Diátaxis only — it does not reach for
  ASD-STE100.
- `repo-write-docs` defers to the general skill for craft and carries the house standards itself.
  It does not name an `AGENTS.md` as its authority.
- `docs/user-facing-docs/AGENTS.md` in the Antiky repository shrinks to a pointer at the skill, in
  its own change with the owner's agreement.
- Both have eval suites; the generated-page case asserts on the filesystem.
- A paired live run shows a positive delta on `general-write-docs`. `repo-write-docs` is reached by
  an `AGENTS.md` pointer rather than by description match, so its trigger cases matter less than its
  behaviour once loaded.
