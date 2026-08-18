import { memo } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { useStyles, useThemeColors } from "@shared/hooks";
import type { ColorToken } from "@shared/styles";
import { radioStyles } from "./Radio.styles";
import {
  THUMB_MS,
  THUMB_SCALE_SELECTED,
  THUMB_SCALE_UNSELECTED,
} from "./radio.constants";

type RadioThumbProps = {
  isSelected: boolean;
  tint: ColorToken;
  animated: boolean;
};

function RadioThumbComponent({ isSelected, tint, animated }: RadioThumbProps) {
  const styles = useStyles(radioStyles);
  const colors = useThemeColors();

  const thumbStyle = useAnimatedStyle(() => {
    const scale = isSelected ? THUMB_SCALE_SELECTED : THUMB_SCALE_UNSELECTED;
    const opacity = isSelected ? 1 : 0;

    if (!animated) {
      return { opacity, transform: [{ scale }] };
    }

    const timing = { duration: THUMB_MS };

    return {
      opacity: withTiming(opacity, timing),
      transform: [{ scale: withTiming(scale, timing) }],
    };
  }, [isSelected, animated]);

  return (
    <Animated.View
      style={[styles.thumb, { backgroundColor: colors[tint] }, thumbStyle]}
    />
  );
}

export const RadioThumb = memo(RadioThumbComponent);
