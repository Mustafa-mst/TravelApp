import { useQuery } from "@tanstack/react-query";
import { supabase } from "@shared/services";
import { useAuthStore } from "@/features/auth";
import type { TripTemplate } from "../../types";
import { templateKeys } from "./useDiscoverTemplatesQuery";

export function useMyTemplateListQuery() {
  const session = useAuthStore((state) => state.session);
  const userId = session?.user.id ?? "";

  return useQuery({
    queryKey: templateKeys.list(userId),
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trip_templates")
        .select("*, cities(name, country_code, latitude, longitude)")
        .eq("author_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return (data ?? []) as TripTemplate[];
    },
  });
}
