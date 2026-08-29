import { radius, themed, type ColorToken } from "@shared/styles";

import { DISABLED_OPACITY, PRESSED_OPACITY } from "./closeButton.constants";
import type { CloseButtonVariant } from "./closeButton.types";

export const closeButtonStyles = themed(({ colors }) => ({
  base: {
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  solid: {
    backgroundColor: colors.surfaceSecondary,
  },
  pressed: {
    opacity: PRESSED_OPACITY,
  },
  disabled: {
    opacity: DISABLED_OPACITY,
  },
}));

type CloseButtonPalette = {
  isFilled: boolean;
  icon: ColorToken;
};

export const closeButtonVariants: Record<
  CloseButtonVariant,
  CloseButtonPalette
> = {
  solid: { isFilled: true, icon: "muted" },
  plain: { isFilled: false, icon: "muted" },
};
