import { useQuery } from "@tanstack/react-query";

import { getTopAttractions } from "../../services";

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

export const topAttractionsKeys = {
  all: ["topAttractions"] as const,
  byCountry: (countryCode?: string, languageCode?: string) =>
    [...topAttractionsKeys.all, countryCode, languageCode] as const,
};

type UseTopAttractionsParams = {
  country?: string | null;
  countryCode?: string;
  languageCode?: string;
  enabled?: boolean;
};

export function useTopAttractions({
  country,
  countryCode,
  languageCode,
  enabled = true,
}: UseTopAttractionsParams) {
  return useQuery({
    queryKey: topAttractionsKeys.byCountry(countryCode, languageCode),
    enabled: enabled && Boolean(country),
    staleTime: ONE_DAY_IN_MS,
    queryFn: () =>
      getTopAttractions({ country: country!, countryCode, languageCode }),
  });
}
