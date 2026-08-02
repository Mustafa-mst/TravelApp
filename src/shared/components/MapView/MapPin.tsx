import { memo } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "@shared/styles";
import { styles } from "./MapPin.styles";
import type { MapMarkerBadge } from "./map.types";

export type MapPinProps = {
  badge?: MapMarkerBadge;
  selected?: boolean;
};

function MapPinComponent({ badge, selected }: MapPinProps) {
  return (
    <View
      style={[
        styles.pin,
        selected && styles.pinSelected,
        { backgroundColor: badge?.color ?? colors.primary },
      ]}
    >
      <MaterialIcons
        name={badge?.icon ?? "place"}
        size={selected ? 18 : 14}
        color={colors.white}
      />
    </View>
  );
}

export const MapPin = memo(MapPinComponent);
