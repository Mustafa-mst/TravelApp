import { StyleSheet } from "react-native";
import { colors, radius } from "@shared/styles";

import { DISABLED_OPACITY, PRESSED_OPACITY } from "./closeButton.constants";
import type { CloseButtonVariant } from "./closeButton.types";

export const styles = StyleSheet.create({
  base: {
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  solid: {
    backgroundColor: colors.surface,
  },
  pressed: {
    opacity: PRESSED_OPACITY,
  },
  disabled: {
    opacity: DISABLED_OPACITY,
  },
});

type CloseButtonPalette = {
  container: object | null;
  icon: keyof typeof colors;
};

export const closeButtonVariants: Record<
  CloseButtonVariant,
  CloseButtonPalette
> = {
  solid: { container: styles.solid, icon: "iconTertiary" },
  plain: { container: null, icon: "iconTertiary" },
};
