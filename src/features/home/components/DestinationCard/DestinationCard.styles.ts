import { StyleSheet } from "react-native";
import { radius, shadows, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    overflow: "hidden",
    ...shadows.level2,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },

  image: {
    width: "100%",
  },
  blur: {
    flex: 1,
    padding: spacing.sm,
    gap: 8,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    overflow: "hidden",
  },
  footerTexts: {
    flexShrink: 1,
    overflow: "hidden",
  },
  title: {
    flexShrink: 1,
  },
  location: {
    flexShrink: 1,
  },
  newItineraryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
  },
});
