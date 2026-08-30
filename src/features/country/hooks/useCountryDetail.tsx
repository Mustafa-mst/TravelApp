import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRoute, type RouteProp } from "@react-navigation/native";
import { getLocales } from "expo-localization";

import type { BottomSheet, ListGroupItem } from "@shared/components";
import { CalendarMonthIcon } from "@shared/assets/icons";
import type { RootStackParamList } from "@shared/navigation";
import { resolveCountryName } from "@shared/utils/country";
import { ExchangeConverter } from "@/features/exchange";
import { COUNTRY_SECTIONS } from "../constants";
import { useCountryImageQuery, useGetCountryDetailQuery } from "./query";

type CountryDetailRoute = RouteProp<RootStackParamList, "CountryDetail">;

export function useCountryDetail() {
  const { t, i18n } = useTranslation();
  const { params } = useRoute<CountryDetailRoute>();

  const { data: country, isLoading } = useGetCountryDetailQuery(
    params.countryCode,
  );
  const { data: heroImages } = useCountryImageQuery(country?.name);

  const countryName = resolveCountryName(
    country?.name,
    i18n.language,
    params.countryCode,
  );

  const subtitle = [country?.subregion, country?.capital?.[0]]
    .filter(Boolean)
    .join(" | ");

  const countryCurrency = country?.currencies?.[0]?.code;

  const attractionsSheetRef = useRef<BottomSheet>(null);
  const [isAttractionsOpen, setIsAttractionsOpen] = useState(false);

  const openAttractions = useCallback(() => {
    attractionsSheetRef.current?.present();
  }, []);

  const handleAttractionsChange = useCallback((index: number) => {
    setIsAttractionsOpen(index !== -1);
  }, []);

  const rows = useMemo<ListGroupItem[]>(() => {
    const sections = [...COUNTRY_SECTIONS]
      .sort((a, b) => t(a.titleKey).localeCompare(t(b.titleKey), i18n.language))
      .map(({ id, titleKey, subtitleKey, Icon, expandable }) => ({
        key: id,
        title: t(titleKey),
        description: t(subtitleKey),
        Icon,
        onPress: id === "destinations" ? openAttractions : undefined,
        content: expandable ? (
          // The country's own currency against the one the device reports.
          <ExchangeConverter
            fromCode={countryCurrency}
            toCode={getLocales()[0]?.currencyCode ?? undefined}
          />
        ) : undefined,
      }));

    return [
      {
        key: "createTemplate",
        title: t("country.createTemplate"),
        Icon: CalendarMonthIcon,
      },
      ...sections,
    ];
  }, [t, i18n.language, countryCurrency, openAttractions]);

  return {
    countryName,
    countryCode: params.countryCode,
    subtitle,
    heroImages: heroImages ?? [],
    rows,
    isLoading,
    attractionsSheetRef,
    isAttractionsOpen,
    handleAttractionsChange,
  };
}
