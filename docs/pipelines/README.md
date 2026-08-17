# Pipeline library

This is a flat catalog of concise, source-faithful AI-assisted game-development workflows. Each
page preserves one source's order and gates. Admission records only that the workflow is auditable;
it makes no effectiveness, recommendation, portability, or production-readiness claim.

## Page contract

Every `pipeline-<group-name>-<name>.md` page must:

- name its scope, trigger, source, author, evidence date, evidence signals, and limits;
- show one top-level Mermaid path with at most nine main nodes;
- preserve the source's order, feedback gate, outputs, failure conditions, and stop condition;
- label editorial inference in both prose and the diagram;
- separate observed supporting skills from potential supporting skills; and
- use direct, auditable citations.

Follow [the researcher guide](RESEARCHER.md) to harvest a target, then copy
[the pipeline template](PIPELINE_TEMPLATE.md) for each admitted page.

## Evidence vocabulary

Evidence signals are cumulative and remain separate:

| Signal | Meaning |
| --- | --- |
| Source-documented | A primary source states the flow |
| Author-practiced | Public artifacts show the author applying it |
| Study-observed | A study records participants, trials, artifacts, or outcomes |
| Production-used | A named team reports using it in a named production context |
| Independently validated | Evidence outside the source evaluates or reproduces it |

## Pipelines

| Pipeline | Scope | Evidence signals |
| --- | --- | --- |
| [Three.js visual-system validation](pipeline-threejs-visual-system-validation.md) | Verification | Source-documented; Author-practiced |
| [Three.js final-image pipeline](pipeline-threejs-final-image.md) | Technical graphics | Source-documented; Author-practiced |
| [Thrixel Goal to Game pipeline](pipeline-thrixel-goal-to-game.md) | End-to-end | Source-documented |
| [Fast gameplay prototyping](pipeline-gamedev-skills-fast-gameplay-prototyping.md) | Prototyping | Source-documented |
| [Game-jam delivery](pipeline-gamedev-skills-game-jam-delivery.md) | Delivery | Source-documented |
| [Game-asset production](pipeline-gamedev-skills-game-asset-production.md) | Asset | Source-documented |
| [Level blockout, teach, and test](pipeline-gamedev-skills-level-blockout-teach-test.md) | Discipline | Source-documented |
| [Pearl Sea Park staged agent build](pipeline-pearl-sea-park-staged-agent-build.md) | End-to-end | Source-documented; Author-practiced |
| [Unreal package and runtime validation](pipeline-unreal-package-runtime-validation.md) | Engine-specific build and verification | Source-documented |
| [itch.io Butler publish and update](pipeline-itchio-butler-publish-update.md) | Delivery | Source-documented |
| [Steamworks SteamPipe build and release](pipeline-steamworks-steampipe-build-release.md) | Delivery | Source-documented |

## Five-minute cold-reader check

A reader should be able to identify, without opening the research outcome:

1. the trigger;
2. the ordered loop;
3. the feedback gate;
4. the outputs; and
5. the evidence level.

## Maintenance and verification

Refresh the primary source before editing a page. Preserve source-specific vocabulary and
contradictions, keep inference labeled, update the research mapping, and do not synthesize a house
pipeline from recurring shapes.

Run these checks from the repository root:

```sh
for file in docs/pipelines/*.md; do npx --yes markdown-link-check@3.15.0 "$file"; done
for file in docs/pipelines/pipeline-*.md; do npx --yes @mermaid-js/mermaid-cli@11.16.0 -i "$file" -o "/tmp/$(basename "$file")"; done
git diff --check
```

The Mermaid check uses Mermaid CLI 11.16.0 and its bundled Mermaid parser.
