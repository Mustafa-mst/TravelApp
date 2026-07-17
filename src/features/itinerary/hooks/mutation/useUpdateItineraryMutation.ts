import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@shared/services";
import type { Itinerary, NewItineraryInput } from "../../types";
import { itineraryKeys } from "../query/useGetItinerariesQuery";

export type UpdateItineraryInput = NewItineraryInput & {
  id: string;
};

export function useUpdateItineraryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateItineraryInput) => {
      const { data, error } = await supabase
        .from("itineraries")
        .update(input)
        .eq("id", id)
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
