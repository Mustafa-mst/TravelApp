import type { MapMarkerBadge } from "@shared/components";
import { colors } from "@shared/styles";
import { PLACE_TYPE_META } from "@/features/places/constants";
import type { TripDetailItem } from "../types";

export function placeBadge(item: TripDetailItem): MapMarkerBadge {
  const category = PLACE_TYPE_META[item.place_type];

  return {
    icon: category?.materialIcon ?? "place",
    color: category?.color ?? colors.primary,
  };
}
