import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "@shared/styles";

const FLAG_HEIGHT = 16;
const FLAG_WIDHT = 22;

export const styles = StyleSheet.create({
  selector: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md - 6,
    paddingHorizontal: spacing.md - 6,
    borderRadius: radius.md - 2,
    backgroundColor: colors.surface,
    width: 108,
  },
  code: {
    flex: 1,
    textAlign: "center",
  },
  flag: {
    width: FLAG_WIDHT,
    height: FLAG_HEIGHT,
    borderRadius: radius.sm - 2,
  },
  flagPlaceholder: {
    width: FLAG_WIDHT,
    height: FLAG_HEIGHT,
    borderRadius: radius.sm,
    backgroundColor: colors.backgroundSecondary,
  },
});
