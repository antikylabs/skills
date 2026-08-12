# Sandbox for the skill-behavior eval.
#
# The pi agent SDK has no built-in permission system: it runs with the
# permissions of whatever launched it, and its own docs are explicit that a
# partial in-process sandbox is not a security boundary. So the agent runs here,
# in a container, and never on the host shell.
#
# Build context is the repository root, so the skill and the harness can both be
# copied in. Nothing is mounted read-write at run time.

FROM node:24-bookworm-slim

# tini gives us correct signal handling and reaping for a one-shot process.
RUN apt-get update \
  && apt-get install -y --no-install-recommends tini ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# A non-root user inside the container as well. Rootless podman already maps
# container root to an unprivileged host uid; this is the second layer.
RUN useradd --create-home --shell /usr/sbin/nologin evaluator

WORKDIR /harness

# Dependencies first, so edits to the harness do not invalidate the npm layer.
COPY tests/package.json ./package.json
# --ignore-scripts keeps install-time code out of the image. Optional deps must
# stay: tsx's esbuild ships its native binary as an optional platform package,
# and omitting them leaves "@esbuild/linux-arm64 could not be found" at runtime.
RUN npm install --no-audit --no-fund --ignore-scripts \
  && npm cache clean --force

# The harness, then the skill under test. The skill is baked in read-only
# rather than bind-mounted, so a container cannot reach back into the worktree.
COPY tests/tsconfig.json ./tsconfig.json
COPY tests/eval ./eval
COPY skills /skills

RUN chown -R evaluator:evaluator /harness && chmod -R a-w /skills

USER evaluator

ENTRYPOINT ["/usr/bin/tini", "--", "npx", "tsx", "/harness/eval/sandbox/agent-run.ts"]
