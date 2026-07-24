import { memo } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

import { MapView, type MapViewProps } from "../MapView";
import { MapZoomControl } from "../MapZoomControl";
import { useMapZoom, type UseMapZoomOptions } from "../MapZoomControl/useMapZoom";
import { styles } from "./ZoomableMap.styles";

type ZoomableMapProps = Omit<MapViewProps, "zoom" | "style"> & {
  style?: StyleProp<ViewStyle>;
  controlStyle?: StyleProp<ViewStyle>;
  zoomOptions?: UseMapZoomOptions;
};

function ZoomableMapComponent({
  style,
  controlStyle,
  zoomOptions,
  ...mapProps
}: ZoomableMapProps) {
  const { zoom, zoomIn, zoomOut, zoomInDisabled, zoomOutDisabled } =
    useMapZoom(zoomOptions);

  return (
    <View style={style}>
      <MapView {...mapProps} zoom={zoom} style={styles.map} />
      <MapZoomControl
        style={[styles.control, controlStyle]}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        zoomInDisabled={zoomInDisabled}
        zoomOutDisabled={zoomOutDisabled}
      />
    </View>
  );
}

export const ZoomableMap = memo(ZoomableMapComponent);
