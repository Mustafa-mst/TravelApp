import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItineraryItem } from "../../services";
import { itineraryKeys } from "../query/useGetItinerariesQuery";

export type DeleteItineraryItemVariables = {
  id: string;
  itineraryId: string;
  dayId: string;
};

export function useDeleteItineraryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: DeleteItineraryItemVariables) =>
      deleteItineraryItem(id),
    onSuccess: (_data, { itineraryId, dayId }) => {
      queryClient.invalidateQueries({ queryKey: itineraryKeys.full(itineraryId) });
      queryClient.invalidateQueries({ queryKey: itineraryKeys.items(dayId) });
    },
  });
}
