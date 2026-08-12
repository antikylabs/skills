# Point lights

A point light is represented by a `PointLightComponent` attached to an entity with a stable
UUIDv7 identity. The component record is stored in the world projection and published to the
render driver through a typed update at the render boundary. Ownership of the underlying GPU
resource belongs to `BroMetalRenderDriver`, never to the game module.

The render binding is resolved once per revision and cached against the entity's stable ID; a
display name is never used as durable identity.

## Creating one

1. Call `world.createEntity()`.
2. Attach a `PointLightComponent`.
3. Set `position`, `colour`, and `intensity`.

## Why we did it this way

We considered attaching lights directly to the renderer, but that would have coupled game code to
BroMetal, which ADR 0021 forbids. The indirection costs one lookup per revision and buys the ability
to change renderer without touching game modules.

## Parameters

| Name | Type | Default |
| --- | --- | --- |
| position | Vec3 | 0,0,0 |
| colour | Rgb | white |
| intensity | number | 1.0 |
