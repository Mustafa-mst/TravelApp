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
import type { TripDetailMode } from "../types";
import { useTripDetail } from "./useTripDetail";

const DEFAULT_MAP_CENTER: MapCoordinates = {
  latitude: 41.0082,
  longitude: 28.9784,
};

/**
 * Owns the DayDetail screen data: loads the parent detail view, picks out the
 * day, derives map markers / center from its items, and fetches + decodes the
 * driving route between them. The screen only renders what this returns.
 *
 * Reads through `useTripDetail` so a day renders the same way whether its
 * parent is a template or a trip, and so both screens share one cache entry.
 */
export function useDayDetail(id: string, mode: TripDetailMode, dayId: string) {
  const { detail, days, isLoading, isError } = useTripDetail(id, mode);
  const day = days?.find((d) => d.id === dayId) ?? null;

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
    const city = detail?.city;
    const cityCenter: MapCoordinates | null =
      city?.latitude != null && city?.longitude != null
        ? { latitude: city.latitude, longitude: city.longitude }
        : null;
    const center = markers[0]?.coordinates ?? cityCenter ?? DEFAULT_MAP_CENTER;
    return { mapCenter: center, mapMarkers: markers, coordinates: coords };
  }, [day, detail?.city]);

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
    detail: detail ?? null,
    route,
    isLoading,
    isError,
    mapCenter,
    mapMarkers,
    mapPolylines,
  };
}
