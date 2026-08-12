# Objective structure

The layout every command reads and writes. Learn this before running any of them.

## Layout

```
docs/objectives/
  README.md                        the index of active and archived objectives
  _archives/
    <name>-summary.md              one durable summary per finished objective
  <name>/
    objective.md                   the owner's raw intent. Input, never generated
    README.md                      generated: what this objective is and where it stands
    00-<plan-title>.md             numbered plan documents
    01-<plan-title>.md
    ...
    research/
      00-<finding-title>.md        compiled research documents
      01-<finding-title>.md
      subagent_outputs/
        00-<agent-name>.md         raw subagent output, kept as evidence
        ...
    goals/
      execute-goal-02.md           open goals, in execution order
      execute-goal-03.md
      _completed/
        execute-goal-00.md         the goal as written
        summary-goal-00.md         what actually happened
        execute-goal-01.md
        summary-goal-01.md
```

## Naming

| Thing | Pattern | Example |
| --- | --- | --- |
| Objective folder | `<kebab-name>/` | `demo-refining/` |
| Plan document | `NN-<KEBAB-OR-CAPS-TITLE>.md` | `02-REMEDIATION-PLAN.md` |
| Research document | `NN-<title>.md` | `00-capability-gap-matrix.md` |
| Subagent output | `NN-<agent-name>.md` | `03-shader-specialist.md` |
| Goal | `execute-goal-NN.md` | `execute-goal-02.md` |
| Goal summary | `summary-goal-NN.md` | `summary-goal-02.md` |
| Archive summary | `<name>-summary.md` | `studio-summary.md` |

Numbers are two digits, start at `00`, and increase. They are never reused, including after a
document is superseded — a gap in the sequence is information.

> The goal filename is `execute-goal-NN.md`, matching the existing tree in
> `docs/objectives/scratch/demo-refining/goals/` and `inspection-tooling/goals/`. Some earlier notes
> describe `NN-execute-goal.md`. Follow the tree: it is the provenance, and the tooling and links
> already point at it.

## Phase detection

Read the folder to decide where an objective stands. Do not ask the owner what phase it is in when
the folder already says.

| Folder state | Phase | Next command |
| --- | --- | --- |
| No folder | Not started | `init` |
| `objective.md` exists, empty or nearly | Waiting on the owner | Ask them to fill it in |
| `objective.md` has content, no `research/` | Ready to research | `create-research` |
| `research/` exists, no numbered plan documents | Research done | `create-plan` |
| Plan documents exist, no `goals/` | Planned | `create-goals` |
| `goals/` has open goals | Executing | `execute <goal>` |
| `goals/` empty, `_completed/` populated | All goals done | `complete-objective` |

State the phase you detected and the evidence for it before acting.

## What each file is for

**`objective.md`** is the owner's. It holds raw intent — what they want, why, what they are worried
about, what "done" might look like. It is unstructured on purpose. Never rewrite it, never tidy it,
and never generate it with content the owner did not supply. `init` creates it with prompts and
leaves it to them.

**`README.md`** is generated. It says what the objective is, where it stands, what the plan
documents are, and which goals are open. Regenerate it whenever a phase completes.

**Plan documents** are the thinking: diagnosis, options, sequencing, effort, what is deliberately
not being done. They are numbered so later documents can supersede earlier ones without deleting
them.

**`research/`** holds compiled findings. **`research/subagent_outputs/`** holds the raw output each
subagent returned, kept even when the compiled document supersedes it — the compiled version is an
interpretation, and the raw output is the evidence for it.

**`goals/`** holds contracts. Open goals sit at the top level; a goal and its summary move into
`_completed/` together.

## Index

`docs/objectives/README.md` lists active objectives and archived ones. Update it when an objective
starts and when it is archived. An objective missing from the index is invisible.

## Reading before planning

Before `create-plan` or `create-goals`, read:

- `docs/VISION_DIRECTION_H.md` — human-owned product direction
- `docs/GOOD_ENGINEERING_H.md` — before any design or architecture decision
- the relevant records in `docs/adr/` and `docs/aip/`
- the repository's `AGENTS.md`, and the nearest one to the code being changed

A plan applies accepted direction and decisions. It does not replace them, and it cannot overrule
an accepted ADR. If the work requires a decision to change, that is an ADR — use `team-write-adrs`,
and say so in the plan rather than planning around it.
