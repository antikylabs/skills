# Notes from the render boundary discussion

We went back and forth on whether game code should be able to call BroMetal
directly for the lighting work. Two people wanted a direct path for the
prototype speed; the argument against is that every direct call becomes a
migration cost the next time the renderer moves.

Landed on: BroMetal stays behind the Antiky render driver. Game modules talk to
the driver, never to BroMetal. The prototype takes the slower path.

Consequences we talked through: lighting prototypes get slower to write, the
driver surface grows, and we can move renderers without touching game code.

Nobody wrote this up yet.
