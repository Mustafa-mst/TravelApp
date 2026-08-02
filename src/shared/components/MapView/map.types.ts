import type { ComponentProps } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { MaterialIcons } from "@expo/vector-icons";

export type MapCoordinates = {
  latitude: number;
  longitude: number;
};

/** Bounding box in the `[west, south, east, north]` order MapLibre expects. */
export type MapBounds = [
  west: number,
  south: number,
  east: number,
  north: number,
];

/** Category icon and colour for a marker's pin. */
export type MapMarkerBadge = {
  icon: ComponentProps<typeof MaterialIcons>["name"];
  color?: string;
};

export type MapMarker = {
  id?: string;
  coordinates: MapCoordinates;
  title?: string;
  imageUrl?: string | null;
  badge?: MapMarkerBadge;
  onPress?: () => void;
};

export type MapPolyline = {
  id?: string;
  coordinates: MapCoordinates[];
  color?: string;
  width?: number;
};

export type MapViewProps = {
  center: MapCoordinates;
  markers?: MapMarker[];
  polylines?: MapPolyline[];
  style?: StyleProp<ViewStyle>;
};
