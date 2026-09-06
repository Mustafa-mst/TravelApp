import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { ParseKeys } from "i18next";

import { CarType, StartOfWeek } from "@shared/constants/countries";
import type { CountryType } from "@shared/types";
import {
  formatArea,
  formatDiallingCode,
  formatLanguages,
  formatList,
  formatNumber,
  formatPlugTypes,
} from "../utils";

export type CountryEssentialRow = {
  key: string;
  label: string;
  value: string;
};

export type CountryEssentialGroup = {
  key: string;
  title: string;
  rows: CountryEssentialRow[];
};

const START_OF_WEEK_KEYS: Record<StartOfWeek, ParseKeys> = {
  [StartOfWeek.Monday]: "country.essentials.monday",
  [StartOfWeek.Sunday]: "country.essentials.sunday",
  [StartOfWeek.Saturday]: "country.essentials.saturday",
};

const CAR_SIDE_KEYS: Record<CarType, ParseKeys> = {
  [CarType.Left]: "country.essentials.driveLeft",
  [CarType.Right]: "country.essentials.driveRight",
};

type RowDraft = { key: string; label: string; value?: string };

/** Drops the rows whose data the row didn't carry. */
function toRows(drafts: RowDraft[]): CountryEssentialRow[] {
  return drafts.filter((draft): draft is CountryEssentialRow =>
    Boolean(draft.value),
  );
}

export function useCountryEssentials(country?: CountryType) {
  const { t, i18n } = useTranslation();

  return useMemo<CountryEssentialGroup[]>(() => {
    const locale = i18n.language;
    const currency = country?.currencies?.[0];
    const plug = country?.plug_data;

    const money = toRows([
      {
        key: "currency",
        label: t("country.essentials.currency"),
        value: currency?.code,
      },
      {
        key: "currencyName",
        label: t("country.essentials.currencyName"),
        value: currency?.name,
      },
      {
        key: "currencySymbol",
        label: t("country.essentials.currencySymbol"),
        value: currency?.symbol,
      },
    ]);

    const power = toRows([
      {
        key: "plugTypes",
        label: t("country.essentials.plugTypes"),
        value: formatPlugTypes(plug?.plugTypes),
      },
      {
        key: "voltage",
        label: t("country.essentials.voltage"),
        value: plug?.voltage,
      },
      {
        key: "frequency",
        label: t("country.essentials.frequency"),
        value: plug?.frequency,
      },
    ]);

    const carSideKey = country?.car?.side
      ? CAR_SIDE_KEYS[country.car.side]
      : undefined;
    const startOfWeekKey = country?.start_of_week
      ? START_OF_WEEK_KEYS[country.start_of_week]
      : undefined;

    const daily = toRows([
      {
        key: "startOfWeek",
        label: t("country.essentials.startOfWeek"),
        value: startOfWeekKey ? t(startOfWeekKey) : undefined,
      },
      {
        key: "carSide",
        label: t("country.essentials.carSide"),
        value: carSideKey ? t(carSideKey) : undefined,
      },
      {
        key: "carSigns",
        label: t("country.essentials.carSigns"),
        value: formatList(country?.car?.signs),
      },
      {
        key: "diallingCode",
        label: t("country.essentials.diallingCode"),
        value: formatDiallingCode(country?.idd),
      },
      {
        key: "languages",
        label: t("country.essentials.languages"),
        value: formatLanguages(country?.languages),
      },
    ]);

    const geography = toRows([
      {
        key: "capital",
        label: t("country.essentials.capital"),
        value: formatList(country?.capital),
      },
      {
        key: "region",
        label: t("country.essentials.region"),
        value: country?.subregion ?? country?.region,
      },
      {
        key: "area",
        label: t("country.essentials.area"),
        value: formatArea(country?.area, locale),
      },
      {
        key: "population",
        label: t("country.essentials.population"),
        value: formatNumber(country?.population_data?.population, locale),
      },
      {
        key: "timezones",
        label: t("country.essentials.timezones"),
        value: formatList(country?.timezones),
      },
    ]);

    const groups: CountryEssentialGroup[] = [
      { key: "money", title: t("country.essentials.moneyGroup"), rows: money },
      { key: "power", title: t("country.essentials.powerGroup"), rows: power },
      { key: "daily", title: t("country.essentials.dailyGroup"), rows: daily },
      {
        key: "geography",
        title: t("country.essentials.geographyGroup"),
        rows: geography,
      },
    ];

    return groups.filter((group) => group.rows.length > 0);
  }, [country, t, i18n.language]);
}
