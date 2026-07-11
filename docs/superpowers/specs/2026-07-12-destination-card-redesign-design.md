# DestinationCard Redesign — Design

Date: 2026-07-12

## Goal

Redesign `DestinationCard` (home feature) to match the clean, minimal Qantas-style
travel card: image on top, white content body below, with the item's category shown
as an accent-colored badge overlaid on the image corner. The card should feel clean
and let our brand colors (primary teal, accent coral) carry the emphasis.

## Reference

Qantas flight cards: full-width image with a rounded top, a small pill badge in the
top-left corner (e.g. "Classic"), and a white body below with a title and a
supporting line. The current card uses a full-bleed image with an overlaid footer and
a "new itinerary" button — that overlay approach is being replaced.

## Structure

```
┌─────────────────────────────┐
│ ⬤ Classic                   │  ← accent badge (absolute, top-left over image)
│                             │
│         [image]             │  ← image on top, aspectRatio 4/3, contentFit cover
│                             │
├─────────────────────────────┤
│  Title (h6, text)           │  ← white body
│  Subtitle (bodyMedium,      │
│            primary teal)    │
└─────────────────────────────┘
```

## Component: DestinationCard

- **Card container:** white background (`colors.white`), `radius.lg`, `shadows.level2`,
  `overflow: hidden`. Width calculation via existing `CARDS_PER_SCREEN` /
  `useWindowDimensions` logic is unchanged.
- **Image:** `Image` from `expo-image`, fixed `aspectRatio: 4 / 3`, `contentFit="cover"`,
  full width. The previous `ImageBackground` + blur overlay is removed.
- **Category badge (accent):** rendered only when the `category` prop is provided.
  - Absolutely positioned over the image, top-left, offset by `spacing.sm`.
  - Background: `colors.accent` (`#FF3830`). Text: `colors.white`.
  - Small leading dot/icon + category text, `variant="caption"`, `numberOfLines={1}`,
    rounded (`radius.md`), horizontal padding `spacing.sm`, vertical `spacing.xs`.
  - Rationale for using our own `accent` (`#FF3830`) over the reference's pure red:
    it is the complementary/warm counterpart to the teal primary, giving a more
    balanced pairing, and it is already a design-system token.
- **Body:** `padding: spacing.md`, small `gap`.
  - Title: `variant="h6"`, `color="text"`, `numberOfLines={2}`.
  - Subtitle: `variant="bodyMedium"`, `color="primary"`, `numberOfLines={1}` — the teal
    accent lives here.
- **Pressed state:** existing `cardPressed` (slight opacity + scale) is preserved.

### Props

```ts
type DestinationCardProps = {
  title: string;
  location: string;
  image: ImageSource | string;
  category?: string; // renders the accent badge when present
  onPress?: () => void;
};
```

Removed: `onNewItinerary`. Removed imports/usages: `PlusIcon`, `useTranslation`,
`ImageBackground`, blur overlay. `CategorySection` never passed `onNewItinerary`, so
removing it does not affect current callers.

## Call chain

- **CategorySection:** gains a `categoryLabel?: string` prop and passes
  `category={categoryLabel}` to each `DestinationCard`. Otherwise unchanged.
- **HomeScreen:** passes `categoryLabel={category.category}` (available from the
  `CategoryWithItems` it already holds) to `CategorySection`.

## Out of scope / untouched

- Data model (`category.types.ts`) — unchanged.
- No new fields (points/price) added; content stays title + subtitle.
- `useGetCategoriesQuery` — unchanged.

## Testing / verification

This is a presentational RN component. Verify visually by running the app and viewing
the home screen's category section: image-top layout, white body, teal subtitle, and
the accent category badge in the top-left corner.
