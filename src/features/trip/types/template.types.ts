import type { Tables } from "@shared/services";
import type { PlaceTypes } from "@/features/places/constants";

/** One located stop of a card's itinerary, as aggregated by `v_template_cards`. */
export type TemplateCardStop = {
  id: string;
  name: string;
  image_url: string | null;
  latitude: number | null;
  longitude: number | null;
  place_type: PlaceTypes;
};

/** The view types `stops` as `Json`, so it is narrowed by the card mapper. */
export type TemplateCard = Omit<Tables<"v_template_cards">, "stops"> & {
  stops: TemplateCardStop[];
};
