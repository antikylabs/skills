export function render(invoice: { number: string }): string {
  return `Invoice ${invoice.number}`;
}
