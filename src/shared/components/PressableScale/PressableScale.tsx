import { memo, useCallback } from "react";
import {
  Pressable,
  type GestureResponderEvent,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

// Matches the feel of the previous Animated.spring({ speed: 40, bounciness: 0 }).
const PRESS_SPRING = {
  stiffness: 900,
  damping: 60,
  mass: 1,
} as const;

type PressableScaleProps = {
  /** Scale applied while pressed. Set to 1 to disable the scale effect. */
  scaleTo?: number;
  /** Opacity applied while pressed. Set to 1 to disable the fade. */
  activeOpacity?: number;
  /** Style for the outer wrapper (layout: width, flex, margin). */
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
} & Omit<PressableProps, "style">;

function PressableScaleComponent({
  scaleTo = 0.99,
  activeOpacity = 0.9,
  containerStyle,
  style,
  onPressIn,
  onPressOut,
  disabled,
  children,
  ...rest
}: PressableScaleProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.value, PRESS_SPRING) }],
  }));

  const handlePressIn = useCallback(
    (event: GestureResponderEvent) => {
      if (!disabled) {
        scale.value = scaleTo;
      }
      onPressIn?.(event);
    },
    [disabled, onPressIn, scale, scaleTo],
  );

  const handlePressOut = useCallback(
    (event: GestureResponderEvent) => {
      scale.value = 1;
      onPressOut?.(event);
    },
    [onPressOut, scale],
  );

  return (
    <Animated.View style={[containerStyle, animatedStyle]}>
      <Pressable
        disabled={disabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          style,
          pressed && !disabled && { opacity: activeOpacity },
        ]}
        {...rest}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

export const PressableScale = memo(PressableScaleComponent);
export type { PressableScaleProps };
