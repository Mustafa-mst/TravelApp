import { StyleSheet } from "react-native";
import { colors } from "@shared/styles";

export const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.grey200,
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
