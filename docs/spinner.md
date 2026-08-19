# Spinner

The loading indicator: a rotating gradient ring in three sizes, colored from a
theme token or a raw color string.

Ported from HeroUI Native (`src/components/spinner/`, v1.0.8). The drawing and
rotation match upstream exactly. The API is deliberately narrower — HeroUI is
compound (`Spinner.Indicator`) with a polymorphic `animation` prop, ours is three
props. Gaps are listed under [Not ported](#not-ported).

This replaced every `ActivityIndicator` in the app.

## Import

```tsx
import { Spinner } from "@shared/components";
import type { SpinnerSize } from "@shared/components";
```

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `size` | `SpinnerSize` | `"md"` | `sm` (16) \| `md` (24) \| `lg` (32) |
| `color` | `ColorToken \| string` | `"accent"` | A theme token, or any raw color |
| `isLoading` | `boolean` | `true` | `false` renders `null` |
| `style` | `StyleProp<ViewStyle>` | — | Layout only — the box is already sized |

Everything else forwards to the root `View`.

### color

A `ColorToken` resolves against the active theme; anything else is passed to the
SVG verbatim. Both paths matter:

```tsx
<Spinner color="accent" />     // token — follows the theme
<Spinner color={tone} />       // resolved string — matches a surrounding surface
```

The second is how `Button` uses it: the spinner takes the variant's already
resolved label color, so it always matches the label it replaces.

## Sizes

| Size | Box & icon |
|---|---|
| `sm` | 16 |
| `md` | 24 |
| `lg` | 32 |

Upstream's root box and icon are the same size at every step, so one constant
(`SPINNER_SIZE`) covers both. Inside `Button`, `BUTTON_SPINNER_SIZE` maps button
size → spinner size: `sm`/`md` buttons get `sm`, `lg` gets `md`.

## How it is drawn

Not a `strokeDasharray` circle and not rotating views: **two gradient-filled arc
paths** (the mingcute "loading" icon) in a static SVG, with the wrapping
`Animated.View` doing the rotation.

- The head arc fades from opaque to 55%.
- The tail arc fades from transparent to 55%.

That asymmetry is what reads as a tail while spinning. Because the SVG itself
never changes, `react-native-svg` does not need to be Reanimated-aware.

This is the only component in the codebase that imports `react-native-svg`
drawing primitives — every icon elsewhere is a `.svg` file through
`react-native-svg-transformer`. A `.svg` file would not work here: the gradient
stops need the runtime `color` prop, which the transformer cannot thread through.

### Gradient ids

SVG gradient ids are document-global. Upstream hardcodes `mingcuteLoadingFill0/1`,
so two differently colored spinners on one screen can share whichever gradient
registered first. Ours derives the ids from `useId()`, making them per-instance.

That case is real here — `Button` colors its spinner per variant, so two loading
buttons of different variants in one list would collide.

## Animation

One shared value, linear `0 → 360`, `withRepeat(..., -1, false)`, 909ms per
revolution (upstream's `1000ms / 1.1` speed). `cancelAnimation` on unmount.

Upstream wraps the timing in a single-element `withSequence`, which is a no-op;
ours calls `withTiming` directly.

## Accessibility

The root is `accessibilityRole="progressbar"` with `accessibilityState={{ busy }}`;
the rotating layer is hidden from the accessibility tree. Both inlined from
upstream's `activity-indicator` primitives.

## Not ported

- **Compound `Spinner.Indicator`** — the sub-component that took `iconProps`,
  its own `animation`, and `children` for a custom rotating icon.
- **`animation` prop** — `{ rotation: { speed, easing } }` and the
  `false` / `'disabled'` / `'disable-all'` forms. Rotation is fixed.
- **`AnimationSettingsProvider` cascade** — the global "disable all animations"
  switch. No equivalent in this app.
- **Root `entering` / `exiting`** (`FadeIn` 200ms / `FadeOut` 100ms) — call sites
  can pass Reanimated props themselves if they want them.
- **The invisible third `<Path>`** — an Iconify export artifact upstream; it
  inherits `fill="none"` and draws nothing.
- **`getElementWithDefault`** — dead upstream too: `{children || indicatorElement}`
  means the lookup never runs.
