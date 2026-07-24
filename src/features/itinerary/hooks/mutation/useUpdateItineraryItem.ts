import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateItineraryItem } from "../../services";
import type { UpdateItineraryItemInput } from "../../types";
import { itineraryKeys } from "../query/useGetItinerariesQuery";

export type UpdateItineraryItemVariables = {
  id: string;
  itineraryId: string;
  patch: UpdateItineraryItemInput;
};

export function useUpdateItineraryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, patch }: UpdateItineraryItemVariables) =>
      updateItineraryItem(id, patch),
    onSuccess: (item, { itineraryId }) => {
      queryClient.invalidateQueries({ queryKey: itineraryKeys.full(itineraryId) });
      queryClient.invalidateQueries({ queryKey: itineraryKeys.items(item.day_id) });
    },
  });
}
