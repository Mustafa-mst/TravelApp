import { useQuery } from "@tanstack/react-query";
import { supabase } from "@shared/services";

export const collectionKeys = {
  all: ["collections"] as const,
  list: () => [...collectionKeys.all, "list"] as const,
};

export function useGetCollectionsQuery() {
  return useQuery({
    queryKey: collectionKeys.list(),
    queryFn: async () => {
      const { data, error } = await supabase.from("collections").select("*");

      if (error) {
        throw error;
      }

      return data ?? [];
    },
  });
}
