import { useQuery } from "@tanstack/react-query";
import { getItineraryDays } from "../../services";
import { itineraryKeys } from "./useGetItinerariesQuery";

export function useItineraryDays(itineraryId: string) {
  return useQuery({
    queryKey: itineraryKeys.days(itineraryId),
    enabled: Boolean(itineraryId),
    queryFn: () => getItineraryDays(itineraryId),
  });
}
