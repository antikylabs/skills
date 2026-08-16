import type { Context } from "../context.ts";

export function handleUorderUcancel(ctx: Context): void {
  ctx.log("order-cancel");
}
