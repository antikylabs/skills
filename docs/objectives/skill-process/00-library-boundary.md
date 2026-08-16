# Library boundary

This document decides what the pipeline library is, what qualifies for it, and which terms the
plan uses. It does not select or sequence the first batch; [the first-pass plan](01-first-pass-plan.md)
does that.

## Diagnosis

The owner wants concise, Mermaid-first descriptions of game-development pipelines that people use
with AI. The research found enough evidence to begin, but not the evidence needed for one universal
AI game-development process:

- the strongest sources describe narrow QA, prototyping, visualization, tuning, asset, and graphics
  loops rather than an idea-to-shipped-game studio;
- no engine-neutral end-to-end candidate combines long public history, repeated outside use, and
  independent outcome validation;
- engine-specific details often contain the real gates, so removing them can falsify the method;
- stars, demos, authorship, and structural tests help discovery but do not prove effectiveness;
- potential supporting skills are usually Antiky's decomposition, not something the source names.

Evidence: [admission research](research/01-evidence-and-admission.md),
[candidate pipelines](research/02-candidate-pipelines.md), and
[document-contract research](research/03-patterns-and-document-contract.md).

## Strategic call

Build a catalog of **source-faithful, narrowly scoped pipelines with explicit evidence limits**.
Do not begin with a canonical Antiky workflow, an autonomous-studio model, or a ranked list of
recommendations.

This keeps the first pass useful without making claims the sources cannot support. Generalized
Antiky pipelines may follow later, after independent sources establish a real shared flow.

## Vocabulary

| Term | Meaning in this objective |
| --- | --- |
| Pipeline | An ordered flow with observable artifacts, gates, feedback, branches, or stop conditions |
| Source-faithful | The main flow contains only steps the named source states or demonstrates |
| Generalized | A new composition derived from more than one source; always an inference |
| Scope | End-to-end, discipline, asset, verification, tuning, technical graphics, or delivery |
| Observed support | A skill or tool the source names or uses |
| Potential skill | A portable capability inferred by this research; it may not exist yet |

An inventory of tools, roles, prompts, or features is not a pipeline unless it also exposes an
ordered flow.

## Evidence vocabulary

Record evidence signals separately. Do not compress them into `proven`, a score, or one overloaded
badge.

| Signal | What it establishes |
| --- | --- |
| Source-documented | A primary source states the flow |
| Author-practiced | Public artifacts show the author applying it |
| Study-observed | A study records participants, trials, artifacts, or outcomes |
| Production-used | A named team reports using it in a named production context |
| Independently validated | Evidence outside the source evaluates or reproduces the pipeline |

Admission means **worth documenting**, not effective, recommended, portable, or production-ready.

## Admission gate

A pipeline page may enter the library only when all of the following are true:

1. A primary source exposes an observable order.
2. The source names artifacts, gates, feedback, branches, or stop conditions.
3. Authorship and an evidence date are traceable.
4. The flow fits a concise diagram without invented stages.
5. Source facts, source-specific details, contradictions, and Antiky inference can remain distinct.
6. A reader can audit the page through direct links.

A source that fails the gate remains in [`targets.md`](targets.md) or the
[discovery report](research/04-discovery-map-and-gaps.md). It does not receive a cleaner-looking
diagram to compensate for missing evidence.

## Scope policy

Keep end-to-end, discipline, asset, verification, tuning, and technical pipelines in one index
with an explicit `Scope` field. Admit a discipline or technical pipeline only when its source places
AI or agent use inside the process, or when the process is itself an agent workflow.

This is broader than end-to-end game creation because the evidence is strongest for narrow loops.
It is narrower than general game-development documentation because AI-assisted work remains the
subject of the objective.

## Representation policy

Write one source-faithful page per admitted pipeline in the first pass. Preserve its engine or tool
context in the details when that context changes the method.

Do not write a generalized companion until at least two independent sources expose materially the
same flow and the synthesis adds something beyond renaming their stages. A generalized page must
identify every source and label the composition as inferred.

Antiky house syntheses remain research material during this objective's first pass.

## Options considered

| Option | Result |
| --- | --- |
| Start with one universal AI game-development pipeline | Rejected: the research does not support it and the abstraction would hide real gates |
| Publish paired source-specific and generalized pages | Deferred: doubles work and makes weak commonality look settled |
| Publish source-faithful pages with evidence signals | Chosen: smallest useful library that preserves author intent and uncertainty |

## Cost of the chosen boundary

The catalog will repeat some source-specific details and look less uniform than a synthesized
framework. Each page also needs a source refresh and claim audit. That cost is intentional: it
keeps uncertainty visible and prevents a tidy taxonomy from becoming false authority.

## This document does not cover

- the first-pass roster or delivery order;
- implementation of any supporting skill;
- adoption or recommendation scores;
- standardizing on an engine, framework, platform, or game;
- an installable format for pipelines.

