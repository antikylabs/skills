# Scott Three.js harvest

## Result

The refreshed target supports both declared pages:

- [Three.js visual-system validation](../pipeline-threejs-visual-system-validation.md)
- [Three.js final-image pipeline](../pipeline-threejs-final-image.md)

Both pass the six-part admission gate. They are narrow agent workflows in the source itself, not
engine-neutral game-development processes. Admission records auditable structure; it does not prove
effectiveness, recommend adoption, or establish portability.

## Frozen source

| Field | Frozen value |
| --- | --- |
| Canonical repository | [`scottstts/Threejs-Awesome-Graphics-Agent-Skills`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills) |
| Revision | [`98453747cc0678f6a5d910f38d7483596a5f9a40`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/tree/98453747cc0678f6a5d910f38d7483596a5f9a40) |
| Version | `v0.8.0`; package version `0.8.0` |
| Revision author/date | `scott`; 2026-08-15T22:18:42+01:00 |
| Retrieval date | 2026-08-16 |
| Repository history inspected | 70 commits from 2026-06-19 through 2026-08-15; all recorded under `scott` |
| Root license | [MIT, Copyright 2026 Scott Sun](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/LICENSE) |

The source was inspected as text from a partial clone. No target skill, example, dependency, or
runtime was installed or executed.

## Inspected artifacts

| Artifact | Why it matters |
| --- | --- |
| [Root README](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/README.md) | Pack scope, deterministic inputs, diagnostics, quality tiers, and no-post baseline |
| [Skill router](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-skill-router/SKILL.md) | Complete routing surface, scene construction order, routing constraints, and acceptance gate |
| [Image-pipeline skill](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-image-pipeline/SKILL.md) | Candidate trigger, supporting skills, signal order, rules, and boundary |
| [Production image-pipeline contracts](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-image-pipeline/references/production-image-pipeline.md) | Four source graphs, buffer ownership, resolution, failures, diagnostics, and acceptance |
| [Visual-validation skill](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-visual-validation/SKILL.md) | Candidate trigger, ordered sequence, evidence, failure conditions, and boundary |
| [Graphics validation protocol](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-visual-validation/references/graphics-validation-protocol.md) | Contract, gates, mechanism evidence, temporal checks, budgets, rejection, and sign-off |
| [Source-material ledger](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/source_materials/README.md) | Reviewed revisions, author-supplied projects, distilled mechanisms, limitations, and outbound sources |
| [Trace manifest](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/source_materials/trace-manifest.json) | Machine-readable repository revisions and author-declared license fields |
| [Example traces](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/source_materials/example-traces.json) | Example-to-source mappings; no standalone example is assigned to either coordinator skill |
| [Skill coverage](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/source_materials/skill-coverage.json) | Image-pipeline evidence is reference-sufficient; validation evidence points to gallery tooling |
| [Routing fixtures](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/source_materials/agent-routing-cases.json) | Concrete shared-buffer request routes to image coordination plus atomic effects |
| [Gallery README](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/dev/example-gallery/README.md) | Deterministic gallery controls, capture contract, provenance, metrics, and errors |
| [Capture script](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/scripts/capture-examples.mjs) | Frozen implementation of paused, fixed-DPR, debug-mode capture and runtime-error collection |
| [Pack development process](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/.codex/AGENTS.md#L13-L68) | Author's distillation workflow, visual-comparison gate, audit order, and license assumptions |
| [Third-party notices](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/source_materials/THIRD_PARTY_NOTICES.md) | Mixed upstream terms and project-rule license assertions |

The image skill and reference first appear in commit
[`e9ed2e0`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/commit/e9ed2e0030c15a3b9e3fe303d614c89e157d2089)
on 2026-06-21 and were last changed together in
[`f09ddd6`](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/commit/f09ddd6d1d9d6415e4f3a5b0f58571ce34948bf4)
on 2026-07-12. The validation skill and protocol first appear at `e9ed2e0`; their last path change in
the frozen history is also that commit. Commit history establishes traceability, not effectiveness.

## Admission decisions

| Gate | Visual-system validation | Final-image pipeline |
| --- | --- | --- |
| Observable order | Pass: eight-step validation sequence | Pass: explicit signal order plus four concrete graph variants |
| Artifacts, gates, feedback, branches, or stops | Pass: evidence set, four-layer gate, rejection and repeat conditions | Pass: signal table, diagnostics, pass-acceptance gate, failure analysis |
| Traceable author and date | Pass: frozen revision, license author, and path history | Pass: frozen revision, license author, and path history |
| Concise diagram without invented stages | Pass: nine main nodes | Pass: nine main nodes; one inferred feedback connector is labeled |
| Facts, contradictions, and inference remain distinct | Pass | Pass |
| Direct audit links | Pass | Pass |

### Evidence signals

Both pages are **Source-documented**. Both are also **Author-practiced**: the public source maps
author-supplied projects to these skills, maintains a gallery/capture system for validation, and
records author-owned pass graphs in its ledger. This remains self-reported practice. Neither page
has Study-observed, Production-used, or Independently validated evidence.

## Candidate disposition

Only the two declared candidates could be published in this goal. Full routing inspection exposed
the following additional candidates; all remain research leads until a later goal refreshes their
primary artifacts and applies the admission gate.

| Candidate | Disposition | Reason |
| --- | --- | --- |
| Visual-system validation | Admitted | Ordered validation loop, artifacts, gate, rejection, repeat condition, and provenance are explicit |
| Final-image pipeline | Admitted | Signal order, ownership artifact, diagnostics, acceptance gate, failures, and provenance are explicit |
| New procedural-scene orchestration | Deferred | The router provides a nine-step construction/validation order, but it was outside the two-page publication scope |
| Skill-pack source distillation | Deferred | The maintainer instructions expose a ten-step clone→assess→approve→implement→compare→audit→publish-readiness process, but it is a skill-authoring workflow outside this batch |
| Deterministic gallery capture | Deferred | The gallery and capture script expose a reproducible capture/error loop, but it supports validation and was not separately admission-tested |

The routing surface also exposes possible atomic technical workflows. They were inspected for route
placement and then deferred without an admission claim:

| Deferred module | Routed subject |
| --- | --- |
| `threejs-camera-direction` | Camera contracts and handoffs |
| `threejs-procedural-animation` | Authored motion phases and convergence |
| `threejs-procedural-fields` | Shared procedural fields |
| `threejs-procedural-materials` | Procedural and optical materials |
| `threejs-parallax-occlusion-mapping` | Relief and self-shadowing |
| `threejs-procedural-geometry` | Complete procedural object construction |
| `threejs-procedural-vegetation` | Growth, placement, and wind |
| `threejs-procedural-architecture` | Building grammars |
| `threejs-procedural-planets` | Terrain, biome, and planet fields |
| `threejs-atmosphere-aerial-perspective` | Sky and aerial perspective |
| `threejs-volumetric-clouds` | Weather-driven clouds |
| `threejs-spectral-ocean` | Spectral ocean systems |
| `threejs-water-optics` | Analytic water and pool optics |
| `threejs-precipitation-surfaces` | Snow, puddles, and rain |
| `threejs-raymarched-space-effects` | Curved-ray space effects |
| `threejs-procedural-vfx` | Volumetric and event effects |
| `threejs-temporal-surfaces` | History-driven surface effects |
| `threejs-shadow-systems` | Stable large-world shadows |
| `threejs-screen-space-ambient-occlusion` | GTAO and bent normals |
| `threejs-bloom` | HDR bloom |
| `threejs-exposure-color-grading` | Exposure, tone mapping, and grading |

The source-material ledger, consumption map, routing table, and feature inventories are **rejected
as pipeline pages**: they fail admission Gate 1 because they classify sources or capabilities but
do not provide an observable operative order. Examples, stars, commit count, and confident prose
were not treated as effectiveness evidence.

## Visual-system validation diagram mapping

### Nodes

| Node | Source mapping |
| --- | --- |
| A — freeze contract and inputs | [Visual contract, lines 36–74](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-visual-validation/references/graphics-validation-protocol.md#L36-L74); [determinism, lines 281–306](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-visual-validation/references/graphics-validation-protocol.md#L281-L306) |
| B — final and no-post baseline | [Sequence and evidence, lines 12–33](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-visual-validation/SKILL.md#L12-L33); [isolation gates, lines 259–279](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-visual-validation/references/graphics-validation-protocol.md#L259-L279) |
| C — mechanism diagnostics | [Required controls, lines 76–104](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-visual-validation/references/graphics-validation-protocol.md#L76-L104) |
| D — cameras, seeds, extremes | [Sequence, lines 15–16](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-visual-validation/SKILL.md#L15-L16); [captures, lines 296–313](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-visual-validation/references/graphics-validation-protocol.md#L296-L313) |
| E — temporal tests | [Temporal validation, lines 315–339](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-visual-validation/references/graphics-validation-protocol.md#L315-L339) |
| F — budgets | [Performance and resolution, lines 341–370](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-visual-validation/references/graphics-validation-protocol.md#L341-L370) |
| G — four-layer gate | [Acceptance principle, lines 20–34](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-visual-validation/references/graphics-validation-protocol.md#L20-L34) |
| H — sign-off and regression set | [Sequence step 8](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-visual-validation/SKILL.md#L19); [sign-off, lines 386–406](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-visual-validation/references/graphics-validation-protocol.md#L386-L406) |
| I — withhold or delete | [Rejection criteria, lines 372–384](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-visual-validation/references/graphics-validation-protocol.md#L372-L384) |

### Edges

The `A→B→C→D→E→F` order maps directly to the [eight-step validation
sequence](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-visual-validation/SKILL.md#L10-L19).
`F→G` maps the collected evidence into the four-layer acceptance principle. `G→H` is the source's
accept/publish path; `G→I` is its explicit rejection path. `I→A` maps to the instruction to repeat
the same evidence whenever the mechanism or inspection environment changes. No diagram connector
is editorial inference.

## Final-image diagram mapping

### Nodes

| Node | Source mapping |
| --- | --- |
| A — name signal ownership | [Buffer and ownership rules, lines 121–136](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-image-pipeline/references/production-image-pipeline.md#L121-L136) |
| B — scene HDR and geometry buffers | [Signal order, lines 20–22](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-image-pipeline/SKILL.md#L20-L22) |
| C — lighting-related effects | [Signal order, line 22](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-image-pipeline/SKILL.md#L22) |
| D — atmosphere and transparency | [Signal order, line 23](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-image-pipeline/SKILL.md#L23) |
| E — HDR bloom | [Signal order and rule, lines 24 and 38–39](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-image-pipeline/SKILL.md#L24-L39) |
| F — exposure | [Signal order and metering rule, lines 25 and 40](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-image-pipeline/SKILL.md#L25-L40) |
| G — tone map through output | [Signal order, lines 26–29](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-image-pipeline/SKILL.md#L26-L29) |
| H — acceptance gate | [Diagnostics and acceptance, lines 179–198](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-image-pipeline/references/production-image-pipeline.md#L179-L198) |
| I — accepted pass graph | [Ownership artifact, lines 123–136](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-image-pipeline/references/production-image-pipeline.md#L123-L136); [diagnostic artifact and acceptance, lines 181–198](https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills/blob/98453747cc0678f6a5d910f38d7483596a5f9a40/skills/threejs-image-pipeline/references/production-image-pipeline.md#L181-L198) |

### Edges

`A→B` maps the required pre-implementation ownership table into its first producer. `B→C→D→E→F→G`
is the source's literal signal order. `G→H→I` maps diagnostics into the stated acceptance condition.
The failure connector `H→A` is **editorial inference**: the source requires pass toggles before
tuning, lists ownership/order failures, and withholds acceptance until every pass has a named
contract, but it does not state a literal retry arrow. The published diagram and prose label this
connector as inference.

## Supporting skills

| Page | Observed in the source | Potential, inferred by this research |
| --- | --- | --- |
| Visual-system validation | Subject or image-effect skill first; visual-validation skill; gallery runtime; deterministic capture tooling | Visual-contract authoring; diagnostic capture; temporal replay; GPU-budget reporting; regression-evidence management |
| Final-image pipeline | Screen-space ambient occlusion; bloom; exposure/color grading; official Three.js docs for installed APIs | Render-signal inventory; pass-graph inspection; render-target budgeting; color-pipeline audit; runtime-path verification |

Potential skills may not exist. They are decomposition notes, not source claims.

## Contradictions, licensing, and reuse

- The root repository text is MIT. The source ledger contains MIT, GPL-3.0, Zlib, CC0, CC BY, and
  local asset notices.
- Several ledger rows say `MIT by project rule`, including projects where no license was observed.
  That is the source author's handling rule, not independent permission. Readers must verify the
  upstream license before copying implementations or assets.
- The maintainer instructions assert that supplied reference projects create no licensing concern
  and separately instruct the project to treat unlicensed references as MIT. Those claims do not
  override upstream rights.
- The published pages paraphrase the source's workflow text. They do not copy target code or assets
  and do not authorize running the target's examples.
- The source observed Three.js `0.184.0` during research and warns that image-pipeline APIs are
  version-sensitive. A frozen workflow is not an API compatibility promise.
- Image-pipeline graph variants do not establish one active runtime path; the source explicitly
  requires checking the render loop. They also lack a general velocity/motion-vector contract.
- Visual inspection and author comparisons are source-reported acceptance evidence. They are not an
  independent evaluation of skill effectiveness.

## Direct outbound targets

The following direct source links were newly added to the concise target queue. They were not
harvested in this goal:

- `https://codeberg.org/perplexdotgg/mecs-tower-defense-example`
- `https://codepen.io/sabosugi/pen/RNKpmQj`
- `https://github.com/Faraz-Portfolio/demo-2023-rain-puddle`
- `https://github.com/N8python/diamonds`
- `https://github.com/SkyeShark/threejs-silhouette-pom`
- `https://github.com/YasirAwan4831/holographic-shader-visualizer-three.Js`
- `https://github.com/achrefelouafi/GrassSystemThreeJS`
- `https://github.com/achrefelouafi/OceanThreejs`
- `https://github.com/achrefelouafi/SnowSystemThreeJS`
- `https://github.com/achrefelouafi/VegetationGeneratorThreeJS`
- `https://github.com/bandinopla/threejs-easyfire`
- `https://github.com/dedekpo/stylized-scene`
- `https://github.com/dgreenheck/ez-tree`
- `https://github.com/gioeledallapozza/FFTOCEAN`
- `https://github.com/jeantimex/geospatial`
- `https://github.com/jeantimex/threejs-water`
- `https://github.com/momentchan/r3f-gist`
- `https://github.com/momentchan/r3f-procedural-grass`
- `https://github.com/owenyuwono/poseidon`
- `https://github.com/playdeadgames/temporal`
- `https://github.com/rocksdanister/rain`
- `https://github.com/scottstts/Elysium-Mars-Park`
- `https://github.com/scottstts/Friends-Apartment`
- `https://github.com/scottstts/Interstellar.three.js`
- `https://github.com/scottstts/MyCraft`
- `https://github.com/scottstts/Pearl-Sea-Park`
- `https://github.com/scottstts/Stellar`
- `https://github.com/scottstts/mysite_React`
- `https://github.com/siliconjungle/inkwell-webgpu-flowers`
- `https://github.com/takram-design-engineering/three-geospatial`
- `https://github.com/takuma-hmng8/frozen`
- `https://github.com/vibe-stack/procedural-bank`

## Verification record

### Commands

| Check | Command | Result |
| --- | --- | --- |
| Tool versions | `npm view @mermaid-js/mermaid-cli version` and `npm view markdown-link-check version` | Passed: current published versions were `11.16.0` and `3.15.0`; those exact versions were pinned in the library README |
| Mermaid render | `for file in docs/pipelines/pipeline-*.md; do npx --yes @mermaid-js/mermaid-cli@11.16.0 -i "$file" -o "/tmp/$(basename "$file")"; done` | Passed: one chart found and rendered from each accepted page; no parser errors |
| Library links | `for file in docs/pipelines/*.md; do npx --yes markdown-link-check@3.15.0 "$file"; done` | Passed: 14 links checked, 0 failures; the template intentionally contains no links |
| Outcome links | `npx --yes markdown-link-check@3.15.0 docs/objectives/skill-process/research/05-scott-threejs-harvest.md` | Passed: 46 links checked, 0 failures |
| Whitespace | `git diff --check` | Passed with no output |
| Target duplicates | `awk '/^- https?:\\/\\// {print $2}' docs/objectives/skill-process/targets.md \| sort \| uniq -d` | Passed with no duplicate URLs |
| Prose proxy | `node /Users/josephduncan/github/AntikyLabs/.agents/skills/anti-slop/scripts/prose_lint.mjs <new-docs>` | Passed after one false-positive-shaped negative claim was rewritten for clarity: 0 findings |

The prose checker covers unsupported-quality-claim and time-estimate patterns only. A separate
judgement review found no unlabeled portability/effectiveness claim, placeholder evidence, hidden
editorial connector, or check that could only pass. That review does not establish whether the
upstream author's claims are true; the page boundaries preserve that limitation.

### Diagram audit

| Page | Top-level path | Main nodes | Parser | Source mapping |
| --- | --- | --- | --- | --- |
| Visual-system validation | One ordered path with accept/reject outcomes and a repeat edge | 9 | Pass | Pass: every node and edge mapped; no inferred connector |
| Final-image pipeline | One ordered signal path with an acceptance output and feedback edge | 9 | Pass | Pass: every node and edge mapped; the sole inferred connector is labeled in the diagram, page prose, and outcome |

### Cold-reader audit

| Page | Trigger | Ordered loop | Feedback gate | Outputs | Evidence level |
| --- | --- | --- | --- | --- | --- |
| Visual-system validation | Pass | Pass | Pass | Pass | Pass |
| Final-image pipeline | Pass | Pass | Pass | Pass | Pass |
