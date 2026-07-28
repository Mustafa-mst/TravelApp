import { StyleSheet } from "react-native";
import { colors, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  panelContent: {
    paddingHorizontal: 0,
    backgroundColor: colors.background,
    overflow: "hidden",
    paddingBottom: 0,
  },
  flex: {
    flex: 1,
  },
  content: {
    gap: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.sm - 2,
  },
});
