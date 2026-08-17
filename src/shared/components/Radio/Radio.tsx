import { memo, useCallback, type ReactNode } from "react";
import {
  Pressable,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { colors } from "@shared/styles";
import { Text } from "../Text";
import { radioVariants, styles } from "./Radio.styles";
import { RadioThumb } from "./RadioThumb";
import { CLEAR_FILL, RADIO_HIT_SLOP, RING_TINT_MS } from "./radio.constants";
import type { RadioIndicatorPosition, RadioVariant } from "./radio.types";

type RadioProps = {
  isSelected: boolean;
  onSelectedChange: (isSelected: boolean) => void;
  label?: string;
  description?: string;
  variant?: RadioVariant;
  isDisabled?: boolean;
  isInvalid?: boolean;
  animated?: boolean;
  indicatorPosition?: RadioIndicatorPosition;
  deselectable?: boolean;
  hitSlop?: number;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

function RadioComponent({
  isSelected,
  onSelectedChange,
  label,
  description,
  variant = "primary",
  isDisabled = false,
  isInvalid = false,
  animated = true,
  indicatorPosition = "start",
  deselectable = false,
  hitSlop = RADIO_HIT_SLOP,
  children,
  style,
  labelStyle,
}: RadioProps) {
  const palette = radioVariants[variant];

  const handlePress = useCallback(() => {
    onSelectedChange(deselectable ? !isSelected : true);
  }, [deselectable, isSelected, onSelectedChange]);

  const ringStyle = useAnimatedStyle(() => {
    const fill =
      isSelected && palette.fill
        ? colors[isInvalid ? "danger" : palette.fill]
        : CLEAR_FILL;
    const border = isInvalid
      ? colors.danger
      : isSelected
        ? colors[palette.border]
        : colors.border;

    if (!animated) {
      return { backgroundColor: fill, borderColor: border };
    }

    const timing = { duration: RING_TINT_MS };

    return {
      backgroundColor: withTiming(fill, timing),
      borderColor: withTiming(border, timing),
    };
  }, [isSelected, isInvalid, animated, palette.fill, palette.border]);

  const trailingIndicator = indicatorPosition === "end";

  const ring = (
    <Animated.View
      style={[styles.ring, trailingIndicator && styles.ringEnd, ringStyle]}
    >
      <RadioThumb
        isSelected={isSelected}
        tint={isInvalid ? "danger" : palette.thumb}
        animated={animated}
      />
    </Animated.View>
  );

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: isSelected, disabled: isDisabled }}
      disabled={isDisabled}
      hitSlop={hitSlop}
      onPress={handlePress}
    >
      <View
        style={[
          styles.row,
          description ? styles.rowTop : null,
          isDisabled && styles.disabled,
          style,
        ]}
      >
        {trailingIndicator ? null : ring}

        {children ??
          (label ? (
            <View style={styles.texts}>
              <Text variant="bodyMedium" style={[styles.label, labelStyle]}>
                {label}
              </Text>
              {description ? (
                <Text variant="caption" color="textSecondary">
                  {description}
                </Text>
              ) : null}
            </View>
          ) : null)}

        {trailingIndicator ? ring : null}
      </View>
    </Pressable>
  );
}

export const Radio = memo(RadioComponent);
