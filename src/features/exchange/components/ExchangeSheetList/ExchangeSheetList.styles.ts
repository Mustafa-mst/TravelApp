import { StyleSheet } from "react-native";
import { radius, spacing, themed } from "@shared/styles";

const FLAG_WIDTH = 26;
const FLAG_HEIGHT = 18;

export const exchangeSheetListStyles = themed(({ colors }) => ({
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
  },
  optionDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.separatorSecondary,
  },
  optionText: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  flag: {
    width: FLAG_WIDTH,
    height: FLAG_HEIGHT,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
}));

export const CHECKBOX_ICON_SIZE = 18;
