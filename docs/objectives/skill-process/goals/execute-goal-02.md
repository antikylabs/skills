# Goal 02: Harvest the gamedev-skills target without turning its inventory into pipelines

## Prerequisites

- [Goal 00](_completed/execute-goal-00.md) and [Goal 01](_completed/execute-goal-01.md) are complete; `docs/pipelines/README.md`, `docs/pipelines/PIPELINE_TEMPLATE.md`, `docs/objectives/skill-process/research/05-scott-threejs-harvest.md`, and `06-thrixel-harvest.md` are available.
- Read [`../03-flat-pipeline-files.md`](../03-flat-pipeline-files.md) and use its flat filename contract.
- Read [`../02-recursive-target-harvest.md`](../02-recursive-target-harvest.md), especially the harvest loop, quality bar, execution sequence, recursive bounds, and file contract.
- Read [`../00-library-boundary.md`](../00-library-boundary.md) and the gamedev-skills evidence in [`../research/02-candidate-pipelines.md`](../research/02-candidate-pipelines.md).
- Use the existing page contract, evidence vocabulary, and index.
- This goal has exclusive write ownership of the shared index, target queue, its harvest outcome, any new pipeline files, and only the Goal 02 row in Goal 80's candidate-intake table while it runs.

### Needed from the owner before starting

Nothing.

## /goal objective

Harvest the known gamedev-skills target as a workflow source, separate real multi-step loops from its catalogs and routers, and publish only the candidates that remain source-faithful under close inspection.

Plan source: [`02-recursive-target-harvest.md`, lines 20–52, 60, and 80–104](../02-recursive-target-harvest.md#L20-L52).
File-layout source: [`03-flat-pipeline-files.md`, lines 7–20](../03-flat-pipeline-files.md#L7-L20).

## Required outcome

Produce `docs/objectives/skill-process/research/07-gamedev-skills-harvest.md` and give an explicit admit/reject decision for these candidate page paths:

- `docs/pipelines/pipeline-gamedev-skills-fast-gameplay-prototyping.md`
- `docs/pipelines/pipeline-gamedev-skills-game-jam-delivery.md`
- `docs/pipelines/pipeline-gamedev-skills-game-asset-production.md`
- `docs/pipelines/pipeline-gamedev-skills-level-blockout-teach-test.md`

Create only the paths whose candidates pass. Update `docs/pipelines/README.md` for accepted pages and add newly discovered direct source URLs, without annotations, to `docs/objectives/skill-process/targets.md`.

Record and defer any additional coherent candidate found during full-repository inspection. Only the four declared candidate paths may be published in this goal.

During completion, add Goal 02's row to the candidate-intake table in
[`execute-goal-80.md`](execute-goal-80.md).

## In scope

- Freeze and record the source revision, retrieval date, license, canonical URLs, and complete inspected artifact set.
- Inspect the repository's routing, skill instructions, examples, tests, history, and referenced source material for the four candidates.
- Determine whether each candidate has a real order, named artifacts or gates, feedback/retry behavior, and traceable provenance.
- Distinguish a runnable or documented workflow from a list of tools, capabilities, engines, roles, or asset types.
- Treat structural tests as evidence of repository shape only, not evidence that a workflow produces good game-development outcomes.
- Publish accepted workflows in their narrowest supported scope.
- Record and defer additional coherent candidates instead of expanding publication scope.
- Record all rejected candidates and direct child targets in the harvest outcome; queue only the child URLs in `targets.md`.

## Required tests and evidence

At minimum, prove:

- The harvest outcome inventories all relevant candidate routes and records one clear admission result per named candidate.
- Every accepted page's ordered loop can be reconstructed from cited source artifacts without relying on the page author's intuition.
- Every Mermaid node and edge maps to a source, with inference labeled rather than blended into source-documented steps.
- No accepted page is merely an inventory, router, generic checklist, or renamed capability list.
- Observed supporting skills and merely potential skills use separate labels.
- Evidence labels describe what was actually observed; stars, forks, examples, and tests do not become effectiveness claims.
- Each accepted page passes the exact Mermaid, link, and cold-reader checks established by Goal 00.
- Rejected candidates have no generated page or index entry.
- The Goal 02 intake row links `research/07-gamedev-skills-harvest.md`, lists every eligible deferred
  pipeline candidate by stable name or explicitly says `None`, and summarizes ineligible records as
  exclusions.
- Local and external links resolve and `git diff --check` passes.

## Explicit non-goals

- Do not install or execute the skill collection.
- Do not make one universal game-development pipeline from several unrelated skills.
- Do not publish one page per tool, engine, discipline, or asset type.
- Do not infer production use, portability, or outcome quality from repository activity.
- Do not force all four candidates to pass.
- Do not expand `targets.md` into a research log.

## Engineering constraints

- Follow `skills/AGENTS.md`, `docs/GOOD_ENGINEERING_H.md`, the library boundary, and the established page contract.
- Prefer narrow source fidelity over broad completeness.
- Keep the evidence matrix, alternative interpretations, and rejection record in `research/07-gamedev-skills-harvest.md`.
- Serialize shared-file edits and preserve existing pipeline pages unless a link or contract repair is necessary and documented.
- During completion, update only Goal 02's row in Goal 80 after the harvest outcome is final and
  before writing the goal summary. Do not change Goal 80's scope, tests, bounds, or another row.
- Preserve unrelated worktree changes and do not add co-author trailers.

## Completion definition

This goal is complete when all four candidates have evidence-backed admit/reject decisions, additional candidates are deferred, every accepted candidate has a concise audited page and index entry, every rejected candidate is absent, newly discovered direct targets are queued for recursive selection, and Goal 02's candidate-intake row matches the final harvest outcome. Supported rejection of all four declared candidates is a valid completed harvest.

If none of the four candidates survives, complete the negative harvest outcome and continue the sequence. Report the goal as blocked only when neither the target nor any frozen primary artifact can be inspected well enough to audit the harvest.
