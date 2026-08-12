# Objective: town-lighting

**Started:** 2026-08-11
**Status:** Being defined

## What we want

The town demo should look like a place at dusk, not a grey box with some lamps in it. Right now the
lighting reads flat — you cannot tell a wall from the ground without looking at the texture.

## Why now

We are showing this in six weeks and it is the demo people will remember. Every other demo borrows
from it.

## What good looks like

Someone glances at a still and knows what time of day it is. Shadows sit under things. The lamps
feel like they are emitting rather than being painted on.

## What worries me

I think this needs shadow maps and I do not know what that costs us in the render path. I also do
not know whether we can do it without touching BroMetal, and I would rather not.

## Constraints

Six weeks. No new dependencies. Do not break the other three demos.

## Explicitly not this

Not doing a full material system. Not doing weather. Not touching the audio.

## Open questions for research

- Can we get usable shadows without a BroMetal change?
- What is already in the render driver that we are not using?
