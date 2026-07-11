import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/shared/services";
import type { CategoryWithItems } from "../../types";

export const categoriesKeys = {
  all: ["categories"] as const,
  list: () => [...categoriesKeys.all, "list"] as const,
};

export function useGetCategoriesQuery() {
  return useQuery({
    queryKey: categoriesKeys.list(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*, category_items(*)")
        .order("id", { ascending: true });

      if (error) {
        throw error;
      }

      return (data ?? []) as CategoryWithItems[];
    },
  });
}
