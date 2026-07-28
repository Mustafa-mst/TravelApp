/**
 * Day numbers `1..count` for a template. Templates carry no calendar dates, so
 * days are identified purely by `day_number`. Always returns at least one day.
 */
export function buildDayNumbers(count: number): number[] {
  return Array.from({ length: Math.max(1, count) }, (_, index) => index + 1);
}
