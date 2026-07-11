import { StyleSheet } from "react-native";
import { colors, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
  },
  image: {
    width: 64,
    height: 64,
    borderWidth:1,
    borderColor:colors.border
  },
  info: {
    flex: 1,
    gap: 2,
  },
  subtitle: {
    color: colors.textLight,
  },
});
