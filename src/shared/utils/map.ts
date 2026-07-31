import type { MapCoordinates, MapMarker } from "@shared/components";
import { Coordinates, Locatable } from "../types/map";

export const DEFAULT_MAP_CENTER: MapCoordinates = {
  latitude: 41.0082,
  longitude: 28.9784,
};

export function toCoordinates(
  source: Coordinates | null | undefined,
): MapCoordinates | null {
  return source?.latitude != null && source?.longitude != null
    ? { latitude: source.latitude, longitude: source.longitude }
    : null;
}

export function buildMarkers(places: readonly Locatable[]): MapMarker[] {
  const markers: MapMarker[] = [];

  for (const place of places) {
    const coordinates = toCoordinates(place);
    if (coordinates) {
      markers.push({ id: place.id, coordinates, title: place.name });
    }
  }

  return markers;
}
