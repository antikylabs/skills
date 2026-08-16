# Independent web discovery beyond the seeds

Research date: 2026-08-16

This report uses the plan’s evidence labels:

- **Established** — verified in a primary source.
- **Claimed** — asserted by an author or maintainer but not independently verified.
- **Inferred** — a portable pattern derived from multiple established or claimed observations.
- **Unverifiable** — the public evidence found in this pass cannot resolve the claim.

## Headline findings

The strongest public evidence is not for autonomous “idea to shipped game” systems. It is for narrower, inspectable loops:

1. augment an existing QA system with learned playtest agents;
2. decompose a prototype into small implementation tasks and compile or visually evaluate each task;
3. move from coarse generated imagery to human-selected, region-level edits;
4. feed recorded player behavior back into a constrained design-editing loop;
5. use an LLM for divergent design suggestions, while a human retains selection and “feel” judgment;
6. preserve stable asset interfaces by replacing named placeholders rather than regenerating project structure;
7. run the actual game and feed screenshots, video, telemetry, or state assertions back into implementation.

The public record is much weaker for long-running, end-to-end agent studios. The most visible repositories are recent, mostly maintained by one project, and validated primarily by their own demos.

The credible first library should therefore begin with the narrower practiced loops. End-to-end agent-studio repositories should remain discovery leads until their histories, independent users, and shipped outputs become stronger.

---

## Findings mapped to the numbered questions

### 1. Which general pipelines are explicitly documented or repeatedly demonstrated?

**Established pipelines found:**

1. **Staged learned-agent integration for game QA**  
   Production test need → simplified prototype → engine-native test range → production environment → hybrid scripted/RL bot → handoff to QA/QV.

2. **Hierarchical prompt-to-playable-slice prototyping**  
   Seed prompt → hierarchical plan → human pruning/expansion → specialist implementation tasks → compile/runtime/visual evaluation → repair loop → playable intermediate environment.

3. **Coarse-to-fine generative world visualization**  
   Overall scene prompt → select a candidate → sketch or region edit → generate variants → select/reuse → compose tiles → blend and refine.

4. **Behavior-trace-driven game tuning**  
   Gameplay goal + current configuration → agent play episodes → telemetry and/or image strip → multimodal analysis → configuration edit → replay until the behavior approaches the goal.

5. **AI-as-divergent-design-input**  
   Minimal core loop → request feature and game-feel suggestions → inspect suggestions → prototype selected ideas → human play/feel judgment → refine or discard.

6. **Human-ranked narrative draft generation**  
   Define character and utterance context → generate variants → writer compares/selects → writer edits → preference data updates the model.

7. **Placeholder-to-generated-asset upgrade**  
   Create stable named placeholders → generate replacements at the same paths → import through the active engine → discipline-specific human review.

8. **Acceptance-criteria-to-runtime-verification**  
   GDD acceptance criteria → scaffold → implement → launch the real game → drive input and inspect live state → fix failures → build.

9. **Template-scaffold-and-debug agent loop**  
   Classify request → select a known project skeleton → generate implementation/assets → run in a sandbox → match failures to verified fixes → repeat until playable.

10. **Natural-language BDD with learned playtesting**  
    Describe behavior and expected outcome → construct an RL test scenario → train/run the agent → evaluate behavior against the scenario.

### 2. Which are practiced processes rather than checklists or promotions?

Enough public evidence exists to call these **practiced research or production processes**:

- EA’s staged learned-agent QA integration: exercised against Battlefield 2042 and Dead Space (2023), integrated with an existing test-bot system, and handed to Quality Verification testers.
- DreamGarden: exercised in a ten-participant study with full prompt, artifact, code, log, screenshot, and edit histories.
- WorldSmith: exercised in a formative study and a 13-participant first-use study; interaction logs show users moving from coarse prompts to finer sketch and region edits.
- Fly, Fail, Fix: repeated experimental trials across five broken configurations, four feedback conditions, ten trials per condition, and multiple iterations per trial.
- The Ink Splotch Effect: nine prototypes across three genres and a blinded evaluation with 45 responses.
- The BDD/RL testing framework: reported validation on four Python games, although the full implementation artifact was not located in this pass.

These have observable flows but only **self-validation or weak use evidence**:

- Everything Game Dev Code.
- OpenGame.
- Phaser 4 Game Dev.
- Ubisoft Ghostwriter.

None of those four has convincing public, independent evidence that outside teams repeatedly used the complete pipeline to ship games.

### 3. What stages, artifacts, gates, feedback loops, roles, and failures appear?

The evidence cards below contain the source-specific details.

Recurring elements across otherwise different sources are:

- **Artifact anchors:** game configuration, GDD acceptance criteria, hierarchical plan, named placeholder paths, natural-language test scenarios.
- **Execution gates:** compile success, engine boot, active scene, asset-load success, frame rate, observed score, expected interaction, writer selection, or human visual judgment.
- **Feedback artifacts:** logs, screenshots, video strips, telemetry, code, generated variants, live game state, player rankings.
- **Human authority:** prune a plan, select a draft, choose a visual candidate, decide whether game feel is acceptable, or approve a production-facing artifact.
- **Failure paths:** bounded retries, fall back to placeholders, simplify the environment, retrain, return to implementation, manually repair an unfixable result, or leave the candidate unaccepted.

### 4. Which portable skills could support them?

Potential portable skills recur in clusters:

- define a game-design or test objective;
- decompose a playable slice into dependency-ordered tasks;
- maintain acceptance criteria;
- create and manage stable placeholders;
- generate, inspect, select, and record asset provenance;
- compile and repair generated game code;
- launch and instrument a playable build;
- capture screenshots, video, telemetry, and live state;
- turn observations into bounded revisions;
- define RL actions, observations, rewards, and test ranges;
- preserve human gates for creative and production decisions;
- record verified failure signatures and fixes.

These are research-derived potential skills. The sources do not assert that Antiky or any specific portable skill package already provides them.

### 5. What should later discovery passes monitor?

See “Recurring discovery targets” below.

### 6. How can a five-minute pipeline document remain faithful?

Use only the source’s observable spine in the Mermaid diagram:

- keep the diagram to roughly five to eight nodes;
- show only gates or branches that the source actually uses;
- name source artifacts, such as `game configuration`, `visual evaluation`, or `writer selection`;
- put engine-specific implementation in “Pipeline Details,” not in generalized diagram nodes;
- separate “author-stated,” “observed in study,” and “portable inference”;
- list supporting skills as Antiky’s interpretation, not as something the author prescribed;
- retain the source’s failure path even if it makes the flow less tidy;
- include an evidence status and direct sources near the top.

A concise document can generalize labels without silently adding stages. For example, DreamGarden’s Unreal compilation loop can be titled “runtime verification,” but its details must preserve that the source compiled C++ Actor classes, launched Unreal, captured screenshots, and used visual feedback.

### 7. Which pipelines belong in an initial library?

**Credible initial entries, with evidence qualifiers:**

- Staged learned-agent QA integration — production-observed.
- Hierarchical prompt-to-playable-slice prototyping — study-observed.
- Coarse-to-fine generative world visualization — study-observed.
- Behavior-trace-driven game tuning — experimentally demonstrated.
- AI-as-divergent-design-input — experimentally demonstrated, but the recommended human-selection form is partly inferred.
- Runtime visual-feedback repair — cross-source pattern supported by DreamGarden, GameDevBench, OpenGame, and Phaser 4 Game Dev.
- Placeholder-to-production asset upgrade — source-demonstrated but still self-validated; acceptable only if marked provisional.

**Keep as leads:**

- OpenGame end-to-end generation.
- Everything Game Dev Code’s entire concept-to-live-ops lifecycle.
- Phaser 4’s whole build lifecycle.
- Ghostwriter’s production narrative workflow.
- BDD/RL testing as a generalized QA pipeline.
- GameGPT’s multi-agent development process.

---

## Ranked candidate table

Rank reflects suitability for the first library, not an aggregate quality score. Every evidence signal remains separate.

| Rank | Candidate | Pipeline evidence | Use evidence | Provenance | Independent validation | Maturity signals as of 2026-08-16 | Portability | Disposition |
|---:|---|---|---|---|---|---|---|---|
| 1 | Staged learned-agent QA integration | Strong: ordered prototype → test range → production → hybrid bot deployment | Strong: Battlefield 2042, Dead Space (2023), QV handoff | Identified EA researchers with production context | No independent replication found | Research sequence from 2020–2023; named shipped AAA games | Strong underlying process | Initial library |
| 2 | Hierarchical prompt-to-playable-slice prototyping | Strong: plan tree, task routing, compile and visual repair loops | Ten-person instrumented study; generated environments | NYU, UT Austin, Microsoft researchers | CHI review and award; no independent replication | Submitted 2024, CHI 2025, revised 2025 | Strong after preserving Unreal variant | Initial library |
| 3 | Coarse-to-fine generative world visualization | Strong: generate, select, local edit, compose, blend | Formative study of 4; first-use study of 13 | Identified HCI researchers | UIST 2023 review; no production replication | Published 2023 | Strong for concept/world art | Initial library |
| 4 | Behavior-trace-driven game tuning | Strong: play → summarize → revise configuration → replay | Repeated controlled trials on five broken configurations | NVIDIA researchers identified | Workshop publication; no external replication | Published 2025 | Strong if constrained to editable parameters | Initial library, experimental |
| 5 | AI-as-divergent-design-input | Strong experimental protocol; recommended human-led form is inferred | Nine prototypes; 45-response blinded study | Identified FDG authors with game-AI research provenance | FDG review; no replication found | Published 2024 | Strong | Initial library, label inference |
| 6 | Placeholder-to-generated-asset upgrade | Strong: stable paths → replacement → import → discipline review | Thirteen self-reported sample games; one documented generated-asset variant | Maintainer identifiable by GitHub handle; game-industry provenance not verified | None found | 138 commits, 71 stars, 10 forks; no releases shown | Strong | Provisional initial entry |
| 7 | Human-ranked narrative drafts | Strong: contextualize → generate pairs → select/edit → learn | Ubisoft described an operational tool and thousands of selections | Ubisoft La Forge; creator’s research history traceable | Axios reported it was not yet in a title’s production flow in March 2023 | Public since 2023; later production adoption not verified | Strong | Lead |
| 8 | Natural-language BDD plus RL testing | Strong in paper abstract | Four Python games reported | Identified software-engineering researchers | Peer-reviewed GAS 2024; no independent use located | Positional paper 2023, evaluated paper 2024 | Moderate to strong | Lead pending artifacts |
| 9 | Acceptance-criteria-to-runtime-verification | Very strong repository specification | Maintainer demonstrations only | Maintainer identifiable; practitioner history not established here | GameDevBench independently supports visual feedback generally, not this project | 17 commits, 19 stars, 1 fork, no releases shown | Strong despite Phaser variant | Lead |
| 10 | Template-scaffold-and-debug generation | Strong source flow | Six downloadable demos; claimed evaluation on 150 prompts | CUHK MMLab researchers | No independent replication; benchmark tooling still marked “release soon” | Released 2026-04-21; 13 commits, 2.8k stars, 411 forks; no releases shown | Moderate | Lead |
| 11 | Full concept-to-live-ops agent scaffold | Strong worked-example flow | Thirteen self-reported samples | Maintainer provenance incomplete | None found | Same repository as rank 6 | Strong in abstraction, very broad | Lead; split before use |
| 12 | GameGPT multi-agent planning and implementation | Paper states planning, task identification, implementation, review, and decoupled code generation | No convincing repeated-use artifact found | Authors identified | No replication found | 2023 arXiv paper | Moderate | Lead only |

Popularity and forks in this table are discovery signals. They are not evidence that the pipeline works.

---

# Evidence cards

## 1. Staged learned-agent QA integration

**Status:** Established production experiment.

**Primary source:** [Technical Challenges of Deploying Reinforcement Learning Agents for Game Testing in AAA Games](https://arxiv.org/abs/2307.11105)

### Author-stated flow

1. Identify testing cases where scripted bots are difficult or fragile.
2. Reproduce the essential actions and observations in a simple prototype environment.
3. Iterate on observation representation, rewards, and model architecture in the prototype.
4. Construct an engine-native test range containing only essential production features.
5. transfer the learned setup into the production game.
6. Replace only the unsuitable locomotion component; retain the existing scripted bot for higher-level objectives.
7. expose the combined system to QV testers.

### Artifacts

- test-case definition;
- prototype environment;
- engine-native test range;
- observation and action spaces;
- reward function;
- trained policy;
- ONNX model;
- integration with the existing AutoPlayers system;
- QV test execution.

### Gates and feedback

- The prototype must expose actions and observations close enough to production.
- The test range must preserve production-relevant dynamics.
- The policy must transfer to the production environment.
- Training stability matters more than peak performance in a changing production build.
- QA/QV usability is a separate gate from model performance.

### Failures and limitations

- Production games are slow and difficult to parallelize.
- Visual observations are sensitive to changing textures and post-processing.
- Faster-than-real-time simulation can break physics.
- Off-policy training can be sample-efficient but unstable.
- Rewards without corresponding observations can undo training.
- Late integration can make required game instrumentation impractical.
- Non-ML testers may not be able to tune rewards or diagnose learned behavior.

### Evidence signals

- **Use evidence — established:** the paper reports work involving Battlefield 2042 and Dead Space (2023), and says the capability reached QV testers.
- **Provenance — established:** authors and game contexts are named.
- **Independent validation:** none found. The evidence is a first-party technical report.
- **Portability — established/inferred:** the authors describe a standardized Gym-like API supporting Frostbite, Unity, Unreal, and classical environments; the general staged-transfer process is portable.

### Potential supporting skills

- `identify-agent-test-cases` — find tests that benefit from learned behavior instead of scripts.
- `design-game-agent-interface` — define actions, observations, termination, and rewards.
- `build-game-test-range` — preserve essential mechanics in a reduced environment.
- `validate-agent-transfer` — compare prototype, test-range, and production behavior.
- `integrate-hybrid-test-bot` — combine deterministic objectives with learned control.
- `inspect-agent-playtest-results` — surface failures in a form QA can diagnose.

---

## 2. Hierarchical prompt-to-playable-slice prototyping

**Status:** Established research workflow; not a demonstrated production pipeline.

**Primary sources:** [DreamGarden paper](https://arxiv.org/abs/2410.01791), [Microsoft Research publication page](https://www.microsoft.com/en-us/research/publication/dreamgarden-a-designer-assistant-for-growing-games-from-a-single-prompt/)

### Author-stated flow

1. A human supplies an open-ended seed prompt.
2. A broad planner turns it into an Unreal game outline and high-level plan.
3. A sub-planner recursively expands the plan into dependency-ordered leaf tasks.
4. A human may prune or expand plan nodes.
5. Specialist modules generate or acquire assets and write C++ Actor code.
6. Generated artifacts and prior code are passed forward to dependent tasks.
7. Code is compiled and run.
8. Logs and screenshots produce automated visual feedback.
9. The code generator revises the result for a bounded number of attempts.
10. A human may launch an intermediate build, edit code, replace assets, or revise feedback.

### Artifacts

- seed prompt;
- editable plan tree;
- implementation tasks;
- C++ Actor files;
- generated or downloaded meshes;
- actor layout;
- compiler and runtime logs;
- screenshots;
- visual-evaluation nodes;
- complete prompt and action history.

### Gates and feedback

- Leaf tasks must match an available implementation module.
- Code must compile before visual evaluation.
- Screenshots and runtime logs drive repair.
- A human can override planning and implementation at multiple levels.
- The paper used bounded code-generation retries.

### Failures and limitations

- Generated code and scenes can be slow to compile and inspect.
- Users wanted more intermediate state visibility.
- Visual feedback misses success conditions that are not visually obvious.
- Fine artistic control and tacit “good enough” judgment remain difficult.
- Unreal had to be closed and relaunched in the reported implementation.
- The study involved ten participants, most with limited Unreal familiarity.
- The output target was an early playable snippet, not a production-ready game.

### Evidence signals

- **Use evidence — established:** ten-person, 45-minute maximum sessions; prompts, code, artifacts, logs, screenshots, edits, screen recordings, and audio were captured.
- **Provenance — established:** named NYU, UT Austin, and Microsoft authors.
- **Independent validation:** no replication found. CHI review and the Best Paper award are maturity signals, not replication.
- **Adjacent validation — established:** [GameDevBench](https://arxiv.org/abs/2602.11103) later found that image/video feedback improved agent success across 333 game-development tasks, but it did not evaluate DreamGarden itself.

### Potential supporting skills

- `decompose-playable-slice` — convert an idea into dependency-ordered implementation tasks.
- `route-game-implementation-task` — choose code, procedural asset, generated asset, or sourced asset work.
- `compile-and-repair-game-code` — use compiler/runtime evidence in a bounded repair loop.
- `visually-evaluate-gameplay` — capture and assess the running result.
- `prune-or-expand-plan` — preserve a human-editable task tree.
- `checkpoint-game-prototype` — retain inspectable intermediate builds and artifacts.

---

## 3. Coarse-to-fine generative world visualization

**Status:** Established user-study workflow.

**Primary source:** [WorldSmith: Iterative and Expressive Prompting for World Building with a Generative AI](https://arxiv.org/abs/2308.13355)

### Observed flow

1. Describe an overall scene.
2. Generate candidates and select a useful initial image.
3. Add or alter content through region descriptions, masks, and sketches.
4. Generate variants and compare them.
5. Reuse selected images or assets in later edits.
6. preserve branches and snapshots in a tree.
7. create multiple detailed tiles.
8. position and scale tiles into a larger composition.
9. describe the relationship between tiles and blend the gaps.
10. iterate on the combined result.

### Artifacts

- overall scene descriptions;
- region descriptions;
- masks;
- sketches;
- generated variants;
- selected image tiles;
- tree snapshots;
- final composite world image.

### Gates and feedback

- The human selects useful candidates.
- The human changes modality when text is inadequate: text → sketch → region mask.
- The human controls composition, spatial relationships, and reuse.
- The tree retains alternatives instead of overwriting them.

### Failures and limitations

- This produces world visualization, not engine-ready levels or production art.
- The study evaluated first use, not long-term studio integration.
- The system used four tiles during the study.
- Output quality and controllability depend on the image model.
- The study was small: four formative participants and thirteen first-use participants.

### Evidence signals

- **Use evidence — established:** logged participant interactions showed a recurring movement from coarse text prompting toward finer sketch and region editing.
- **Provenance — established:** authors and UIST 2023 publication are identified.
- **Independent validation:** no production replication found.
- **Portability — established:** the process is model- and engine-independent at the level of operations.

### Potential supporting skills

- `draft-world-visual-brief` — state composition, mood, perspective, and constraints.
- `generate-visual-variants` — produce alternatives without overwriting prior selections.
- `refine-image-by-region` — turn local visual intent into bounded edits.
- `compose-concept-tiles` — assemble detailed components into a coherent whole.
- `record-visual-branch-history` — retain prompts, selections, masks, and ancestry.
- `review-concept-art-for-production` — decide whether an image is reference, placeholder, or a candidate for further production work.

---

## 4. Behavior-trace-driven game tuning

**Status:** Established experiment; production applicability remains claimed.

**Primary sources:** [Fly, Fail, Fix paper](https://arxiv.org/abs/2507.12666), [NVIDIA Research publication page](https://research.nvidia.com/publication/2025-08_fly-fail-fix-iterative-game-repair-reinforcement-learning-and-large-multimodal)

### Author-stated flow

1. Give the designer model a gameplay goal and editable configuration.
2. Run a fixed RL player for several episodes.
3. record numerical metrics and/or a compact strip of video frames.
4. provide the current configuration and play traces to the multimodal designer.
5. ask it to explain and produce a complete revised configuration.
6. replay the revised game.
7. repeat for a bounded number of iterations.

### Artifacts

- gameplay goal;
- configuration schema;
- current YAML configuration;
- episode metrics;
- recorded video;
- image-strip summaries;
- revised configurations;
- per-iteration score distributions.

### Gates and feedback

- Each episode ends on collision, duration limit, or score limit.
- The experiment targeted a score of exactly ten.
- Five player episodes informed each revision.
- The study allowed nine revisions after the initial configuration.
- Additional evaluation episodes measured each generated configuration.

### Failures and limitations

- Tested only on Flappy Bird parameter tuning.
- The designer edited configuration, not code or mechanics.
- A fixed RL player can become brittle when physics changes.
- Learned-player behavior is not equivalent to human-player behavior.
- Local multimodal models tested by the authors could not reliably produce valid configurations.
- Human collaboration is proposed as future work, not demonstrated.

### Evidence signals

- **Use evidence — established:** five starting configurations, four feedback modes, ten independent trials per mode/configuration, and repeated episodes.
- **Provenance — established:** NVIDIA researchers are named.
- **Independent validation:** none found.
- **Portability — inferred:** the loop is portable where a game exposes editable parameters and observable behavior, but the source only demonstrates one game.

### Potential supporting skills

- `define-gameplay-tuning-goal` — turn a design target into an observable criterion.
- `instrument-gameplay-session` — collect metrics, screenshots, and video.
- `summarize-play-behavior` — compress multiple episodes without losing relevant variance.
- `propose-bounded-balance-change` — edit only allowed parameters.
- `compare-tuning-iterations` — retain configuration and outcome history.
- `detect-playtester-proxy-drift` — flag when an automated player no longer represents a useful behavior class.

---

## 5. AI-as-divergent-design-input

**Status:** Experimental evidence is established; the recommended human-led workflow is inferred.

**Primary source:** [The Ink Splotch Effect](https://arxiv.org/abs/2403.02454)

### Source experiment

For each of three genres, the authors created:

1. a minimal base game;
2. a human-designed extension;
3. an extension whose features, code, and game-feel additions came from ChatGPT.

The ChatGPT branch requested feature suggestions, implementation code, explanations, and game-feel suggestions. Code was attempted repeatedly and manually repaired when the model could not resolve failures. The nine resulting games were anonymized and evaluated by participants.

### Portable pipeline inferred from the findings

1. Establish a minimal working loop and explicit creative intent.
2. Ask AI for diverse mechanics, abilities, or presentation directions.
3. Treat suggestions as an inspiration surface, not a decision.
4. Let a human select, reject, or remix suggestions.
5. prototype the chosen idea in a bounded slice.
6. play it and judge feel, cohesion, and clarity.
7. refine or discard it.

This pipeline is an inference because the experimental AI branch deliberately suppressed human taste to test AI-led design. The authors’ discussion supports using the model as a “muse,” but they did not run the exact human-selection pipeline above.

### Artifacts

- minimal base game;
- feature suggestions;
- implementation attempts;
- code explanations;
- game-feel suggestions;
- working prototypes;
- blinded player rankings and comments.

### Gates and feedback

- A working base loop anchors the experiment.
- Code integration failure triggers another attempt or manual correction.
- Player evaluation covers preference, feel, innovation, cohesion, abilities, and presentation.
- Human creative judgment is the missing gate identified by the results.

### Failures and limitations

- ChatGPT frequently lost engine and gameplay context.
- It mixed 2D and 3D assumptions.
- It struggled with procedural generation, enemy AI, and turn-based semantics.
- Pointed debugging required developer expertise.
- Human-designed variants generally ranked higher.
- Authors describe themselves as novice designers.
- The model and engine versions make exact implementation findings time-sensitive.

### Evidence signals

- **Use evidence — established:** nine prototypes, three genres, and 45 survey responses.
- **Provenance — established:** named FDG 2024 authors in game-AI research.
- **Independent validation:** no replication found.
- **Portability — inferred:** the ideation/selection boundary is portable; direct code performance is not.

### Potential supporting skills

- `generate-gameplay-directions` — produce genuinely different ideas tied to a core loop.
- `critique-mechanic-against-pillars` — test suggestions against human-authored intent.
- `prototype-one-mechanic` — build the smallest playable version of a selected idea.
- `evaluate-game-feel` — gather structured human observations.
- `preserve-design-rationale` — record why a suggestion was selected, remixed, or rejected.

---

## 6. Placeholder-to-generated-asset upgrade

**Status:** Explicit repository pipeline with self-demonstrated use.

**Primary source:** [Everything Game Dev Code](https://github.com/MRCalderon3D/everything-game-dev-code)

### Maintainer-stated flow

1. Generate placeholders with stable names and paths.
2. Optionally run asset generation for images, textures, skyboxes, 3D models, sound, music, voice, or video.
3. write generated files onto the established asset interfaces so code does not change.
4. import through the active engine layer.
5. review through the matching art or audio pass.
6. retain placeholders when no provider, budget, or suitable generation route exists.

### Artifacts

- placeholder asset inventory;
- stable paths and names;
- generated files;
- provider/model/prompt/seed/request provenance sidecars;
- cost estimate and approval;
- discipline-specific review output.

### Gates and feedback

- AI generation is optional.
- Spending requires confirmation above a configured threshold.
- Assets without provenance are treated as unlicensed.
- Generated output must pass an art, 3D, or audio review.
- Placeholder output remains a valid completion state.

### Failures and limitations

- Use evidence comes from the repository’s own samples.
- The project’s broader lifecycle is much larger than this deep, portable sub-pipeline.
- Provider claims and cost estimates are time-sensitive.
- Maintainer game-development provenance was not established in this pass.
- No independent users or shipped commercial projects were located.

### Evidence signals

- **Pipeline evidence — established:** the README states the ordered replacement process and governance.
- **Use evidence — claimed/established:** thirteen sample HTML games are present; the maintainer identifies a generated-assets sample.
- **Maturity snapshot:** 138 commits, 71 stars, 10 forks, one open issue, one open pull request, and no GitHub releases displayed on 2026-08-16.
- **Independent validation:** none found.
- **Portability — strong:** stable asset interfaces and placeholder fallbacks apply across engines and generators.

### Potential supporting skills

- `inventory-game-assets` — assign stable identities, paths, formats, and uses.
- `create-functional-placeholders` — keep the game runnable before final content exists.
- `generate-asset-replacements` — replace assets without changing callers.
- `record-generated-asset-provenance` — retain model, prompt, seed, request, and license evidence.
- `review-game-art-pass` — check consistency, legibility, dimensions, and runtime use.
- `review-game-audio-pass` — check loudness, looping, format, and in-game triggering.

---

## 7. Template-scaffold-and-debug generation

**Status:** Strongly specified, highly visible, but too new and self-validated for initial admission.

**Primary sources:** [OpenGame repository](https://github.com/leigest519/OpenGame), [OpenGame paper](https://arxiv.org/abs/2604.18394)

### Maintainer-stated flow

1. Receive a natural-language game specification.
2. choose an engine or project template from a template library.
3. scaffold a conventional multi-file project.
4. generate game code and optional assets.
5. run the game in a sandbox.
6. collect integration, console, and interaction failures.
7. use a maintained protocol of verified failure signatures and fixes.
8. repeat until the game is considered playable.
9. evaluate build health, visual usability, and intent alignment.

### Artifacts

- natural-language specification;
- project template;
- generated project;
- asset outputs;
- sandbox execution;
- failure signatures;
- verified-fix protocol;
- headless interaction results;
- benchmark scores.

### Gates and feedback

- The real game is launched.
- Rendering, controls, game-loop progression, and win/loss states are intended evaluation targets.
- Debugging targets recurring integration failures rather than isolated syntax errors.

### Failures and limitations

- The repository says OpenGame-Bench “will be released soon,” so the evaluation pipeline is not fully inspectable from the repository.
- The paper’s 150-prompt state-of-the-art claim uses the project’s own benchmark.
- The repository has only 13 commits and no displayed GitHub releases.
- The public demos are curated by the authors.
- The output is centered on web-game generation.
- No independent reproduction was located.

### Evidence signals

- **Pipeline evidence — established:** repository and paper agree on the template/debug/runtime-evaluation structure.
- **Use evidence — claimed:** six downloadable curated demos and a claimed 150-prompt evaluation.
- **Provenance — established:** CUHK MMLab authors are identified.
- **Maturity snapshot:** released 2026-04-21; 2.8k stars, 411 forks, 12 issues, 2 pull requests, 13 commits, and no displayed releases on 2026-08-16.
- **Independent validation:** none found.
- **Portability — moderate:** template selection and verified debugging are portable; the present implementation and evidence focus on web games.

### Potential supporting skills

- `select-game-project-template` — choose a minimal known-good skeleton.
- `scaffold-playable-game` — establish coherent scene, state, and build structure.
- `run-game-in-sandbox` — execute the actual artifact and capture failures.
- `classify-game-integration-failure` — identify recurring cross-file and runtime errors.
- `apply-verified-game-fix` — reuse a fix only when its preconditions match.
- `evaluate-playable-build` — separate build health, visual usability, and intent alignment.

---

## Additional candidates and contradictions

### Ubisoft Ghostwriter

Sources: [Ubisoft’s process description](https://news.ubisoft.com/en-gb/article/7Cm07zbBGy4Xml6WgYi25d/the-convergence-of-ai-and-creativity-introducing-ghostwriter), [Axios interview from March 2023](https://www.axios.com/2023/03/27/ubisoft-ai-ghostwriter)

**Established:** Ubisoft describes character/context definition, pairwise draft comparison, writer selection, writer editing, and learning from preferences.

**Claimed:** Ubisoft called the tool operational and described thousands of human selections.

**Contradiction:** Ubisoft’s article said the focus had shifted to adoption by productions and expressed a hope that teams would integrate it before narrative production. Axios reported shortly afterward that it was still in a test-and-learn phase and not part of any Ubisoft title’s production flow.

**Disposition:** retain the draft/select/edit/learn flow as a lead. Do not claim shipped-title use until a production names it.

### BDD plus reinforcement learning

Source: [ACM/IEEE GAS 2024 paper record](https://doi.org/10.1145/3643658.3643919)

**Established:** the peer-reviewed record says natural-language behavior and expected-outcome cases were combined with RL and evaluated across four Python games.

**Gap:** no source repository or complete inspectable experiment artifact was found in this pass. The full transformation from BDD scenario to reward, environment, and verdict therefore needs closer inspection before a faithful Mermaid diagram is written.

### Phaser acceptance-to-playtest loop

Source: [Phaser 4 Game Dev repository](https://github.com/Yakoub-ai/phaser4-gamedev)

**Established:** the repository specifies GDD → scaffold → implement → headless playtest → fix → build, with acceptance criteria feeding runtime scenarios. The harness checks page load, canvas creation, engine instance, scenes, frame rate, visible content, asset requests, errors, and scripted live-state assertions.

**Maturity snapshot:** 17 commits, 19 stars, one fork, no displayed releases on 2026-08-16.

**Gap:** no independent game, team, or CI history using this pipeline was found. The portable runtime-verification spine is stronger than the project-level adoption evidence.

### GameGPT

Source: [GameGPT paper](https://arxiv.org/abs/2310.08067)

**Established:** the paper describes planning, task identification, implementation, reviewer collaboration, layered lexicons, and decoupled code generation.

**Gap:** this pass did not find a sufficiently inspectable implementation history, repeated runs, or independent use. It is a research proposal, not yet evidence of a practiced public pipeline.

---

## Independent support for recurring patterns

### Visual feedback materially helps agents

[GameDevBench v2](https://arxiv.org/abs/2602.11103) is not itself a production pipeline, but it provides independent experimental support for a major cross-source pattern.

**Established as of its 2026-06-30 revision:**

- 333 game-development tasks derived from web and video tutorials;
- average success was lower on visually intensive tasks than gameplay-oriented tasks;
- simple image/video feedback increased GPT-5.4 performance from 41.1% to 52.0%.

**Inference:** pipelines that let an agent edit visual or interactive game behavior should run and observe the game. Static code checks alone are not a sufficient gate.

### Professional text-to-image use is broad but not one ordered pipeline

Source: [“An Adapt-or-Die Type of Situation”](https://arxiv.org/abs/2302.12601)

**Established:** interviews with 14 Finnish game-industry professionals found use as reference search, visual communication, inspiration, and rapid concept/prototype support. All participants still emphasized a need for human artists. Only about a third reported daily use; others used it weekly or monthly, and most described it as optional rather than mission-critical at the time of the interviews.

**Why it is not a pipeline entry:** the study establishes use cases and attitudes, not one ordered production flow. It supports human-selection and concept-stage candidates without proving a production-art pipeline.

---

## Cross-source pattern taxonomy

These are **inferred recurring patterns**, not claims that every author prescribed the same process.

| Pattern | Sources that exhibit it | Portable interpretation |
|---|---|---|
| Artifact before generation | EA test specification; DreamGarden plan; Fly, Fail, Fix goal/config; Phaser GDD; Everything placeholders | Give the agent a durable, inspectable target before implementation |
| Small dependency-ordered slices | DreamGarden; Everything worked guide; Phaser; OpenGame templates | Reduce cross-file and cross-discipline drift |
| Run the real artifact | DreamGarden; Fly, Fail, Fix; Phaser; OpenGame; GameDevBench | Compilation is necessary but not a playability gate |
| Multimodal feedback | DreamGarden screenshots; Fly, Fail, Fix telemetry/video; WorldSmith visual selection; GameDevBench images/video | Feed observable game behavior back into revision |
| Human creative gate | WorldSmith selection; Ghostwriter ranking/editing; DreamGarden pruning; Ink Splotch findings | Keep taste, intent, and high-coupling choices human-owned |
| Stable interfaces under generated content | Everything placeholder paths; Fly, Fail, Fix config schema; EA standardized agent API | Constrain generation behind stable names, schemas, or APIs |
| Bounded repair loop | DreamGarden retry limit; Fly, Fail, Fix iteration limit; Phaser test failure; OpenGame debug protocol | Stop endless self-repair and expose unresolved failures |
| Retained history | WorldSmith tree; DreamGarden plan/action nodes; Fly, Fail, Fix configurations; OpenGame fix protocol | Preserve alternatives, observations, and verified repairs |
| Specialized automation inside an existing process | EA hybrid bots; Ghostwriter first drafts; DreamGarden specialist modules | Replace a narrow bottleneck before attempting whole-studio autonomy |

---

## Recurring discovery targets

### Research groups and publication streams

- [EA SEED publications and presentations](https://www.ea.com/seed)
- [Ubisoft La Forge publications](https://www.ubisoft.com/en-us/studio/laforge/publications)
- [Microsoft Research game and HCI publications](https://www.microsoft.com/en-us/research/)
- Foundations of Digital Games
- IEEE Conference on Games
- ACM CHI PLAY
- ACM UIST
- ACM CHI
- Games and Software Engineering workshop at ICSE
- Reinforcement Learning and Video Games workshop
- AIIDE and PCG workshops

### Practitioners and source graphs

- Sam Earle and collaborators working on DreamGarden, DreamCraft, and game generation.
- Julian Togelius and the NYU Game Innovation Lab.
- Alex Zook, Josef Spjut, and Jonathan Tremblay.
- Linus Gisslén, Joakim Bergdahl, and the EA automated-playtesting source graph.
- Ben Swanson and Ubisoft narrative-generation work.
- Veera Vimpari, Annakaisa Kultima, Perttu Hämäläinen, and Christian Guckelsberger for longitudinal professional-use studies.

### Repositories to monitor

- [OpenGame](https://github.com/leigest519/OpenGame) — benchmark release, contributor growth, tags, independent reproductions.
- [Everything Game Dev Code](https://github.com/MRCalderon3D/everything-game-dev-code) — release history, external games, contributor graph, sample provenance.
- [Phaser 4 Game Dev](https://github.com/Yakoub-ai/phaser4-gamedev) — outside use of its headless playtest loop.
- [GameDevBench paper/source graph](https://arxiv.org/abs/2602.11103) — benchmark repository, follow-up agents, and visual-feedback ablations.
- [iv4XR framework](https://github.com/iv4xr-project/iv4xr-framework) — longer-running agent-based testing and BDD/RL integrations.
- [Unity ML-Agents](https://github.com/Unity-Technologies/ml-agents) — production playtesting case studies rather than toolkit announcements.

### Practitioner evidence channels

- GDC Vault talks that include implementation details, not product announcements.
- itch.io devlogs with a playable build, repository, dated work log, and postmortem.
- Steam AI disclosures followed back to developer postmortems and repositories.
- Game-jam submissions that preserve commit history and source.
- Studio engineering blogs that show artifacts, gates, and failures.
- GitHub issues and pull requests from users other than maintainers.

---

## Explicit gaps and unverifiable claims

1. No independently validated, engine-neutral, end-to-end AI game-development pipeline with a long public history was found.
2. No public source established that Ghostwriter-generated dialogue shipped in a named Ubisoft title.
3. OpenGame’s benchmark claims cannot yet be fully audited from its repository because the evaluation pipeline is still marked for future release.
4. OpenGame’s stars and forks do not establish successful use.
5. Everything Game Dev Code’s samples establish that artifacts exist, not that outside teams adopted the process.
6. Phaser 4 Game Dev documents a good verification loop, but no outside project history was found.
7. The BDD/RL paper reports four validation games, but the implementation and complete scenario-to-reward transformation were not located.
8. GameGPT’s repeated use and implementation maturity were not established.
9. WorldSmith validates interaction with a concept-art prototype, not integration into a game art production pipeline.
10. Fly, Fail, Fix validates parameter tuning in Flappy Bird, not new mechanic generation, production balance, or human fun.
11. DreamGarden validates early Unreal prototypes in short study sessions, not maintainable production games.
12. The Ink Splotch Effect supports AI as an ideation source more strongly than it supports direct AI code implementation.
13. Professional adoption surveys indicate tool use, but do not reveal enough ordered process detail to become pipeline documents.
14. No source in this pass demonstrated that a star count, contributor count, or famous author predicts pipeline effectiveness.
15. Legal provenance, training-data rights, and platform disclosure requirements remain separate production gates that most technical pipeline sources do not fully specify.
