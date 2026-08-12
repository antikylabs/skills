# Change a point light while the game runs

Use this when a light must respond to gameplay — a torch guttering, a lamp switched off.

1. Get the entity's stable ID.
2. Send a `SetPointLightIntensity` command through the session.
3. Wait for the accepted revision before reading the value back.

The change is visible on the next rendered frame.
