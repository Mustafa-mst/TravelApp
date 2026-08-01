import { memo } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

import { MinusIcon, PlusIcon } from "@shared/assets/icons";
import { Divider } from "../Divider";
import { PressableScale } from "../PressableScale";
import { styles } from "./MapZoomControl.styles";
import { colors } from "@/shared/styles";

type MapZoomControlProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  zoomInDisabled?: boolean;
  zoomOutDisabled?: boolean;
  iconSize?: number;
  style?: StyleProp<ViewStyle>;
};


function MapZoomControlComponent({
  onZoomIn,
  onZoomOut,
  zoomInDisabled,
  zoomOutDisabled,
  iconSize = 16,
  style,
}: MapZoomControlProps) {
  return (
    <View style={[styles.container, style]}>
      <PressableScale
        style={styles.button}
        hitSlop={8}
        onPress={onZoomIn}
        disabled={zoomInDisabled}
      >
        <PlusIcon width={iconSize} height={iconSize} color={colors.text} />
      </PressableScale>
      <Divider margin={4} style={styles.divider} />
      <PressableScale
        style={styles.button}
        hitSlop={8}
        onPress={onZoomOut}
        disabled={zoomOutDisabled}
      >
        <MinusIcon width={iconSize} height={iconSize} color={colors.text} />
      </PressableScale>
    </View>
  );
}

export const MapZoomControl = memo(MapZoomControlComponent);
export type { MapZoomControlProps };
