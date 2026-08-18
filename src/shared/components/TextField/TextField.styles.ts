import { radius, spacing, themed, typography, type ColorToken } from "@shared/styles";

import {
  CLEAR_BORDER,
  DISABLED_OPACITY,
  FIELD_BORDER_WIDTH,
  FIELD_GAP,
  FIELD_MIN_HEIGHT,
} from "./textField.constants";
import type { TextFieldVariant } from "./textField.types";

export const textFieldStyles = themed(({ colors, shadows }) => ({
  container: {
    gap: FIELD_GAP,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  /** Carries the ring and background; the inner row owns the touch area. */
  fieldOuter: {
    borderWidth: FIELD_BORDER_WIDTH,
    borderColor: CLEAR_BORDER,
    borderRadius: radius.field,
    ...shadows.level1,
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
    color: colors.fieldForeground,
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
}));

type TextFieldPalette = {
  background: ColorToken;
  borderFocused: ColorToken;
};

export const textFieldVariants: Record<TextFieldVariant, TextFieldPalette> = {
  primary: { background: "fieldBackground", borderFocused: "focus" },
  secondary: { background: "default", borderFocused: "focus" },
};
