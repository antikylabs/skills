# Summary — goal 01: Harvest Thrixel into admitted pipeline pages

**Completed:** 2026-08-16
**Commit:** completion bookkeeping follows in the commit that archives this summary
**Goal file:** [`execute-goal-01.md`](execute-goal-01.md)

## Action needed from the owner

Nothing. The source supported one end-to-end page, the second declared candidate had a precise
admission failure, and no new product or evidence-policy decision appeared.

## What was delivered

1. [Thrixel Goal to Game](../../../../pipelines/pipeline-thrixel-goal-to-game.md), a concise
   nine-node end-to-end pipeline from game request through engine-specific runtime verification.
2. A complete [Thrixel harvest outcome](../../research/06-thrixel-harvest.md) covering the frozen
   source, all 48 tracked files, path history, current service constraints, both declared decisions,
   four deferred workflows, diagram mapping, contradictions, boundaries, and verification.
3. A matching [pipeline index](../../../../pipelines/README.md) entry and Goal 01
   [Goal 80 intake row](../execute-goal-80.md#candidate-intake).
4. An explicit rejection of the separate deterministic Three.js build page because its claimed
   measured reference project is unnamed and cannot be audited directly.

## What I got wrong

The first draft named the admitted page “asset-to-engine” and represented only the asset subloop.
The owner caught that the source's actual top-level workflow is Goal to Game. I re-read the source
route and replaced that draft with the named end-to-end flow: game request, tool and engine checks,
asset planning, bounded generation alongside game systems, integration, runtime review, and report.
The goal file, index, outcome, diagram mapping, and Goal 80 handoff now use that source-faithful
identity.

An initial node-count shell expression counted only nodes declared at the start of a Mermaid line.
The corrected audit extracts every node definition globally and proves nine unique IDs; it did not
change the diagram.

## Traps worth knowing

- The source contradicts itself about image input. It says text or image, later forbids images, and
  elsewhere instructs Sculptor to receive one. Current API docs accept images. The page preserves
  that conflict instead of choosing a convenient instruction.
- Repository Apache-2.0 terms do not govern generated assets. Current service Terms attach CC BY
  4.0 plus Thrixel attribution to free-plan objects and different rights to paid-plan objects at
  generation time.
- The Three.js kit is unusually detailed and includes working code, but its quoted measurements all
  point to an unnamed reference project. Public tooling does not repair that provenance gap.
- Thrixel limits, prices, and features are mutable. The pipeline retains the source's live account
  and pricing check and records no fixed price.
- Mermaid and link checks needed network access for pinned package retrieval and public-source
  validation. No Thrixel endpoint, target example, or proprietary tool was executed.

## Evidence

| Check | Result |
| --- | --- |
| Source freeze and inventory | Revision `db2fd7dc7260f1bb973903b9c0c943ecd2111ac9`, six commits, all 48 tracked files, author/date, repository license, and current Terms recorded |
| Admission | Goal to Game passes all six gates; deterministic Three.js build fails direct auditability and the goal-specific reference-source requirement |
| Deferred work | Four stable candidates are serialized into Goal 80; setup and constituent subloops remain exclusions |
| Mermaid | Mermaid CLI `11.16.0` rendered all three current pipeline pages; the new page has one top-level path and nine main nodes |
| Source mapping | Every new node and edge is mapped; no editorial connector is needed |
| Links | 31 complete-library links, 37 outcome links, and eight links in both archived Goal 01 and Goal 80 passed under `markdown-link-check` `3.15.0` |
| Cold-reader check | Trigger, ordered loop, feedback gate, outputs, evidence level, and evidence limit are visible on the Goal to Game page |
| Constraints | Image contradiction, proprietary dependency, attribution, concurrency, export, retention, and engine-specific limits remain explicit |
| Prose proxy and judgement review | Anti-slop prose proxy reports zero findings; manual review found no unsupported efficacy or portability claim, hidden inference, placeholder evidence, or check that cannot fail |
| Repository hygiene | `git diff --check` passed; the unrelated `brometal-patching` deletion remained untouched and unstaged |

## What this unblocks

- Goal 02 can harvest `gamedev-skills` against a third accepted source-faithful page and a current
  example of how to preserve proprietary-service constraints.
- Goal 80 has four bounded Thrixel follow-up candidates without needing to reopen this outcome merely
  to rediscover their names.
- Later corpus review can compare an end-to-end vendor pipeline with narrower verification and
  technical-graphics pages without treating any of them as a house standard.

## What remains blocked

Nothing in the objective is blocked. The deterministic Three.js build can be reconsidered only if a
future source identifies its measured reference project. The four deferred candidates still require
their own admission refresh before publication.
