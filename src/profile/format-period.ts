const MONTHS = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
] as const;

export function formatPeriod(start: Date, end: Date | null): string {
  const endLabel = end ? formatMonth(end) : 'настоящее время';
  return `${formatMonth(start)} — ${endLabel}`;
}

export function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function formatMonth(date: Date): string {
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}
