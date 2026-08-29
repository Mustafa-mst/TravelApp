# PressableScale

A `Pressable` that animates while held: scale, opacity, and an optional
background highlight, all on one curve.

Used by ~25 call sites — cards, list rows, tab bar items, menu rows. It is the
default touchable in this codebase.

## Import

```tsx
import { PressableScale } from "@shared/components";
```

## Usage

### Basic

```tsx
<PressableScale style={styles.card} onPress={onPress}>
  <Text>Tap me</Text>
</PressableScale>
```

### With a background highlight

`pressedStyle` fades in while held. Only its `backgroundColor` is read.

```tsx
<PressableScale
  style={styles.row}
  pressedStyle={styles.rowPressed}
  onPress={onPress}
/>
```

### Layout vs. surface

Two style props, because the animated wrapper and the pressable are different
nodes:

```tsx
<PressableScale
  containerStyle={[styles.shadow, { width: cardWidth }]}
  style={styles.card}
/>
```

- `containerStyle` — the outer animated wrapper. Layout: `width`, `flex`,
  `margin`, and shadows.
- `style` — the pressable itself. Padding, background, `borderRadius`.

Putting layout on `style` means scale animates the content inside a fixed box
instead of the box itself.

### Tuning the feedback

```tsx
<PressableScale scaleTo={1} activeOpacity={1} pressedStyle={styles.rowPressed} />
```

Set either to `1` to switch that channel off. `scaleTo={1}` with a
`pressedStyle` gives background-only feedback, which is what nested rows use.

## API Reference

| prop | type | default | description |
| --- | --- | --- | --- |
| `scaleTo` | `number` | `0.99` | Scale while pressed. `1` disables. |
| `activeOpacity` | `number` | `0.9` | Opacity while pressed. `1` disables. |
| `containerStyle` | `StyleProp<ViewStyle>` | — | Outer wrapper: layout and shadow. |
| `style` | `StyleProp<ViewStyle>` | — | The pressable: padding, background, radius. |
| `pressedStyle` | `StyleProp<ViewStyle>` | — | Highlight while pressed. Only `backgroundColor` is used. |
| `...PressableProps` | `PressableProps` | — | Everything except `style`. |

## Notes

**One curve for everything.** Scale, opacity, and highlight all read from a
single `progress` shared value through `withTiming(150ms)`. An earlier version
ran scale on a spring while the background switched instantly; the two never
lined up and the press read as two separate events.

**`withTiming` wraps the final value, never arithmetic.** It returns an
animation descriptor, not a number, so `1 - withTiming(...) * k` yields `NaN`.
An `opacity: NaN` collapses the view and everything inside it — which is silent,
renders nothing, and typechecks fine, since `NaN` is a `number`.

**The highlight is a separate layer, not a background on the pressable.** It is
an `absoluteFill` sibling rendered behind `children`. On the pressable itself,
the fade would dim the content along with the background.

**It animates opacity, not colour.** The layer holds `pressedBackground` at full
strength and fades `opacity` 0 → 1. Animating `backgroundColor` from
`"transparent"` instead crosses `rgba(0, 0, 0, 0)` — alpha-zero *black* — so the
interpolation passes through dark grey. A quick tap hides it; a slow press shows
a dark flash before the light highlight settles.

**`pressedStyle` is flattened on the JS side.** `StyleSheet.flatten` resolves it
to a plain value before the worklet runs; a style array or registered ID would
leave `backgroundColor` unreadable on the UI thread. `borderRadius` is lifted off
`style` the same way, since the highlight layer has none of the caller's own
corners and would otherwise square off a rounded row.

**Children may be a function.** `Pressable` supports
`children={({ pressed }) => ...}`, so the highlight is injected inside a render
callback that forwards state through. No current call site uses the function
form, but dropping support would be a silent breaking change.

**Press-in is gated on `disabled`, press-out is not.** A press interrupted by
`disabled` flipping still has to settle back to rest.
