# Plan — splitting ADR and objective context

**Status:** proposal, not started
**Applies to:** `general-write-adrs`, `general-write-objectives` (both shipped, v0.2.3)

## The problem

Both skills are named `general-` and neither is general. They carry Antiky repository facts in their
craft playbooks, so they would mislead an agent in any other repository, and the conventions cannot
change without editing the craft.

What is actually Antiky-specific in them today:

**`general-write-adrs`**

| In the skill | Actually |
| --- | --- |
| `docs/adr/{framework,cli,studio}/` as *the* areas | Antiky's areas |
| `NNNN-title_H.md`, `_H` = human-owned | Antiky's ownership convention |
| `docs/adr/tag-hash.sh` for in-place clarifications | An Antiky script |
| "link the related AIP" | Antiky's proposal process |
| ASD-STE100 required | Antiky's writing standard |
| Five-part Nygard format, three statuses, supersede-never-edit | **Genuinely general** |
| Consequences must state costs; one decision per record | **Genuinely general** |
| Per-area numbering as a *concept* | General; the areas are not |

**`general-write-objectives`**

| In the skill | Actually |
| --- | --- |
| `docs/objectives/<name>/`, `_archives/`, `goals/_completed/` | Antiky's layout |
| `execute-goal-NN.md` / `summary-goal-NN.md` naming | Antiky's convention |
| `VISION_DIRECTION_H.md`, `GOOD_ENGINEERING_H.md` as required reading | Antiky's documents |
| The `demo-refining` provenance | An Antiky objective |
| research → plan → goals → execute → archive | **Genuinely general** |
| A goal is a contract; state operator input before start | **Genuinely general** |
| Stop conditions; summaries lead with what needs the owner | **Genuinely general** |

The lifecycle and the goal contract are the valuable parts and they are portable. The paths are not.

## The split

Same shape as the docwriting plan, so there is one pattern across the repository:

```
general-write-adrs        craft: the format, the statuses, the supersede rule, what a
                          Consequences section must contain
repo-write-adrs           placement: the three areas, per-area numbering, _H, tag-hash.sh,
                          the AIP link, the index, the STE requirement

general-write-objectives  craft: the lifecycle, the goal contract, the two scales
repo-write-objectives     placement: docs/objectives layout, file naming, required reading,
                          the archive convention
```

Each overlay opens by loading its general skill, then states only what is different here. No craft
is restated — that is the whole point, and the moment an overlay starts explaining the Nygard format
the split has failed.

## The prefix: decided

These overlays are **`repo-`**, not `antiky-`. The owner drew the line and it is now stated in
`AGENTS.md` and `README.md` so a skill author hits it before making the same mistake:

- `antiky-` helps someone **use** Antiky — a game developer with the released CLI and Framework, who
  neither has nor wants this repository;
- `repo-` helps someone **work inside** an Antiky repository — where a file goes, which script
  generates it, what the house conventions are.

ADR and objective placement is repository work, so both overlays are `repo-`. I had originally
proposed `antiky-` here, which was wrong for exactly the reason the clarification now names: the
subject matter is Antiky, but the *job* is repository work.

## The question still open: skills or `AGENTS.md`?

A third possibility remains, and it deserves a serious look before any overlay is built.

**No overlay skills at all.** The conventions live in the repository's own `AGENTS.md` files, and
the general skills say "read the nearest `AGENTS.md` for placement".

`docs/adr/AGENTS.md` and
`docs/user-facing-docs/AGENTS.md` **already exist and already carry these conventions** — the ADR
one is where I originally read the per-area numbering and the tag-hash procedure. An overlay skill
would be a second copy of something the repository already states at the point of use, and the
skills-vs-AGENTS.md boundary is worth getting right once rather than four times.

My read: **`AGENTS.md` for placement it already states, a `repo-` skill for procedure that needs
steps.** Split by artifact rather than by domain — a path belongs in `AGENTS.md`, a five-step
retirement procedure belongs in a skill. But this is a genuine architecture decision and it is
yours, not mine.

**This is an ADR.** Whatever we pick governs every future skill in this repository, and deciding it
in a plan file is exactly the mistake `general-write-adrs suggest` exists to catch.

## Migration

If the split happens, per skill:

1. Move Antiky facts out of the craft playbooks into the overlay, leaving the craft standing alone.
2. Re-read the craft as if in a foreign repository. Anything that no longer makes sense was load
   bearing and needs generalising, not deleting.
3. Split the eval suite: craft cases keep the general fixtures; placement cases move to the overlay
   suite with the Antiky-shaped fixtures. The ADR fixture already mirrors the real tree
   (`framework/` at 0002, `cli/` at 0005), so it moves wholesale to the overlay.
4. Add collision cases both ways. Four skills already produce cross-skill interference; eight will
   produce more, and `adr-trigger-not-ste` has already flipped between runs.
5. Re-run paired, per suite and combined.

## What this costs

Doubling the skill count doubles the catalog every agent carries, and the catalog is the thing that
decides routing. On the last full run, `team-write-objectives` scored 7/13 partly because four
descriptions were competing; eight will be worse. **The split is right for maintenance and a real
risk for triggering**, and that tension should be measured rather than argued — run the eval with
the overlays present and see what the trigger cases do.

## Acceptance

- An ADR records the skills-versus-`AGENTS.md` boundary, written with
  `general-write-adrs suggest` → owner decision → `write`.
- If the split proceeds: each craft skill reads correctly in a foreign repository, each overlay
  carries only local fact and restates no craft.
- Eval suites split to match, with collision cases in both directions.
- A paired live run before and after, compared — specifically on trigger cases.
