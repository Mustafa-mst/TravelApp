import { useQuery } from "@tanstack/react-query";

import { PlaceTypes } from "../../constants";
import { getNearbyPlaces } from "../../services";

const FIVE_MINUTES_IN_MS = 1000 * 60 * 5;

export const nearbyPlacesKeys = {
  all: ["nearbyPlaces"] as const,
  byArgs: (latitude?: number, longitude?: number, type?: PlaceTypes) =>
    [...nearbyPlacesKeys.all, latitude, longitude, type] as const,
};

type UseNearbyPlacesParams = {
  latitude?: number | null;
  longitude?: number | null;
  type: PlaceTypes;
};

export function useNearbyPlaces({
  latitude,
  longitude,
  type,
}: UseNearbyPlacesParams) {
  return useQuery({
    queryKey: nearbyPlacesKeys.byArgs(
      latitude ?? undefined,
      longitude ?? undefined,
      type,
    ),
    enabled: latitude != null && longitude != null,
    staleTime: FIVE_MINUTES_IN_MS,
    queryFn: () =>
      getNearbyPlaces({
        latitude: latitude!,
        longitude: longitude!,
        type,
      }),
  });
}
