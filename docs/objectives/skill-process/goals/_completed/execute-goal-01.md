# Goal 01: Harvest Thrixel into admitted pipeline pages

## Prerequisites

- [Goal 00](execute-goal-00.md) is complete; it provides `docs/pipelines/README.md`, `docs/pipelines/PIPELINE_TEMPLATE.md`, and `docs/objectives/skill-process/research/05-scott-threejs-harvest.md`.
- Read [`../../03-flat-pipeline-files.md`](../../03-flat-pipeline-files.md) and use its flat filename contract.
- Read [`../../02-recursive-target-harvest.md`](../../02-recursive-target-harvest.md), especially the harvest loop, quality bar, execution sequence, recursive bounds, and file contract.
- Read [`../../00-library-boundary.md`](../../00-library-boundary.md) and the Thrixel evidence in [`../../research/02-candidate-pipelines.md`](../../research/02-candidate-pipelines.md).
- Use the page contract and index structure established by Goal 00.
- This goal has exclusive write ownership of `docs/pipelines/README.md`, `targets.md`, its new pipeline files, its harvest outcome, and only the Goal 01 row in Goal 80's candidate-intake table while it runs.

### Needed from the owner before starting

Nothing.

## /goal objective

Harvest the known Thrixel target end to end, decide the two declared workflow candidates, and make the target's proprietary boundaries and source contradictions impossible to miss.

Plan source: [`02-recursive-target-harvest.md`, lines 20–52, 59, and 80–104](../../02-recursive-target-harvest.md#L20-L52).
File-layout source: [`03-flat-pipeline-files.md`, lines 7–20](../../03-flat-pipeline-files.md#L7-L20).

## Required outcome

Produce:

- `docs/objectives/skill-process/research/06-thrixel-harvest.md`.
- `docs/pipelines/pipeline-thrixel-goal-to-game.md` if the refreshed source proves that the declared
  asset-to-engine candidate is one subloop of the source's named end-to-end workflow.
- `docs/pipelines/pipeline-thrixel-deterministic-threejs-build.md` only if it is a distinct, fully sourced workflow after refresh.
- Updated `docs/pipelines/README.md` entries for accepted pages only.
- Newly discovered direct source URLs added concisely to `docs/objectives/skill-process/targets.md`.
- A Goal 01 row added to the candidate-intake table in [`execute-goal-80.md`](execute-goal-80.md)
  during completion.

The harvest outcome must give an explicit admit/reject decision for both named candidates. It may admit one and reject the other; page count is not a success criterion. Any additional coherent candidate is recorded and deferred rather than published in this goal.

## In scope

- Freeze and record the target revision, retrieval date, canonical URLs, relevant license and terms, and every artifact inspected.
- Inspect the full repository route from request or source asset through generation, review, export, integration, and runtime verification.
- Follow direct product, engine, or reference-workflow links needed to verify claimed steps and constraints.
- Resolve or preserve the documented image-input contradiction rather than silently choosing one version.
- Verify credit, concurrency, proprietary-service, and export constraints at their primary sources.
- Test whether the deterministic Three.js build/review material is a distinct ordered workflow or only an unsupported claim/reference.
- Write accepted pages using the established concise contract and source vocabulary.
- Record and defer additional coherent candidates discovered in the full target inspection.
- Queue, but do not harvest, direct child targets.

## Required tests and evidence

At minimum, prove:

- The outcome contains a complete source inventory and a candidate ledger with an admission decision and reason for each candidate.
- Every accepted Mermaid node and edge maps to a cited primary artifact.
- Contradictory source statements remain visible with their locations and revision context.
- Proprietary behavior, service dependencies, licensing, credits, concurrency, and engine-specific constraints are distinguished from portable editorial inference.
- Any deterministic-build page names the actual source of the reference workflow; an unnamed or unverifiable reference fails admission.
- Each accepted page passes the exact Mermaid, link, and cold-reader checks established by Goal 00 and exposes its trigger, ordered steps, artifacts, review gate, failure/retry loop, output, evidence level, and scope.
- Rejected candidates have no page and no index entry.
- The Goal 01 intake row links `research/06-thrixel-harvest.md`, lists every eligible deferred
  pipeline candidate by stable name or explicitly says `None`, and summarizes ineligible
  rejections, duplicates, target-only deferrals, and admitted pages as exclusions.
- All links resolve, Mermaid checks pass, and `git diff --check` passes.

## Explicit non-goals

- Do not run paid or proprietary services.
- Do not reproduce claimed performance, cost, or quality benchmarks.
- Do not treat vendor self-validation as independent validation.
- Do not make the workflow engine-neutral unless the source directly demonstrates that portability.
- Do not create pages to satisfy a quota.
- Do not add research prose to `targets.md`.

## Engineering constraints

- Follow `skills/AGENTS.md`, `docs/GOOD_ENGINEERING_H.md`, the library boundary, and Goal 00's page contract.
- Preserve internal contradictions and uncertainty; do not reconcile them by guesswork.
- Use direct primary sources and frozen revision links when possible.
- Put the detailed evidence trail in `research/06-thrixel-harvest.md`; keep published pages operational and concise.
- Serialize edits to the shared index and target queue.
- During completion, update only Goal 01's row in Goal 80 after the harvest outcome is final and
  before writing the goal summary. Do not change Goal 80's scope, tests, bounds, or another row.
- Preserve unrelated worktree changes and do not add co-author trailers.

## Completion definition

This goal is complete when both named candidates have auditable admit/reject decisions, every additional candidate is deferred, every accepted page passes the contract and source audit, rejected candidates are absent from the index, direct child targets are queued, and Goal 01's candidate-intake row matches the final harvest outcome. Supported rejection of both declared candidates is a valid completed harvest.

If the source revision, terms, or referenced workflow cannot support a candidate, reject that candidate explicitly and continue the sequence. Report the goal as blocked only when neither the target nor any frozen primary artifact can be inspected well enough to audit the harvest.
