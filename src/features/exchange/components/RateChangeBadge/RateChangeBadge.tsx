import { memo } from "react";
import { View } from "react-native";

import { Text } from "@shared/components";
import { colors } from "@shared/styles";
import {
  ArrowDownIcon,
  ArrowUpIcon,
} from "@/shared/assets/icons";
import { styles } from "./RateChangeBadge.styles";

type RateChangeBadgeProps = {
  percent: number;
};

function RateChangeBadgeComponent({ percent }: RateChangeBadgeProps) {
  const isUp = percent >= 0;
  const colorToken = isUp ? "success" : "danger";
  const Arrow = isUp ? ArrowUpIcon : ArrowDownIcon;
  const label = `${Math.abs(percent).toFixed(2)}%`;

  return (
    <View style={styles.badge}>
      <Arrow width={12} height={12} color={colors[colorToken]} />
      <Text variant="bodyMedium" color={colorToken}>
        {label}
      </Text>
    </View>
  );
}

export const RateChangeBadge = memo(RateChangeBadgeComponent);
