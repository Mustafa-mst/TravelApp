import { radius, spacing, themed, typography, type ColorToken } from "@shared/styles";

import {
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
  fieldOuter: {
    borderWidth: FIELD_BORDER_WIDTH,
    borderRadius: radius.field,
  },
  fieldElevated: {
    ...shadows.level1,
  },
  fieldBordered: {
    ...shadows.field,
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
  /** Idle border. `fieldBorder` is transparent — only the ring shows on focus. */
  border: ColorToken;
  borderFocused: ColorToken;
  /** Tighter shadcn-style shadow under a visible border, level1 otherwise. */
  bordered: boolean;
};

export const textFieldVariants: Record<TextFieldVariant, TextFieldPalette> = {
  primary: {
    background: "fieldBackground",
    border: "fieldBorder",
    borderFocused: "focus",
    bordered: false,
  },
  primaryBorder: {
    background: "fieldBackground",
    border: "border",
    borderFocused: "focus",
    bordered: true,
  },
  secondary: {
    background: "default",
    border: "fieldBorder",
    borderFocused: "focus",
    bordered: false,
  },
};
