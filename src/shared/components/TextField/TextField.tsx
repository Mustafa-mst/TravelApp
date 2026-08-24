import {
  memo,
  useCallback,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { useTranslation } from "react-i18next";
import type { SvgProps } from "react-native-svg";
import {
  Pressable,
  TextInput,
  View,
  type BlurEvent,
  type FocusEvent,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { EyeIcon, EyeOffIcon } from "@shared/assets/icons";
import { useStyles, useThemeColors } from "@shared/hooks";
import { CloseButton } from "../CloseButton";
import { IconButton } from "../IconButton";
import { Text } from "../Text";
import { FieldIcon } from "./FieldIcon";
import { textFieldStyles, textFieldVariants } from "./TextField.styles";
import { TextFieldError } from "./TextFieldError";
import { TextFieldLabel } from "./TextFieldLabel";
import {
  BORDER_TINT_MS,
  CLEAR_BUTTON_SIZE,
  CLEAR_ICON_SIZE,
  ICON_HIT_SLOP,
} from "./textField.constants";
import type { TextFieldVariant } from "./textField.types";

export type TextFieldProps = {
  label?: string;
  description?: string;
  errorMessage?: string;
  variant?: TextFieldVariant;
  isRequired?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  animated?: boolean;
  /** Shows a clear button while the field holds a value. */
  clearable?: boolean;
  /** Rendered at the field icon size and tone; use startContent for anything else. */
  startIcon?: ComponentType<SvgProps>;
  endIcon?: ComponentType<SvgProps>;
  startContent?: ReactNode;
  endContent?: ReactNode;
  /** Makes the start content pressable; without it the content is decorative. */
  onStartContentPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  fieldStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
} & TextInputProps;

function TextFieldComponent({
  label,
  description,
  errorMessage,
  variant = "primaryBorder",
  isRequired = false,
  isInvalid = false,
  isDisabled = false,
  animated = true,
  clearable = false,
  startIcon,
  endIcon,
  startContent,
  endContent,
  onStartContentPress,
  containerStyle,
  fieldStyle,
  labelStyle,
  value,
  onChangeText,
  onFocus,
  onBlur,
  secureTextEntry,
  multiline,
  style,
  ...rest
}: TextFieldProps) {
  const styles = useStyles(textFieldStyles);
  const colors = useThemeColors();
  const { t } = useTranslation();
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isSecureVisible, setIsSecureVisible] = useState(false);

  const palette = textFieldVariants[variant];
  const hasError = isInvalid || !!errorMessage;

  const handleFocus = useCallback(
    (event: FocusEvent) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (event: BlurEvent) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur],
  );

  const handleClear = useCallback(() => {
    onChangeText?.("");
  }, [onChangeText]);

  const toggleSecureVisible = useCallback(() => {
    setIsSecureVisible((current) => !current);
  }, []);

  /** Padding and affix gaps are dead zones otherwise, so the whole row focuses. */
  const handleFieldPress = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const borderStyle = useAnimatedStyle(() => {
    const border = hasError
      ? colors.danger
      : isFocused
        ? colors[palette.borderFocused]
        : colors[palette.border];

    if (!animated) {
      return { borderColor: border };
    }

    return { borderColor: withTiming(border, { duration: BORDER_TINT_MS }) };
  }, [colors, hasError, isFocused, animated, palette.borderFocused]);

  const showClear = clearable && !!value && !isDisabled;
  /** The error message replaces the description; a bare isInvalid recolors it. */
  const showDescription = !!description && !errorMessage;
  const start = startIcon ? <FieldIcon icon={startIcon} /> : startContent;
  const end = endIcon ? <FieldIcon icon={endIcon} /> : endContent;

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
        <Pressable
          accessible={false}
          disabled={isDisabled}
          onPress={handleFieldPress}
          style={[styles.field, multiline && styles.fieldMultiline]}
        >
          {start ? (
            onStartContentPress ? (
              <IconButton
                icon={start}
                onPress={onStartContentPress}
                disabled={isDisabled}
              />
            ) : (
              <View style={styles.affix}>{start}</View>
            )
          ) : null}

          <TextInput
            ref={inputRef}
            editable={!isDisabled}
            placeholderTextColor={colors.fieldPlaceholder}
            secureTextEntry={secureTextEntry && !isSecureVisible}
            multiline={multiline}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={[styles.input, multiline && styles.inputMultiline, style]}
            {...rest}
          />

          {showClear ? (
            <CloseButton
              accessibilityLabel={t("common.clear")}
              size={CLEAR_BUTTON_SIZE}
              iconSize={CLEAR_ICON_SIZE}
              hitSlop={ICON_HIT_SLOP}
              onPress={handleClear}
            />
          ) : null}

          {secureTextEntry ? (
            <IconButton
              accessibilityLabel={t(
                isSecureVisible ? "common.hidePassword" : "common.showPassword",
              )}
              hitSlop={ICON_HIT_SLOP}
              disabled={isDisabled}
              onPress={toggleSecureVisible}
              icon={<FieldIcon icon={isSecureVisible ? EyeOffIcon : EyeIcon} />}
            />
          ) : null}

          {end ? <View style={styles.affix}>{end}</View> : null}
        </Pressable>
      </Animated.View>

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

export const TextField = memo(TextFieldComponent);
