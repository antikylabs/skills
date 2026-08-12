---
name: repo-write-objectives
description: House conventions for objectives in Antiky repositories — the docs/objectives layout, file naming for plan documents, goals and summaries, the archive convention, the simple-goal location, and the direction documents that must be read before planning. Use alongside general-write-objectives when scaffolding, planning, executing, or archiving an objective.
---

# Antiky objective conventions

**This skill is the convention.** The rules live here rather than in a repository's own files, so
every Antiky repository gets the same ones and changing them is one edit.

A repository's `docs/objectives/AGENTS.md` points at this skill. It does not restate what is below.

## First: the lifecycle is elsewhere

Load **`general-write-objectives`** for how objectives work: the phases, what each command does, the
goal contract, the two scales, and how a summary is written.

This skill says only where things go in an Antiky repository, and what must be read before planning.
If you find yourself explaining what a goal contract is, you are in the wrong file.

## Layout

```
docs/objectives/
  README.md                        index of active and archived objectives
  _archives/
    <name>-summary.md              one durable summary per finished objective
  <name>/
    objective.md                   the owner's raw intent. Input, never generated
    README.md                      generated: what this is and where it stands
    NN-<PLAN-TITLE>.md             numbered plan documents at the objective root
    research/
      NN-<finding>.md
      subagent_outputs/
        NN-<agent-name>.md         raw returns, kept as evidence
    goals/
      execute-goal-NN.md           open goals, in execution order
      _completed/
        execute-goal-NN.md
        summary-goal-NN.md
  goals/
    <goal-name>/                   a simple goal, not nested in an objective
      goal.md
      research/
      summary.md
    _completed/
      <goal-name>/
```

## Naming

| Thing | Pattern | Example |
| --- | --- | --- |
| Objective folder | `<kebab-name>/` | `demo-refining/` |
| Plan document | `NN-<TITLE>.md` | `02-REMEDIATION-PLAN.md` |
| Research document | `NN-<title>.md` | `00-research-plan.md` |
| Subagent output | `NN-<agent-name>.md` | `03-shader-specialist.md` |
| Goal | `execute-goal-NN.md` | `execute-goal-02.md` |
| Goal summary | `summary-goal-NN.md` | `summary-goal-02.md` |
| Archive summary | `<name>-summary.md` | `studio-summary.md` |

Two digits, starting at `00`, never reused. A gap is information.

**The goal filename is `execute-goal-NN.md`, not `NN-execute-goal.md`.** The existing tree is the
provenance — `docs/objectives/scratch/demo-refining/goals/` and `inspection-tooling/goals/` — and the
links between goals already point at that form.

## Read before planning

Before `create-plan` or `create-goals`, read:

- `docs/VISION_DIRECTION_H.md` — human-owned product direction;
- `docs/GOOD_ENGINEERING_H.md` — before any design or architecture decision;
- the relevant records in `docs/adr/` and `docs/aip/`;
- the repository `AGENTS.md`, and the nearest one to the code being changed.

A plan applies accepted direction and decisions. It cannot overrule an accepted ADR. If the work
needs a decision changed, that is an ADR — use `general-write-adrs suggest` and say so in the plan
rather than planning around it.

## Ownership suffixes

| Suffix | Owner | An agent may |
| --- | --- | --- |
| `_H` | Human | Read it. Change it only on the owner's explicit instruction |
| `_A` | Agent | Maintain it as part of normal work |
| `_S` | Script | Never edit. Change what generates it |

`objective.md` carries no suffix but is the owner's input. Never rewrite it, never tidy it, and never
fill it in with content the owner did not supply.

## Archiving

A completed objective is replaced by **one durable summary** in `_archives/<name>-summary.md`, and
the objective folder is removed with `git rm -r` so finished plans do not linger in the active tree.

A completed **simple goal** keeps its whole folder, moved into `goals/_completed/<goal-name>/`. There
is no separate archive summary — the goal and its summary together are short enough to keep whole.

## The index

`docs/objectives/README.md` lists active objectives and archived ones. Update it when an objective
starts and when it is archived.

## Verification

- The phase you reported matches what the folder actually contains.
- Numbering is unbroken and nothing was renumbered.
- Links between goals, summaries, and plan documents resolve after any move.
- `git mv` was used for moves, so history follows the file.
- The index reflects reality.
