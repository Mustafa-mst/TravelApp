import { colors, radius, spacing } from "@/shared/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // White rounded card wrapping the list, mirroring the ActionSheet look.
  card: {
    flex: 1,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    borderRadius: radius.xl,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  list: {
    flex: 1,
  },
  options: {
    paddingHorizontal: spacing.md,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
  },
  // Hairline between rows, skipped on the first row (matches ActionSheet).
  optionDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  optionText: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  flag: {
    width: 26,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,

    borderColor: colors.borderMuted,
  },
});
