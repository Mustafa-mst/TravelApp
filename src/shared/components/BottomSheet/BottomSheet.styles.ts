import { StyleSheet } from "react-native";
import { colors } from "@shared/styles";

export const styles = StyleSheet.create({
  sheet: {
    flex: 1,
  },
  background: {
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.grey200,
    padding: 24,
    paddingBottom: 12,
  },
  indicator: {
    backgroundColor: colors.grey600,
    width: 36,
    height: 4,
    borderRadius: 99,
    position: "absolute",
    alignSelf: "center",
    top: 10,
  },
  content: {
    flex: 1,
  },
});
