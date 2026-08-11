---
name: team-write-adrs
description: Write and propose Antiky Architecture Decision Records. Use when a human owner has made an architecture decision and wants it recorded, when a decision needs superseding, when an ADR's format, numbering, status, or index entry needs checking, or when work reveals an undocumented decision that should become an ADR. Covers the five-part format, per-area numbering, ownership, and the supersede rule.
---

# Write Antiky ADRs

An Architecture Decision Record captures one important decision about the Antiky architecture, why
it was necessary, and what follows from it. It is a short permanent record — not a proposal, a
design specification, or an implementation plan.

ADRs and accepted AIPs are what the team holds AI accountable to. They are inspected line by line
precisely so the code built on them does not have to be. Write them accordingly.

## The rule that governs every command

**ADRs are human-owned.** Core Contributors write, approve, and own them, and every file carries the
`_H` suffix. Do not create or change an ADR without an explicit instruction from a human owner, and
never change an accepted decision in place — see [reference/format.md](reference/format.md).

An ADR must stand on facts and requirements. It must not cite an objective, goal, feedback record,
or implementation plan as its authority. A planning document may link to an ADR; an ADR must not
link back to one.

## Commands

| Command | Purpose | Writes files? | Reference |
| --- | --- | --- | --- |
| `write [decision]` | Record a decision the owner has already made | yes, on instruction | [reference/write.md](reference/write.md) |
| `suggest [topic]` | Draft an ADR that does not exist yet, with why it should and what it would change | no | [reference/suggest.md](reference/suggest.md) |

Routing:

- **Explicit command** — load its reference and follow it.
- **"We decided X, write it up"** — `write`. The decision exists; you are recording it.
- **"Should this be an ADR?", "what are we missing?", an undocumented decision found during other
  work** — `suggest`. The decision is not yet made or not yet owned.
- **Neither is clear** — ask which. The difference is whether a human has already decided, and you
  cannot infer that from the code.

`write` records a decision. `suggest` proposes one. Never let `suggest` file an Accepted record:
proposal and review belong in an AIP or a pull request, not in the ADR tree.

## Language

Every ADR must conform to ASD-STE100 Simplified Technical English, Issue 9. Use the
`team-simplified-technical-english` skill — its `write` command drafts to the standard and its
`audit` command checks a draft with the linter.

Do not claim STE conformance from a linter run alone. The linter decides 14 checks; roughly half the
53 rules need judgement. Report both separately.

## Reference

| File | What it is |
| --- | --- |
| [reference/format.md](reference/format.md) | The five-part template, statuses, naming, per-area numbering, the index, and the supersede rule |
| [reference/write.md](reference/write.md) | Recording a decision an owner has made |
| [reference/suggest.md](reference/suggest.md) | Drafting a record that does not exist yet, with rationale and impact |

Read the target repository's own `docs/adr/README.md` and `docs/adr/AGENTS.md` before writing. They
are the authority. This skill carries the conventions so an agent applies them consistently, not so
it can skip reading them.
