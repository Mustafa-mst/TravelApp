import { useQuery } from "@tanstack/react-query";
import { getItinerary } from "../../services";
import { itineraryKeys } from "./useGetItinerariesQuery";

export function useItinerary(itineraryId: string) {
  return useQuery({
    queryKey: itineraryKeys.detail(itineraryId),
    enabled: Boolean(itineraryId),
    queryFn: () => getItinerary(itineraryId),
  });
}
