/** How much of the next template card stays on screen at the right edge. */
export const TEMPLATE_CARD_PEEK = 48;

/** The snap step of the template row: one card plus the peek of the next. */
export function templateCardWidth(rowWidth: number) {
  return rowWidth - TEMPLATE_CARD_PEEK;
}
