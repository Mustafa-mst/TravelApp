import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@shared/services";
import { itineraryKeys } from "../query/useGetItinerariesQuery";

export function useDeleteItineraryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("itineraries")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itineraryKeys.all });
    },
  });
}
