import { StyleSheet } from "react-native";
import { colors, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  panelContent: {
    paddingHorizontal: spacing.md - 4,
  },
  flex: {
    flex: 1,
  },
  content: {
    gap: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
});
