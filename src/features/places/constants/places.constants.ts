import type { ComponentType } from "react";
import type { MaterialIcons } from "@expo/vector-icons";
import type { SvgProps } from "react-native-svg";

import {
  BinnocularsIcon,
  CafeIcon,
  LeafIcon,
  LocationIcon,
  MuseumIcon,
  ParkIcon,
  RestaurantsIcon,
} from "@shared/assets/icons";

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

type PlaceTypeMeta = {
  label: string;
  icon: string;
  /** Placeholder until museum/cafe artwork lands in `shared/assets/icons`. */
  Icon: ComponentType<SvgProps>;
  materialIcon: MaterialIconName;
  color: string;
};

export const PLACE_TYPE_META: Record<PlaceTypes, PlaceTypeMeta> = {
  museum: {
    label: "Museum",
    icon: "🏛️",
    Icon: MuseumIcon,
    materialIcon: "museum",
    color: PLACE_COLORS.museum,
  },
  restaurant: {
    label: "Restaurant",
    icon: "🍽️",
    Icon: RestaurantsIcon,
    materialIcon: "restaurant",
    color: PLACE_COLORS.restaurant,
  },
  cafe: {
    label: "Cafe",
    icon: "☕",
    Icon: CafeIcon,
    materialIcon: "local-cafe",
    color: PLACE_COLORS.cafe,
  },
  park: {
    label: "Park",
    icon: "🌳",
    Icon: ParkIcon,
    materialIcon: "park",
    color: PLACE_COLORS.park,
  },
  tourist_attraction: {
    label: "Attraction",
    icon: "📍",
    Icon: BinnocularsIcon,
    materialIcon: "place",
    color: PLACE_COLORS.attraction,
  },
};
