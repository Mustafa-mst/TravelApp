import { memo } from "react";
import {
  Platform,
  StyleSheet,
  View,
  type ViewStyle,
  type StyleProp,
} from "react-native";
import { AppleMaps, GoogleMaps } from "expo-maps";

export type MapCoordinates = {
  latitude: number;
  longitude: number;
};

export type MapMarker = {
  id?: string;
  coordinates: MapCoordinates;
  title?: string;
};

export type MapPolyline = {
  id?: string;
  coordinates: MapCoordinates[];
  color?: string;
  width?: number;
};

export type MapViewProps = {
  center: MapCoordinates;
  zoom?: number;
  markers?: MapMarker[];
  polylines?: MapPolyline[];
  style?: StyleProp<ViewStyle>;
};

function MapViewComponent({
  center,
  zoom = 12,
  markers,
  polylines,
  style,
}: MapViewProps) {
  const cameraPosition = { coordinates: center, zoom };

  if (Platform.OS === "ios") {
    return (
      <AppleMaps.View
        style={[styles.map, style]}
        cameraPosition={cameraPosition}
        markers={markers}
        polylines={polylines}
      />
    );
  }

  if (Platform.OS === "android") {
    return (
      <GoogleMaps.View
        style={[styles.map, style]}
        cameraPosition={cameraPosition}
        uiSettings={{ zoomControlsEnabled: false }}
        markers={markers}
        polylines={polylines}
      />
    );
  }

  return <View style={[styles.map, style]} />;
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
  },
});

export const MapView = memo(MapViewComponent);
