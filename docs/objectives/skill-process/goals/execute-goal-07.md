# Goal 07: Audit the library and cut the continuation queue

## Prerequisites

- [Goal 00](_completed/execute-goal-00.md), [Goal 01](_completed/execute-goal-01.md), [Goal 02](_completed/execute-goal-02.md), [Goal 03](_completed/execute-goal-03.md), [Goal 04](_completed/execute-goal-04.md), [Goal 05](execute-goal-05.md), and [Goal 06](execute-goal-06.md) are complete.
- `research/05-scott-threejs-harvest.md`, `06-thrixel-harvest.md`, `07-gamedev-skills-harvest.md`, `08-recursive-wave-01-plan.md`, `09-recursive-wave-01-outcome.md`, `10-recursive-wave-02-plan.md`, and `11-recursive-wave-02-outcome.md` are available.
- Read every published pipeline page, the current pipeline index, and the concise target queue.
- Read [`../02-recursive-target-harvest.md`](../02-recursive-target-harvest.md), especially the execution sequence and completion definition.
- Read [`../03-flat-pipeline-files.md`](../03-flat-pipeline-files.md) and audit the flat filename contract.
- This goal has exclusive write ownership of `docs/pipelines/**`, `targets.md`, its audit outcome, and the complete candidate-intake table in Goal 80 while it runs.

### Needed from the owner before starting

Nothing.

## /goal objective

Audit the generated library as one corpus, repair or withdraw unsupported material, and leave a ranked, evidence-backed queue for the next recursive objective instead of continuing indefinitely.

Plan source: [`02-recursive-target-harvest.md`, lines 65, 75–78, and 141–146](../02-recursive-target-harvest.md#L65).
File-layout source: [`03-flat-pipeline-files.md`, lines 7–20](../03-flat-pipeline-files.md#L7-L20).

## Required outcome

Produce `docs/objectives/skill-process/research/12-library-audit-and-continuation.md` containing:

- A page-by-page contract and source-fidelity audit.
- A corpus-level duplicate, overlap, vocabulary, evidence-label, and index audit.
- Every correction or withdrawal made and the evidence that required it.
- A deduplicated continuation graph from unharvested direct children and deferred candidates.
- A ranked next-wave recommendation with exact URLs, parent edges, expected workflow contribution, known risks, and a clear continue/stop decision.
- A record of targets that must not be retried without new evidence.
- A reconciled Goal 00–07 candidate-intake table plus Goal 07's own row in
  [`execute-goal-80.md`](execute-goal-80.md), ready for Goal 80 or explicitly empty.

Leave `docs/pipelines/README.md`, `docs/pipelines/PIPELINE_TEMPLATE.md`, every surviving page, and `targets.md` mutually consistent.

## In scope

- Audit every Mermaid node and edge against its recorded primary-source mapping.
- Audit page triggers, ordered steps, artifacts, gates, feedback loops, evidence labels, observed/potential skills, portability notes, licenses, and citations.
- Compare all pages for duplicate workflows hidden by different source vocabulary.
- Repair concise wording, broken links, diagram errors, mislabeled inference, and index drift when the source supports the repair.
- Withdraw a page when its required claim cannot be supported: record the path and reason, then remove its active `docs/pipelines/pipeline-<group-name>-<name>.md` and index entry.
- Rank the remaining direct-source frontier by evidence quality, distinct coverage, accessibility, and recursion yield.
- End this objective with a continuation recommendation; do not execute the next wave.

## Required tests and evidence

At minimum, prove:

- Every indexed page exists and every surviving active pipeline page is indexed exactly once. A withdrawn page has no active `pipeline-*.md` file or index entry, and its removal is recorded in the audit outcome.
- Every surviving page conforms to `PIPELINE_TEMPLATE.md`, has a complete source mapping, and passes all admission criteria.
- Every inference is labeled, every evidence label is supported, and no popularity or self-report is presented as independent validation.
- No two pages describe the same workflow without an explicit, source-backed reason for keeping both.
- Every page passes the exact Mermaid, link, and cold-reader checks established by Goal 00; `git diff --check` also passes.
- The continuation queue contains only exact, deduplicated, unharvested targets with traceable parent edges.
- The continue/stop recommendation cites measured yield from both recursive waves and identifies what a follow-up objective would own.
- Every Goal 00–07 intake row links its final outcome or plan, agrees with that source's deferred
  candidate ledger, excludes non-pipeline target deferrals, and has an intake state of
  `Ready for Goal 80` or `No eligible candidates`.

## Explicit non-goals

- Do not harvest new targets or publish new pipeline candidates.
- Do not create a universal end-to-end game-development pipeline.
- Do not retain unsupported pages to preserve page count.
- Do not turn the continuation queue into another research catalog.
- Do not execute or scaffold a follow-up objective.

## Engineering constraints

- Follow `skills/AGENTS.md`, `docs/GOOD_ENGINEERING_H.md`, the library boundary, and the established page contract.
- Make the smallest source-supported repair. Record material corrections and all withdrawals.
- Keep deep audit evidence in `research/12-library-audit-and-continuation.md`; keep pages and `targets.md` concise.
- Preserve history: do not rewrite prior research outcomes to make the final corpus look cleaner.
- During completion, add Goal 07's row, reconcile every earlier intake row against the audit
  outcome, deduplicate cross-source workflow leads, and update intake states. Do not broaden Goal
  80's bounds or pre-admit a candidate.
- Preserve unrelated worktree changes and do not add co-author trailers.

## Completion definition

This goal is complete when the surviving library is internally consistent and source-auditable, unsupported pages are absent and documented, the concise target queue matches the continuation graph, the audit gives a checkable recommendation to continue or stop recursive harvesting, and the reconciled Goal 00–07 candidate-intake table is ready for Goal 80 or explicitly empty.

If a page cannot be audited because its frozen source is unavailable, do not silently bless it. Record the blockage, remove its active `pipeline.md` and index entry, and rely on Git history plus the audit outcome for recovery.
