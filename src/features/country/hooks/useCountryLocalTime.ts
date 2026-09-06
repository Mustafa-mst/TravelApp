import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { MoonIcon, SunIcon } from "@shared/assets/icons";
import type { CountryType } from "@shared/types";
import { DAY_PERIOD_COLORS } from "../constants";
import {
  formatTimeAtUtcOffset,
  hourAtUtcOffset,
  resolveUtcOffset,
} from "../utils";

const ONE_MINUTE_IN_MS = 1000 * 60;

const DAY_STARTS_AT_HOUR = 6;
const NIGHT_STARTS_AT_HOUR = 18;

function isMorning(hour: number | undefined) {
  return (
    hour != null && hour >= DAY_STARTS_AT_HOUR && hour < NIGHT_STARTS_AT_HOUR
  );
}

export function useCountryLocalTime(country?: CountryType) {
  const { i18n } = useTranslation();
  const [now, setNow] = useState(() => new Date());

  const utcOffset = useMemo(
    () => resolveUtcOffset(country?.timezones, country?.capital_info?.latlng),
    [country?.timezones, country?.capital_info?.latlng],
  );

  useEffect(() => {
    if (utcOffset == null) {
      return;
    }

    const timer = setInterval(() => setNow(new Date()), ONE_MINUTE_IN_MS);

    return () => clearInterval(timer);
  }, [utcOffset]);

  return useMemo(() => {
    const time = formatTimeAtUtcOffset(now, utcOffset, i18n.language);

    if (!time) {
      return undefined;
    }

    const isDay = isMorning(hourAtUtcOffset(now, utcOffset));

    const palette = isDay ? DAY_PERIOD_COLORS.day : DAY_PERIOD_COLORS.night;

    return {
      ...time,
      Icon: isDay ? SunIcon : MoonIcon,
      gradient: palette.gradient,
      locations: palette.locations,
      foreground: palette.foreground,
      city: country?.capital?.[0] ?? "",
    };
  }, [now, utcOffset, country?.capital, i18n.language]);
}
