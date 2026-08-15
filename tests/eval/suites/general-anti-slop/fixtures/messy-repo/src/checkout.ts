export interface LineItem { price: number }

export function total(items: LineItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
