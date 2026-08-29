import { memo, type Ref } from "react";
import {
  Pressable,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { ChevronDownIcon } from "@shared/assets/icons";
import { useStyles, useThemeColors } from "@shared/hooks";
import { Text } from "../Text";
import { TextFieldError } from "../TextField/TextFieldError";
import { TextFieldLabel } from "../TextField/TextFieldLabel";
import { BORDER_TINT_MS } from "../TextField/textField.constants";
import { selectStyles, selectVariants } from "./Select.styles";
import {
  SELECT_INDICATOR_ROTATION,
  SELECT_INDICATOR_SIZE,
  SELECT_INDICATOR_SPRING,
} from "./select.constants";
import type { SelectVariant } from "./select.types";

const AnimatedChevron = Animated.createAnimatedComponent(View);

export type SelectTriggerProps = {
  /** Rendered in place of the placeholder once something is selected. */
  value?: string | null;
  placeholder: string;
  label?: string;
  description?: string;
  errorMessage?: string;
  variant?: SelectVariant;
  isOpen?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  animated?: boolean;
  /** Hides the chevron for triggers that open something other than a list. */
  showIndicator?: boolean;
  onPress: () => void;
  triggerRef?: Ref<View>;
  containerStyle?: StyleProp<ViewStyle>;
  fieldStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

function SelectTriggerComponent({
  value,
  placeholder,
  label,
  description,
  errorMessage,
  variant = "primary",
  isOpen = false,
  isRequired = false,
  isInvalid = false,
  isDisabled = false,
  animated = true,
  showIndicator = true,
  onPress,
  triggerRef,
  containerStyle,
  fieldStyle,
  labelStyle,
}: SelectTriggerProps) {
  const styles = useStyles(selectStyles);
  const colors = useThemeColors();

  const palette = selectVariants[variant];
  const hasError = isInvalid || !!errorMessage;
  const hasValue = !!value;
  /** The error message replaces the description; a bare isInvalid recolors it. */
  const showDescription = !!description && !errorMessage;

  const borderStyle = useAnimatedStyle(() => {
    const border = hasError
      ? colors.danger
      : isOpen
        ? colors[palette.borderFocused]
        : colors[palette.border];

    if (!animated) {
      return { borderColor: border };
    }

    return { borderColor: withTiming(border, { duration: BORDER_TINT_MS }) };
  }, [colors, hasError, isOpen, animated, palette.borderFocused]);

  const [closedAngle, openAngle] = SELECT_INDICATOR_ROTATION;
  const angle = useDerivedValue(() => {
    const target = isOpen ? openAngle : closedAngle;
    return animated ? withSpring(target, SELECT_INDICATOR_SPRING) : target;
  }, [isOpen, animated, openAngle, closedAngle]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${angle.value}deg` }],
  }));

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <TextFieldLabel
          label={label}
          isRequired={isRequired}
          isInvalid={hasError}
          isDisabled={isDisabled}
          style={labelStyle}
        />
      ) : null}

      {/* Plain wrapper carries the ref: Animated.View does not forward one a
          `measureInWindow` can be called on. */}
      <View ref={triggerRef} collapsable={false}>
        <Animated.View
          style={[
            styles.fieldOuter,
            palette.bordered ? styles.fieldBordered : styles.fieldElevated,
            { backgroundColor: colors[palette.background] },
            isDisabled && styles.disabled,
            borderStyle,
            fieldStyle,
          ]}
        >
          {/* Plain Pressable, like TextField: the field is a surface, not a
              button, so it should not shrink under the finger. */}
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded: isOpen, disabled: isDisabled }}
            disabled={isDisabled}
            onPress={onPress}
            style={styles.field}
          >
            <Text
              variant="bodyLarge"
              color={hasValue ? "fieldForeground" : "fieldPlaceholder"}
              numberOfLines={1}
              style={styles.value}
            >
              {hasValue ? value : placeholder}
            </Text>

            {showIndicator ? (
              <AnimatedChevron style={[styles.indicator, indicatorStyle]}>
                <ChevronDownIcon
                  width={SELECT_INDICATOR_SIZE}
                  height={SELECT_INDICATOR_SIZE}
                  color={colors.muted}
                />
              </AnimatedChevron>
            ) : null}
          </Pressable>
        </Animated.View>
      </View>

      {showDescription ? (
        <Text
          variant="body"
          color={hasError ? "danger" : "muted"}
          style={isDisabled ? styles.disabled : undefined}
        >
          {description}
        </Text>
      ) : null}

      {errorMessage ? (
        <TextFieldError message={errorMessage} animated={animated} />
      ) : null}
    </View>
  );
}

export const SelectTrigger = memo(SelectTriggerComponent);
