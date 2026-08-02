import type {
  MapCoordinates,
  MapMarker,
  MapMarkerBadge,
} from "@shared/components";
import { Coordinates, Locatable } from "../types/map";

export function toCoordinates(
  source: Coordinates | null | undefined,
): MapCoordinates | null {
  return source?.latitude != null && source?.longitude != null
    ? { latitude: source.latitude, longitude: source.longitude }
    : null;
}

type BuildMarkersOptions<T> = {
  badge?: (place: T) => MapMarkerBadge | undefined;
  onPress?: (place: T) => void;
};

export function buildMarkers<T extends Locatable>(
  places: readonly T[],
  { badge, onPress }: BuildMarkersOptions<T> = {},
): MapMarker[] {
  const markers: MapMarker[] = [];

  for (const place of places) {
    const coordinates = toCoordinates(place);
    if (coordinates) {
      markers.push({
        id: place.id,
        coordinates,
        title: place.name,
        imageUrl: place.image_url,
        badge: badge?.(place),
        onPress: onPress && (() => onPress(place)),
      });
    }
  }

  return markers;
}
