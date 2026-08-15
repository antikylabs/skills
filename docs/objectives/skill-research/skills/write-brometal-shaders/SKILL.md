---
name: write-brometal-shaders
description: Implement, extend, and debug typed WebGPU rendering with BroMetal. Use when an agent needs to create shaders, connect typed GPU resources, add render passes, diagnose shader compilation, or integrate BroMetal rendering beneath an Antiky game.
---

# Write BroMetal Shaders

## Establish the rendering boundary

1. Inspect the installed BroMetal version and its local types before selecting an API.
2. Find the nearest working renderer or shader in the project and follow its conventions.
3. Keep BroMetal programs, buffers, textures, targets, and GPU handles inside the renderer boundary.
4. Keep gameplay and authoritative world state independent of GPU resources.

## Implement a narrow render change

- Define typed shader inputs explicitly.
- Reuse long-lived GPU resources; do not allocate per entity in the normal frame path.
- Upload static content once per asset revision and update only changed dynamic ranges.
- Preserve the last valid render program when development compilation fails.
- Report compilation, layout, and resource failures through structured diagnostics.
- Treat WebGPU support as a required capability rather than silently introducing another renderer.

## Verify the result

1. Add or update shader compilation and render-boundary tests.
2. Run the shader compiler and relevant package tests.
3. Exercise the render path in a WebGPU-capable browser.
4. Inspect build and runtime diagnostics through Antiky when working in an Antiky project.

Use installed package types and repository examples as the API authority; BroMetal is evolving and this skill intentionally avoids frozen signatures.
