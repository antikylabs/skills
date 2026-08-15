# Game-development skill-library research

Research snapshot: 2026-08-09

This directory evaluates public agent skills, engine-control integrations, production workflows,
and specialist-agent team structures to inform an internal skill library for **Antiky Framework,
BroMetal, Antiky Studio, and games built with them**. Unity, Unreal, Godot, and their integrations
are comparative case studies, not implementation targets. It is research, not an installation
manifest. No skill, MCP server, editor plugin, engine, or DCC extension was installed while
producing these reports.

## Decision summary

The public ecosystem contains useful parts, but no package found should be adopted wholesale.
The strongest direction is an Antiky-native layered library with:

1. small, portable workflow skills;
2. authoritative, revision-pinned Antiky and BroMetal knowledge;
3. narrow Antiky CLI, MCP, Studio, runtime, and BroMetal control surfaces;
4. project-specific product and art direction;
5. independent verification, playtest, performance, privacy, and release gates.

Five findings recur across every research track:

- A `SKILL.md` knowledge package and a live editor bridge solve different problems. Treating them
  as interchangeable hides both capability gaps and security risk.
- Engine APIs can create valid objects without creating a good game. The library must put game
  design, art direction, game feel, UX, sound, playtesting, and producer-controlled scope on equal
  footing with implementation.
- One agent should own a live editor or shared binary asset at a time. Parallel agents can research,
  design, write isolated source, review, and prepare bounded change packets.
- A screenshot is evidence that a frame rendered, not proof of polish. Approval needs deterministic
  captures, motion, runtime state, performance evidence, a declared visual target, and independent
  judgment.
- Editor bridges, DCC scripting, logs, captures, and crash reports are privileged data surfaces.
  Default to local and read-only, deny arbitrary execution and outbound data, checkpoint changes,
  and never capture unrelated desktop, terminal, username, path, or account information.

## Target and comparative sources

| System | Role in this research | What Antiky should take from it |
| --- | --- | --- |
| Antiky Framework, BroMetal, Studio, and Antiky games | Sole implementation and evaluation target | Build project-native skills, contracts, tooling, fixtures, and quality gates around Antiky's actual architecture |
| Unreal Engine and VibeUE | Comparative case study only | Lazy toolset discovery, typed operations, transactions, state readback, single-writer editor control |
| Unity | Comparative case study only | Structured CLI results, build/test evidence, reload barriers, and serialized-asset safety |
| Godot | Comparative case study only | Text-friendly authoring, headless execution, deterministic replay, runtime capture, and import validation |
| Blender and graphics tooling | Bounded production dependencies or comparative tools | Deterministic asset processing, provenance, shader validation, GPU inspection, and scoped capture |

There is no Unity, Unreal, or Godot support roadmap in this package. Their reports exist to expose
patterns, failure modes, and useful evaluation ideas that can be translated into Antiky-native
capabilities without importing another engine's object model.

## Report map

| Report | What it answers |
| --- | --- |
| [Public registry inventory](registry-inventory.md) | What `find-skills` and skills.sh surface, which results are promising, and where the registry is weak or polluted |
| [Unreal and VibeUE comparative study](unreal-vibeue.md) | Patterns to mine from native UE 5.8 MCP, VibeUE, tool discovery, transactions, state readback, security, and serialized editor operation |
| [Unity comparative study](unity.md) | Patterns to mine from first-party CLI/MCP surfaces, structured tests/builds, reload handling, Shader Graph/assets, and editor safety |
| [Godot comparative study](godot.md) | Patterns to mine from text-native authoring, headless automation, deterministic execution, runtime capture, testing, and exports |
| [Rendering, shaders, and materials](rendering-shaders-materials.md) | Shader languages and validators, engine materials/VFX, textures, compression, color, GPU capture, visual QA, and technical-art roles |
| [Art and content pipeline](art-content-pipeline.md) | Concept and art direction, 2D/3D DCC workflows, animation, audio, provenance, visual review, and content-specialist roles |
| [Game design and player experience](game-design-ux.md) | Core loops, mechanics, level design, game feel, UI/UX, accessibility, playtesting, telemetry, and design-agent boundaries |
| [Production and QA](production-qa.md) | Producer, QA, performance, build/release, localization, certification, privacy, playtests, community feedback, and live operations |
| [Orchestration and library design](orchestration-and-library-design.md) | Skill format, routing, artifact contracts, concurrency, permissions, subagent setup, eval design, and library maintenance |
| [Recommended library](recommended-library.md) | Cross-report synthesis, proposed internal taxonomy, first skills, evaluation harness, adoption decisions, and roadmap |

## Evidence standard

Reports distinguish among verified primary-source facts, publisher or maintainer claims, and our
inferences. Install counts, stars, and advertised tool counts are discovery signals rather than
quality proof. Fast-moving claims are dated, and adoption requires a fresh source, version, license,
and security review.

The default candidate policy is:

1. inspect source and every referenced script or asset;
2. pin a tag or commit and record its license and dependencies;
3. install only in a disposable project with no secrets or private assets;
4. begin read-only and verify the exact project, engine, editor, and connection;
5. run the same representative vertical-slice benchmark repeatedly;
6. compare with a no-skill baseline and inspect transcripts, diffs, captures, and failures;
7. promote only the narrow capabilities that improve quality without unacceptable authority or
   fragility.

## What this research does not claim

- Repository popularity does not establish production readiness.
- A project's own tests or demo do not provide independent validation.
- Passing compilation, a successful export, or a generated screenshot does not establish fun,
  readability, originality, artistic coherence, accessibility, or release quality.
- Recorded install commands are reproducibility notes, not recommendations to execute them.
- No external skill or bridge has yet passed an Antiky-owned benchmark.

The next step is to define representative Antiky jobs, benchmark the current scaffold skills
against a no-skill baseline, and implement the minimum Antiky/BroMetal library and evaluation
harness described in [recommended-library.md](recommended-library.md). External engine bridges do
not enter that implementation path.
