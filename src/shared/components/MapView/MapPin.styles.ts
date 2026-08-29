import { radius, themed } from "@shared/styles";

const PIN_SIZE = 28;
const PIN_SIZE_SELECTED = 36;

export const mapPinStyles = themed(({ colors, shadows }) => ({
  pin: {
    width: PIN_SIZE,
    height: PIN_SIZE,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    // The ring sits on the basemap, not on app chrome, so it stays white
    // against the dark style too.
    borderColor: colors.staticWhite,
    ...shadows.level2,
  },
  pinSelected: {
    width: PIN_SIZE_SELECTED,
    height: PIN_SIZE_SELECTED,
    ...shadows.level3,
  },
}));
