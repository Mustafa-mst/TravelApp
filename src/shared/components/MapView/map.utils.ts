import { colors } from "@shared/styles";
import { EMPTY_FEATURE_COLLECTION } from "./map.constants";
import type {
  MapBounds,
  MapCoordinates,
  MapMarker,
  MapPolyline,
} from "./map.types";

const DEFAULT_LINE_WIDTH = 4;

/** MapLibre works in `[longitude, latitude]`; our app models use named fields. */
export function toPosition({
  latitude,
  longitude,
}: MapCoordinates): [longitude: number, latitude: number] {
  return [longitude, latitude];
}

/** Markers may omit an id, so position is the fallback identity. */
export function markerKey(marker: MapMarker, index: number): string {
  return marker.id ?? String(index);
}

/**
 * Bounding box containing every coordinate, or `null` when there is nothing to
 * frame or every stop sits on one spot — a zero-area box has no meaningful
 * zoom, so the caller falls back to a centred camera.
 */
export function boundsOf(
  coordinates: readonly MapCoordinates[],
): MapBounds | null {
  if (!coordinates.length) {
    return null;
  }

  let west = Infinity;
  let south = Infinity;
  let east = -Infinity;
  let north = -Infinity;

  for (const { latitude, longitude } of coordinates) {
    west = Math.min(west, longitude);
    east = Math.max(east, longitude);
    south = Math.min(south, latitude);
    north = Math.max(north, latitude);
  }

  return west === east && south === north ? null : [west, south, east, north];
}

/** Route lines as the GeoJSON the map's line layer renders. */
export function toPolylineCollection(
  polylines: MapPolyline[] | undefined,
): GeoJSON.FeatureCollection {
  if (!polylines?.length) {
    return EMPTY_FEATURE_COLLECTION;
  }

  return {
    type: "FeatureCollection",
    features: polylines
      // A LineString needs two points; a single-stop day has nothing to draw.
      .filter((line) => line.coordinates.length > 1)
      .map((line, index) => ({
        type: "Feature",
        id: line.id ?? String(index),
        properties: {
          color: line.color ?? colors.primary,
          width: line.width ?? DEFAULT_LINE_WIDTH,
        },
        geometry: {
          type: "LineString",
          coordinates: line.coordinates.map(toPosition),
        },
      })),
  };
}
