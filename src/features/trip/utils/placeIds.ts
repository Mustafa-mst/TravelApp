import type { TripDetailItem } from "../types";

/** The Google place ids already on a day, used to pre-select them in the sheet. */
export function collectPlaceIds(
  items: TripDetailItem[] | undefined,
): string[] {
  return (items ?? [])
    .map((item) => item.google_place_id)
    .filter((placeId): placeId is string => placeId != null);
}
