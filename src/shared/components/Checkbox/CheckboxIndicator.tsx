import { memo } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { CheckIcon } from "@shared/assets/icons";
import { useStyles, useThemeColors } from "@shared/hooks";
import type { ColorToken } from "@shared/styles";
import { checkboxStyles } from "./Checkbox.styles";
import { CHECKBOX_ICON_SIZE, INDICATOR_MS } from "./checkbox.constants";

type CheckboxIndicatorProps = {
  isSelected: boolean;
  tint: ColorToken;
};

function CheckboxIndicatorComponent({
  isSelected,
  tint,
}: CheckboxIndicatorProps) {
  const styles = useStyles(checkboxStyles);
  const colors = useThemeColors();

  const indicatorStyle = useAnimatedStyle(() => {
    const duration = { duration: INDICATOR_MS };

    return {
      opacity: withTiming(isSelected ? 1 : 0, duration),
      transform: [
        { translateX: withTiming(isSelected ? 0 : -4, duration) },
        { scale: withTiming(isSelected ? 1 : 0.8, duration) },
      ],
    };
  }, [isSelected]);

  return (
    <Animated.View style={[styles.indicator, indicatorStyle]}>
      <CheckIcon
        width={CHECKBOX_ICON_SIZE}
        height={CHECKBOX_ICON_SIZE}
        color={colors[tint]}
      />
    </Animated.View>
  );
}

export const CheckboxIndicator = memo(CheckboxIndicatorComponent);
