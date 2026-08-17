# Summary — goal 00: Harvest the Scott Three.js target into the first pipeline set

**Completed:** 2026-08-16
**Commits:** `f2d8997`; completion bookkeeping follows in the commit that archives this summary
**Goal file:** [`execute-goal-00.md`](execute-goal-00.md)

## Action needed from the owner

Nothing in this summary needs you. Both declared candidates passed the approved admission gate, the
flat naming decision was already settled, and no new product or evidence-policy choice appeared.

## What was delivered

1. A flat pipeline-library [index](../../../../pipelines/README.md) and copyable
   [template](../../../../pipelines/PIPELINE_TEMPLATE.md).
2. [Three.js visual-system validation](../../../../pipelines/pipeline-threejs-visual-system-validation.md),
   a concise verification loop with nine source-mapped nodes.
3. [Three.js final-image pipeline](../../../../pipelines/pipeline-threejs-final-image.md), a concise
   technical-graphics loop with nine source-mapped nodes and one labeled inferred connector.
4. A complete [Scott Three.js harvest outcome](../../research/05-scott-threejs-harvest.md) with the
   frozen revision, inspected artifacts, admission decisions, candidate dispositions, diagram
   mappings, license boundaries, direct child sources, and verification record.
5. Thirty-two direct source URLs appended to the URL-only [target queue](../../targets.md).

## What I got wrong

The first final-image draft presented repair-and-retry as if the source stated that connector. The
node audit showed that the source states the signal contract, diagnostics, failure evidence, and
acceptance gate, but not a literal retry arrow. The connector is now labeled editorial inference in
the diagram, page prose, and research mapping.

I also drafted the verification commands with older pinned tool versions. Before running them, I
queried the registries and replaced those pins with Mermaid CLI `11.16.0` and
`markdown-link-check` `3.15.0`. The recorded commands are the commands that actually passed.

## Traps worth knowing

- The source's project-level Git configuration rewrote HTTPS GitHub URLs to SSH. Promisor fetches
  from the partial clone required an explicit HTTPS `insteadOf` override.
- Several source-ledger rows say `MIT by project rule` when no upstream license was observed. That
  is an author assertion, not reusable permission; later harvests must verify the child repository.
- Neither coordinator skill owns a standalone example in `example-traces.json`. Image-pipeline
  evidence lives in its reference graphs; validation evidence lives in the protocol and gallery
  tooling.
- Mermaid CLI accepts Markdown input and emits the rendered Markdown plus sidecar SVGs beside the
  output path. The index command directs that output to `/tmp` so generated files do not enter the
  repository.

## Evidence

| Check | Result |
| --- | --- |
| Source freeze and history | Revision `98453747cc0678f6a5d910f38d7483596a5f9a40`, tag/package `v0.8.0`, 70-commit history, author/date, and licenses recorded |
| Admission | Both declared candidates pass all six gates; extra coherent candidates are deferred; inventories fail Gate 1 and remain absent |
| Mermaid | Mermaid CLI `11.16.0` rendered one chart from each page with no parser error; each has one top-level path and nine main nodes |
| Source mapping | Every node and edge is mapped; the single editorial connector is labeled in all three required locations |
| Links | 14 library-page links and 46 outcome links passed under `markdown-link-check` `3.15.0` |
| Cold-reader check | Trigger, ordered loop, feedback gate, outputs, and evidence level pass on both pages |
| Page contract and target shape | Required headings/capsules present; layout is flat; target additions are URL-only and duplicate-free |
| Prose proxy and judgement review | Anti-slop prose proxy reports 0 findings; manual review found no unsupported efficacy or portability claim, hidden inference, placeholder evidence, or non-failing check |
| Repository hygiene | `git diff --check` passed; unrelated `brometal-patching` deletion remained unstaged and untouched |

## What this unblocks

- Goal 01 can harvest Thrixel against a concrete page contract, index, parser command, and evidence
  audit.
- Goals 02–07 can reuse the flat filename, cold-reader, mapping, and verification contracts.
- The thirty-two direct children are available for the bounded recursive selection waves.

## What remains blocked

- Nothing in the objective is blocked. Later goals still require their own source refreshes and
  admission decisions; this goal does not pre-admit any child target or deferred Scott workflow.
