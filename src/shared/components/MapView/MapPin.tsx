import { memo } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useStyles, useThemeColors } from "@shared/hooks";
import { mapPinStyles } from "./MapPin.styles";
import type { MapMarkerBadge } from "./map.types";

export type MapPinProps = {
  badge?: MapMarkerBadge;
  selected?: boolean;
};

function MapPinComponent({ badge, selected }: MapPinProps) {
  const styles = useStyles(mapPinStyles);
  const colors = useThemeColors();

  return (
    <View
      style={[
        styles.pin,
        selected && styles.pinSelected,
        { backgroundColor: badge?.color ?? colors.accent },
      ]}
    >
      <MaterialIcons
        name={badge?.icon ?? "place"}
        size={selected ? 18 : 14}
        color={colors.staticWhite}
      />
    </View>
  );
}

export const MapPin = memo(MapPinComponent);
