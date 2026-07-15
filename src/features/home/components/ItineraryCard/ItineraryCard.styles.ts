import { StyleSheet } from "react-native";
import { radius, shadows, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    overflow: "hidden",
    ...shadows.level3,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFill,
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(15, 42, 41, 0.35)",
  },
  content: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  meta: {
    opacity: 0.9,
  },
  moreButton: {
    padding: spacing.xs,
    marginRight: -spacing.xs,
    borderRadius: radius.full,
    backgroundColor: "rgba(0, 0, 0, 0.28)",
  },
  title: {
    flexShrink: 1,
  },
  membersRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    alignSelf: "flex-start",
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: "rgba(0, 0, 0, 0.28)",
  },
  avatars: {
    flexDirection: "row",
  },
  avatarWrap: {
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.6)",
  },
  avatarOverlap: {
    marginLeft: -12,
  },
  membersLabel: {
    flexShrink: 1,
    opacity: 0.95,
  },
});
