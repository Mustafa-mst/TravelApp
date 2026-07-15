import { StyleSheet } from "react-native";
import { colors, radius, shadows, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tileContainer: {
    width: "25%",
    marginBottom: spacing.md,
  },
  tile: {
    alignItems: "center",
    gap: spacing.sm,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.text,
    textAlign: "center",
  },
});
