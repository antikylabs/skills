/**
 * A bounded worker pool.
 *
 * Every agent run is an independent container against an independent API call,
 * so the suite is embarrassingly parallel — and almost all of its wall clock is
 * spent waiting on the model, not computing. Running them one at a time made a
 * 45-case paired suite take ~17 minutes when the work itself is mostly idle.
 *
 * The limit is memory in the container VM, not CPU. See `concurrency()`.
 */

import os from "node:os";
import { execFileSync } from "node:child_process";

/** Run `worker` over every item, at most `limit` in flight. Results keep input order. */
export async function mapLimit<T, R>(
  items: readonly T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;

  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    for (;;) {
      const index = next++;
      if (index >= items.length) return;
      results[index] = await worker(items[index]!, index);
    }
  });

  await Promise.all(runners);
  return results;
}

/**
 * How many containers to run at once.
 *
 * The binding constraint is the container VM's memory, not the host's cores: a
 * rootless podman machine defaults to about 2 GiB, and each run needs a few
 * hundred megabytes for node, tsx, and the vocabulary JSON. Four concurrent runs
 * in a default machine is comfortable; more needs a bigger machine:
 *
 *   podman machine stop
 *   podman machine set --memory 8192
 *   podman machine start
 *
 * `EVAL_CONCURRENCY` overrides. 1 restores the old sequential behaviour, which
 * is worth reaching for when reading interleaved logs is more useful than speed.
 */
export function concurrency(): number {
  const override = process.env.EVAL_CONCURRENCY;
  if (override) {
    const value = Number(override);
    if (!Number.isInteger(value) || value < 1) {
      process.stderr.write(`EVAL_CONCURRENCY="${override}" is not a positive integer\n`);
      process.exit(2);
    }
    return value;
  }

  // Size to the VM when it can be read, otherwise take a conservative default.
  // What a live run actually uses, not what a faux one does. 256 was derived
  // from the faux path and proved too optimistic: real runs were OOM-killed at a
  // 384m cap when several ran at once. 512 reflects the live path.
  //
  // On a default 2 GiB podman machine this yields 2. More concurrency needs a
  // bigger machine, which is the real unlock:
  //   podman machine stop && podman machine set --memory 8192 && podman machine start
  const perRunMb = 512;
  let budgetMb = 0;
  try {
    const free = execFileSync("podman", ["machine", "ssh", "free -m"], {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
      timeout: 10_000,
    });
    const total = Number(/Mem:\s+(\d+)/.exec(free)?.[1] ?? 0);
    budgetMb = Math.max(0, total - 600); // leave the VM's own OS room
  } catch {
    budgetMb = 0;
  }

  const byMemory = budgetMb > 0 ? Math.floor(budgetMb / perRunMb) : 4;
  const byCpu = Math.max(1, os.cpus().length - 2);
  return Math.max(1, Math.min(byMemory, byCpu, 8));
}
