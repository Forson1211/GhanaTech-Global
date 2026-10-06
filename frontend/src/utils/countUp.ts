export interface CountValue {
  prefix: string;
  suffix: string;
  target: number;
  decimalPlaces: number;
}

export function parseCountValue(value: string): CountValue | null {
  const match = value.trim().match(/^([^\d]*?)(\d+(?:,\d{3})*(?:\.\d+)?)([^\d]*)$/);
  if (!match) return null;
  const target = Number(match[2].replace(/,/g, ''));
  if (!Number.isFinite(target)) return null;
  const decimalPlaces = match[2].split('.')[1]?.length ?? 0;
  if (decimalPlaces > 20) return null;
  return { prefix: match[1], suffix: match[3], target, decimalPlaces };
}

export function formatCountValue(value: CountValue, amount: number): string {
  const number = Math.min(Math.max(amount, 0), value.target).toLocaleString('en-US', {
    minimumFractionDigits: value.decimalPlaces,
    maximumFractionDigits: value.decimalPlaces,
  });
  return `${value.prefix}${number}${value.suffix}`;
}
