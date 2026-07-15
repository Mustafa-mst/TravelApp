import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.md,
    borderRadius: radius.xl,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  rowDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  rowPressed: {
    opacity: 0.6,
  },
  text: {
    flex: 1,
    gap: 2,
  },
});
