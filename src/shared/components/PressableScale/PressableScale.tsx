import { memo, useRef } from "react";
import {
  Animated,
  Pressable,
  type GestureResponderEvent,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

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
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (value: number) => {
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      speed: 40,
      bounciness: 0,
    }).start();
  };

  const handlePressIn = (event: GestureResponderEvent) => {
    if (!disabled) {
      animateTo(scaleTo);
    }
    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    animateTo(1);
    onPressOut?.(event);
  };

  return (
    <Animated.View
      style={[containerStyle, { transform: [{ scale }] }]}
    >
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
