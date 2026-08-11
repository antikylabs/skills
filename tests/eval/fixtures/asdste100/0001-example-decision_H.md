# 0001: Utilize a single render driver

Status: Accepted

## Context

The system currently utilizes multiple render drivers, and it's difficult to
reason about which one is authoritative. Performance characteristics are being
degraded by the duplication, e.g. shader compilation happens twice.

## Decision

We will utilize one render driver for all rendering work.

## Consequences

The aforementioned duplication is eliminated. Subsequent work should not
introduce an additional driver without superseding this record.
