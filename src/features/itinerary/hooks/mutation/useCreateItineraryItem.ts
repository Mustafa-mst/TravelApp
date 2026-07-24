import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItineraryItem } from "../../services";
import type { NewItineraryItemInput } from "../../types";
import { itineraryKeys } from "../query/useGetItinerariesQuery";

/**
 * Creates an item. `itineraryId` is only used to invalidate the full-itinerary
 * query so the detail screen refreshes; it is not part of the DB payload.
 */
export type CreateItineraryItemVariables = {
  itineraryId: string;
  input: NewItineraryItemInput;
};

export function useCreateItineraryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ input }: CreateItineraryItemVariables) =>
      createItineraryItem(input),
    onSuccess: (_data, { itineraryId, input }) => {
      queryClient.invalidateQueries({ queryKey: itineraryKeys.full(itineraryId) });
      queryClient.invalidateQueries({ queryKey: itineraryKeys.items(input.day_id) });
    },
  });
}
