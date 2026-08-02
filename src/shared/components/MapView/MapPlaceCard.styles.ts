import { StyleSheet } from "react-native";

import { colors, radius, shadows } from "@shared/styles";

const CARD_WIDTH = 132;
const IMAGE_HEIGHT = 76;

export const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    padding: 6,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    ...shadows.level3,
  },
  image: {
    height: IMAGE_HEIGHT,
    borderRadius: radius.md,
    backgroundColor: colors.backgroundSecondary,
  },
  imageFallback: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 6,
    marginHorizontal: 2,
  },
});
