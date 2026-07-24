import { useEffect, useMemo } from "react";

import type {
  MapCoordinates,
  MapMarker,
  MapPolyline,
} from "@shared/components";
import { colors } from "@shared/styles";
import { useDirections } from "@/features/routes/hooks/mutation/useDirections";
import { decodePolyline } from "@/features/routes/utils";
import type { DirectionsCoordinates } from "@/features/routes/types/routes.types";
import { useFullItinerary } from "./index";

const DEFAULT_MAP_CENTER: MapCoordinates = {
  latitude: 41.0082,
  longitude: 28.9784,
};

/**
 * Owns the DayDetail screen data: loads the itinerary, derives map markers /
 * center from the day's items, and fetches + decodes the driving route between
 * them. The screen only renders what this returns.
 */
export function useDayDetail(itineraryId: string, dayId: string) {
  const { data, isLoading, isError } = useFullItinerary(itineraryId);
  const day = data?.days.find((d) => d.id === dayId) ?? null;

  const { mapCenter, mapMarkers, coordinates } = useMemo(() => {
    const markers: MapMarker[] = [];
    const coords: DirectionsCoordinates = [];
    for (const item of day?.items ?? []) {
      if (item.latitude != null && item.longitude != null) {
        markers.push({
          id: item.id,
          coordinates: { latitude: item.latitude, longitude: item.longitude },
          title: item.name,
        });
        coords.push([item.longitude, item.latitude]);
      }
    }
    const city = data?.itinerary.cities;
    const cityCenter: MapCoordinates | null =
      city?.latitude != null && city?.longitude != null
        ? { latitude: city.latitude, longitude: city.longitude }
        : null;
    const center = markers[0]?.coordinates ?? cityCenter ?? DEFAULT_MAP_CENTER;
    return { mapCenter: center, mapMarkers: markers, coordinates: coords };
  }, [day, data?.itinerary.cities]);

  const { mutate: fetchDirections, data: route, reset } = useDirections();

  const coordsKey = JSON.stringify(coordinates);
  useEffect(() => {
    if (coordinates.length < 2) {
      reset();
      return;
    }
    fetchDirections(coordinates);
  }, [coordsKey, fetchDirections, reset]);

  const mapPolylines: MapPolyline[] = useMemo(() => {
    if (!route?.polyline) {
      return [];
    }
    return [
      {
        id: "route",
        coordinates: decodePolyline(route.polyline),
        color: colors.primary,
        width: 4,
      },
    ];
  }, [route?.polyline]);

  return {
    day,
    itinerary: data?.itinerary ?? null,
    route,
    isLoading,
    isError,
    mapCenter,
    mapMarkers,
    mapPolylines,
  };
}
