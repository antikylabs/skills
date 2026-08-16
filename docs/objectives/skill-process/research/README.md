# Skill-process research

Research snapshot: 2026-08-16

## Headline conclusions

The public evidence is strongest for narrow, inspectable AI-assisted loops, not autonomous
idea-to-shipped-game studios. Credible examples include staged learned-agent QA, hierarchical
playable-slice prototyping, coarse-to-fine world visualization, behavior-trace tuning, divergent
design input with human judgment, deterministic visual-system validation, and source-specific
asset-to-engine work.

A documented pipeline is not necessarily an effective pipeline. No candidate combines a long
public history, repeated outside use, engine-neutral scope, and independent outcome validation.
Stars, contributors, installs, demos, and author reputation remain discovery signals.

The initial library can responsibly contain source-faithful pipeline pages if each page states its
status, context, evidence date, primary sources, source-specific limitations, independent
validation, gaps, and contradictions. Portable supporting skills must be labeled as observed or
inferred.

## Report map

| Report | What it answers |
| --- | --- |
| [Research plan](00-research-plan.md) | Questions, decisions unblocked, research lines, evidence rubric, and constraints |
| [Evidence and admission](01-evidence-and-admission.md) | What documented, practiced, studied, production-used, and independently validated mean |
| [Candidate pipelines](02-candidate-pipelines.md) | Which pipelines can support a first draft and which remain leads |
| [Patterns and document contract](03-patterns-and-document-contract.md) | Reusable anatomy, Mermaid rules, evidence sections, and potential skill families |
| [Discovery map and gaps](04-discovery-map-and-gaps.md) | Sources to monitor, what recurring searches must record, and missing evidence |

Raw subagent reports are preserved unedited in [`subagent_outputs/`](subagent_outputs/).

## Questions answered

1. The research identified several explicit general or generalizable pipeline candidates.
2. It defined an admission standard that does not confuse attention signals with quality evidence.
3. It extracted stages, artifacts, gates, feedback, roles, failure paths, and stop conditions.
4. It identified potential portable supporting-skill families while labeling them as inference.
5. It produced a broader recurring discovery map beyond `targets.md`.
6. It proposed a five-minute pipeline contract that preserves source fidelity and evidence.
7. It separated strong first-draft candidates, useful leads, and Antiky house syntheses.

## Questions still open

- Whether technical pipelines that agents can execute, but which are not inherently AI-specific,
  belong in this library
- Whether discipline pipelines and end-to-end pipelines share one index or separate collections
- Whether each generalized pipeline also keeps a source-specific companion page
- What minimum evidence tier is required for the first public pass
- How many pipeline documents constitute the initial pass
- Whether Antiky-inferred compositions belong in the same library under an explicit `Inferred`
  status or remain internal comparison material

## Owner decisions needed before planning

1. Choose the admission floor: source-documented, author-practiced, study-observed, or
   production-used. Independent validation cannot be the universal floor because no end-to-end
   candidate meets it.
2. Decide whether the library includes technical and discipline pipelines, or only workflows that
   are explicitly about AI-assisted game creation.
3. Decide whether source-specific and generalized variants are separate files.
4. Choose a bounded first batch from the strong candidates in
   [02-candidate-pipelines.md](02-candidate-pipelines.md).
5. Approve or revise the evidence extension to the proposed `pipeline.md` contract in
   [03-patterns-and-document-contract.md](03-patterns-and-document-contract.md).

No research finding contradicts an accepted ADR or AIP; none was found for this area. The findings
do reinforce the repository's direction: prefer simple, inspectable, evidence-driven processes;
resist novelty, premature universal abstractions, and confident claims without observable proof.
