/** Templates have no calendar, so day 1 is always the active one. */
export function resolveActiveDayNumber(dayCount: number): number {
  return dayCount <= 0 ? 0 : 1;
}
