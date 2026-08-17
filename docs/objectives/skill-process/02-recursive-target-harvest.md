# Recursive target-harvest plan

This document replaces the fixed cross-source batch and pre-goal owner gates in
[01-first-pass-plan.md](01-first-pass-plan.md). The source-fidelity and admission boundary in
[00-library-boundary.md](00-library-boundary.md) remains current.

## Strategic call

Build the library by **harvesting one source target at a time**. For each target, inspect the whole
frozen source, write every declared pipeline candidate that survives the admission gate, record all
other candidates, and enqueue relevant outbound sources. Then repeat the same process on the best
newly discovered targets.

Start with the known target that has the strongest audit trail:
[scottstts/Threejs-Awesome-Graphics-Agent-Skills](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills).
Its first publication set is limited to visual-system validation and the final-image pipeline.
The source refresh must still record other coherent candidates, but it defers them instead of
silently expanding the goal.

## Target-harvest loop

Every target harvest follows the same loop:

1. Freeze the repository revision, evidence date, authorship, license, and inspected source paths.
2. Inspect the full target for ordered flows, not only its README or popular entry points.
3. Enumerate candidate pipelines and record an explicit admit or reject decision for each.
4. Write one source-faithful `pipeline.md` for every admitted candidate in the goal's declared
   scope.
5. Map each Mermaid node, gate, branch, and feedback edge to primary-source evidence.
6. Separate observed supporting skills or tools from potential skills inferred by Antiky.
7. Put evidence, contradictions, and rejected candidates in a numbered research outcome; keep
   [`targets.md`](targets.md) as a concise URL list.
8. Add direct, relevant outbound sources to the target queue and update the pipeline index.

This loop is recursive because every completed harvest supplies the candidates for the next wave.
The detailed research stays in the objective; the durable library stays under `docs/pipelines/`.

## What makes a pipeline good enough

A page must pass the admission gate in [00-library-boundary.md](00-library-boundary.md). In
addition:

- its diagram must preserve the source's actual order and principal failure or feedback path;
- source-specific engine, renderer, service, or study constraints must remain visible when they
  change the method;
- admission must not imply effectiveness, endorsement, portability, or independent validation;
- the complete page must remain understandable within the owner's five-minute constraint;
- a weak target may produce a useful rejection report and zero pages;
- there is no page quota in recursive waves.

The library grows only when evidence supports another page. A thin catalog with honest boundaries
is better than a large collection of generated checklists.

## Execution sequence

| Goal | Target or wave | Required result |
| --- | --- | --- |
| 00 | Scott Sun Three.js skills | Establish the library and write the first admitted set |
| 01 | Thrixel `goal-to-game` | Harvest the second known target and its contradictions |
| 02 | `awesome-gamedev-agent-skills` | Harvest the third known target without promoting inventories as pipelines |
| 03 | Recursive source graph, wave 1 selection | Deduplicate and freeze the best direct outbound targets from goals 00–02 |
| 04 | Recursive source graph, wave 1 harvest | Inspect the frozen targets, write admitted pages, and enqueue their outbound sources |
| 05 | Recursive source graph, wave 2 selection | Deduplicate and freeze the strongest unharvested children from wave 1 |
| 06 | Recursive source graph, wave 2 harvest | Inspect the frozen second-wave targets and write admitted pages |
| 07 | Library audit and continuation | Remove unsupported claims, verify the corpus, and leave a ranked next-wave queue |

## Why this order

Scott Sun comes first because its source ledger, exact revisions, public examples, and explicit
validation procedures provide the best material for calibrating the page format. Thrixel follows
because it tests whether the format can preserve proprietary stages and contradictions. The broad
`gamedev-skills` repository comes third because it forces the admission gate to distinguish a
pipeline from a tidy checklist or inventory.

Only then does the source-graph search begin. Starting recursion earlier would rank targets before
the known sources have been harvested completely. A second wave proves that discoveries feed
forward rather than stopping at a one-hop list. The corpus audit runs last because cross-page
duplication and evidence drift are visible only after the set exists.

## Recursive-wave bounds

The known-target goals inspect their entire frozen repositories. Recursive waves are bounded:

- publish only the candidates declared by each goal; record and defer other coherent candidates;
- select at most six targets per wave;
- prefer primary sources with ordered flows, identifiable authors, inspectable artifacts, and
  evidence outside a single landing page;
- admit at most two pipeline pages from one target in a wave; queue additional coherent candidates
  for later harvesting;
- reject duplicate, inventory-only, promotional, inaccessible, or unauditable sources;
- stop a wave early when no remaining target passes selection.

These bounds limit one execution goal without turning the ongoing target queue into a fixed-size
library.

## Files and indexing

The original plan used `docs/pipelines/<pipeline-slug>/pipeline.md`. That nested path is superseded
by the flat filename contract in [03-flat-pipeline-files.md](03-flat-pipeline-files.md). The first
goal still creates
`docs/pipelines/README.md` and the exact scaffold at `docs/pipelines/PIPELINE_TEMPLATE.md`. Every
later harvest updates that index only after a page passes its own source audit.

Each harvest writes one numbered outcome under this objective's `research/`. Outcome documents own
evidence, candidate rejections, source revisions, licenses, contradictions, and outbound-target
reasoning. They do not bloat `targets.md` or the five-minute pipeline pages.

## Effort and uncertainty

This plan measures work by frozen targets and evidence artifacts, not elapsed time.

| Work | Bound | Largest uncertainty |
| --- | --- | --- |
| Known-target harvest | One complete repository per goal | Pipeline count after full source inspection |
| Recursive wave 1 | Up to six targets and two admitted pages per target | Outbound links may lead to tools rather than practiced flows |
| Recursive wave 2 | Up to six unharvested child targets and two admitted pages per target | Evidence quality may decay with graph distance |
| Final audit | Every accepted page, index entry, and harvest outcome | Duplicate flows may require consolidation or withdrawal |

## Options considered

| Option | Result |
| --- | --- |
| Write a fixed six-page cross-source batch | Superseded by owner direction: does not complete any target or recurse |
| Search indefinitely before writing | Rejected: delays concrete pages and makes discovery unbounded |
| Harvest known targets, then run bounded recursive waves | Chosen: produces pages early while preserving a repeatable search loop |

## Needed from the owner

Nothing before goal execution. The owner has directed the work to begin with one known target and
continue recursively. Executors record source or licensing conflicts as candidate rejections. They
stop only when no primary artifact remains available to audit the harvest.

## Deliberately excluded

- a fixed minimum pipeline count for recursive waves;
- a universal Antiky or autonomous-studio pipeline;
- implementation of the supporting skills named by pipeline pages;
- installing or running third-party engines, services, skills, or agent frameworks;
- copying source material beyond what citation and license terms permit;
- turning `targets.md` back into a research report;
- keeping the objective open forever after two recursive waves and a verified continuation queue.

## Completion

This plan is complete when all three known targets have harvest outcomes, two recursive waves have
run, every admitted page passes the corpus audit, `docs/pipelines/README.md` indexes only accepted
pages, and the next unharvested target wave remains ranked and reproducible. The library may contain
fewer pages than expected; unsupported filler does not satisfy completion.
