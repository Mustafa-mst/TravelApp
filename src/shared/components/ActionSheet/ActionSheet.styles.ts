import { StyleSheet } from "react-native";
import { radius, spacing, themed } from "@shared/styles";

export const actionSheetStyles = themed(({ colors, elevatedBorder }) => ({
  card: {
    marginHorizontal: spacing.md,
    borderRadius: radius.xl,
    backgroundColor: colors.overlay,
    paddingHorizontal: spacing.md,
    overflow: "hidden",
    ...elevatedBorder,
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
}));
