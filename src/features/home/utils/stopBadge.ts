import type { MapMarkerBadge } from "@shared/components";
import { PLACE_TYPE_META, PlaceTypes } from "@/features/places/constants";
import type { TemplateCardStop } from "@/features/trip";

const FALLBACK = PLACE_TYPE_META[PlaceTypes.TouristAttraction];

export function stopBadge(stop: TemplateCardStop): MapMarkerBadge {
  const category = PLACE_TYPE_META[stop.place_type];

  return {
    icon: category?.materialIcon ?? FALLBACK.materialIcon,
    color: category?.color ?? FALLBACK.color,
  };
}
