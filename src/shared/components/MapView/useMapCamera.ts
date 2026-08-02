import { useCallback, useMemo, useRef } from "react";
import type { CameraRef, MapRef } from "@maplibre/maplibre-react-native";

import {
  MAP_ANIMATION_DURATION,
  MAP_MAX_ZOOM,
  MAP_MIN_ZOOM,
} from "./map.constants";
import type { MapMarker } from "./map.types";
import { boundsOf } from "./map.utils";

export function useMapCamera(markers: MapMarker[] | undefined) {
  const mapRef = useRef<MapRef>(null);
  const cameraRef = useRef<CameraRef>(null);

  const zoomBy = useCallback(async (delta: number) => {
    const current = await mapRef.current?.getZoom();
    if (current == null) {
      return;
    }

    const next = Math.min(
      Math.max(current + delta, MAP_MIN_ZOOM),
      MAP_MAX_ZOOM,
    );
    cameraRef.current?.zoomTo(next, { duration: MAP_ANIMATION_DURATION });
  }, []);

  const zoomIn = useCallback(() => void zoomBy(1), [zoomBy]);
  const zoomOut = useCallback(() => void zoomBy(-1), [zoomBy]);

  const fitBounds = useMemo(
    () => boundsOf(markers?.map((marker) => marker.coordinates) ?? []),
    [markers],
  );

  return { mapRef, cameraRef, fitBounds, zoomIn, zoomOut };
}
