import { StyleSheet } from "react-native";
import { colors, radius, shadows, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    // backgroundColor: "#1C1C1E",
    backgroundColor: colors.white,
    gap: spacing.sm,
    ...shadows.level1,
  },
  meta: {
    opacity: 0.7,
  },
  title: {
    flexShrink: 1,
  },
  membersRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  avatars: {
    flexDirection: "row",
  },
  avatarWrap: {
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: "#1C1C1E",
  },
  avatarOverlap: {
    marginLeft: -12,
  },
  membersLabel: {
    flexShrink: 1,
    opacity: 0.9,
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    // backgroundColor: "rgba(255, 255, 255, 0.12)",
    backgroundColor: colors.backgroundTertiary,
  },
  pressed: {
    opacity: 0.7,
  },
});
