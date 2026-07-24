import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },

  vertical: {
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },

  segment: {
    flex: 1,
  },

  horizontalContent: {
    marginHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  verticalContent: {
    marginVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});