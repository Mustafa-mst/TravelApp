import { supabase } from "@/shared/services";
import { useQuery } from "@tanstack/react-query";

export const countryRevealsKeys = {
  all: ["countryReveals"] as const,
  list: () => [...countryRevealsKeys.all, "list"] as const,
};

export function useGetCountryRevealsQuery() {
  return useQuery({
    queryKey: [countryRevealsKeys],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("country_reveals")
        .select("id,title,image_url,country_code");

      if (error) {
        throw error;
      }

      return data ?? [];
    },
  });
}
