import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: colors.white,
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
    aspectRatio: 1.8,
    borderRadius: radius.lg,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colors.transparent,
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
