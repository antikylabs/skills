# 0001: Represent world data with entities and components

## Status

Accepted

## Context

Early builds mixed data and behaviour in one class per game object.

## Decision

We will store world data as entities with components.

## Consequences

Systems iterate components without knowing about game object types. Code that expects a single
object class must be rewritten.
