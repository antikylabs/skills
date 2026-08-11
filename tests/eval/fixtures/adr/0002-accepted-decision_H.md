# 0002: Record only events that need durable history

Status: Accepted

## Context

Early builds recorded every state change as an event. The log grew faster than
the world it described, and replay became slower than simulation.

## Decision

Record an event only when its history must outlive the current session.
Transient state stays in the world projection and is never written to the log.

## Consequences

Replay stays close to simulation speed. Some debugging information is no longer
recoverable after a session ends, and a system that needs durable history must
say so explicitly.
