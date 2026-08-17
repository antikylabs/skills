# Goal 80: Revisit deferred candidates and publish the strongest follow-up pipelines

## Prerequisites

- [Goal 07](execute-goal-07.md) is complete. This goal needs its audited corpus, deduplicated
  continuation graph, ranked deferred-candidate queue, and continue/stop decision.
- The candidate-intake table below contains one reconciled row for every completed Goal 00–07.
  Do not start while a completed goal's row is absent or still disagrees with its outcome.
- [Goal 00](_completed/execute-goal-00.md) is complete. Read
  [`research/05-scott-threejs-harvest.md`](../research/05-scott-threejs-harvest.md), especially every
  candidate deferred at lines 74–113.
- Read [`../02-recursive-target-harvest.md`](../02-recursive-target-harvest.md), especially the
  later-harvest rule and per-source page bound at lines 80–94.
- Read [`../03-flat-pipeline-files.md`](../03-flat-pipeline-files.md) and preserve the flat
  `pipeline-<group-name>-<name>.md` contract.
- Do not run this goal concurrently with another goal that owns `docs/pipelines/**`, `targets.md`,
  or a source harvest outcome. Those files are the serialization lock.

### Needed from the owner before starting

Nothing. This goal can start as written after Goal 07 completes.

## /goal objective

Turn the best deferred workflows from completed source harvests into a bounded follow-up pipeline
set. Reopen the source evidence, apply the admission gate rather than trusting the earlier defer
label, and publish only distinct workflows whose order, artifacts, feedback, provenance, and scope
remain auditable.

Plan source: [`02-recursive-target-harvest.md`, lines 80–106](../02-recursive-target-harvest.md#L80-L106).
The plan explicitly queues coherent candidates for later harvesting instead of dropping them after
the first per-source page cap.

## Candidate intake

This table is the serialized handoff into Goal 80. Each Goal 01–07 owns only its row during that
goal's completion phase. A row lists pipeline candidates that remain eligible for a later admission
refresh, or explicitly records `None`. Target-only deferrals, rejected candidates, duplicates, and
already-published pages stay in the source outcome and are summarized as exclusions; they do not
become Goal 80 work by appearing here.

| Source goal | Outcome | Eligible deferred pipeline candidates | Exclusions | Intake state |
| --- | --- | --- | --- | --- |
| 00 | [`05-scott-threejs-harvest.md`](../research/05-scott-threejs-harvest.md#candidate-disposition) | New procedural-scene orchestration; skill-pack source distillation; deterministic gallery capture; 21 routed atomic modules | Two admitted pages; source inventories rejected under Gate 1 | Seeded and awaiting Goal 07 reconciliation |
| 01 | [`06-thrixel-harvest.md`](../research/06-thrixel-harvest.md#candidate-disposition) | Unity imported-asset inspection and play-mode validation; Three.js capture-measure-fix review; Three.js pixel-gated performance optimization; Three.js gameplay-relationship bench | Goal to Game admitted; deterministic Three.js build rejected because its reference project is unnamed; setup and constituent subloops excluded | Seeded and awaiting Goal 07 reconciliation |
| 02 | [`07-gamedev-skills-harvest.md`](../research/07-gamedev-skills-harvest.md#candidate-disposition) | Profile–fix–remeasure performance optimization; itch.io Butler publish and update; Steam parallel presence/build release; Godot export and runtime validation; Unity build and runtime validation; Unreal cook, package, and runtime validation | Four declared pages admitted; router/catalog and gameplay loops rejected; API/configuration recipes, meta-workflows, and admitted-page constituent subflows excluded | Seeded and awaiting Goal 07 reconciliation |

Goal 07 must reconcile every row against the completed outcomes, deduplicate cross-source workflow
leads, and change the intake state to `Ready for Goal 80` or `No eligible candidates`. Goal 80 may
rank only candidates present in the reconciled table.

## Required outcome

Produce:

- `docs/objectives/skill-process/research/13-deferred-pipeline-follow-up.md`, containing the frozen
  selection manifest, source refresh, complete candidate ledger, admission decisions, detailed
  evidence, and source-to-diagram mappings.
- Zero to six new flat pipeline pages at the exact filenames frozen in that outcome before drafting,
  with at most two pages from one source target.
- Updated `docs/pipelines/README.md` entries for accepted pages only.
- Only newly discovered direct source URLs appended to
  `docs/objectives/skill-process/targets.md`; keep it a concise URL queue.

The follow-up outcome must explicitly reconsider every deferred Scott Three.js candidate from
`research/05-scott-threejs-harvest.md`: the three named candidates and all 21 routed atomic modules.
It may group modules into one candidate only when the refreshed source demonstrates one shared
ordered workflow. Every candidate receives an admit, reject, duplicate, or defer decision. No page
quota overrides the evidence gate.

## In scope

- Read all completed harvest outcomes and Goal 07's continuation graph before selecting work.
- Rank deferred candidates by source order, observable artifacts and feedback, evidence quality,
  distinct coverage, source accessibility, and expected audit cost.
- Freeze a selection of at most six candidates before drafting. Record each candidate's source
  target, parent harvest, exact proposed filename, expected evidence, and rejection conditions.
- Refresh the selected source revision, history, authorship, licenses, routing, examples, tests,
  references, ledgers, and validation instructions needed to audit the workflow.
- For Scott Three.js, reconsider new procedural-scene orchestration, skill-pack source distillation,
  deterministic gallery capture, and each routed atomic module. Distinguish a workflow from a router,
  capability inventory, implementation recipe, or isolated effect description.
- Follow direct internal references and only the outbound primary artifacts required to verify a
  selected workflow. Queue newly discovered children without starting another recursive wave.
- Publish at most two admitted pages from one source. Record stronger overflow candidates for the
  next follow-up instead of silently expanding this goal.
- Preserve observed supporting skills separately from potential skills inferred by Antiky.

## Required tests and evidence

At minimum, prove:

- The selection manifest was frozen before page drafting and contains no more than six candidates,
  no more than two proposed pages per source, and one exact flat filename per proposed page.
- Every deferred Scott candidate recorded at
  `research/05-scott-threejs-harvest.md:74-113` has a refreshed, explicit disposition; none disappears
  through grouping or omission.
- Every selected candidate has a frozen source revision or immutable artifact, retrieval date,
  traceable author, license boundary, inspected-artifact inventory, and direct audit links.
- Every accepted candidate satisfies all six admission gates and has an observable trigger, ordered
  loop, named artifacts, feedback or stop gate, outputs, failure path, and evidence boundary.
- Every Mermaid node and edge maps to a cited primary artifact. Editorial connective steps are
  labeled as inference in the diagram, page prose, and research mapping.
- Every rejected candidate records the exact failed admission criterion. Every duplicate names the
  existing page it would repeat. Every deferred candidate states what evidence or later bound is
  missing.
- No accepted page is merely a router, catalog, feature inventory, API guide, or implementation
  recipe without a source-supported operative loop.
- Each accepted page passes the exact Mermaid CLI, link, node-count, cold-reader, evidence-label,
  and source-mapping checks established by Goal 00.
- The pipeline index contains all and only accepted pages, target additions remain URL-only and
  duplicate-free, all changed local links resolve, and `git diff --check` passes.

## Explicit non-goals

- Do not publish all deferred candidates merely because they were recorded.
- Do not create a universal Three.js, graphics, or game-development house pipeline.
- Do not treat a skill module, router row, example, popularity signal, or repository activity as
  proof of an ordered or effective workflow.
- Do not promote skill-pack source distillation into the game-development library unless the scope
  policy actually admits that meta-workflow after refresh.
- Do not deep-harvest unrelated outbound children or begin a third recursive target wave.
- Do not install or execute target skills, paid services, or proprietary systems unless a later
  owner-approved goal explicitly requires it.
- Do not rewrite earlier harvest outcomes to make the new dispositions look inevitable.
- Do not add research prose, evidence cards, or rankings to `targets.md`.

## Engineering constraints

- Follow `skills/AGENTS.md`, `docs/GOOD_ENGINEERING_H.md`, the library boundary, the established
  pipeline template, and Goal 07's corpus-audit decisions.
- Preserve source vocabulary, order, branches, contradictions, and license uncertainty. Concision
  may remove detail but may not change direction.
- Keep five-minute operational pages under `docs/pipelines/`; keep full provenance, rejected
  alternatives, and candidate comparisons in `research/13-deferred-pipeline-follow-up.md`.
- Preserve the flat filename contract. Do not create per-pipeline directories.
- Serialize shared index and target-queue edits. Preserve unrelated worktree changes and do not add
  co-author trailers.

## Completion definition

This goal is complete when the follow-up outcome gives every deferred Scott candidate and every
selected corpus candidate a traceable disposition, every accepted workflow has a concise audited
page and index entry, rejected and duplicate candidates have no page, overflow candidates remain
explicitly queued, all required checks pass, and the target queue contains only new direct URLs. A
well-supported zero-page result is valid.

If Goal 07 recommends stopping, no deferred candidate survives source refresh, or the required
primary artifacts are unavailable, write a documented no-op outcome and complete without pages. Do
not weaken admission, invent a loop, or substitute an inventory page to make the follow-up produce
output.
