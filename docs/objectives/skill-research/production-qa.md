# Game production, QA, release, and live-operations skill research

Research snapshot: 2026-08-09

**Antiky scope:** Antiky Framework, BroMetal, Studio, and Antiky games are the sole implementation
targets. Unity, Unreal, Godot, Three.js packages, and editor bridges are comparative sources for
production and QA patterns; they are not adapters to build or pilot in this roadmap.

## Executive recommendation

Build this part of the internal skill library as an evidence-driven production system, not as a collection of producer personas or generic checklists.

The recommended foundation is:

1. An Antiky production **producer skill** that owns scope, milestones, dependencies, risks, decisions, and change control but cannot silently change the creative brief or quality bar.
2. Antiky-native **QA automation** around package tests, Framework/CLI/MCP inspection, fixed-step replay, BroMetal validation, builds, profiling, and game-canvas capture. Headless or isolated execution should remain the repeatable CI authority.
3. Independent **QA lead, performance, release, compatibility/certification, localization, playtest-research, crash/privacy, and live-operations roles** with explicit artifacts and non-overlapping approval authority.
4. A small set of **quality gates backed by inspectable evidence**: runnable builds, test reports, traces, screenshots/video from the game surface, device results, crash dashboards, localization reports, signed checklists, checksums, and rollback rehearsals.
5. A **human approval boundary** around production credentials, store submission, destructive editor actions, remote configuration, telemetry collection, and live deployment.

The skills.sh ecosystem has useful material, but no candidate found is safe to adopt wholesale. The
`threejs-qa-release` workflow and broad Donchitos/AlterLab suites are pattern mines only. Some
promising skills.sh results no longer had a public GitHub repository reachable through the GitHub
API at research time.

## Method and confidence labels

This report used:

- exact `npx skills find` searches against skills.sh;
- current skill pages and public `SKILL.md` sources where available;
- official Epic, Unity, Godot, Microsoft, Apple, Android, Steamworks, GitHub, and MCP documentation;
- public source-repository metadata and README documentation;
- no skill, MCP, package, engine, or action installation.

Labels used below:

- **Verified**: stated in official documentation or directly inspectable source/metadata.
- **Publisher claim**: stated by a community project but not independently exercised here.
- **Inference / house recommendation**: proposed for our own library; it is not represented as an industry standard.

Stars, install counts, versions, platform policies, and certification requirements are volatile. Counts below are observations from 2026-08-09 and should be refreshed before adoption.

## Skills.sh discovery results

### Exact searches run

```bash
npx skills find "game producer"
npx skills find "game testing qa"
npx skills find "unreal engine automation"
npx skills find "unity godot ci"
npx skills find "release engineering"
npx skills find "game localization live ops"
npx skills find "game performance profiling"
npx skills find "build pipeline game engine"
npx skills find "game localization"
npx skills find "console certification game"
npx skills find "crash reporting game"
npx skills find "community playtest game"
npx skills find "unreal qa"
npx skills find "unity test framework"
npx skills find "godot testing"
```

The CLI only queried the index. No `npx skills add` command was executed.

### Shortlist and maturity assessment

| Candidate | Discovery signal | Source signal | Assessment |
| --- | --- | --- | --- |
| [`threejs-qa-release`](https://skills.sh/majidmanzarpour/threejs-game-skills/threejs-qa-release) | ~1.2K installs | [`majidmanzarpour/threejs-game-skills`](https://github.com/majidmanzarpour/threejs-game-skills): ~1.2K stars, MIT, active | **Medium-high for browser games.** Strong deterministic canvas inspection, desktop/mobile evidence, bot-playtest decision, production preview, visual-harness decision, bundle/base-path review, and risk reporting. Browser/Three.js-specific and complex; scripts and thresholds still require audit. |
| [`godot-testing-patterns`](https://skills.sh/thedivergentai/gd-agentic-skills/godot-testing-patterns) | ~301 installs | [`thedivergentai/GD-Agentic-Skills`](https://github.com/thedivergentai/GD-Agentic-Skills): ~489 stars, LGPL-3.0, active | **Medium.** Useful decision table for GdUnit4 unit/scene/headless/snapshot/network/performance layers. It targets a fast-moving Godot version and depends on bundled scripts plus third-party GdUnit4; pin versions and review licensing before copying code. |
| [`test-setup`](https://skills.sh/donchitos/claude-code-game-studios/test-setup) | ~227 installs | [`Donchitos/Claude-Code-Game-Studios`](https://github.com/Donchitos/Claude-Code-Game-Studios): ~23.7K stars, MIT, active | **Medium as a template source, low as an unreviewed installer.** It creates engine-specific directory/CI scaffolds and asks before writing. Its fixed examples can drift; the Godot runner and Unity/Unreal workflow assumptions must be validated against current upstream tools. |
| Donchitos `qa-plan`, `test-evidence-review`, `soak-test`, `release-checklist`, `team-release`, `team-live-ops` | roughly 227–248 installs for indexed leaves | Same broad repository | **Useful artifact taxonomy.** Good story-to-evidence mapping, explicit release checklist, evidence review, and role routing. Weak points: one-size-fits-all directories, static “profiling” estimates, some arbitrary thresholds, and the claim that visual/feel work is not automatable. Mine concepts, do not inherit policy. |
| [`game-producer`](https://skills.sh/alterlab-ieu/alterlab_gameforge/game-producer), [`game-qa-lead`](https://skills.sh/alterlab-ieu/alterlab_gameforge/game-qa-lead), [`game-ci-pipeline`](https://skills.sh/alterlab-ieu/alterlab_gameforge/game-ci-pipeline), [`game-playtest`](https://skills.sh/alterlab-ieu/alterlab_gameforge/game-playtest), [`game-launch`](https://skills.sh/alterlab-ieu/alterlab_gameforge/game-launch) | roughly 48–51 installs each | [`AlterLab-IEU/AlterLab_GameForge`](https://github.com/AlterLab-IEU/AlterLab_GameForge): ~23 stars, MIT | **Low maturity, high breadth.** Useful producer/QA separation, risk register, cut list, gate-report format, and playtest workflow. Reject dogmatic fixed buffers, uncited universal claims, invented precision, anecdotal authority, and policy presented as fact. |
| [`game-localization-manager`](https://skills.sh/alterlab-ieu/alterlab_gameforge/game-localization-manager) | ~57 installs | Same AlterLab repository | **Low-medium as a checklist mine.** Covers externalized strings, pseudo-localization, translator context, RTL/CJK, LQA, and cultural QA. It also contains uncited market figures, cost ranges, and cultural generalizations; replace those with current official engine/platform sources and qualified human review. |
| [`unity-test-runner`](https://skills.sh/dev-gom/claude-code-marketplace/unity-test-runner) | ~82 installs | [`Dev-GOM/claude-code-marketplace`](https://github.com/Dev-GOM/claude-code-marketplace): ~95 stars, Apache-2.0 | **Low-medium.** A possible convenience wrapper. Prefer direct Unity Test Framework and GameCI documentation until its exact generated workflow is audited. |
| [`game-performance-profiler`](https://skills.sh/akillness/oh-my-skills/game-performance-profiler), [`game-ci-cd-pipeline`](https://skills.sh/akillness/oh-my-skills/game-ci-cd-pipeline), [`game-demo-feedback-triage`](https://skills.sh/akillness/oh-my-skills/game-demo-feedback-triage) | roughly 178–221 installs | The public `akillness/oh-my-skills` GitHub API endpoint returned not found during this research | **Do not adopt now.** The index entry is not enough when source provenance cannot be verified. |
| `opusgamelabs/game-creator@game-qa` / `@qa-game` | roughly 490–537 installs | The public `opusgamelabs/game-creator` GitHub API endpoint returned not found during this research | **Do not adopt now.** Recheck only if a verifiable source and license reappear. |
| [`game-developer`](https://skills.sh/jeffallan/claude-skills/game-developer) | ~4.6K installs | Broad multi-domain skill | **Not selected for this layer.** It mentions profiling gates, but it is too broad to replace dedicated producer, QA, release, and performance contracts. |

Potential later installation commands, shown for reproducibility but **not executed**:

```bash
npx skills add majidmanzarpour/threejs-game-skills@threejs-qa-release
npx skills add thedivergentai/gd-agentic-skills@godot-testing-patterns
npx skills add donchitos/claude-code-game-studios@test-setup
npx skills add alterlab-ieu/alterlab_gameforge@game-producer
npx skills add alterlab-ieu/alterlab_gameforge@game-qa-lead
npx skills add alterlab-ieu/alterlab_gameforge@game-ci-pipeline
```

## Authoritative engine and build surfaces

### Unreal Engine

**Verified facts**

- Epic's [Automation System](https://dev.epicgames.com/documentation/en-us/unreal-engine/automation-system-user-guide-in-unreal-engine) runs tests through Session Frontend and connected devices. Current engine automation tests live in plugins that must be enabled to appear.
- [Gauntlet](https://dev.epicgames.com/documentation/unreal-engine/gauntlet-automation-framework-in-unreal-engine?lang=en-US) launches and monitors Unreal sessions across platforms and can coordinate multi-process arrangements such as clients plus server. It does not require a particular game-side test framework.
- [BuildGraph](https://dev.epicgames.com/documentation/unreal-engine/buildgraph-for-unreal-engine?lang=en-US) is Epic's graph-based build automation layer over UnrealBuildTool, AutomationTool, and the Editor. It can export node/dependency JSON for an external farm, but the external scheduler remains the team's responsibility.
- [UAT `BuildCookRun`](https://dev.epicgames.com/documentation/en-us/unreal-engine/build-operations-cooking-packaging-deploying-and-running-projects-in-unreal-engine) exposes build, cook, stage, package, deploy, and run stages. Packaging is explicitly appropriate for production testing; editor play is not a release substitute.
- [Unreal Insights](https://dev.epicgames.com/documentation/en-us/unreal-engine/introduction-to-performance-profiling-and-configuration-in-unreal-engine) covers frame timing, threads, memory, networking, tasks, and UI. Epic distinguishes CPU, GPU, memory, and network bottlenecks and emphasizes frame time as well as FPS.
- [Crash Reporter](https://dev.epicgames.com/documentation/unreal-engine/crash-reporting-in-unreal-engine?lang=en-US) is optional in packaged games, can send to a custom endpoint, and can attach logs/comments. Unattended upload configuration and data destinations must be reviewed explicitly.
- Unreal's [localization system](https://dev.epicgames.com/documentation/unreal-engine/localization-overview-for-unreal-engine) separates internationalization and localization, uses localization targets, can exchange PO data, and requires compilation to runtime `.locres` files.

Representative commands to parameterize and verify for the exact engine version:

```bash
# Inspect a BuildGraph before execution.
Engine/Build/BatchFiles/RunUAT.sh BuildGraph \
  -Script=Build/ProjectGraph.xml -ListOnly

# Build/cook/stage/package a project; platform/configuration values belong in project policy.
Engine/Build/BatchFiles/RunUAT.sh BuildCookRun \
  -project=/absolute/path/Game.uproject \
  -platform=Win64 -clientconfig=Development \
  -build -cook -stage -pak -package
```

**Constraints**

- Unreal installations, platform SDKs, Derived Data Cache, project size, and licensed console toolchains make self-hosted runners/build farms likely.
- Console packaging requires the applicable source build and platform access; do not encode private SDK material in public skills.
- `-nullrhi` is suitable only for tests that genuinely do not require rendering. Visual, shader, GPU, and input claims must run with the relevant renderer on target-class hardware.

### Unity

**Verified facts**

- Unity's [Test Framework](https://docs.unity3d.com/kr/current/Manual/testing-editortestsrunner.html) integrates NUnit, supports Edit Mode and Play Mode, and can run on standalone/mobile targets.
- Unity's [Performance Testing API](https://docs.unity3d.com/cn/6000.0/Manual/com.unity.test-framework.performance.html) extends the Test Framework with performance measurements and configuration metadata; Unity 6000.0 documents the released 3.2 package line.
- [Unity Build Automation](https://docs.unity.com/en-us/build-automation) is a managed multiplatform CI service with source-control triggers, artifacts, logs, notifications, and supported-platform/version constraints.
- The community [GameCI test runner](https://game.ci/docs/github/test-runner/) runs Edit/Play/standalone tests through GitHub Actions. Its current docs use `game-ci/unity-test-runner@v4` and document licensing secrets plus important Unity-package limitations: explicit version, Linux-only package testing, project-root layout caveat, and no package cache.
- Unity 6's [Localization package](https://docs.unity3d.com/ja/current/Manual/com.unity.localization.html) supports string/asset localization, Smart Strings, pseudo-localization, and XLIFF/CSV/Google Sheets interchange.
- Unity Cloud [Diagnostics](https://docs.unity.com/en-us/cloud/developer-data/diagnostics) reports crashes, exceptions, telemetry, and Android ANRs. New Unity 6.2 projects enable its developer-data path by default; collection can be disabled, with downstream service impact.
- The [UGS CLI](https://docs.unity.com/en-us/services/ugs-cli-introduction) supports configuration-as-code deployment for services such as Remote Config and Cloud Code and maps Unity environments to repository workflows.

Representative GameCI test step:

```yaml
- uses: game-ci/unity-test-runner@v4
  env:
    UNITY_LICENSE: ${{ secrets.UNITY_LICENSE }}
    UNITY_EMAIL: ${{ secrets.UNITY_EMAIL }}
    UNITY_PASSWORD: ${{ secrets.UNITY_PASSWORD }}
  with:
    projectPath: path/to/project
    testMode: editmode
    githubToken: ${{ secrets.GITHUB_TOKEN }}
```

**Constraints**

- Do not place Unity license credentials in prompts, logs, repository files, MCP configuration committed to source, or artifacts.
- Run target-player tests and profile a representative player build; Editor measurements do not prove shipped-player performance.
- Build Automation is managed and potentially billable. GameCI is open-source but still consumes CI time and carries licensing/container constraints.

### Godot

**Verified facts**

- Godot's official [command-line tutorial](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html) supports `--headless`, script execution, import, release/debug export, patch packs, fixed-FPS movie output, and log files. Headless is required where CI has no GPU.
- Official [export documentation](https://docs.godotengine.org/en/stable/tutorials/export/exporting_projects.html) says `export_presets.cfg` is normally safe to version, while `.godot/export_credentials.cfg` contains confidential passwords/keys and generally must not be committed.
- The [Debugger panel](https://docs.godotengine.org/en/stable/tutorials/scripting/debug/debugger_panel.html) includes script, visual, network, memory, and VRAM views. The visual profiler measures rendering-related CPU/GPU work, not all script/physics CPU work.
- Godot's [internationalization documentation](https://docs.godotengine.org/en/stable/tutorials/i18n/index.html) covers spreadsheets, gettext, locale codes, and pseudo-localization.
- Godot does not present a first-party unit-test framework in the official docs reviewed. [`gdUnit4`](https://github.com/godot-gdunit-labs/gdUnit4) is an active community framework (~1.2K stars, MIT); its action is separate and lower-adoption. [`godot-ci`](https://github.com/abarichello/godot-ci) (~1.1K stars) and [`godot-export`](https://github.com/firebelley/godot-export) (~639 stars) are community build/export helpers.

Representative official commands:

```bash
# Import assets deterministically before tests/exports when needed.
godot --headless --path /absolute/path/project --import

# Invoke a project-owned test entry point. The script must propagate a non-zero exit code.
godot --headless --path /absolute/path/project --script res://tests/run.gd

# Export preset and templates must already exist; output directory must exist.
godot --headless --path /absolute/path/project \
  --export-release "Windows Desktop" builds/game.exe
```

**Constraints**

- Unknown Godot command-line options can be ignored without warning; a skill must check `godot --version`, validate expected artifacts, and parse logs instead of trusting exit alone.
- Some performance monitors are debug-only or update at intervals. Use target-device traces and stable scenarios rather than over-interpreting a single monitor sample.
- Pin engine, export-template, plugin, and action versions together.

### Distribution, certification, and release integrity

**Verified facts**

- Steam supports beta branches for pre-release update testing and a separate [Steam Playtest](https://partner.steamgames.com/doc?l=english&q=PLAYTEST&x=0&y=0) path that does not mix test access with main-game reviews/wishlists. Steam's [build documentation](https://partner.steamgames.com/doc/store/application/builds?language=english) recommends beta branches for testing updates already in release.
- Apple's [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) are a living policy and explicitly require crash/bug testing, complete metadata, review access, and operational backends. They also hold developers responsible for third-party SDK behavior and privacy.
- Android's [game launch guide](https://developer.android.com/games/distribute/guide-launch-game?hl=en) calls for a target-device list; [Android vitals](https://developer.android.com/games/optimize/vitals) exposes stability data through Play Console and API.
- Microsoft's public [Xbox Certification Tested Requirements](https://learn.microsoft.com/en-us/xbox/gdk/docs/store/policies/console/console-certification-requirements-and-tests?view=gdk-2604) are versioned and change over time. Current public examples cover stability, offline/new-user behavior, suspend/resume, packages, profiles, safety/privacy, and multiplayer.
- GitHub [artifact attestations](https://docs.github.com/en/actions/how-tos/secure-your-work/use-artifact-attestations/use-artifact-attestations) can establish build provenance. Private/internal repository availability depends on GitHub plan; attestations are available to public repositories on current non-legacy plans.

**House recommendation**

The certification skill must load the current requirement set at run time and record its document/version date. Never copy confidential partner documentation into a public repository or model prompt. Keep two layers: a public readiness matrix and a restricted evidence index that names controlled artifacts without reproducing protected contents.

## Editor MCPs and privileged automation

| Tool | Verified capability/maturity signal | Production/QA use | Principal risks |
| --- | --- | --- | --- |
| [`kevinpbuckley/VibeUE`](https://github.com/kevinpbuckley/VibeUE) | ~587 stars, MIT, active; Unreal editor plugin with discovery, asset operations, logs, arbitrary Unreal Python, and profiling-oriented skills | Fast editor inspection/setup, transaction-aware asset work, log reads, profiling orchestration | README documents an HTTP endpoint on loopback and an optional bearer token that may be left empty; a separate API key is validated with `vibeue.com`; arbitrary Python and asset deletion are high privilege. Require loopback, bearer auth, allowlist, clean branch/test project, and no production secrets. |
| [`CoplayDev/unity-mcp`](https://github.com/CoplayDev/unity-mcp) | ~13.3K stars, MIT, active, many releases; scenes/assets/scripts/tests/builds, tool groups, multi-instance routing, Roslyn validation, authenticated remote mode | Strongest open-source Unity editor bridge; useful test/build trigger and bounded editor observation | Live Editor state, arbitrary code/script changes, asset mutation, remote-host mode, and broad tool surface. Pin a release, run locally, use testing-only tool groups, and require source-control diffs plus player-build evidence. |
| Godot editor MCP candidates | No production/QA candidate reached the source/adoption bar established by the Unity and Unreal options in this research stream | Re-evaluate alongside the engine-specific Godot report; prefer official CLI + project-owned scripts meanwhile | Third-party editor plugins can execute scripts and mutate scenes; maturity, version compatibility, and auth vary widely. |

The [MCP security guidance](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices) warns that local servers can execute arbitrary code, exfiltrate files, lose data, and be reached through insecure local endpoints. It requires visible consent for startup commands and calls out confused-deputy, token, SSRF, and local-server risks.

Required internal safeguards:

- Bind editor bridges to loopback only unless a separately reviewed remote design is required.
- Require authentication even on loopback when the server supports it; rotate tokens and never commit them.
- Expose narrow read/test/profile tool groups by default. Asset deletion, arbitrary code, packaging, and deployment are opt-in capabilities with explicit approval.
- Run editor automation in a clean worktree/branch or disposable project copy. Record every mutation and inspect the engine's own serialized diff.
- Never give editor MCPs store, signing, production cloud, console-partner, or crash-dashboard credentials.
- Treat asset names, logs, imported project text, playtest feedback, and MCP tool output as untrusted input that can contain prompt injection or secrets.
- Redact usernames, machine paths, terminal prompts, email addresses, access tokens, player identifiers, and chat content before logs or captures reach an agent.
- Capture only the game/editor surface required for evidence—never the entire desktop. Prefer deterministic framebuffer/Game-view capture or fixed-window capture with a privacy checklist.
- A successful MCP call is evidence only of the call. It is not evidence that the game feels good, renders correctly, survives packaging, or passes certification.

## Proposed internal subagent topology

Each role gets a fixed output contract and only the write scope it owns. The producer coordinates; it does not self-approve specialist evidence.

| Role | Owns | Must not do | Required output |
| --- | --- | --- | --- |
| **Game producer** | Scope baseline, milestone schedule, dependency map, risk/change registers, decision log, cut options, capacity/status | Change pillars/quality bar alone; invent velocity; mark specialist gates passed | `production/status.md`, milestone ledger, risk register, change decisions |
| **Vertical-slice producer** | Slice definition, representative-content matrix, handoffs, time boxes, evidence index | Accept a toy prototype as representative; equate feature existence with production proof | Slice brief, acceptance matrix, capture/performance/test plan |
| **QA lead** | Risk-based strategy, test matrix, severity/priority rubric, exploratory charters, triage, go/no-go recommendation | Implement and approve the same test; close missing evidence by assertion | QA plan, traceability matrix, defect report, release verdict |
| **QA automation engineer** | Unit/integration/system/replay/visual harnesses and CI result normalization | Replace player-facing manual/exploratory work; hide flaky tests | Machine-readable results, artifacts, flake ledger, command manifest |
| **Build/release engineer** | Hermetic build inputs, versioning, platform matrix, symbols, manifests, checksums, signing handoff, provenance, rollback | Read signing secrets into prompts; publish without approval | Build manifest, artifact index, SBOM/attestation, release/rollback runbook |
| **Performance analyst** | Scenario definitions, target-device traces, budgets, baselines/deltas, bottleneck attribution | Optimize from static guesses; profile only the Editor; change art direction | Trace bundle, percentile report, recommendation with measured trade-off |
| **Compatibility lab lead** | OS/GPU/API/input/display/storage/network/device matrix and result coverage | Generalize from one development machine | Compatibility matrix, failures, minimum/recommended spec evidence |
| **Certification coordinator** | Current platform requirement index, evidence mapping, submission readiness, waivers | Publish restricted requirements; claim platform approval | Dated checklist version, evidence references, blockers/waivers |
| **Localization manager** | String/asset inventory, glossary/context packs, pseudo-localization, vendor handoff, import validation | Machine-translate narrative as final; approve own target-language quality | Localization kit, placeholder/coverage report, locale build matrix |
| **LQA/cultural reviewer** | Native-context linguistic, layout, font/input, tone, and cultural review | Be replaced by automated string checks | Per-locale defects and independent sign-off |
| **Playtest researcher** | Research question, recruitment/consent, session script, observation, synthesis | Lead participants; collect unnecessary PII; turn anecdotes into roadmap votes | Consent-safe session log, evidence clips, themes/confidence, recommendations |
| **Community-feedback triager** | De-duplication, reproduction, severity/frequency, sentiment themes, escalation | Treat loudness as importance; paste private Discord/user data into prompts | Anonymized feedback digest linked to reproducible issues |
| **Crash/privacy steward** | Telemetry schema, consent, PII scrub, retention/access, symbol policy, dashboard health | Enable broad collection by default; expose raw logs/minidumps widely | Data inventory, scrub tests, retention/access policy, crash gate |
| **Live-ops operator** | Environment diffs, staged rollout, health gates, kill switches, rollback, incident log | Directly mutate production without explicit approval/two-person gate | Deployment plan/dry run, audit record, health report, rollback result |
| **Incident commander** | Severity declaration, coordination, timeline, communication, recovery decision, review | Debug every subsystem personally; erase evidence | Incident log, decisions, status updates, blameless follow-up actions |

Recommended orchestration:

```text
Creative/product brief approved
  -> producer freezes slice scope and evidence contract
      -> QA lead, build engineer, performance analyst, compatibility lead,
         localization manager, and playtest researcher plan in parallel
          -> implementation agents produce the build
              -> automation + specialist evidence run independently
                  -> QA lead assembles verdict
                      -> producer runs go/no-go with human owner
                          -> release/live-ops operator executes approved plan
```

No subagent's prose counts as its own gate. A gate consumes artifact paths, command output, traces, build identifiers, device identifiers, and named human approvals.

## Recommended production artifacts and gates

### Core artifacts

- Product/creative brief with audience, pillars, non-goals, target platforms, and target hardware.
- Definition of the core loop and a **vertical-slice contract** naming representative gameplay, art, animation, audio, UI/UX, content pipeline, performance scenario, and build target.
- Scope baseline plus ranked cut options; backlog items trace to slice/product outcomes.
- Dependency map with owners and handoff dates.
- Risk register containing probability, impact, leading indicator, owner, mitigation, contingency, and review date. Do not mandate a universal numeric formula.
- Decision log and change request containing reason, affected artifacts, cost/risk evidence, alternatives, approvers, and rollback.
- Definition of Done by work type: logic, integration, visual/feel, content/data, UI/UX, localization, platform, and operations.
- Device/platform compatibility matrix and per-scenario performance budgets.
- QA traceability matrix from requirement to automated/manual evidence.
- Build manifest: commit, dirty-state flag, engine/tool/plugin versions, target, configuration, content/catalog hash, dependencies, symbols, checksum, provenance, and known risks.
- Release, rollback, incident, and telemetry/privacy runbooks.

### Task breakdown and change control

Each work item should name the player or production outcome, owner, dependencies, affected platforms/content, acceptance evidence, estimate range and confidence, risks, and rollback/recovery path. A file list or “implement system” title is not a workable task contract.

- Break a vertical slice by independently demonstrable player outcomes and pipeline proofs, not by disconnected departments that only integrate at the end.
- Require a Definition of Ready: source brief/gate, dependencies, unresolved decisions, target build/device, and evidence method are known.
- Use rolling-wave detail: fully decompose the next demonstrable increment; keep later uncertain work as outcomes until current experiments reduce uncertainty.
- Keep work small enough to review, integrate, and reverse, but never split it so finely that no task produces player-visible or pipeline-verifiable value.
- Mark cross-discipline handoffs explicitly: source artifact, target artifact, naming/format contract, responsible sender/receiver, due date, and validation command.
- Limit work in progress around the current slice. Starting more features is not progress when the representative loop remains unintegrated.
- A change request records the proposed diff to scope/quality/schedule, evidence, alternatives, displaced work, new risks, approvers, and decision date.
- Defect discovery does not silently enlarge scope; triage whether it violates an existing acceptance contract, exposes missing scope, or is a new request.
- Trigger a decision when a risk's leading indicator crosses its threshold. Do not leave high risks as prose that is merely reviewed every week.
- Preserve rejected/deferred changes and rationale so the same scope debate is not reopened without new evidence.

### House milestone gates

These are recommendations, not verified universal definitions:

| Gate | Minimum evidence to pass |
| --- | --- |
| **Concept -> pre-production** | Audience/pillars/non-goals approved; feasibility spikes identify major engine/platform risks; target hardware and slice question defined; preliminary legal/licensing/privacy review. |
| **Vertical slice approved** | A representative loop is enjoyable and understandable in a packaged build; final-intent art/material/lighting/audio/UI quality is demonstrated, not placeholder volume; real asset/content pipelines work; target-device frame/memory/load budgets are measured; core input/retry/save path works; independent design/art/QA sign-off and player observation exist. |
| **Production start** | Scope baseline, cut list, dependencies, content budget, test strategy, build pipeline, localization architecture, crash/privacy plan, and target matrix are credible. High risks have owners and experiments. |
| **Alpha** | Intended systems are integrated into an end-to-end playthrough; daily packaged builds are stable enough for internal use; critical automation and crash ingestion work; missing content is explicit. |
| **Beta/content lock** | Player-facing content is substantially complete; localization/LQA and compatibility passes run; performance meets budgets on the minimum-spec matrix or exceptions are accepted; no unresolved release-blocking defect. |
| **Release candidate** | Candidate is built from an approved clean tag/commit; all required target builds, symbols, manifests, checksums, attestations, store metadata, legal attributions, telemetry scrub tests, certification evidence, support/on-call, rollback, and smoke/soak results are present. |
| **Go live** | Human go/no-go approves the exact build IDs; store/back-end/environment diffs are reviewed; monitoring and kill switches are live; rollback is rehearsed; communications/support are ready. |
| **Post-launch close** | Stability/performance/economy/support thresholds are reviewed; incidents and feedback are triaged; privacy/retention jobs operate; next change is based on measured outcomes, not launch-day anecdotes. |

## QA and performance model

### Test layers

1. **Static/import validation**: compile, schema, references, missing assets, forbidden editor-only APIs, localization placeholders, platform settings, licenses.
2. **Pure logic tests**: formulas, state machines, serialization, deterministic simulation.
3. **Scene/system integration**: lifecycle, signals/events, physics, save/load, UI navigation, audio state, network contract.
4. **Packaged-build automation**: launch, main loop, progression, fail/retry, suspend/resume, offline/error states, multiplayer sessions where relevant.
5. **Deterministic replay/bot tests**: seeded input streams with outcome metrics and soft-lock detection. These support QA; they do not prove fun.
6. **Visual regression**: named deterministic states, reference images, perceptual diff, masks/tolerances, intentional-baseline approval. Visual/feel work is not “unautomatable”; automation catches regression while art/design humans judge quality.
7. **Performance regression**: stable scene/route, warm-up policy, target build/device, trace plus machine-readable budget result.
8. **Exploratory/manual specialist QA**: game feel, novelty, confusing interactions, accessibility, controller/device behavior, LQA, cultural review, store/certification, destructive and recovery paths.
9. **Soak/chaos/recovery**: long sessions, repeated scene transitions, reconnect, storage full, invalid/corrupt saves, service failure, clock/time-zone boundaries, memory growth.

### Performance evidence contract

Every budget must name:

- exact build ID and engine/configuration;
- target device, OS, driver/runtime, resolution, quality preset, display mode, input path, locale, and network condition;
- scenario, seed/save, warm-up, sampling interval, and duration;
- CPU/GPU frame-time percentiles and hitch definition rather than average FPS alone;
- peak/steady memory and VRAM, load/stream time, draw/primitive/shader metrics where applicable;
- battery/thermal, download/storage, bandwidth/latency, or server tick metrics when relevant;
- raw trace path, summarized result, comparison baseline, and known profiler overhead.

Profile the packaged player on target-class hardware. Editor and static-code inspection may identify candidates but cannot close a performance gate.

### Compatibility matrix

At minimum, parameterize:

- supported OS versions and architecture;
- GPU vendor/tier, graphics API, driver, quality preset, resolution/aspect/DPI/HDR/refresh;
- keyboard/mouse, common controllers, remapping, controller disconnect/reconnect, touch, accessibility input;
- locale, RTL/CJK/font/IME, time zone, 12/24-hour clock, numeric/date/plural formatting;
- fresh install, update, migration, low/full storage, corrupt save, cloud conflict, multiple users;
- offline, packet loss, latency, reconnect, service maintenance, account/entitlement changes;
- suspend/resume, focus loss, background/foreground, device rotation, thermal/battery conditions where applicable.

## Build and release pipeline

Recommended stages:

```text
change/PR
  -> source + asset/import validation
  -> logic and narrow integration tests
  -> deterministic build-input manifest
  -> nightly platform builds + packaged smoke tests
  -> target-device compatibility/performance/soak lanes
  -> release-candidate build from approved clean tag
  -> symbols + checksums + SBOM/provenance + artifact retention
  -> restricted signing/notarization/store staging
  -> certification/review evidence
  -> human go/no-go
  -> staged release + health gates + rollback
```

Controls:

- Pin engine, SDK, plugin, action, container, compiler, and export-template versions; record them in the manifest.
- Separate build from signing and publishing. Give each job the least permission and short-lived credentials it needs.
- Pin third-party GitHub Actions to reviewed commit SHAs for production pipelines, then update them deliberately.
- Archive debug symbols/source maps separately with restricted access and retention; validate that symbolication works before launch.
- Generate checksums and provenance, then verify downloads/installers from the same release surface players use.
- Treat a reproducible build as a measured property. At minimum rebuild the same input in an independent clean environment and compare the documented reproducible subset.
- Keep candidate, staging, and production environments distinct. Never let an editor MCP hold production deployment credentials.
- A rollback is not complete until the previous artifact/config can be restored and its data/schema compatibility is verified.

## Crash reporting, privacy, and security

Crash/minidump providers such as Unreal Crash Reporter, Unity Diagnostics, or active community SDKs ([Sentry Unreal](https://github.com/getsentry/sentry-unreal), [Sentry Unity](https://github.com/getsentry/sentry-unity)) can accelerate diagnosis, but logs, attachments, user comments, device identifiers, IPs, paths, save data, screenshots, and breadcrumbs can contain personal or confidential information.

Required skill-library rules:

- Maintain a telemetry data inventory with purpose, legal/consent basis, collection point, processor/destination, retention, access roles, deletion process, and platform exceptions.
- Default to the minimum fields. Scrub before transmission and test scrubbing with synthetic PII, secrets, terminal names, absolute user paths, chat, usernames, emails, and account IDs.
- Keep release/environment/build tags and symbol files sufficient for diagnosis without attaching arbitrary files.
- Never upload saves, screenshots, logs, dumps, or replay/video automatically unless each artifact class is approved and disclosed.
- Separate player feedback identity from diagnostic payloads unless contact is explicitly requested and consented.
- Restrict minidump/log/symbol access, require MFA where supported, audit downloads, and define retention/deletion.
- Rate-limit and sample noisy events; validate offline queue behavior, quota exhaustion, malformed payloads, and service outages.
- Test crash ingestion and symbolication using synthetic crashes in non-production before every release.
- Review platform certification/privacy constraints before enabling unattended collection. Unity specifically notes that disabling its diagnostic data path may also disable dependent Developer Data services.

## Localization and LQA

The internal localization skill should map to Antiky's game/content contracts rather than inventing
an unrelated parallel string model. External engine systems are comparative references.

Required deliverables:

- source-string and localized-asset inventory with stable keys, ownership, context, character/scene, screenshot, tone, max-length, variables, plural/gender rules, and change status;
- glossary/termbase plus translation-memory/vendor handoff policy;
- automated checks for missing/stale strings, placeholder mismatches, duplicate keys, unsupported glyphs/fonts, forbidden concatenation, and text embedded in images;
- pseudo-localized builds early enough to exercise expansion, accent, BiDi/RTL, and fallback behavior;
- locale matrix covering UI, controller glyphs, subtitles/captions, voice/audio, font fallback, line breaks, sorting/search, numbers/dates, IME input, save compatibility, and platform metadata;
- independent native-speaker LQA/cultural review with screenshots, exact build/locale, reproducible steps, severity, and two-pass verification;
- string freeze/change-control process that prices late source changes and reopens affected LQA evidence.

Machine translation may create a reviewed draft for low-risk content when permitted, but it cannot provide final narrative, tone, cultural, legal, or store/certification approval.

## Playtests and community feedback

Use playtests to answer a predeclared question, not to solicit general approval.

Recommended session contract:

- research question and observable success/failure signals;
- exact build, cohort/recruiting rationale, accessibility needs, consent, compensation, recording/data-retention policy;
- non-leading task script and silent observation before interview;
- timestamped friction, player intent, action, outcome, quote/clip consent, and facilitator notes kept distinct;
- anonymized synthesis that separates observed behavior, participant report, analyst inference, frequency, severity, confidence, and recommendation;
- follow-up experiment or change decision linked to the finding.

Community triage should record build/platform, reproduction, severity, frequency, sentiment/theme, privacy class, and evidence quality. Discord reactions and repeated suggestions are discovery signals, not votes that automatically override product pillars. Never export private messages, usernames, or channel histories to an agent without explicit authorization and minimization.

## Live operations

The safe live-operations skill is an environment/change-control operator, not a retention-mechanics persona.

Required capabilities:

- dev/staging/production separation with configuration as code and human-readable diffs;
- event/release calendar with asset, localization, QA, community, support, store, backend, and capacity dependencies;
- feature flags/remote config with owner, rationale, eligible cohorts, start/end, default, kill switch, expiry, and audit history;
- preflight validation, staging rehearsal, canary/staged rollout, explicit health thresholds, automatic pause where safe, manual go/no-go, and tested rollback;
- economy/content validation against invariants; simulation and exploit/abuse review before live changes;
- privacy-safe analytics with metric definitions, data freshness, guardrails, and experiment stopping rules;
- on-call, incident severity, status communications, player remediation, and blameless post-incident review;
- ethical review for monetization, randomness, scarcity, youth audiences, accessibility, and dark patterns.

Production mutations require explicit approval and an audit record. A planning subagent may produce a dry run; it must not silently call a live service.

## Gaps our library should fill

1. **Engine-neutral producer contract without theater**: measurable artifacts, calibrated uncertainty, no invented velocity or universal 20% buffer, and no celebrity anecdotes standing in for evidence.
2. **Vertical-slice quality gate**: representative final-intent art, game feel, UX, audio, content pipeline, performance, and packaged-build proof. Existing candidates too easily accept feature-complete toys.
3. **Evidence schema shared across engines**: build/test/trace/capture/device identifiers, artifact hashes, freshness, approver, and gate status.
4. **Runtime performance specialist**: target-device scenarios and trace parsing rather than static “hotspot estimates.”
5. **Visual quality + regression skill**: deterministic capture and diff plus independent art/design judgment. Reject the false split where visuals are only manual.
6. **Compatibility-lab skill**: matrix design, device allocation, result normalization, coverage gaps, and reproducible failure packages.
7. **Certification loader**: fetch/version current public rules, reference restricted rules without leaking them, and map evidence to requirements.
8. **Crash/privacy steward**: data inventory, scrub tests, consent, retention/access, symbols, synthetic-crash gate, and incident-safe exports.
9. **Localization engineering + LQA split**: first-party engine integration, pseudo-localization automation, context packs, independent native review, and late-string change control.
10. **Playtest research and community-feedback ethics**: consent/minimization, non-leading study design, anonymization, evidence confidence, and separation of observation from inference.
11. **Release integrity skill**: clean-input manifest, target matrix, symbols, checksums, provenance/SBOM, signing isolation, download verification, rollback rehearsal, and exact-build go/no-go.
12. **Safe live-operations skill**: environment diff, staged rollout, health thresholds, kill switch, approval, rollback, audit, incident response, and ethical guardrails.
13. **MCP/editor safety wrapper**: capability allowlists, loopback/auth checks, project/worktree validation, mutation journal, secrets boundary, and post-mutation engine/source-control verification.
14. **Independent approval model**: the same agent cannot author, execute, and approve a quality gate; human owners retain release and production authority.

## Suggested implementation order

1. Define the shared evidence manifest and gate-verdict format.
2. Build the producer, vertical-slice, QA-lead, and change-control skills around that format.
3. Implement Antiky package/build/replay/inspection evidence using the current CLI/MCP surfaces.
4. Add packaged-build smoke, deterministic replay, visual regression, and performance scenarios.
5. Add release manifest/provenance/symbol/rollback skills.
6. Add compatibility, certification, crash/privacy, localization/LQA, and playtest/community roles.
7. Expand Antiky MCP and Studio mutation capabilities last, with narrow allowlists and destructive-action tests.
8. Add live-operations deployment only after staging, auth, audit, kill-switch, and rollback contracts are proven.

## Source index

### Skills and source repositories

- [skills.sh](https://skills.sh/)
- [`majidmanzarpour/threejs-game-skills`](https://github.com/majidmanzarpour/threejs-game-skills)
- [`Donchitos/Claude-Code-Game-Studios`](https://github.com/Donchitos/Claude-Code-Game-Studios)
- [`AlterLab-IEU/AlterLab_GameForge`](https://github.com/AlterLab-IEU/AlterLab_GameForge)
- [`thedivergentai/GD-Agentic-Skills`](https://github.com/thedivergentai/GD-Agentic-Skills)
- [`Dev-GOM/claude-code-marketplace`](https://github.com/Dev-GOM/claude-code-marketplace)

### Official and primary toolchain sources

- Epic: [Automation System](https://dev.epicgames.com/documentation/en-us/unreal-engine/automation-system-user-guide-in-unreal-engine), [Gauntlet](https://dev.epicgames.com/documentation/unreal-engine/gauntlet-automation-framework-in-unreal-engine?lang=en-US), [BuildGraph](https://dev.epicgames.com/documentation/unreal-engine/buildgraph-for-unreal-engine?lang=en-US), [Build operations/UAT](https://dev.epicgames.com/documentation/en-us/unreal-engine/build-operations-cooking-packaging-deploying-and-running-projects-in-unreal-engine), [performance profiling](https://dev.epicgames.com/documentation/en-us/unreal-engine/introduction-to-performance-profiling-and-configuration-in-unreal-engine), [Crash Reporter](https://dev.epicgames.com/documentation/unreal-engine/crash-reporting-in-unreal-engine?lang=en-US), [localization](https://dev.epicgames.com/documentation/unreal-engine/localization-overview-for-unreal-engine)
- Unity: [Test Framework](https://docs.unity3d.com/kr/current/Manual/testing-editortestsrunner.html), [Performance Testing](https://docs.unity3d.com/cn/6000.0/Manual/com.unity.test-framework.performance.html), [Build Automation](https://docs.unity.com/en-us/build-automation), [Diagnostics](https://docs.unity.com/en-us/cloud/developer-data/diagnostics), [UGS CLI](https://docs.unity.com/en-us/services/ugs-cli-introduction), [Localization](https://docs.unity3d.com/ja/current/Manual/com.unity.localization.html)
- Godot: [command-line tutorial](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html), [exports and credentials](https://docs.godotengine.org/en/stable/tutorials/export/exporting_projects.html), [debugger/profilers](https://docs.godotengine.org/en/stable/tutorials/scripting/debug/debugger_panel.html), [internationalization](https://docs.godotengine.org/en/stable/tutorials/i18n/index.html), [release policy](https://docs.godotengine.org/en/stable/about/release_policy.html)
- Microsoft: [Xbox certification tested requirements](https://learn.microsoft.com/en-us/xbox/gdk/docs/store/policies/console/console-certification-requirements-and-tests?view=gdk-2604)
- Apple: [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- Android: [game launch guide](https://developer.android.com/games/distribute/guide-launch-game?hl=en), [Android vitals](https://developer.android.com/games/optimize/vitals)
- Steamworks: [builds/branches](https://partner.steamgames.com/doc/store/application/builds?language=english), [release process](https://partner.steamgames.com/doc/store/releasing?language=english), [Steam Playtest](https://partner.steamgames.com/doc/features/playtest)
- GitHub: [artifact attestations](https://docs.github.com/en/actions/how-tos/secure-your-work/use-artifact-attestations/use-artifact-attestations), [Actions limits](https://docs.github.com/en/actions/reference/limits)
- MCP: [Security Best Practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices), [authorization](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization)
- Community tools with inspectable source: [GameCI test runner](https://game.ci/docs/github/test-runner/), [`game-ci/unity-test-runner`](https://github.com/game-ci/unity-test-runner), [`game-ci/unity-builder`](https://github.com/game-ci/unity-builder), [`godot-gdunit-labs/gdUnit4`](https://github.com/godot-gdunit-labs/gdUnit4), [`godot-gdunit-labs/gdUnit4-action`](https://github.com/godot-gdunit-labs/gdUnit4-action), [`abarichello/godot-ci`](https://github.com/abarichello/godot-ci), [`firebelley/godot-export`](https://github.com/firebelley/godot-export), [`getsentry/sentry-unreal`](https://github.com/getsentry/sentry-unreal), [`getsentry/sentry-unity`](https://github.com/getsentry/sentry-unity)
