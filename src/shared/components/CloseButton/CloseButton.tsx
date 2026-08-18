import { memo, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { CloseIcon } from "@shared/assets/icons";
import { useStyles, useThemeColors } from "@shared/hooks";
import type { ColorToken } from "@shared/styles";
import { closeButtonStyles, closeButtonVariants } from "./CloseButton.styles";
import {
  CLOSE_BUTTON_SIZE,
  CLOSE_HIT_SLOP,
  CLOSE_ICON_SIZE,
} from "./closeButton.constants";
import type { CloseButtonVariant } from "./closeButton.types";

export type CloseButtonProps = {
  variant?: CloseButtonVariant;
  size?: number;
  iconSize?: number;
  iconColor?: ColorToken;
  isDisabled?: boolean;
  /** Replaces the default close icon. */
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
} & Omit<PressableProps, "children" | "disabled" | "style">;

function CloseButtonComponent({
  variant = "solid",
  size = CLOSE_BUTTON_SIZE,
  iconSize = CLOSE_ICON_SIZE,
  iconColor,
  isDisabled = false,
  children,
  style,
  hitSlop = CLOSE_HIT_SLOP,
  accessibilityLabel,
  ...rest
}: CloseButtonProps) {
  const { t } = useTranslation();
  const styles = useStyles(closeButtonStyles);
  const colors = useThemeColors();
  const palette = closeButtonVariants[variant];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? t("common.close")}
      disabled={isDisabled}
      hitSlop={hitSlop}
      style={({ pressed }) => [
        styles.base,
        { width: size, height: size },
        palette.isFilled && styles.solid,
        pressed && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
      {...rest}
    >
      {children ?? (
        <CloseIcon
          width={iconSize}
          height={iconSize}
          color={colors[iconColor ?? palette.icon]}
        />
      )}
    </Pressable>
  );
}

export const CloseButton = memo(CloseButtonComponent);
