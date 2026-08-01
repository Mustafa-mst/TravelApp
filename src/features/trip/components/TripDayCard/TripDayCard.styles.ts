import { StyleSheet } from "react-native";

import { colors, radius, shadows, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadows.level1,
  },
  emptyCard: {
    flexDirection: "column",
    alignItems: "flex-start",
    ...shadows.level1,
  },
  emptyBody: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  emptyIcon: {
    fontSize: 22,
  },
  emptyText: {
    flex: 1,
    gap: 2,
  },
  info: {
    flex: 1,
    gap: spacing.xs,
  },
  badge: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.full,
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.xs,
  },
  badgeActive: {
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  chip: {
    backgroundColor: colors.backgroundTertiary,
    borderRadius: radius.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  photoColumn: {
    width: 96,
    alignItems: "center",
    gap: spacing.xs,
  },
  photo: {
    width: 96,
    height: 96,
    borderRadius: radius.lg,
  },
});
