# Ingestion pipeline

## Overview

The new ingestion pipeline is robust and highly scalable. Our design ensures the
system remains maintainable as the team grows, and the modular architecture
provides a seamless experience for downstream consumers.

## Why we rebuilt it

The old pipeline was the load-bearing part of the platform, and every incident
review came back to it. The seam between ingestion and enrichment is where most
of the failures started.

## Rollout

We will migrate the ingestion workers first. This should take about two weeks,
with the remaining services following within one sprint.

## Operations

Cache entries expire after seven days. The request timeout is 30 seconds.
