# Skill-process research plan

Research started: 2026-08-16

## Questions

1. Which general game-development pipelines are explicitly documented or repeatedly demonstrated
   in public AI-assisted game-development work?
2. Which candidate pipelines have enough evidence to distinguish an practiced process from a
   generated checklist, promotional claim, or one-off demo?
3. What stages, artifacts, gates, feedback loops, roles, and failure paths does each source
   pipeline actually specify?
4. Which portable agent skills could support each pipeline without coupling it to one engine,
   framework, platform, or game?
5. Which source collections, practitioners, studios, talks, papers, postmortems, and communities
   beyond `targets.md` should future discovery passes monitor?
6. How can a pipeline document remain faithful to its authors while still being understandable in
   five minutes or less?
7. Which pipelines form a credible initial library, and which candidates must remain leads because
   their provenance or validation is weak?

## Why each matters

1. Defines the subjects of the library. Without a source-observed pipeline, there is nothing
   responsible to document.
2. Establishes the admission bar and prevents popularity, polish, or agent confidence from being
   mistaken for evidence.
3. Supplies the content of the Mermaid diagram and pipeline details without inventing steps the
   source author did not use.
4. Connects process discovery to the skill library while allowing a pipeline to name skills that
   do not exist yet.
5. Makes discovery iterative rather than a one-time scan of three repositories.
6. Determines the common `pipeline.md` contract and the boundary between concise summary,
   source-specific variation, and our inference.
7. Bounds the first pass while preserving uncertain discoveries for later validation.

## Lines of inquiry

### 1. Existing Antiky research synthesis

Scope: Read `docs/objectives/skill-research/` as a prior evidence corpus. Extract candidate
end-to-end and discipline-level pipelines, their stages, artifacts, gates, possible supporting
skills, and the external sources already cited. Identify recurring patterns across the engine,
art/content, game-design/UX, production/QA, rendering, and orchestration reports. Do not treat an
Antiky recommendation as evidence that the public uses that pipeline.

Sources:

- `docs/objectives/skill-research/*.md`
- The linked primary sources only when needed to classify what a local report attributes to them

Return:

- Findings mapped to research questions
- A candidate-pipeline table with source paths/links and evidence labels
- A reusable pattern taxonomy
- Explicit gaps, contradictions, and claims that still need external verification

### 2. Named targets and their source graph

Scope: Deeply inspect every repository in `docs/objectives/skill-process/targets.md`, including
workflow files, skills, examples, commit/release/contributor history, authorship, licenses, linked
projects, citations, and public demonstrations. Follow relevant outbound links to original authors
or upstream sources. Recover the pipelines the authors actually prescribe; do not rewrite them into
our preferred process.

Sources:

- `thrixel/goal-to-game`
- `gamedev-skills/awesome-gamedev-agent-skills`
- `scottstts/Threejs-Awesome-Graphics-Agent-Skills`
- Primary sources and author/community provenance linked directly from those projects

Return:

- Findings mapped to research questions
- One evidence card per candidate pipeline: author-stated flow, artifacts, gates, supporting
  skills, source URLs, dated repository signals, provenance, and limitations
- Additional discovery targets reached through the source graph
- Explicit gaps and unverifiable claims

### 3. Independent web discovery beyond the seeds

Scope: Search independently for public, reusable AI-assisted game-development processes outside the
named targets. Prioritize source repositories with meaningful history and contributors; first-party
studio or practitioner writing; talks and postmortems with identifiable game-development authors;
and research with inspectable methods or artifacts. Search across ideation-to-playable-slice,
implementation loops, art/content, level design, playtesting, QA/release, and multi-agent
orchestration. Prefer pipelines over tool inventories and generic prompt collections.

Sources:

- GitHub source, commit, release, issue, and contributor history
- Author or studio sites, talks, public postmortems, and published game-development material
- Primary research papers, project pages, datasets, and evaluation artifacts
- Community references only as discovery leads to the above

Return:

- Findings mapped to research questions
- A ranked candidate-pipeline table using the evidence rubric below
- Evidence cards for the strongest candidates
- A target list for later recurring discovery passes
- Explicit gaps and unverifiable claims

Every line of inquiry must label an unverifiable claim rather than omit it or present it as fact.

## Shared evidence rubric

Record each signal separately; do not collapse it into an unsupported quality score.

- **Pipeline evidence:** The source states ordered stages, artifacts, gates, or feedback loops.
- **Use evidence:** Commit history, releases, shipped examples, repeated runs, public work logs, or
  independent references show more than a one-off description.
- **Provenance:** The authors are identifiable, and their game-development connection or claimed
  experience can be traced to a primary source.
- **Independent validation:** Evidence comes from outside the project or author. A repository's own
  tests, demo, stars, and claims are not independent validation.
- **Maturity signals:** Date-stamped age, substantive commit history, contributors, releases,
  issues, forks, stars, citations, and references. These are discovery signals, not proof.
- **Portability:** The underlying process can be stated without depending on one framework,
  platform, engine, or game. Preserve source-specific variants rather than erasing them.
- **Auditability:** A future reader can follow direct URLs and distinguish what the source says,
  what researchers observed, and what we inferred.

## Out of scope

- Selecting or standardizing on one engine, framework, platform, or game
- Installing or running external skills, plugins, MCP servers, engines, or dependencies
- Writing the final pipeline library, implementation plan, or goals during research
- Treating tool catalogs, skill inventories, role lists, or prompt collections as pipelines unless
  they define an observable flow
- Declaring a pipeline effective from stars, installs, contributors, or author reputation alone
- Inventing missing stages to make a source pipeline look complete
- Evaluating whether a generated game is fun or production-ready without independent evidence

## Known constraints

- `objective.md` requires one concise Mermaid-first document per discovered pipeline, readable in
  five minutes or less, followed by pipeline details and an outline plus details of supporting
  skills.
- The work must capture general game-development pipelines and potential supporting skills, even
  when those skills do not yet exist.
- Research must resist agent agenda, shallow synthesis, and attachment to weak sources. Author
  intent and the evidence labels above take precedence over a neat taxonomy.
- `targets.md` is a starting list, not an exhaustive boundary.
- `docs/GOOD_ENGINEERING_H.md` favors simple, readable, incremental, evidence-driven work and warns
  against novelty, premature abstraction, and unverifiable confidence.
- `AGENTS.md` requires portable skills that do not depend on one Antiky repository. This research
  may inform later skills but must not assume Antiky-only paths or APIs.
- No applicable ADR or AIP was found in this repository.
