import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { openMap } from "@shared/utils/openMap";
import type { PlaceType } from "@/features/places";
import { useTopAttractions } from "@/features/places";

type UseAttractionsSheetParams = {
  countryName?: string;
  countryCode?: string;
  /** Google is only queried once the sheet has been opened. */
  isOpen: boolean;
};

export function useAttractionsSheet({
  countryName,
  countryCode,
  isOpen,
}: UseAttractionsSheetParams) {
  const { t, i18n } = useTranslation();

  const { data, isLoading, isError, refetch } = useTopAttractions({
    country: countryName,
    countryCode,
    languageCode: i18n.language,
    enabled: isOpen,
  });

  const places = data ?? [];

  const openInMaps = useCallback((place: PlaceType) => {
    if (place.latitude == null || place.longitude == null) {
      return;
    }

    openMap({
      latitude: place.latitude,
      longitude: place.longitude,
      label: place.name,
    });
  }, []);

  return {
    openInMaps,
    title: t("country.attractions.title", { country: countryName ?? "" }),
    places,
    isLoading,
    isError,
    emptyLabel: t("country.attractions.empty"),
    errorLabel: t("country.attractions.error"),
    retryLabel: t("common.retry"),
    refetch,
  };
}
