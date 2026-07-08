import { StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "@shared/styles";

export const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  label: {
    ...typography.caption,
    color: colors.textMuted,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borderMuted,
    borderRadius: radius.lg - 2,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  inputWrapperError: {
    borderColor: colors.danger,
  },
  input: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.text,
    flex: 1,
    paddingVertical: spacing.md - 2,
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  inputFilled: {
    ...typography.bodyMedium,
  },
  error: {
    ...typography.caption,
    color: colors.danger,
  },
});
