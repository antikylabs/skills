# Unity agent skills and editor automation research

Research snapshot: 2026-08-09

> **Antiky scope:** Unity is a comparative source only. Antiky Labs is not building a Unity skill
> or adapter roadmap. Mine this report for structured CLI results, build/test evidence, serialized
> asset safeguards, reload barriers, runtime observation, and scoped editor authority; translate
> useful patterns into Antiky Framework, BroMetal, CLI/MCP, or Studio.

## Comparative findings

A well-bounded Unity automation system separates two layers; Antiky should preserve the same
separation in its own architecture:

1. **Knowledge and workflow skills**: game design, Unity architecture, art direction, Shader Graph, asset import, testing, performance, build/release, and production discipline.
2. **A narrow execution adapter**: the smallest reviewed tool surface that observes the running Editor, performs approved mutations through Unity APIs, runs tests, enters Play mode, captures the Game view, and returns structured results.

The strongest Unity reference surfaces found are:

- Start with the first-party [`Unity-Technologies/skills`](https://github.com/Unity-Technologies/skills) collection and the official, experimental [Unity CLI + Pipeline package](https://docs.unity.com/en-us/unity-cli). They provide an authoritative vocabulary, structured output, explicit exit codes, local Editor control, custom commands, and live C# evaluation.
- Evaluate Unity's [official MCP server](https://unity.com/blog/unity-ai-mcp-how-to-get-started) when a managed MCP integration is preferable. It has client approval and a Unity-provided relay, but is still beta, requires Unity 6+, the Assistant package, terms acceptance, and a Cloud-linked project according to current setup documentation.
- Evaluate [CoplayDev/unity-mcp](https://github.com/CoplayDev/unity-mcp) as the leading mature open-source MCP alternative. It has the strongest adoption signal found, broad Editor coverage, test/build/profiling support, security documentation, and multi-instance routing.
- Evaluate [Besty0728/Unity-Skills](https://github.com/Besty0728/Unity-Skills) in an isolated test project if the library needs first-class Shader Graph, texture, material, prefab, transactional rollback, dry-run, and approval-aware operations. Its breadth is exceptional, but its very large tool surface and project claims need independent validation.
- Use [Unity CLI Loop](https://github.com/hatayama/unity-cli-loop) or [Funplay MCP for Unity](https://github.com/FunplayAI/funplay-unity-mcp) as references for the missing closed-loop playtest layer: input simulation, screenshots, logs, Play mode, and runtime verification.
- Mine [nowsprinting/unity-coding-skills](https://github.com/nowsprinting/unity-coding-skills) for its test-first subagent split, not as a cross-agent runtime dependency. It is intentionally Claude Code/Rider-specific.

Do **not** select a bridge by tool count. The crucial acceptance test is whether it can repeatedly complete a small vertical slice while preserving scene/prefab integrity, surviving compilation/domain reloads, producing deterministic evidence, and preventing unreviewed destructive operations.

## Research method and confidence labels

This report used:

- skills.sh search and indexed skill pages;
- Unity, JetBrains, GameCI, and MCP authors' current documentation;
- source repositories, README tool catalogs, licenses, and visible repository activity;
- no installations and no live Unity execution.

Labels used below:

- **Verified**: directly stated by official documentation or inspectable source repository documentation.
- **Publisher claim**: stated by a project's author but not independently tested here.
- **Inference**: a conclusion drawn from the verified facts; it is explicitly labeled.

Repository stars and skill install counts are volatile discovery signals, not quality proof. Counts are the values visible during this research snapshot.

## Capability map

| Need | Best current candidates | Status |
| --- | --- | --- |
| First-party Unity workflow knowledge | `Unity-Technologies/skills` | Official; young but authoritative |
| Install Editors/modules and operate CI | Official Unity CLI | Experimental; structured and promising |
| Local Editor/API execution | Official Pipeline package | Experimental; token-gated live `eval` |
| Managed MCP from an external agent | Official Unity MCP server | Open beta; Unity 6+ |
| Mature open-source general MCP | CoplayDev `unity-mcp` | High adoption; broad tools |
| Broad skills + safe mutation primitives | Besty0728 `Unity-Skills` | Very broad; validate independently |
| Closed-loop gameplay/input/screenshots | Unity CLI Loop; Funplay; Signal Loop | Strong feature fit; lower maturity than Coplay |
| Minimal typed CLI | akiojin `unity-cli` | Promising, lower adoption |
| IDE analysis/refactoring/test bridge | Rider MCP + Unity extension | Strong if Rider is already standard |
| CI tests and cross-platform builds | Unity CLI/batch mode; GameCI; Unity Build Automation | Mature options with licensing constraints |
| Shader/Shader Graph/material automation | Besty0728; custom official Pipeline commands | Major gap in most general MCPs |
| Texture/import pipeline automation | Besty0728; Funplay; custom `AssetImporter` commands | Platform profiles still need project policy |
| Game design/art/production knowledge | Community skills plus internal skills | Execution bridges do not solve this |

## First-party skills and execution surfaces

### Unity-Technologies/skills

Source: [GitHub](https://github.com/Unity-Technologies/skills), [skills.sh collection](https://www.skills.sh/unity-technologies/skills)

**Verified facts**

- The repository is owned by Unity Technologies and describes itself as reusable skills for Unity workflows.
- The current repository README lists skills for new-project setup, the Unity CLI, package management, live-game services, IAP, ads, and the three Unity UI families: UI Toolkit, uGUI, and IMGUI.
- The skills.sh index reported roughly 1,000 total installs when indexed; the individual `unity-cli` page later showed about 1,100 installs. This inconsistency is likely rapid index growth or caching, so exact counts should not be treated as stable.
- GitHub showed about 210 stars and 35 commits.
- The skills.sh `unity-cli` page showed passes from Gen Agent Trust Hub and Socket but a failure from Snyk; the linked detail page was unavailable during research. The `unity-package-management` page showed passes from all three. This unresolved audit disagreement must be reviewed before installing the full collection; it is not enough evidence by itself to label the repository malicious.
- Installation command:

  ```bash
  npx skills add Unity-Technologies/skills
  ```

- Individual installation is supported, for example:

  ```bash
  npx skills add https://github.com/unity-technologies/skills --skill unity-cli
  npx skills add https://github.com/unity-technologies/skills --skill unity-package-management
  ```

- The `unity-package-management` skill directs automation through `UnityEditor.PackageManager.Client` instead of manually editing `Packages/manifest.json`.

**Assessment (inference)**

- Best source of first-party vocabulary and safe default workflows.
- It is not yet a complete game-creation skill library. It lacks deep gameplay, animation, audio, lighting, shaders, Shader Graph, textures, level design, UX, art direction, performance, and playtesting roles.
- Adopt as an upstream dependency or reference corpus, then add narrowly scoped internal skills around the missing disciplines.

### Official Unity CLI and Pipeline package

Sources: [CLI documentation](https://docs.unity.com/en-us/unity-cli), [Pipeline package documentation](https://docs.unity.com/en-us/unity-production-pipeline/local-tools-cli/unity-pipeline-package), [Unity announcement](https://unity.com/blog/meet-the-unity-cli)

**Verified facts**

- The CLI is explicitly marked **experimental**.
- It installs/manages Editors and platform modules, opens projects, authenticates, emits JSON or TSV, separates stdout/stderr, and uses documented exit codes.
- The Pipeline package requires Unity 6.0+ and exposes a local HTTP API for builds, tests, development workflows, and custom commands.
- A static C# method becomes discoverable using `[CliCommand]`; parameters use `[CliArg]`.
- `unity command eval` and `eval_file` compile and execute C# on the Editor main thread without creating a project script or causing a domain reload.
- Unity says `eval` is gated by a security token. A development Player can expose the same API, but the runtime endpoint is localhost-only, disabled by default, and intended for development/QA rather than production.
- Common setup commands:

  ```bash
  # macOS/Linux beta installer; review downloaded scripts before use in a real environment
  curl -fsSL https://public-cdn.cloud.unity3d.com/hub/prod/cli/install.sh \
    | UNITY_CLI_CHANNEL=beta bash

  # or managed by Homebrew
  brew install --cask unity-cli

  unity --version
  unity install lts -m ios android webgl
  unity open ./MyProject
  unity auth login
  unity pipeline install
  unity pipeline list
  unity command
  ```

**Assessment (inference)**

- This is the best execution substrate on which to build internal agent skills because it is first-party, local, self-describing, scriptable, and agent-friendly.
- It is not a complete safety sandbox. Arbitrary C# has the same practical reach as the Editor API, so the internal library should expose reviewed project-specific commands for routine mutations and reserve `eval` for approved inspection or exceptional work.
- Its experimental status requires version pinning and contract tests around command discovery, auth, JSON schemas, domain reloads, and exit codes.

### Official Unity MCP server

Sources: [getting-started article](https://unity.com/blog/unity-ai-mcp-how-to-get-started), [Unity AI tools overview](https://unity.com/features/ai?trial=true)

**Verified facts**

- The official server ships with the `com.unity.ai.assistant` package and requires Unity 6.0+.
- Current setup documentation lists a Unity Cloud-linked project and the Assistant package as prerequisites.
- The initial connection is presented to the user for approval. Approved clients can reconnect later.
- Its relay binary lives under `~/.unity/relay/`; manual configuration starts the relay with `--mcp`.
- Tool categories documented by Unity include scene management, GameObjects/components, script editing, console access, and build settings. Teams can register custom C# tools.
- The current product FAQ says the MCP server is free, has no concurrency limit, and consumes no Unity AI credits. An earlier May 2026 setup article still mentions an active trial/subscription. Treat the current FAQ as newer policy but verify it at adoption time.
- The product remains in open beta and its availability/behavior may change.

**Assessment (inference)**

- Best managed MCP choice for Unity 6+ teams that accept the Assistant package, Cloud-linking, beta terms, and a closed-source execution surface.
- Not sufficient evidence yet for Shader Graph editing, input simulation, visual regression, profiler capture, or release builds. Add custom tools or pair it with first-party CLI commands.

## Open-source Editor bridges and MCP servers

### CoplayDev/unity-mcp — leading general open-source MCP candidate

Source: [GitHub](https://github.com/CoplayDev/unity-mcp)

**Verified facts**

- About 13.3k GitHub stars, 1.4k forks, recent tagged releases, MIT license, security policy, and an MCP Registry listing.
- Supports Unity 2021.3 LTS through Unity 6.x, with Python 3.10+ and `uv` for the local server.
- Publisher documents 47 focused MCP entrypoints covering assets, scenes, scripts, tests, profiling, and builds.
- Documents multi-instance routing, tool groups, Roslyn validation, and authenticated remote hosting.
- Installation:

  ```text
  Unity Package Manager → Add package from Git URL:
  https://github.com/CoplayDev/unity-mcp.git?path=/MCPForUnity#v10.0.0
  ```

  Or, after configuring OpenUPM:

  ```bash
  openupm add com.coplaydev.unity-mcp
  ```

**Assessment (inference)**

- Strongest third-party default for a broad proof of concept.
- Prefer a version tag, local-only transport, and explicit tool groups. Do not deploy its remote mode until authentication and network boundaries are tested.
- Missing or unclear from public evidence: robust input simulation, Shader Graph node authoring, material/texture art-direction workflows, and deterministic visual regression.

### IvanMurzak/Unity-MCP — broad tools, generated skills, runtime option

Source: [GitHub](https://github.com/IvanMurzak/Unity-MCP)

**Verified facts**

- About 3.8k stars, 349 forks, 3,000+ commits, Apache-2.0 license, and 70+ documented tools.
- Tools cover assets, prefabs, scenes, screenshots, scripts, Roslyn execution, tests, and profiling; optional packages add animation, Cinemachine, Input System, Navigation, particles, ProBuilder, splines, terrain, tilemaps, and Timeline.
- Supports tool allowlisting plus stdio or HTTP transport, and documents token/OAuth modes for hosted use.
- Installation alternatives:

  ```bash
  openupm add com.ivanmurzak.unity.mcp
  # or without a global install
  npx unity-mcp-cli install-plugin ./MyUnityProject
  npx unity-mcp-cli setup-skills codex ./MyUnityProject
  ```

**Assessment (inference)**

- Strong reference for extensibility, runtime debugging, profiler tools, and skill generation.
- Its optional OAuth/cloud flow and ability to execute arbitrary C# increase the security and operational review burden.
- It exposes shader inspection/listing and material creation, but public evidence does not show rich Shader Graph node authoring.

### Besty0728/Unity-Skills — widest art/asset coverage and strongest mutation guardrails found

Sources: [GitHub](https://github.com/Besty0728/Unity-Skills), [skills.sh example](https://www.skills.sh/besty0728/unity-skills/unity-blueprints)

**Verified facts**

- About 1.6k stars, 152 forks, 524 commits, MIT license, active changelog, and a stated Unity 2022.3+ maintenance baseline.
- Publisher documents 784 REST operations across 54 functional modules and 24 advisory modules.
- The tool catalog explicitly includes:
  - 23 Shader Graph operations for create, inspect, blackboard editing, and constrained node editing;
  - 21 material operations including PBR, emission, keywords, and batch changes;
  - 11 shader operations including creation, URP templates, compilation checks, and variant analysis;
  - texture/model/audio/sprite import operations and platform settings;
  - prefabs, ProBuilder, URP, volumes, post-processing, lighting, Cinemachine, animation, terrain, Timeline, UI, tests, profiler, validation, and builds.
- It documents plan/dry-run modes, per-operation risk metadata, approvals, JSONL audit logs, content-addressed snapshots, task rollback, batch operations, and multi-instance discovery.
- Stable installation:

  ```text
  Unity Package Manager → Add package from Git URL:
  https://github.com/Besty0728/Unity-Skills.git?path=/SkillsForUnity#v2.4.3
  ```

- skills.sh indexes its individual knowledge skills, but most have low individual install counts. The underlying repository adoption is a more meaningful signal than any one indexed leaf skill.

**Publisher claims needing validation**

- “96% token reduction,” “transactional atomicity,” and “anti-hallucination guardrails” are project claims, not independently reproduced here.
- “Constrained node editing” should be tested against the exact Shader Graph and render-pipeline versions the project will use.

**Assessment (inference)**

- Highest-priority isolated evaluation for technical-art and asset-pipeline automation.
- The 784-operation surface is too large to expose wholesale. Start in approval mode with a small allowlist; measure schema/token overhead and disable unused modules.

### Unity CLI Loop — best focused closed-loop playtest reference

Source: [GitHub](https://github.com/hatayama/unity-cli-loop)

**Verified facts**

- About 500 stars, 44 forks, MIT license, Unity 2022.3+, Node 22+, and 17 bundled skills.
- Supports compile/log/test loops, hierarchy and object queries, screenshots, physics raycasts, Play mode control, keyboard/mouse/UI input simulation, input recording/replay, and dynamic C#.
- The project now recommends its CLI and says its MCP connection may be deprecated.
- Installation:

  ```text
  Unity Package Manager → Add package from Git URL:
  https://github.com/hatayama/unity-cli-loop.git?path=/Packages/src
  ```

  ```bash
  npm install -g uloop-cli
  uloop skills install --codex
  ```

- Project-level permission and tool settings can be shared, while runtime outputs are intended to remain ignored.

**Assessment (inference)**

- Excellent design reference for the QA/playtester subagent and proof loop.
- Not the best single bridge for shader/material/texture creation or production builds.
- Dynamic code and OS window-focus tools should be withheld unless explicitly required.

### Funplay MCP for Unity — rich play mode, profiler, and prefab coverage

Source: [GitHub](https://github.com/FunplayAI/funplay-unity-mcp)

**Verified facts**

- About 212 stars, 14 forks, MIT license, Unity 2022.3+, no external daemon required for its core in-process HTTP server.
- Provides 34 tools in the default core profile or 156 in the full profile.
- Covers scene/prefab/asset/material/import manipulation, Play mode, screenshots, simulated input, compilation, tests, performance counters, memory snapshots, frame debugging, and Undo/Redo.
- `execute_code` compiles C# in memory. The default filesystem guard blocks some destructive patterns but the author explicitly states it is not a complete sandbox, can be overridden per call, and tools have no additional approval toggle.
- Installation:

  ```text
  Unity Package Manager → Add package from Git URL:
  https://github.com/FunplayAI/funplay-unity-mcp.git
  ```

  Or:

  ```bash
  openupm add com.gamebooom.unity.mcp
  ```

**Assessment (inference)**

- Strong evaluation candidate when input simulation, screenshots, profiler analysis, and field-level prefab editing are decisive.
- The missing approval gate is a serious concern. Keep the default core profile, bind only to `127.0.0.1`, and depend on client-side approvals plus clean Git checkpoints.

### CoderGamester/mcp-unity — established Node/WebSocket bridge

Source: [GitHub](https://github.com/CoderGamester/mcp-unity)

**Verified facts**

- About 1.9k stars, 237 forks, MIT license, Unity 2022.3+, Node 18+, npm 9+.
- Scene/GameObject tools, menu execution, script/test operations, customizable C# and TypeScript tools, and project-local Codex configuration are documented.
- The Unity bridge listens on WebSocket port 8090. Localhost is the default; a setting can bind it to `0.0.0.0` for remote access.
- Domain reload stops the Unity-side server; long work can block the Unity main thread.

**Assessment (inference)**

- Mature alternative with a conventional architecture and useful implementation documentation.
- Do not enable remote connections by default. Its domain-reload behavior needs explicit recovery tests.

### Smaller focused options

| Project | Verified strengths | Main concern |
| --- | --- | --- |
| [akiojin/unity-cli](https://github.com/akiojin/unity-cli) | Rust binary, 101 typed APIs, 14 skills, dry-run, scenes/prefabs/assets/tests/UI, 83 stars, MIT | Auto-update defaults and lower adoption; not Unity's official CLI despite the name |
| [Signal-Loop/UnityCodeMCPServer](https://github.com/Signal-Loop/UnityCodeMCPServer) | File-backed bridge survives network issues; Play mode, Input System actions, Game-view screenshot, tests; skills included | 16 stars; arbitrary C# runs with Editor privileges; bundled Roslyn DLL GUID conflicts documented |
| [nuskey8/UnityAgentClient](https://github.com/nuskey8/UnityAgentClient) | ACP client inside Unity, asset/context attachments, built-in MCP, 273 stars, MIT | Only two visible commits; ACP adapters add dependencies; author advises against in-Editor code editing due domain reload |
| [JetBrains Rider MCP + Unity extension](https://plugins.jetbrains.com/plugin/30357-mcp-server-extension-for-unity) | No per-project MCP package; tests, Editor scripts, compilation, Play mode; Rider's IDE analysis/refactoring tools | Requires Rider; Unity extension is third-party and very new; recommended Rider 2026.2+ |

## Skills.sh and community knowledge skills

These are useful sources for the planned internal skill library, but should not be confused with Editor-control tools.

### Recommended sources to mine

- [`game-developer`](https://www.skills.sh/jeffallan/claude-skills/game-developer): about 4.3k installs; source repository about 10.8k stars; skills.sh security audits showed passes. It covers gameplay architecture, physics, networking, profiling, game AI, shaders, and 60 FPS validation. It is broad and generic rather than deeply Unity-version-specific.
- [`unity-developer`](https://www.skills.sh/rmyndharis/antigravity-skills/unity-developer): about 2.6k installs and a 1.2k-star source collection. The published skill body is largely a generic expert persona/checklist, so adoption does not imply detailed Unity correctness.
- [`JulianKerignard/Unity-Skills`](https://github.com/JulianKerignard/Unity-Skills): 18 skills for code generation, tests, debug, performance, HLSL/ShaderLab, UI Toolkit, audio, animation, 2D, Addressables, multiplayer, DOTS, and builds. Its visible adoption was very low (about five GitHub stars), many triggers are French, and it should be treated as a pattern library rather than trusted authority.
- [`nowsprinting/unity-coding-skills`](https://github.com/nowsprinting/unity-coding-skills): 18 stars, Unlicense, 62 commits. It includes explicit `test-designer`, `failing-test-writer`, and `test-deduplicator` subagents plus Unity test-design and writing skills. It depends on Claude Code and Rider MCP for its full workflow, but its role separation is excellent source material.
- [`everything-game-dev-code`](https://www.skills.sh/mrcalderon3d/everything-game-dev-code): 107 skills and about 913 total installs, with Unity project structure, gameplay, testing, performance, URP/HDRP, Addressables, builds, editor tooling, plus core-loop design, game feel, level design, art bible, technical art, milestone planning, risk registers, playtest analysis, QA matrices, and release readiness. Individual skills had only single-digit installs. Use it as a taxonomy, not proof of quality.
- [`Unity-SkillForge`](https://www.skills.sh/nlelouche/unity-skillforge): 20 narrow skills and only about 67 total installs. Interesting topics include texture streaming, GPU instancing, replay systems, accessibility, and GC monitoring, but maturity is too low for direct adoption.

### What is missing from public skills

No single reviewed collection found in this search adequately combines:

- a coherent visual target and art bible;
- reference analysis and style matching without copying protected work;
- game-feel tuning and motion/feedback review;
- level-composition and player-readability heuristics;
- Shader Graph authoring with visual comparison and variant/performance checks;
- texture source quality, PBR channel packing, import/compression budgets, and provenance;
- structured playtest observation and iteration;
- producer scope control, milestone gates, and vertical-slice acceptance;
- multi-agent Unity ownership and conflict prevention.

Those disciplines should inform Antiky-native skills rather than a long generic “Unity expert”
prompt or a Unity support library.

## Scene, prefab, code, and Editor automation rules

### Authoritative Unity mechanisms

Unity's current documentation supports these principles:

- Use `AssetDatabase`, `SerializedObject`, `PrefabUtility`, and Editor APIs rather than raw text mutation for routine scene/prefab/asset changes.
- `PrefabUtility` understands prefab assets, instances, variants, overrides, nested prefabs, apply/revert, isolated prefab contents, and reference preservation.
- Keep `.meta` files visible and versioned. Unity uses their GUIDs to connect source assets and references.
- Keep `Library/` out of version control; it is a regenerable import/artifact cache.
- Use Force Text serialization and UnityYAMLMerge for collaboration, but treat hand-editing YAML as an exceptional, high-review operation.
- Batch asset changes using `AssetDatabase.StartAssetEditing` only with `try/finally` or `AssetEditingScope`; a missing `StopAssetEditing` can leave the Asset Database unresponsive.

**Internal skill requirement:** every Editor mutation should return changed asset paths, dirty scenes, created/deleted GUIDs where available, compilation state, and Undo/snapshot identity. A follow-up observation must verify the intended state.

### Domain reload and main-thread constraints

Several bridge authors document the same failure mode: creating or changing project C# triggers compilation and domain reload, which can disconnect or restart the Editor bridge. Unity API calls also generally need the Editor main thread.

The internal execution skill must therefore model a state machine:

1. Observe Editor state and active project instance.
2. Write code through normal file tools.
3. Request compilation.
4. Wait for compilation and domain reload completion.
5. Re-discover/reconnect the Editor tool surface.
6. Read compile errors.
7. Only then mutate serialized references or enter Play mode.

Never assume an earlier instance ID remains valid across reloads or scene changes.

## Shaders, Shader Graph, materials, and textures

### Verified Unity constraints

- [Shader Graph](https://docs.unity3d.com/6000.0/Documentation/Manual/com.unity.shadergraph.html) is a visual shader tool supported by URP and HDRP. Available graph targets and features depend on the installed render pipeline.
- Materials reference a shader plus the data that shader consumes. Built-in, URP, and HDRP shaders are not freely interchangeable; pipeline compatibility must be part of every material task.
- Texture import settings include platform-specific maximum size, format, compression quality, alpha handling, and fallback behavior. A desktop-good texture profile is not automatically suitable for Android, iOS, WebGL, or consoles.
- Shader Graph, `.mat`, prefab, and scene assets participate in Unity serialization and must retain `.meta` GUIDs.

### Candidate coverage

- Besty0728 is the only reviewed bridge that explicitly documents constrained Shader Graph node editing, blackboard editing, shader templates/validation, PBR materials, and platform-aware texture import settings in one surface.
- IvanMurzak exposes shader discovery/introspection and material creation but does not publicly demonstrate rich graph authoring.
- Funplay exposes material properties and asset import settings; custom `execute_code` could reach Shader Graph internals, but that is not a stable or safe public contract.
- The official Unity CLI/Pipeline can execute project-authored Editor commands. This is the preferred long-term approach for a small internal set of versioned Shader Graph/material/texture commands because the team controls the schema, tests, and supported package versions.

### Required technical-art skill gates

Every shader/material/texture task should require:

- Unity version and render pipeline (Built-in/URP/HDRP/custom) identified before editing;
- target platforms and graphics APIs identified;
- visual reference, lighting context, and intended material response defined;
- source textures retained at adequate resolution without upscaling;
- color space and map semantics verified (sRGB for color, linear for data maps);
- normal-map import type, alpha use, wrap/filter/aniso, mipmaps, and platform compression reviewed;
- shader compilation checked for target APIs and variant count measured;
- Frame Debugger/Profiler or equivalent evidence collected;
- screenshots captured under a fixed camera, lighting, exposure, and resolution for before/after comparison;
- a human art-direction approval gate. Automated “looks correct” is insufficient.

## Testing, playtesting, and builds

### Tests

Official [Unity Test Framework](https://docs.unity3d.com/Packages/com.unity.test-framework@1.3/manual/index.html) supports Edit mode and Play mode tests and integrates NUnit. Unity command-line arguments include `-runTests`, `-testPlatform`, `-testResults`, filters, and categories. Tests can also run on target platforms.

Recommended layers:

1. Pure C# unit tests for deterministic rules, math, state machines, and data transforms.
2. EditMode tests for Editor tooling, importers, asset validation, serialization, and prefab contracts.
3. PlayMode tests for scene wiring, physics, lifecycle, UI, animation, and runtime integrations.
4. Scripted input playtests with explicit state assertions.
5. Fixed-condition visual captures used for review or tolerant image comparison, not brittle pixel-perfect approval across different GPUs.
6. Target-device smoke/performance tests for every supported platform class.

### Builds and CI

- Official command-line builds use `-batchmode`, `-quit`, `-projectPath`, a build target/profile, `-executeMethod` for custom scripts, and an explicit log file. See [Unity's build documentation](https://docs.unity3d.com/6000.0/Documentation/Manual/build-command-line.html).
- [GameCI](https://github.com/game-ci/unity-actions) is a mature community option: about 1.1k stars, MIT, and maintained test/build actions. Its current documentation uses `game-ci/unity-test-runner@v4` and `unity-builder@v4`. Unity license material and private registry tokens must be managed as CI secrets.
- [Unity Build Automation](https://docs.unity.com/en-us/build-automation) is Unity's managed Cloud CI option for desktop, mobile, XR, consoles, and WebGL, with supported platform/version constraints and service cost considerations.

**Producer/build skill requirement:** never infer platform readiness from an Editor Play-mode pass. A release candidate needs a clean machine or CI build, packaged artifact, launch smoke test, platform-specific signing/notarization where relevant, performance budget, and archived logs/test results.

## Security and supply-chain assessment

### Common threat model

Most Unity bridges can execute Editor APIs or arbitrary C# with the same operating-system privileges as the Unity Editor. That can change or delete scenes, prefabs, source files, packages, settings, and files outside the project if unrestricted APIs are available. “Localhost” limits network reach but is not a sandbox.

Minimum controls:

1. Install only in a disposable evaluation project first.
2. Pin repository tags or commit SHAs; never track `main` in a production project.
3. Review the Unity package, companion binary/server, install scripts, auto-update behavior, and transitive dependencies.
4. Bind to loopback only. Never enable `0.0.0.0`, remote HTTP, or Cloud hosting without authentication, TLS, firewall rules, and a concrete need.
5. Use client approval plus server-side allowlists. Approval in only one layer is not enough for high-risk tools.
6. Disable arbitrary C#/shell/file execution for routine tasks. Provide reviewed custom commands instead.
7. Start every session from clean version control; checkpoint before scene/prefab/package/build-setting mutations.
8. Keep API keys, Unity credentials, licenses, and agent settings out of source control. Inspect `UserSettings/`, `.env`, bridge caches, logs, and screenshots.
9. Record an audit trail of tool, arguments, project/instance, changed assets, result, and rollback identity.
10. Do not ship Editor bridges, debug HTTP servers, relay tokens, or dynamic evaluation endpoints in production builds.

### Relative security posture

| Candidate | Positive evidence | Principal risk |
| --- | --- | --- |
| Official CLI/Pipeline | Unity-owned; token-gated eval; local API; runtime off by default | Experimental and arbitrary C# remains powerful |
| Official MCP | First-connection approval; Unity relay | Closed/beta surface, Cloud-linked setup, changing terms |
| Coplay | Security policy; local default; tool groups; remote auth docs | Broad mutation surface; Python/server supply chain |
| Besty0728 | Dry-run/plan, risk metadata, approval modes, audit, rollback | Enormous surface; safety claims need adversarial testing |
| Funplay | Default core profile; filesystem guard; Undo template | Guard is explicitly not a sandbox; no extra tool approval |
| CoderGamester | Localhost default, tests, transparent architecture | Can bind all interfaces; domain reload interruption |
| Signal Loop | Explicit same-privilege warning; file-backed bridge | Arbitrary C# and bundled DLL conflicts |
| akiojin | Typed CLI and dry-run | Background auto-update unless disabled |

## Proposed subagent setup

### The single-writer rule

Only one subagent may mutate the live Unity Editor, scenes, prefabs, materials, import settings, packages, or project settings at a time. Other agents may work in parallel on isolated code/test files, research, design docs, or read-only reviews. Serialized Unity assets and a single Editor process are shared mutable state; unconstrained parallel Editor agents will create conflicts, stale instance IDs, domain reload races, and unverifiable results.

### Recommended roles

| Role | Owns | Allowed execution | Required handoff evidence |
| --- | --- | --- | --- |
| Producer/orchestrator | brief, scope, milestones, risk register, acceptance gates | Read-only project status; assigns work | Vertical-slice definition, dependencies, ship/no-ship checklist |
| Game designer | core loop, mechanics, challenge, progression, controls, game feel targets | Read-only playtest; edits design data only when assigned | Testable rules, tuning ranges, success/failure states |
| Art director | visual pillars, references, palette, shape language, composition, quality bar | Read-only visual review | Annotated target board and pass/fail critique |
| Gameplay engineer | C# runtime systems and deterministic tests | Source files, compilation, unit/EditMode tests | Clean compile, tests, known performance implications |
| Unity Editor operator | scenes, prefabs, components, serialized references | Exclusive live-Editor writer using reviewed tools | Change journal, dirty assets, screenshots, console state |
| Technical artist | shaders, Shader Graph, materials, VFX, lighting, texture imports | Exclusive live-Editor slot when active | Pipeline/platform matrix, shader compile/variant data, fixed captures |
| Asset pipeline specialist | source assets, import profiles, LODs, Addressables, provenance | Exclusive asset mutation slot | License/source record, import report, memory/size budget |
| UX/UI designer-engineer | flows, HUD, menus, input/accessibility | UXML/USS/uGUI code; exclusive Editor slot for wiring | Interaction map, focus/controller checks, multi-resolution captures |
| QA/playtester | independent behavior validation and regression | Read-only observation plus approved input simulation | Reproduction steps, state assertions, captures/logs, severity |
| Performance specialist | CPU/GPU/memory/loading budgets and captures | Profiler/read-only diagnostics; isolated tuning branch | Target-device measurements, bottleneck evidence, before/after |
| Build/release engineer | CI, licensing, build profiles, signing, artifacts | Batchmode/CLI/CI only; no design changes | Reproducible build, hashes, logs, smoke tests, platform matrix |

### Suggested workflow

```text
Producer defines one vertical slice and acceptance gates
  -> Designer defines the playable loop and tuning contract
  -> Art director defines a concrete visual target
  -> Gameplay engineer implements code + failing/passing tests
  -> Editor operator wires a minimal scene/prefab slice
  -> Technical artist and asset specialist each take an exclusive mutation turn
  -> QA independently plays scripted and exploratory passes
  -> Performance specialist measures the target build
  -> Producer/art director/game designer approve or reject
  -> Build engineer packages only the approved revision
```

The QA and approval roles should not be the same agent that implemented the feature. Separate observation reduces self-confirming results.

## Comparative evaluation design

This benchmark design is recorded to expose useful evaluation dimensions. It is not an Antiky
roadmap task and should not trigger a Unity bridge pilot.

The benchmark should require the tool to:

1. Inspect a project and report Unity version, render pipeline, packages, open scenes, compile state, and target platform.
2. Create a prefab variant with serialized references without damaging its base prefab.
3. Create/import a material and textures with correct sRGB/normal/data-map and platform overrides.
4. Create a small Shader Graph or a versioned custom shader and verify compilation.
5. Write a deterministic gameplay component and EditMode/PlayMode tests.
6. Survive the resulting domain reload and reconnect to the correct Editor instance.
7. Enter Play mode, simulate input, capture the Game view, read logs, and assert runtime state.
8. Produce profiler/memory evidence and a build for one desktop target plus WebGL or mobile.
9. Report all changed files/assets and undo or roll back the task.
10. Repeat from a clean checkout three times.

Score each candidate on task completion, retries, elapsed time, token/schema overhead, corrupt/stale state, quality of error messages, visual evidence, approval enforcement, rollback accuracy, and reproducibility. A tool that cannot reliably undo or enumerate its changes should not be a default mutator.

## Unity taxonomy to mine, not implement

The following categories show the breadth a serious Unity library would need. Do not implement
them as Unity skills. Translate only recurring, validated jobs into Antiky-native skill boundaries.

Priority 0 — execution safety:

- `unity-project-inspect`
- `unity-editor-session-and-domain-reload`
- `unity-safe-scene-prefab-mutation`
- `unity-change-journal-and-rollback`
- `unity-compile-test-play-verify-loop`
- `unity-build-and-artifact-verification`

Priority 1 — game quality:

- `vertical-slice-producer`
- `gameplay-loop-and-game-feel`
- `level-design-readability`
- `art-direction-and-reference-board`
- `independent-playtest-and-critique`
- `unity-performance-budget`

Priority 2 — technical art and assets:

- `unity-render-pipeline-router`
- `unity-shaderlab-hlsl`
- `unity-shader-graph`
- `unity-material-authoring`
- `unity-texture-pbr-import`
- `unity-lighting-vfx-postprocessing`
- `unity-model-animation-audio-import`
- `unity-addressables-and-asset-provenance`

Priority 3 — product disciplines:

- `unity-ui-ux-accessibility`
- `unity-input-and-platform-controls`
- `unity-save-progression-economy`
- `unity-multiplayer-validation`
- `unity-mobile-webgl-console-readiness`
- `unity-release-producer`

The transferable lesson is that every Antiky skill should declare its compatible project/tool
revision, mutation scope, prohibited actions, verification evidence, and escalation points. Skills
should teach a deep workflow; they should not mirror hundreds of low-level tool descriptions.

## Bottom line

Unity automation has too many overlapping bridges rather than too few. Antiky should take the
closed-loop validation, structured result, serialized-state safety, and single-writer lessons while
building against its own CLI/MCP/Framework/Studio surface. No Unity bridge or Unity skill is part of
the adoption plan.
