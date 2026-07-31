import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  container: {
    padding: spacing.lg - 4,
    gap: spacing.lg,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  loading: {
    alignSelf: "flex-start",
    padding: spacing.sm,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  tileWrap: {
    flexBasis: "48%",
    flexGrow: 1,
    maxWidth: "48.5%",
  },
  tile: {
    aspectRatio: 1.5,
    borderRadius: radius.lg,
    overflow: "hidden",
    borderWidth: 6,
    borderColor: colors.border,
  },
  tileSelected: {
    borderColor: colors.primary,
  },
  tileImage: {
    flex: 1,
  },
  checkBadge: {
    position: "absolute",
    top: spacing.xs,
    right: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    padding: 2,
  },
});
