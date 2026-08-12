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

### Open question

Does `write` draft to ASD-STE100? The ADR standards require it; the user-facing documentation
standards do not mention it. My reading is **no by default** — STE is a controlled language for
procedures aimed at non-native readers, and product documentation has different aims — but this is
the owner's call, and it is the kind of thing that is expensive to reverse once pages exist. If yes,
`general-write-docs` composes with `general-simplified-technical-english` rather than restating it.

## `repo-write-docs`

Everything here is repository fact, and all of it would be wrong in another repository. That is
exactly why it is a separate skill.

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
- **`_A` suffix** on `DOCUMENTATION_STANDARDS_A.md` — establish what `_A` means alongside the known
  `_H` (human-owned) before writing the overlay, and record it.

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

## Risks

- **The overlay drifts from the repository.** Paths, generator commands, and test names are all
  facts that change. Mitigation: the overlay states them once and tells the agent to read
  `docs/user-facing-docs/AGENTS.md` as the authority, exactly as `general-write-adrs` does today.
- **Two skills, one job, ambiguous routing.** Both descriptions mention documentation, and the ADR
  suite already showed cross-skill interference when descriptions overlap. The overlay's description
  must be explicitly about *this repository's* documentation tree, and the trigger cases must
  include a collision case in both directions.

## Acceptance

- `general-write-docs` ships with `classify`, `write`, `audit`, `split`, and a craft reference that
  carries the failure modes rather than the definitions.
- `repo-write-docs` is thin, defers to the general skill, and carries only repository fact.
- Both have eval suites; the generated-page case asserts on the filesystem.
- A paired live run shows a positive delta on both, with the collision case passing in both
  directions.
