import { memo, useCallback, type ReactNode } from "react";
import {
  Pressable,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";

import { useStyles, useThemeColors } from "@shared/hooks";
import { Text } from "../Text";
import { CheckboxIndicator } from "./CheckboxIndicator";
import { checkboxStyles, checkboxVariants } from "./Checkbox.styles";
import {
  BOX_TINT_MS,
  CHECKBOX_HIT_SLOP,
  CLEAR_FILL,
} from "./checkbox.constants";
import type { CheckboxShape, CheckboxVariant } from "./checkbox.types";

type CheckboxProps = {
  isSelected: boolean;
  onSelectedChange: (isSelected: boolean) => void;
  label?: string;
  variant?: CheckboxVariant;
  shape?: CheckboxShape;
  isDisabled?: boolean;
  /** Renders the box in the danger color for validation feedback. */
  isInvalid?: boolean;
  hitSlop?: number;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

function CheckboxComponent({
  isSelected,
  onSelectedChange,
  label,
  variant = "primary",
  shape = "square",
  isDisabled = false,
  isInvalid = false,
  hitSlop = CHECKBOX_HIT_SLOP,
  children,
  style,
  labelStyle,
}: CheckboxProps) {
  const styles = useStyles(checkboxStyles);
  const colors = useThemeColors();

  const palette = checkboxVariants[variant];

  const handlePress = useCallback(() => {
    onSelectedChange(!isSelected);
  }, [isSelected, onSelectedChange]);

  const boxStyle = useAnimatedStyle(() => {
    const fill = isSelected && palette.fill ? colors[palette.fill] : CLEAR_FILL;
    const border = isInvalid
      ? colors.danger
      : isSelected
        ? colors[palette.border]
        : colors.border;

    return {
      backgroundColor: withTiming(fill, { duration: BOX_TINT_MS }),
      borderColor: withTiming(border, { duration: BOX_TINT_MS }),
    };
  }, [colors, isSelected, isInvalid, palette.fill, palette.border]);

  return (
    <Pressable disabled={isDisabled} hitSlop={hitSlop} onPress={handlePress}>
      <View style={[styles.row, isDisabled && styles.disabled, style]}>
        <Animated.View
          style={[
            styles.box,
            shape === "circle" ? styles.circle : styles.square,
            boxStyle,
          ]}
        >
          <CheckboxIndicator isSelected={isSelected} tint={palette.icon} />
        </Animated.View>

        {children ??
          (label ? (
            <Text variant="bodyMedium" style={[styles.label, labelStyle]}>
              {label}
            </Text>
          ) : null)}
      </View>
    </Pressable>
  );
}

export const Checkbox = memo(CheckboxComponent);
