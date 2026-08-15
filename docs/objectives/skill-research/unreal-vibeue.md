# Unreal Engine agent skills and editor-control research

Research date: 2026-08-09  
Scope: Unreal Engine skills, MCP/editor automation, VibeUE, and a practical multi-agent setup for building an internal game-development skill library.  
Install policy: nothing was installed or cloned during this research.

> **Antiky scope:** Unreal and VibeUE are comparative sources only. Antiky Labs is not building an
> Unreal skill or adapter roadmap. Mine this report for patterns such as lazy tool discovery,
> transactions, structured readback, bounded toolsets, and serialized editor ownership; implement
> any useful pattern against Antiky Framework, BroMetal, CLI/MCP, or Studio.

## Comparative reference stack

If evaluating the Unreal ecosystem as a reference implementation, its native MCP stack is the
clearest control-plane baseline and VibeUE is a useful example of a version-pinned expansion. This
is evidence for Antiky's own control-surface design, not a recommendation to adopt Unreal.

The strongest stack found is:

1. **Hands:** Unreal 5.8 native `ModelContextProtocol` + `ToolsetRegistry` + the specific engine toolset plugins the project needs.
2. **Extra hands:** VibeUE for domains and depth not covered by Epic's tools, especially landscape/world workflows, animation asset editing, Niagara scratch modules, UMG, transaction checkpoints, and performance capture.
3. **Brains:** source-grounded, engine-versioned skills such as `kevinpbuckley/unreal-engine-skills`, `quodsoler/unreal-engine-skills`, and our own project-specific knowledge.
4. **Direction:** separate game-design, art-direction, UX/game-feel, producer, and acceptance-gate skills. Editor automation does not supply taste or a playable core loop.
5. **One editor driver:** several specialists can research, critique, and prepare change packets in parallel, but exactly one agent should mutate the live Unreal Editor at a time.

This last constraint is structural, not stylistic. Epic documents that MCP tool invocations run serially on Unreal's game thread and clients must not issue overlapping calls. Parallel agents should produce specifications, C++ patches, asset manifests, critiques, and tests; a single editor-driving agent should execute their ordered mutations.

## Evidence labels and reproducibility

This report separates three kinds of statements:

- **Verified:** present in official Epic documentation or inspected source/repository files.
- **Publisher claim:** stated by a tool's author but not independently run here.
- **Inference/recommendation:** a conclusion derived from the verified architecture or available evidence.

Fast-moving repositories were inspected at these commits:

| Repository | Commit inspected |
| --- | --- |
| `kevinpbuckley/VibeUE` | `24ac69d750c1c558a1b78ed5b60644ce000198d3` |
| `EpicGames/unreal-engine-skills-for-claude-code-plugin` | `7e3b09bbf6d2984c155233f9d3de5fcf523d2d42` |
| `kevinpbuckley/unreal-engine-skills` | `5704060a01f8e7c0d31b003586f98186bef9c8a4` |
| `quodsoler/unreal-engine-skills` | `231c8571be6f3335685edc566a28ec6f9621361d` |
| `believer-oss/Claireon` | `92cb0c9f4c360b62659ac3f6e2573a97372f8c33` |

Repository popularity and install counts are discovery signals, not proof of correctness, safety, or production quality.

## Research method and skills.sh findings

The `find-skills` process was followed: registry discovery first, then source-repository and official-document verification.

- `npx -y skills find "unreal engine"`, `"vibeUE"`, `"Unreal editor automation"`, and related searches hung without producing results in this environment and were stopped.
- The public skills.sh search API now requires a Vercel OIDC bearer token; an unauthenticated request returned `authentication_required`.
- Public indexed skills.sh pages and the source repositories were therefore used as the fallback.
- No package was installed. The commands below are documentation for later evaluation, not a record of actions taken.

Registry observations:

- The skills.sh ecosystem has some Unreal entries, but most have low adoption and broad marketing descriptions.
- A marketplace `unreal-engine-developer` skill showed only about three skills.sh installs at research time. It is too broad and too lightly adopted to use as a foundation without a full audit.
- `quodsoler/unreal-engine-skills` is a much more coherent public library: 27 UE C++ skills, MIT-licensed, source-organized by engine domain, and about 305 GitHub stars at research time.
- Skills indexed from `maystudios/claude-skills` cover useful niches but are a small, young library with about 15 stars; treat its “production-ready” language as a publisher claim.

Sources: [skills.sh API reference](https://skills.sh/docs/api), [skills.sh security caveat](https://skills.sh/docs), [skills.sh CLI and telemetry](https://skills.sh/docs/cli), [quodsoler Unreal skills](https://github.com/quodsoler/unreal-engine-skills), [maystudios skills](https://github.com/maystudios/claude-skills).

## First-party baseline: Unreal Engine 5.8 native MCP

### Verified architecture

Unreal Engine 5.8 ships an **Experimental** MCP plugin. It runs an MCP server in the Unreal process, exposes editor functionality through toolsets registered with `ToolsetRegistry`, and accepts MCP-compatible clients over local HTTP.

Important properties:

- Enable both **Unreal MCP** (`ModelContextProtocol`) and **All Toolsets**, or enable selected toolset plugins individually. The MCP server itself does not provide the domain tools.
- Default endpoint: `http://127.0.0.1:8000/mcp`.
- Supported generated-client targets: `ClaudeCode`, `Cursor`, `VSCode`, `Gemini`, `Codex`, and `All`.
- Tool Search is enabled by default. The visible MCP surface is normally only `list_toolsets`, `describe_toolset`, and `call_tool`, avoiding hundreds of eager schemas.
- Tool invocations execute serially on the game thread. Overlapping calls are unsafe.
- HTTP and Server-Sent Events are supported; stdio and WebSocket are not.
- The listener is loopback-only by default and has no authentication. Epic explicitly says not to expose it beyond the local machine.
- The feature is incomplete, formats may change, and some toolset plugins are separately experimental and disabled by default.
- Toolset definitions can be written in Python or C++. Python is favored when the reflected API is sufficient; C++ is needed for missing bindings, reflected structs, or hot paths.
- Python editor scripting is editor-only, not gameplay scripting inside PIE, standalone, or cooked gameplay.

Sources: [Epic: Unreal MCP in Unreal Editor](https://dev.epicgames.com/documentation/unreal-engine/unreal-mcp-in-unreal-editor), [Epic: UE 5.8 release notes](https://dev.epicgames.com/documentation/unreal-engine/unreal-engine-5-8-release-notes), [Epic: scripting the editor with Python](https://dev.epicgames.com/documentation/unreal-engine/scripting-the-unreal-editor-using-python), [Epic: Remote Control](https://dev.epicgames.com/documentation/unreal-engine/remote-control-for-unreal-engine).

### Setup and verification commands

Inside Unreal Editor:

```text
ModelContextProtocol.StartServer
ModelContextProtocol.GenerateClientConfig Codex
ModelContextProtocol.RefreshTools
```

The generated client config points to:

```json
{
  "mcpServers": {
    "unreal-mcp": {
      "type": "http",
      "url": "http://127.0.0.1:8000/mcp"
    }
  }
}
```

For protocol-level diagnosis:

```bash
npx @modelcontextprotocol/inspector
```

Point the Inspector at `http://127.0.0.1:8000/mcp` using Streamable HTTP.

### Epic's official Claude Code skill/plugin

Epic publishes [`unreal-engine-skills-for-claude-code-plugin`](https://github.com/EpicGames/unreal-engine-skills-for-claude-code-plugin), an MIT-licensed Claude Code plugin with three focused skills:

| Skill | Purpose |
| --- | --- |
| `unreal-mcp` | Discover and invoke live-editor tools safely; save, serialize tool calls, check results, account for PIE and compilation. |
| `create-toolset` | Author and test Python or C++ `ToolsetRegistry` toolsets. |
| `unreal-skill` | Create project/plugin `UAgentSkill` knowledge bundles, either Python classes or project UAssets. |

It also has a `SessionStart` hook that recognizes Unreal projects. The hook requires Bash; Windows users need Git Bash or WSL. MCP operation still works without that hook.

Claude Code install command documented by Epic:

```text
/plugin install unreal-engine-skills-for-claude-code@claude-plugins-official
```

This is a **Claude Code plugin command**, not a universal skills.sh or Codex installation command. For our library, the content is a high-value reference, but it should be ported only after preserving its explicit triggers and safety rules.

### Design principles worth copying from Epic

Epic's `unreal-skill` guidance is especially useful for our own library:

- Put only knowledge the agent cannot reliably learn by tool discovery into a skill.
- Keep durable skills independent of orchestration system, model, and changing tool names.
- Use a short discovery description and a compact instruction payload.
- Use a Python `UAgentSkill` for plugin-owned knowledge and a skill UAsset for project-specific knowledge.
- Discover existing skills before adding duplicates.

Epic's `create-toolset` guidance adds:

- Do not expose a new tool if a generic existing Unreal API/tool already solves it.
- Prefer structured types and schema-driven parameters over JSON-in-string fields.
- Every tool needs success- and error-path tests.
- Live-editor tests should discover, run, poll, and inspect Automation Test results; headless CI can use `UnrealEditor-Cmd ... -Unattended -NullRHI`.

## VibeUE deep dive

### Current identity and source drift

**Verified at the inspected commit:** VibeUE is an MIT-licensed **Unreal Engine 5.8** editor plugin that expands Epic's native `ToolsetRegistry`, native MCP endpoint, and native `AgentSkill` system. Its current README says there is no separate VibeUE MCP server and no in-editor chat in the 5.8 architecture.

This matters because older indexed pages still describe the previous 5.7 architecture: a separate VibeUE server, in-editor chat, a proxy, and an API key required for all calls. Those are stale for current `master`. Pin a tag/commit and never mix instructions across VibeUE generations.

Current descriptor facts:

- `EngineVersion`: `5.8.0`
- plugin version: `5.0`
- editor module whitelist: `Win64`, `Linux`, `Mac`
- required engine plugins include Python Editor Script, Editor Scripting Utilities, Niagara, MetaSound, Enhanced Input, StateTree, Mesh Modeling Toolset, Toolset Registry, and Model Context Protocol
- optional integrations include Fab and EOS Shared

Documentation is not fully aligned on platforms: the plugin descriptor and shell build script include Mac, while the VibeUE docs page lists Windows and Linux. Treat macOS as source-declared but requiring an explicit smoke test.

Sources: [VibeUE repository](https://github.com/kevinpbuckley/VibeUE), [current plugin descriptor](https://github.com/kevinpbuckley/VibeUE/blob/master/VibeUE.uplugin), [current setup documentation](https://www.vibeue.com/docs).

### Architecture

VibeUE layers three mechanisms onto Unreal 5.8:

1. **Toolsets:** service classes register with `ToolsetRegistry`; their callable methods appear on the same Unreal MCP endpoint.
2. **Python bridge:** `execute_python_code` can batch a sequential multi-step script and access both VibeUE services and the full reflected `unreal.*` editor API.
3. **Agent Skills:** domain Markdown registers as native `UAgentSkill` content and is lazily discovered with `AgentSkillToolset.ListSkills` and loaded with `GetSkills`.

This is a deep-module pattern worth copying: keep the MCP surface small, discover exact signatures at runtime, batch related operations inside one editor call, and lazily load domain knowledge.

Do not interpret “batch” as parallel editor work. It means one MCP call executing an ordered script on the editor thread.

### Supported operations

The current source and representative skills support these areas:

| Area | Operations |
| --- | --- |
| Blueprint authoring | Components, graphs, timelines, delegates, custom events, comments, higher-order graph building. Basic CRUD increasingly defers to Epic toolsets. |
| Materials and shaders | Inspect/export graphs, parameters, functions, custom HLSL, instances, diagnostics, compile and texture-reference verification. |
| Niagara/VFX | Emitter color curves, rapid-iteration parameters, scratch-pad graph and Custom HLSL authoring; Epic's native Niagara toolsets own general module/renderer CRUD. |
| World building | Landscape sculpt/paint, heightmaps, splines, foliage, PCG, landscape auto-material/RVT, map blockout, and real-world terrain. |
| Animation | Animation sequences, montages, animation Blueprints, skeleton bones/sockets/retargeting, constraints and key editing. |
| UI | Widget Blueprint hierarchy, styling, animation, MVVM binding, preview capture, and PIE instance inspection. |
| Audio | SoundCue and MetaSound graph authoring. |
| Gameplay data | Enhanced Input, Gameplay Tags, StateTree behavior, user enums/structs, project and engine settings. |
| Validation | Asset readback, Blueprint/material/Niagara compilation, PIE, viewport capture, logs through Epic toolsets, transaction checkpoints. |
| Performance | CPU/GPU/thread timing, Unreal Insights trace control, bookmarks/regions, trace/log analysis, standalone profiling. |
| External data | Web search/page fetch/geocoding and hosted real-world terrain/map data. |

Representative source-backed skills show real workflow depth rather than merely role prompts. Examples include diagnosing phantom material connections, verifying real shader texture use, placing Niagara modules in the correct stage, polling asynchronous PIE startup, and profiling CPU-vs-GPU bottlenecks before making changes.

Sources: [VibeUE README architecture](https://github.com/kevinpbuckley/VibeUE#architecture), [materials skill](https://github.com/kevinpbuckley/VibeUE/blob/master/Content/Skills/materials/SKILL.md), [Niagara emitters skill](https://github.com/kevinpbuckley/VibeUE/blob/master/Content/Skills/niagara-emitters/SKILL.md), [PIE skill](https://github.com/kevinpbuckley/VibeUE/blob/master/Content/Skills/pie-testing/SKILL.md), [profiling skill](https://github.com/kevinpbuckley/VibeUE/blob/master/Content/Skills/profiling/SKILL.md).

### Current VibeUE skill inventory

Direct repository-tree inspection found **35 root `SKILL.md` packs** and **50 supporting Markdown subdocuments**, for **85 Markdown skill/reference entries** total. This reconciles the current README's “about 34” root-pack language with the generated agent guide's “about 88” lazily addressable entries.

The 35 root packs at the inspected commit are:

```text
animation-blueprint     animation-editing       animation-montage
animsequence            asset-management        blueprint-graphs
blueprints              engine-settings         enhanced-input
enum-struct             fab                     foliage
frame-rate              gameplay-tags           landscape
landscape-auto-material landscape-materials     level-actors
map-blockout            materials               metasounds
niagara-emitters        niagara-systems         pcg
pie-testing             profiling               project-settings
skeleton                sound-cues              state-trees
terrain-data            umg-widgets             uv-mapping
vibeue                  viewport
```

Notable structure:

- Root skills are routing documents with trigger metadata, critical rules, and task indexes.
- Deep topics use sibling subdocuments and runnable `.txt` script examples.
- Exact API signatures are supposed to be discovered live rather than trusted from prose.
- Many VibeUE skills now explicitly distinguish Epic-native operations from VibeUE-only extensions.
- Several skills optionally ask for a separate “brains” skill such as `materials-and-shaders` when an external skills-manager tool is available. No public primary source for that manager was found, so the integration should be treated as optional/unverified.

### Installation and use commands

Documented current source install:

```bash
cd /path/to/YourProject/Plugins
git clone https://github.com/kevinpbuckley/VibeUE.git
```

Build and launch:

```powershell
Plugins/VibeUE/BuildAndLaunchGame.ps1
Plugins/VibeUE/BuildAndLaunchGame.ps1 -StrictRebuild
```

```bash
Plugins/VibeUE/BuildAndLaunchGame.sh --engine /path/to/UE5
Plugins/VibeUE/BuildAndLaunchGame.sh --engine /path/to/UE5 --strict-rebuild
```

Then enable VibeUE and Epic's required toolset plugins in the editor. Generate the native MCP config and VibeUE agent instructions:

```text
ModelContextProtocol.GenerateClientConfig Codex
VibeUE.GenerateAgentConfig Codex
```

Core live workflow:

1. `ListSkills` to discover relevant native Agent Skills.
2. `GetSkills` for only the required packs/subdocuments.
3. `discover_python_class('unreal.<Name>Service', method_filter='...')` before relying on a method signature.
4. Execute an ordered `execute_python_code` script.
5. Compile, save, read back state, and capture the relevant Unreal viewport/asset—not the desktop.

### Maturity assessment

Verified repository signals at research time:

- created September 2025; last source push observed August 2026
- approximately 587 stars, 127 forks, one open issue, and 1,142 commits
- tags: `v0.1.0`, `v4.0-ue5.7`, `v5.0-ue5.8`
- no GitHub Releases entries
- repository contains three obvious C++ `*Tests.cpp` files and a large `test_prompts/` scenario library
- GitHub Actions listed only GitHub-generated Copilot workflows, not a conventional project-owned build/test matrix

Interpretation:

- **Promising and actively developed**, with unusually broad, concrete source coverage.
- **Not proven production-safe by repository signals alone.** The native Unreal MCP dependency is experimental; tag/release/CI discipline is still lighter than the surface area warrants.
- The README and generated agent guide already drift on skill counts, and public search caches retain obsolete architecture. Version pinning and local acceptance tests are mandatory.
- Test prompts are useful eval assets but are not equivalent to automated, cross-platform CI.

### Security, privacy, and PII risks

#### Verified risks

- Epic's native MCP endpoint is unauthenticated and intended only for the same machine.
- VibeUE exposes arbitrary editor Python execution. The agent can alter assets and settings; Python also expands the blast radius to filesystem and network access unless separately sandboxed.
- Epic toolsets can capture editor viewport and asset images and read logs. Those artifacts can contain project names, local paths, usernames, machine names, proprietary art, chat text, or secrets printed by tools.
- VibeUE's `deep_research` source sends:
  - search terms and target URLs through `r.jina.ai` and DuckDuckGo,
  - place names/addresses and GPS coordinates to OpenStreetMap Nominatim.
- VibeUE's hosted terrain tools send the VibeUE API key in `X-API-Key`, plus latitude/longitude and terrain parameters, to VibeUE's hosted terrain API.
- The VibeUE API key is a password-masked `FString` in Unreal's per-machine `globaluserconfig`. It is intentionally kept out of project source control and shared across projects on that machine.
- VibeUE's privacy policy says it stores account identity and API endpoint/timestamp/usage information, retains usage analytics up to 12 months and errors up to 30 days, and does not use project/API data to train models. These are publisher policy statements, not independently audited guarantees.
- Epic's native MCP telemetry gate defaults to enabled (`ModelContextProtocol.EnableAnalytics=true`).

Sources: [Epic limitations](https://dev.epicgames.com/documentation/unreal-engine/unreal-mcp-in-unreal-editor#limitations-and-known-issues), [VibeUE deep-research source](https://github.com/kevinpbuckley/VibeUE/blob/master/Source/VibeUE/Private/Tools/DeepResearchTools.cpp), [terrain source](https://github.com/kevinpbuckley/VibeUE/blob/master/Source/VibeUE/Private/Tools/TerrainDataTools.cpp), [API-key setting](https://github.com/kevinpbuckley/VibeUE/blob/master/Source/VibeUE/Public/Settings/VibeUEEditorSettings.h), [VibeUE privacy policy](https://www.vibeue.com/privacy).

#### Inferences and required controls

- Password masking is not evidence of encrypted OS-keychain storage. Treat the per-machine config as plaintext-sensitive until verified otherwise.
- Never expose the MCP port, tunnel it, or bind it to a LAN interface.
- Use a dedicated Unreal user account/workstation profile for automated work where possible.
- Keep source control clean and create recovery points before bulk asset operations. VibeUE transactions are helpful but do not replace source control across compilation, delete, or import boundaries.
- Require explicit approval for asset delete/move, plugin/project settings, arbitrary filesystem/network Python, hosted terrain/geocoding, packaging, or external publication.
- Capture only the Unreal viewport, asset editor, or PIE window. Never capture the entire desktop or a terminal. Redact overlays, log paths, account names, and machine identifiers before artifacts leave the workstation.
- Add a response scrubber for absolute paths, usernames, email addresses, tokens, and home-directory fragments in logs and tool results.
- Disable hosted research/terrain tools by policy for confidential projects unless the exact outbound data is approved.

## Other editor-control options

| Project | Architecture and strengths | Constraints and maturity signal | Position |
| --- | --- | --- | --- |
| [Epic native Unreal MCP](https://dev.epicgames.com/documentation/unreal-engine/unreal-mcp-in-unreal-editor) | First-party, native Toolset Registry, tool search, broad 5.8 toolsets, straightforward Python/C++ extension. | Experimental, UE 5.8, no auth, serial game-thread calls, incomplete/changing APIs. | **Baseline.** Build around this first. |
| [VibeUE](https://github.com/kevinpbuckley/VibeUE) | Expands the native 5.8 endpoint; deep service library, 35 root skills, transactions, world/animation/VFX/UI/performance depth. | Rapidly changing, sparse conventional CI, hosted terrain/research data paths, depends on experimental native stack. | **Best expansion candidate**, pinned and gated. |
| [Claireon](https://github.com/believer-oss/Claireon) | Own UE plugin/server, hundreds of operations behind `tool_search` + `python_execute`; Blueprint/animation/StateTree/BT/EQS/UMG/Niagara/PCG/PIE/Insights; per-asset locks and Python audit logs. | Created June 2026, ~131 stars; Windows tested, other platforms untested; default local HTTP endpoint unauthenticated. | **Strong alternate/reference**, especially its search, locking, audit, and security model. |
| [runreal/unreal-mcp](https://github.com/runreal/unreal-mcp) | No new UE C++ plugin; uses built-in Python Remote Execution; simple `npx` MCP server and UE 5.4+ claim. | Last source push observed June 2025; full editor access; troubleshooting suggests `0.0.0.0`, which materially increases exposure. | **Simple legacy bridge**, not preferred over native 5.8 MCP. |
| [chongdashu/unreal-mcp](https://github.com/chongdashu/unreal-mcp) | UE C++ TCP plugin plus Python FastMCP sidecar; actors, Blueprints, graph nodes, viewport. | Explicitly experimental; last push observed April 2025; 2k stars but stale relative to UE 5.8; GitHub API did not detect a license despite README saying MIT. | **Historical reference**, not a new foundation. |
| [IvanMurzak/Unreal-MCP](https://github.com/IvanMurzak/Unreal-MCP) | Current C++ plugin + .NET bridge + CLI, local or hosted service, cross-platform desktop claims, automated install/open flow. | Young (~23 stars), more components/auth/cloud surface, manual source builds differ from release payloads. | **Monitor/evaluate** if its CLI or runtime control fills a measured gap. |
| [Autonomix](https://github.com/PRQELT/Autonomix) | Broad independent agent/editor tool set, PIE input simulation, automation tests, Sequencer, GAS, multiple LLM providers. | Young, broad claims, independent stack, not evaluated here for source safety or fidelity. | **Feature/reference mine**, not default infrastructure. |
| [kvick-games/UnrealMCP](https://github.com/kvick-games/UnrealMCP) | Early C++/TCP/Python experiment. | README labels it “VERY WIP,” Windows-only author testing, UE 5.5, explicit destructive-risk warning. | **Do not adopt.** |

Claireon's security documentation is particularly worth borrowing. It explicitly states that arbitrary Python has filesystem/network access, documents audit logs and API-key locations, explains that default direct-connect auth is absent, and treats a host firewall as the real boundary where binding behavior is ambiguous. Source: [Claireon security policy](https://github.com/believer-oss/Claireon/blob/main/SECURITY.md).

## Domain-knowledge skill libraries

### `kevinpbuckley/unreal-engine-skills`

This is a separate “brains” library from VibeUE's control-oriented skills. It currently advertises 59 skills: 44 core UE skills, 10 Ultra Dynamic Sky skills, and 5 Ultra Dynamic Weather skills.

High-value design choices:

- Skills cite actual UE 5.8 engine-source paths.
- A validation script checks that cited paths exist under the configured engine root.
- Golden eval tasks compare results with and without a skill.
- Core coverage includes gameplay framework, C++/reflection/GC, Blueprints, content import, materials/shaders, animation, world building, Niagara/audio, UI, networking, AI, testing, profiling, and packaging.
- It explicitly separates domain knowledge from live-editor automation.

Gaps/risks:

- The GitHub API did not detect a license at research time; confirm licensing before copying content.
- It assumes local access to UE 5.8 engine source and uses Windows example paths.
- About 28 stars at research time; the architecture is stronger evidence than popularity.

Source: [kevinpbuckley/unreal-engine-skills](https://github.com/kevinpbuckley/unreal-engine-skills).

### `quodsoler/unreal-engine-skills`

An MIT-licensed library of 27 UE C++ skills. It covers C++ foundations, gameplay framework/GAS/movement/networking, rendering/materials/Niagara/audio/cinematics, world/PCG/physics/data, UI, AI, testing, optimization, editor tooling, and packaging.

Documented install commands:

```bash
npx skills add quodsoler/unreal-engine-skills
npx skills add quodsoler/unreal-engine-skills --skill ue-cpp-foundations ue-gameplay-abilities
npx skills add quodsoler/unreal-engine-skills --list
```

It is a good candidate for content audit and gap comparison, not blind import. At the inspected commit the source had barely changed after initial publication, so verify all UE-version-specific API claims against current 5.8 source.

### `maystudios/claude-skills`

Useful niche skills include Unreal best practices, GAS, third-party C/C++ library integration, PCG Python, and Blueprint/Widget Blueprint code generation. Install syntax from the README:

```bash
npx skills add maystudios/claude-skills
npx skills add maystudios/claude-skills/unreal-gas
```

Use as a reference for focused workflows. Do not accept “production-ready” without running compile/PIE/eval gates in our target engine version.

## Recommended multi-agent setup

### Roles

| Role | Owns | Must not own |
| --- | --- | --- |
| Producer/orchestrator | Product brief, milestone, dependency graph, acceptance gates, risk log, arbitration. | Directly improvising all design/art/code decisions. |
| Game director/designer | Core loop, goals, challenge, progression, encounter and level intent, definition of “fun enough to test.” | Engine API details or visual polish implementation. |
| Player-experience/game-feel designer | Controls, camera, responsiveness, feedback, onboarding, accessibility, playtest questions. | Declaring success from screenshots alone. |
| Art director | Reference board, shape language, palette, composition, lighting targets, quality bar, rejection criteria. | Low-level material/asset mutation. |
| Technical artist | Materials, shaders, textures, Niagara, lighting implementation plan, budgets, import/LOD/naming rules. | Changing the experience goal to fit available effects. |
| World/level designer | Layout, metrics, navigation, encounter spaces, sightlines, landmarks, traversal beats. | Concurrently editing the same level/UAssets as another agent. |
| Gameplay engineer | C++/Blueprint architecture, input, state, AI, interactions, instrumentation, tests. | Unreviewed broad project-setting or content changes. |
| Editor driver | The only live MCP mutation queue; executes approved change packets, saves, compiles, reads back, captures scoped evidence. | Product/art approval or parallel editor tool calls. |
| QA/playtest agent | Regression test, Automation Test, PIE scenario, input trace, screenshots, logs, defect reports. | Fixing issues while evaluating the same build. |
| Performance/release agent | Frame budgets, Insights captures, memory/cook/package gates, target-platform verification. | Optimizing before gameplay and visual baselines are defined. |

### Execution protocol

1. **Brief decomposition:** producer separates scene/art requirements from gameplay/interaction requirements. AutoUE research found this decomposition useful before downstream generation.
2. **Parallel preparation:** design, art, world, gameplay, and QA agents produce bounded change packets. No live-editor mutation yet.
3. **Packet contract:** each packet declares target assets/files, desired state, prerequisites, forbidden changes, visual reference, runtime acceptance, and rollback point.
4. **Serialized editor execution:** one editor driver applies packets in dependency order. Save before bulk work, use transactions where possible, and never overlap MCP calls.
5. **Readback gate:** inspect changed assets/graphs/properties, compile, save, reload or re-query, and stop on any non-explicit success.
6. **Runtime gate:** run deterministic PIE/standalone scenarios; record game input and expected state transitions; inspect logs and scoped viewport captures.
7. **Independent review:** the originating design/art agent reviews the result against the packet; QA checks function; performance checks budgets only after behavior is representative.
8. **Producer acceptance:** accept, reject with a concrete delta, or split the next packet. Do not “polish” an unapproved concept indefinitely.

AutoUE is a 2026 preprint, not production proof, but its five-agent decomposition is useful supporting evidence: model retrieval, scene generation, gameplay code, interactive objects, and automated playtesting exchange structured specifications. Its ablations report that tool-document retrieval, code templates, engine constraints, and explicit dependencies were necessary for reliable graph/code generation. Its limitations include only 20 benchmark tasks and substantial LLM-judge evaluation, so do not copy its quality claims uncritically.

Source: [AutoUE paper](https://arxiv.org/abs/2603.07106).

### Concurrency rules

- Live Unreal MCP calls: **one at a time**.
- Same `.uasset` or map: **single owner** until saved and reviewed.
- C++ source in separate modules/files: may be parallelized with ordinary worktree/merge discipline, but compile integration remains serialized.
- Research, reference collection, test design, critique, and skill authoring: safe to parallelize.
- Shader compilation, C++ compilation, asset import, level load, and PIE transitions: treat as editor-wide barriers.
- A tool with per-asset locks, such as Claireon, reduces collisions but does not make Unreal's game-thread calls parallel-safe.

## Architecture patterns to transfer into Antiky

The Unreal study suggests five separable concerns. Implement their useful equivalents against
Antiky/BroMetal rather than building an “Unreal expert” library:

### 1. Durable Antiky/BroMetal domain skills

Versioned knowledge grounded in Antiky/BroMetal source and project documentation: worlds,
fixed-step simulation, commands/events, inspection, authoring/runtime/render state, typed shaders,
GPU resources, gameplay, UI, assets, testing, profiling, and packaging. Keep durable knowledge
separate from CLI/MCP/Studio tool names.

### 2. Antiky tool-operation skills

Exact procedures for Antiky CLI/MCP/Studio capability discovery, schemas, return formats,
revisions, build/runtime barriers, canvas capture, deterministic stepping, and known failures. Pin
them to the live Antiky tool schema and keep them narrow.

### 3. Project/product skills

The game's art bible, design pillars, naming/folder conventions, input scheme, camera rules, asset provenance, performance targets, accessibility rules, and release constraints. These belong with the project and should override generic defaults.

### 4. Discipline/process skills

Game producer, game designer, level designer, art director, technical artist, UX/game-feel, gameplay engineer, QA/playtest, performance, and release roles. Their output should be reviewable artifacts and acceptance criteria, not personality imitation.

### 5. Verification and eval skills

Golden tasks and gates that prove the other skills improve outcomes:

- compile success and expected error-path behavior
- saved asset reload/readback
- deterministic PIE input/state verification
- Unreal Automation/Functional Tests
- material/Niagara/Blueprint diagnostics
- viewport/asset visual review against a reference and rubric
- frame-time/memory/cook/package budgets
- no PII, secrets, absolute personal paths, or broad desktop capture
- comparison with and without the skill loaded

### Required skill metadata

Every skill should declare:

- trigger and explicit non-trigger
- UE version/range and required plugins
- knowledge sources and source commit/version
- read/write/delete/network/process capabilities
- whether operations are undoable
- whether PIE, compilation, editor restart, or target hardware is required
- affected asset/file classes
- approval boundary for destructive or outbound actions
- success evidence and eval task IDs
- known gaps and stale-by date

### Comparative concerns to translate

The lists below describe concerns exposed by Unreal automation. They are not a backlog of Unreal
skills. Translate only recurring needs into Antiky-native jobs.

P0 control and safety:

- Unreal project discovery and version detection
- native MCP setup/diagnosis
- editor mutation safety, recovery points, transactions, source control
- asset-path and UAsset ownership rules
- build/compile/restart barriers
- scoped capture/log redaction and PII protection

P0 product quality:

- game concept and core-loop definition
- vertical-slice producer
- art-direction brief and reference rubric
- game-feel/control/camera feedback
- level blockout and spatial metrics
- player-facing UI/UX and accessibility
- deterministic playtest and defect triage

P1 technical domains:

- gameplay framework/Enhanced Input/GAS/AI
- materials, shader authoring, Custom HLSL, diagnostics
- texture authoring/import, channel packing, color space, compression, LOD/provenance
- Niagara/VFX and performance budgets
- lighting/Lumen/post process/composition
- animation/Control Rig/montage/AnimBP
- UMG/CommonUI/MVVM
- audio/MetaSounds
- profiling/Insights and target-platform packaging

## Gaps that current Unreal automation does not solve

The available tooling is strongest at manipulating engine objects and weakest where a disappointing demo usually fails:

- deciding whether the core loop is worth playing
- art direction, composition, visual hierarchy, novelty, restraint, and taste
- character/environment concepting and coherent asset selection
- texture generation/editing and DCC round-trips with provenance/licensing
- game feel: anticipation, timing, hit response, camera, audio feedback, and readable states
- structured human playtest recruitment and synthesis
- accessibility and usability beyond widget construction
- production scope, milestone discipline, and killing weak concepts early
- stable cross-platform CI for editor automation
- security boundaries for arbitrary Python and image/log output

These are not reasons to reject editor MCP. They define the skills and subagents that must surround it.

## Antiky transfer sequence

1. Audit Antiky's current CLI/MCP/session surface and scaffold skills against real game tasks.
2. Add bounded capability discovery, a single live-session lease, mutation logs, and PII-safe capture.
3. Exercise the workflow on Antiky worlds, commands/events, BroMetal materials/VFX, runtime replay,
   build barriers, readback, and rollback.
4. Score reliability, retries, state corruption, context cost, motion-evidence quality, and recovery,
   not merely whether an object or asset was created.
5. Mine source-grounded external skills only for legally and technically reusable ideas.
6. Promote an Antiky-native layered library through hidden evals before broadening domains.
7. Apply it to a deliberately art-directed, playable Antiky game concept.

## Bottom line

VibeUE's useful contribution is architectural evidence rather than a feature target: lazy domain
skills, live signature discovery, batched ordered execution, readback, and visual/runtime
verification. Antiky should test those patterns against its own tools and should not adopt Epic MCP
or VibeUE as a baseline.

The decisive Antiky work is producer, game-design, art-direction, game-feel, rendering/content, and
independent playtest capability with hard rejection gates. More operations alone create more
assets, not better games.
