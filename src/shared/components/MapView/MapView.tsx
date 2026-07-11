import { memo } from "react";
import { Platform, StyleSheet, View, type ViewStyle, type StyleProp } from "react-native";
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

export type MapViewProps = {
  /** Where the camera is centered initially. */
  center: MapCoordinates;
  /** Google/Apple zoom level. Higher = closer. */
  zoom?: number;
  markers?: MapMarker[];
  style?: StyleProp<ViewStyle>;
};

/**
 * Thin cross-platform wrapper over expo-maps. Renders Google Maps on Android
 * and Apple Maps on iOS (the platform-native map each SDK ships). The Google
 * Maps API key is supplied via the expo-maps config plugin in app.config.ts.
 */
function MapViewComponent({ center, zoom = 12, markers, style }: MapViewProps) {
  const cameraPosition = { coordinates: center, zoom };

  if (Platform.OS === "ios") {
    return (
      <AppleMaps.View
        style={[styles.map, style]}
        cameraPosition={cameraPosition}
        markers={markers}
      />
    );
  }

  if (Platform.OS === "android") {
    return (
      <GoogleMaps.View
        style={[styles.map, style]}
        cameraPosition={cameraPosition}
        markers={markers}
      />
    );
  }

  // expo-maps has no web implementation; render an empty placeholder there.
  return <View style={[styles.map, style]} />;
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
  },
});

export const MapView = memo(MapViewComponent);
