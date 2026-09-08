import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { BottomSheet } from "@shared/components";
import { MIN_QUERY_LENGTH } from "@shared/hooks";
import type { RootStackParamList } from "@shared/navigation";
import { resolveCountryName } from "@shared/utils/country";
import { hasActiveFilters, useCountriesQuery } from "./query";
import { useSearchHistory } from "./useSearchHistory";
import type { SearchFilters, CountrySearchResult } from "../types";

const NO_FILTERS: SearchFilters = {};

export function useCountrySearch() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { i18n } = useTranslation();
  const filterSheetRef = useRef<BottomSheet>(null);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>(NO_FILTERS);

  const isSearching = query.trim().length >= MIN_QUERY_LENGTH;
  const isFiltering = hasActiveFilters(filters);

  const countries = useCountriesQuery(query, filters);
  const { history, addEntry, removeEntry } = useSearchHistory();

  const isListing = isSearching || isFiltering;

  /**
   * Search results arrive ranked by relevance, so only filter-only listings —
   * which come back in no meaningful order — get sorted alphabetically.
   */
  const results = useMemo(() => {
    if (!countries.data || isSearching) {
      return countries.data;
    }

    return [...countries.data].sort((a, b) =>
      resolveCountryName(a.name, i18n.language, a.cca2).localeCompare(
        resolveCountryName(b.name, i18n.language, b.cca2),
        i18n.language,
      ),
    );
  }, [countries.data, i18n.language, isSearching]);

  const handleApplyFilters = useCallback((next: SearchFilters) => {
    setFilters(next);
    filterSheetRef.current?.dismiss();
  }, []);

  const handleOpenFilters = useCallback(() => {
    filterSheetRef.current?.present();
  }, []);

  const handleChangeText = useCallback((value: string) => {
    setQuery(value);
  }, []);

  /** Selecting a row records it in history, whether it came from results or history itself. */
  const handleSelectCountry = useCallback(
    (entry: CountrySearchResult) => {
      addEntry(entry);
      navigation.navigate("CountryDetail", { countryCode: entry.cca2 });
    },
    [addEntry, navigation],
  );

  return {
    query,
    filters,
    filterSheetRef,
    isSearching,
    isFiltering,
    results: isListing ? results : undefined,
    isFetching: countries.isFetching,
    isError: countries.isError,
    history,
    onRetry: countries.refetch,
    onChangeText: handleChangeText,
    onOpenFilters: handleOpenFilters,
    onApplyFilters: handleApplyFilters,
    onSelectCountry: handleSelectCountry,
    onRemoveHistory: removeEntry,
  };
}
