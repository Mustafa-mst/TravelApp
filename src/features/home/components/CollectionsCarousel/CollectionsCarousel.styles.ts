import { StyleSheet } from "react-native";
import { spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.md,
    gap: spacing.md,
  },
  title: { gap: spacing.xs },
});
