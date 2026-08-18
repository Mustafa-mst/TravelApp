import { StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "@shared/styles";

import {
  DISABLED_OPACITY,
  FIELD_GAP,
  FIELD_MIN_HEIGHT,
} from "./textField.constants";
import type { TextFieldVariant } from "./textField.types";

export const styles = StyleSheet.create({
  container: {
    gap: FIELD_GAP,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  /** Carries the border and background; the inner row owns the touch area. */
  fieldOuter: {
    borderWidth: 1,
    borderRadius: radius.lg - 2,
    overflow: "hidden",
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: FIELD_MIN_HEIGHT,
    paddingHorizontal: spacing.sm + 4,
    gap: spacing.sm,
  },
  /** Multiline grows downward, so the affixes pin to the top edge. */
  fieldMultiline: {
    alignItems: "flex-start",
    paddingVertical: spacing.sm + 4,
  },
  /**
   * lineHeight is deliberately omitted: iOS ignores includeFontPadding and
   * sinks glyphs inside a taller line box, pushing single-line text downward.
   */
  input: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    flex: 1,
    color: colors.text,
    paddingVertical: 0,
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  /** Multiline needs the line box back so wrapped rows breathe. */
  inputMultiline: {
    lineHeight: typography.body.lineHeight,
    textAlignVertical: "top",
  },
  affix: {
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: DISABLED_OPACITY,
  },
});

type TextFieldPalette = {
  background: keyof typeof colors;
  border: keyof typeof colors;
  borderFocused: keyof typeof colors;
};

export const textFieldVariants: Record<TextFieldVariant, TextFieldPalette> = {
  primary: {
    background: "white",
    border: "borderMuted",
    borderFocused: "primary",
  },
  secondary: {
    background: "surface",
    border: "borderMuted",
    borderFocused: "primary",
  },
};
