import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/shared/services";
import type { CountryType } from "@shared/types";

export const countryKeys = {
  all: ["countries"] as const,
  detail: (code: string) => [...countryKeys.all, "detail", code] as const,
};

export function useGetCountryDetailQuery(countryCode: string) {
  return useQuery({
    queryKey: countryKeys.detail(countryCode),
    enabled: Boolean(countryCode),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("countries")
        .select("*")
        .eq("cca2", countryCode)
        .single();

      if (error) {
        throw error;
      }

      return data as CountryType;
    },
  });
}
