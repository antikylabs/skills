# Game design and player-experience skill research

Research snapshot: 2026-08-09

This report covers gameplay design, controls, onboarding, game feel, level design,
player UX, accessibility, playtesting, telemetry, difficulty and balance, and
retention ethics. It does not treat an install count, a GitHub star count, or the
phrase “production-grade” as proof that a skill improves game quality.

No skills were installed during this research.

**Antiky scope:** all proposed design, UX, playtest, accessibility, and telemetry skills are for
Antiky games and Antiky's production workflow. References to other engines and browser frameworks
are comparative sources, not support targets.

## Evidence labels and method

- **Verified** means the statement came from the current `skills.sh` CLI output,
  an inspected source file, repository metadata, or a primary/first-party source.
- **Assessment** means it is a recommendation or inference from the verified
  evidence.
- Install counts are a point-in-time discovery signal. They are not a quality
  score. The [skills.sh documentation](https://www.skills.sh/docs) itself warns
  that the ecosystem cannot guarantee every listed skill's quality or security.
- Source repositories were inspected at these commits:
  - `gamedev-skills/awesome-gamedev-agent-skills`:
    [`858c3e58`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/tree/858c3e58e1f35ea3a5746c4df6003ffbd1c4dad0)
  - `Donchitos/Claude-Code-Game-Studios`:
    [`984023dd`](https://github.com/Donchitos/Claude-Code-Game-Studios/tree/984023ddac0d5e27624f2baacde6105e45de375f)
  - `PlayableIntelligence/game-creator`:
    [`4e64b83b`](https://github.com/PlayableIntelligence/game-creator/tree/4e64b83b5fe400b34ad3a484d9b4a6090b26d512)
  - `LVTD-LLC/skills`:
    [`dd65cf33`](https://github.com/LVTD-LLC/skills/tree/dd65cf333e2b58db66c898572d0e8a7df97d16f7)
- Registry searches included `game design`, `game development`, `game feel`,
  `level designer`, `game user experience`, `player onboarding`, `tutorial game
  design`, `game accessibility`, `gameplay testing`, `playtesting`, `game
  telemetry`, `game balance`, `game retention`, `ethical game design`, `dark
  patterns game`, `difficulty design`, and `controls accessibility`.

## Executive judgment

**Assessment:** There is no credible one-package substitute for a game designer,
player researcher, accessibility specialist, and human playtest panel. The best
available material is narrow and composable:

1. Use the OpenAI browser-game playtest workflow for observable runtime evidence.
2. Borrow the focused `game-feel`, `level-design`, `game-ui-ux`, and
   `input-systems` discipline skills from `awesome-gamedev-agent-skills`.
3. Use the LVTD skills as source-linked artifact templates, not trusted experts.
4. Borrow the role boundaries and handoff structure from Claude Code Game
   Studios, but not its entire 49-agent hierarchy or unsupported prescriptions.
5. Build first-party skills for onboarding, human playtest research,
   accessibility, telemetry/privacy, and ethical retention. Those are the largest
   credible gaps.

The core library must enforce this distinction:

> Automated agents can verify behavior, consistency, coverage, and visible
> defects. They cannot establish that a game is enjoyable, understandable, fair,
> or worth returning to without evidence from representative human players.

## Shortlist of available skills

| Skill or bundle | Verified registry/repository signal | What is reusable | Maturity assessment |
| --- | --- | --- | --- |
| [`openai/plugins@game-playtest`](https://skills.sh/openai/plugins/game-playtest) | 8 installs; first-party OpenAI source | Browser boot/input/state passes, mandatory screenshots for canvas/WebGL, HUD/playfield review, severity-first reports | **High source trust, medium behavioral evidence.** Best runtime QA seed; it is not human playtesting. |
| [`game-feel`](https://skills.sh/gamedev-skills/awesome-gamedev-agent-skills/game-feel) | 1.5K installs; source repo 455 stars | Event-linked feedback, proportional effect tiers, hit-stop/shake/tween pitfalls, reduced-motion controls | **Medium.** Useful implementation checklist; numeric recipes are starting hypotheses, not universal truths. |
| [`level-design`](https://skills.sh/gamedev-skills/awesome-gamedev-agent-skills/level-design) | 1.2K installs; same 455-star repo | Player metrics, blockout-first workflow, critical path, pacing, teach-then-test, soft-lock checks | **Medium.** Strong conceptual seed; needs engine evidence and player-path data. |
| [`game-ui-ux`](https://skills.sh/gamedev-skills/awesome-gamedev-agent-skills/game-ui-ux) | 1.4K installs; same repo | Safe areas, focus navigation, state stack, event-driven HUD, device/resolution verification | **Medium.** Good architecture; accessibility depth is incomplete. |
| [`input-systems`](https://skills.sh/gamedev-skills/awesome-gamedev-agent-skills/input-systems) | 1.1K installs; same repo | Action maps, remapping, conflict handling, analog deadzones, buffering/coyote time, device switching | **Medium.** Good pattern source; needs Antiky input semantics and target-platform latency measurement. |
| [`game-playtest-planning`](https://skills.sh/lvtd-llc/skills/game-playtest-planning) | 50 installs; source repo 1 star | Research questions, participant plan, moderator script, observation tags, telemetry and decision rules | **Experimental but useful.** Source-linked and well bounded; no game-skill behavioral evals found. |
| [`player-experience-modeling`](https://skills.sh/lvtd-llc/skills/player-experience-modeling) | 44 installs; same repo | Behavioral player model, experience promise, motivation map, interest curve, build implications | **Experimental.** Valuable brief format; it must not be treated as player evidence. |
| [`game-balance-economy`](https://skills.sh/lvtd-llc/skills/game-balance-economy) | 69 installs; same repo | Economy map, tuning table, expected-value helper, dominant-strategy and punishment review | **Experimental.** Good artifact contract; simulation and human validation remain mandatory. |
| [`game-interface-feedback`](https://skills.sh/lvtd-llc/skills/game-interface-feedback) | 44 installs; same repo | Intent-input-response-consequence trace, multimodal feedback spec, usability risks | **Experimental.** Good bridge between controls, feedback, and accessibility. |
| [`game-responsibility-review`](https://skills.sh/lvtd-llc/skills/game-responsibility-review) | 44 installs; same repo | Pressure inventory, impact map, risk controls, ship blockers for monetization/social/retention | **Experimental.** Right boundary, but source coverage must add FTC/ICO evidence. |
| [`playtest-report`](https://skills.sh/donchitos/claude-code-game-studios/playtest-report) | 335 installs; parent repo 23.7K stars | Session metadata, first-five-minute observations, finding categories, action routing | **Medium as a template.** Popular parent repo; the skill structures notes but does not establish research validity. |
| [`balance-check`](https://skills.sh/donchitos/claude-code-game-studios/balance-check) | 439 installs; same repo | Domain-specific combat/economy/progression/loot passes and fix/recheck loop | **Medium as workflow scaffolding.** Requires actual data and independent verification. |
| [`game-designer`](https://skills.sh/opusgamelabs/game-creator/game-designer) | 1.2K installs; source repo 309 stars | Browser-game visual vocabulary and a QA-oriented supporting agent | **Do not use as design authority.** It is mainly a visual-effects/polish prompt. |
| [`design-game`](https://skills.sh/opusgamelabs/game-creator/design-game) | 828 installs; same repo | A repeatable audit/implement/build loop | **Caution.** Its own rules favor procedural graphics and prohibit gameplay changes; it can decorate a weak game without making it worth playing. |
| [`game-qa`](https://skills.sh/opusgamelabs/game-creator/game-qa) | 537 installs; same repo | Playwright boot, state, visual-regression, and performance test patterns | **Medium for browser QA.** Prefer the first-party OpenAI playtest skill where both apply. |
| [`gstack-game`](https://skills.sh/fagemx/gstack-game/gstack-game) | 28 installs; 58-star repository; 27-skill workflow | Explicit review pipeline, artifact handoffs, playtest-plan vs simulated-player separation | **Research only.** Large generated prompts, local home-directory writes, and unsupported scoring/benchmark language need removal. |
| `AlterLab_GameForge` UX/accessibility roles | 51 installs for `game-ux-designer`, 48 for `game-accessibility-specialist`; [23-star repo](https://github.com/AlterLab-IEU/AlterLab_GameForge) | Small virtual-studio role catalog and CI/format-validation ideas | **Experimental.** The repository claims 486 checks, but that is not evidence that the skills improve game outcomes. |

### Copy-ready discovery commands

These are reference commands only. Nothing was installed.

```bash
npx skills add openai/plugins@game-playtest
npx skills add gamedev-skills/awesome-gamedev-agent-skills@game-feel
npx skills add gamedev-skills/awesome-gamedev-agent-skills@level-design
npx skills add gamedev-skills/awesome-gamedev-agent-skills@game-ui-ux
npx skills add gamedev-skills/awesome-gamedev-agent-skills@input-systems
npx skills add lvtd-llc/skills@game-playtest-planning
npx skills add lvtd-llc/skills@player-experience-modeling
npx skills add lvtd-llc/skills@game-balance-economy
npx skills add lvtd-llc/skills@game-interface-feedback
npx skills add lvtd-llc/skills@game-responsibility-review
npx skills add donchitos/claude-code-game-studios@playtest-report
npx skills add donchitos/claude-code-game-studios@balance-check
```

## Detailed source assessment

### OpenAI game-studio material

**Verified:** The first-party
[`game-playtest`](https://github.com/openai/plugins/blob/main/plugins/game-studio/skills/game-playtest/SKILL.md)
skill requires exercising boot, main verbs, transitions, HUD, responsive states,
and screenshots. It explicitly says DOM assertions are insufficient for
canvas/WebGL, and points to SpectorJS or performance tooling instead of guessing
about 3D performance. Its
[`playtest-checklist`](https://github.com/openai/plugins/blob/main/plugins/game-studio/references/playtest-checklist.md)
checks camera/menu handoff, playfield obstruction, depth readability, collision
proxy alignment, material stability, streaming, and reduced motion.

The adjacent
[`game-ui-frontend`](https://github.com/openai/plugins/blob/main/plugins/game-studio/skills/game-ui-frontend/SKILL.md)
skill protects the playfield, limits persistent HUD weight, separates camera
input from modal input, and rejects generic dashboard layouts. The
[`web-game-foundations`](https://github.com/openai/plugins/blob/main/plugins/game-studio/skills/web-game-foundations/SKILL.md)
skill gives useful simulation/render/UI/input boundaries.

**Assessment:** Adopt the observable runtime loop and reporting contract. Add
deterministic test hooks, input traces, frame-time captures, and build identifiers.
Do not call this “playtesting” internally without the qualifier “automated”; it
does not recruit or observe representative players.

### `awesome-gamedev-agent-skills`

**Verified:** The repository was created in June 2026, has 455 stars, uses
Apache-2.0, publishes version baselines, and includes a validator plus regression
tests for frontmatter, duplicate names, broken references, portability, and
marketplace wiring. Those are structural tests, not behavioral game-design evals.

Relevant inspected sources:

- [`game-feel`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/858c3e58e1f35ea3a5746c4df6003ffbd1c4dad0/skills/disciplines/game-feel/SKILL.md)
- [`level-design`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/858c3e58e1f35ea3a5746c4df6003ffbd1c4dad0/skills/disciplines/level-design/SKILL.md)
- [`game-ui-ux`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/858c3e58e1f35ea3a5746c4df6003ffbd1c4dad0/skills/disciplines/game-ui-ux/SKILL.md)
- [`input-systems`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/858c3e58e1f35ea3a5746c4df6003ffbd1c4dad0/skills/disciplines/input-systems/SKILL.md)
- [version support](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/858c3e58e1f35ea3a5746c4df6003ffbd1c4dad0/docs/VERSION-SUPPORT.md)
- [validator tests](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/858c3e58e1f35ea3a5746c4df6003ffbd1c4dad0/tests/test_validate_skills.py)

**Assessment:** This is the strongest third-party source for narrow implementation
skills. Reuse its separation of responsibilities and pitfalls. Replace fixed
effect durations, trauma values, gap ratios, and UI budgets with project-specific
tuning ranges whose provenance is recorded. Add behavioral evals: a valid skill
must improve a deliberately flawed fixture and must not “polish” a mechanically
empty scene.

### LVTD game-design skills

**Verified:** The five inspected skills are concise, MIT-licensed, source-linked,
and define required outputs. The playtest skill distinguishes observation,
think-aloud, task tests, surveys, telemetry, and blind first sessions. The
balance skill requires intent, economy maps, safe ranges, risk review, and
validation. The player-experience skill describes target-player behavior rather
than demographic stereotypes. The responsibility review inventories streaks,
FOMO, variable rewards, notifications, spending pressure, and community risk.

Inspected sources:

- [`game-playtest-planning`](https://github.com/LVTD-LLC/skills/blob/dd65cf333e2b58db66c898572d0e8a7df97d16f7/skills/game-playtest-planning/SKILL.md)
- [`player-experience-modeling`](https://github.com/LVTD-LLC/skills/blob/dd65cf333e2b58db66c898572d0e8a7df97d16f7/skills/player-experience-modeling/SKILL.md)
- [`game-balance-economy`](https://github.com/LVTD-LLC/skills/blob/dd65cf333e2b58db66c898572d0e8a7df97d16f7/skills/game-balance-economy/SKILL.md)
- [`game-interface-feedback`](https://github.com/LVTD-LLC/skills/blob/dd65cf333e2b58db66c898572d0e8a7df97d16f7/skills/game-interface-feedback/SKILL.md)
- [`game-responsibility-review`](https://github.com/LVTD-LLC/skills/blob/dd65cf333e2b58db66c898572d0e8a7df97d16f7/skills/game-responsibility-review/SKILL.md)

**Verified limitation:** The repository has one GitHub star. Its build validates
and publishes the catalog, but the game-design skills do not ship behavioral
evals. Several cite a commercial book as the primary source, which is traceable
but not independently inspectable from the repository.

**Assessment:** Use these as artifact-schema seeds. Add first-party primary
sources, consent/privacy requirements, adversarial cases, and fixture-based evals
before adopting them.

### Claude Code Game Studios

**Verified:** The repository defines 49 agent roles and 72 workflow skills. The
inspected game designer, level designer, UX designer, accessibility specialist,
and analytics engineer have explicit ownership and “must not do” boundaries. The
playtest report and balance check create clear artifacts and route findings to
other owners.

Relevant sources:

- [`game-designer`](https://github.com/Donchitos/Claude-Code-Game-Studios/blob/984023ddac0d5e27624f2baacde6105e45de375f/.claude/agents/game-designer.md)
- [`level-designer`](https://github.com/Donchitos/Claude-Code-Game-Studios/blob/984023ddac0d5e27624f2baacde6105e45de375f/.claude/agents/level-designer.md)
- [`ux-designer`](https://github.com/Donchitos/Claude-Code-Game-Studios/blob/984023ddac0d5e27624f2baacde6105e45de375f/.claude/agents/ux-designer.md)
- [`accessibility-specialist`](https://github.com/Donchitos/Claude-Code-Game-Studios/blob/984023ddac0d5e27624f2baacde6105e45de375f/.claude/agents/accessibility-specialist.md)
- [`analytics-engineer`](https://github.com/Donchitos/Claude-Code-Game-Studios/blob/984023ddac0d5e27624f2baacde6105e45de375f/.claude/agents/analytics-engineer.md)
- [`playtest-report`](https://github.com/Donchitos/Claude-Code-Game-Studios/blob/984023ddac0d5e27624f2baacde6105e45de375f/.claude/skills/playtest-report/SKILL.md)
- [`balance-check`](https://github.com/Donchitos/Claude-Code-Game-Studios/blob/984023ddac0d5e27624f2baacde6105e45de375f/.claude/skills/balance-check/SKILL.md)

**Assessment:** Borrow the role boundaries, artifact ownership, design-change
propagation, and independent review gates. Do not copy the hierarchy wholesale.
Forty-nine agents create coordination cost and diffuse accountability.

Specific content risks to correct:

- The accessibility agent defaults to WCAG 2.1 and hard-coded measurements such
  as 18 px at 1080p. WCAG is useful for web UI, but the Xbox guidelines, APX, and
  disabled-player testing are better game-specific foundations.
- “Colorblind filters” are presented as a default solution. A barrier-first
  review should prioritize distinguishable shapes, labels, contrast, and
  configurable palettes rather than a global simulation/filter effect.
- Bartle categories are applied broadly beyond their original multiplayer/MUD
  context. Treat them as optional prompts, not player truth.
- The game designer includes prescriptive economy claims such as Gini targets
  without supplying a project target or evidence. Metrics require hypotheses,
  cohorts, uncertainty, and observed player outcomes.

### PlayableIntelligence / Opus Game Labs

**Verified:** This browser-game package is opinionated around Phaser and Three.js.
Its `design-game` workflow scores visuals, then adds backgrounds, particles,
shake, tweens, and transitions while explicitly avoiding gameplay changes. Its
QA runner executes Playwright and distinguishes game, test, and configuration
failures.

**Assessment:** The QA runner has reusable mechanics, but the visual-design
workflow encodes the failure mode our library must prevent: more effects and more
geometry can make a screenshot busier while the underlying play remains empty.
Do not use its `game-designer` or `design-game` skill as a quality gate. A design
pass must begin with player fantasy, verbs, decisions, challenge, readability,
and observed play, not a particle checklist.

### `gstack-game`

**Verified:** The bundle separates player-experience role-play, playtest protocol
design, UX review, feel pass, and balance review. It also defines backward routes
when a downstream review finds a design-level defect.

**Verified risks:** Its generated skills are very large, write session and
artifact data under `~/.gstack`, record local usage records containing repository
slug and branch, and use unsupported example claims such as inferring a precise
retention loss from a load time. Its player-experience skill deliberately
role-plays a player.

**Assessment:** Borrow the backtracking workflow and separation between test-plan
authoring and automated QA. Never use simulated-player narration as evidence.
Keep all artifacts inside the project, make telemetry opt-in, and require cited
benchmarks or label estimates as hypotheses.

## Coverage gaps

| Domain | Current credible coverage | Missing requirement for our library |
| --- | --- | --- |
| Core gameplay and loops | Broad design agents exist, but most are theory-heavy | A small decision-centered skill that produces testable mechanic contracts and refuses to equate visual activity with play. |
| Controls | `input-systems` is a good seed | Input latency evidence, action-context conflicts, accessibility device matrix, platform glyphs, and automated input traces. |
| Game feel | `game-feel` is useful | Project-specific response budgets, before/after capture, effect disable paths, frame pacing, and human comparative test. |
| Level design | `level-design` is useful | Editor-integrated blockout artifacts, spatial metrics, nav/collision proof, sightline captures, heatmaps, and representative traversal tests. |
| Onboarding / FTUE | Search produced only low-adoption generic skills | Knowledge-state mapping, teach/practice/test beats, skip/replay, contextual timing, no-help first-session study, and accessible onboarding. |
| Game accessibility | No high-adoption, game-specific, source-rigorous skill found | XAG + GADPEG + APX + Game Accessibility Guidelines, barrier matrix, settings-before-play gate, disabled-player recruitment, and platform testing. |
| Human playtesting | LVTD planning and Donchitos reporting are partial | Consent, recordings/data retention, recruiting screens, pilots, observation coding, researcher bias controls, triangulation, and dissenting evidence. |
| Telemetry / experiments | No credible game-specific agent skill surfaced | Versioned event schema, purpose limitation, consent/opt-out/deletion, cardinality rules, QA events, cohort definitions, power/MDE, and guardrail metrics. |
| Difficulty and balance | Several math/checklist skills exist | Explicit target experience, uncertainty, simulation fixtures, accessible difficulty dimensions, exploit search, and playtest/telemetry feedback loop. |
| Retention ethics | One low-adoption responsibility review | Clear anti-dark-pattern rules, stopping points, honest scarcity, notification controls, child-safety gates, monetization consent, and independent trust review. |
| Game design leadership | Large virtual-studio bundles exist | One accountable human creative owner, one evidence ledger, conflict resolution, scope authority, and a vertical-slice approval gate. |

## Recommended first-party skill library

### 1. `game-experience-brief`

**Responsibility:** Define target player behavior and context, player fantasy,
primary verbs, meaningful decisions, core/session/meta loops, desired emotional
arc, anti-goals, and riskiest assumptions.

**Artifacts:** `experience-brief.md`, `loop-map.md`, `design-hypotheses.md`, and a
decision log. Every mechanic must state the player decision it creates and the
evidence that would validate it.

**Gate:** It must reject “the scene has motion/effects” as proof of a game. Use
the original [MDA paper](https://www.cs.northwestern.edu/~hunicke/MDA.pdf) as a
translation tool, not a formula, and use
[Self-Determination Theory](https://selfdeterminationtheory.org/theory/) as a
motivation lens rather than a scorecard.

### 2. `controls-and-input`

**Responsibility:** Own named actions, contexts, bindings, remapping, conflict
resolution, device changes, analog filtering, buffering, timing tolerance,
prompts, and accessible alternatives.

**Artifacts:** `input-action-map.yaml`, `device-matrix.md`, `response-budget.md`,
and executable input traces. Each action records edge/held semantics, interrupt
rules, feedback, and alternate input.

**Gate:** Complete the relevant
[Xbox input guideline](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/107)
checks. Verify every supported device in the running build; source inspection is
not enough.

### 3. `game-feel-pass`

**Responsibility:** Tune the response chain from input through anticipation,
action, contact, consequence, recovery, and next available input. Coordinate
animation, camera, audio, VFX, haptics, and timing without changing simulation by
accident.

**Artifacts:** `feedback-matrix.md`, per-event importance tiers, before/after
captures, frame-time trace, motion/flashing reduction matrix, and a tuning log.

**Gate:** The underlying mechanic must already be worth testing. Compare variants
with players; do not self-approve from a screenshot. Strong effects must have
reduction/disable paths consistent with
[XAG 117](https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/117).

### 4. `level-design-blockout`

**Responsibility:** Derive traversal/combat metrics, create whitebox spaces,
model critical and optional paths, pace beats, stage teaching and testing, and
validate navigation, camera, sightlines, and encounter readability.

**Artifacts:** `player-metrics.yaml`, a level graph, beat/pacing chart, whitebox
scene, annotated sightline captures, route traces, and blockout review.

**Gate:** No environment dressing before the blockout passes. Epic's official
[level blockout guide](https://dev.epicgames.com/documentation/unreal-engine/designer-01-project-setup-and-level-blockout-in-unreal-engine)
supports the scale-first, layout/playability-first workflow. Required traversal
must pass deterministic movement tests and representative player observation.

### 5. `ftue-onboarding`

**Responsibility:** Define what the player must notice, understand, attempt, and
master across the first minute, first failure, first success, and first session.
Teach in context, allow experimentation, and support skip, replay, reminders, and
multiple input/access needs.

**Artifacts:** `knowledge-state-map.md`, `ftue-beat-map.md`, prompt budget,
tutorial state machine, skip/replay behavior, and first-session research plan.

**Gate:** Run a blind/no-help first-session playtest. Record comprehension by
observed action before asking opinion. A tutorial is not validated because every
line of instructional text appeared.

### 6. `game-ui-ux`

**Responsibility:** Own player flows, HUD information priority, focus and
navigation, safe areas, input-mode handoff, menu state, error/recovery paths,
localization expansion, and playfield protection.

**Artifacts:** flow map, screen specs, focus graph, HUD budget, responsive matrix,
and state/transition acceptance criteria.

**Gate:** Verify keyboard, controller, pointer, and relevant touch paths in the
running game. Critical state must use redundant channels. Base game-specific
requirements on the [Xbox Accessibility Guidelines](https://learn.microsoft.com/en-us/xbox/accessibility/guidelines),
not only generic web heuristics.

### 7. `game-accessibility`

**Responsibility:** Identify barriers in control, presentation, cognition,
hearing, vision, speech, motion, timing, and challenge; coordinate solutions from
concept through ship; recruit disabled players for validation.

**Artifacts:** barrier matrix, accessibility requirement spec, settings matrix,
platform/device test plan, known-barrier ledger, public feature documentation,
and disabled-player research plan.

**Gate:** Accessibility settings needed to understand the opening must be
available before the opening. Use the
[Xbox guidelines](https://learn.microsoft.com/en-us/xbox/accessibility/guidelines),
[Gaming and Disability Player Experience Guide](https://learn.microsoft.com/en-us/xbox/accessibility/gadpeg),
[AbleGamers APX patterns](https://accessible.games/accessible-player-experiences/),
and the [Game Accessibility Guidelines full list](https://gameaccessibilityguidelines.com/full-list/).
APX's barrier-first model is preferable to pretending an agent can simulate a
specific disability.

### 8. `playtest-research`

**Responsibility:** Turn a product decision into research questions, recruit
appropriate participants, choose a method, pilot the protocol, moderate without
leading, separate observation from interpretation, and synthesize findings with
uncertainty.

**Artifacts:** research brief, screener, consent/recording notice, moderator
guide, pilot result, observation sheet, tagged evidence, findings report, and
decision record.

**Gate:** The researcher agent may design or analyze a study but may not simulate
participants. The [Games User Research end-to-end guide](https://gamesuserresearch.com/how-to-run-a-games-user-research-playtest/)
supports research objectives, representative recruiting, method selection,
unbiased collection, and analysis. Its
[study-preparation guide](https://gamesuserresearch.com/preparing-a-games-user-research-study/)
adds informed consent, data disclosure, withdrawal, and full-pipeline pilots.

### 9. `game-telemetry-experimentation`

**Responsibility:** Instrument only events tied to named design questions; own
schema, versioning, validation, consent, privacy, data quality, cohort definitions,
funnels, experiments, and interpretation limits.

**Artifacts:** `event-schema.yaml`, purpose/data-owner/retention ledger, sample
payloads, validation tests, funnel/query specs, experiment plan, guardrail
metrics, and deletion/opt-out test evidence.

**Gate:** Every property needs a purpose. No free-form PII. Events from unknown
schemas fail in development. Unity documents schema-backed
[event recording](https://docs.unity.com/en-us/analytics/events/record-event),
[funnels](https://docs.unity.com/en-us/analytics/funnels/create-funnels), and
[privacy/consent responsibilities](https://docs.unity.com/en-us/cloud/developer-data/privacy-and-consent).
GameAnalytics documents distinct
[progression](https://docs.gameanalytics.com/events-metrics-and-filtering/event-types/progression-events/)
and [design](https://docs.gameanalytics.com/events-metrics-and-filtering/event-types/design-events/)
events. Metrics locate patterns; qualitative research explains them.

### 10. `balance-difficulty-economy`

**Responsibility:** Define the intended challenge and decision space, map
parameters/resources/sources/sinks, calculate and simulate outcomes, search for
dominant or dead choices, expose accessible difficulty dimensions, and tune from
evidence.

**Artifacts:** tuning table with safe ranges and rationale, economy graph,
simulation notebook/script, exploit register, difficulty-dimension matrix,
telemetry queries, and validation report.

**Gate:** No “balanced” verdict without values, distributions, and test evidence.
Difficulty must be separable where practical: combat timing, puzzle assistance,
information clarity, failure penalty, resource abundance, and navigation help.
See [XAG 108](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/108).

### 11. `player-trust-retention-review`

**Responsibility:** Review streaks, variable rewards, scarcity, notifications,
social obligation, purchases, currency conversions, failure recovery, stopping
points, community pressure, and child-directed design for coercion or deception.

**Artifacts:** pressure inventory, honest-value statement, risk register,
monetization flow, notification/stopping-point policy, child-safety assessment,
and ship-blocking findings.

**Gate:** This role is independent from growth/monetization ownership. The FTC's
[dark-pattern report](https://www.ftc.gov/system/files/ftc_gov/pdf/P214800%20Dark%20Patterns%20Report%209.14.2022%20-%20FINAL.pdf)
and [Fortnite order](https://www.ftc.gov/news-events/news/press-releases/2023/03/ftc-finalizes-order-requiring-fortnite-maker-epic-games-pay-245-million-tricking-users-making)
show that confusing purchase controls and absent affirmative consent create real
consumer harm and enforcement risk. The ICO's
[Age Appropriate Design Code](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/)
rejects privacy-reducing nudges for children and recommends pro-privacy,
wellbeing-supporting choices.

### 12. `game-design-evidence-review`

**Responsibility:** Integrate the other artifacts, trace every quality claim to
evidence, detect contradictions, route defects back to the owning discipline,
and stop a weak vertical slice from being presented as proof of the engine.

**Artifacts:** evidence ledger, contradiction list, vertical-slice scorecard,
unresolved-risk list, and approve/reject decision signed by a human creative
owner.

**Gate:** The agent that created a feature cannot be its only reviewer. Passing
build/tests is necessary but not sufficient; runtime, visual, accessibility, and
human-play evidence are separate gates.

## Recommended subagent setup

Keep the team small. One agent owns each artifact. Parallel work starts only
after a shared experience brief and vertical-slice question exist.

| Role | Owns | Must not do | Hands off to |
| --- | --- | --- | --- |
| Game design lead | Experience brief, mechanic contracts, decision log, synthesis | Claim player enjoyment from theory or screenshots | Human creative owner; all specialists |
| Controls and feel specialist | Input map, response budget, feedback matrix, executable input evidence | Change core rules silently while “polishing” | Gameplay implementer; accessibility; QA |
| Level designer | Metrics, whitebox, path/beat graph, encounter and sightline evidence | Dress the environment before blockout approval | Gameplay implementer; playtest researcher |
| Player UX/onboarding specialist | FTUE, flows, HUD priority, focus graph, prompt timing | Treat tutorial text presence as comprehension | Accessibility; playtest researcher; UI implementer |
| Accessibility specialist | Barrier matrix, settings requirements, disabled-player test plan | Use a simulated disability as validation; waive barriers for aesthetics | Every implementer; independent ship review |
| Playtest researcher | Hypotheses, recruiting, consent, protocol, observations, synthesis | Implement the feature under test; coach participants; replace players with role-play | Design lead; telemetry; balance |
| Telemetry/experimentation specialist | Event schema, privacy ledger, funnels, experiment analysis | Collect data without purpose/consent; decide design from metrics alone | Researcher; design lead; trust reviewer |
| Balance/economy specialist | Models, tuning tables, simulations, exploit search | Declare a feel target from math alone | Researcher; design lead; trust reviewer |
| Player-trust reviewer | Dark-pattern, monetization, notification, child and community risk gates | Report to growth or approve its own mitigations | Human producer/creative owner |
| Runtime QA agent | Automated playthrough, screenshots, state/input/perf evidence, regressions | Call automation representative-player research | Each owning specialist; evidence reviewer |
| Evidence reviewer | Cross-artifact audit and reject/approve recommendation | Edit the artifacts it is judging; overrule the human creative owner | Human creative owner |

### Handoff sequence

1. The human creative owner and game design lead approve one experience brief and
   one risky question for a vertical slice.
2. Controls/feel, level, and UX/onboarding agents create non-overlapping specs
   from that brief. Accessibility reviews each before implementation.
3. Implementers build the smallest slice that can answer the question. The
   producer prevents unrelated content expansion.
4. Runtime QA records deterministic build, input, state, screenshot/video, and
   performance evidence.
5. The playtest researcher pilots and runs representative human sessions. The
   telemetry specialist validates event data independently.
6. The design lead, researcher, and balance specialist synthesize behavior,
   qualitative interpretation, and quantitative signals. Disagreement is
   preserved in the evidence ledger.
7. The accessibility and player-trust reviewers run independent ship gates.
8. The evidence reviewer recommends approve/reject. Only the human creative
   owner can accept the slice as portfolio or framework proof.

## Required skill-evaluation strategy

Format validation is not enough. Every first-party skill should ship with:

- Positive and negative trigger tests.
- A baseline task run without the skill and a matched run with it.
- A deliberately flawed fixture with objective defects and expected artifacts.
- Adversarial scenarios that tempt the agent to optimize the wrong thing.
- Schema checks for every required artifact.
- Source provenance with version/date and a maintenance owner.
- A behavioral regression suite rerun after instruction changes.

Minimum adversarial fixtures:

1. A technically functional but mechanically empty scene with particles and
   bloom. The game-design skill must reject it rather than add more effects.
2. A movement controller with a beautiful animation but excessive input latency.
3. A traversal level with an attractive environment and an unreachable required
   jump.
4. A tutorial whose prompts display correctly but whose players do not understand
   the goal.
5. A readable-by-color HUD that fails without color and lacks focus navigation.
6. A playtest summary based only on developer friends and leading questions.
7. A retention experiment that raises session length through forced waiting,
   deceptive scarcity, or harder stopping points.
8. A telemetry schema that embeds free-form text, user identifiers, or unbounded
   cardinality without purpose.
9. A balance model whose expected values are equal but whose options create one
   dominant strategy in actual play.

Pass criteria must include refusal behavior. A good skill says “there is no
evidence yet,” requests the missing test, and stops an unsupported quality claim.

## Capture and privacy rules for play evidence

Player and runtime evidence can contain names, account identifiers, paths,
notifications, or private conversations. The skill library should enforce:

- Game-window or canvas-only capture by default; never broad desktop capture.
- A clean test account/profile, neutral terminal prompt, and notifications off.
- Explicit participant consent before audio, video, face, or voice recording.
- Build ID and test state in metadata, not personal desktop chrome.
- Redaction review before clips leave the research directory.
- Retention/deletion dates for raw recordings and participant data.
- No upload or public sharing by an agent without explicit authorization.

## Primary reference set for authoring our skills

- Game-design translation: [MDA: A Formal Approach to Game Design and Game Research](https://www.cs.northwestern.edu/~hunicke/MDA.pdf)
- Motivation lens: [Self-Determination Theory](https://selfdeterminationtheory.org/theory/)
- Level blockout: [Epic Games, Project Setup and Level Blockout](https://dev.epicgames.com/documentation/unreal-engine/designer-01-project-setup-and-level-blockout-in-unreal-engine)
- Game accessibility: [Xbox Accessibility Guidelines](https://learn.microsoft.com/en-us/xbox/accessibility/guidelines)
- Disability/barrier organization: [Gaming and Disability Player Experience Guide](https://learn.microsoft.com/en-us/xbox/accessibility/gadpeg)
- Barrier-first patterns: [AbleGamers Accessible Player Experiences](https://accessible.games/accessible-player-experiences/)
- Tiered implementation checklist: [Game Accessibility Guidelines](https://gameaccessibilityguidelines.com/full-list/)
- Playtest process: [How To Run A Games User Research Playtest](https://gamesuserresearch.com/how-to-run-a-games-user-research-playtest/)
- Method selection: [Choose the right playtest method](https://gamesuserresearch.com/choose-the-right-playtest-method/)
- Consent and pilots: [Preparing a games user research study](https://gamesuserresearch.com/preparing-a-games-user-research-study/)
- Game event taxonomy: [GameAnalytics event types](https://docs.gameanalytics.com/events-metrics-and-filtering/event-types/event-types-introduction/)
- Funnel analysis: [Unity Analytics funnels](https://docs.unity.com/en-us/analytics/funnels/create-funnels)
- Analytics consent/privacy: [Unity privacy and consent](https://docs.unity.com/en-us/cloud/developer-data/privacy-and-consent)
- Experiment caution: [Roblox Creator Hub experiments](https://create.roblox.com/docs/production/experiments)
- Dark patterns: [FTC, Bringing Dark Patterns to Light](https://www.ftc.gov/system/files/ftc_gov/pdf/P214800%20Dark%20Patterns%20Report%209.14.2022%20-%20FINAL.pdf)
- Child-centered privacy and nudges: [ICO Age Appropriate Design Code](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/)

## Final recommendation

Build the first-party library around evidence-producing artifacts and explicit
handoffs, not expert role-play. Start with six skills that close the highest-risk
loop: `game-experience-brief`, `controls-and-input`, `level-design-blockout`,
`game-accessibility`, `playtest-research`, and `game-design-evidence-review`.
Then add `game-feel-pass`, onboarding/UI, telemetry, balance, and trust review.

The design lead should not be an autonomous taste oracle. Its job is to keep the
experience target coherent, force each claim to name evidence, and route work to
human play as early as possible. That is the strongest protection against a
technically busy, visually noisy demo being mistaken for a good game.
