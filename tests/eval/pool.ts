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
  //
  // This used to divide VM memory by 512 MB — the size of one Node process with
  // the SDK loaded — because every run was its own container. Runs now share a
  // container and an interpreter, so the marginal cost of another concurrent
  // agent is its conversation and its seeded workspace copy, not another
  // runtime. `batchHardening` in container.ts sizes the container to match:
  // 512 MB of fixed overhead plus 192 MB per agent.
  //
  // Dividing by 512 under the new model understated the ceiling by roughly two
  // and a half times and quietly held a 2 GiB machine at 2.
  const fixedMb = 512;
  const perAgentMb = 192;
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

  const byMemory = budgetMb > 0 ? Math.floor((budgetMb - fixedMb) / perAgentMb) : 4;
  const byCpu = Math.max(1, os.cpus().length - 2);
  /**
   * The hard cap.
   *
   * This is where the provider gets a say that the arithmetic above cannot see.
   * Codex refused 57 of 67 runs at a concurrency of 5 on a 2 GiB machine, and
   * luna over OpenRouter caps at 10 requests per minute whatever the hardware
   * allows — so past some point more workers just produce more 429s, and the
   * provider-failure gate turns those into a refused run rather than a number.
   *
   * Raised from 4 once the machine grew to 8 GiB: memory had been the binding
   * constraint and no longer is, so the remaining ceiling is worth finding
   * empirically rather than assuming. Lower it with EVAL_CONCURRENCY if a
   * provider starts refusing.
   */
  const providerCeiling = 12;
  return Math.max(1, Math.min(byMemory, byCpu, providerCeiling));
}
