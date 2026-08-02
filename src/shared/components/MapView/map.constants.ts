import type { MapCoordinates } from "./map.types";

/**
 * OpenFreeMap's ready-made basemap: OpenStreetMap data, free, no API key and no
 * usage cap. Referenced as a URL rather than assembled here so it brings its own
 * sprite sheet — street and neighbourhood names, buildings, parks and POI icons
 * all come from the style itself.
 *
 * Other looks are served from the same host (`positron`, `bright`, `dark`) and
 * are a one-line swap. A self-hosted archive works too, including
 * `pmtiles://https://…`, which MapLibre Native reads natively.
 */
export const MAP_STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";

/** Deepest zoom the tiles are built to; nothing is fetched beyond this. */
export const MAP_TILE_MAX_ZOOM = 14;

/**
 * How far the camera may zoom. Slightly past {@link MAP_TILE_MAX_ZOOM}, which
 * vector tiles handle by re-rendering z14 geometry rather than upscaling
 * pixels, so streets stay crisp while gaining no new detail.
 */
export const MAP_MAX_ZOOM = 16;

export const MAP_MIN_ZOOM = 0;

/** Used when there is a single stop, which gives the camera no box to fit. */
export const MAP_DEFAULT_ZOOM = 14;

/** Where the camera lands when a trip has no located stop and no city. */
export const MAP_DEFAULT_CENTER: MapCoordinates = {
  latitude: 41.0082,
  longitude: 28.9784,
};

export const MAP_ANIMATION_DURATION = 300;

export const MAP_POLYLINE_SOURCE_ID = "map-polylines";

export const MAP_ATTRIBUTION_POSITION = { bottom: 8, right: 8 } as const;

/** Lifts an open card clear of the pin it belongs to. */
export const MAP_CARD_OFFSET: [x: number, y: number] = [0, -90];

/**
 * Room left around framed markers, so pins are never flush with an edge. Kept
 * modest on purpose: these maps can be as short as ~195pt, and insets that
 * approach the viewport leave the camera nothing to fit into — it then falls
 * back to a world view. An open card may still overhang the top edge; that is
 * accepted, since the card only appears on tap and dismisses just as easily.
 */
export const MAP_FIT_PADDING = {
  top: 48,
  right: 32,
  bottom: 32,
  left: 32,
} as const;

export const EMPTY_FEATURE_COLLECTION: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [],
};
