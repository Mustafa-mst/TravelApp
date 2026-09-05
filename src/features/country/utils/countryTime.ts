const UTC_OFFSET_PATTERN = /^UTC([+-])(\d{2}):(\d{2})$/;

const MINUTES_PER_HOUR = 60;
const DEGREES_PER_HOUR = 15;
const MS_PER_MINUTE = 1000 * 60;

/** Minutes east of UTC, or undefined when the string isn't a `UTC±HH:MM`. */
export function parseUtcOffset(timezone: string): number | undefined {
  const match = UTC_OFFSET_PATTERN.exec(timezone);

  if (!match) {
    return undefined;
  }

  const [, sign, hours, minutes] = match;
  const total = Number(hours) * MINUTES_PER_HOUR + Number(minutes);

  return sign === "-" ? -total : total;
}

/**
 * The country's `timezones` list every overseas territory too, in no
 * meaningful order, so the capital's longitude picks the mainland offset:
 * whichever listed offset sits closest to the sun's position there.
 */
export function resolveUtcOffset(
  timezones?: string[],
  capitalLatLng?: [number, number],
): number | undefined {
  const offsets = timezones?.map(parseUtcOffset).filter(isDefined) ?? [];

  if (offsets.length === 0) {
    return undefined;
  }

  const longitude = capitalLatLng?.[1];

  if (offsets.length === 1 || longitude == null) {
    return offsets[0];
  }

  const solarOffset = (longitude / DEGREES_PER_HOUR) * MINUTES_PER_HOUR;

  return offsets.reduce((closest, offset) =>
    Math.abs(offset - solarOffset) < Math.abs(closest - solarOffset)
      ? offset
      : closest,
  );
}

export function formatTimeAtUtcOffset(
  now: Date,
  offsetInMinutes: number | undefined,
  locale: string,
): { clock: string; dayPeriod: string } | undefined {
  if (offsetInMinutes == null) {
    return undefined;
  }

  const shifted = new Date(now.getTime() + offsetInMinutes * MS_PER_MINUTE);

  const parts = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).formatToParts(shifted);

  const clock = parts
    .filter(({ type }) => type !== "dayPeriod")
    .map(({ value }) => value)
    .join("")
    .trim();

  const dayPeriod =
    parts.find(({ type }) => type === "dayPeriod")?.value.trim() ?? "";

  return { clock, dayPeriod };
}

/** Hour of day (0-23) at the given UTC offset. */
export function hourAtUtcOffset(
  now: Date,
  offsetInMinutes: number | undefined,
): number | undefined {
  if (offsetInMinutes == null) {
    return undefined;
  }

  return new Date(now.getTime() + offsetInMinutes * MS_PER_MINUTE).getUTCHours();
}

function isDefined<T>(value: T | undefined): value is T {
  return value != null;
}
