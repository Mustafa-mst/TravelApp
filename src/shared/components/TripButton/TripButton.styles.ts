import { themed } from "@shared/styles";

export const tripButtonStyles = themed(({ colors }) => ({
  button: {
    backgroundColor: colors.backgroundInverse,
  },
  // Button's own pressed tint is accent green; keep the press in the same
  // near-black family as the resting state.
  buttonPressed: {
    backgroundColor: colors.muted,
  },
}));
