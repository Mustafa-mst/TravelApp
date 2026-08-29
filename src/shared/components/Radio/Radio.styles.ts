import { radius, spacing, themed, type ColorToken } from "@shared/styles";

import {
  CLEAR_FILL,
  DISABLED_OPACITY,
  RADIO_SIZE,
  RADIO_THUMB_SIZE,
} from "./radio.constants";
import type { RadioVariant } from "./radio.types";

export const radioStyles = themed(({ colors }) => ({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm + 2,
  },
  rowTop: {
    alignItems: "flex-start",
  },
  /** Pushes the ring to the far edge when it trails the content. */
  ringEnd: {
    marginLeft: "auto",
  },
  ring: {
    width: RADIO_SIZE,
    height: RADIO_SIZE,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: CLEAR_FILL,
  },
  thumb: {
    width: RADIO_THUMB_SIZE,
    height: RADIO_THUMB_SIZE,
    borderRadius: radius.full,
  },
  texts: {
    flexShrink: 1,
    gap: spacing.xs / 2,
  },
  label: {
    flexShrink: 1,
  },
  disabled: {
    opacity: DISABLED_OPACITY,
  },
  group: {
    gap: spacing.md,
  },
  groupHorizontal: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
}));

type RadioPalette = {
  /** null keeps the ring unfilled when selected, so the thumb carries the state. */
  fill: ColorToken | null;
  border: ColorToken;
  thumb: ColorToken;
};

export const radioVariants: Record<RadioVariant, RadioPalette> = {
  primary: { fill: "accent", border: "accent", thumb: "accentForeground" },
  secondary: { fill: null, border: "accent", thumb: "accent" },
};
