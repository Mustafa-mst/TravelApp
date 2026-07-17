import { useQuery } from "@tanstack/react-query";
import { supabase } from "@shared/services";
import { useAuthStore } from "@/features/auth";
import type { Itinerary } from "../../types";

export const itineraryKeys = {
  all: ["itineraries"] as const,
  list: (userId: string) => [...itineraryKeys.all, "list", userId] as const,
};

export function useGetItinerariesQuery() {
  const session = useAuthStore((state) => state.session);
  const userId = session?.user.id ?? "";

  return useQuery({
    queryKey: itineraryKeys.list(userId),
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("itineraries")
        .select("*, cities(name, country_code)")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return (data ?? []) as Itinerary[];
    },
  });
}
