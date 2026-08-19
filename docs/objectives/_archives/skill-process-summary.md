# Archive summary — skill-process

**Archived:** 2026-08-18
**Objective folder:** `docs/objectives/skill-process/` (removed)
**Execution:** Nine completed goals: 00–07 and deferred follow-up goal 80

## What this objective was

The owner asked for concise, Mermaid-first descriptions of game-development pipelines that people
use with AI. Each page needed to be understandable within five minutes, preserve the source's
actual sequence, and identify the supporting skills without standardizing on one engine, framework,
platform, or game.

The objective established a pipeline library and a repeatable way to admit material into it. The
result is a catalog of source-faithful workflows with explicit evidence limits, not a universal
Antiky process or a list of recommended practices.

## Delivered outcome

The durable result is the [pipeline library](../../pipelines/README.md): 17 flat
`pipeline-<group-name>-<name>.md` pages, one index, a reusable
[page template](../../pipelines/PIPELINE_TEMPLATE.md), and a
[researcher guide](../../pipelines/RESEARCHER.md) that carries the admission and verification
procedure beyond this objective.

The 17 pages cover:

| Area | Published workflows |
| --- | --- |
| Prototyping and game creation | fast gameplay prototyping, game-jam delivery, Thrixel Goal to Game, and Pearl Sea Park staged agent build |
| Visual and gameplay verification | Three.js visual-system validation, final-image production, and gameplay-relationship testing |
| Asset and level work | game-asset production, level blockout, and Unity imported-asset validation |
| Build and runtime verification | Unreal packaging, Unity build, and Godot export workflows |
| Delivery | itch.io Butler publishing and SteamPipe build and release |
| Focused correction | Sea Park simulation-first geometry correction and measured performance recovery |

All 17 pages are Source-documented. Six also have public evidence that the author practiced the
workflow. None claims independent validation, effectiveness, portability, endorsement, or
production readiness merely because it entered the library.

The objective inspected three known source families, two bounded recursive source waves, and one
deferred-candidate follow-up. It published 11 pages before the corpus audit and six more in goal 80.
The final index contains exactly one row for every page.

The active queue now lives at [pipeline continuation targets](../../pipelines/TARGETS.md). Closeout
removed six sources that goal 80 published and one router that failed the workflow boundary. The 22
remaining leads are the Sea Park fauna overflow candidate and 21 source-specific Three.js modules.
Each still needs a fresh evidence and admission review.

## Durable decisions

These rules now live in the pipeline index, template, and researcher guide rather than in the
retired objective.

| Decision | Durable rule |
| --- | --- |
| Source fidelity | Publish one source-faithful workflow. Do not clean several sources into an unlabeled house pipeline. |
| Admission | Require an observable order, meaningful artifacts or gates, traceable authorship and date, a concise diagram, visible source-versus-inference boundaries, and direct audit links. |
| Evidence | Record Source-documented, Author-practiced, Study-observed, Production-used, and Independently validated as separate signals. Admission means worth documenting, not proven or recommended. |
| Page shape | Use one flat `pipeline-<group-name>-<name>.md` file, six evidence-capsule fields, one top-level Mermaid path, and at most nine main nodes. |
| Inference | Label an editorial connector in the source map, diagram, and prose. Omit it when that labeling cannot remain clear. |
| Scope | Preserve engine, renderer, service, study, and production constraints when removing them would change the method. |
| Supporting skills | Separate tools and skills observed in the source from capabilities Antiky infers might be useful. |
| Negative results | Reject inventories, setup recipes, player loops, duplicates, and constituent subflows explicitly. Do not weaken admission or invent a page to fill a quota. |
| Maintenance | Refresh mutable primary sources before editing; verify the source map and claims in addition to Mermaid syntax and links. |

The recursive search was intentionally bounded. A wave could inspect at most six targets and admit
at most two pages per target. An empty wave was a valid stop. Later work must begin from a bounded
candidate and run the same admission process; it must not silently reopen unlimited source-graph
traversal.

## What was learned

**A tidy document is not necessarily a pipeline.** The broad `gamedev-skills` repository gave all
67 skills the same numbered “Core workflow” shape. Full-route inspection showed that many were API
recipes, system inventories, or player loops. Observable project artifacts, gates, feedback, and
outputs were the useful test—not the heading structure.

**Source-specific constraints carry the method.** The Thrixel workflow depends on proprietary
service and license boundaries. Unreal, Unity, Godot, Butler, and SteamPipe stop at different
artifacts and approval gates. Generalizing those details away would produce a smoother but false
workflow.

**Contradictions and missing connectors are evidence.** Thrixel's source disagreed about image
input. Butler described preview comparison without making it a required approval gate. Unity and
Godot described failure classes without stating literal retry edges. The pages preserve those
limits and label the few editorial connectors instead of repairing the sources in prose.

**Recursive discovery loses useful signal quickly.** Wave 1 selected 4 of 35 direct children.
Wave 2 selected 0 of 10 because every child was a duplicate, constituent operation, or outside the
AI-assisted workflow scope. Goal 06 correctly recorded a no-op rather than searching for replacement
targets, and the objective stopped without a third wave.

**Verification needs an explicit oracle.** Early checks miscounted Mermaid nodes, included filename
examples as index rows, over-escaped Markdown separators, or allowed a later command to hide an
earlier failure. The final workflow scopes structural checks to the actual catalog tables, maps
every diagram node and edge to a source, and uses fail-fast parser and link sweeps.

## What this objective got wrong and corrected

The first plan proposed a fixed six-page batch across unrelated sources. The owner redirected the
work toward complete target harvests and bounded recursive discovery. Plan 02 superseded the fixed
roster, and the objective ultimately published what survived admission rather than preserving the
original page count.

The first storage decision used one directory per pipeline. That made a catalog of identical
`pipeline.md` filenames harder to scan and audit. Plan 03 replaced it with the flat, source-grouped
filename contract used by every published page.

The first Thrixel draft reduced the source to an asset-to-engine subloop. Re-reading the complete
route showed that its named top-level process was Goal to Game. The page, index, diagram, and
research mapping were rewritten around the actual end-to-end workflow.

Several attractive proxies were discarded during execution: a heading named “workflow,” a
repository containing agent instructions, a public implementation, and a confident AI-friendly
claim. None alone establishes an operative AI-assisted game-development pipeline.

The wave-1 audit prose initially reported 27 rejections while its row ledger contained 28. Goal 07
corrected the count and kept the ledger as the authority. Later corpus and goal-80 reviews also
repaired incomplete source links and literal phrases that obscured the measured mechanism.

## What was not done

| Not done | Why |
| --- | --- |
| A universal Antiky or autonomous-studio pipeline | Independent sources did not establish one shared end-to-end method, and synthesis would hide material gates. |
| Generalized companion pages | Common shapes were not strong enough to justify a second inferred catalog. |
| Supporting-skill implementation | The objective identified observed and potential capabilities; building or evaluating skills was outside its boundary. |
| Independent effectiveness claims | The inspected evidence supported documentation and some author practice, not independent validation of outcomes. |
| Third-party engine, service, or benchmark execution | The objective audited public sources and artifacts; it did not receive authority to run external targets. |
| A third recursive wave | The second wave selected 0 of 10 direct children and produced no continuation edge. |
| The remaining 22 candidate sources | They exceeded the bounded follow-up or still lack module-specific workflow evidence. They remain leads, not promised pages. |

The [durable research records](../../pipelines/research/README.md) retain the source maps and audit
chain referenced by published pages. The rest of the retired corpus—early surveys, raw subagent
returns, superseded plans, and completed-goal records—remains recoverable through Git history but is
no longer active project documentation.

## Follow-on work

- Start any new harvest from one bounded source in
  [the continuation queue](../../pipelines/TARGETS.md). Refresh it before admission; a queue entry
  does not reserve a publication slot.
- Evaluate the library's workflows independently before describing any of them as effective,
  portable, or recommended.
- Build a supporting skill only under a separate objective that defines its user, evidence, tests,
  and evaluation boundary.
- Revisit a generalized or Antiky house pipeline only when at least two independent sources expose
  materially shared order and the synthesis adds more than renamed stages.
- Keep mutable engine and platform instructions current. Version-frozen source facts are not current
  operational guidance.
