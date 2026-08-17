import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "@shared/styles";

import { CHECKBOX_SIZE, CLEAR_FILL } from "./checkbox.constants";
import type { CheckboxVariant } from "./checkbox.types";

export const styles = StyleSheet.create({
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
});

type CheckboxPalette = {
  /** null keeps the box unfilled when checked, so the border carries the state. */
  fill: keyof typeof colors | null;
  border: keyof typeof colors;
  icon: keyof typeof colors;
};

export const checkboxVariants: Record<CheckboxVariant, CheckboxPalette> = {
  primary: { fill: "primary", border: "primary", icon: "white" },
  secondary: { fill: null, border: "primary", icon: "primary" },
};
