import { StyleSheet } from "react-native";

import { colors, radius, shadows } from "@shared/styles";

const PIN_SIZE = 28;
const PIN_SIZE_SELECTED = 36;

export const styles = StyleSheet.create({
  pin: {
    width: PIN_SIZE,
    height: PIN_SIZE,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.white,
    ...shadows.level2,
  },
  pinSelected: {
    width: PIN_SIZE_SELECTED,
    height: PIN_SIZE_SELECTED,
    ...shadows.level3,
  },
});
