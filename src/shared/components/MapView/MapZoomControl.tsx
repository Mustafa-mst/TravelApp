import { memo } from "react";
import { View } from "react-native";

import { MinusIcon, PlusIcon } from "@shared/assets/icons";
import { useStyles, useThemeColors } from "@shared/hooks";
import { Divider } from "../Divider";
import { PressableScale } from "../PressableScale";
import { mapZoomControlStyles } from "./MapZoomControl.styles";

type MapZoomControlProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
};

const ICON_SIZE = 16;

function MapZoomControlComponent({ onZoomIn, onZoomOut }: MapZoomControlProps) {
  const styles = useStyles(mapZoomControlStyles);
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <PressableScale style={styles.button} hitSlop={8} onPress={onZoomIn}>
        <PlusIcon width={ICON_SIZE} height={ICON_SIZE} color={colors.foreground} />
      </PressableScale>
      <Divider margin={4} style={styles.divider} />
      <PressableScale style={styles.button} hitSlop={8} onPress={onZoomOut}>
        <MinusIcon width={ICON_SIZE} height={ICON_SIZE} color={colors.foreground} />
      </PressableScale>
    </View>
  );
}

export const MapZoomControl = memo(MapZoomControlComponent);
