import type { MaterialIcons } from "@expo/vector-icons";

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

/**
 * Category colours predate the HeroUI palette and are intentionally pinned to
 * the original green/teal set — they identify a place type on the map rather
 * than carrying theme meaning, so they stay fixed in both themes.
 */
const PLACE_COLORS = {
  museum: "#16A085",
  restaurant: "#FF3830",
  cafe: "#F59E0B",
  park: "#008635",
  attraction: "#0E7C66",
} as const;

export enum PlaceTypes {
  Museum = "museum",
  Restaurant = "restaurant",
  Cafe = "cafe",
  Park = "park",
  TouristAttraction = "tourist_attraction",
}

/** Categories shown in the nearby-places picker (SegmentedControl order). */
export const PLACE_CATEGORIES = [
  { title: "Places", value: PlaceTypes.TouristAttraction },
  { title: "Restaurants", value: PlaceTypes.Restaurant },
  { title: "Cafes", value: PlaceTypes.Cafe },
  { title: "Museums", value: PlaceTypes.Museum },
  { title: "Parks", value: PlaceTypes.Park },
] as const;

export const PLACE_TYPE_META: Record<
  PlaceTypes,
  { label: string; icon: string; materialIcon: MaterialIconName; color: string }
> = {
  museum: {
    label: "Museum",
    icon: "🏛️",
    materialIcon: "museum",
    color: PLACE_COLORS.museum,
  },
  restaurant: {
    label: "Restaurant",
    icon: "🍽️",
    materialIcon: "restaurant",
    color: PLACE_COLORS.restaurant,
  },
  cafe: {
    label: "Cafe",
    icon: "☕",
    materialIcon: "local-cafe",
    color: PLACE_COLORS.cafe,
  },
  park: {
    label: "Park",
    icon: "🌳",
    materialIcon: "park",
    color: PLACE_COLORS.park,
  },
  tourist_attraction: {
    label: "Attraction",
    icon: "📍",
    materialIcon: "place",
    color: PLACE_COLORS.attraction,
  },
};
