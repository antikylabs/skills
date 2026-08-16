# Evidence and admission standard

## What is established

Public material supports a ladder of different claims. They must not be collapsed into one word
such as "proven."

1. **Documented:** A primary source states an ordered flow, artifacts, gates, or feedback loops.
2. **Practiced by the author:** Public projects, histories, examples, or work logs show the author
   applying the process.
3. **Observed in a study:** A paper reports participants, trials, instruments, artifacts, or
   measured outcomes.
4. **Used in production:** A named team reports using the process on a named production or with a
   production QA group.
5. **Independently validated:** Evidence outside the author or project reproduces or evaluates the
   pipeline itself.

The research established examples at the first four levels. It found no independently validated,
engine-neutral, end-to-end AI game-development pipeline with a long public history.

The strongest production-use evidence is EA's staged learned-agent QA work involving
*Battlefield 2042*, *Dead Space* (2023), and Quality Verification testers. The strongest
study-observed examples are DreamGarden, WorldSmith, Fly, Fail, Fix, and The Ink Splotch Effect.
Scott Sun's public Three.js projects and source ledger provide the strongest author-practice and
provenance trail among the three seed repositories.

Primary sources:

- [EA learned-agent QA report](https://arxiv.org/abs/2307.11105)
- [DreamGarden](https://arxiv.org/abs/2410.01791)
- [WorldSmith](https://arxiv.org/abs/2308.13355)
- [Fly, Fail, Fix](https://arxiv.org/abs/2507.12666)
- [The Ink Splotch Effect](https://arxiv.org/abs/2403.02454)
- [Scott Sun's source-material ledger](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/tree/main/source_materials)

## What is claimed

Several repositories define explicit pipelines and publish their own demos, but do not show
independent or repeated outside use:

- Thrixel documents an asset-to-engine loop and a detailed deterministic Three.js build loop. Its
  reference FPS, critic rounds, and performance measurements are not linked to an identifiable
  source project.
- Everything Game Dev Code documents placeholder replacement, provenance, discipline review, and
  a much broader concept-to-live-ops lifecycle. Its examples are maintainer-produced.
- Phaser 4 Game Dev specifies acceptance criteria through real-game runtime checks. No outside
  project using the complete loop was found.
- OpenGame specifies template selection, sandbox execution, and verified-failure repair, but its
  benchmark tooling was still described as forthcoming in the inspected repository.
- The workflows in `awesome-gamedev-agent-skills` are concise, pipeline-shaped checklists. The
  repository's structural tests prove packaging and routing, not game outcomes or repeated use.

These are useful leads. Their stated stages can be captured faithfully, but their effectiveness
must remain claimed or unverified.

## What is inferred

The following are research syntheses, not pipelines any one public author was shown to use:

- the complete target → bounded change → deterministic execution → multimodal evidence →
  independent review → defect routing loop;
- Antiky's three-to-five-role production cell;
- a universal idea-to-release, art-to-engine, or multi-agent studio pipeline;
- portable supporting-skill boundaries derived by combining several sources.

An inferred composition may become a useful Antiky pipeline later. It must not be introduced as a
pattern discovered in the wild.

## Admission rule

A candidate is eligible for a source-faithful pipeline draft when all of these are present:

- a primary source with an observable order;
- named inputs, artifacts, gates, feedback, or stop conditions;
- traceable authorship and a dated evidence snapshot;
- a clear boundary between source-specific facts and our portable inference;
- enough public material for a reader to audit the diagram.

Admission means the process is worth documenting. It does not mean it is effective or recommended.
Each document still needs an evidence status and limitations.

Use and maturity signals remain separate:

- age, substantive commits, contributors, releases, issues, forks, stars, citations, and external
  references help prioritize inspection;
- the project's own tests and demos show inspectability, not independent validation;
- author reputation establishes provenance, not effectiveness;
- a successful build, screenshot, or generated artifact proves only that narrow observation.

## Contradictions that must stay visible

- **Automated playtest versus human playtest:** Automated runtime QA can prove boot, input, state,
  and visible behavior. It cannot prove enjoyment, comprehension, fairness, or intent to return.
- **Parallel agents versus shared state:** Public sources celebrate parallelism, while editor and
  binary-asset evidence repeatedly favors isolated preparation and serialized mutation.
- **Portability versus fidelity:** Removing engine detail can erase the reload, serialization,
  import, game-thread, or capture constraints that make a source process real.
- **Popularity versus maturity:** Several 2026 repositories accumulated substantial attention
  with very short histories.
- **Visual polish versus game quality:** A screenshot or effect pass can improve presentation while
  leaving mechanics weak.
- **Thrixel image input:** The inspected skill both discourages passing images and describes image
  input paths. A future pipeline must preserve this as an unresolved source contradiction.
- **Ghostwriter production use:** Ubisoft described an operational draft/select/edit/learn flow,
  while contemporaneous reporting said it was not yet part of a title's production flow.
- **Earlier Antiky use of "verified":** The prior corpus often means source-inspected, not executed.

## Gaps

- No source combines strong pipeline detail, long public history, repeated outside use, and
  independent outcome evidence.
- Human playtesting, accessibility, localization/LQA, technical audio, certification, and live
  operations have weak AI-pipeline evidence.
- Most public workflow repositories validate structure or syntax rather than behavior.
- Most sources do not preserve provenance, rights, privacy, build identity, rollback, and human
  approval in the same flow.
- Cross-engine portability is usually our inference, not something demonstrated by the source.

