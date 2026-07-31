import { useMemo } from "react";

import {
  DEFAULT_MAP_CENTER,
  buildMarkers,
  toCoordinates,
} from "@shared/utils/map";
import type { SelectedCity, TripDetailDay } from "../types";

/**
 * Map center and markers for the whole detail view. The center prefers the
 * city, so an itinerary with no located places still lands in the right place.
 */
export function useTripMapData(
  days: TripDetailDay[] | undefined,
  city: SelectedCity | null | undefined,
) {
  return useMemo(() => {
    const markers = buildMarkers(
      (days ?? []).flatMap((day: TripDetailDay) => day.items),
    );

    return {
      mapCenter:
        toCoordinates(city) ?? markers[0]?.coordinates ?? DEFAULT_MAP_CENTER,
      mapMarkers: markers,
    };
  }, [days, city]);
}
