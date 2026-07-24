import polyline from "@mapbox/polyline";

import type { MapCoordinates } from "@shared/components";

export function decodePolyline(encoded: string): MapCoordinates[] {
  return polyline
    .decode(encoded)
    .map(([latitude, longitude]) => ({ latitude, longitude }));
}
