import { memo, useEffect } from "react";
import { View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useStyles, useThemeColors } from "@shared/hooks";
import type { ColorToken, ThemeColors } from "@shared/styles";
import { SpinnerIcon } from "./SpinnerIcon";
import { spinnerStyles } from "./Spinner.styles";
import {
  SPINNER_ROTATION_DURATION_MS,
  SPINNER_SIZE,
} from "./spinner.constants";
import type { SpinnerProps } from "./spinner.types";

const FULL_TURN_DEGREES = 360;

function isColorToken(
  color: string,
  colors: ThemeColors,
): color is ColorToken {
  return color in colors;
}

function SpinnerComponent({
  size = "md",
  color = "accent",
  isLoading = true,
  style,
  ...rest
}: SpinnerProps) {
  const styles = useStyles(spinnerStyles);
  const colors = useThemeColors();
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(FULL_TURN_DEGREES, {
        duration: SPINNER_ROTATION_DURATION_MS,
        easing: Easing.linear,
      }),
      -1,
      false,
    );

    return () => cancelAnimation(rotation);
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  if (!isLoading) {
    return null;
  }

  const px = SPINNER_SIZE[size];
  // A token name resolves against the theme; anything else is a raw color.
  const resolvedColor = isColorToken(color, colors) ? colors[color] : color;

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityState={{ busy: isLoading }}
      style={[styles.root, { width: px, height: px }, style]}
      {...rest}
    >
      <Animated.View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[styles.indicator, animatedStyle]}
      >
        <SpinnerIcon width={px} height={px} color={resolvedColor} />
      </Animated.View>
    </View>
  );
}

export const Spinner = memo(SpinnerComponent);
