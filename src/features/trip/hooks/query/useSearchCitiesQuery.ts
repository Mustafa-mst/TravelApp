import { useQuery } from "@tanstack/react-query";
import { supabase } from "@shared/services";
import type { City } from "../../types";
import {
  useDebouncedValue,
  SEARCH_DEBOUNCE_MS,
  MIN_QUERY_LENGTH,
} from "../useDebouncedValue";

const FIVE_MINUTES_IN_MS = 1000 * 60 * 5;

export const citySearchKeys = {
  all: ["citySearch"] as const,
  byQuery: (query: string) => [...citySearchKeys.all, query] as const,
};

export function useSearchCitiesQuery(query: string) {
  const debouncedQuery = useDebouncedValue(query.trim(), SEARCH_DEBOUNCE_MS);

  return useQuery({
    queryKey: citySearchKeys.byQuery(debouncedQuery),
    enabled: debouncedQuery.length >= MIN_QUERY_LENGTH,
    staleTime: FIVE_MINUTES_IN_MS,
    retry: 1,
    // Keep the previous list on screen while the next query loads (no flicker).
    placeholderData: (previous) => previous,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("search_cities", {
        q: debouncedQuery,
      });

      if (error) {
        throw error;
      }

      return (data ?? []) as City[];
    },
  });
}
