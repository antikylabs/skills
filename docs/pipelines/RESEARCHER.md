# Research and publish pipelines from a target

Use this procedure when you receive a target and need to turn its source-supported workflows into
pipeline pages. A target can be a repository, paper, documentation set, case study, public project,
or a bounded collection of related primary sources.

The result is zero or more source-faithful files under `docs/pipelines/` and matching entries in
the [pipeline index](README.md). Zero is the correct result when no candidate passes admission. Do
not invent a workflow or weaken the gate to produce a page.

```text
target -> frozen evidence -> candidate ledger -> admission -> source map -> page -> validation -> index
```

## Before you begin

Read:

1. the repository instructions that govern the files you will change;
2. this guide;
3. the [pipeline index](README.md), including its evidence vocabulary;
4. the [pipeline template](PIPELINE_TEMPLATE.md); and
5. every existing `pipeline-*.md` page close enough to reveal a possible duplicate.

Record the supplied target and any assignment limits. If the assignment sets a candidate list,
page cap, source boundary, output names, or research-output path, treat those as fixed. Otherwise,
inspect the whole relevant target and publish every distinct candidate that passes this guide.

Do not install or run a target's code, services, skills, or dependencies unless the assignment
authorizes it. Reading source, history, public artifacts, and current primary documentation does
not imply permission to execute them.

## 1. Freeze and identify the target

Create a harvest record before drafting. Use the research-output path from the assignment when it
provides one. Otherwise keep the record in your work log and include its material results in your
final report; do not invent another library location.

Record:

| Field | Required value |
| --- | --- |
| Canonical target | Direct URL or durable identifier |
| Frozen reference | Git commit, release, paper version or DOI, documentation version, or dated snapshot |
| Retrieval date | Date on which you inspected the source |
| Authorship | Traceable people or organization, with the evidence used |
| License and reuse | License for the source plus separate or unknown terms for code, assets, services, data, or documentation |
| Inspected artifacts | Complete relevant path or section inventory |
| Execution boundary | What you read, what you ran, and what you did not run |

For a Git target, use a full commit SHA and link to files at that revision. Inspect repository and
path history when it helps establish authorship or practice. For a paper, record the exact version
and inspect the method, appendices, supplemental artifacts, and linked project material. For live
documentation, record the product version and retrieval date; state when the source has no
immutable revision. Refresh mutable facts such as limits, platform rules, prices, and API behavior
against current primary documentation.

Prefer primary artifacts. Search results, summaries, registry pages, social posts, popularity,
stars, and author reputation can lead to evidence; they are not evidence that a pipeline works.

## 2. Inspect the complete relevant source

Do not stop at the README or the target's most polished example. Build an inventory that is broad
enough to expose both real workflows and reasons to reject attractive non-workflows.

Start from the complete file tree, table of contents, or navigation surface. Search it for ordered
instructions and for terms such as workflow, process, stage, step, gate, retry, fail, accept,
output, publish, and stop. Follow internal references that define the order or its evidence. Stop
discovery only after every workflow-shaped route or section has a candidate-ledger disposition;
finding the first admissible pipeline is not completion.

For a source repository, inspect as applicable:

- root instructions, README files, licenses, notices, releases, and changelog;
- workflow, skill, router, and reference documents;
- templates, schemas, scripts, tests, fixtures, examples, and generated artifacts;
- commit and path history, authorship, issues, and public practice records; and
- direct outbound sources that support a stage, gate, claimed result, or separate candidate.

For papers, documentation, or case studies, inspect the equivalent methods, procedures, figures,
appendices, participant or production context, evaluation artifacts, limitations, version history,
and directly linked implementations.

Follow an outbound source only when it supports a target claim or is necessary to classify a
candidate. Record other direct, relevant targets for later work instead of silently expanding the
harvest. If the assignment names a target queue, append only exact new source URLs and keep that
queue free of research prose; otherwise include the leads in your final report.

State what each type of evidence establishes. A structural test may prove that a file parses; it
does not prove that the workflow improves a game. A demo proves the demonstrated result, not
repeatability or independent validation. Preserve conflicts between sources instead of resolving
them silently.

## 3. Enumerate candidate pipelines

A pipeline is an operative flow with an observable order and at least one meaningful artifact,
gate, feedback path, branch, failure condition, or stop condition. An inventory of tools, roles,
prompts, features, routes, or player actions is not a development pipeline merely because it is
numbered.

The source must place AI or agent use inside the process, or the process must itself be an agent
workflow. Preserve engine, renderer, service, study, or production context when removing it would
change the method.

Create a candidate ledger with one row for every plausible workflow:

| Candidate | Primary source | Trigger and outcome | Proposed scope | Disposition | Reason |
| --- | --- | --- | --- | --- | --- |
| Stable name | Direct link | What starts and finishes it | End-to-end, discipline, asset, verification, tuning, technical graphics, or delivery | Admit, reject, defer, duplicate, or subsumed | Exact gate, missing evidence, existing page, assignment bound, or parent workflow |

Check these common false positives explicitly:

- a router or capability catalog with no operative order;
- a player gameplay loop presented as a game-development workflow;
- an API setup, configuration recipe, or isolated implementation sequence with no project-level
  output and acceptance path;
- a constituent subloop that has no independent trigger or outcome outside a stronger parent
  pipeline;
- the same workflow already published under different vocabulary; and
- a synthesized house workflow that no source states or demonstrates.

Default to one source-faithful page per distinct workflow. Do not combine sources into a cleaner
generalized flow. A synthesis belongs only in separately authorized work, requires at least two
independent sources with materially shared structure, and must label the composition as inference.

## 4. Apply the admission gate

Admit a candidate only when all six answers are **yes**:

1. Does a primary source expose an observable order?
2. Does the source name artifacts, gates, feedback, branches, failure, or stop conditions?
3. Are authorship and an evidence date traceable?
4. Can the principal flow fit a concise diagram without invented stages?
5. Can source facts, source-specific details, contradictions, and editorial inference remain
   visibly distinct?
6. Can a reader audit the page through direct links?

An accepted candidate must also expose a usable trigger, ordered loop, outputs, principal feedback
or failure path, and stop condition. Reject a candidate with the exact failed gate when any of
these cannot be supported. Defer only for a stated assignment bound or a named piece of evidence
that can realistically be obtained later. Mark a duplicate with the existing pipeline path. Mark
a subflow as subsumed only when the admitted parent actually preserves it.

Admission means **worth documenting**. It does not mean effective, recommended, portable, mature,
or production-ready.

## 5. Assign evidence signals

Use only the index vocabulary, and record each supported signal separately:

| Signal | Required evidence |
| --- | --- |
| Source-documented | A primary source states the flow |
| Author-practiced | Public artifacts show the author applying it |
| Study-observed | A study records participants, trials, artifacts, or outcomes |
| Production-used | A named team reports use in a named production context |
| Independently validated | Evidence outside the source evaluates or reproduces the pipeline |

The source's own tests, demo, stars, contributors, citations, or marketing claims do not establish
independent validation. Do not compress the signals into `proven`, a score, or an endorsement.

Before drafting, freeze the exact output filename for each admitted candidate:

```text
docs/pipelines/pipeline-<group-name>-<name>.md
```

Use a stable lowercase source-family group and a workflow-specific name. Do not create a directory
for an individual pipeline. If the assignment has a page cap, defer admitted overflow rather than
changing the cap or hiding the candidate.

## 6. Build the source-to-diagram map

Reconstruct the workflow from evidence before writing prose. Make two tables in the harvest record:

| Node | Exact source mapping |
| --- | --- |
| `A — short action or gate` | Frozen deep link to the supporting lines, section, figure, or artifact |

| Edge | Exact source mapping |
| --- | --- |
| `A -> B` | Evidence that B follows A, including branch or retry wording |

Map every node and every edge, including pass, fail, retry, rejection, deferral, and stop paths. If
the source supports two stages but not their connector, either omit the connector or label it
`Inference:` in the map, Mermaid label, and page prose. Never make an inferred edge look authored.

Keep the top-level flow to at most nine main nodes. Combine only adjacent source steps that retain
the same order and meaning. Move detail into prose; do not remove the gate, feedback path, or stop
condition that makes the sequence a pipeline.

## 7. Write each admitted page

Copy [the pipeline template](PIPELINE_TEMPLATE.md) and remove all instructional text. Preserve its
heading order.

### Evidence capsule

- **Scope:** Use the narrowest accurate library scope. Preserve source-specific context.
- **Trigger:** State the source-supported condition that starts the workflow.
- **Source:** Link directly to the primary source at a frozen revision when possible.
- **Author and evidence date:** Name the traceable author, source date, and retrieval date.
- **Evidence signals:** Use only signals established in Step 5.
- **Evidence limit:** State the strongest conclusion the evidence does not support.

### Loop and operating details

- Use one top-level Mermaid flowchart with no more than nine main nodes.
- Preserve the source's order, branches, principal feedback path, outputs, and stop condition.
- Use source vocabulary when changing the term would change the method.
- In **Run the loop**, state ordered actions, inputs, artifacts, roles named by the source, and the
  return path after a failed gate.
- In **Outputs and stop conditions**, name produced artifacts, acceptance, rejection or deferral,
  repeat conditions, and hard stops.

### Supporting skills and boundaries

- Under **Observed**, list only tools or skills the source names, ships, or demonstrably uses.
- Under **Potential**, list portable capabilities inferred by this library. Call them inference and
  say that they may not exist.
- In **Evidence boundaries**, retain contradictions, source-specific limitations, mutable facts,
  effectiveness limits, portability limits, and license or reuse constraints.
- In **Sources**, use direct primary links. Prefer frozen deep links for stable claims and current
  official links for intentionally mutable facts.

Paraphrase source material. Do not copy code, assets, diagrams, or long passages merely because the
source is public. A repository license does not automatically cover external assets, services,
engines, marketplace content, papers, or linked documentation.

## 8. Validate before publishing

Audit each page claim by claim against the frozen source and its source-to-diagram map. Then apply
these gates.

### Page contract

- All six evidence-capsule fields and every template section are present.
- The page contains exactly one top-level Mermaid diagram and no more than nine main nodes.
- Every node and edge has primary-source support or a complete inference label.
- Source order, trigger, artifacts, gate, feedback, outputs, failure, and stop conditions agree
  across the diagram and prose.
- Observed and potential supporting skills remain separate.
- Evidence signals, contradictions, mutable facts, and license boundaries match the inspected
  evidence.

### Five-minute cold-reader check

Without opening the harvest record, an unfamiliar reader can identify:

1. the trigger;
2. the ordered loop;
3. the feedback gate;
4. the outputs and stop condition; and
5. the evidence level and its limit.

Shorten detail that blocks those answers. Do not shorten away the method's real constraints.

### Corpus check

- No existing page describes the same workflow without a source-backed reason to keep both.
- The filename follows the flat naming contract and does not overwrite an unrelated pipeline.
- The page does not imply that admission is a recommendation or effectiveness result.
- Rejected, deferred, duplicate, and subsumed candidates have no new pipeline file or index row.

### Mechanical checks

Run from the repository root:

```sh
for file in docs/pipelines/*.md; do npx --yes markdown-link-check@3.15.0 "$file"; done
for file in docs/pipelines/pipeline-*.md; do npx --yes @mermaid-js/mermaid-cli@11.16.0 -i "$file" -o "/tmp/$(basename "$file")"; done
git diff --check
```

Record the commands and results. A passing parser or link check does not prove source fidelity;
the mapping and claim audit remain required. If a check fails, fix the page and rerun it. If the
source cannot support the fix, withdraw the page and change the candidate disposition.

## 9. Save and index accepted pages

Only after a page passes every gate:

1. save it at its frozen `docs/pipelines/pipeline-<group-name>-<name>.md` path;
2. add one row to the pipeline table in [the index](README.md), with the same scope and evidence
   signals as the page;
3. confirm every `pipeline-*.md` page is indexed exactly once and every index link resolves; and
4. preserve the harvest record or final report with the source inventory, full candidate ledger,
   admission decisions, source mappings, contradictions, and validation results.

Report the target and frozen reference, what you inspected, every candidate disposition, created
and indexed filenames, evidence signals, checks run, and anything unresolved. When nothing passes,
report the rejected or deferred candidates and their exact reasons, create no pipeline page, and
leave the index unchanged.

You are done only when every candidate is accounted for and every published page can be audited
from trigger through stop condition without trusting your summary.
