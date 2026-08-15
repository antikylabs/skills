# Public skill-registry inventory

Research snapshot: 2026-08-09

This report records the direct output of the public `skills` registry searches used for this
objective. It is an inventory, not an endorsement. Install counts are volatile popularity signals;
they do not prove correctness, safety, editor compatibility, authorship quality, or an ability to
produce a good game.

**Antiky scope:** this inventory is mined for workflow patterns, missing disciplines, packaging
ideas, and evaluation methods for Antiky Framework and BroMetal. It is not a plan to build or
install Unity, Unreal, or Godot skills.

No skill was installed during this research.

## Method

The discovery workflow was:

1. review the [skills.sh leaderboard](https://skills.sh/);
2. query the registry with `npx --yes skills find "<query>"`;
3. record the returned package, skill, install count, and registry URL;
4. inspect promising source repositories and official engine documentation separately;
5. distinguish knowledge-only `SKILL.md` packages from tools that can operate a live editor;
6. treat sparse, irrelevant, duplicated, or low-adoption results as a gap rather than filling the
   category with a weak recommendation.

The command form shown by the registry is:

```sh
npx skills add <owner/repository@skill>
```

Use `--list` or inspect the source before any installation. For this project, a commit or release
pin, license review, instruction review, and an isolated evaluation are required before adoption.

## Engine searches

### Unreal Engine

Query: `unreal engine`

| Skill | Installs | Registry |
| --- | ---: | --- |
| `sickn33/antigravity-awesome-skills@unreal-engine-cpp-pro` | 1.2K | [record](https://skills.sh/sickn33/antigravity-awesome-skills/unreal-engine-cpp-pro) |
| `quodsoler/unreal-engine-skills@ue-ui-umg-slate` | 772 | [record](https://skills.sh/quodsoler/unreal-engine-skills/ue-ui-umg-slate) |
| `quodsoler/unreal-engine-skills@ue-cpp-foundations` | 761 | [record](https://skills.sh/quodsoler/unreal-engine-skills/ue-cpp-foundations) |
| `quodsoler/unreal-engine-skills@ue-editor-tools` | 737 | [record](https://skills.sh/quodsoler/unreal-engine-skills/ue-editor-tools) |
| `quodsoler/unreal-engine-skills@ue-niagara-effects` | 708 | [record](https://skills.sh/quodsoler/unreal-engine-skills/ue-niagara-effects) |
| `quodsoler/unreal-engine-skills@ue-module-build-system` | 703 | [record](https://skills.sh/quodsoler/unreal-engine-skills/ue-module-build-system) |

The `quodsoler` results are parts of a larger
[27-skill Unreal C++ collection](https://github.com/quodsoler/unreal-engine-skills). These skills
provide domain knowledge; they do not by themselves provide a live editor connection. VibeUE and
Unreal MCP are covered in the dedicated Unreal report because a tool bridge and a knowledge skill
solve different problems.

### Unity

Query: `unity game development`

| Skill | Installs | Registry |
| --- | ---: | --- |
| `rmyndharis/antigravity-skills@unity-developer` | 2.7K | [record](https://skills.sh/rmyndharis/antigravity-skills/unity-developer) |
| `cryptorabea/claude_unity_dev_plugin@unity-architecture` | 135 | [record](https://skills.sh/cryptorabea/claude_unity_dev_plugin/unity-architecture) |
| `cowork-os/cowork-os@unity-development` | 64 | [record](https://skills.sh/cowork-os/cowork-os/unity-development) |
| `creator-hian/claude-code-plugins@unity-networking` | 25 | [record](https://skills.sh/creator-hian/claude-code-plugins/unity-networking) |
| `solanabr/solana-game-skill@solana-game` | 22 | [record](https://skills.sh/solanabr/solana-game-skill/solana-game) |
| `smithery.ai@unity-developer` | 12 | [record](https://skills.sh/smithery/ai/unity-developer) |

The search does not surface the strongest editor bridges. Those must be found by source-repository
research, including [CoplayDev MCP for Unity](https://github.com/CoplayDev/unity-mcp) and
[IvanMurzak Unity-MCP](https://github.com/IvanMurzak/Unity-MCP). Registry ranking alone would miss
the execution substrate.

### Godot

Query: `godot game development`

| Skill | Installs | Registry |
| --- | ---: | --- |
| `zate/cc-godot@godot-development` | 1.3K | [record](https://skills.sh/zate/cc-godot/godot-development) |
| `gamedev-skills/awesome-gamedev-agent-skills@router` | 1K | [record](https://skills.sh/gamedev-skills/awesome-gamedev-agent-skills/router) |
| `randroids-dojo/skills@godot` | 328 | [record](https://skills.sh/randroids-dojo/skills/godot) |
| `thedivergentai/gd-agentic-skills@godot-game-loop-harvest` | 138 | [record](https://skills.sh/thedivergentai/gd-agentic-skills/godot-game-loop-harvest) |
| `omer-metin/skills-for-antigravity@godot-development` | 76 | [record](https://skills.sh/omer-metin/skills-for-antigravity/godot-development) |

One returned result was an Unreal skill and is intentionally omitted as irrelevant. As with Unity,
the registry does not replace editor-bridge research. Credible source candidates include
[alexmeckes/godot-mcp](https://github.com/alexmeckes/godot-mcp),
[IvanMurzak/Godot-MCP](https://github.com/IvanMurzak/Godot-MCP), and
[hi-godot/godot-ai](https://github.com/hi-godot/godot-ai).

## Game-creation and discipline searches

### Gameplay and game design

Query: `game design gameplay`

| Skill | Installs | Registry |
| --- | ---: | --- |
| `majidmanzarpour/threejs-game-skills@threejs-gameplay-systems` | 1.3K | [record](https://skills.sh/majidmanzarpour/threejs-game-skills/threejs-gameplay-systems) |
| `opusgamelabs/game-creator@design-game` | 828 | [record](https://skills.sh/opusgamelabs/game-creator/design-game) |
| `quodsoler/unreal-engine-skills@ue-game-features` | 622 | [record](https://skills.sh/quodsoler/unreal-engine-skills/ue-game-features) |
| `playableintelligence/game-creator@game-designer` | 231 | [record](https://skills.sh/playableintelligence/game-creator/game-designer) |
| `jarrodmedrano/jarrod-claude-skills@game-design-theory` | 39 | [record](https://skills.sh/jarrodmedrano/jarrod-claude-skills/game-design-theory) |

The strongest results mix engine implementation and design planning. Neither install count nor a
design template proves that the resulting loop is understandable, enjoyable, or worth replaying.
Our library needs explicit prototype, playtest, observation, and revision gates.

### Shaders, materials, and textures

Query: `shader materials texture game`

| Skill | Installs | Registry |
| --- | ---: | --- |
| `phaserjs/phaser@render-textures` | 372 | [record](https://skills.sh/phaserjs/phaser/render-textures) |
| `drawcall-ai/skills@materials` | 116 | [record](https://skills.sh/drawcall-ai/skills/materials) |
| `cesiumgs/cesiumjs-skills@cesiumjs-materials-shaders` | 93 | [record](https://skills.sh/cesiumgs/cesiumjs-skills/cesiumjs-materials-shaders) |
| `jame581/godotprompter@shader-basics` | 76 | [record](https://skills.sh/jame581/godotprompter/shader-basics) |
| `davincidreams/agent-team-plugins@texturing` | 21 | [record](https://skills.sh/davincidreams/agent-team-plugins/texturing) |
| `kevinpbuckley/unreal-engine-skills@materials-and-shaders` | 9 | [record](https://skills.sh/kevinpbuckley/unreal-engine-skills/materials-and-shaders) |

This is a fragmented category. Official engine shader documentation, compiler validation, GPU
capture/profiling, material authoring, texture baking, compression, color management, and visual
comparison need to be composed; no returned skill covers the complete pipeline.

### Blender and 3D modeling

Query: `blender 3d modeling`

| Skill | Installs | Registry |
| --- | ---: | --- |
| `roble3/cc-blender-skill@blender-modeling` | 353 | [record](https://skills.sh/roble3/cc-blender-skill/blender-modeling) |
| `roble3/cc-blender-skill@wireframe-to-3d` | 178 | [record](https://skills.sh/roble3/cc-blender-skill/wireframe-to-3d) |
| `alphaonedev/openclaw-graph@3d-modeling` | 139 | [record](https://skills.sh/alphaonedev/openclaw-graph/3d-modeling) |
| `arjun988/blender-skills@blender-modeler` | 40 | [record](https://skills.sh/arjun988/blender-skills/blender-modeler) |
| `kevinbadi/blender-skills@blender-product-polish` | 24 | [record](https://skills.sh/kevinbadi/blender-skills/blender-product-polish) |

Searches for `game art blender` were weaker: the highest directly game-art-labeled result had 47
installs. Modeling automation and art direction are not interchangeable. Geometry correctness,
silhouette, proportion, topology, UVs, materials, rigging, animation, LODs, collision, export, and
engine integration need separate checks.

### Audio

Query: `game audio`

| Skill | Installs | Registry |
| --- | ---: | --- |
| `majidmanzarpour/threejs-game-skills@threejs-audio-generator` | 1.1K | [record](https://skills.sh/majidmanzarpour/threejs-game-skills/threejs-audio-generator) |
| `gamedev-skills/awesome-gamedev-agent-skills@audio-design` | 1.1K | [record](https://skills.sh/gamedev-skills/awesome-gamedev-agent-skills/audio-design) |
| `gamedev-skills/awesome-gamedev-agent-skills@godot-audio` | 904 | [record](https://skills.sh/gamedev-skills/awesome-gamedev-agent-skills/godot-audio) |
| `opusgamelabs/game-creator@game-audio` | 722 | [record](https://skills.sh/opusgamelabs/game-creator/game-audio) |
| `opusgamelabs/game-creator@add-audio` | 531 | [record](https://skills.sh/opusgamelabs/game-creator/add-audio) |
| `omer-metin/skills-for-antigravity@game-audio` | 237 | [record](https://skills.sh/omer-metin/skills-for-antigravity/game-audio) |

Audio has better knowledge-skill coverage than visual art. Source licensing, loudness, looping,
spatialization, mixing, ducking, accessibility, and in-engine verification still require explicit
artifact checks.

### Animation and VFX

Query: `vfx animation game`

| Skill | Installs | Registry |
| --- | ---: | --- |
| `dylantarre/animation-principles@game-designer` | 773 | [record](https://skills.sh/dylantarre/animation-principles/game-designer) |
| `dylantarre/animation-principles@game-development` | 453 | [record](https://skills.sh/dylantarre/animation-principles/game-development) |
| `tabooharmony/roblox-brain@roblox-animation-vfx` | 373 | [record](https://skills.sh/tabooharmony/roblox-brain/roblox-animation-vfx) |
| `pika-labs/pika-plugins@vfx` | 332 | [record](https://skills.sh/pika-labs/pika-plugins/vfx) |
| `omer-metin/skills-for-antigravity@vfx-realtime` | 123 | [record](https://skills.sh/omer-metin/skills-for-antigravity/vfx-realtime) |
| `mengto/skills@create-game-vfx` | 121 | [record](https://skills.sh/mengto/skills/create-game-vfx) |

General animation principles are useful knowledge, but engine state machines, retargeting, root
motion, event timing, particles, budgets, and gameplay readability need engine-specific execution
skills and visual review.

### Production and orchestration

Query: `game producer`

| Skill | Installs | Registry |
| --- | ---: | --- |
| `akillness/oh-my-skills@bmad-gds` | 245 | [record](https://skills.sh/akillness/oh-my-skills/bmad-gds) |
| `pawbytes/skill-suites@paw-wbc-agent-producer` | 87 | [record](https://skills.sh/pawbytes/skill-suites/paw-wbc-agent-producer) |
| `akillness/jeo-skills@bmad-gds` | 75 | [record](https://skills.sh/akillness/jeo-skills/bmad-gds) |
| `lvtd-llc/skills@game-mechanics-design` | 53 | [record](https://skills.sh/lvtd-llc/skills/game-mechanics-design) |
| `alterlab-ieu/alterlab_gameforge@game-producer` | 51 | [record](https://skills.sh/alterlab-ieu/alterlab_gameforge/game-producer) |
| `alterlab-ieu/alterlab_gameforge@game-team-orchestrator` | 50 | [record](https://skills.sh/alterlab-ieu/alterlab_gameforge/game-team-orchestrator) |

Producer-labeled skills are low adoption and must be treated as patterns to study, not production
authorities. A useful producer skill must constrain scope, define a vertical slice, preserve
decisions, surface risk, maintain dependencies, and refuse to advance a milestone without evidence.

### QA and release

Query: `game testing qa`

| Skill | Installs | Registry |
| --- | ---: | --- |
| `majidmanzarpour/threejs-game-skills@threejs-qa-release` | 1.2K | [record](https://skills.sh/majidmanzarpour/threejs-game-skills/threejs-qa-release) |
| `opusgamelabs/game-creator@game-qa` | 537 | [record](https://skills.sh/opusgamelabs/game-creator/game-qa) |
| `opusgamelabs/game-creator@qa-game` | 490 | [record](https://skills.sh/opusgamelabs/game-creator/qa-game) |
| `santiagoxor/pintureria-digital@testing-qa` | 20 | [record](https://skills.sh/santiagoxor/pintureria-digital/testing-qa) |
| `notque/claude-code-toolkit@game-pipeline` | 6 | [record](https://skills.sh/notque/claude-code-toolkit/game-pipeline) |

The registry returns test-planning knowledge but cannot establish that a skill can operate a game,
capture evidence, inspect engine logs, compare visuals, profile frames, or validate a packaged
build. Those capabilities depend on editor/runtime tools and deterministic harnesses.

### Playtesting, balance, and telemetry

Query: `playtesting telemetry`

| Skill | Installs | Registry |
| --- | ---: | --- |
| `lvtd-llc/skills@game-balance-economy` | 69 | [record](https://skills.sh/lvtd-llc/skills/game-balance-economy) |
| `lvtd-llc/skills@game-playtest-planning` | 50 | [record](https://skills.sh/lvtd-llc/skills/game-playtest-planning) |
| `lvtd-llc/skills@game-design-docs` | 45 | [record](https://skills.sh/lvtd-llc/skills/game-design-docs) |
| `fagemx/gstack-game@gstack-game` | 28 | [record](https://skills.sh/fagemx/gstack-game/gstack-game) |
| `mrcalderon3d/everything-game-dev-code@playtest-analysis` | 11 | [record](https://skills.sh/mrcalderon3d/everything-game-dev-code/playtest-analysis) |
| `mrcalderon3d/everything-game-dev-code@level-design` | 11 | [record](https://skills.sh/mrcalderon3d/everything-game-dev-code/level-design) |

These results are too weak to delegate player research or balance decisions without a custom
methodology, instrumented builds, consent/privacy rules, representative players, and human review.

## Searches that exposed registry weaknesses

### Level design

The `level design` query returned generic web/UI design-system skills rather than game-level design.
This is a search-quality failure. A router must use engine and gameplay context, and our own library
needs an explicit level-design skill covering spatial metrics, encounter beats, navigation,
signposting, pacing, metrics validation, grayboxing, and playtesting.

### Accessibility

The `game accessibility` query returned one broad game skill and multiple irrelevant “unblocked
game” records. It did not surface a credible specialist skill. Accessibility must therefore be a
first-party requirement for our library, grounded in platform and accessibility guidance rather
than registry popularity.

### Game art

The `game art blender` query topped out at 47 installs for a directly relevant label, followed by
mostly single-digit results. This is not enough evidence to select an art-direction authority.
Image or mesh generation tools can produce assets; they do not establish coherent visual language,
composition, hierarchy, readability, or suitability for a particular game.

## Cross-engine bundle worth inspecting

The [awesome-gamedev-agent-skills](https://github.com/gamedev-skills/awesome-gamedev-agent-skills)
repository currently advertises 67 portable skills with a router spanning Godot, Unity, Unreal,
web engines, other engines, disciplines, genres, and workflows. Its strengths are breadth,
composition, versioned `SKILL.md` files, and a single routing layer. Its risks are the same as any
broad bundle: uneven depth, instruction conflicts, large review surface, and the possibility that a
genre recipe creates a structurally valid but artistically weak prototype.

It is a useful taxonomy and routing reference. It should not be adopted wholesale until individual
skills pass our evaluation harness.

## Initial evaluation tiers

### Tier A: evaluate as reference architectures

- VibeUE plus Unreal 5.8 MCP: live editor control plus lazy domain knowledge.
- CoplayDev MCP for Unity: focused live editor bridge with test/profile/build operations.
- IvanMurzak Unity-MCP: editor/runtime tools plus generated skill setup.
- alexmeckes Godot MCP: file tools, live bridge, runtime input, screenshots, and companion skills.
- `gamedev-skills/awesome-gamedev-agent-skills`: router and cross-engine taxonomy.
- `quodsoler/unreal-engine-skills`: focused Unreal C++ knowledge modules.
- Opus Game Creator: browser-game design, implementation, audio, and QA workflow patterns.

### Tier B: evaluate individual modules only

- the top Unity and Godot registry skills;
- Three.js gameplay and QA skills;
- Blender modeling skills;
- animation-principle skills;
- audio-design modules;
- narrow engine shader/material modules.

### Tier C: research patterns, do not adopt without strong new evidence

- low-adoption producer/orchestrator packages;
- low-adoption game-art and concept-art packages;
- generic “game developer” mega-skills without explicit versions or tests;
- hosted MCPs that cannot be self-hosted or bounded to a local project;
- any skill that treats screenshot generation as visual approval;
- any editor bridge whose arbitrary-code escape hatch is enabled by default.

## Quality rubric for the next phase

Each candidate should be scored on:

1. authoritative, version-specific engine knowledge;
2. live editor/runtime access versus knowledge-only instructions;
3. narrow, discoverable tools rather than a giant undifferentiated surface;
4. project and asset identity, undo/transaction behavior, and idempotence;
5. deterministic test, play, capture, profiling, and packaging loops;
6. visual inspection that compares against an explicit target instead of self-approval;
7. permission boundaries, localhost/auth behavior, arbitrary-code controls, and secret handling;
8. license, provenance, release pinning, and dependency review;
9. evidence-backed evals with failure cases;
10. clean role boundaries and durable artifact handoffs for multiple agents.

The recommended-library report applies this rubric to the proposed Antiky skill library.
