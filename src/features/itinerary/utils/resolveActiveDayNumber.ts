/**
 * The day to highlight by default in the overview. Templates are not anchored
 * to a calendar, so there is no "today is on day N" logic — day 1 is active
 * whenever the template has any days.
 */
export function resolveActiveDayNumber(dayCount: number): number {
  return dayCount <= 0 ? 0 : 1;
}
