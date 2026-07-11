import { StyleSheet } from "react-native";
import { radius, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  card: {
    width: 115,
    aspectRatio: 115 / 160,
    borderRadius: radius.lg,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  title: {
    padding: spacing.sm,
  },
});
