import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/shared/services";

export const destinationsKeys = {
  all: ["destinations"] as const,
  list: () => [...destinationsKeys.all, "list"] as const,
};

export function useGetDestinationsQuery() {
  return useQuery({
    queryKey: destinationsKeys.list(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*, destination_items(*)")
        .order("id", { ascending: true });

      if (error) {
        throw error;
      }

      return data ?? [];
    },
  });
}
