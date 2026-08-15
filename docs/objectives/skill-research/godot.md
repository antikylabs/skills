# Godot agent skills and automation research

Research snapshot: 2026-08-09 (America/Chicago). No skill, plugin, package, or MCP server was installed during this research.

> **Antiky scope:** Godot is a comparative source only. Antiky Labs is not building a Godot skill
> or adapter roadmap. Mine this report for text-friendly authoring, headless operation,
> deterministic replay, import validation, runtime capture, and test isolation; implement useful
> patterns against Antiky Framework, BroMetal, CLI/MCP, or Studio.

## Comparative findings

Godot is a useful reference for an internal game-development skill library because most of a project is plain text (`project.godot`, `.gd`, `.tscn`, `.tres`, `.gdshader`), the editor exposes a plugin API, and the official binary supports imports, scripts, builds, exports, LSP, DAP, fixed-frame runs, and deterministic movie output from the command line. The important transferable lesson is that text generation alone is not game creation: final scene composition, animation, game feel, shaders, input, performance, and visual quality need an edit-run-observe loop in a real editor/runtime.

Reference surfaces examined:

1. Official Godot documentation shows the value of a pinned source of truth.
2. Focused, version-pinned prompt skills are easier to audit than giant packs.
3. [Godot MCP Toolkit](https://github.com/NPGameDev/godot-mcp-toolkit) demonstrates explicit
   capability boundaries, while [Godot AI](https://github.com/hi-godot/godot-ai) supplies a useful
   adoption comparison. Neither belongs in the Antiky implementation roadmap.
4. [GdUnit4](https://github.com/godot-gdunit-labs/gdUnit4) and
   [GUT](https://github.com/bitwes/Gut) demonstrate layered test-runner concerns.
5. Runtime verification should have an independent owner and combine structured state, replay,
   command-line checks, and scoped visual evidence.
6. Antiky-native skills should center production gates—direction, gameplay loop, feel,
   accessibility, visual review, performance, provenance, and release—not API recall.

The main risk is confusing tool breadth with production maturity. Most Godot MCP projects in this
survey were created in 2026, and several change tool counts or supported versions quickly. Treat
their claims as comparative evidence, not a reason to install them in Antiky work.

## Evidence labels

- **Verified** means the claim is stated in official Godot documentation, an inspectable source repository, a tagged release, or a public registry record.
- **Maintainer claim** means the project says it tests or supports something, but this research did not execute its suite or reproduce the result.
- **Inference** means a recommendation derived from the verified facts.
- Popularity numbers are a point-in-time registry/GitHub snapshot, not a quality score. Repository stars for large multi-skill collections do not measure the individual Godot skill.

## Godot's automation surface: verified baseline

### Scenes, nodes, and resources

Godot scenes are reusable node trees, and saved scenes are `PackedScene` resources. Resources are data containers; `.tres` is the text, version-control-friendly resource form, while `.res` is binary. Godot caches loaded resources, and scene instances share their referenced images and meshes. Custom `Resource` classes are a natural place for item definitions, stats, abilities, dialogue metadata, material profiles, and other designer-authored data. See the official [Resources guide](https://docs.godotengine.org/en/stable/tutorials/scripting/resources.html) and [scene-organization guidance](https://docs.godotengine.org/en/stable/tutorials/best_practices/scene_organization.html).

Implications for agents:

- Prefer small, self-contained scenes and typed custom resources over one enormous generated scene.
- Treat `.tscn` and `.tres` as structured engine formats, not arbitrary prose. Raw editing is useful, but the editor must load and save them before the change is trusted.
- Use editor APIs for binary-encoded or engine-owned data such as TileMap cells, animation tracks, imported-resource state, transforms, and undoable scene mutations.
- Keep behavior in scripts/scenes and tunable content in resources so designers can work in the Inspector.

### GDScript and C#

**Verified:** Godot supports GDScript and C#. Godot recommends GDScript to new programmers; C# requires the separate .NET editor and a compatible .NET SDK. The standard editor does not contain C# support. Current stable documentation says Godot 4 C# projects support desktop targets, with Android/iOS support still experimental, and cannot export to the web. See [GDScript learning guidance](https://docs.godotengine.org/en/stable/getting_started/introduction/learn_to_code_with_gdscript.html), [the scripting index](https://docs.godotengine.org/en/stable/tutorials/scripting/index.html), and [C#/.NET platform notes](https://docs.godotengine.org/en/stable/tutorials/scripting/c_sharp/index.html).

Practical split:

- Choose GDScript for the broadest Godot-native workflow, fastest iteration, web export, and easiest editor automation.
- Choose C# when the team needs .NET libraries, static tooling, or shared Unity/C# experience, after confirming every shipping platform.
- A skill must never translate syntax mechanically without checking API-name, signal, collection, lifetime, and export differences.

### Editor control without MCP

Godot already exposes several native automation paths:

- `EditorPlugin` can add docks, inspectors, importers, gizmos, commands, and editor behavior. Community addons are recognized by a `plugin.cfg` under `addons/`; official installation guidance recommends tagged releases. See [Installing plugins](https://docs.godotengine.org/en/stable/tutorials/plugins/editor/installing_plugins.html) and [Making plugins](https://docs.godotengine.org/en/stable/tutorials/plugins/editor/making_plugins.html).
- `EditorScript` runs a one-off `_run()` inside the editor and can access the edited scene root.
- `@tool` scripts execute in the editor for procedural previews and designer tooling.
- The built-in GDScript language server and debug adapter can be exposed with `--lsp-port` and `--dap-port`.

Security warning from the official [Running code in the editor](https://docs.godotengine.org/en/stable/tutorials/plugins/running_code_in_the_editor.html) guide: `@tool` and `EditorScript` code runs inside the editor, can crash it, and some edits have no undo/redo. Therefore, generated editor code is executable code and must be reviewed with the same care as a build script.

## Agent skills found through skills.sh

The search used `npx skills find` for `godot`, `gdscript`, `godot shader`, `godot testing`, `godot ui`, `godot animation`, `godot 3d`, `godot assets`, and `godot game design`. Install counts below are the 2026-08-09 CLI results.

| Skill or collection | Registry signal | Coverage | Assessment |
| --- | ---: | --- | --- |
| [`wshobson/agents@godot-gdscript-patterns`](https://skills.sh/wshobson/agents/godot-gdscript-patterns) | 13.5K installs; registry showed three passing audits | Typed GDScript architecture, signals, state, resources, pooling, scenes, saves | Best focused seed for code patterns. It does not cover editor operation, art direction, visual QA, shaders, or complete production. |
| [`thedivergentai/gd-agentic-skills@godot-master`](https://github.com/thedivergentai/gd-agentic-skills) | 2.3K installs; 489-star repo | 97 Godot 4.7+ domain skills and 27 genre blueprints; Analyst/Auditor/Builder personas | Broadest Godot-specific library found. Useful as a taxonomy, but large context, strong marketing language, and LGPL-3.0 licensing make selective study safer than copying or installing all modules. |
| [`zate/cc-godot@godot-ui`](https://skills.sh/zate/cc-godot/godot-ui) | 2.3K installs; 17-star repo | Control nodes, responsive anchors/containers, themes, focus/gamepad UI | Useful checklist; shallow adoption evidence at repository level. The sibling `godot-development` skill had a failed registry audit, so audit each module independently. |
| [`jwynia/agent-skills@godot-best-practices`](https://skills.sh/jwynia/agent-skills/godot-best-practices) | about 2K installs; 141-star collection | Godot 4.x GDScript structure and review | Reasonable second opinion. Explicitly excludes C#, Godot 3, and GDExtension. |
| [`gamedev-skills/awesome-gamedev-agent-skills`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills) | Godot modules about 889–926 installs; router 1K; 455-star repo | 15 version-pinned Godot 4.7 skills plus cross-engine disciplines and genres | Best modular taxonomy. Focused files for GDScript, scenes, resources, physics, UI, animation, shaders, 3D, audio, multiplayer, export, and C# reduce context overload. Apache-2.0 is friendly for studying with attribution, but facts still need official-doc verification. |
| [`jwynia/agent-skills@godot-asset-generator`](https://github.com/jwynia/agent-skills) | 920 installs | AI-assisted 2D sprites, tiles, UI assets, animation frames, import prep | Relevant to a texture pipeline, but provider calls, style consistency, licensing, provenance, alpha cleanup, atlasing, and in-game validation need explicit gates. |
| [`gamedev-skills/...@godot-shaders`](https://skills.sh/gamedev-skills/awesome-gamedev-agent-skills/godot-shaders) | 925 installs | Godot 4.7 `canvas_item` and `spatial` shader patterns | Good compact engine-language guide. It cannot substitute for technical-art direction, reference matching, GPU profiling, or cross-renderer/device validation. |
| [`gamedev-skills/...@godot-animation`](https://skills.sh/gamedev-skills/awesome-gamedev-agent-skills/godot-animation) | 926 installs | AnimationPlayer, AnimationTree, blend spaces, Tween | Useful implementation guide; skeletal import, retargeting quality, motion readability, timing, and game feel remain gaps. |
| [`thedivergentai/...@godot-testing-patterns`](https://github.com/thedivergentai/gd-agentic-skills) | 301 installs | Godot testing patterns | Low enough adoption to treat as research input, not authority. Pair with actual GUT/GdUnit4 docs. |
| [`LuigiDeFacci/godot-create-3d-assets`](https://github.com/LuigiDeFacci/godot-create-3d-assets) | 13 stars, 3 commits; not surfaced among top CLI results | MCP-driven stylized 3D asset construction, collision/navigation/performance checks, multi-angle review | A promising workflow example because it demands structural and visual evidence. Very new and depends on a compatible MCP plus silent rendering; not production-proven. |
| [`mansyar/gd-tools`](https://github.com/mansyar/gd-tools) skill | 2 stars; created July 2026 | Agent instructions for a CLI wrapping GUT/gdtoolkit and custom GDScript coverage | Interesting coverage experiment, but its “production-quality” coverage statement is a maintainer claim with minimal independent adoption. Do not make it a required dependency yet. |

Representative install commands from the registry (documented only; not run):

```bash
npx skills add https://github.com/wshobson/agents --skill godot-gdscript-patterns
npx skills add gamedev-skills/awesome-gamedev-agent-skills@router
npx skills add gamedev-skills/awesome-gamedev-agent-skills@godot-shaders
npx skills add gamedev-skills/awesome-gamedev-agent-skills@godot-animation
npx skills add https://github.com/jwynia/agent-skills --skill godot-best-practices
npx skills add https://github.com/jwynia/agent-skills --skill godot-asset-generator
npx skills add thedivergentai/gd-agentic-skills/skills/godot-master
```

Do not use `--all` on `gd-agentic-skills`; its own README warns that loading every module creates a “context storm.” For any future installation, pin a reviewed commit/tag, record the license and hashes, inspect all referenced scripts/assets, and install project-locally before considering global use.

### Skill-library conclusion

**Verified:** the ecosystem has abundant API/pattern knowledge. **Inference:** it is weakest exactly where polished games fail—creative direction, composition, interaction design, animation timing, encounter design, player onboarding, cohesive materials, texture fidelity, sound direction, and ruthless visual/playtest review. Our library should use external skills as an index of topics, not as a substitute for an art director or game designer.

## Godot MCP and editor-bridge survey

All entries below are community projects. “Tools/operations” numbers are maintainer-reported and may count differently. GitHub/release data is a 2026-08-09 snapshot.

| Project | Verified surface | Maturity signal | Security/constraints | Research verdict |
| --- | --- | --- | --- | --- |
| [NPGameDev Godot MCP Toolkit](https://github.com/NPGameDev/godot-mcp-toolkit) | Godot 4.2–4.7; 112 tools/150+ operations; scenes, scripts, resources, TileMap, animation, LSP/DAP, screenshots, input, runtime, undo, extensions; multiple editors/clients | v1.0.0 (2026-07-26), 18 stars, 849 repo commits; Asset Store marks first release **unstable** | Loopback only, random session token, project/user path boundaries, read-only mode, audit log, export stripping, no telemetry claimed | Best design and most explicit evidence. Pilot first in a disposable project; do not mistake large internal test claims for independent production history. |
| [hi-godot/Godot AI](https://github.com/hi-godot/godot-ai) | Godot 4.5+; about 43 tools/120+ operations; scenes, nodes, scripts, UI, materials, animations, particles, cameras, environments; in-editor test framework | v3.1.3 (2026-08-07), about 1.5K stars, 703 commits, actively pushed | HTTP binds `127.0.0.1` by default; editor WebSocket is unauthenticated but loopback-only; optional LAN allowlist; Python/uv bridge | Strongest adoption and active development. Good alternate pilot; verify undo behavior, mutation gating, filesystem boundaries, and test isolation before choosing it. |
| [satelliteoflove/godot-mcp](https://github.com/satelliteoflove/godot-mcp) | Godot 4.5+; 21 tools/86 actions; structured runtime state, real input, profiler, screenshots, deterministic freeze/step/step-until, version-matched docs | v4.1.0 (2026-06-20), 139 stars | Loopback WebSocket; read/write tool split and `--read-only`; one editor serves one client at a time; `godot_exec` runs GDScript in the game | Best specialized QA/playtest design. Strong candidate for a validation agent, but single-client editor access must be serialized. |
| [tomyud1/godot-mcp](https://github.com/tomyud1/godot-mcp) | File, scene, script, runtime, input, screenshots, resource and project operations through Node server + addon | v0.5.0 (2026-04-21), 405 stars; no push after April in API snapshot | `npx -y godot-mcp-server` plus AssetLib plugin; broad write access requires source audit | Established relative to many alternatives, but newer active projects now expose stronger testing/security evidence. Keep as fallback, not first pilot. |
| [IvanMurzak/Godot-MCP](https://github.com/IvanMurzak/Godot-MCP) | C# editor addon; 42 tools, GDScript/C#, nodes/scenes/resources, screenshots, reflection escape hatch; shared Unity/Godot backend | v0.20.1 (2026-07-28), 207 stars, active | Default mode connects to `ai-game.dev` via OAuth and stores a machine credential; self-hosted/custom mode exists; reflection greatly expands authority | Best fit for a .NET-heavy, Unity-adjacent experiment. Use only after privacy review; prefer self-hosted mode and disable unrestricted reflection. |
| [regiellis/godot-mcp-go](https://github.com/regiellis/godot-mcp-go) | Godot 4.7+ only; Go CLI, editor addon, runtime/input, GDScript and C#, hundreds of commands, UndoRedo | v0.8.1 published around the snapshot, 37 stars; very new public mirror | Default typed MCP surface is stated to cost about 50K tokens; generic-tool mode reduces it; no pre-4.7 support | Interesting CLI-first architecture and language breadth. Too new and too large a default tool surface for the initial standard. |
| [slangwald/godot-mcp](https://github.com/slangwald/godot-mcp) | Godot 4.6, Python bridge, TCP editor/runtime ports, base64 PNG, input and tree access | 3 stars, last push February 2026 | Local TCP ports 9500/9501; game autoload required | Useful small reference implementation, insufficient maturity for standardization. |
| [fernforestgames/mcp-server-godot-editor](https://github.com/fernforestgames/mcp-server-godot-editor) | Godot 4.5 editor as the stdio MCP process; play/stop, WebP screenshots, input/click | 5 stars, last push January 2026 | Narrow tool set, plugin must be enabled | Elegant minimal observation/control reference, not a full creation stack. |
| [alexmeckes/godot-mcp](https://github.com/alexmeckes/godot-mcp) | 99 advertised tools, file editing without plugin, optional WebSocket bridge, presets for shaders and authoring | 27 stars, last push March 2026 | Must build Node server; broad surface; companion skill recommended by maintainer | Good catalog of possible operations, but adoption/activity trail the leading choices. |
| [ee0pdt/Godot-MCP](https://github.com/ee0pdt/Godot-MCP) | Early general-purpose Godot MCP | 603 stars but no tagged release; last push March 2025 | Older APIs and limited maintenance evidence | Historically influential, currently a poor default because popularity is stale. |

Representative setup shapes from the maintainers (documented only; not executed):

```jsonc
// Godot MCP Toolkit: install/enable the addon, then place this in project .mcp.json.
// Replace the floating package with an exact reviewed version before real use.
{
  "mcpServers": {
    "godot-mcp-toolkit": {
      "command": "npx",
      "args": ["-y", "@npgamedev/godot-mcp-server"]
    }
  }
}
```

```bash
# Godot AI: install/enable addons/godot_ai, then use its generated Codex entry.
# The maintainer's launcher shape pins the Python package version.
uvx --link-mode copy --from 'godot-ai==<reviewed-version>' \
  godot-ai attach --port 8000 --ws-port 9500

# Satellite: install its addon into one project, then enable it in Project Settings.
npx @satelliteoflove/godot-mcp --install-addon /absolute/path/to/project

# IvanMurzak: .NET-oriented CLI flow; cloud login is optional and requires privacy review.
npm install -g godot-cli
godot-cli install-plugin /absolute/path/to/project
godot-cli setup-mcp AGENT_ID /absolute/path/to/project
```

“Use” should begin with one read-only probe: editor version, project path, active scene, and bridge permissions. Only after those values match the intended disposable project should mutation tools be enabled.

### Pilot recommendation

Run two time-boxed, isolated evaluations rather than selecting from README claims:

1. **Godot MCP Toolkit:** evaluate installation reproducibility, read-only mode, undo fidelity, multi-worktree routing, LSP diagnostics, animation/TileMap mutations, screenshots, and whether its audit log proves exactly what changed.
2. **Godot AI:** run the identical task suite and compare latency, context cost, scene fidelity, crash recovery, mutation boundaries, and client configuration.
3. If neither gives deterministic gameplay verification, test `satelliteoflove/godot-mcp` as the QA bridge, not a second simultaneous writer.

Use a fixed benchmark project containing:

- one 2D room with TileMap, collision, navigation, UI, input, particles, animation, and sound;
- one 3D room with imported glTF, collision, navigation, lights, WorldEnvironment, shader material, animation, and camera;
- broken scripts/resources for diagnostic recovery;
- deterministic gameplay scenarios and screenshot viewpoints;
- GUT/GdUnit4 tests and export presets.

Score task completion from repository diffs, editor reload, test results, runtime state, screenshots, performance captures, and exported builds. Do not score natural-language confidence.

## Testing, builds, and exports

### Community test runners

**GdUnit4** is the strongest general test candidate found. Its source documents GDScript and C# tests, assertions, mocking/spying, fuzzing, parameterized tests, a scene runner capable of simulated mouse/keyboard/touch/action input, flaky-test handling, orphan detection, HTML/JUnit reports, CLI execution, and a GitHub Action. Version 6.2 supports Godot 4.5–4.7. Snapshot: about 1.2K stars and active development. See [GdUnit4's compatibility and features](https://github.com/godot-gdunit-labs/gdUnit4#readme).

**GUT** is older and more widely adopted for GDScript. It offers assertions, doubles/stubs/spies, parameterized tests, a CLI, and JUnit output. Its README maps releases to exact Godot minors; use the matching branch/release rather than `main` blindly. Snapshot: about 2.7K stars and nearly ten years of history. See [GUT's version table and CLI links](https://github.com/bitwes/Gut#readme).

Representative runner commands after installing the matching addon release:

```bash
# GdUnit4; its runner also builds a .NET project when applicable.
./addons/gdUnit4/runtest.sh --godot_binary /absolute/path/to/godot

# GUT; load options from the project's .gutconfig.json and exit when finished.
godot -d -s --path /absolute/path/to/project addons/gut/gut_cmdln.gd -gexit
```

See the current [GUT command-line reference](https://gut.readthedocs.io/en/latest/Command-Line.html) and the [GdUnit4 repository instructions](https://github.com/godot-gdunit-labs/gdUnit4/blob/master/AGENTS.md); exact commands must match the pinned framework release.

Godot's built-in `--test` is for engine unit tests and requires an engine compiled with `tests=yes`; it is not the application-test runner in a normal editor binary.

### Official command-line playbook

These capabilities are documented in the official [Command line tutorial](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html). Exact flags must be checked with the pinned binary's `--help`; Godot warns that unknown arguments can be silently ignored.

```bash
# Identify and import with the pinned editor.
godot --version
godot --headless --path /absolute/project/path --import

# Parse a specific standalone GDScript (not a whole-project proof).
godot --headless --path /absolute/project/path --script res://tools/check.gd --check-only

# Run a project-owned SceneTree/MainLoop script.
godot --headless --path /absolute/project/path --script res://tools/validate_project.gd

# Build C# solutions using the .NET editor build.
godot --headless --path /absolute/project/path --build-solutions
dotnet build /absolute/project/path/Game.csproj

# Run a scene for a bounded number of iterations.
godot --path /absolute/project/path --scene res://tests/playtest.tscn --quit-after 600

# Deterministic capture: fixed simulation FPS and a bounded frame count.
godot --path /absolute/project/path --scene res://capture/showcase.tscn \
  --resolution 1920x1080 --fixed-fps 60 --write-movie capture.avi --quit-after 600

# Export; editor binary, installed templates, existing destination, and matching preset required.
godot --headless --path /absolute/project/path \
  --export-release "Linux" /absolute/project/path/build/game.x86_64
```

Important constraints:

- `--headless` selects the headless display and Dummy audio. It is appropriate for import, logic tests, scripts, server runs, and exports, but does not prove final visuals, input focus, window behavior, or sound.
- Display-bound screenshots and input may need a headed isolated editor/game or a virtual display. Godot MCP Toolkit explicitly says those cases are skipped in its headless CI tier and validated locally.
- `--write-movie` forces fixed-FPS capture and supports a bounded frame count. Use project-owned capture scenes with fixed seeds, camera paths, and state setup rather than desktop screen recording.
- Commit source assets and their `.import` metadata. Do not commit the generated `.godot/` import cache. The official [import process](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/import_process.html) explains this split.
- Export templates are required. Commit `export_presets.cfg`; never commit `.godot/export_credentials.cfg`, which can contain passwords and encryption keys. See [Exporting projects](https://docs.godotengine.org/en/stable/tutorials/export/exporting_projects.html).

## Shaders, materials, textures, and assets

### Verified engine capabilities

- Godot has a GLSL-like shading language with `canvas_item`, `spatial`, `particles`, `sky`, and `fog` use cases; the official [shader documentation](https://docs.godotengine.org/en/stable/tutorials/shaders/index.html) covers screen reading, compute shaders, post-processing, style, and GLSL conversion.
- `Material` is a resource used by visual instances; `ShaderMaterial` binds custom shader code and parameters. See [Material](https://docs.godotengine.org/en/stable/classes/class_material.html).
- VisualShader offers graph editing and generated-code inspection, but the official [VisualShader guide](https://docs.godotengine.org/en/stable/tutorials/shaders/visual_shaders.html) states it does not expose every script-shader feature.
- Godot imports images, scenes, audio, and fonts placed in the project, stores generated data under `.godot/imported`, and supports per-asset/default import settings. glTF and other 3D scene workflows are documented under [Importing 3D scenes](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_3d_scenes/index.html).

### What a useful technical-art skill must add

An API-focused shader skill is insufficient. Our shader/material skill should require:

1. a visual target and references, including what must remain readable during motion;
2. renderer and platform budget (`forward_plus`, `mobile`, or `gl_compatibility`);
3. a dedicated test scene with neutral and production lighting;
4. exposed, named parameters with safe ranges and source-color hints;
5. checks for transparency sorting, depth, normals/tangents, UV scale, mipmaps, texture color space, overdraw, and shader compilation errors;
6. before/after captures at fixed cameras plus motion capture—not a single beauty still;
7. GPU/CPU profiling on the target renderer and low-spec fallback behavior;
8. asset provenance, license, source file, import settings, and attribution records.

Texture/asset skills must cover art direction and production constraints: consistent texel density, palette/value hierarchy, silhouette readability, alpha fringes, seams, compression, mipmaps, normal-map convention, channel packing, atlas padding, LODs, collision, navigation, origin/scale, naming, and reimport behavior. AI-generated assets need provider/model/prompt provenance and a human originality/licensing review; “generated successfully” is not an art-quality gate.

## Recommended multi-agent setups

### Setup A: one shared editor, serialized verification

Best for a small vertical slice:

- **Producer/integrator:** owns the brief, acceptance criteria, task board, engine/plugin pins, budget, changelog, and final merge.
- **Game director/designer:** owns gameplay pillars, reference games, core loop, encounter pacing, controls, onboarding, fail/retry flow, and fun/readability review. Does not accept implementation completion as design completion.
- **Godot architect:** owns project structure, scene/resource contracts, signals, autoload policy, save boundaries, and performance budgets.
- **Gameplay engineer:** owns scripts and isolated gameplay scenes; adds automated tests before integration.
- **Technical artist:** owns shaders, materials, lighting, particles, texture import, animation presentation, and fixed capture scenes.
- **UI/UX and accessibility designer:** owns Control layouts, controller/keyboard focus, HUD information hierarchy, settings, localization stress, contrast, motion comfort, and multiple aspect ratios.
- **QA/playtest agent:** is the only agent allowed to mutate or drive the shared live editor during validation. It reproduces from a clean state, runs tests, simulates input, inspects structured state, captures fixed views, profiles, and records defects.
- **Release agent:** owns clean imports, export templates, platform packages, smoke tests, license/attribution bundles, and artifact hashes.

The producer hands the QA agent an immutable acceptance checklist. QA reports evidence and defects, never silently redesigns the feature. The implementer fixes; QA reruns. This separation prevents an agent from grading its own work from the same assumptions that created it.

### Setup B: parallel worktrees and editor instances

Best when several agents must work at once:

1. Give each writing agent a separate Git worktree and a unique Godot project path.
2. Run a separate editor/MCP instance per worktree, with unique ports/session tokens.
3. Partition ownership by scenes/resources/scripts; shared `project.godot`, autoloads, input maps, export presets, and common resource schemas remain integrator-owned.
4. Merge code and textual resources first. Open the integration worktree in a fresh editor, reimport, and resolve UID/reference conflicts there.
5. Run all tests and captures from the integration worktree. Only integration evidence can approve completion.

Godot MCP Toolkit explicitly claims per-project routing for multiple editors and queued mutations for multiple clients. Satellite's MCP explicitly serves only one client per editor. Even where a bridge serializes calls, Git and design conflicts still require file ownership and producer coordination.

### Setup C: art-direction council plus builder

For a flagship demo, add three non-writing review roles before implementation:

- **Reference analyst:** extracts composition, palette, lighting, camera, motion language, feedback, and interaction principles from legally usable references.
- **Art director:** chooses one coherent direction and writes measurable constraints; rejects style mixtures and generic effects.
- **Player-experience critic:** evaluates the first 30 seconds, control response, goals, risk/reward, readability, emotional arc, and replay desire.

Only after this gate should builder agents create assets or gameplay. Reviewers compare captures and playtest evidence to the approved target at each milestone. This is an inference from the ecosystem gap: current Godot skills teach nodes and shaders far better than taste or game design.

## Security and supply-chain rules

Adopt these before any pilot:

- Use a disposable project and dedicated branch/worktree with no secrets or private production assets.
- Pin the Godot editor, export templates, addon release/commit, MCP launcher package, skill commit, Python/Node/.NET versions, and lockfiles.
- Never use an unpinned `npx -y` or `uvx ...==VERSION` entry in production. Fetch and review first, then use an exact version or local verified executable.
- Inspect `SKILL.md` plus every referenced script, asset, nested instruction, manifest, and post-install step. Automated registry audits are signals, not proof.
- Bind bridges to loopback. Do not expose unauthenticated WebSocket/TCP ports to LAN. Prefer a read-only mode for inspection agents.
- Gate script execution, reflection, arbitrary code, filesystem writes, shell/process launches, addon installation, project settings, autoloads, export credentials, and network access separately.
- Disable or remove MCP/editor plugins when not in use and verify they are absent from release exports.
- Keep credentials outside the project. IvanMurzak's cloud-default integration deserves an explicit privacy/data-flow review before login; prefer a local/self-hosted mode for confidential projects.
- Start every task from a clean status, inspect diffs after every mutation, and use editor UndoRedo only as convenience—not recovery. Git is the recovery boundary.
- Treat `.gd`, `.cs`, `@tool`, EditorScript, GDExtension, imported Blender scripts, and MCP extension tools as executable code.
- Record tool calls and changed paths. A safe integration should be able to answer who changed what, through which authority, and how the result was verified.

## Godot taxonomy to mine, not implement

This list records the discipline coverage that a broad Godot library would require. Do not build
these as Godot skills. Translate only validated needs into Antiky-native jobs and evidence
contracts:

1. `godot-project-intake` — engine/renderer/language/platform pins, project map, addon/license/security inventory.
2. `godot-production` — vision, gameplay pillars, vertical-slice scope, backlog, dependency/risk tracking, milestone and kill criteria.
3. `godot-game-design` — core loop, mechanics, dynamics, progression, encounter design, economy, fail/retry, onboarding, playtest questions.
4. `godot-scene-resource-design` — self-contained scenes, typed resources, ownership, signals, autoloads, UIDs, import-safe authoring.
5. `godot-gdscript` and `godot-csharp` — version-pinned language patterns with compile/parse/runtime evidence.
6. `godot-gameplay-feel` — input buffering, coyote time, acceleration, hit pause, camera response, animation timing, audio/visual feedback, accessibility overrides.
7. `godot-level-design` — metrics, traversal, sightlines, encounter beats, navigation, collision, checkpoints, debugging overlays, playtest paths.
8. `godot-ui-ux-accessibility` — Control containers/themes, focus/navigation, input rebinding, localization, contrast, text scale, safe areas, motion reduction.
9. `godot-animation` — import/retargeting, AnimationPlayer/Tree, state/blend ownership, notifies, root motion, readability, transition and interruption tests.
10. `godot-technical-art` — renderer budgets, lighting, environment, post, particles, profiling, fallback tiers, art-direction review.
11. `godot-shaders-materials` — shader test harnesses, uniforms, color space, transparency/depth, renderers, GPU budgets, visual regression views.
12. `godot-textures-assets` — provenance, licenses, style bible, texel density, compression/mips, normals, atlases, 3D scale/origin/LODs/collision/navigation.
13. `godot-audio` — buses, loudness, spatial audio, feedback hierarchy, accessibility, platform/device tests.
14. `godot-testing-playtest` — GUT/GdUnit4, deterministic seeds, runtime state contracts, input scenarios, screenshot/movie evidence, defect reproduction.
15. `godot-performance` — profiler protocol, frame/memory/draw budgets, representative scenes, target hardware, regression thresholds.
16. `godot-editor-automation` — MCP capability discovery, read/write permissions, UndoRedo, port/session isolation, safe EditorScript/tool scripts.
17. `godot-export-release` — imports, templates, credentials, platform matrix, clean builds, smoke tests, symbols, signing/notarization boundaries, artifact hashes.
18. `godot-visual-approval` — reference comparison, fixed cameras, motion review, aspect ratios, capture quality, rejection criteria, human sign-off.

A comparable skill system would need to declare:

- supported Godot versions, renderers, languages, and platforms;
- authoritative sources and last verification date;
- exact files/tools it may read or mutate;
- prerequisites and incompatible addons;
- an observable definition of done;
- commands/tests/captures required as evidence;
- rollback procedure and known failure modes;
- security and asset-license boundaries;
- routing to adjacent skills so only the necessary context loads.

## Gaps requiring original research

The surveyed ecosystem does not yet provide convincing, independently validated solutions for:

- art direction and coherent taste rather than shader/particle accumulation;
- sustained fun, difficulty curves, encounter pacing, economy, and player motivation;
- high-quality character animation, retargeting, cinematic staging, and camera language;
- texture/material fidelity across real assets and target hardware;
- audio direction and mix as part of game feel;
- reliable visual regression across renderers/GPUs without brittle pixel equality;
- full controller, keyboard/mouse, touch, localization, accessibility, and safe-area matrices;
- asset provenance and legal review for generated, downloaded, or remixed content;
- multi-agent conflict resolution across editor-owned resources and shared project settings;
- empirical comparisons of Godot MCPs on the same non-trivial benchmark;
- secure, permission-scoped runtime code execution; most useful bridges eventually expose very broad authority;
- production evidence beyond small games built in a single agent session.

These gaps should inform first-class Antiky skills and evaluation suites. The strategic opportunity
is not an encyclopedia of Godot nodes; it is an Antiky production system that forces agents to
demonstrate a coherent game, not merely syntactically valid work.

## Primary sources

- [Godot stable command-line tutorial](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html)
- [Godot resources](https://docs.godotengine.org/en/stable/tutorials/scripting/resources.html)
- [Godot scene organization](https://docs.godotengine.org/en/stable/tutorials/best_practices/scene_organization.html)
- [Godot scripting and languages](https://docs.godotengine.org/en/stable/tutorials/scripting/index.html)
- [Godot C#/.NET notes](https://docs.godotengine.org/en/stable/tutorials/scripting/c_sharp/index.html)
- [Godot editor code safety](https://docs.godotengine.org/en/stable/tutorials/plugins/running_code_in_the_editor.html)
- [Godot plugin installation](https://docs.godotengine.org/en/stable/tutorials/plugins/editor/installing_plugins.html)
- [Godot import process](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/import_process.html)
- [Godot shader documentation](https://docs.godotengine.org/en/stable/tutorials/shaders/index.html)
- [Godot VisualShaders](https://docs.godotengine.org/en/stable/tutorials/shaders/visual_shaders.html)
- [Godot exporting projects](https://docs.godotengine.org/en/stable/tutorials/export/exporting_projects.html)
- [skills.sh Godot GDScript patterns](https://skills.sh/wshobson/agents/godot-gdscript-patterns)
- [Godot Agentic Skills source](https://github.com/thedivergentai/gd-agentic-skills)
- [Awesome GameDev Agent Skills source](https://github.com/gamedev-skills/awesome-gamedev-agent-skills)
- [Godot MCP Toolkit source](https://github.com/NPGameDev/godot-mcp-toolkit) and [Asset Store record](https://store.godotengine.org/asset/npgamedev/godot-mcp-toolkit/)
- [Godot AI source](https://github.com/hi-godot/godot-ai)
- [Satellite of Love Godot MCP source](https://github.com/satelliteoflove/godot-mcp)
- [IvanMurzak Godot-MCP source](https://github.com/IvanMurzak/Godot-MCP)
- [GdUnit4 source](https://github.com/godot-gdunit-labs/gdUnit4)
- [GUT source](https://github.com/bitwes/Gut)
