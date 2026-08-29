import { radius, spacing, themed, type ColorToken } from "@shared/styles";

import { CHECKBOX_SIZE, CLEAR_FILL } from "./checkbox.constants";
import type { CheckboxVariant } from "./checkbox.types";

export const checkboxStyles = themed(({ colors }) => ({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm + 2,
  },
  box: {
    width: CHECKBOX_SIZE,
    height: CHECKBOX_SIZE,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: CLEAR_FILL,
  },
  square: {
    borderRadius: radius.sm + 2,
  },
  circle: {
    borderRadius: radius.full,
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    flexShrink: 1,
  },
  indicator: {
    alignItems: "center",
    justifyContent: "center",
  },
}));

type CheckboxPalette = {
  /** null keeps the box unfilled when checked, so the border carries the state. */
  fill: ColorToken | null;
  border: ColorToken;
  icon: ColorToken;
};

export const checkboxVariants: Record<CheckboxVariant, CheckboxPalette> = {
  primary: { fill: "accent", border: "accent", icon: "accentForeground" },
  secondary: { fill: null, border: "accent", icon: "accent" },
};
