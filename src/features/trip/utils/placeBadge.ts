import type { MapMarkerBadge } from "@shared/components";
import { PLACE_TYPE_META, PlaceTypes } from "@/features/places/constants";
import type { TripDetailItem } from "../types";

const FALLBACK = PLACE_TYPE_META[PlaceTypes.TouristAttraction];

export function placeBadge(item: TripDetailItem): MapMarkerBadge {
  const category = PLACE_TYPE_META[item.place_type];

  return {
    icon: category?.materialIcon ?? FALLBACK.materialIcon,
    color: category?.color ?? FALLBACK.color,
  };
}
