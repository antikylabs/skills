# Goal 00: Harvest the Scott Three.js target into the first pipeline set

## Prerequisites

- Read [`../../02-recursive-target-harvest.md`](../../02-recursive-target-harvest.md), especially the strategic call, harvest loop, quality bar, and file contract.
- Read [`../../03-flat-pipeline-files.md`](../../03-flat-pipeline-files.md) and use its flat filename contract.
- Read [`../../00-library-boundary.md`](../../00-library-boundary.md) and apply its admission and evidence rules.
- Read the existing Scott research in [`../../research/02-candidate-pipelines.md`](../../research/02-candidate-pipelines.md) and [`../../research/03-patterns-and-document-contract.md`](../../research/03-patterns-and-document-contract.md). Treat it as a lead, not as a substitute for refreshing the source.
- This goal owns the first writes under `docs/pipelines/`. Later goals must not edit that tree, `targets.md`, or this goal's research outcome until this goal is complete.

### Needed from the owner before starting

Nothing.

## /goal objective

Create the first small, source-faithful pipeline set by harvesting the known Scott Three.js target. Test the library format against two expected visual-development loops, then leave a precise record of what the source did and did not support.

Plan source: [`02-recursive-target-harvest.md`, lines 7–52, 58, and 96–104](../../02-recursive-target-harvest.md#L7-L52).
File-layout source: [`03-flat-pipeline-files.md`, lines 7–20](../../03-flat-pipeline-files.md#L7-L20).

## Required outcome

Produce:

- `docs/pipelines/README.md`, containing the short page contract, evidence vocabulary, pipeline index, maintenance rule, and exact verification checklist.
- `docs/pipelines/PIPELINE_TEMPLATE.md`, the copyable scaffold for every later pipeline page.
- `docs/pipelines/pipeline-threejs-visual-system-validation.md` if that candidate passes admission.
- `docs/pipelines/pipeline-threejs-final-image.md` if that candidate passes admission.
- `docs/objectives/skill-process/research/05-scott-threejs-harvest.md`.
- Only newly discovered, direct source URLs added to `docs/objectives/skill-process/targets.md`; keep that file a concise URL queue.

The research outcome must identify the frozen source revision, inspected artifacts, license boundaries, every admitted, rejected, and deferred pipeline candidate, direct outbound targets, and the source-to-diagram mapping for each published page. Only the two declared candidates may become pages in this goal.

## In scope

- Freeze and record the current repository revision, retrieval date, relevant license files, and canonical source URLs before drafting.
- Inspect the target's full routing structure and every artifact used by the two workflows, including ledgers, examples, references, and validation instructions.
- Re-test the two named candidates against the library admission gate.
- Write a source-faithful page for each declared candidate that passes the gate.
- Record and defer any additional coherent candidate found in the target; do not expand publication scope mid-goal.
- Keep the main path of each page readable in about five minutes. Put provenance, contradictions, and rejected alternatives in the research outcome.
- Record observed supporting skills separately from potential supporting skills.
- Add direct outbound sources to the target queue without researching those children in this goal.

## Required tests and evidence

At minimum, prove:

- The harvest outcome lists every relevant source artifact with a stable URL or frozen revision path.
- Each published pipeline has an observable order, named artifacts or gates, a feedback loop, and traceable authorship/date.
- Every Mermaid node and edge has a source mapping in the harvest outcome. Any editorial connective step is visibly labeled as inference in both places.
- `PIPELINE_TEMPLATE.md` defines the required sections, evidence capsule, diagram limits, and source/inference labels used by both candidate pages.
- `docs/pipelines/README.md` names the exact link-check and Mermaid-render commands, including the Mermaid parser and version. The harvest outcome records each command and result.
- Each diagram has one top-level path, no more than nine main nodes, and renders without a parser error under that named Mermaid check.
- The source supports the title and scope of each published page; rejected candidates retain the failed evidence check instead. Repository popularity, examples, or prose confidence are not treated as effectiveness evidence.
- License and reuse limits are stated where they affect what a reader can copy or run.
- All local links resolve under the recorded link command, all external citations are direct rather than search-result links, and `git diff --check` passes.
- The README defines a five-item cold-reader checklist: identify the trigger, ordered loop, feedback gate, outputs, and evidence level. The outcome records pass/fail for every item on every accepted page.

## Explicit non-goals

- Do not install or execute the target's skills.
- Do not claim that either workflow is engine-neutral, independently validated, or broadly effective.
- Do not turn shared anatomy into a generalized house pipeline.
- Do not publish inventory pages, tool catalogs, or source documentation as pipelines.
- Do not deeply harvest outbound targets yet.
- Do not add prose or evidence cards to `targets.md`.

## Engineering constraints

- Follow `skills/AGENTS.md` and `docs/GOOD_ENGINEERING_H.md`.
- Preserve the source's actual order, branch points, vocabulary, and failure signals. Concision may remove detail but may not change direction.
- Use primary artifacts. Paraphrase instead of copying long passages.
- Keep deep provenance in `research/05-scott-threejs-harvest.md`; the published pages receive only the evidence needed to use and audit the loop.
- Keep all shared-file work serialized. Other goals may gather read-only notes but may not merge edits to `docs/pipelines/README.md` or `targets.md` concurrently.
- Preserve unrelated worktree changes, including the existing `brometal-patching` work.
- Do not add co-author trailers.

## Completion definition

This goal is complete when both named candidates have evidence-backed admit/reject decisions, every accepted page passes the template and diagram audits, the index links only to accepted pages, the harvest outcome makes every claim traceable, and the concise target queue contains any new direct children. A supported rejection is a completed candidate result.

If the refreshed primary source rejects either or both named candidates, record the exact admission failure and leave each unsupported page absent; the goal can still complete. Report the goal as blocked only when the target and all recorded primary artifacts are unavailable, so the harvest itself cannot be audited.
