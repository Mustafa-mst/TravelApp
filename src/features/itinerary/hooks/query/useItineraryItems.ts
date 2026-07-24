import { useQuery } from "@tanstack/react-query";
import { getItineraryItems } from "../../services";
import { itineraryKeys } from "./useGetItinerariesQuery";

export function useItineraryItems(dayId: string) {
  return useQuery({
    queryKey: itineraryKeys.items(dayId),
    enabled: Boolean(dayId),
    queryFn: () => getItineraryItems(dayId),
  });
}
