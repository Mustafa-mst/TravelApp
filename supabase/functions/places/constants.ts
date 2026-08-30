export const ALLOWED_TYPES = [
  "tourist_attraction",
  "restaurant",
  "cafe",
  "museum",
  "park",
  "shopping_mall",
] as const;

export type PlaceType = (typeof ALLOWED_TYPES)[number];

export const DEFAULT_RADIUS = 10000;
export const MAX_RESULTS = 20;

// Google is asked for more than we keep: the country filter drops foreign
// landmarks, so a larger page still leaves a full top ten.
export const TOP_ATTRACTIONS_PAGE_SIZE = 20;
export const TOP_ATTRACTIONS_LIMIT = 10;