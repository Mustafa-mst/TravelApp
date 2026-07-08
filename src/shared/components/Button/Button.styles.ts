import { StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "@shared/styles";

export const styles = StyleSheet.create({
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
});

type ButtonType = "primary" | "secondary" | "warning" | "danger";

type ButtonColors = {
  background: keyof typeof colors;
  foreground: keyof typeof colors;
};

export const buttonColors: Record<ButtonType, ButtonColors> = {
  primary: { background: "primary", foreground: "white" },
  secondary: { background: "white", foreground: "text" },
  warning: { background: "warning", foreground: "white" },
  danger: { background: "danger", foreground: "white" },
};
