import { radius, themed } from "@shared/styles";

export const mapZoomControlStyles = themed(({ colors, shadows }) => ({
  container: {
    position: "absolute",
    left: 16,
    bottom: 16,
    borderWidth: 1,
    borderRadius: radius.full,
    justifyContent: "center",
    borderColor: colors.border,
    backgroundColor: colors.overlay,
    ...shadows.level1,
  },
  button: {
    padding: 8,
  },
  divider: {
    paddingHorizontal: 6,
  },
}));
