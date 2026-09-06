import { memo } from "react";
import { useStyles, useThemeColors } from "@shared/hooks";
import { PressableScale } from "../PressableScale";
import { Spinner } from "../Spinner";
import { Text } from "../Text";
import { buttonStyles, buttonVariants } from "./Button.styles";
import {
  BUTTON_ICON_SIZE,
  BUTTON_LABEL_VARIANT,
  BUTTON_PRESS_SCALE,
  BUTTON_SPINNER_SIZE,
} from "./button.constants";
import type { ButtonProps } from "./button.types";

function ButtonComponent({
  label,
  variant = "primary",
  size = "md",
  labelVariant,
  isDisabled = false,
  isLoading = false,
  isIconOnly = false,
  fullWidth = false,
  startIcon: StartIcon,
  endIcon: EndIcon,
  containerStyle,
  style,
  ...rest
}: ButtonProps) {
  const styles = useStyles(buttonStyles);
  const colors = useThemeColors();

  const palette = buttonVariants[variant];
  const tone = colors[palette.foreground];
  const iconSize = BUTTON_ICON_SIZE[size];
  const isInactive = isDisabled || isLoading;

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityState={{ disabled: isInactive, busy: isLoading }}
      disabled={isInactive}
      scaleTo={BUTTON_PRESS_SCALE}
      // The highlight is a color swap, not a fade — see docs/button.md.
      activeOpacity={1}
      containerStyle={[
        fullWidth ? styles.fullWidth : styles.wrapContent,
        containerStyle,
      ]}
      style={[
        styles.base,
        styles[size],
        { backgroundColor: colors[palette.background] },
        palette.border && [
          styles.outlined,
          { borderColor: colors[palette.border] },
        ],
        isIconOnly && styles.iconOnly,
        isDisabled && styles.disabled,
        style,
      ]}
      pressedStyle={{ backgroundColor: colors[palette.hover] }}
      {...rest}
    >
      {/* The spinner takes over the start slot, so the label stays put. */}
      {isLoading ? (
        <Spinner color={tone} size={BUTTON_SPINNER_SIZE[size]} />
      ) : (
        StartIcon && (
          <StartIcon width={iconSize} height={iconSize} color={tone} />
        )
      )}
      {label && !isIconOnly && (
        <Text
          variant={labelVariant ?? BUTTON_LABEL_VARIANT[size]}
          color={palette.foreground}
        >
          {label}
        </Text>
      )}
      {EndIcon && <EndIcon width={iconSize} height={iconSize} color={tone} />}
    </PressableScale>
  );
}

export const Button = memo(ButtonComponent);
