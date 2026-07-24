import type { MaterialIcons } from "@expo/vector-icons";

import { colors } from "@shared/styles";

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

export enum PlaceTypes {
  Museum = "museum",
  Restaurant = "restaurant",
  Cafe = "cafe",
  Park = "park",
  ShoppingMall = "shopping_mall",
  TouristAttraction = "tourist_attraction",
}

/** Categories shown in the nearby-places picker (SegmentedControl order). */
export const PLACE_CATEGORIES = [
  { title: "Places", value: PlaceTypes.TouristAttraction },
  { title: "Restaurants", value: PlaceTypes.Restaurant },
  { title: "Cafes", value: PlaceTypes.Cafe },
  { title: "Museums", value: PlaceTypes.Museum },
  { title: "Parks", value: PlaceTypes.Park },
  { title: "Shopping", value: PlaceTypes.ShoppingMall },
] as const;

export const PLACE_TYPE_META: Record<
  PlaceTypes,
  { label: string; icon: string; materialIcon: MaterialIconName; color: string }
> = {
  museum: {
    label: "Museum",
    icon: "🏛️",
    materialIcon: "museum",
    color: colors.primaryLight,
  },
  restaurant: {
    label: "Restaurant",
    icon: "🍽️",
    materialIcon: "restaurant",
    color: colors.accent,
  },
  cafe: {
    label: "Cafe",
    icon: "☕",
    materialIcon: "local-cafe",
    color: colors.warning,
  },
  park: {
    label: "Park",
    icon: "🌳",
    materialIcon: "park",
    color: colors.success,
  },
  shopping_mall: {
    label: "Shopping",
    icon: "🛍️",
    materialIcon: "shopping-bag",
    color: colors.danger,
  },
  tourist_attraction: {
    label: "Attraction",
    icon: "📍",
    materialIcon: "place",
    color: colors.primary,
  },
};
