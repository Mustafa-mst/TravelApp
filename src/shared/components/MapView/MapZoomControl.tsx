import { memo } from "react";
import { View } from "react-native";

import { MinusIcon, PlusIcon } from "@shared/assets/icons";
import { colors } from "@shared/styles";
import { Divider } from "../Divider";
import { PressableScale } from "../PressableScale";
import { styles } from "./MapZoomControl.styles";

type MapZoomControlProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
};

const ICON_SIZE = 16;

function MapZoomControlComponent({ onZoomIn, onZoomOut }: MapZoomControlProps) {
  return (
    <View style={styles.container}>
      <PressableScale style={styles.button} hitSlop={8} onPress={onZoomIn}>
        <PlusIcon width={ICON_SIZE} height={ICON_SIZE} color={colors.text} />
      </PressableScale>
      <Divider margin={4} style={styles.divider} />
      <PressableScale style={styles.button} hitSlop={8} onPress={onZoomOut}>
        <MinusIcon width={ICON_SIZE} height={ICON_SIZE} color={colors.text} />
      </PressableScale>
    </View>
  );
}

export const MapZoomControl = memo(MapZoomControlComponent);
