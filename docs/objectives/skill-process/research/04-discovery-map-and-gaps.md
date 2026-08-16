# Recurring discovery map and research gaps

## Findings from the expanded target search

The follow-up search found four source classes that materially improve the discovery map.

### A human-led game-jam case

[A Generative AI Game Jam Case Study from October 2024](https://openaccess.thecvf.com/content/CVPR2025W/CV2/papers/Spjut_A_Generative_AI_Game_Jam_Case_Study_from_October_2024_CVPRW_2025_paper.pdf)
documents one experienced programmer building *Plunderwater: Sunken Treasure* over a few days. The
paper says the author retained the game source and chat logs, describes where human edits remained
necessary, and reports that the result was playable but lacked its intended objectives. It is a
strong target for a source-faithful game-jam pipeline, but it remains one author-run case.

### Code-and-play repair loops

[GUI Agents for Continual Game Generation](https://arxiv.org/abs/2605.28258) defines PlaytestArena
and Play2Code. A game agent and GUI playtester share memory and repeatedly generate, run, play,
report, and revise browser games. Its 200-task evaluation makes it a high-priority source for
runtime feedback and bounded repair. Automated rubric checks must remain separate from human
judgments about fun, comprehension, or taste.

[GameCraft-Bench](https://github.com/FreedomIntelligence/gamecraft-bench) requires a complete Godot
project and replayable input traces. Its verifier launches the game, replays the traces, records
gameplay evidence, and applies a hidden rubric. This supplies unusually concrete artifact and
interactive-verification gates, but it is benchmark evidence rather than a production workflow.

### Real game-jam project corpora

[JAMER / JamSet / JamBench](https://arxiv.org/abs/2606.19830) reports 8,133 runtime-verified Godot
projects mined from more than 240,000 game-jam repositories, including 300 manually verified
benchmark projects. Its promised public code and data could lead to real briefs, histories, builds,
and postmortems. Its dataset-construction flow is not itself a developer pipeline.

### Young evidence-first repositories

[GameDesignOS](https://github.com/DY-2026/GameDesignOS) and the
[Unreal Agent Benchmark](https://github.com/44-99/unreal-agent-benchmark) expose useful evidence,
human-gate, rollback, save/reopen, package, and smoke-test concepts. Both remain leads. GameDesignOS
needs independent project outcomes; the Unreal benchmark had not yet published formal scored
results and includes a private asset service. [Summer Engine](https://github.com/SummerEngine/summer-engine-agent)
is another source-graph target, not yet evidence of a practiced portable pipeline.

## Highest-priority next targets

### Production and research pipelines

- [EA SEED](https://www.ea.com/seed) for learned-agent playtesting, transfer into production, and
  later follow-ups to the 2023 QA report.
- [DreamGarden](https://arxiv.org/abs/2410.01791) and its author/source graph for hierarchical
  planning, intermediate artifacts, and visual feedback.
- [GameDevBench](https://arxiv.org/abs/2602.11103) for tasks, repositories, visual-feedback
  ablations, and follow-up systems. Its reported improvement supports observation loops generally;
  it does not validate any one candidate pipeline.
- [Articraft](https://github.com/articraftresearch/Articraft) and its
  [paper](https://arxiv.org/abs/2605.15187) for isolated programmatic 3D creation, compilation,
  authored tests, stale-output protection, and iterative repair.
- [Manifest3D](https://github.com/scottstts/Manifest3D) for semantic checklists, engine verification,
  and agentic 3D repair.
- [iv4XR](https://github.com/iv4xr-project/iv4xr-framework) and the BDD/RL paper source graph for
  longer-running agent-based game testing.

### Pipeline-rich repositories from the earlier corpus

- [OpenAI game-studio material](https://github.com/openai/plugins/tree/main/plugins/game-studio)
- [worldwonderer/novel-to-game](https://github.com/worldwonderer/novel-to-game)
- [Claude Code Game Studios](https://github.com/Donchitos/Claude-Code-Game-Studios)
- [LVTD game-development skills](https://github.com/LVTD-LLC/skills)
- [Three.js game skills](https://github.com/majidmanzarpour/threejs-game-skills)
- [Godot deterministic asset work](https://github.com/LuigiDeFacci/godot-create-3d-assets)
- [Unity CLI Loop](https://github.com/hatayama/unity-cli-loop)
- [AutoUE](https://arxiv.org/abs/2603.07106)

These sources contain explicit flows, but most still need independent use evidence.

### Practitioner and studio evidence

Monitor named authors and groups rather than generic AI aggregation pages:

- EA SEED and its game-testing researchers;
- Ubisoft La Forge and later evidence about Ghostwriter adoption;
- Microsoft Research, NYU Game Innovation Lab, and DreamGarden/DreamCraft authors;
- Foundations of Digital Games, IEEE Conference on Games, CHI PLAY, UIST, CHI, AIIDE, and the
  Games and Software Engineering workshop;
- GDC talks, studio engineering blogs, and postmortems that expose artifacts, gates, failures, and
  named productions;
- public game-jam repositories with timestamped commits, downloadable builds, rules, and
  retrospectives;
- itch.io devlogs and public prototypes that retain briefs, instrumentation, uncoached observations,
  and keep/kill decisions.

Community lists, registry pages, and social posts should lead to these primary sources. They should
not become evidence by themselves.

## What each recurring search should record

- Direct source URL, author, snapshot date, and license
- Author-stated ordered flow
- Inputs, artifacts, gates, feedback, failure, and stop conditions
- Repository age, substantive history, releases, contributors, and outside issues/PRs
- Named games, builds, study participants, trials, or production teams
- Independent references or replication
- Source-specific constraints that portability would erase
- Explicitly unverifiable claims

The record should also note what was read versus what was run. This research installed and ran no
external pipeline.

## Material gaps

1. No mature, independently validated end-to-end pipeline spans idea, design, implementation,
   content, playtesting, release, and post-release learning.
2. Human games-user-research pipelines have better professional methodology than current public
   agent-skill implementations, but the bridge between them is poorly demonstrated.
3. Accessibility, localization/LQA, audio, certification, privacy, rights, and live operations are
   underrepresented as ordered AI-assisted processes.
4. No credible cross-engine audio path covers rights → authoring → middleware/events → runtime →
   mix validation.
5. No robust cross-engine material-equivalence or content-import validation process was found.
6. Public workflows rarely show long-term maintenance after the generated prototype works.
7. Simulated player personas are often adjacent to real player research without a hard evidence
   boundary.
8. Visual validation often stops at a static screenshot rather than motion, runtime state,
   performance, and target comparison.
9. No common capability-negotiation or mutation-safety contract exists across editor bridges.
10. Most candidate projects lack longitudinal evidence from outside users and shipped games.

## Open questions for later research

- Which real teams have used these pipelines repeatedly across more than one project?
- Which pipeline steps survive contact with a long-lived game codebase rather than a prototype?
- Which agent workflows measurably improve quality, throughput, or learning against a no-skill
  baseline?
- Which failures recur across genres, project sizes, engines, and team experience levels?
- What evidence can be published without exposing private game assets, player data, licensed SDKs,
  or production credentials?
- Which source-specific pipelines have enough common structure to justify a generalized companion
  page without falsifying their constraints?
