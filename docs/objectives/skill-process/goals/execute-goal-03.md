# Goal 03: Select recursive harvest wave 1

## Prerequisites

- [Goal 00](_completed/execute-goal-00.md), [Goal 01](_completed/execute-goal-01.md), and [Goal 02](execute-goal-02.md) are complete.
- Read [`../03-flat-pipeline-files.md`](../03-flat-pipeline-files.md) and freeze complete flat filenames for selected candidates.
- Read [`../02-recursive-target-harvest.md`](../02-recursive-target-harvest.md), especially the execution sequence, ordering rationale, recursive bounds, and file contract.
- Read `docs/objectives/skill-process/research/05-scott-threejs-harvest.md`, `06-thrixel-harvest.md`, `07-gamedev-skills-harvest.md`, and the current concise target queue.
- The known-target harvests must have recorded direct outbound sources and rejected duplicates precisely enough to build a source graph.
- This goal owns `docs/objectives/skill-process/research/08-recursive-wave-01-plan.md` and only the Goal 03 row in Goal 80's candidate-intake table. It may normalize duplicate URLs in `targets.md`, but it must not create pipeline pages or edit the pipeline index.

### Needed from the owner before starting

Nothing.

## /goal objective

Turn the first three harvests into a bounded, evidence-led first recursive wave. Select the strongest direct child targets and give the next goal a frozen manifest it can execute without rediscovering scope.

Plan source: [`02-recursive-target-harvest.md`, line 61 and lines 75–104](../02-recursive-target-harvest.md#L61).
File-layout source: [`03-flat-pipeline-files.md`, lines 7–20](../03-flat-pipeline-files.md#L7-L20).

## Required outcome

Produce `docs/objectives/skill-process/research/08-recursive-wave-01-plan.md` with:

- A one-hop source graph from the three known targets to every direct outbound candidate.
- Deduplicated candidate identities and canonical URLs.
- A ranked selection of no more than six targets.
- For each selected target: frozen revision or immutable artifact where available, source relationship, expected artifacts, verification questions, license/provenance risks, proposed pipeline candidate names, and exact proposed output filenames.
- No more than two proposed page candidates per selected target.
- A dependency-safe execution order for Goal 04.
- Explicit reject, defer, and duplicate decisions for every unselected candidate.
- A stop record if no candidate is strong enough for full harvest.
- A Goal 03 row added to the candidate-intake table in [`execute-goal-80.md`](execute-goal-80.md)
  during completion.

## In scope

- Follow only direct outbound links recorded by the known-target harvests or direct provenance edges needed to identify their canonical source.
- Use shallow source inspection only to establish identity, accessibility, relevance, likely workflow structure, and harvest cost.
- Rank targets by expected ability to expose an ordered AI-assisted game-development loop with auditable artifacts and feedback.
- Prefer targets that add distinct workflow coverage or materially stronger evidence over targets that repeat an existing page.
- Normalize exact duplicate URLs in `targets.md` while preserving its terse Known/Discovered shape.

## Required tests and evidence

At minimum, prove:

- Every selected target has a direct, cited edge from a completed harvest or an explicitly identified canonical-source redirect.
- Every selected target URL resolves at selection time, and the plan records the retrieval date. Each inaccessible candidate records the failed URL check and date before rejection or deferral.
- The selected set is at most six targets and each has at most two candidate pages.
- Each proposed candidate states the observable evidence expected to satisfy every admission criterion; vague topic fit is insufficient.
- Duplicate, inaccessible, license-blocked, inventory-only, and already-covered candidates are rejected or deferred with a specific reason.
- Proposed filenames follow `pipeline-<group-name>-<name>.md` and do not collide with existing pipeline files.
- Goal 04 can identify its exact allowed targets and output paths from this artifact alone.
- The Goal 03 intake row links `research/08-recursive-wave-01-plan.md` and explicitly records whether
  the shallow selection found any deferred pipeline candidate eligible for Goal 80. Target-only
  deferrals must remain exclusions rather than being relabeled as pipelines.
- `git diff --check` passes.

## Explicit non-goals

- Do not write pipeline pages.
- Do not perform the full target harvest or claim that a shallow candidate already passes admission.
- Do not add unrelated search results with no source-graph edge.
- Do not select six targets merely because six are allowed.
- Do not change established page contracts or evidence labels.

## Engineering constraints

- Follow `skills/AGENTS.md`, `docs/GOOD_ENGINEERING_H.md`, and the recursive bounds in the plan.
- Keep selection reproducible: cite the parent edge, canonical target, inspected surface, and decision.
- Preserve negative results. They prevent later agents from repeatedly chasing the same weak targets.
- Keep `targets.md` concise; all rankings and rationale belong in the wave plan.
- During completion, update only Goal 03's row in Goal 80 after the selection plan is final and
  before writing the goal summary. Do not change Goal 80's scope, tests, bounds, or another row.
- Preserve unrelated worktree changes and do not add co-author trailers.

## Completion definition

This goal is complete when every one-hop candidate has a disposition, Goal 04 has a frozen, ordered manifest of zero to six harvestable targets with exact candidate filenames and verification questions, and Goal 03's candidate-intake row matches the final selection plan.

If no candidate meets the selection threshold, record an empty manifest and complete the goal. Goal 04 consumes that manifest as a documented no-op; it must not improvise a replacement wave.
