# First-pass plan

This document selects the first library batch, its page contract, and the order in which to produce
and verify it. It assumes the boundary and vocabulary in
[00-library-boundary.md](00-library-boundary.md).

## Intended result

The first pass delivers:

- `docs/pipelines/README.md`, the index and maintenance entry point;
- six folders under `docs/pipelines/`, each containing one `pipeline.md`;
- a small reusable page scaffold embedded in the index;
- a claim-by-claim, source-fidelity, Mermaid, link, and five-minute-reading audit of every page.

The objective can then close. Later discoveries remain in the concise
[`targets.md`](targets.md) queue and can enter a later research-and-admission cycle.

## Library location

Use `docs/pipelines/<pipeline-slug>/pipeline.md`.

| Option | Decision |
| --- | --- |
| `docs/pipelines/<slug>/pipeline.md` | Chosen: matches the owner's `pipeline.md` concept and leaves room for local supporting artifacts |
| `docs/pipelines/<slug>.md` | Rejected: flatter, but loses the stable folder boundary implied by one pipeline package |
| Keep pages inside this objective | Rejected: objective artifacts are temporary and archive when the work closes |

This location keeps the library out of `skills/`, so pipeline pages cannot be mistaken for
installable Agent Skills.

## Page contract

Every page is the five-minute reading path. Deep provenance remains in the research corpus; the
page carries only enough evidence to interpret and audit its claims.

````markdown
# <Pipeline name>

<One-sentence purpose and boundary.>

**Scope:** <scope>
**Evidence:** <separate supported signals>
**Context:** <engine, discipline, scale, or other material limit>
**Primary source:** <author and direct link>
**Evidence date:** <YYYY-MM-DD>

```mermaid
flowchart LR
    ...
```

## Pipeline Details

### Inputs and preconditions
### Stages
### Artifacts and gates
### Feedback, failure, and stop conditions
### Roles

## Supporting Skills

### Outline
- `[Observed | Potential] <skill-name>`: <one line>

### Details

## Evidence and Limits
````

The diagram uses about five to nine primary nodes, contains only source-supported order, and shows
only real gates, branches, and feedback. The page reports omissions instead of filling them.

## Recommended first batch

The batch deliberately spans different scopes and evidence levels so the contract must represent
uncertainty rather than work only for one kind of source.

Evidence: [candidate-pipeline report](research/02-candidate-pipelines.md),
[document-contract report](research/03-patterns-and-document-contract.md), and
[discovery gaps](research/04-discovery-map-and-gaps.md).

| Pipeline | Evidence represented | Why it belongs | Claim boundary |
| --- | --- | --- | --- |
| Staged learned-agent QA integration | Production-used, first-party report | Strongest named production context | Learned control inside an existing QA system, not autonomous QA |
| DreamGarden hierarchical playable-slice prototyping | Study-observed | Rich artifacts, human overrides, compile and visual repair | Early Unreal prototype, not maintainable production software |
| WorldSmith coarse-to-fine world visualization | Study-observed | Clear human selection and local-edit loop | Concept visualization, not engine-ready level or production art |
| Fly, Fail, Fix behavior-trace tuning | Study-observed experiment | Clear play, observe, revise, replay loop | Flappy Bird parameter tuning with a fixed RL player |
| Three.js visual-system validation | Author-practiced and source-documented | Strong provenance ledger and inspectable diagnostics | Three.js-derived; no independent skill-effectiveness evidence |
| Thrixel asset-to-engine | Source-documented with vendor demonstrations | Concrete manifest, revision, hierarchy, import, and game-context loop | Proprietary, self-validated, and internally contradictory about image input |

The proposed page targets are:

```text
docs/pipelines/staged-learned-agent-qa/pipeline.md
docs/pipelines/dreamgarden-playable-slice/pipeline.md
docs/pipelines/worldsmith-world-visualization/pipeline.md
docs/pipelines/fly-fail-fix-tuning/pipeline.md
docs/pipelines/threejs-visual-system-validation/pipeline.md
docs/pipelines/thrixel-asset-to-engine/pipeline.md
```

Defer The Ink Splotch Effect because the useful human-selection pipeline is partly inferred. Defer
the Three.js final-image pipeline because it overlaps the visual-system page and is narrower than
the balanced first batch. The new targets in the discovery report remain leads until they receive
full evidence cards.

## Batch options considered

| Option | Result |
| --- | --- |
| Four evidence-heaviest research pipelines | Rejected: does not test author-practiced, technical, or vendor-authored evidence |
| Six balanced pipelines | Chosen: covers six useful scopes without turning the first pass into an exhaustive catalog |
| Every current strong candidate | Rejected: multiplies an unproven format and blurs this pass with ongoing discovery |

## Sequence and dependency

### 1. Ratify the editorial policy

The owner confirms the admission floor, scope policy, source/generalization rule, page contract,
location, and roster below. Without this gate, page authors must guess what belongs and how much
evidence the library promises.

### 2. Establish the skeleton

Create `docs/pipelines/README.md`, its index fields, and the page scaffold. Do this before drafting
so filenames, evidence labels, and supporting-skill labels do not diverge across pages.

### 3. Prove the contract with DreamGarden

Draft DreamGarden first. It combines a plan tree, specialist tasks, compiler and runtime evidence,
visual feedback, human intervention, and strict production limitations. If that source cannot fit a
concise, faithful page, the contract is not ready to multiply.

### 4. Audit the pilot before scaling

Check every diagram node and factual claim against refreshed primary sources. Test the five-minute
top-level path with a reader unfamiliar with the paper. Revise the contract once, then freeze it for
the remainder of the first batch.

Skipping this step creates change amplification across all six pages.

### 5. Draft the remaining five

Refresh each source immediately before drafting. If a candidate no longer passes admission, record
the reason and replace it from the researched backlog; do not relax the gate to preserve the count.

### 6. Build the index from the pages

Index the completed pages by name, scope, evidence, context, and source. Building the taxonomy after
the pages lets categories emerge from actual material instead of imposing a premature hierarchy.

### 7. Audit the corpus

Run one cross-page review for source fidelity, evidence language, Mermaid rendering, link health,
five-minute readability, contradiction retention, and observed-versus-potential supporting skills.
Unresolved failures stay visible and block acceptance of that page.

## Effort and uncertainty

This plan uses artifact counts rather than elapsed-time estimates.

| Work | Expected range | Main assumption |
| --- | --- | --- |
| Contract and pilot | One pipeline page, roughly two to four primary artifacts, two distinct reviews | DreamGarden's current sources remain available and internally consistent |
| Remaining batch | Five accepted pages drawn from five to seven candidate refreshes, roughly fourteen to twenty-six primary artifacts | No more than two candidates fail admission during refresh |
| Closeout | One index and six cross-page claim audits | The frozen contract works across every selected scope |

The largest expansion risk is unavailable, changed, contradictory, or poorly licensed source
material. Mermaid authoring is not the hard part.

## Owner decisions

The recommendations below block `create-goals`. The owner may approve them as a package or override
individual numbers.

| # | Recommended decision | Alternative | Blocks |
| --- | --- | --- | --- |
| 1 | Admit source-documented, auditable flows and report stronger evidence separately | Require author practice, study observation, or production use | Final roster and claim language |
| 2 | Include discipline and technical pipelines in one index with a `Scope` field | Restrict the library to end-to-end AI game creation | Roster and information architecture |
| 3 | Write one source-faithful page first; defer generalized companions | Publish paired source and generalized pages | Page count, naming, and source boundaries |
| 4 | Use the compact evidence-bearing page contract above | Use the owner's original contract without evidence fields | Scaffold and review gates |
| 5 | Approve the balanced six-page roster | Choose the four-page or broader batch | Delivery sequence and effort |
| 6 | Use `docs/pipelines/<slug>/pipeline.md` | Choose a different durable library home | All file targets |

## Verification

The first pass is complete only when:

- all six pages pass the admission gate in `00-library-boundary.md`;
- every diagram node maps to a primary source;
- source facts, source-specific detail, and inference remain distinguishable;
- evidence signals are separate and no page implies endorsement;
- every supporting skill is labeled observed or potential;
- important limitations and contradictions remain visible;
- Mermaid diagrams render and local and external links resolve;
- an unfamiliar reader can complete each top-level path within the owner's five-minute constraint;
- `docs/pipelines/README.md` indexes the accepted pages and explains how later targets re-enter
  research rather than bypassing it;
- `git diff --check` passes.

## Deliberately excluded

- implementing or evaluating supporting skills;
- a universal end-to-end or Antiky house pipeline;
- installing or rerunning external engines, agents, skills, or benchmarks;
- separate indexes for discipline and end-to-end work;
- generalized companion pages in the first pass;
- weakly evidenced audio, accessibility, localization/LQA, certification, or live-operations pages;
- endless discovery inside this finite first pass.

## Decision-record impact

No accepted ADR or AIP governs this area, and this plan does not require one. If pipelines later
become an installable package, change skill discovery, or create a new skill category, propose that
architecture decision separately before implementation.
