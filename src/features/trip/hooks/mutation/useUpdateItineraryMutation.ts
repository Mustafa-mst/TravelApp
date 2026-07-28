import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@shared/services";
import type { TripTemplate, NewTripTemplateInput } from "../../types";
import { itineraryKeys } from "../query/useGetItinerariesQuery";

export type UpdateItineraryInput = NewTripTemplateInput & {
  id: string;
};

export function useUpdateItineraryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateItineraryInput) => {
      const { data, error } = await supabase
        .from("trip_templates")
        .update(input)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data as TripTemplate;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itineraryKeys.all });
    },
  });
}
