# Game art direction and content-pipeline skill research

Research snapshot: 2026-08-09

**Antiky scope:** Antiky Framework, BroMetal, Studio, and Antiky games are the implementation
targets. External engines and editor bridges in this report are comparative case studies. DCC and
format tools may be real production dependencies when reviewed, but there is no Unity, Unreal, or
Godot content-skill or adapter roadmap.

## Executive recommendation

Build this part of the skill library as two connected but independent systems:

1. **Art direction decides what the game should communicate and feel like.** It owns visual
   identity, composition, shape, color, density, motion, audio direction, target frames, and failure
   examples.
2. **Content production manufactures, imports, and validates that direction.** It owns source
   assets, deterministic exports, rigs, animation clips, materials, audio events, LODs, collision,
   engine import, runtime evidence, performance, and provenance.

Do not let a DCC-control agent define taste, and do not let an asset author approve its own output.
Generation capability is not art direction. A polished hero render is not proof that an asset works
from the gameplay camera, in motion, under production lighting, or within the target budget.

The strongest approach found is a composed internal library rather than one imported package:

- adapt the target-frame and coverage discipline from
  [`game-art-direction`](https://github.com/worldwonderer/novel-to-game/blob/main/skills/game-art-direction/SKILL.md)
  and the structured art-bible/asset-spec patterns from
  [Claude Code Game Studios](https://github.com/Donchitos/Claude-Code-Game-Studios);
- use first-party DCC command lines and engine import hooks as the deterministic authority;
- use editor MCPs only as bounded, reversible operator surfaces;
- require an asset manifest and rights record before import;
- require native-resolution, gameplay-camera, in-motion evidence and runtime metrics before
  approval.

No skill, MCP, package, model, or application was installed during this research.

## Method and confidence labels

This report used:

- `npx --yes skills find` searches against the public skills.sh index;
- public `SKILL.md` files and source repositories;
- first-party Blender, Aseprite, Godot, Unity, Unreal, FMOD, Khronos, SPDX, C2PA, U.S. Copyright
  Office, Poly Haven, ambientCG, and Sketchfab documentation;
- current public repository metadata and project security/licensing documents.

Evidence labels used below:

- **Verified**: directly stated in first-party documentation or inspectable source/metadata.
- **Publisher claim**: stated by a community project but not independently exercised here.
- **Assessment / proposed policy**: this research's adoption judgment or a design for our library,
  not an external standard.

Stars, installs, releases, and terms are volatile. Counts are snapshots from 2026-08-09. Repository
popularity does not validate every skill within a monorepo, and registry installs do not prove
correctness, safety, or artistic quality.

## Maturity and adoption rubric

| Level | Required evidence | Use |
| --- | --- | --- |
| **Production candidate** | Active source; clear license and security posture; release/commit pin; deterministic outputs; rollback; tests or validation; runtime evidence | May enter a controlled evaluation before internal adoption |
| **Pilot** | Useful workflow and inspectable source, but new, low-adoption, experimental, or coupled to a narrow toolchain | Isolated sample project only; no production credentials or unpublished assets |
| **Reference only** | Prose checklist, persona, unsupported numerical rules, or no executable verification | Mine concepts; rewrite around our artifact and evidence contracts |
| **Reject pending remediation** | Conflicting license/terms, unclear telemetry, non-loopback unauthenticated access, unverifiable source, or commercially incompatible dependencies | Do not install or connect |

## Registry discovery

### Exact searches run

```bash
npx --yes skills find "game art"
npx --yes skills find "game art direction"
npx --yes skills find "3d modeling rigging animation"
npx --yes skills find "game environment art"
npx --yes skills find "game ui art"
npx --yes skills find "game audio sound design"
npx --yes skills find "procedural game assets"
```

Some narrow searches timed out or returned no useful payload. That is evidence of weak registry
discoverability, not proof that no such skill exists. The broad `game art` query returned the
candidates below. No `skills add` command was executed.

### Art-direction and generation shortlist

| Candidate | Discovery/source signal | Verified scope | Assessment |
| --- | --- | --- | --- |
| [`donchitos/claude-code-game-studios@art-bible`](https://skills.sh/donchitos/claude-code-game-studios/art-bible) | ~281 installs; source repo ~23.7K stars, MIT, created 2026 | Nine-section art-bible workflow, parallel art/technical/UX reviews, approval gates, `design/art/art-bible.md`; related `asset-spec` creates an inventory and manifest | **Pilot as a pattern source.** The workflow is strong, but it assumes Claude-specific orchestration and repository conventions. The repository is popular but extremely new; popularity does not prove output quality. |
| [`worldwonderer/novel-to-game@game-art-direction`](https://skills.sh/worldwonderer/novel-to-game/game-art-direction) | ~138 installs; source repo ~607 stars, MIT, created July 2026 | Requires product/game-design inputs; outputs `design/ART_DIRECTION.md` and `design/VISUAL_TARGETS.md`; covers camera, composition, shape/scale/density, color/light/material, HUD, motion, audio, rights, coverage, signature moments, and failure examples | **Best art-direction pattern found, still a pilot.** It correctly refuses to substitute asset engineering for visual direction and requires target coverage. It is tightly coupled to its own pipeline, very new, and Chinese-first though output language is adaptive. |
| [`omer-metin/skills-for-antigravity@ai-game-art-generation`](https://skills.sh/omer-metin/skills-for-antigravity/ai-game-art-generation) | ~215 installs; source repo ~123 stars, Apache-2.0 | The router references ComfyUI, Stable Diffusion, FLUX, ControlNet, and IP-Adapter support | **Reference only until full dependency audit.** “Production-ready” sprites, textures, UI, and environments are publisher claims. The root skill delegates substance to additional files and does not establish model-weight rights, style consistency, topology, runtime performance, or engine acceptance. |
| [`cooksaw/claude-skills@pixel-art-game-builder`](https://skills.sh/cooksaw/claude-skills/pixel-art-game-builder) | ~80 installs; source repo had no stars and no detected license | An opinionated React/TypeScript/Zustand contemplative-idle-game recipe with fixed 16×16 sprites and palette constraints | **Reference only.** Useful examples of pixel export constraints, but it is a narrow starter, not a general art pipeline. No detected repository license is an adoption blocker. |
| [`davila7/claude-code-templates` game-art/game-audio skills](https://github.com/davila7/claude-code-templates/tree/main/cli-tool/components/skills/creative-design/game-development) | Monorepo ~30.2K stars, MIT | High-level style matrices, naming, color, animation principles, audio categories, state transitions, 3D sound, and mixing reminders | **Onboarding checklist only.** The individual skills are shallow, contain generic unsupported budgets/levels, and inherit none of the monorepo's popularity as quality evidence. |
| [`LuigiDeFacci/godot-create-3d-assets`](https://github.com/LuigiDeFacci/godot-create-3d-assets) | ~13 stars, MIT, three commits, created July 2026 | Godot-only stylized asset workflow with deterministic builders, manifests, collision/navigation/performance probes, off-desktop multi-angle captures, separate traversal/NavMesh checks, and p95 measurement | **Promising process pilot, not a mature dependency.** It has unusually good evidence and privacy gates but is very new, Godot-specific, and depends on MCP capability negotiation. |

Potential commands for later isolated review, **not executed**:

```bash
npx skills add donchitos/claude-code-game-studios@art-bible
npx skills add worldwonderer/novel-to-game@game-art-direction
npx skills add omer-metin/skills-for-antigravity@ai-game-art-generation
npx skills add cooksaw/claude-skills@pixel-art-game-builder
```

### Narrow supporting skills

| Candidate | Signal | Assessment |
| --- | ---: | --- |
| [`gamedev-skills/...@game-ui-ux`](https://skills.sh/gamedev-skills/awesome-gamedev-agent-skills/game-ui-ux) | ~847 installs; source repo ~455 stars | Useful engine-neutral game-UI architecture and interaction checklist. Pair with a visual-system skill and engine specialist; it does not make the art or prove gameplay readability. |
| [`pixijs/pixijs-skills@pixijs-custom-rendering`](https://skills.sh/pixijs/pixijs-skills/pixijs-custom-rendering) | ~2.9K installs; official PixiJS repo ~302 stars, MIT | Strong production candidate for PixiJS v8 renderer implementation, custom GLSL/WGSL, filters, particles, blend/color, accessibility, and performance. It is a renderer/code skill, not art direction. |
| [`erichowens/...@sound-engineer`](https://skills.sh/erichowens/some_claude_skills/sound-engineer) | ~245 installs | Reference checklist; audit its dependencies and numerical guidance before reuse. It does not provide a complete game-audio event, rights, middleware, loudness, memory, and runtime-validation pipeline. |
| [`pluginagentmarketplace/...@audio-systems`](https://skills.sh/pluginagentmarketplace/custom-plugin-game-developer/audio-systems) | ~77 installs; source repo ~30 stars | Low maturity. Architecture notes are useful, but adoption should wait for deeper source and engine validation. |
| [`yuki001/...@animation-shader`](https://skills.sh/yuki001/game-dev-skills/animation-shader) | ~21 installs; source repo ~40 stars | Knowledge-only, low adoption. Not a substitute for skeleton, retargeting, deformation, root-motion, event, and import contracts. |

Exact individual install forms shown by the registry, **not executed**:

```bash
npx skills add https://github.com/gamedev-skills/awesome-gamedev-agent-skills --skill game-ui-ux
npx skills add https://github.com/pixijs/pixijs-skills --skill pixijs-custom-rendering
npx skills add https://github.com/erichowens/some_claude_skills --skill sound-engineer
npx skills add https://github.com/pluginagentmarketplace/custom-plugin-game-developer --skill audio-systems
npx skills add https://github.com/yuki001/game-dev-skills --skill animation-shader
```

## DCC and engine-control surfaces

### Blender

#### MCPBlender/blender-mcp

Source: [`MCPBlender/blender-mcp`](https://github.com/MCPBlender/blender-mcp)

**Verified facts**

- Public source was ~25.7K stars, ~2.4K forks, MIT, active on the snapshot date.
- The server/add-on can inspect scenes and screenshots; create and manipulate objects/materials;
  run arbitrary Python; and integrate optional Poly Haven, Sketchfab, Hyper3D, and Hunyuan sources.
- It requires Blender 3+, Python 3.10, `uv`, and an interactive Blender GUI for its socket and
  viewport workflow. It is not a headless build authority.
- Its security document states that `execute_blender_code` has the Blender process's full access,
  recommends localhost, and documents `BLENDER_MCP_DISABLE_TELEMETRY=1`.

Codex configuration from the project:

```toml
[mcp_servers.blender]
command = "uvx"
args = ["blender-mcp"]
```

The add-on is manually installed from `addon.py`, enabled as **Interface: Blender MCP**, and
connected from the Blender side. The project documents this refresh command:

```bash
uvx --refresh blender-mcp
```

**Security/terms assessment**

The project's terms say enabled telemetry may collect prompts, generated code, and scene metadata
indefinitely for training/open datasets and grant a perpetual license. The same terms appear
internally inconsistent about whether images/screenshots are collected. This is a **reject pending
remediation** for unpublished work. If it is ever evaluated, disable telemetry explicitly, verify
the code path, use only loopback, deny external network access, remove secrets, and use a disposable
project. The remote `0.0.0.0` mode has no authentication and must never be exposed.

#### RFingAdam/mcp-blender

Source: [`RFingAdam/mcp-blender`](https://github.com/RFingAdam/mcp-blender)

**Verified facts**

- The README claims 218 tools covering objects, meshes, materials, modifiers, animation, rendering,
  export, baking, geometry nodes, sculpting, rigging, and physics.
- Public source was ~7 stars, ~2 forks, 15 open issues, and 31 commits.
- The repository `LICENSE` is AGPL-3.0 while the README says MIT.

Publisher quick start, **not executed**:

```bash
pip install mcp-blender
mcp-blender --port 9876
```

**Assessment:** reject pending license clarification. The very large tool surface, self-refinement,
external AI providers, and tiny adoption footprint compound the code-execution, privacy, and asset-
rights risks. Tool-count claims are not proof of quality.

#### Stable automation substrate

Blender's first-party command line remains the preferable repeatable export/render/validation
substrate even when an MCP assists interactive authoring:

```bash
blender source.blend --background --python scripts/export_asset.py
```

See Blender's [command-line arguments](https://docs.blender.org/manual/en/latest/advanced/command_line/arguments.html)
and [Python terminal guidance](https://docs.blender.org/api/current/info_tips_and_tricks.html#use-the-terminal).
Preserve the `.blend`, pin Blender/add-on versions, record the command and hashes, and make the
script idempotent.

Blender's bundled [Rigify](https://docs.blender.org/manual/en/4.0/addons/rigging/rigify/index.html)
is a credible rig-generation substrate for supported body plans. Preserve the metarig for
regeneration and validate the exported skeleton in the Antiky runtime; a generated rig does not
prove deformation, retargeting, root motion, contacts, or gameplay silhouette.

### Unity editor bridge

Source: [`CoplayDev/unity-mcp`](https://github.com/CoplayDev/unity-mcp)

**Verified facts**

- Public source was ~13.3K stars, ~1.4K forks, MIT, active, and explicitly not affiliated with
  Unity.
- The bridge exposes 47 focused tool entrypoints for scenes/GameObjects, scripts, assets, tests,
  profiler/build work, VFX, animation, and UI.
- It supports Unity 2021.3 LTS through 6.x and Python 3.10+.
- Its security policy keeps loopback as the default; LAN is opt-in; remote use requires HTTPS and
  API authentication.

Pin a reviewed release rather than `main`:

```text
https://github.com/CoplayDev/unity-mcp.git?path=/MCPForUnity#v10.0.0
```

Alternative publisher commands, **not executed**:

```bash
openupm add com.coplaydev.unity-mcp
```

Configuration is available at **Window → MCP for Unity → Configure All Detected Clients**.

**Comparative assessment:** this has the strongest public security posture of the researched editor
bridges, but remains a powerful project mutator. Antiky should mine its scoped-tool and transport
patterns without piloting the Unity bridge.

### Godot editor bridge

Source: [`IvanMurzak/Godot-MCP`](https://github.com/IvanMurzak/Godot-MCP)

**Verified facts**

- Public source was ~207 stars, Apache-2.0, 215 commits, active, and created June 2026.
- It advertises 42 tools in 12 families for C#/GDScript, scenes/resources, screenshots, and
  reflection.
- It requires Godot 4.3+ Mono/.NET and .NET 8, so it is not a standard GDScript-only dependency.
- The default path uses the ai-game.dev cloud; self-hosting is possible. OAuth credentials are
  machine-wide, and the editor token is stored in plaintext under `user://`.
- Runtime MCP is opt-in and exposes zero tools by default. Error capture can include absolute paths,
  machine/user names, and secrets.

Publisher setup, **not executed**:

```bash
npm install -g godot-cli
godot-cli install-plugin ./MyGodotProject
godot-cli login
godot-cli setup-mcp claude-code ./MyGodotProject
godot-cli open ./MyGodotProject
godot-cli wait-for-ready ./MyGodotProject
```

**Comparative assessment:** the cloud default, plaintext editor token, and runtime bridge show why
Antiky should prefer local authenticated control, sanitized diagnostics, verified binaries, and no
shipping agent bridge. Do not pilot this Godot integration for the Antiky roadmap.

### Unreal editor bridge

Source: [`kevinpbuckley/VibeUE`](https://github.com/kevinpbuckley/VibeUE)

**Verified facts**

- Public source was ~587 stars, ~127 forks, MIT, and active.
- It requires Unreal Engine 5.8+ and builds on Unreal's native experimental MCP/editor-tool stack.
- It exposes terrain/world/foliage, MetaSound/SoundCue, animation/retargeting, Niagara/HLSL,
  UMG/MVVM, transactions/undo, UV, and profiling surfaces, plus roughly 34 native Agent Skills.
- The default endpoint is unauthenticated loopback at `http://127.0.0.1:8000/mcp`; it is same-machine
  only. A free API key is used only for its real-world terrain integration.

Publisher setup, **not executed**:

```bash
cd /absolute/path/Game/Plugins
git clone https://github.com/kevinpbuckley/VibeUE.git
Plugins/VibeUE/BuildAndLaunchGame.sh --engine /absolute/path/to/UE5 --strict-rebuild
```

Relevant Unreal console commands:

```text
ModelContextProtocol.GenerateClientConfig Codex
VibeUE.GenerateAgentConfig Codex
```

**Comparative assessment:** VibeUE demonstrates useful transaction/checkpoint, isolation, and
readback patterns, but it is new and depends on UE 5.8 experimental features. Mine those patterns;
do not pilot the Unreal integration for the Antiky roadmap.

## Content-production substrates by discipline

### Concept, reference boards, and 2D assets

**Verified tools**

- [Aseprite CLI](https://www.aseprite.org/docs/cli/) supports headless batch export, trimmed/extruded
  sprite sheets, JSON metadata, and Lua scripts. Example:

  ```bash
  aseprite -b character.aseprite \
    --sheet character.png --data character.json \
    --format json-array --trim --extrude
  ```

- [Krita's command line](https://docs.krita.org/en/reference_manual/linux_command_line.html) can
  batch-open and export raster documents. Krita is an appropriate open-source 2D source editor, but
  no mature game-art agent skill was found around it.
- [Official PixiJS Agent Skills](https://github.com/pixijs/pixijs-skills) are a strong implementation
  substrate for browser 2D rendering. Install form, **not executed**:

  ```bash
  npx skills add https://github.com/pixijs/pixijs-skills
  ```

**Constraints and proposed gate**

Aseprite is commercial/source-available software; do not redistribute its binary without reviewing
its current EULA. A reference board must record the creator, canonical URL, license/usage basis,
date, hash or snapshot, and exactly what is being studied. It must include “do not copy” notes,
cultural/publicity/trademark concerns, and original target frames. A scraped mood-board dump is not
an acceptable artifact.

AI image generation is suitable for divergent exploration only unless model/service/output rights,
reference rights, provenance, consistency, editability, and target-engine requirements are all
cleared. Prompts alone do not establish authorship or production quality.

### Modeling, UVs, texturing, materials, and procedural generation

**Verified tools**

- [Material Maker](https://github.com/RodZill4/material-maker) is an MIT-licensed Godot-based node
  tool for procedural materials and 3D model painting. Public source was ~5.8K stars and active.
  It is a credible human/DCC tool but lacks a mature, audited agent automation layer.
- [MaterialX](https://github.com/AcademySoftwareFoundation/MaterialX) is an Apache-2.0 ASWF open
  standard/library for look-development material interchange and shader generation. Public source
  was ~2.2K stars and active. It is a canonical interchange option, not a guarantee of identical
  output across engines.
- [glTF Transform CLI](https://gltf-transform.dev/cli) is MIT-licensed and supports inspection,
  validation, optimization, geometry compression, texture resizing, and KTX2/WebP transforms.
  Public source was ~1.9K stars and active.

Representative glTF Transform commands, **not executed**:

```bash
npm install --global @gltf-transform/cli
gltf-transform inspect input.glb
gltf-transform validate input.glb
gltf-transform optimize input.glb output.glb --compress draco --texture-compress webp
gltf-transform meshopt input.glb output.glb --level medium
gltf-transform resize input.glb output.glb --width 1024 --height 1024
```

Khronos also provides the Apache-2.0
[`glTF-Validator`](https://github.com/KhronosGroup/glTF-Validator). Its native CLI accepts:

```bash
gltf_validator -a input.glb
```

**Constraints and proposed gate**

Never optimize the only source copy. Keep the source DCC file, unoptimized interchange export, and
derived runtime asset separately. Generic polygon and texture budgets are not universal; derive them
from target hardware, scene density, camera distance, animation deformation, material complexity,
streaming, and measured frame/memory budgets. Compare the optimized asset against the source in the
target engine, from expected and adverse angles, under multiple lights.

Procedural generation must be seeded and record generator version, parameters, dependencies, and
source hashes. It needs boundary, collision, navigation, overlap, determinism, and performance tests.
A generated environment is not valid because it looks plausible from one camera.

### Rigging and animation

**Verified substrate**

- Blender Rigify provides reproducible rig generation from metarigs for supported character types.
- The researched Blender, Unity, Godot, and Unreal bridges can manipulate animation-related editor
  objects, but tool access does not supply a production animation contract.
- VibeUE exposes Unreal animation assets and retargeting surfaces; Unity MCP exposes animation
  controls; Godot MCP exposes resources and reflection. These are publisher/tool capabilities, not
  independent evidence of deformation quality.

**Proposed required artifact**

Every animated asset needs a skeleton/retarget contract and clip manifest containing:

- coordinate system, scale, root/pelvis ownership, naming, hierarchy, and bind pose;
- clip name, source range, sample rate, loop policy, root motion, contacts, events/notifies, additive
  basis, and compression profile;
- expected gameplay speed, camera, state-machine consumer, and interruption/transition rules;
- deformation shots for shoulders, hips, hands, face, extremes, and equipment;
- foot-slide, ground contact, prop alignment, silhouette, retarget, and engine reimport verdicts.

The Antiky runtime—not a DCC viewport—must be the approval surface. Include normal speed, slow motion,
rapid transitions, and multiple body proportions where retargeting is promised.

### Environments, lighting, and world building

**Verified substrate**

- VibeUE exposes Unreal landscape, terrain, world, and foliage workflows.
- `godot-create-3d-assets` provides a useful Godot pattern for deterministic builders, profile
  manifests, collision/navigation probes, off-desktop captures, and separate traversal/NavMesh
  checks.
- Blender supports deterministic scripted source generation and export.

**Proposed required artifact**

An environment package needs a playable blockout, grid/pivot/scale rules, modular kit manifest,
set-dressing layers, collision and navigation, lighting scenarios, traversal/line-of-sight cases,
streaming/occlusion/HLOD plan, and representative performance trace. Review composition from player
routes and gameplay cameras, not only free-camera vistas. Include worst-case density and lighting,
junctions/seams, doors/stairs, vertical traversal, combat/readability zones, and accessibility paths.

### Game UI art

Game UI must combine interaction architecture with a visual system. A web-frontend skill does not
cover HUD readability, controller focus, safe zones, split screen, in-world UI, localization growth,
or combat occlusion.

**Proposed required artifact**

- screen flow and HUD priority map;
- typography, icon, color, focus, cursor, tooltip, panel, nine-slice, atlas, and motion rules;
- gamepad, keyboard/mouse, touch, remapping, and accessibility states;
- safe-zone/aspect/resolution matrix, localization expansion/RTL/CJK cases, color-vision cases, and
  reduced-motion variants;
- native-resolution captures over representative calm, busy, dark, bright, and failure gameplay;
- texture memory, overdraw, draw-call/batch, layout-rebuild, and input-latency evidence.

Pair the engine-neutral `game-ui-ux` reference with an engine UI specialist—Unity UI Toolkit/uGUI,
Godot Control, Unreal UMG/MVVM, or PixiJS—not with a generic page designer.

### Audio and technical sound

**Verified tools and constraints**

- [FMOD Studio scripting](https://www.fmod.com/docs/2.03/studio/scripting-terminal-reference.html)
  uses JavaScript through its built-in terminal, script files, or TCP port 3663. It can create/delete
  project objects, import media, save, and build banks. Example:

  ```javascript
  studio.project.build({ banks: "Weapons" });
  ```

  FMOD is proprietary; verify current Studio/engine licensing for the project and revenue model. Its
  TCP/script surface can execute powerful operations, so bind/firewall locally and run with least
  privilege.
- [`facebookresearch/audiocraft`](https://github.com/facebookresearch/audiocraft) code is MIT, but
  its released pretrained model weights are CC-BY-NC 4.0. Generated commercial-game audio must not
  be assumed cleared merely because the code is MIT.
- `ffprobe`/`ffmpeg` provide deterministic stream inspection and transforms, but a one-pass filter is
  not a replacement for mix review, perceptual QA, or middleware/runtime validation.

Representative inspection command:

```bash
ffprobe -v error -show_streams -show_format input.wav
```

**Assessment:** audio is the weakest skill category found. Build a dedicated technical-audio skill
that owns source rights, raw masters, edit history, event manifest, loudness/peak/loop metrics,
attenuation, priority, randomization, ducking, concurrency/voice limits, banks, localization,
memory/streaming, and in-game captures. Judge timing and masking in play, not as isolated waveforms.

## Engine import and reimport

The import layer should be implemented as three adapters sharing one asset contract.

### Godot

Godot's official [3D import](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_3d_scenes/)
and [advanced import configuration](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_3d_scenes/import_configuration.html)
support scene import settings, naming suffix hints, LOD/shadow-mesh generation, animation/skin
settings, and `EditorScenePostImport` customization. Godot recommends correcting source data rather
than accumulating post-import patches and recommends glTF as the primary interchange format.

```gdscript
@tool
extends EditorScenePostImport

func _post_import(scene):
    # Project-owned deterministic normalization and metadata only.
    return scene
```

### Unity

Unity's official [`AssetPostprocessor`](https://docs.unity3d.com/ScriptReference/AssetPostprocessor.html)
provides before/after model, texture, audio, and material import hooks such as
`OnPreprocessModel` and `OnPostprocessModel`. When postprocessor output semantics change, increment
`GetVersion()` so dependent assets reimport. Keep source correction upstream when possible; use the
postprocessor for deterministic project policy rather than hidden artistic repair.

### Unreal Engine

Unreal's official [Interchange framework](https://dev.epicgames.com/documentation/unreal-engine/importing-assets-using-interchange-in-unreal-engine)
is file-format agnostic, asynchronous, customizable through C++/Blueprint/Python, supports pipeline
stacks, and remembers reimport options. Official documentation covers glTF/GLB and MaterialX; FBX
support through Interchange remains version-sensitive/experimental and needs exact-engine testing.

Use material instances/functions rather than emitting unique materials indiscriminately. Unreal's
[`UMaterial` documentation](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/Engine/Materials/UMaterial)
warns that new materials increase shader compile work and recommends instances where appropriate.

### Shared import gate

Every adapter must emit:

- engine/editor and importer version;
- source/derived hashes and import-profile identifier;
- scale, axis, pivot, bounds, material/texture/channel/color-space, skeleton, animation, collision,
  navigation, LOD, and compression findings;
- import/reimport warnings and deterministic-diff result;
- isolated turntable plus in-world native-resolution captures;
- runtime memory, draw/triangle/material/overdraw/animation/audio metrics relevant to the asset;
- pass/block verdict linked to the asset manifest.

## Proposed specialist-agent studio

These are **proposed internal roles**, not claims that the researched tools already provide them.
Each role owns an artifact; authors cannot approve their own output.

| Role | Inputs | Required outputs and authority |
| --- | --- | --- |
| Creative/art director | Gameplay brief, product pillars, platform, camera, target finish | Art bible; shape/color/light/density/motion/audio grammar; “do/don't”; three or more original target frames covering exploration, core play, high stress/result; coverage matrix; failure examples. Blocks production until target approval. |
| Reference and provenance researcher | Art-direction questions and rights policy | Curated reference dossier with creator, canonical source, date, rights basis, permitted learning, prohibited copying, cultural/publicity/trademark flags, and hashes/snapshots. Cannot declare legal clearance beyond evidence. |
| Concept and 2D artist | Approved targets and asset contract | Turnarounds, orthographic sheets, callouts, value/palette studies, sprite/UI source and deterministic exports; generator/model/prompt/reference records and human edits where applicable. |
| 3D character/prop artist | Approved concept and technical profile | Source `.blend`, high/low/cage, UVs, bakes, PBR textures, pivots/scale/axis, collision, LODs, unoptimized interchange and runtime derivatives. |
| Rigger/animator | Model, gameplay timings, engine skeleton | Metarig/source rig, skin, retarget contract, clip/event manifest, root-motion/contact/deformation/transition evidence, engine-imported clips. |
| Environment/world builder | Blockout and encounter/traversal requirements | Modular kit, assembly rules, set dressing, collision/nav, lighting states, streaming/HLOD/occlusion plan, route/readability captures, stress scene. |
| Technical artist/material/VFX | Visual targets and platform budget | Master material system/instances, texture-channel/color-space contract, shader/VFX sources, platform variants/fallbacks, compile/overdraw/draw/GPU evidence, failure degradation. |
| UI visual/UX artist | Input matrix, HUD priorities, platform/accessibility rules | Screen flow, visual tokens/assets, focus/touch/controller states, safe-zone/resolution/localization/color-vision/reduced-motion matrix, native gameplay captures, UI performance evidence. |
| Sound designer/technical audio | Audio direction, gameplay events, platform budget | Licensed sources, raw masters, edits/variants, event/bank manifest, loudness/peak/loop results, attenuation/concurrency/ducking/streaming profile, in-game capture. |
| Asset librarian/build integrator | All source and generated artifacts | Naming/folder policy, hashes, license receipts, provenance manifest, deterministic transforms, import profiles, credit export, reimport report. Owns consistency, not taste. |
| Antiky integration specialist | Approved asset package and Antiky import/runtime profile | Antiky world/render/material/skeleton/event bindings, import/reimport evidence, target-build validation |
| Independent visual/performance QA | Art targets, asset contract, integrated build | Native-resolution multi-angle and gameplay-motion review; collision/nav/import warnings/performance/provenance verdict; blockers with reproducible evidence. Must not author the reviewed asset. |

Recommended artifact flow:

```text
gameplay brief
  → reference dossier
  → art bible + visual targets
  → asset contract + manifest
  → source asset
  → deterministic export
  → format validation
  → engine import + reimport
  → isolated + in-world captures
  → runtime/performance report
  → independent approval
  → publish
```

Hash and version artifacts at each handoff. A source change invalidates downstream evidence and must
rerun the affected export, import, visual, performance, and rights gates.

## Provenance, copyright, and licensing

### Verified source rules

- [Poly Haven](https://polyhaven.com/license) publishes its assets as CC0 and permits commercial use
  without attribution, but its site terms prohibit scraping/data mining without permission; use its
  documented API under its own terms rather than crawling.
- [ambientCG](https://docs.ambientcg.com/license/) publishes assets and previews as CC0 and permits
  use in games without attribution.
- [Sketchfab licensing](https://sketchfab.com/licenses) is per asset and can include CC0, CC BY,
  noncommercial, no-derivatives, share-alike, Standard, or Editorial restrictions. “Downloadable”
  does not mean commercially safe. Standard assets may not be redistributed as standalone/extractable
  content; Editorial content is not a default commercial/promotion license; trademarks, people, and
  property can create rights outside copyright.
- [SPDX](https://spdx.dev/use/specifications/) provides standardized license expressions and is
  ISO/IEC 5962:2021. Use SPDX identifiers where a source license maps cleanly.
- [C2PA Content Credentials](https://spec.c2pa.org/post/contentcredentials/) can cryptographically
  bind provenance and edit assertions. They do not prove that an assertion is true or that a license
  permits use.
- The U.S. Copyright Office's 2025
  [AI copyrightability report](https://www.copyright.gov/newsnet/2025/1060.html) says prompts alone
  generally do not supply sufficient human control; protectability depends on human-authored
  expressive elements, selection/arrangement, or modifications. This is jurisdiction-specific and
  not legal advice.

### Proposed asset-manifest minimum

```yaml
asset_id: environment/market_stall/a
source_url: <canonical-source-url>
creator: Creator Name
downloaded_at: 2026-08-09T00:00:00Z
source_version: v1
source_sha256: "..."
license_expression: CC0-1.0
license_snapshot: LICENSES/environment-market-stall-a.txt
attribution: ""
allowed_uses: [commercial_game, modify, redistribute_only_in_product]
prohibited_uses: [standalone_redistribution]
rights_flags: [trademark_review_required]
tool_model_version: blender-4.x
prompt_reference_hashes: []
human_edits: "Retopology, UVs, paint-over, material rebuild"
source_files: [source/market_stall.blend]
derived_files: [runtime/market_stall.glb]
engine_import_profile: godot-3d-prop-v2
approval: pending
```

Preserve the exact license text/receipt and creator/source page at acquisition, hash source files,
and generate credits from manifests. Track publicity, trademark, property, cultural, music,
performer, and model releases separately; CC0 copyright status does not erase those concerns.

For AI services, review five independent layers: service terms, code license, model-weight license,
training/reference rights, and retention/telemetry. A favorable code license does not clear weights
or output. MCPs must not auto-download or import an external asset without a manifest and explicit
approval.

## Security and privacy controls

Blender Python execution, Unity editor mutation/reflection, Godot reflection, Unreal Python/editor
tools, and FMOD scripting are intentional local-code-execution surfaces. Treat them as developer
RCE, not harmless assistants.

Required controls for any DCC or editor automation adopted for Antiky:

- pin a reviewed release or commit and verify the source/license/dependency lock before installation;
- use a disposable sample project, isolated branch/worktree, project-scoped filesystem, and backups;
- keep services on `127.0.0.1`; never bind an unauthenticated tool to `0.0.0.0`; require TLS/auth for
  any explicitly approved remote use;
- deny network by default and allowlist only approved registries/asset sources;
- keep tokens, signing keys, store credentials, account cookies, and unreleased story/content out of
  prompts, scenes, logs, and MCP configuration;
- disable telemetry unless explicitly reviewed and approved; verify behavior in source rather than
  trusting a checkbox;
- require change manifests, transaction/undo boundaries, small batches, and human review before save;
- validate downloaded file type, size, hash, archive contents, executable/add-on code, and license;
- capture only editor viewport/game surfaces off-desktop; never capture the desktop, terminal,
  notifications, file paths, title bars, user names, or unrelated applications;
- scrub stack traces and import reports because they can expose user names, absolute paths, machine
  names, and secrets;
- never ship a runtime editor/MCP bridge in a game build.

## Proposed Antiky content skill library

| Skill | Scope and artifact | Gate |
| --- | --- | --- |
| `game-art-direction` | Art bible, coverage matrix, original target frames, failure examples | Human target approval before asset production |
| `reference-rights-board` | Curated reference/provenance dossier | Every reference has purpose, source, rights, and do-not-copy notes |
| `asset-contract-and-manifest` | Antiky technical/rights contract and hashes | No DCC work/import without approved contract |
| `blender-antiky-asset-pipeline` | Headless-first source/export/turntable workflow for Antiky; MCP optional | Reproducible export plus format and visual diff |
| `character-rig-animation-contract` | Skeleton, retarget, clip/event, deformation/contact contract | Target-engine motion/deformation approval |
| `environment-worldbuilding` | Kit, assembly, lighting, nav/collision, streaming/HLOD, route proof | Gameplay-route and worst-density evidence |
| `game-material-shader-lookdev` | Master material, instances, variants/fallbacks, color-space and platform profile | Multi-light visual plus compile/GPU/overdraw proof |
| `game-ui-visual-system` | UI tokens/assets, interaction/input/accessibility/resolution matrix | Native gameplay readability and performance proof |
| `technical-audio` | Rights, masters, events/banks, loudness/loop/voice/memory/runtime evidence | In-game mix and timing approval |
| `asset-optimization-validation` | Source-preserving LOD/mesh/texture/compression transforms | Visual comparison and target performance improvement |
| `import-antiky-assets` | Antiky import profile, normalized metadata, reimport report, render/gameplay proof | Deterministic import and Antiky runtime proof |
| `visual-qa-gameplay-camera` | Independent multi-state screenshots/video and issue verdict | No desktop/PII; motion/native-resolution/target-state coverage |
| `asset-provenance-compliance` | Manifest, receipts, hashes, credits, restrictions, audit trail | No missing/ambiguous rights at publish |

Each skill should declare inputs, outputs, mutation scope, required capabilities, version pins, user
approval points, rollback, evidence, and a safe degradation path when a DCC/MCP is absent. Prefer
portable artifacts over implicit editor state.

## Material gaps and open research

1. No mature verified skill spans reference research → art bible → DCC production → engine import →
   runtime visual/performance QA.
2. No robust cross-engine material-equivalence tester was found. MaterialX helps interchange but
   does not make engine lighting/shaders identical.
3. Rigging/retargeting skills are thin and focus on tool controls rather than deformation, contacts,
   gameplay timing, clip events, and reimport validation.
4. Audio skills are shallow. None found provides a strong rights/loudness/loop/memory/voices/banks/
   middleware/runtime pipeline.
5. Game UI is often confused with web UI. Controller/touch focus, safe zones, localization growth,
   reduced motion, HUD occlusion, and gameplay-state readability are underrepresented.
6. Asset licensing and provenance are not first-class in most art skills or MCPs.
7. Generative-asset packages overuse “production-ready” without proving style consistency,
   copyright/license, topology/UV/rig/collision, performance, editability, or gameplay motion.
8. Visual approval is commonly a single hero image rather than gameplay-camera motion at native
   resolution across lighting and gameplay states.
9. Headless/off-desktop deterministic capture support is uneven. A common capture contract is needed
   to prevent desktop/PII exposure.
10. MCP capability negotiation is not standardized. The Godot asset skill's explicit capability
    matrix is a useful pattern to generalize.
11. Proprietary DCC and middleware automation/version/license access is not portable. Each adapter
    needs a no-tool/manual fallback.
12. Texture, LOD, material, animation, and audio budgets must be measured per game/platform. Generic
    universal budgets in community skills should be rejected.
13. Cultural/art-historical research, performer/model releases, publicity rights, trademarks, and
    protected-property review are nearly absent from current agent pipelines.

## Adoption order

**Assessment / proposed plan**

1. Author the artifact contracts first: art direction, reference rights, asset manifest, import
   report, and independent visual QA.
2. Implement deterministic, MCP-free workflows around Blender headless, Aseprite export, glTF
   Transform/Validator, and Antiky's asset/import contracts.
3. Implement Antiky runtime and gameplay-camera asset validation before adding broader automation.
4. Treat Unity, Unreal, Godot, and PixiJS skills/bridges as pattern sources only; do not pilot them
   as part of the Antiky roadmap.
5. Do not evaluate Blender MCP on unpublished assets until telemetry terms and behavior are resolved.
6. Do not evaluate RFingAdam/mcp-blender until its MIT/AGPL contradiction is resolved.
7. Add generation providers last. No generated asset enters the library without provenance, rights,
   editability, engine import, runtime performance, and independent visual approval.
