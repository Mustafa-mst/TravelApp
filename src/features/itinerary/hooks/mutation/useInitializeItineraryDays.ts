import { useMutation, useQueryClient } from "@tanstack/react-query";
import { initializeItineraryDays } from "../../services";
import { itineraryKeys } from "../query/useGetItinerariesQuery";

export function useInitializeItineraryDays() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itineraryId: string) => initializeItineraryDays(itineraryId),
    onSuccess: (_data, itineraryId) => {
      queryClient.invalidateQueries({ queryKey: itineraryKeys.days(itineraryId) });
      queryClient.invalidateQueries({ queryKey: itineraryKeys.full(itineraryId) });
    },
  });
}
