import { useQuery } from "@tanstack/react-query";
import { supabase } from "@shared/services";
import { useAuthStore } from "@/features/auth";
import type { Itinerary } from "../../types";

export const itineraryKeys = {
  all: ["itineraries"] as const,
  list: (userId: string) => [...itineraryKeys.all, "list", userId] as const,
  detail: (id: string) => [...itineraryKeys.all, "detail", id] as const,
  days: (itineraryId: string) =>
    [...itineraryKeys.all, "days", itineraryId] as const,
  items: (dayId: string) => [...itineraryKeys.all, "items", dayId] as const,
  full: (itineraryId: string) =>
    [...itineraryKeys.all, "full", itineraryId] as const,
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
        .select("*, cities(name, country_code, latitude, longitude)")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return (data ?? []) as Itinerary[];
    },
  });
}
