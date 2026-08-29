# Button

The primary action control: seven variants, three sizes, optional icons and a
loading state.

Ported from HeroUI Native (`src/components/button/`, v1.0.8). Variants, sizes,
metrics and the color mapping match upstream. The API deliberately differs —
HeroUI is compound (`Button.Label`) and takes children, ours is prop-driven. The
press feedback rides on our own [`PressableScale`](./pressable-scale.md) rather
than HeroUI's `PressableFeedback`. Gaps are listed under [Not ported](#not-ported).

## Import

```tsx
import { Button } from "@shared/components";
import type { ButtonVariant, ButtonSize } from "@shared/components";
```

## Anatomy

```tsx
<Button
  label="Add member"
  variant="primary"
  size="md"
  startIcon={PlusIcon}
  onPress={handleAdd}
/>
```

Content is laid out in a row: `startIcon` → `label` → `endIcon`, with a
size-dependent gap. While `isLoading`, all three are replaced by a spinner.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | — | Optional; ignored when `isIconOnly` |
| `variant` | `ButtonVariant` | `"primary"` | See [Variants](#variants) |
| `size` | `ButtonSize` | `"md"` | `sm` \| `md` \| `lg` |
| `isDisabled` | `boolean` | `false` | Dims to 50% and blocks presses |
| `isLoading` | `boolean` | `false` | Swaps content for a spinner, blocks presses |
| `isIconOnly` | `boolean` | `false` | Drops horizontal padding, forces a 1:1 square |
| `fullWidth` | `boolean` | `false` | `alignSelf: stretch` instead of `flex-start` |
| `startIcon` | `ComponentType<SvgProps>` | — | Passed as a component, not an element |
| `endIcon` | `ComponentType<SvgProps>` | — | |
| `containerStyle` | `StyleProp<ViewStyle>` | — | **Layout** — width, flex, margin |
| `style` | `StyleProp<ViewStyle>` | — | **Visual** — background, border, radius |

Everything else forwards to `PressableScale` (and through it to `Pressable`):
`onPress`, `onLongPress`, `hitSlop`, `testID`, `scaleTo`, `activeOpacity`.

### containerStyle vs style

These are not interchangeable. `PressableScale` puts `containerStyle` on the
outer animated view and `style` on the pressable itself, and it reads
`style.borderRadius` to clip the press highlight. So:

- Sizing a button inside a row (`flex: 1`, a fixed `width`, `margin`) →
  `containerStyle`. Putting it on `style` leaves the outer view unsized and the
  button collapses.
- Overriding the look (a custom `backgroundColor`, `borderRadius`) → `style`.

## Variants

| Variant | Background | Label | Pressed |
|---|---|---|---|
| `primary` | `accent` | `accentForeground` | `accentHover` |
| `secondary` | `default` | `accentSoftForeground` | `defaultHover` |
| `tertiary` | `default` | `defaultForeground` | `defaultHover` |
| `outline` | transparent + `border` | `defaultForeground` | `defaultHover` |
| `ghost` | transparent | `defaultForeground` | `defaultHover` |
| `danger` | `danger` | `dangerForeground` | `dangerHover` |
| `dangerSoft` | `dangerSoft` | `dangerSoftForeground` | `dangerSoftHover` |

`secondary` and `tertiary` share a background; the accent-tinted label is the
only difference. That is deliberate upstream, and preserved here.

HeroUI spells the last one `danger-soft`; ours is `dangerSoft` because it keys a
`Record<ButtonVariant, …>` lookup.

## Sizes

| Size | Height | Padding | Gap | Radius | Label | Icon |
|---|---|---|---|---|---|---|
| `sm` | 40 | 14 | 6 | `radius["3xl"]` | `bodyMedium` (14/20) | 16 |
| `md` | 48 | 16 | 8 | `radius["3xl"]` | `bodyLargeMedium` (16/24) | 18 |
| `lg` | 56 | 20 | 10 | `radius["4xl"]` | `bodyExtraLargeMedium` (18/28) | 20 |

Heights and paddings come from upstream's `button.css` resolved at
`--spacing: 4px`; they do not sit on our `spacing` scale, so they live as
literals in `Button.styles.ts`. The label variants match HeroUI's
`--text-sm/base/lg` pairs exactly.

## Usage

### Loading

```tsx
<Button label={t("auth.logout")} variant="secondary" isLoading={isPending} />
```

A [`Spinner`](./spinner.md) takes over the `startIcon` slot — the label stays in
place, so the button keeps its width instead of jumping. It is tinted with the
variant's label color and sized from the button (`sm`/`md` → `sm`, `lg` → `md`).
For a spinner on its own, just omit `label`.

`isLoading` and `isDisabled` are independent — both block presses, but only
`isDisabled` dims. A submit button typically wants both:

```tsx
<Button
  fullWidth
  label={t("template.save")}
  isLoading={isSubmitting}
  isDisabled={!canSubmit}
  onPress={submit}
/>
```

### Icons

Icons are passed as components; the button sizes and colors them from the
variant.

```tsx
<Button label="Download" endIcon={ArrowDownIcon} variant="secondary" />
<Button isIconOnly startIcon={TrashIcon} variant="danger" size="lg" />
```

### In a row

```tsx
<View style={styles.footer}>
  <Button variant="outline" fullWidth label="Clear" containerStyle={styles.flex} />
  <Button fullWidth label="Apply" containerStyle={styles.flex} />
</View>
```

## Press feedback

On press the background swaps to the variant's `*Hover` token via an animated
overlay, at full opacity — a color change, not a fade. That is why the button
passes `activeOpacity={1}`: upstream's highlight animates `opacity: [0, 1]` over
a hover-colored layer (`button.tsx:167-174`), and letting `PressableScale` also
fade the whole button would double up.

`overflow: "hidden"` on the root is load-bearing — without it the overlay
escapes the border radius and paints square corners.

Scale is `0.98`, matching `MENU_PRESS_SCALE`. Upstream normalizes scale by
container width (a wide button scales less); we use a flat value, consistent
with the rest of our components.

## Not ported

- **Ripple and `feedbackVariant`** — upstream offers
  `scale-highlight | scale-ripple | scale | none`. We have one feedback mode,
  built on `PressableScale`, rather than a second press primitive alongside it.
- **`animation` prop** — the discriminated-union override for scale/highlight/
  ripple timings. `scaleTo` / `activeOpacity` / `pressedStyle` cover our needs.
- **`Button.Background` and the glass theme** — only does anything under
  HeroUI's Pro `glass` theme, which resolves to `null` in the default theme.
  Our glass port is deferred.
- **Compound `Button.Label`** — content is `label` + icon props here.
- **`asChild` / Slot** — we have no Slot primitive.
- **Width-normalized scale coefficient** — see [Press feedback](#press-feedback).
