# Flat pipeline files

This document supersedes only the nested pipeline-page layout in
[the recursive target-harvest plan](02-recursive-target-harvest.md#files-and-indexing). The harvest
strategy, sequence, admission rules, and recursive bounds remain current.

## Decision

Publish every pipeline in one flat namespace:

```text
docs/pipelines/pipeline-<group-name>-<name>.md
```

`<group-name>` identifies the source family, such as `threejs`, `thrixel`, or
`gamedev-skills`. `<name>` identifies the workflow. Selection manifests must freeze the
complete filename, not only a slug.

Keep `docs/pipelines/README.md` as the index and `docs/pipelines/PIPELINE_TEMPLATE.md` as the
scaffold. Do not create a directory for an individual pipeline.

## Why this layout

The flat list is easier to scan, search, link, and audit as a catalog. The group-name segment
keeps related pipelines recognizable and prevents generic workflow names from colliding.

## Cost

Filenames are longer, and each recursive-wave manifest must choose a stable group name.
That is smaller than the navigation cost of many directories containing identically named
`pipeline.md` files.

## Not covered

This decision does not change page content, evidence requirements, admission, or how supporting
artifacts would be handled if a future pipeline genuinely needs them.
