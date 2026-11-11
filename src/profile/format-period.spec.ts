import { formatPeriod, toIsoDate } from './format-period';

describe('formatPeriod', () => {
  it('formats an open period in UTC', () => {
    expect(formatPeriod(new Date('2024-01-01T00:00:00.000Z'), null)).toBe(
      'январь 2024 — настоящее время',
    );
  });

  it('formats a closed period without shifting the calendar day', () => {
    expect(
      formatPeriod(
        new Date('2024-01-01T00:00:00.000Z'),
        new Date('2025-12-01T00:00:00.000Z'),
      ),
    ).toBe('январь 2024 — декабрь 2025');
  });
});

describe('toIsoDate', () => {
  it('returns the UTC calendar date', () => {
    expect(toIsoDate(new Date('2024-01-01T00:00:00.000Z'))).toBe('2024-01-01');
  });
});
