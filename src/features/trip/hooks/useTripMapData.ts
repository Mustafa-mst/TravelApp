import { useMemo } from "react";

import type { MapCoordinates, MapMarker } from "@shared/components";
import type { SelectedCity, TripDetailDay } from "../types";

/** Fallback center (Istanbul) used until a trip has located places. */
const DEFAULT_MAP_CENTER: MapCoordinates = {
  latitude: 41.0082,
  longitude: 28.9784,
};

/**
 * Stable empty reference so the memo below does not see a new array on every
 * render while the query is still loading.
 */
const EMPTY_DAYS: TripDetailDay[] = [];

/**
 * Derives the map center and markers for a detail view. Shared by both modes:
 * the center is the trip's city, falling back to the first located place and
 * then to a default, and markers are dropped on every located item.
 */
export function useTripMapData(
  days: TripDetailDay[] | undefined,
  city: SelectedCity | null | undefined,
) {
  const source = days ?? EMPTY_DAYS;

  return useMemo(() => {
    const markers: MapMarker[] = [];
    for (const day of source) {
      for (const item of day.items) {
        if (item.latitude != null && item.longitude != null) {
          markers.push({
            id: item.id,
            coordinates: { latitude: item.latitude, longitude: item.longitude },
            title: item.name,
          });
        }
      }
    }

    const cityCenter: MapCoordinates | null =
      city?.latitude != null && city?.longitude != null
        ? { latitude: city.latitude, longitude: city.longitude }
        : null;

    return {
      mapCenter: cityCenter ?? markers[0]?.coordinates ?? DEFAULT_MAP_CENTER,
      mapMarkers: markers,
    };
  }, [source, city]);
}
