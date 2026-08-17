# Summary — goal 02: Harvest gamedev-skills without promoting its catalog

**Completed:** 2026-08-17
**Commit:** `1a36643`; completion bookkeeping follows in the commit that archives this summary
**Goal file:** [`execute-goal-02.md`](execute-goal-02.md)

## Action needed from the owner

Nothing in this summary needs you. All four declared candidates had enough source evidence for a
decision, the existing library boundary resolved the catalog-versus-pipeline question, and no new
product or evidence-policy decision appeared.

## What was delivered

1. [Fast gameplay prototyping](../../../../pipelines/pipeline-gamedev-skills-fast-gameplay-prototyping.md),
   an eight-node question-to-decision loop with keep, kill, refactor, and hard-timebox outcomes.
2. [Game-jam delivery](../../../../pipelines/pipeline-gamedev-skills-game-jam-delivery.md), a
   nine-node deadline, scope, playable-loop, freeze, clean-build, and submission flow.
3. [Game-asset production](../../../../pipelines/pipeline-gamedev-skills-game-asset-production.md),
   a nine-node brief, manifest, target-approval, family-production, engine-import, context-review,
   and provenance loop.
4. [Level blockout, teach, and test](../../../../pipelines/pipeline-gamedev-skills-level-blockout-teach-test.md),
   a nine-node metrics-to-blockout loop whose pass gate precedes art dressing.
5. A complete [gamedev-skills harvest outcome](../../research/07-gamedev-skills-harvest.md) covering
   the frozen 172-artifact tree, all route families, four admission decisions, six eligible
   deferrals, rejection and alternative-interpretation records, diagram mappings, evidence limits,
   outbound targets, and verification.
6. Four matching library-index entries, three direct URL-only additions to the
   [target queue](../../targets.md), and a reconciled Goal 02 [Goal 80 intake row](../execute-goal-80.md#candidate-intake).

## What I got wrong

I first used the presence of an ordered “Core workflow” heading as a candidate signal. The
full-route inventory disproved its usefulness: every one of the 67 skills has the same structural
shape, including API setup recipes and genre system lists. I replaced that proxy with a
requirement-by-requirement check for project-level artifacts, gates, feedback, and outputs. That is
why only six additional routes were deferred and the rest have explicit exclusions.

The first artifact audit also reported 12 remaining discipline recipes after removing the three
discipline candidates. The named list contained 11. I corrected the count before closeout and
reconciled the grouped inventory back to all 172 tracked artifacts.

## Traps worth knowing

- A repository-wide Git URL rewrite turned the first HTTPS clone into SSH. The source freeze used
  an explicit HTTPS override, and a second fetch retrieved the omitted historical blobs needed for
  path provenance.
- The target's shared authoring template makes almost any skill look pipeline-shaped at a glance.
  The numbered heading is repository shape, not workflow evidence.
- Genre skills contain real gameplay loops, but those loops describe player actions. Their
  following numbered sections are system inventories, not development pipelines.
- The source's tests cover structure and two raster helpers. They do not execute agent workflows or
  establish gameplay, art, delivery, or level-design outcomes.
- The first Mermaid invocation failed because the sandbox could not resolve npm. The same pinned
  command passed with network access; no parser or diagram change was needed.

## Evidence

| Check | Result |
| --- | --- |
| Source freeze and inventory | Revision `9ca5296b219049c5b68494e1f3c274ead6d727b3`, tree `bc9b20a3109f9c00d945f741643d8dd79aca6247`, 76 commits, all 172 tracked artifacts, history, authors, root license, tests, and banner recorded |
| Admission | All four declared candidates pass all six gates at Source-documented evidence only |
| Anti-inventory boundary | Router/catalog, nine gameplay loops, 11 remaining discipline recipes, 37 remaining engine/API recipes, meta-workflows, and constituent subflows have explicit dispositions |
| Deferred work | Six stable eligible candidates match Goal 80; constituent asset and level subflows remain exclusions |
| Mermaid | Mermaid CLI `11.16.0` rendered all seven current pipeline pages; new pages contain one top-level chart and eight or nine main nodes |
| Source mapping | Every node and edge on all four pages maps to a frozen primary artifact; no editorial connector was needed |
| Links | 56 complete-library links, 74 outcome links, and nine links in both Goal 02 and Goal 80 passed under `markdown-link-check` `3.15.0` |
| Cold-reader check | Trigger, ordered loop, feedback gate, outputs, and evidence level are visible on all four pages |
| Index, queue, and rejected output | Index and page set are one-to-one; three URL-only targets are unique; no deferred or rejected page exists |
| Repository hygiene | `git diff --check` passed; the unrelated `brometal-patching` deletion remained untouched and unstaged |

## What this unblocks

- Goal 03 can freeze recursive wave 1 from three completed known-target harvests and their direct
  child URLs.
- Goal 80 now has six bounded gamedev-skills follow-up candidates without inheriting the catalog,
  genre loops, or constituent asset/level subflows as accidental work.
- The library now tests its admission boundary against a broad skill catalog and retains only the
  four declared operative loops.

## What remains blocked

Nothing in the objective is blocked. The six deferred candidates require their own source refresh
and admission audit before publication; this goal does not pre-admit them.
