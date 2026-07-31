/** Day numbers `1..count`, at least one. */
export function buildDayNumbers(count: number): number[] {
  return Array.from({ length: Math.max(1, count) }, (_, index) => index + 1);
}
