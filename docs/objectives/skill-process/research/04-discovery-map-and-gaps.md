# Recurring discovery map and research gaps

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

