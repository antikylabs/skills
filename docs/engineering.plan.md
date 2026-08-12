# Plan — `general-engineering`, the sidekick

**Status:** proposal, not started
**Sources read:** [`docs/GOOD_ENGINEERING_H.md`](GOOD_ENGINEERING_H.md),
[DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail),
[mattpocock/skills](https://github.com/mattpocock/skills)

## What this is for

Not a code generator. A colleague you can hand something to and get an honest read back — a gut
check, a review, a second opinion before you commit to an approach. The value is in **pushing back**,
and a skill that agrees with you is worth nothing.

That framing decides most of the design below.

## What the sources give

**`GOOD_ENGINEERING_H.md`** is the authority — 24 sections, human-owned. The skill ships **its own
copy** (you asked for this explicitly) so it works in a repository that does not have the file.
Consequence: two copies that can drift. See Risks.

**Ponytail** contributes the sharpest single mechanism I found — a ladder you stop at the first rung
that holds, *before* writing code:

> 1. Does this need to be built at all? 2. Does it already exist here? 3. Does the standard library
> do it? 4. Does a native platform feature? 5. Does an installed dependency? 6. Can this be one
> line? 7. Only then, the minimum that works.

With the guard that matters: *"The ladder runs after you understand the problem, not instead of it."*
And its inverse list — what laziness does **not** apply to: understanding the problem, validation at
trust boundaries, error handling that prevents data loss, security, accessibility, hardware
calibration, anything explicitly requested.

Also worth carrying: the `ponytail:` comment convention, marking a deliberate simplification with
its known ceiling and upgrade path. That is a good habit and it is cheap.

**mattpocock/skills** contributes structure rather than content — `engineering/` holds `code-review`,
`codebase-design`, `diagnosing-bugs`, `triage`, `wayfinder`, `prototype`, `research`, `tdd`, and
`ask-matt`. The lesson is that "engineering" is not one skill; the useful unit is a named job. Our
router pattern already handles that.

## Commands

| Command | Purpose | Writes |
| --- | --- | --- |
| `gut-check [thing]` | Fast read on an approach before it is built. The ladder, applied | no |
| `talk-it-out [problem]` | Socratic: ask until the problem is stated properly, then stop | no |
| `plan-it [work]` | Turn an understood problem into a sequenced approach with named tradeoffs | no |
| `review [target]` | Read a change against the principles, most serious finding first | no |
| `audit [area]` | Standing survey of a subsystem: complexity, coupling, what to delete | no |

**Every command is read-only.** The sidekick's job is judgement, not edits. If it should implement,
that is a different skill or a direct instruction — and keeping it read-only is what stops
"gut-check this" turning into an unrequested refactor.

Routing: a bare target goes to `gut-check`, the cheapest and least committal.

### Why these five

`gut-check` and `talk-it-out` are the two you named, and they are the two that do not exist
elsewhere. `review` and `audit` overlap with `/code-review` in the harness — see Risks.

`talk-it-out` is the one I would build first. GOOD_ENGINEERING has "Say when you don't understand"
as a principle, and the single most common failure I have watched in this repository is an agent
proceeding confidently from a problem statement nobody had actually pinned down. A command whose
entire job is to refuse to proceed until the problem is stated is worth more than another reviewer.

## Composition

The sidekick reaches for other skills rather than restating them:

- an unrecorded decision → `general-write-adrs suggest`
- work too big to hold → `general-write-objectives`
- prose that has to meet the standard → `general-simplified-technical-english`
- a dependency defect → `general-brometal-patching`

This is the first skill that will *invoke other skills*, and the eval has never tested that path.
Worth a case of its own.

## The behavioural problem

A sidekick that only agrees is useless, and models are agreeable by default. Concretely:

- `gut-check` must be able to answer "yes, build it as proposed" — a skill that always finds
  something is also useless, just differently;
- `talk-it-out` must **stop** when the problem is clear, not keep asking;
- `review` must rank findings and say what it did not check;
- every command must be able to say "I do not know", per GOOD_ENGINEERING's own principle.

These are hard to assert and easy to fake. The eval cases have to be built around traces where the
right answer is *approval*, or *silence*, so the skill cannot pass by reflexive criticism. Without
those the suite rewards a sycophant that has learned to sound sceptical.

## Evaluation

`tests/eval/suites/general-engineering/`. The cases that carry weight:

- **A proposal that is genuinely fine.** Does `gut-check` approve it? This is the anti-sycophancy
  control and I would write it first.
- **A proposal that should not be built at all** (rung 1). Does it say so, rather than improving it?
- **A problem statement with a hidden ambiguity.** Does `talk-it-out` find it and stop?
- **A one-line fix presented as needing a framework.** Does the ladder catch it?
- **Something in the "not lazy about" list** — validation at a trust boundary — dressed up as
  simplifiable. Does it refuse to simplify?
- **Composition**: a review that surfaces an undocumented decision. Does it reach for
  `general-write-adrs suggest` rather than writing an ADR itself?

## Risks

- **Two copies of GOOD_ENGINEERING will drift.** The skill's copy is the shipped one; `docs/` is the
  authority. Mitigation: a unit test asserting the two are identical, the same shape as the
  `ships no Python` test. Cheap, and it fails loudly the day someone edits one.
- **Overlap with `/code-review`.** The harness already has a code-review command. `review` and
  `audit` may be redundant — the distinct value here is *principles-based* judgement, not defect
  hunting. If that distinction cannot be stated in one sentence in the description, cut those two
  commands and ship three.
- **Scope.** Five commands is at the top of what one skill should carry, and three of the four
  existing skills' failures cluster on playbooks that try to do too much per command.
- **Sycophancy is the real failure mode**, and it is the one an eval is worst at catching.

## Open questions

1. Does `plan-it` overlap with `general-write-objectives create-plan` enough to cut? My read: yes
   for anything objective-sized, no for a single change. Needs a line in both descriptions.
2. Ponytail is MIT-licensed and its ladder is its substance. Carrying it means attribution — a
   `NOTICE.md`, as `general-simplified-technical-english` has for ASD-STE100.
3. Is there a `repo-` overlay here, or is engineering judgement portable? My read: **portable, no
   overlay**. The repository-specific parts are already in ADRs and `AGENTS.md`, which the sidekick
   reads rather than restates. Note it would be `repo-` and not `antiky-` if one were ever needed —
   judging a change inside this repository is repository work, not helping someone use Antiky.

## Acceptance

- `general-engineering` ships with a router, the ladder, its own copy of GOOD_ENGINEERING, and a
  `NOTICE.md` for ponytail.
- All commands read-only.
- An eval suite whose first case is a proposal that should be **approved**.
- A unit test asserting the shipped copy of GOOD_ENGINEERING matches `docs/`.
- A paired live run showing a positive delta, with the approval case passing.
