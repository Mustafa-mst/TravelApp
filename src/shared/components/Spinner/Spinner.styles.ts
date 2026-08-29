import { themed } from "@shared/styles";

export const spinnerStyles = themed(() => ({
  root: {
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
}));
