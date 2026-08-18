import { radius, spacing, themed, typography, type ColorToken } from "@shared/styles";

export const buttonStyles = themed(({ colors }) => ({
  base: {
    borderRadius: radius.full,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapContent: {
    alignSelf: "flex-start",
  },
  fullWidth: {
    alignSelf: "stretch",
  },
  outlined: {
    borderWidth: 1,
    backgroundColor: colors.transparent,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    ...typography.body,
    fontWeight: "500",
  },
}));

type ButtonType = "primary" | "secondary" | "warning" | "danger";

type ButtonPalette = {
  background: ColorToken;
  foreground: ColorToken;
};

export const buttonColors: Record<ButtonType, ButtonPalette> = {
  primary: { background: "accent", foreground: "accentForeground" },
  secondary: { background: "surface", foreground: "foreground" },
  warning: { background: "warning", foreground: "warningForeground" },
  danger: { background: "danger", foreground: "dangerForeground" },
};
