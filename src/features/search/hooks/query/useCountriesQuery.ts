import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { supabase } from "@shared/services";
import {
  useDebouncedValue,
  SEARCH_DEBOUNCE_MS,
  MIN_QUERY_LENGTH,
} from "@shared/hooks";
import type { CountryImageType, CountryNameType } from "@shared/types";
import type { CountrySearchResult, SearchFilters } from "../../types";

const FIVE_MINUTES_IN_MS = 1000 * 60 * 5;
const PAGE_SIZE = 50;

export const searchKeys = {
  all: ["search"] as const,
  countries: (query: string, locale: string, filters: SearchFilters) =>
    [
      ...searchKeys.all,
      "countries",
      locale,
      query,
      filters.continent ?? "",
      filters.population ?? "",
      filters.language ?? "",
    ] as const,
};

export function hasActiveFilters(filters: SearchFilters) {
  return Boolean(filters.continent || filters.population || filters.language);
}

export function useCountriesQuery(query: string, filters: SearchFilters) {
  const { i18n } = useTranslation();
  const locale = i18n.language;
  const debouncedQuery = useDebouncedValue(query.trim(), SEARCH_DEBOUNCE_MS);

  const isSearching = debouncedQuery.length >= MIN_QUERY_LENGTH;
  const isFiltering = hasActiveFilters(filters);

  return useQuery({
    queryKey: searchKeys.countries(
      isSearching ? debouncedQuery : "",
      locale,
      filters,
    ),
    enabled: isSearching || isFiltering,
    staleTime: FIVE_MINUTES_IN_MS,
    retry: 1,
    placeholderData: (previous) => previous,
    queryFn: async () => {
      // Unset arguments go as `undefined`, which drops them from the request
      // body so each one falls back to its Postgres default. The generated
      // types reject `null` here, and it would mean the same thing anyway.
      const { data, error } = await supabase.rpc("get_countries", {
        search_query: isSearching ? debouncedQuery : undefined,
        locale,
        continent_filter: filters.continent ? [filters.continent] : undefined,
        language_filter: filters.language ? [filters.language] : undefined,
        population_filter: filters.population ?? undefined,
        page_number: 1,
        page_size: PAGE_SIZE,
      });

      if (error) {
        throw error;
      }

      // `name` and `flags` are generic `Json` in the generated schema, so each
      // row is mapped into its concrete shape instead of being cast wholesale.
      return (data ?? []).map<CountrySearchResult>((row) => ({
        id: row.id,
        cca2: row.cca2,
        region: row.region,
        subregion: row.subregion,
        name: (row.name ?? {}) as CountryNameType,
        flags: (row.flags ?? null) as CountryImageType | null,
      }));
    },
  });
}
