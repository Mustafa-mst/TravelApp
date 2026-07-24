import i18n from "@shared/i18n";

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat(i18n.language, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

// "19 Tem Paz" / "Sun, Jul 19" — compact date used in the duration row.
export function formatDateWithWeekday(date: Date): string {
  return new Intl.DateTimeFormat(i18n.language, {
    day: "numeric",
    month: "short",
    weekday: "short",
  }).format(date);
}

// "11 Mart Cumartesi" / "Saturday, March 11" — full weekday + month, used in the day detail header.
export function formatFullDate(date: Date): string {
  return new Intl.DateTimeFormat(i18n.language, {
    day: "numeric",
    month: "long",
    weekday: "long",
  }).format(date);
}

// Parse/format `YYYY-MM-DD` in local time; toISOString/new Date(iso) would shift the day by the UTC offset.
export function parseDateOnly(dateOnly: string): Date {
  const [year, month, day] = dateOnly.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function toDateOnly(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDateRange(startIso: string, endIso: string): string {
  const start = parseDateOnly(startIso);
  const end = parseDateOnly(endIso);
  const locale = i18n.language;

  const sameDay =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate();

  const dayFormat = new Intl.DateTimeFormat(locale, { day: "numeric" });
  const monthDayFormat = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
  });

  // Single-day trip: no range, just the one date.
  if (sameDay) {
    return `${monthDayFormat.format(end)}, ${end.getFullYear()}`;
  }

  const sameMonth =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth();

  if (sameMonth) {
    return `${monthDayFormat.format(start)}–${dayFormat.format(end)}, ${end.getFullYear()}`;
  }

  return `${monthDayFormat.format(start)} – ${monthDayFormat.format(end)}, ${end.getFullYear()}`;
}
