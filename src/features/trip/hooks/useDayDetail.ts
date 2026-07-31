import { useEffect, useMemo } from "react";

import type { MapPolyline } from "@shared/components";
import { colors } from "@shared/styles";
import {
  DEFAULT_MAP_CENTER,
  buildMarkers,
  toCoordinates,
} from "@shared/utils/map";
import { useDirections } from "@/features/routes/hooks/mutation/useDirections";
import { decodePolyline } from "@/features/routes/utils";
import type { DirectionsCoordinates } from "@/features/routes/types/routes.types";
import type { TripDetailMode } from "../constants";
import { useTripDetail } from "./useTripDetail";

/**
 * DayDetail screen data: the day, its map markers and the driving route between
 * its stops. Reads through `useTripDetail` so both screens share one cache entry.
 */
export function useDayDetail(id: string, mode: TripDetailMode, dayId: string) {
  const { detail, days, isLoading, isError, canEdit } = useTripDetail(id, mode);

  const day = useMemo(
    () => days?.find((d) => d.id === dayId) ?? null,
    [days, dayId],
  );

  const { mapCenter, mapMarkers, coordinates } = useMemo(() => {
    const markers = buildMarkers(day?.items ?? []);
    const coords: DirectionsCoordinates = markers.map(({ coordinates }) => [
      coordinates.longitude,
      coordinates.latitude,
    ]);

    return {
      // Unlike the overview, a day centers on its first stop.
      mapCenter:
        markers[0]?.coordinates ??
        toCoordinates(detail?.city) ??
        DEFAULT_MAP_CENTER,
      mapMarkers: markers,
      coordinates: coords,
    };
  }, [day, detail?.city]);

  const { mutate: fetchDirections, data: route, reset } = useDirections();

  // A route needs at least two stops; below that, clear any previous one.
  useEffect(() => {
    if (coordinates.length < 2) {
      reset();
      return;
    }
    fetchDirections(coordinates);
  }, [coordinates, fetchDirections, reset]);

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
    canEdit,
    mapCenter,
    mapMarkers,
    mapPolylines,
  };
}
