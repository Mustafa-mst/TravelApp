import { useMemo } from "react";

import { MAP_DEFAULT_CENTER } from "@shared/components";
import { buildMarkers, toCoordinates } from "@shared/utils/map";
import type { SelectedCity, TripDetailDay } from "../types";
import { placeBadge } from "../utils/placeBadge";

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
      { badge: placeBadge },
    );

    return {
      mapCenter:
        toCoordinates(city) ?? markers[0]?.coordinates ?? MAP_DEFAULT_CENTER,
      mapMarkers: markers,
    };
  }, [days, city]);
}
