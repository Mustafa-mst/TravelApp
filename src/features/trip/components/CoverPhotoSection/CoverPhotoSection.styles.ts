import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  container: {
    gap: spacing.md - 4,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  loading: {
    alignSelf: "flex-start",
    padding: spacing.sm,
  },
  list: {
    flexDirection: "row",
    gap: spacing.md - 4,
  },
  tile: {
    width: 140,
    aspectRatio: 1.5,
    borderRadius: radius.md,
    overflow: "hidden",
    borderWidth: 1,
  },
  tileSelected: {
    borderColor: colors.primary,
  },
  tileUnselected: {
    borderColor: colors.transparent,
    opacity: 0.6,
  },
  tileImage: {
    flex: 1,
  },
});
