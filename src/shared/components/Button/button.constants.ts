import type { TypographyVariant } from "@shared/styles";
import type { SpinnerSize } from "../Spinner";
import type { ButtonSize } from "./button.types";

export const BUTTON_PRESS_SCALE = 0.98;

export const BUTTON_ICON_SIZE: Record<ButtonSize, number> = {
  sm: 16,
  md: 18,
  lg: 20,
};

/** Spinner sizes are 16/24/32, so sm and md buttons share the small one. */
export const BUTTON_SPINNER_SIZE: Record<ButtonSize, SpinnerSize> = {
  sm: "sm",
  md: "sm",
  lg: "md",
};

/** Matches HeroUI's --text-sm/base/lg pairs (14/20, 16/24, 18/28). */
export const BUTTON_LABEL_VARIANT: Record<ButtonSize, TypographyVariant> = {
  sm: "bodyMedium",
  md: "bodyLargeMedium",
  lg: "bodyExtraLargeMedium",
};
