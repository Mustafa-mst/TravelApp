import { StyleSheet } from "react-native";
import { spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  card: {
    width: 115,
    aspectRatio: 115 / 160,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  title: {
    padding: spacing.sm,
  },
});
