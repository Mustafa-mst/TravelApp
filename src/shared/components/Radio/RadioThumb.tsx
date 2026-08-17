import { memo } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { colors } from "@shared/styles";
import { styles } from "./Radio.styles";
import {
  THUMB_MS,
  THUMB_SCALE_SELECTED,
  THUMB_SCALE_UNSELECTED,
} from "./radio.constants";

type RadioThumbProps = {
  isSelected: boolean;
  tint: keyof typeof colors;
  animated: boolean;
};

function RadioThumbComponent({ isSelected, tint, animated }: RadioThumbProps) {
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
