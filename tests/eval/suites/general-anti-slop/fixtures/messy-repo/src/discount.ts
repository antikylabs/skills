export function applyDiscount(amount: number, percent: number): number {
  return amount - (amount * percent) / 100;
}
