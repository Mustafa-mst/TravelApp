import { useQuery } from "@tanstack/react-query";
import { getFullItinerary } from "../../services";
import { itineraryKeys } from "./useGetItinerariesQuery";

/**
 * Loads an itinerary together with its days (initialized on first open) and
 * items grouped per day. This is what the detail screen renders.
 */
export function useFullItinerary(itineraryId: string) {
  return useQuery({
    queryKey: itineraryKeys.full(itineraryId),
    enabled: Boolean(itineraryId),
    queryFn: () => getFullItinerary(itineraryId),
  });
}
