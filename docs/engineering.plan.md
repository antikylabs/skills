# Plan — `general-engineering`, the sidekick

**Status:** proposal, owner feedback incorporated
**Sources read:** [`docs/GOOD_ENGINEERING_H.md`](GOOD_ENGINEERING_H.md),
[DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail),
[mattpocock/skills](https://github.com/mattpocock/skills) — `engineering/*`, and
`productivity/{grilling,grill-me}`

## What this is for

Not a code generator. A colleague you can hand something to and get an honest read back — a gut
check, a grilling, a second opinion before you commit to an approach. The value is in **pushing
back**, and a skill that agrees with you is worth nothing.

That framing decides most of the design below.

## What the sources give

**`GOOD_ENGINEERING_H.md`** — 24 sections. The skill ships its own copy, and **that copy is the
source of truth** (owner's call). One canonical location, so there is no drift to manage: the skill
is the distribution mechanism, and it has to work in a repository that does not have the file.

Consequence to settle when building: `docs/GOOD_ENGINEERING_H.md` in this repository becomes either
a pointer to the skill's copy or is removed, and the `_H` suffix moves with it. A human-owned
document living inside a skill is unusual but correct here — the skill does not own the *content*,
it just carries it.

**Ponytail** contributes the sharpest single mechanism — a ladder you stop at the first rung that
holds, *before* writing code:

> 1. Does this need to be built at all? 2. Does it already exist here? 3. Does the standard library
> do it? 4. Does a native platform feature? 5. Does an installed dependency? 6. Can this be one
> line? 7. Only then, the minimum that works.

With the guard that matters: *"The ladder runs after you understand the problem, not instead of it."*
And its inverse list — what laziness does **not** apply to: understanding the problem, validation at
trust boundaries, error handling that prevents data loss, security, accessibility, hardware
calibration, anything explicitly requested.

Also worth carrying: the `ponytail:` comment convention, marking a deliberate simplification with
its known ceiling and upgrade path. Cheap, and it turns a shortcut into a recorded decision.

**mattpocock/skills** contributes two things. Structurally, `engineering/` holds `code-review`,
`diagnosing-bugs`, `triage`, `wayfinder`, `prototype` and more — "engineering" is not one skill, the
useful unit is a named job. Our router already handles that.

And mechanically, `productivity/grilling` is the best single technique in either repository:

> Map this as a **design tree**: every decision branches into the decisions that hang off it. Work
> the tree in **rounds**. The **frontier** is every decision whose prerequisites are already settled
> […] Ask the whole frontier in one round: number each question and give your recommended answer.

Plus the rule that makes it usable: **"Finding facts is your job, never the user's."** A question the
agent could answer by reading the filesystem is not a question — it is laziness pointed the wrong
way. That belongs in `talk-it-out` verbatim in spirit.

## Commands

| Command | Purpose | Writes |
| --- | --- | --- |
| `gut-check [thing]` | Fast read on an approach before it is built. The ladder, applied | no |
| `talk-it-out [problem]` | Rounds of questions until the problem is actually stated, then stop | no |
| `plan-it [work]` | Engineering judgement over a plan; hands off to the objectives skill for shape | no |
| `grill-it [target]` | Adversarial review of something that exists. Our review **and** audit | no |

Four, not five. `review` and `audit` are gone — folded into `grill-it`, which is the anti-sycophancy
command rather than a politer reviewer.

**Every command is read-only.** The sidekick's job is judgement, not edits. Keeping it read-only is
what stops "gut-check this" turning into an unrequested refactor.

Routing: a bare target goes to `gut-check`, the cheapest and least committal.

### `talk-it-out` versus `grill-it`

They share a mechanism and point in opposite directions, and the descriptions must make that
obvious or they will collide the way the ADR and STE skills already do.

| | `talk-it-out` | `grill-it` |
| --- | --- | --- |
| Input | A fuzzy problem | A proposal, plan, or change that exists |
| Stance | Collaborative — help you state it | Adversarial — try to break it |
| Ends when | The problem is stated and the frontier is empty | Findings are ranked and stated |
| Failure | Keeps asking after it is clear | Finds nothing, or finds only nits |

Both use the design-tree rounds from `grilling`. `talk-it-out` asks the user; `grill-it` interrogates
the artifact and only asks where the artifact cannot answer.

`talk-it-out` is the one I would build first. GOOD_ENGINEERING has "Say when you don't understand"
as a principle, and the most common failure I have watched in this repository is an agent proceeding
confidently from a problem statement nobody had pinned down.

### `plan-it` and the objectives skill

Not all plans are engineering plans, so these do not collapse into one. `plan-it` brings engineering
judgement — the ladder, the tradeoffs, what not to build — and **hands off to
`general-write-objectives create-plan`** for anything objective-sized, rather than reimplementing the
plan format.

Practically: `plan-it` produces the thinking; `create-plan` produces the artifact. Both descriptions
need a line saying so.

## Composition

The sidekick reaches for other skills rather than restating them:

- an unrecorded decision → `general-write-adrs suggest`
- work too big to hold → `general-write-objectives`
- prose that has to meet the standard → `general-simplified-technical-english`
- a dependency defect → `general-brometal-patching`

This is the first skill that will *invoke other skills*, and the eval has never tested that path.
Worth a case of its own.

## Portability

**Portable. No `repo-` overlay** (owner's call). Engineering judgement does not change between
repositories, and the repository-specific parts are already in ADRs and `AGENTS.md`, which the
sidekick reads rather than restates.

## The behavioural problem

A sidekick that only agrees is useless, and models are agreeable by default. Concretely:

- `gut-check` must be able to answer "yes, build it as proposed" — a skill that always finds
  something is also useless, just differently;
- `talk-it-out` must **stop** when the problem is clear, not keep asking;
- `grill-it` must rank findings and say what it did not check;
- every command must be able to say "I do not know", per GOOD_ENGINEERING's own principle.

## Evaluation

`tests/eval/suites/general-engineering/`. The owner's note on sycophancy — *try to eval it, good
luck* — is fair: this is the hardest thing the harness has been pointed at, and the cases have to be
built so that **reflexive criticism fails them**.

- **A proposal that is genuinely fine.** Does `gut-check` approve it? The anti-sycophancy control in
  the inverse direction, and the first case I would write. A skill that cannot say "this is fine"
  has just moved the bias.
- **A proposal that should not be built at all** (rung 1). Does it say so, rather than improving it?
- **A problem statement with a hidden ambiguity.** Does `talk-it-out` find it?
- **A problem statement that is already clear.** Does `talk-it-out` *stop* rather than manufacture a
  round of questions? This is the one that catches performative thoroughness.
- **A fact the agent could look up.** Does `talk-it-out` find it instead of asking the user? Directly
  assertable from the tool trace: a question about something readable from the filesystem, with no
  preceding read, is a failure.
- **A one-line fix presented as needing a framework.** Does the ladder catch it?
- **Something in the "not lazy about" list** — validation at a trust boundary — dressed up as
  simplifiable. Does it refuse to simplify?
- **`grill-it` against a genuinely sound design.** Does it come back with "this holds" plus its
  reasoning, or does it invent findings to look useful?
- **Composition**: a grilling that surfaces an undocumented decision. Does it reach for
  `general-write-adrs suggest` rather than writing an ADR itself?

Two of those — approval of a sound proposal, and stopping when the problem is clear — are the
suite's spine. Without them the eval rewards a sycophant that has learned to sound sceptical, which
is worse than the sycophant because it is harder to notice.

## Attribution

Both sources are MIT-licensed and both contribute substance, not just inspiration. A `NOTICE.md`
credits **DietrichGebert/ponytail** for the laziness ladder and the `ponytail:` convention, and
**mattpocock/skills** for the design-tree grilling mechanism — the same treatment
`general-simplified-technical-english` gives ASD-STE100.

## Risks

- **Scope.** Four commands, accepted as fine. Watch it: the failures in the shipped skills cluster on
  playbooks that try to do too much per command.
- **Sycophancy remains the real failure mode**, and it is the one an eval is worst at catching. The
  two spine cases above are the mitigation, and they may not be enough.
- **`talk-it-out` and `grill-it` colliding.** They share a mechanism; the descriptions must separate
  them on stance and input, and the trigger cases must include a collision case in both directions.

## Acceptance

- `general-engineering` ships with `gut-check`, `talk-it-out`, `plan-it`, `grill-it`, all read-only.
- It carries its own copy of GOOD_ENGINEERING as the source of truth, and `docs/` is reconciled to a
  pointer or removed in the same change.
- `NOTICE.md` credits ponytail and mattpocock.
- `plan-it` hands off to `general-write-objectives create-plan`; both descriptions say so.
- An eval suite whose first two cases are **approval of a sound proposal** and **stopping when the
  problem is already clear**.
- A paired live run showing a positive delta, with both spine cases passing.
