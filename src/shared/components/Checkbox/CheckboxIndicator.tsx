import { memo } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { CheckIcon } from "@shared/assets/icons";
import { colors } from "@shared/styles";
import { styles } from "./Checkbox.styles";
import { CHECKBOX_ICON_SIZE, INDICATOR_MS } from "./checkbox.constants";

type CheckboxIndicatorProps = {
  isSelected: boolean;
  tint: keyof typeof colors;
};

function CheckboxIndicatorComponent({
  isSelected,
  tint,
}: CheckboxIndicatorProps) {
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
