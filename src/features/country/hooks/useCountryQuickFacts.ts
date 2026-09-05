import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ParseKeys } from "i18next";

import {
  CalendarColorIcon,
  CoinIcon,
  MoonIcon,
  PlugIcon,
  SunIcon,
} from "@shared/assets/icons";
import { StartOfWeek } from "@shared/constants/countries";
import type { CountryType } from "@shared/types";
import type { CountryQuickFactItem } from "../components";
import {
  formatPlugTypes,
  formatTimeAtUtcOffset,
  hourAtUtcOffset,
  resolveUtcOffset,
} from "../utils";

const ONE_MINUTE_IN_MS = 1000 * 60;

const DAY_STARTS_AT_HOUR = 6;
const NIGHT_STARTS_AT_HOUR = 18;

const START_OF_WEEK_KEYS: Record<StartOfWeek, ParseKeys> = {
  [StartOfWeek.Monday]: "country.quickFacts.monday",
  [StartOfWeek.Sunday]: "country.quickFacts.sunday",
  [StartOfWeek.Saturday]: "country.quickFacts.saturday",
};
function isMorning(hour: number | undefined) {
  return (
    hour != null && hour >= DAY_STARTS_AT_HOUR && hour < NIGHT_STARTS_AT_HOUR
  );
}

export function useCountryQuickFacts(country?: CountryType) {
  const { t, i18n } = useTranslation();
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

  const localTime = useMemo(() => {
    const time = formatTimeAtUtcOffset(now, utcOffset, i18n.language);

    if (!time) {
      return undefined;
    }

    return {
      ...time,
      Icon: isMorning(hourAtUtcOffset(now, utcOffset)) ? SunIcon : MoonIcon,
      label: t("country.quickFacts.localTime"),
    };
  }, [now, utcOffset, t, i18n.language]);

  const facts = useMemo<CountryQuickFactItem[]>(() => {
    const items: CountryQuickFactItem[] = [];

    const currency = country?.currencies?.[0];

    if (currency?.code) {
      items.push({
        key: "currency",
        Icon: CoinIcon,
        label: t("country.quickFacts.currency"),
        value: currency.code,
      });
    }

    const plugTypes = formatPlugTypes(country?.plug_data?.plugTypes);

    if (plugTypes) {
      items.push({
        key: "plugTypes",
        Icon: PlugIcon,
        label: t("country.quickFacts.plugTypes"),
        value: plugTypes,
      });
    }

    const startOfWeekKey = country?.start_of_week
      ? START_OF_WEEK_KEYS[country.start_of_week]
      : undefined;

    if (startOfWeekKey) {
      items.push({
        key: "startOfWeek",
        Icon: CalendarColorIcon,
        label: t("country.quickFacts.startOfWeek"),
        value: t(startOfWeekKey),
      });
    }

    return items;
  }, [country?.currencies, country?.plug_data, country?.start_of_week, t]);

  return { localTime, facts };
}
