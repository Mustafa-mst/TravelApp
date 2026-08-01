import { colors, radius, shadows, spacing } from "@/shared/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {},
  searchBar: {
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: radius.full,
    ...shadows.level1,
    flexDirection: "row",
    alignItems: "center",
  },
  body: {
    paddingTop: spacing.xl,
  },
  tombRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: -spacing.md,
    marginHorizontal: spacing.md - 2,
  },
  tombImage: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: radius.md,
    borderWidth: 4,
    borderColor: colors.white,
    marginLeft: -spacing.md - 6,
  },
  tombImageFirst: {
    marginLeft: 0,
  },
});
