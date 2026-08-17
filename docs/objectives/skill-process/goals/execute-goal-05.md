# Goal 05: Select recursive harvest wave 2

## Prerequisites

- [Goal 04](execute-goal-04.md) is complete; `docs/objectives/skill-process/research/09-recursive-wave-01-outcome.md` and its direct-child queue are available.
- Read [`../03-flat-pipeline-files.md`](../03-flat-pipeline-files.md) and freeze complete flat filenames for selected candidates.
- Read [`../02-recursive-target-harvest.md`](../02-recursive-target-harvest.md), especially the execution sequence and recursive-wave bounds.
- Read all earlier reject, defer, and duplicate records before selecting another target.
- This goal owns `docs/objectives/skill-process/research/10-recursive-wave-02-plan.md`. It must not create pipeline pages or edit the pipeline index.

### Needed from the owner before starting

Nothing.

## /goal objective

Select a bounded second recursive wave from the direct children of wave 1 and freeze an executable manifest before any deep harvest begins.

Plan source: [`02-recursive-target-harvest.md`, line 63 and lines 75–104](../02-recursive-target-harvest.md#L63).
File-layout source: [`03-flat-pipeline-files.md`, lines 7–20](../03-flat-pipeline-files.md#L7-L20).

## Required outcome

Produce `docs/objectives/skill-process/research/10-recursive-wave-02-plan.md` with:

- A deduplicated graph of wave-1 targets to their direct children.
- A ranked selection of zero to six unharvested direct-child targets.
- For each selected target: parent edge, canonical URL, frozen revision or immutable artifact where available, expected artifacts, verification questions, license/provenance risks, and no more than two exact candidate output filenames.
- A dependency-safe execution order for Goal 06.
- Explicit reject, defer, and duplicate decisions for every unselected child.
- An empty manifest when no candidate clears the threshold.

## In scope

- Follow only direct outbound links recorded in the wave-1 outcome or redirects needed to identify their canonical sources.
- Use shallow inspection to establish identity, accessibility, relevance, likely workflow structure, and harvest cost.
- Prefer targets that add distinct workflow coverage or materially stronger evidence.
- Exclude targets already harvested, rejected without new evidence, deferred for an unresolved blocker, or covered by an existing page.
- Freeze exact candidate filenames so Goal 06 cannot expand scope silently.

## Required tests and evidence

At minimum, prove:

- Every selected target has a cited direct parent edge and a resolving canonical URL at the recorded retrieval date.
- The manifest contains at most six targets and at most two candidate filenames per target.
- Every candidate names the observable evidence expected to satisfy the admission gate.
- Every known child has a selection, reject, defer, or duplicate disposition.
- Proposed filenames follow `pipeline-<group-name>-<name>.md` and do not collide with existing pages or the wave-1 manifest.
- Goal 06 can identify its exact allowed targets, candidate paths, and order from this artifact alone.
- `git diff --check` passes.

## Explicit non-goals

- Do not deeply harvest targets or publish pipeline pages.
- Do not select unrelated search results without a recorded parent edge.
- Do not retry a rejected target without identifying the new evidence.
- Do not fill all six slots merely because they are available.
- Do not change the page contract or evidence vocabulary.

## Engineering constraints

- Follow `skills/AGENTS.md`, `docs/GOOD_ENGINEERING_H.md`, and the recursive bounds in the plan.
- Preserve negative results so future agents do not repeat weak branches.
- Keep selection rationale in the wave plan; keep `targets.md` unchanged unless exact duplicate URLs need normalization.
- Preserve unrelated worktree changes and do not add co-author trailers.

## Completion definition

This goal is complete when every wave-1 child has a disposition and Goal 06 has a frozen, ordered manifest of zero to six targets with exact candidate filenames and verification questions.

If no target clears selection, complete the goal with an empty manifest. Goal 06 must consume it as a documented no-op rather than inventing another branch.
