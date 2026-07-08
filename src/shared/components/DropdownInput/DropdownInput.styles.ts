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
  },
  inputWrapperError: {
    borderColor: colors.danger,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md - 2,
    paddingRight: spacing.sm,
  },
  dropdownLabel: {
    ...typography.bodyMedium,
    color: colors.text,
  },
  placeholder: {
    color: colors.textMuted,
  },
  divider: {
    width: 1,
    alignSelf: "stretch",
    backgroundColor: colors.text,
    marginVertical: spacing.md,
  },
  input: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    color: colors.text,
    flex: 1,
    paddingVertical: spacing.md - 2,
    paddingLeft: spacing.md,
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  inputFilled: {
    fontWeight: typography.bodyMedium.fontWeight,
  },
  error: {
    ...typography.caption,
    color: colors.danger,
  },
});
