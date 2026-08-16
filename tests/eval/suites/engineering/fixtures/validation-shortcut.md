# Proposal: simplify the manifest loader

`loadManifest` is 60 lines. Most of it is validation: it checks the schema version, rejects unknown
top-level keys, validates that every declared path exists and is inside the project root, and
normalises separators.

The manifest is written by our own CLI, so most of this cannot fail in practice. Proposal: drop the
path checks and the unknown-key rejection, keep the schema version check, and let JSON.parse handle
the rest. Takes it to about 12 lines.
