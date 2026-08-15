---
name: build-antiky-games
description: Build, extend, inspect, and debug games made with Antiky Framework, the Antiky CLI, and Antiky Studio. Use when an agent needs to create an Antiky project, implement gameplay, run a development session, inspect structured game state, or operate Antiky MCP tools.
---

# Build Antiky Games

## Start with the project boundary

1. Read the nearest `AGENTS.md` and the project's `.antiky` manifest.
2. Inspect the existing game module, tests, shaders, and assets before changing them.
3. Keep game rules in the game module. Keep renderer-specific work below the Antiky render boundary.
4. Prefer the smallest playable change that proves the requested behavior.

## Work through Antiky

- Start a project with `antiky dev --project <manifest>`.
- Read structured state with `antiky inspect` and `antiky tool`.
- Use the Antiky MCP tools when they are available instead of inferring runtime state from screenshots.
- After source, shader, asset, or manifest changes, call `get_latest_build` and wait for an accepted revision before reloading or inspecting.
- Preserve stable entity and asset IDs. Do not use display names as durable identity.
- Make authoritative changes through validated commands. Keep inspection read-only.

## Verify the result

1. Add or update a test for changed code.
2. Run the narrow package tests first.
3. Start the development session and exercise the changed path.
4. Inspect diagnostics and the relevant runtime state.
5. Run the repository's broader check before delivery when practical.

Read the repository's current user-facing Antiky documentation rather than embedding version-sensitive API details in this skill.
