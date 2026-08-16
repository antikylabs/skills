# Candidate pipelines

This report answers which pipelines are credible enough to document first. "Draft" means a
source-faithful pipeline page is supportable. It does not mean the process is endorsed or proven.

## Strong first-draft candidates

| Pipeline | Source and evidence | Why it qualifies | Boundary to preserve |
| --- | --- | --- | --- |
| Staged learned-agent QA integration | [EA technical report](https://arxiv.org/abs/2307.11105); named AAA games and QV handoff | Ordered prototype → test range → production → hybrid bot flow with production evidence | Learned control is one component inside an existing QA system, not autonomous QA |
| Hierarchical prompt-to-playable-slice prototyping | [DreamGarden](https://arxiv.org/abs/2410.01791); ten-person instrumented study | Editable plan tree, specialist tasks, compile/runtime/visual repair, human overrides | Early Unreal prototype, not maintainable production game |
| Coarse-to-fine generative world visualization | [WorldSmith](https://arxiv.org/abs/2308.13355); formative and 13-person studies | Observable generate → select → local edit → compose → blend loop | Concept/world visualization, not engine-ready level or production art |
| Behavior-trace-driven game tuning | [Fly, Fail, Fix](https://arxiv.org/abs/2507.12666); repeated controlled trials | Goal/config → play episodes → telemetry/video → bounded revision → replay | Demonstrated on Flappy Bird parameters with a fixed RL player |
| AI as divergent design input | [The Ink Splotch Effect](https://arxiv.org/abs/2403.02454); nine prototypes and 45 responses | Shows where AI suggestions and code attempts help or fail | Human selection pipeline is an inference from results, not the experiment run verbatim |
| Three.js visual-system authoring and validation | [Skill source](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/main/skills/threejs-visual-validation/SKILL.md), [source ledger](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/tree/main/source_materials), [portfolio](https://scottsun.io/) | Deterministic inputs, no-post baselines, diagnostics, distance/seed/extreme/motion checks, budgets, public practice trail | Three.js-derived discipline pipeline; agent-skill effectiveness is not independently evaluated |
| Three.js final-image pipeline | [Image-pipeline source](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/main/skills/threejs-image-pipeline/SKILL.md) | Exact signal order, diagnostics, no-post comparison, and renderer-grounded failure rules | Technical rendering pipeline, not a full AI game-building workflow |
| Thrixel asset-to-engine loop | [Goal-to-game skill](https://github.com/thrixel/goal-to-game/blob/main/skills/goal-to-game/SKILL.md), [product demonstration](https://thrixel.com/goal-to-game) | Asset manifest, moving-parts branch, in-context hero revision, hierarchy inspection, engine validation | Proprietary services and self-validation; unresolved image-input contradiction |

## Useful documented leads

These are pipeline-shaped enough to retain, but their actual-use or source evidence is too weak for
the strongest initial tier.

| Lead | Useful spine | Missing evidence |
| --- | --- | --- |
| Automated browser-game runtime QA | Boot → inputs → transitions → state/HUD/responsive inspection → captures → severity report | Independent use and outcome evidence; call it runtime QA, not human playtesting |
| Level blockout and teach-test | Metrics → blockout → critical path/pacing → teach → later test → traversal/soft-lock check | Repeated projects, play records, or external corroboration |
| Art direction and visual-target approval | Direction inputs → camera/composition/shape/color/light/material/HUD/motion/audio → targets → approval | Source is new and coupled to a larger repository; no production validation |
| Placeholder-to-generated-asset upgrade | Stable placeholder paths → generated replacements → import → discipline review → provenance | Only maintainer-produced examples were found |
| Fast gameplay prototyping | One question → timebox → greybox → instrument → uncoached test → keep/kill/revise | Linked prototypes and decision records |
| Game-jam delivery | Rules → concept/scope → vertical loop → playtest/cut → freeze → clean export → early submission | A real jam repository, timestamps, build, and postmortem applying the skill |
| General game-asset production | Inspect game → lock frame/style → manifest → approve hero → batch → normalize → import → in-game/provenance review | External sources and a real asset set using the complete process |
| Acceptance-criteria-to-runtime verification | GDD criteria → scaffold → implement → launch → input/state checks → fix → build | Outside Phaser projects and sustained CI history |
| Template-scaffold-and-debug generation | Request → template → multi-file generation → sandbox → verified-failure repair → playable evaluation | Auditable benchmark artifacts, longer history, and independent reproduction |
| Human-ranked narrative drafts | Context → draft pairs → writer select/edit → preference update | Named shipped-title use and a resolved account of production adoption |
| Natural-language BDD with learned playtesting | Behavior/expected outcome → RL scenario → train/run → verdict | Inspectable implementation and scenario-to-reward transformation |
| AutoUE structured multi-agent generation | Decompose scene/art and gameplay → retrieve docs → structured specs → integrate → automated playtest | Broader task set, replication, and reduced dependence on LLM judges |

## House syntheses, not discoveries

The earlier `skill-research` corpus contains thoughtful end-to-end Antiky content, rendering,
vertical-slice, orchestration, and release flows. They are **inferred Antiky recommendations**.
They can be comparison baselines, but they cannot enter a "pipelines in the wild" library without a
different label or corroborating public authors.

## Recurring pipeline families

The candidates cluster into useful scopes:

- **Research and design:** divergent ideation, prototype-question testing, human playtest planning.
- **Playable-slice implementation:** hierarchical decomposition, bounded implementation, compile and
  runtime repair.
- **Art and content:** coarse-to-fine visualization, art-direction approval, stable-placeholder
  replacement, asset-to-engine validation.
- **Runtime verification:** automated input/state/visual QA, deterministic capture, performance
  evidence.
- **Tuning:** behavior trace → analysis → constrained configuration revision → replay.
- **Technical graphics:** visual-system validation and ordered final-image composition.
- **Delivery:** jam freeze/export/submission and QA-to-release flows, currently with weaker
  AI-specific evidence.

No source justifies merging these into one universal pipeline. A later plan should preserve them as
composable, differently evidenced processes.

