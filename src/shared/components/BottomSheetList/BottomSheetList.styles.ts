import { colors, radius, spacing } from "@/shared/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    borderRadius: radius.xl,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  cardFill: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.md,
  },
});
