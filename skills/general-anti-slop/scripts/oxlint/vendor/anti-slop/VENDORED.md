# Vendored: dmmulroy/anti-slop

Copied verbatim from <https://github.com/dmmulroy/anti-slop>, MIT, Copyright (c) 2026 Dillon Mulroy.
The licence is in [LICENSE](LICENSE) and must travel with these files.

| | |
| --- | --- |
| Upstream | https://github.com/dmmulroy/anti-slop |
| Commit | `446268e5d15baa968eaec669ff65358d36ae6259` |
| Upstream date | 2026-08-14 |
| Vendored on | 2026-08-14 |
| Contents | `src/` verbatim, including the author's own tests |

**Do not edit anything under `src/`.** A local change makes the next resync a merge, and there is
no reason to fork rules that are maintained upstream. If a rule is wrong for a project, turn it off
in that project's oxlint config. If it is wrong generally, send a pull request upstream.

## Resync

```bash
git clone --depth 1 https://github.com/dmmulroy/anti-slop /tmp/anti-slop
rm -rf src && cp -R /tmp/anti-slop/src src && cp /tmp/anti-slop/LICENSE LICENSE
# then update the commit and date above, and run the test suite
```
