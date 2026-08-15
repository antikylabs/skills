# Real-time rendering, shaders, and materials skill research

Research date: 2026-08-09

## Scope and evidence standard

This report evaluates reusable agent skills, MCP/editor bridges, command-line tools, and specialist-agent workflows for:

- HLSL, GLSL, WGSL, SPIR-V, Slang, and MaterialX authoring and validation;
- Unreal, Unity, Godot, and engine-specific material systems;
- texture authoring, baking, color management, compression, and packaging;
- lighting and real-time VFX;
- GPU capture and debugging; and
- deterministic render-quality validation.

No package, skill, MCP, or editor extension was installed while preparing this report.

**Antiky scope:** Antiky/BroMetal is the sole implementation target. Unreal, Unity, Godot, their
material systems, and their editor bridges are comparative case studies. Recommendations must be
translated into Antiky's `RenderDriver` boundary and BroMetal's typed shader/WebGPU model; there is
no external-engine rendering-skill or adapter roadmap.

Evidence labels used below:

- **Verified** means the statement was checked against the skills registry, an official project repository, or first-party documentation on the research date.
- **Inference / recommendation** means it is a proposed policy, workflow, or conclusion derived from the verified evidence. It should be validated in Antiky's actual renderer and target hardware.

Registry installation counts are volatile snapshots rather than quality scores. Repository stars are also only adoption signals. A popular package can still contain unsafe automation, stale engine assumptions, or low-quality artistic guidance.

## Executive recommendation

There is no credible single skill that covers the complete path from a visual brief to a shippable, fast, polished frame. The strongest approach is a layered rendering toolchain:

1. Use small, reviewed knowledge skills for BroMetal shader idioms and Antiky integration rules.
2. Use official compilers and validators as the correctness gate.
3. Use Antiky/BroMetal-native material, lighting, VFX, and profiling surfaces for integration.
4. Use headless DCC and texture tools for deterministic conversion and baking.
5. Use the GPU debugger appropriate to WebGPU's backend and the target operating system.
6. Use reproducible image capture plus both numeric and human visual review.
7. Keep mutation-capable editor MCPs in an isolated, checkpointed environment with explicit approval boundaries.

**Inference / recommendation:** Antiky should build its own narrow skills around artifact contracts and acceptance gates, rather than adopt a broad “game graphics builder” skill as an autonomous art director. Current public skills are most useful as reference material and editor/API accelerators. They do not reliably judge whether a result looks distinctive, readable in motion, or commercially polished.

### Maturity interpretation

- **Production foundation:** Antiky/BroMetal material and render contracts; DXC, glslang, SPIRV-Tools, Tint/Naga when version-matched to the actual toolchain; Blender; OpenImageIO/OpenColorIO; RenderDoc/PIX/Nsight/Xcode where compatible with the target WebGPU backend; established texture codecs used through pinned releases.
- **Established but integration-sensitive:** MaterialX, Slang, Material Maker, Adobe Substance automation, Unity MCP, and Blender MCP. These are capable tools, but correctness, licensing, or security depends heavily on the exact integration.
- **Comparative or evaluation-only:** public rendering knowledge skills, the RenderDoc/Nsight CLI-Anything harnesses, VibeUE, and Godot editor bridges. Mine external-engine integrations for patterns; do not advance them toward Antiky production access.

These labels describe fitness for this workflow, not the intrinsic quality of each project. For example, Blender MCP is popular and feature-rich, but its arbitrary-code surface makes the unmodified bridge unsuitable for a secrets-bearing production workspace.

## Registry search results

The discovery pass used the documented skills.sh client without installing anything:

```sh
npx skills find "hlsl glsl wgsl"
npx skills find "materialx shader"
npx skills find "unreal materials rendering"
npx skills find "unreal niagara effects"
npx skills find "unity shader graph"
npx skills find "godot shader"
npx skills find "blender texture material"
npx skills find "substance designer texture"
npx skills find "texture compression"
npx skills find "renderdoc gpu"
npx skills find "gpu debugging"
npx skills find "game vfx lighting"
npx skills find "visual regression game graphics"
```

### Shortlist

| Candidate | Registry snapshot | Upstream maturity signal | License | Best use | Important limitation |
|---|---:|---|---|---|---|
| `gamedev-skills/...@shader-programming` | 1.0K installs | 455-star active collection | Apache-2.0 | GLSL concepts with HLSL equivalents and common effects | No serious WGSL, MaterialX, compiler-matrix, or render-quality workflow |
| `minimax-ai/skills@shader-dev` | 2.1K | 13.3K-star active collection | MIT | ShaderToy/WebGL2 prototyping, SDFs, ray marching, noise, lighting | Inspiration-oriented; not an engine integration or backend-conformance skill |
| `quodsoler/...@ue-materials-rendering` | 664 | 305-star Unreal-focused collection | MIT | UE material instances, parameter collections, post effects, render targets | Version statements are internally inconsistent; validate every API against the pinned UE version |
| `gamedev-skills/...@unreal-niagara` | 742 | Active collection, UE 5.8-targeted text | Apache-2.0 | Niagara terminology and runtime patterns | Introductory authoring depth; no independent performance or art-direction gate |
| `quodsoler/...@ue-niagara-effects` | 708 | Unreal-focused collection | MIT | Deeper Niagara C++ and runtime control | Still needs editor/version validation and visual QA |
| `gamedev-skills/...@godot-shaders` | 925 | Active collection, Godot 4.7-targeted text | Apache-2.0 | Godot spatial, canvas, uniforms, screen reads, 3.x ports | Engine-specific; no capture, performance, or art-direction system |
| `freshtechbro/...@blender-web-pipeline` | 2.0K | 686-star collection, last pushed 2025-11 | MIT repository | `bpy`, baking, LOD, glTF/web export examples | Contains generalized budget and JPEG advice that must not become a universal quality standard |
| `freshtechbro/...@substance-3d-texturing` | 1.5K | Same collection | MIT repository; Adobe tools remain proprietary | Painter scripting, presets, batch export, web-oriented outputs | Review bundled scripts and Adobe/asset licenses separately |
| `hkuds/cli-anything@cli-anything-renderdoc` | 365 | 46.8K-star CLI framework | Apache-2.0 framework; RenderDoc MIT | Scriptable capture inspection and export | Registry artifact appears early-stage; pin and inspect the exact harness before use |
| `hkuds/cli-anything@cli-anything-nsight-graphics` | 296 | Same framework | Apache-2.0 framework; Nsight proprietary | NVIDIA capture automation | NVIDIA hardware/tool dependency and likely beta maturity |

Snapshot repository metadata was read from the upstream GitHub repositories on 2026-08-09. Counts rounded above were: [gamedev-skills](https://github.com/gamedev-skills/awesome-gamedev-agent-skills) 455 stars, [minimax-ai/skills](https://github.com/minimax-ai/skills) 13,296, [quodsoler/unreal-engine-skills](https://github.com/quodsoler/unreal-engine-skills) 305, [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) 686, and [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) 46,816.

### Exact optional install commands

These commands are recorded for reproducibility, not executed or endorsed for blind installation:

```sh
npx skills add gamedev-skills/awesome-gamedev-agent-skills --skill shader-programming
npx skills add minimax-ai/skills --skill shader-dev
npx skills add quodsoler/unreal-engine-skills --skill ue-materials-rendering
npx skills add gamedev-skills/awesome-gamedev-agent-skills --skill unreal-niagara
npx skills add quodsoler/unreal-engine-skills --skill ue-niagara-effects
npx skills add gamedev-skills/awesome-gamedev-agent-skills --skill godot-shaders
npx skills add freshtechbro/claudedesignskills --skill blender-web-pipeline
npx skills add freshtechbro/claudedesignskills --skill substance-3d-texturing
npx skills add HKUDS/CLI-Anything --skill cli-anything-renderdoc
npx skills add HKUDS/CLI-Anything --skill cli-anything-nsight-graphics
```

**Verified:** registry searches found no strong MaterialX-specific skill, no mature texture-compression skill, no engine-neutral GPU-debugging skill, and no comprehensive render-golden-testing skill. The search results for those categories were either tangential or very low adoption.

**Inference / recommendation:** review and vendor only the small portions that survive technical review. Pin a repository commit, preserve its license, and require a pull request for updates. Do not run `npx`, `uvx`, downloaded scripts, or bundled binaries in a release workspace merely because the registry page is popular.

## Shader languages and intermediate representations

### Recommended compiler matrix

| Source or IR | Primary validator/compiler | Verified role | License / maturity | Example CI command |
|---|---|---|---|---|
| HLSL | [DirectX Shader Compiler](https://github.com/microsoft/DirectXShaderCompiler) | Microsoft's HLSL compiler; emits DXIL and SPIR-V | University of Illinois Open Source License; official and mature | `dxc -T ps_6_7 -E main shader.hlsl -Fo shader.dxil` |
| HLSL to Vulkan | DXC SPIR-V backend | HLSL to SPIR-V for Vulkan targets | Same as DXC | `dxc -spirv -fspv-target-env=vulkan1.3 -T ps_6_7 -E main shader.hlsl -Fo shader.spv` |
| GLSL / ESSL | [glslang](https://github.com/KhronosGroup/glslang) | Khronos reference front end and SPIR-V generator | Multiple permissive licenses; official Khronos project | `glslangValidator -V --target-env vulkan1.3 shader.frag -o shader.spv` |
| SPIR-V | [SPIRV-Tools](https://github.com/KhronosGroup/SPIRV-Tools) | Validation, optimization, assembly/disassembly | Apache-2.0; stabilized APIs | `spirv-val --target-env vulkan1.3 shader.spv` |
| GLSL command-line workflow | [shaderc](https://github.com/google/shaderc) / `glslc` | Library and GCC-like GLSL compiler built on Khronos components | Apache-2.0; maintained, but binaries are not promised as supported products | `glslc --target-env=vulkan1.3 shader.frag -o shader.spv` |
| WGSL / WebGPU | [Dawn Tint](https://dawn.googlesource.com/dawn) | Dawn's WGSL reader, validator, and translator | Chromium/BSD-style project licensing; production WebGPU component | Pin Tint with the runtime and validate with its current CLI/API |
| WGSL in Rust | [Naga in wgpu](https://github.com/gfx-rs/wgpu) | wgpu's shader translation and validation library | MIT or Apache-2.0 | Integrate the version-matched crate; do not assume a stable standalone CLI contract |
| Multi-target source | [Slang](https://github.com/shader-slang/slang) | Modular shader language/compiler targeting major graphics APIs | Apache-2.0 with LLVM exception; active production project | `slangc shader.slang -target spirv -profile sm_6_7 -entry main -o shader.spv` |
| Material graph interchange | [MaterialX](https://github.com/AcademySoftwareFoundation/MaterialX) | ASWF open standard, libraries, graph editor, viewer, shader generation | Apache-2.0; 2,233 stars in snapshot | Build Python/viewer/editor components, then validate the supported graph subset |

SPIR-V validation and inspection should be explicit rather than implied by successful compilation:

```sh
spirv-val --target-env vulkan1.3 shader.spv
spirv-opt -O shader.spv -o shader.opt.spv
spirv-dis shader.opt.spv -o shader.spvasm
```

**Verified:** Khronos announced deprecation of glslang's HLSL front end in 2026, with removal planned for a subsequent major release. DXC or Slang is the appropriate primary HLSL path; glslang remains the reference GLSL/ESSL path.

**Verified:** Slang can target D3D and Vulkan, but its Metal and WGSL paths are described as experimental. Dawn/Tint and wgpu/Naga should be version-matched to the WebGPU runtime used in production.

**Inference / recommendation:** CI should compile every shader permutation used by a shipping build, then validate the produced IR. A successful editor preview is insufficient because preprocessing, binding layouts, feature levels, coordinate conventions, precision, and driver backends vary.

### MaterialX boundaries

MaterialX is valuable as a declarative source graph and interchange layer. It can generate shaders and has a viewer, Python bindings, and graph editor. Useful CMake options include:

```sh
cmake -S . -B build \
  -DMATERIALX_BUILD_PYTHON=ON \
  -DMATERIALX_BUILD_VIEWER=ON \
  -DMATERIALX_BUILD_GRAPH_EDITOR=ON
```

**Inference / recommendation:** define an Antiky-supported MaterialX node subset. For every supported node and graph combination, record the intended color space, tangent basis, units, opacity model, texture addressing, and fallback. MaterialX interchange does not itself prove semantic parity with Unreal, Unity, Godot, or Antiky materials. Unsupported graphs need either a deterministic bake or a clear rejection, not a silent approximation.

## Engine material and VFX systems

### Unreal Engine

First-party references are [Unreal Engine Materials](https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-materials), [Niagara visual effects](https://dev.epicgames.com/documentation/en-us/unreal-engine/creating-visual-effects-in-niagara-for-unreal-engine), and [Movie Render Pipeline](https://dev.epicgames.com/documentation/en-us/unreal-engine/movie-render-pipeline-in-unreal-engine).

The two Unreal skill collections above are useful for API recall and patterns such as dynamic material instances, material parameter collections, render targets, post-process materials, Niagara parameters, and runtime component control. They should be pinned to the same UE version as the project.

**Verified:** the `ue-materials-rendering` text reviewed during this research contains one UE 5.0–5.4 scope statement while also discussing changes through UE 5.7. This is a concrete reason to treat its code as a prompt for first-party documentation lookup, not as source-of-truth API compatibility.

**Inference / recommendation:** author reusable master materials and constrained material-instance interfaces. Keep custom HLSL nodes small and compile-tested. Establish budgets for shader permutations, translucency, overdraw, virtual texture use, Niagara bounds, and per-effect GPU time.

### Unity

[Shader Graph](https://docs.unity3d.com/Manual/shader-graph.html) is Unity's node-based shader authoring system for supported render pipelines. [Visual Effect Graph](https://docs.unity3d.com/Packages/com.unity.visualeffectgraph@latest) is the GPU VFX system. The [Rendering Debugger](https://docs.unity3d.com/Manual/urp/features/rendering-debugger.html), Frame Debugger, Profiler, and Graphics Test Framework provide integration and validation surfaces.

**Verified:** package behavior and compatibility follow the Unity Editor and render-pipeline package versions. Unity Graphics packages are distributed under Unity terms, including the Unity Companion License for source packages, rather than a blanket conventional open-source license.

**Inference / recommendation:** any Unity skill should state the exact Editor, URP/HDRP, Shader Graph, and VFX Graph versions. It should never copy a graph between pipelines without validating supported nodes, lighting model, depth/opaque texture settings, motion vectors, and platform shader variants.

### Godot

The official [Godot shader documentation](https://docs.godotengine.org/en/stable/tutorials/shaders/index.html) covers spatial, canvas-item, particle, sky, fog, and texture-blit shaders. Godot's shader language is GLSL-like but engine-defined.

The registry's `godot-shaders` skill is a useful focused reference for Godot 4.x syntax, uniforms, screen reads, and ports from 3.x. It does not replace runtime validation under the Compatibility, Mobile, and Forward+ renderer paths.

**Comparative lesson:** material systems should be compared through intent and rendered behavior,
not source text. Godot-specific built-ins, depth conventions, lighting paths, and particle behavior
are an example of why Antiky should define and validate its own material semantics.

## Editor automation and MCP bridges

Editor MCPs can be productive, but they are code-execution systems with access to valuable source assets. Adoption should be based on security boundaries as much as tool count.

### VibeUE / Unreal MCP

[VibeUE](https://github.com/kevinpbuckley/VibeUE) is an MIT-licensed extension of Unreal 5.8's experimental native MCP/toolset. The snapshot had 587 stars and active development through 2026-08-04. Its advertised tools include material creation, custom HLSL, Niagara, terrain, and checkpoint/transaction support.

Example project-local installation and build from its documentation:

```sh
cd /path/to/YourProject/Plugins
git clone https://github.com/kevinpbuckley/VibeUE.git
Plugins/VibeUE/BuildAndLaunchGame.sh --engine /path/to/UE5 --strict-rebuild
```

The documented MCP endpoint is `http://127.0.0.1:8000/mcp` after enabling automatic startup in Editor Preferences.

**Verified security fact:** the server is loopback-only and has no authentication. Its tooling can execute `unreal.*` Python with the user's editor privileges.

**Inference / recommendation:** suitable only for a local, isolated UE worktree with source control checkpoints. Keep it stopped outside an approved session. Never proxy its endpoint to another host. Require explicit approval for arbitrary Python, import, overwrite, deletion, build, packaging, or external data calls.

### Unity MCP

[CoplayDev/unity-mcp](https://github.com/CoplayDev/unity-mcp) is MIT-licensed and had 13,279 stars, 1,406 forks, and current activity through 2026-08-07. Its documentation lists Unity 2021.3 LTS through Unity 6.x, Python 3.10+, `uv`, 47 focused tool entry points, remote authentication options, tests, profiling, and build operations.

Pin a release tag rather than adding the moving branch:

```text
https://github.com/CoplayDev/unity-mcp.git?path=/MCPForUnity#v10.0.0
```

Or, after separately installing OpenUPM:

```sh
openupm add com.coplaydev.unity-mcp
```

**Inference / recommendation:** promising for integration automation, not art-direction autonomy. Restrict it to a worktree, preserve `.meta` files, require Unity serialization in text where practical, and keep builds/profile captures as explicit actions. Remote mode should use the documented authenticated transport and should not expose the editor bridge directly.

### Godot MCP options

[Coding-Solo/godot-mcp](https://github.com/Coding-Solo/godot-mcp) is MIT-licensed, had 5,138 stars, and supports Node 18+. Its command-oriented tools launch the editor/project, read logs, create scenes and nodes, manipulate sprites, and export mesh libraries.

```sh
claude mcp add godot -- npx @coding-solo/godot-mcp
```

**Verified limitation:** its public tool surface is much stronger for scene and process automation than for material-graph authoring or visual diagnosis.

[slangwald/godot-mcp](https://github.com/slangwald/godot-mcp) advertises a richer Godot 4.6 editor bridge with scene-tree/material access, runtime screenshots, input, and undo/redo, using local TCP ports 9500 and 9501. It had only three stars in the snapshot.

```sh
claude mcp add godot-mcp -- uv run --directory /absolute/path/godot-mcp/mcp python godot_mcp_server.py
```

**Inference / recommendation:** treat the latter as a research prototype. Do not copy examples that auto-approve all tools. Pin the NPM/Python dependency versions for either bridge and bind only to localhost.

### Blender MCP versus deterministic headless Blender

[ahujasid/blender-mcp](https://github.com/ahujasid/blender-mcp) is MIT-licensed and widely adopted: 25,686 stars and 2,449 forks in the snapshot. It supports viewport screenshots, scene and material manipulation, arbitrary Blender Python, and optional external integrations such as Poly Haven, Sketchfab, and generative services.

```sh
claude mcp add blender uvx blender-mcp
```

**Verified security issue:** the bridge's public issue tracker documents unrestricted Python `exec()` risk and a separate arbitrary-file-read/upload concern. It listens on local port 9876 and runs with the Blender user's filesystem privileges. External services, API keys, downloads, and telemetry add further data-flow concerns.

**Inference / recommendation:** do not use the stock bridge in a workspace containing secrets or irreplaceable source assets. Prefer direct, reviewed, headless `bpy` scripts for repeatable production work:

```sh
blender --background source.blend --python bake_export.py -- --out build/assets
```

If interactive MCP use is required, use a dedicated OS account or sandbox, remove/disable arbitrary-code tools in a reviewed fork, turn off external integrations and telemetry, allowlist asset directories, keep the socket local, and checkpoint the `.blend` file before every mutation sequence.

Blender itself is [GPL-licensed](https://developer.blender.org/docs/license/). Add-ons and downloaded assets can have different licenses. Blender's license does not automatically grant redistribution rights for third-party source assets.

## Texture authoring, baking, and compression

### Authoring and baking tools

| Tool | Verified capability | License / commercial constraint | Recommended role |
|---|---|---|---|
| [Blender](https://www.blender.org/) | UVs, shader nodes, high-to-low workflows, Cycles bake, Python/headless automation | GPL; add-ons/assets have separate terms | Default open DCC and deterministic bake orchestrator |
| [Material Maker](https://github.com/RodZill4/material-maker) | Godot-based procedural material nodes and 3D model painting | MIT except where noted; 5,815 stars, actively maintained | Best open-source Substance Designer-like candidate |
| [Adobe Substance 3D Designer](https://experienceleague.adobe.com/en/docs/substance-3d-designer/using/scripting/scripting) | Node-based procedural materials and Python 3.9 plugin API | Proprietary subscription; automation availability varies by plan | Established commercial authoring when licensed |
| [Adobe Substance 3D Painter](https://experienceleague.adobe.com/en/docs/substance-3d-painter/using/home) | Layered 3D painting and Python API | Proprietary subscription and asset-specific terms | Hero-asset painting and exports |
| Substance Automation Toolkit | `sbscooker` and other command-line processing | Adobe enterprise/commercial terms | CI cooking only after licensing review |

Material Maker can be installed on macOS with the project's documented cask:

```sh
brew install --cask material-maker
```

**Verified security fact:** Substance Painter remote scripting can be enabled with `"Adobe Substance 3D painter.exe" --enable-remote-scripting`; it opens a localhost HTTP service on port 60041 that accepts Python or JavaScript execution. This should be treated as a local code-execution endpoint and disabled outside automation sessions.

**Inference / recommendation:** use Blender or Material Maker for a reproducible open pipeline; use Substance when its mature painting workflow materially improves the asset and the team has the correct licenses. Store source provenance, generator version, export preset, color-space assignments, tangent convention, bake cage settings, and asset license beside every output.

### Color and image processing

[OpenImageIO](https://github.com/AcademySoftwareFoundation/OpenImageIO) provides mature image inspection, conversion, and comparison tools under an Apache-2.0 license for its original code:

```sh
oiiotool input.exr --colorconvert linear sRGB -o preview.png
idiff -fail 0.004 -failpercent 10 -hardfail 0.25 \
  -warn 0.004 -warnpercent 3 reference.exr candidate.exr
```

[OpenColorIO](https://github.com/AcademySoftwareFoundation/OpenColorIO) is a BSD-3-Clause color-management system used in visual-effects pipelines and compatible with ACES workflows:

```sh
ociocheck --iconfig config.ocio
ocioconvert --inputspace linear --outputspace sRGB input.exr output.png
```

**Inference / recommendation:** preserve lossless, high-bit-depth working masters. Generate delivery formats from those masters. Record the OCIO configuration or explicit transform used by both authoring and tests; otherwise numeric diffs can report color-management changes rather than renderer regressions.

### Compression toolchain

| Target | Primary tool | Verified strengths | License caution |
|---|---|---|---|
| KTX2 / Basis Universal | [KTX-Software](https://github.com/KhronosGroup/KTX-Software) and [Basis Universal](https://github.com/BinomialLLC/basis_universal) | Khronos KTX tooling; ETC1S/UASTC transcoding; mip support | KTX-Software repository contains multiple/custom notices; audit the pinned release. Basis core is Apache-2.0 |
| ASTC | [Arm ASTC Encoder](https://github.com/ARM-software/astc-encoder) | Official high-quality ASTC encoder, test modes, Windows/macOS/Linux releases | Apache-2.0 |
| BCn / DDS on Windows | [DirectXTex](https://github.com/microsoft/DirectXTex) | Microsoft's `texconv`, BC formats, mip generation | MIT |
| Cross-platform BC/ETC/ASTC | [AMD Compressonator](https://github.com/GPUOpen-Tools/compressonator) | CLI/GUI/SDK, quality metrics including SSIM/MSE/PSNR | Repository has component-specific licenses; audit before vendoring |

Representative commands:

```sh
basisu -ktx2 -uastc -uastc_rdo_l 1.0 -mipmap albedo.png
basisu -ktx2 -linear -uastc -mipmap normal.png
basisu -info -validate albedo.ktx2

astcenc -cs albedo.png albedo.astc 6x6 -medium
astcenc -cl normal.png normal.astc 6x6 -thorough

winget install Microsoft.DirectXTex.Texconv
texconv -f BC7_UNORM_SRGB -m 0 albedo.png
texconv -f BC5_UNORM -m 0 normal.png

CompressonatorCLI -log -fd BC7 input.png output.dds
```

**Verified:** the KTX/glTF guidance distinguishes ETC1S, which prioritizes size and transcodability, from higher-quality/larger UASTC. Complex textures and strongly contrasting adjacent colors can expose ETC1S artifacts.

**Inference / recommendation:** compression selection must be semantic and platform-specific:

- base color and emissive use the project's color encoding, commonly sRGB;
- normals, roughness, metallic, AO, height, and masks remain linear;
- two-channel normal maps generally suit BC5-class encoding on desktop;
- preserve alpha only when used;
- generate and inspect mip levels, including alpha coverage and edge dilation;
- use lossless sources and never apply a blanket JPEG rule to material maps;
- evaluate the final GPU/transcoded format on target hardware, not only the intermediate KTX2 file.

## Lighting and real-time VFX

Public skill coverage is weak here. Search results favored framework-specific effect recipes and Three.js “AAA” builders, not robust lighting design, motion readability, or performance validation.

**Verified:** Niagara, Unity VFX Graph, and Godot particle shaders all expose engine-specific simulation, rendering, and parameter systems. Their interchange is conceptual, not graph-compatible.

**Inference / recommendation:** a production lighting/VFX workflow needs two separate contracts:

1. **Art contract:** focal hierarchy, value grouping, color script, exposure, mood, gameplay readability, effect silhouette, anticipation/action/recovery timing, and camera-distance behavior.
2. **Technical contract:** target renderer and hardware, light/shadow count, translucency and overdraw, particle count, bounds, simulation space, collision mode, texture bandwidth, shader cost, LOD/scalability, and deterministic capture time.

Lighting should be reviewed at calibrated exposure and target display conditions. VFX should be reviewed in motion, over representative bright and dark backgrounds, at gameplay camera distance. A still image cannot prove timing or readability.

## GPU debugging matrix

| Platform/API | Primary tool | Verified support | License / constraint |
|---|---|---|---|
| Windows/Linux/Android Vulkan; Windows D3D11/12; OpenGL/GLES | [RenderDoc](https://github.com/baldurk/renderdoc) | Frame capture, event inspection, resources, pipeline state, shader debug where supported; Windows/Linux/Android/Switch | MIT; 10,954 stars; **does not support Metal or macOS** |
| Windows/Xbox D3D12 | [PIX](https://devblogs.microsoft.com/pix/introduction/) | Microsoft GPU capture, timing capture, programmatic capture integration | Proprietary Microsoft tooling; captures can depend on hardware/driver |
| NVIDIA GPU on Windows/Linux | [Nsight Graphics](https://developer.nvidia.com/nsight-graphics/get-started) | D3D12, Vulkan, OpenGL, OpenXR capture and analysis | Proprietary; NVIDIA GPU/driver dependency |
| macOS/iOS Metal | [Xcode Metal capture](https://developer.apple.com/documentation/xcode/capturing-a-metal-workload-in-xcode) | Apple GPU capture and shader/resource inspection | Proprietary Xcode/Apple platform tooling; capture has overhead |
| Vulkan validation | [Vulkan Validation Layers](https://github.com/KhronosGroup/Vulkan-ValidationLayers) plus SPIRV-Tools | API misuse and shader-module validation | Apache-2.0 |

**Verified:** RenderDoc's project policy permits debugging programs the operator has the legal right to debug. It is not a macOS/Metal solution.

**Inference / recommendation:** maintain backend-specific capture recipes rather than promise a universal GPU debugger. Every performance record should include engine commit, graphics API, GPU, driver, operating system, resolution, quality settings, scene/camera, warm-up, and capture-tool version. Treat captures as potentially sensitive: they can contain shaders, textures, buffers, scene labels, and proprietary assets.

### A safe scripted RenderDoc shape

The `cli-anything-renderdoc` skill is interesting because it advertises action summaries, pipeline state, shader export, textures, counters, and capture comparison via RenderDoc's Python bindings. However, the discovered harness is version `0.1.0` and its source location has shifted within the fast-moving CLI-Anything repository.

**Inference / recommendation:** evaluate it in a sandbox only after pinning the exact artifact and inspecting every command. A custom read-only Antiky capture summarizer may be safer than a general CLI wrapper. It should accept an existing `.rdc`, prohibit process launch and mutation by default, redact resource names where needed, and emit:

- the expensive pass/event hierarchy;
- render-target formats and dimensions;
- draw/dispatch counts;
- pipeline state and bound resources;
- shader hashes and compile metadata;
- suspicious barriers, clears, resolves, overdraw, and redundant state; and
- links back to exact event IDs for human inspection.

## Render-quality validation

### Capture contract

Automated comparisons require a reproducible capture manifest. At minimum, record:

```yaml
engine_commit: <sha>
scene_or_demo: <stable-id>
camera: <stable-id-and-transform>
graphics_api: <d3d12|vulkan|metal|webgpu|...>
gpu_and_driver: <exact-values>
resolution: <width>x<height>
dpi_scale: <value>
quality_preset: <value>
color_config: <ocio-config-or-explicit-transform>
exposure: <fixed-value>
random_seed: <value>
fixed_timestep: <value>
warmup_frames: <count>
capture_frame_or_time: <value>
asset_manifest_hash: <sha>
```

Save PNG or EXR masters. Lossy images are presentation derivatives, not regression baselines.

### Engine and independent comparison tools

- **Verified:** Unity's Graphics Test Framework can capture and compare reference images across supported platforms and graphics APIs. Pin the package to the Unity/graphics stack rather than installing an unofficial mirror.
- **Verified:** Unreal's Movie Render Queue can produce high-quality, temporally sampled, and high-bit-depth output. Pair it with fixed time, warm-up, stable streaming, and functional screenshot tests.
- **Verified:** Godot does not expose a comparably prominent official golden-image testing package in the reviewed documentation. A deterministic project-specific viewport capture harness is therefore required.
- **Verified:** OpenImageIO `idiff` supports thresholds, failure percentages, and difference images.
- **Verified:** [NVIDIA FLIP](https://github.com/NVlabs/flip) is a BSD-3-Clause perceptual image-difference evaluator supporting LDR and HDR workflows.

```sh
pip install flip-evaluator
flip -r reference.png -t test.png
```

### Acceptance gates

**Inference / recommendation:** use four gates, none substituting for the others:

1. **Correctness:** shader compilation succeeds, IR validates, graphics validation reports are clean, and no NaN/Inf/debug-output artifacts occur.
2. **Performance:** GPU/CPU frame time, pass cost, draw/dispatch count, VRAM, bandwidth proxies, overdraw, shader permutations, and compilation hitches stay within scene-specific budgets.
3. **Regression:** deterministic captures pass tuned absolute/perceptual thresholds, with diff and heat-map artifacts attached. Thresholds must be calibrated per platform; one global pixel threshold is misleading.
4. **Art direction:** a human reviews composition, value/color hierarchy, material response, motion, gameplay readability, novelty, consistency, and target-device appearance.

Numeric similarity cannot determine that a demo is impressive. Conversely, a beautiful frame can hide temporal instability, bad mip behavior, shader errors, or unacceptable GPU cost.

Separate two capture tracks:

- **Functional baselines** are stable, minimal, deterministic, and diagnostic.
- **Marketing captures** use the final camera, animation, motion, effects, and presentation treatment, but are approved after technical performance and privacy checks.

## Recommended specialist-agent workflow

The safest useful agent topology gives each specialist a bounded artifact and prevents several agents from simultaneously mutating the same binary scene.

| Role | Owns | Must produce | Must not decide alone |
|---|---|---|---|
| Render lead | Visual brief, reference board, constraints, acceptance matrix | Signed-off look target and priority order | Low-level shader implementation |
| Shader author | Shader source and material function design | Source, compiler manifest, reflection/binding report, validation output | Final visual quality or asset licenses |
| Material/texture TD | Material graphs, bakes, channel packing, compression | Provenance manifest, semantic map, source masters, platform outputs, mip report | Lighting or gameplay readability |
| Lighting/VFX artist | Exposure, lighting, atmospheric and motion effects | Shot/gameplay captures, timing sheet, scalability levels | GPU correctness or final performance acceptance |
| Engine integrator | Imports, bindings, material instances, scene hooks, packaging | Reproducible integration changes and runtime build | Self-approval of authored visuals |
| GPU diagnostics engineer | Read-only captures and profiler sessions | Event/counter findings tied to capture IDs | Art-direction changes |
| Visual QA | Capture harness, reference sets, metrics, device matrix | Reproduction manifest, diffs, performance table, failure classification | Rewriting source assets during validation |

### Handoff sequence

1. Render lead freezes a brief with references, gameplay camera, motion target, supported hardware, and explicit “not acceptable” examples.
2. Shader and texture specialists work from source-controlled text/manifests where possible. One named owner edits each binary scene or DCC file.
3. Engine integrator imports immutable versioned outputs and records all generated settings.
4. Lighting/VFX specialist authors motion and scalability variants in a dedicated checkpointed scene.
5. GPU diagnostics performs a read-only capture pass and returns event-specific findings.
6. Visual QA reproduces captures from the manifest and runs correctness, performance, and diff gates.
7. Render lead performs the human art-direction gate on target displays/devices.

**Inference / recommendation:** large binary assets should use Git LFS or an equivalent versioned asset store. Agents should exchange sidecar manifests and rendered previews, not overwrite each other's `.blend` files or shared Antiky assets. Transactions and undo are helpful but do not replace source control.

## Skills Antiky should build

These gaps are more valuable than another broad “make it look AAA” prompt.

### 1. `author-brometal-shaders`

- Declares source language, stages, entry points, defines, feature level, target APIs, binding schema, and precision expectations.
- Runs DXC, glslang, Tint/Naga, Slang, and SPIRV-Tools only where applicable.
- Stores compiler versions and diagnostics, validates generated IR, and includes intentional negative tests.
- Produces a machine-readable permutation and reflection manifest.
- Refuses to equate compilation with visual correctness.

### 2. `build-antiky-materials`

- Converts a material intent and supported-node specification into Antiky/BroMetal materials and parameter interfaces.
- Preserves the rule that only Antiky's owned `RenderDriver` reaches BroMetal directly.
- Validates texture color space, tangent basis, UV conventions, blend mode, depth/shadow behavior, motion vectors, and instancing.
- Generates controlled material test scenes rather than screenshots of arbitrary worlds.

### 3. `materialx-interchange`

- Validates graphs against an explicit supported subset.
- Records unsupported nodes and unit/color-space conversions into the Antiky/BroMetal material model.
- Generates deterministic baked fallbacks when allowed.
- Runs semantic tests and renderer-specific golden images before accepting parity.

### 4. `texture-bake-pipeline`

- Encodes high/low mesh, cage, ray distance, smoothing/tangent, UV/UDIM, dilation, resolution, supersampling, and seed inputs.
- Uses deterministic headless Blender, approved Substance automation, or Material Maker export.
- Emits source provenance, bake diagnostics, channel semantics, and lossless masters.
- Detects seams, skew, cage misses, inverted normals, padding failures, and invalid channel ranges.

### 5. `texture-compression-qa`

- Selects BCn, ASTC, ETC, or Basis modes by semantic map and target platform.
- Generates and validates mip chains and alpha coverage.
- Reports GPU memory, disk/download size, PSNR/SSIM/FLIP, and tiled close-up comparisons.
- Requires manual review for normals, gradients, emissive bloom sources, masks, and high-contrast UI/game art.

### 6. `lighting-lookdev`

- Starts from a reference board and gameplay readability requirement.
- Controls exposure, white balance, environment, key/fill/rim relationships, fog, shadows, and probe/reflection strategy.
- Evaluates bright, dark, neutral, and motion conditions at gameplay distance.
- Includes platform scalability and accessibility/readability checks.

### 7. `build-antiky-vfx`

- Converts effect intent into shape language and anticipation/action/recovery timing.
- Builds Antiky/BroMetal-native effects while using other engines only as conceptual references.
- Budgets particles, translucency, overdraw, texture samples, simulation, collision, bounds, lifetime, and LOD.
- Captures video or frame sequences because stills cannot validate motion.

### 8. `gpu-capture-triage`

- Routes D3D12 to PIX, Vulkan/D3D/OpenGL to RenderDoc where supported, NVIDIA-specific investigations to Nsight, and Metal to Xcode.
- Runs read-only by default and records capture environment metadata.
- Produces event-linked evidence, not generic optimization advice.
- Redacts captures and reports that can expose proprietary shader/resource data.

### 9. `render-golden-tests`

- Owns the deterministic capture manifest, warm-up, time/seed controls, and color management.
- Runs exact and perceptual comparisons with platform-calibrated tolerances.
- Stores reference, candidate, heat map, metrics, logs, and capture manifest together.
- Separates approved visual change from accidental baseline churn.

### 10. `render-art-direction-review`

- Evaluates composition, hierarchy, material differentiation, lighting motivation, shape language, motion, readability, coherence, novelty, and demo appeal.
- Requires comparison against the approved brief and competitive reference bar.
- Rejects technically valid but generic, repetitive, blurry, static, or unplayable-looking presentations.
- Keeps final judgment human-owned.

### 11. `render-asset-provenance`

- Records source URL, creator, license, acquisition date, modifications, generation service/model, allowed uses, attribution, and redistribution restrictions.
- Blocks unknown or incompatible source assets from release builds and public source repositories.
- Separates tool license, add-on license, source-asset license, and generated-output terms.

### 12. `editor-automation-safety`

- Requires clean branch/worktree, explicit target paths, transaction/checkpoint, dry run, and post-action diff.
- Allowlists tools and directories; denies arbitrary code, shell, deletion, network, upload, and packaging by default.
- Enforces loopback binding and authenticated remote transport where remote operation is unavoidable.
- Scrubs project paths, user names, terminal history, host information, API keys, and unrelated desktop content from captures.

### 13. Antiky/BroMetal rendering contract

This project-specific layer should define:

- supported shader languages and target compiler/backend matrix;
- material schema, texture semantics, binding/reflection rules, and hot-reload behavior;
- canonical material spheres, animated meshes, particle stress tests, lighting rigs, and gameplay-distance scenes;
- fixed-camera and fixed-time capture entry points;
- GPU marker hierarchy and performance counters;
- platform texture formats and package validation; and
- release-quality screenshot/video capture that cannot expose terminal or desktop PII.

## Adoption order

**Inference / recommendation:** adopt capability in the following order:

1. Build deterministic capture, privacy scrubbing, color management, and golden-image infrastructure first.
2. Add compiler/IR validation and a shader permutation manifest.
3. Add texture semantics, baking, and platform-compression QA.
4. Add Antiky/BroMetal-native material, lighting, and VFX workflows.
5. Add read-only GPU capture summarization.
6. Expand Antiky CLI/MCP/Studio render controls only after threat review and bounded-tool evals.
7. Add art-direction and motion-review gates before producing public demos.

The first three steps establish trustworthy feedback. Editor automation introduced before those gates can generate more assets quickly while making quality, regressions, provenance, and security harder to control.

## Minimum Antiky rendering evaluation

Use one deliberately small but visually demanding test asset and one animated scene. Evaluate every candidate against the same rubric:

- reproduces from a clean checkout without interactive hidden state;
- does not read or write outside allowlisted project paths;
- makes no external network call unless explicitly approved;
- compiles and validates all target shader variants;
- imports correct texture color spaces and tangent conventions;
- produces artifact-free mips and acceptable final GPU compression;
- survives the engine's graphics validation layers;
- fits measured target-hardware budgets;
- reproduces deterministic reference frames;
- looks correct in motion and at gameplay distance;
- records all source/asset licenses; and
- leaves reviewable diffs and a rollback point.

Record rejected candidates and the reason. “Generated a scene successfully” is not a passing criterion.

## Primary references

### Shader and material standards

- [Microsoft DirectX Shader Compiler](https://github.com/microsoft/DirectXShaderCompiler)
- [Khronos glslang](https://github.com/KhronosGroup/glslang)
- [Khronos SPIRV-Tools](https://github.com/KhronosGroup/SPIRV-Tools)
- [Google shaderc](https://github.com/google/shaderc)
- [Dawn / Tint source](https://dawn.googlesource.com/dawn)
- [wgpu / Naga](https://github.com/gfx-rs/wgpu)
- [Slang shader compiler](https://github.com/shader-slang/slang)
- [ASWF MaterialX](https://github.com/AcademySoftwareFoundation/MaterialX)

### Engine systems and automation

- [Unreal Engine Materials](https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-materials)
- [Unreal Niagara](https://dev.epicgames.com/documentation/en-us/unreal-engine/creating-visual-effects-in-niagara-for-unreal-engine)
- [Unreal Movie Render Pipeline](https://dev.epicgames.com/documentation/en-us/unreal-engine/movie-render-pipeline-in-unreal-engine)
- [Unity Shader Graph](https://docs.unity3d.com/Manual/shader-graph.html)
- [Unity VFX Graph](https://docs.unity3d.com/Packages/com.unity.visualeffectgraph@latest)
- [Godot shaders](https://docs.godotengine.org/en/stable/tutorials/shaders/index.html)
- [VibeUE](https://github.com/kevinpbuckley/VibeUE)
- [CoplayDev Unity MCP](https://github.com/CoplayDev/unity-mcp)
- [Coding-Solo Godot MCP](https://github.com/Coding-Solo/godot-mcp)
- [Blender MCP](https://github.com/ahujasid/blender-mcp)

### Texture and image pipeline

- [Blender licensing](https://developer.blender.org/docs/license/)
- [Material Maker](https://github.com/RodZill4/material-maker)
- [Substance Designer scripting](https://experienceleague.adobe.com/en/docs/substance-3d-designer/using/scripting/scripting)
- [Substance Automation Toolkit `sbscooker`](https://helpx.adobe.com/substance-3d-sat/command-line-tools/sbscooker.html)
- [OpenImageIO](https://github.com/AcademySoftwareFoundation/OpenImageIO)
- [OpenColorIO](https://github.com/AcademySoftwareFoundation/OpenColorIO)
- [KTX-Software](https://github.com/KhronosGroup/KTX-Software)
- [Basis Universal](https://github.com/BinomialLLC/basis_universal)
- [Arm ASTC Encoder](https://github.com/ARM-software/astc-encoder)
- [Microsoft DirectXTex](https://github.com/microsoft/DirectXTex)
- [AMD Compressonator](https://github.com/GPUOpen-Tools/compressonator)

### Debugging and validation

- [RenderDoc](https://github.com/baldurk/renderdoc)
- [PIX introduction](https://devblogs.microsoft.com/pix/introduction/)
- [NVIDIA Nsight Graphics](https://developer.nvidia.com/nsight-graphics/get-started)
- [Xcode Metal capture](https://developer.apple.com/documentation/xcode/capturing-a-metal-workload-in-xcode)
- [Vulkan Validation Layers](https://github.com/KhronosGroup/Vulkan-ValidationLayers)
- [NVIDIA FLIP](https://github.com/NVlabs/flip)
