import type { Tables } from "@shared/services";
import {
  toArray,
  toEnum,
  toNumberOrNull,
  toText,
  toTextOrNull,
} from "@shared/utils/json";
import { PlaceTypes } from "@/features/places/constants";
import type { TemplateCard, TemplateCardStop } from "../types";

const PLACE_TYPES = new Set<string>(Object.values(PlaceTypes));

type Raw = Record<string, unknown>;

function mapStop(raw: Raw): TemplateCardStop {
  return {
    id: toText(raw.id),
    name: toText(raw.name),
    image_url: toTextOrNull(raw.image_url),
    latitude: toNumberOrNull(raw.latitude),
    longitude: toNumberOrNull(raw.longitude),
    place_type: toEnum(
      raw.place_type,
      PLACE_TYPES,
      PlaceTypes.TouristAttraction,
    ),
  };
}

export function mapTemplateCard(row: Tables<"v_template_cards">): TemplateCard {
  const { stops, ...card } = row;

  return {
    ...card,
    stops: toArray(stops).map((stop) => mapStop(stop as Raw)),
  };
}
