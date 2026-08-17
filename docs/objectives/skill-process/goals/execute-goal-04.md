# Goal 04: Harvest recursive wave 1

## Prerequisites

- [Goal 03](execute-goal-03.md) is complete and `docs/objectives/skill-process/research/08-recursive-wave-01-plan.md` contains a frozen manifest, which may be empty.
- Read [`../03-flat-pipeline-files.md`](../03-flat-pipeline-files.md) and use its flat filename contract.
- [Goal 00](_completed/execute-goal-00.md), [Goal 01](_completed/execute-goal-01.md), and [Goal 02](_completed/execute-goal-02.md) are complete; the page contract, template, and `research/05-scott-threejs-harvest.md`, `06-thrixel-harvest.md`, and `07-gamedev-skills-harvest.md` are available.
- Read [`../02-recursive-target-harvest.md`](../02-recursive-target-harvest.md), especially the harvest loop, quality bar, recursive bounds, and file contract.
- This goal has exclusive write ownership of the pipeline files named in the frozen manifest, `docs/pipelines/README.md`, `targets.md`, its outcome, and only the Goal 04 row in Goal 80's candidate-intake table while it runs.

### Needed from the owner before starting

Nothing.

## /goal objective

Harvest every selected wave-1 target to source depth, publish only the distinct workflows that pass admission, and capture the next layer of direct source relationships for wave 2.

Plan source: [`02-recursive-target-harvest.md`, lines 20–52, 62, and 80–104](../02-recursive-target-harvest.md#L20-L52).
File-layout source: [`03-flat-pipeline-files.md`, lines 7–20](../03-flat-pipeline-files.md#L7-L20).

## Required outcome

Produce:

- `docs/objectives/skill-process/research/09-recursive-wave-01-outcome.md`.
- Accepted pipeline pages only at the exact filenames authorized by `research/08-recursive-wave-01-plan.md`.
- Updated `docs/pipelines/README.md` entries for accepted pages only.
- Newly discovered direct child URLs added concisely to `docs/objectives/skill-process/targets.md`.
- A Goal 04 row added to the candidate-intake table in [`execute-goal-80.md`](execute-goal-80.md)
  during completion.

The outcome must record a complete harvest result for every selected target and an admit/reject decision for every proposed candidate. Zero accepted pages is valid when the evidence says so.

If the frozen manifest is empty, produce the outcome as a documented no-op and make no pipeline, index, or target-queue changes.

## In scope

- Freeze or confirm each selected revision before deep inspection.
- Inspect each selected target's full relevant artifact set, source history, authorship, license, tests/examples, and direct references.
- Enumerate all distinct workflow candidates discovered inside the target, but publish no more than two pages per target in this wave.
- Reconcile newly discovered candidates with the frozen proposed slugs; record renamed, duplicate, deferred, or rejected candidates explicitly.
- Map every accepted diagram node and edge to primary evidence.
- Record direct outbound sources as wave-2 candidates without recursively harvesting them here.
- Maintain the existing concise page contract and index taxonomy.

## Required tests and evidence

At minimum, prove:

- Every selected target has a frozen revision, retrieval date, source inventory, license/provenance statement, candidate ledger, and outbound-target list.
- Every proposed candidate has an explicit admission decision; every additional discovered candidate has a disposition.
- No target produces more than two new pages in this wave.
- Every accepted page has observable order, named artifacts or gates, a failure/feedback loop, traceable authorship/date, and an auditable Mermaid mapping.
- Every inference and portability note is labeled; observed supporting skills remain separate from potential skills.
- Duplicates update or cross-reference the existing research record instead of creating parallel pipeline pages.
- Each page passes the exact Mermaid, link, and cold-reader checks established by Goal 00, plus the evidence-label audit.
- The Goal 04 intake row links `research/09-recursive-wave-01-outcome.md`, lists every eligible
  deferred pipeline candidate by stable name and source target or explicitly says `None`, and
  summarizes ineligible records as exclusions.
- The index contains all and only accepted pages, `targets.md` remains a terse URL queue, and `git diff --check` passes.

## Explicit non-goals

- Do not harvest second-hop children in this goal.
- Do not replace failed candidates with unrelated search results.
- Do not publish more than two pages per target.
- Do not generalize several sources into a house workflow.
- Do not count candidate volume or page count as success.
- Do not put detailed evidence in `targets.md`.

## Engineering constraints

- Follow `skills/AGENTS.md`, `docs/GOOD_ENGINEERING_H.md`, the library boundary, and the established page contract.
- Use primary sources and frozen revision links wherever possible.
- Keep target-specific evidence and negative results in `research/09-recursive-wave-01-outcome.md`.
- Do not overwrite an existing pipeline file unless the wave plan explicitly identifies it as an audit/update rather than a new page.
- During completion, update only Goal 04's row in Goal 80 after the wave outcome is final and before
  writing the goal summary. Do not change Goal 80's scope, tests, bounds, or another row.
- Serialize shared index and target edits, preserve unrelated worktree changes, and do not add co-author trailers.

## Completion definition

This goal is complete when every selected target and candidate has a traceable disposition, every accepted page passes the library contract, rejected pages are absent, a deduplicated direct-child queue exists for wave 2, and Goal 04's candidate-intake row matches the final wave outcome. An empty manifest completes through the documented no-op outcome and an explicit `None` intake row.

If the frozen manifest is structurally ambiguous, report the goal as blocked and return it to Goal 03. An explicitly empty manifest is not ambiguous and must not be replaced ad hoc.
