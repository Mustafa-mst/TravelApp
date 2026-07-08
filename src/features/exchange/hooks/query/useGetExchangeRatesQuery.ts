import { supabase } from "@/shared/services";
import { useQuery } from "@tanstack/react-query";
import type { ExchangeRate } from "../../types";

export const exchangeRatesKeys = {
  all: ["exchangeRates"] as const,
  list: () => [...exchangeRatesKeys.all, "list"] as const,
};

export function useGetExchangeRatesQuery() {
  return useQuery({
    queryKey: exchangeRatesKeys.list(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("exchange_rates")
        .select("currency_code,rate,updated_at,flag");

      if (error) {
        throw error;
      }

      return (data ?? []) as ExchangeRate[];
    },
  });
}
