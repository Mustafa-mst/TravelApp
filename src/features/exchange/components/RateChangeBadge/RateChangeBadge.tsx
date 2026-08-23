import { memo } from "react";
import { View } from "react-native";

import { Text } from "@shared/components";
import { useThemeColors } from "@shared/hooks";
import { ArrowDownIcon, ArrowUpIcon } from "@/shared/assets/icons";
import { ARROW_ICON_SIZE, styles } from "./RateChangeBadge.styles";

type RateChangeBadgeProps = {
  percent: number;
};

function RateChangeBadgeComponent({ percent }: RateChangeBadgeProps) {
  const colors = useThemeColors();
  const isUp = percent >= 0;
  const colorToken = isUp ? "success" : "danger";
  const Arrow = isUp ? ArrowUpIcon : ArrowDownIcon;
  const label = `${Math.abs(percent).toFixed(2)}%`;

  return (
    <View style={styles.badge}>
      <Arrow
        width={ARROW_ICON_SIZE}
        height={ARROW_ICON_SIZE}
        color={colors[colorToken]}
      />
      <Text variant="bodyMedium" color={colorToken}>
        {label}
      </Text>
    </View>
  );
}

export const RateChangeBadge = memo(RateChangeBadgeComponent);
