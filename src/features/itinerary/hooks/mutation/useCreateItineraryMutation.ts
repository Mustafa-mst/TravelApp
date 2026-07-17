import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@shared/services";
import type { Itinerary, NewItineraryInput } from "../../types";
import { itineraryKeys } from "../query/useGetItinerariesQuery";

export function useCreateItineraryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: NewItineraryInput) => {
      const { data, error } = await supabase
        .from("itineraries")
        .insert(input)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data as Itinerary;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itineraryKeys.all });
    },
  });
}
