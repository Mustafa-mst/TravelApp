import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRoute, type RouteProp } from "@react-navigation/native";
import { getLocales } from "expo-localization";

import type { BottomSheet, ListGroupItem } from "@shared/components";
import { ExternalLinkIcon } from "@shared/assets/icons";
import { useThemeColors } from "@shared/hooks";
import type { RootStackParamList } from "@shared/navigation";
import { resolveCountryName } from "@shared/utils/country";
import { openLink } from "@shared/utils/openLink";
import { ExchangeConverter } from "@/features/exchange";
import { COUNTRY_SECTIONS } from "../constants";
import { tasteAtlasCountryUrl } from "../utils";
import { useCountryImageQuery, useGetCountryDetailQuery } from "./query";
import { useCountryEssentials } from "./useCountryEssentials";
import { useCountryLocalTime } from "./useCountryLocalTime";

type CountryDetailRoute = RouteProp<RootStackParamList, "CountryDetail">;

export function useCountryDetail() {
  const { t, i18n } = useTranslation();
  const { params } = useRoute<CountryDetailRoute>();
  const colors = useThemeColors();

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

  const localTime = useCountryLocalTime(country);
  const essentialGroups = useCountryEssentials(country);

  const attractionsSheetRef = useRef<BottomSheet>(null);
  const essentialsSheetRef = useRef<BottomSheet>(null);
  const [isAttractionsOpen, setIsAttractionsOpen] = useState(false);

  const openAttractions = useCallback(() => {
    attractionsSheetRef.current?.present();
  }, []);

  const openEssentials = useCallback(() => {
    essentialsSheetRef.current?.present();
  }, []);

  const handleAttractionsChange = useCallback((index: number) => {
    setIsAttractionsOpen(index !== -1);
  }, []);

  const foodUrl = useMemo(
    () => tasteAtlasCountryUrl(params.countryCode, country?.name?.en?.common),
    [params.countryCode, country?.name?.en?.common],
  );

  const openFood = useCallback(() => {
    if (foodUrl) {
      openLink(foodUrl, { controlsColor: colors.accent });
    }
  }, [foodUrl, colors.accent]);

  const rows = useMemo<ListGroupItem[]>(() => {
    const pressHandlers: Record<string, (() => void) | undefined> = {
      destinations: openAttractions,
      essentials: openEssentials,
      food: openFood,
    };

    return COUNTRY_SECTIONS.map(
      ({ id, titleKey, subtitleKey, Icon, expandable, external }) => ({
        key: id,
        title: t(titleKey),
        description: t(subtitleKey),
        Icon,
        iconColor: colors.accent,
        onPress: pressHandlers[id],
        suffix: external ? (
          <ExternalLinkIcon color={colors.muted} />
        ) : undefined,
        content: expandable ? (
          <ExchangeConverter
            fromCode={countryCurrency}
            toCode={getLocales()[0]?.currencyCode ?? undefined}
          />
        ) : undefined,
      }),
    );
  }, [t, countryCurrency, openAttractions, openEssentials, openFood]);

  return {
    countryName,
    countryCode: params.countryCode,
    subtitle,
    heroImages: heroImages ?? [],
    localTime,
    essentialGroups,
    essentialsSheetRef,
    rows,
    isLoading,
    attractionsSheetRef,
    isAttractionsOpen,
    handleAttractionsChange,
  };
}
