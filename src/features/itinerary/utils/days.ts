import { parseDateOnly } from "./formatDateRange";

const DAY_IN_MS = 1000 * 60 * 60 * 24;

/**
 * Inclusive list of calendar days between two `YYYY-MM-DD` dates, one `Date`
 * per day. Always returns at least one day (single-day trips). Parsed in local
 * time via `parseDateOnly` so days don't shift across the UTC boundary.
 */
export function buildDays(startDate: string, endDate: string): Date[] {
  const start = parseDateOnly(startDate);
  const end = parseDateOnly(endDate);
  const count = Math.max(
    1,
    Math.round((end.getTime() - start.getTime()) / DAY_IN_MS) + 1,
  );

  return Array.from({ length: count }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    return day;
  });
}
