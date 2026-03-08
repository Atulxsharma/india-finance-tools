export function formatRupees(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatCompactInr(value: number): string {
  const safeValue = Number.isFinite(value) ? value : 0;

  if (Math.abs(safeValue) >= 10_000_000) {
    return `₹${(safeValue / 10_000_000).toFixed(2)}Cr`;
  }

  if (Math.abs(safeValue) >= 100_000) {
    return `₹${(safeValue / 100_000).toFixed(2)}L`;
  }

  return formatRupees(safeValue);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}
