import { useCallback, useState } from "react";

export const MAP_DEFAULT_INITIAL_ZOOM = 12;
export const MAP_DEFAULT_MIN_ZOOM = 3;
export const MAP_DEFAULT_MAX_ZOOM = 20;
export const MAP_DEFAULT_ZOOM_STEP = 1;

type UseMapZoomOptions = {
  initialZoom?: number;
  minZoom?: number;
  maxZoom?: number;
  step?: number;
};

type UseMapZoomResult = {
  /** Current zoom level, to feed into the map's `zoom` prop. */
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  /** True when `zoom` is already at (or above) `maxZoom`. */
  zoomInDisabled: boolean;
  /** True when `zoom` is already at (or below) `minZoom`. */
  zoomOutDisabled: boolean;
  /** Set an explicit zoom level, clamped to [minZoom, maxZoom]. */
  setZoom: (zoom: number) => void;
};

/**
 * Owns the zoom state and clamping for a map. Pairs with `MapZoomControl` for
 * the +/- UI; the returned `zoom` is passed to the map component itself.
 */
export function useMapZoom({
  initialZoom = MAP_DEFAULT_INITIAL_ZOOM,
  minZoom = MAP_DEFAULT_MIN_ZOOM,
  maxZoom = MAP_DEFAULT_MAX_ZOOM,
  step = MAP_DEFAULT_ZOOM_STEP,
}: UseMapZoomOptions = {}): UseMapZoomResult {
  const clamp = useCallback(
    (value: number) => Math.min(Math.max(value, minZoom), maxZoom),
    [minZoom, maxZoom],
  );

  const [zoom, setZoomState] = useState(() => clamp(initialZoom));

  const zoomIn = useCallback(() => {
    setZoomState((prev) => clamp(prev + step));
  }, [clamp, step]);

  const zoomOut = useCallback(() => {
    setZoomState((prev) => clamp(prev - step));
  }, [clamp, step]);

  const setZoom = useCallback(
    (value: number) => {
      setZoomState(clamp(value));
    },
    [clamp],
  );

  return {
    zoom,
    zoomIn,
    zoomOut,
    zoomInDisabled: zoom >= maxZoom,
    zoomOutDisabled: zoom <= minZoom,
    setZoom,
  };
}

export type { UseMapZoomOptions, UseMapZoomResult };
