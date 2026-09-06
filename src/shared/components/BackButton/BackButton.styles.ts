import { StyleSheet } from "react-native";

import { radius, spacing, themed, themedValue } from "@shared/styles";

/** 24px icon + 13 padding each side lands the button on 50px. */
const BUTTON_PADDING = 13;

export const backButtonStyles = themed(({ colors }) => ({
  button: {
    position: "absolute",
    left: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    padding: BUTTON_PADDING,
  },
  bordered: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.foreground,
  },
}));

export const backButtonShadows = themedValue(({ shadows }) => shadows);
