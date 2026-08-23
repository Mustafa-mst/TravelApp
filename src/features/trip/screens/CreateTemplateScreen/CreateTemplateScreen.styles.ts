import { themed } from "@shared/styles";

export const createTemplateScreenStyles = themed(({ colors }) => ({
  panelContent: {
    paddingHorizontal: 0,
    backgroundColor: colors.surface,
    overflow: "hidden",
    paddingBottom: 0,
  },
  flex: {
    flex: 1,
  },
}));
