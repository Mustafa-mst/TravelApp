import { StyleSheet } from "react-native";
import { colors, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    gap: 16,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    gap: spacing.md,
    paddingBottom: spacing.xxl,
  },
  header: {
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  itinerarySection: {
    paddingHorizontal: spacing.md,
  },
});
