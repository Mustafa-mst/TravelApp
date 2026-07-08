import { colors, radius, spacing } from "@shared/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    borderRadius: radius.xl,
  },
  title: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: spacing.sm,
    paddingTop: spacing.md - 4,
  },
  contentContainer: {
    paddingVertical: spacing.md - 4,
  },
  itemContainer: {
    paddingVertical: spacing.md - 4,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  border :{ height: 1, width: "100%",backgroundColor: colors.borderMuted}
});
