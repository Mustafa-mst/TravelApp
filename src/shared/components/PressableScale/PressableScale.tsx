import { memo, useCallback } from "react";
import {
  Pressable,
  StyleSheet,
  type GestureResponderEvent,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type WithTimingConfig,
} from "react-native-reanimated";

const PRESS_TIMING: WithTimingConfig = { duration: 150 };

type PressableScaleProps = {
  /** Scale applied while pressed. Set to 1 to disable the scale effect. */
  scaleTo?: number;
  /** Opacity applied while pressed. Set to 1 to disable the fade. */
  activeOpacity?: number;
  /** Style for the outer wrapper (layout: width, flex, margin). */
  containerStyle?: StyleProp<ViewStyle>;
  /** Merged on top of `style` while pressed, for a background/tint highlight. */
  pressedStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
} & Omit<PressableProps, "style">;

function PressableScaleComponent({
  scaleTo = 0.99,
  activeOpacity = 0.9,
  containerStyle,
  pressedStyle,
  style,
  onPressIn,
  onPressOut,
  disabled,
  children,
  ...rest
}: PressableScaleProps) {
  const progress = useSharedValue(0);

  const pressedBackground =
    StyleSheet.flatten(pressedStyle)?.backgroundColor ?? null;

  const highlightRadius = StyleSheet.flatten(style)?.borderRadius;

  const animatedStyle = useAnimatedStyle(() => {
    const pressed = progress.value === 1;

    return {
      opacity: withTiming(pressed ? activeOpacity : 1, PRESS_TIMING),
      transform: [
        { scale: withTiming(pressed ? scaleTo : 1, PRESS_TIMING) },
      ],
    };
  });

  const animatedHighlightStyle = useAnimatedStyle(() => ({
    opacity: withTiming(progress.value, PRESS_TIMING),
  }));

  const handlePressIn = useCallback(
    (event: GestureResponderEvent) => {
      if (!disabled) {
        progress.value = 1;
      }
      onPressIn?.(event);
    },
    [disabled, onPressIn, progress],
  );

  const handlePressOut = useCallback(
    (event: GestureResponderEvent) => {
      progress.value = 0;
      onPressOut?.(event);
    },
    [onPressOut, progress],
  );

  return (
    <Animated.View style={[containerStyle, animatedStyle]}>
      <Pressable
        disabled={disabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={style}
        {...rest}
      >
        {(state) => (
          <>
            {pressedBackground === null ? null : (
              <Animated.View
                pointerEvents="none"
                style={[
                  StyleSheet.absoluteFill,
                  {
                    backgroundColor: pressedBackground,
                    borderRadius: highlightRadius,
                  },
                  animatedHighlightStyle,
                ]}
              />
            )}
            {typeof children === "function" ? children(state) : children}
          </>
        )}
      </Pressable>
    </Animated.View>
  );
}

export const PressableScale = memo(PressableScaleComponent);
export type { PressableScaleProps };
