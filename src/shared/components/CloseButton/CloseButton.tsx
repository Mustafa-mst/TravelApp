import { memo, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { CloseIcon } from "@shared/assets/icons";
import { colors } from "@shared/styles";
import { closeButtonVariants, styles } from "./CloseButton.styles";
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
  iconColor?: keyof typeof colors;
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
        palette.container,
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
