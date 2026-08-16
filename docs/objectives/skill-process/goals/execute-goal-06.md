# Goal 06: Harvest recursive wave 2

## Prerequisites

- [Goal 05](execute-goal-05.md) is complete and `docs/objectives/skill-process/research/10-recursive-wave-02-plan.md` contains a frozen manifest, which may be empty.
- [Goal 04](execute-goal-04.md) is complete; its wave-1 outcome and direct-child evidence are available.
- Read [`../02-recursive-target-harvest.md`](../02-recursive-target-harvest.md), especially the target-harvest loop and recursive-wave bounds.
- This goal has exclusive write ownership of the pipeline directories declared by the frozen manifest, `docs/pipelines/README.md`, `targets.md`, and its outcome while it runs.

### Needed from the owner before starting

Nothing.

## /goal objective

Harvest every selected second-wave target, publish only distinct workflows that pass admission, and measure whether another recursive wave would add value.

Plan source: [`02-recursive-target-harvest.md`, lines 20–52, 64, and 80–104](../02-recursive-target-harvest.md#L20-L52).

## Required outcome

Produce:

- `docs/objectives/skill-process/research/11-recursive-wave-02-outcome.md`.
- Accepted pipeline pages only in the exact directories declared by `research/10-recursive-wave-02-plan.md`.
- Updated `docs/pipelines/README.md` entries for accepted pages only.
- Newly discovered direct source URLs added concisely to `docs/objectives/skill-process/targets.md`.

The outcome must give every selected target and candidate a disposition, list direct children for continuation, and quantify recursion yield. If the manifest is empty, write a documented no-op outcome and make no pipeline, index, or target-queue changes.

## In scope

- Confirm each selected target's frozen revision before deep inspection.
- Inspect the complete relevant artifact set, history, authorship, license, tests/examples, and direct references.
- Enumerate all distinct candidates, but publish no more than the two declared candidates per target.
- Record and defer additional coherent candidates instead of changing the frozen scope.
- Map every accepted Mermaid node and edge to primary evidence and preserve contradictions and license limits.
- Record the next direct-child layer without harvesting a third wave.
- Report selected targets, accessible targets, admitted pages, rejected candidates, duplicates, deferred candidates, and new direct children.

## Required tests and evidence

At minimum, prove:

- Every selected target has a source inventory, frozen reference, retrieval date, provenance/license statement, and complete candidate ledger.
- Every declared candidate has an explicit admit/reject decision; every additional candidate is deferred or rejected.
- No target produces more than two pages, and no existing workflow is duplicated under another title.
- Every accepted page passes the admission gate, source mapping, and the exact Mermaid, link, cold-reader, and evidence-label checks established by Goal 00.
- Inference, portability, and observed-versus-potential skills remain visibly separated.
- The index contains all and only accepted pages and the target queue remains a terse URL list.
- The recursion-yield counts reconcile with the target and candidate ledgers.
- `git diff --check` passes.

## Explicit non-goals

- Do not select replacement targets outside the frozen manifest.
- Do not perform a third recursive wave.
- Do not loosen admission because the branch produces few pages.
- Do not combine weak targets into a synthetic workflow.
- Do not rewrite earlier outcomes to hide changed assumptions.

## Engineering constraints

- Follow `skills/AGENTS.md`, `docs/GOOD_ENGINEERING_H.md`, the library boundary, and the established page contract.
- Use primary sources and frozen revision links wherever possible.
- Keep target-specific evidence, negative results, and yield counts in `research/11-recursive-wave-02-outcome.md`.
- Never overwrite an existing pipeline directory for a newly selected target; route duplicates to the outcome and reject the duplicate page.
- Serialize shared-file edits, preserve unrelated worktree changes, and do not add co-author trailers.

## Completion definition

This goal is complete when every selected target and candidate has a traceable disposition, accepted pages pass the contract, rejected pages are absent, and the outcome quantifies whether more recursion is justified. An empty manifest completes through the documented no-op outcome.

If the manifest is structurally ambiguous, report the goal as blocked and return it to Goal 05. If an individual source is inaccessible, record that candidate's rejection and continue with the remaining manifest.
