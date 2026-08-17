import { StyleSheet } from "react-native";
import { radius, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  block: {
    paddingVertical: spacing.xxl,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  badge: {
    width: 50,
    height: 50,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  hint: {
    marginTop: spacing.xs,
  },
  action: {
    marginTop: spacing.lg,
  },
});
