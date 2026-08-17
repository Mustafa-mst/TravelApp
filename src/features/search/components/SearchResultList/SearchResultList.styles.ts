import { colors, radius, spacing } from "@shared/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    backgroundColor: colors.white,
    borderColor: colors.borderMuted,
    borderRadius: radius.xl,
    overflow:'hidden'
  },
  title: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: spacing.sm,
   
  },

  list: {
    flex: 1,
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
  border: { height: 1, width: "100%", backgroundColor: colors.borderMuted },
  resultInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    flexShrink: 1,
  },
  flag: {
    width: 24,
    height: 18,
    borderRadius: radius.sm - 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
