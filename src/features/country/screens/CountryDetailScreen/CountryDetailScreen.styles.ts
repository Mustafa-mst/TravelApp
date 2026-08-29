import { StyleSheet } from "react-native";
import { spacing, themed } from "@shared/styles";

const HERO_HEIGHT = 280;
const SECTION_INFO_GAP = 2;
const SEE_MORE_SPACING = 2;

export const countryDetailScreenStyles = themed(({ colors }) => ({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  hero: {
    width: "100%",
    height: HERO_HEIGHT,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  titleBlock: {
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.xs,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  sectionInfo: {
    flex: 1,
    gap: SECTION_INFO_GAP,
  },
  seeMore: {
    marginTop: SEE_MORE_SPACING,
  },
  sectionDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: spacing.md,
  },
}));

export const COUNTRY_SECTION_ICON_SIZE = 22;
export const COUNTRY_CHEVRON_SIZE = 18;
