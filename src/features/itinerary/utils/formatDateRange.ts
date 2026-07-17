import i18n from "@shared/i18n";

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat(i18n.language, {
    day: "numeric",
    month: "short",
    year: "numeric",
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
  const start = new Date(startIso);
  const end = new Date(endIso);
  const locale = i18n.language;

  const sameMonth =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth();

  const dayFormat = new Intl.DateTimeFormat(locale, { day: "numeric" });
  const dayMonthFormat = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
  });

  if (sameMonth) {
    return `${dayFormat.format(start)}–${dayMonthFormat.format(end)}, ${end.getFullYear()}`;
  }

  return `${dayMonthFormat.format(start)} – ${dayMonthFormat.format(end)}, ${end.getFullYear()}`;
}
