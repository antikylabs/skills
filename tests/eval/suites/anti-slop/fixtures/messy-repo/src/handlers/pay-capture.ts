import type { Context } from "../context.ts";

export function handleUpayUcapture(ctx: Context): void {
  ctx.log("pay-capture");
}
