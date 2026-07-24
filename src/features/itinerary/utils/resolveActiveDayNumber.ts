import { parseDateOnly, toDateOnly } from "./formatDateRange";

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export function resolveActiveDayNumber(
  startDate: string,
  endDate: string,
  dayCount: number,
  today: Date = new Date(),
): number {
  if (dayCount <= 0) {
    return 0;
  }

  const todayOnly = toDateOnly(today);

  if (todayOnly < startDate) {
    return 1;
  }

  if (todayOnly > endDate) {
    return dayCount;
  }

  const start = parseDateOnly(startDate);
  const current = parseDateOnly(todayOnly);
  const diffInDays = Math.round(
    (current.getTime() - start.getTime()) / DAY_IN_MS,
  );

  return Math.min(Math.max(diffInDays + 1, 1), dayCount);
}
