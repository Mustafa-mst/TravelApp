# Menu

A floating menu anchored to a trigger, with selection, sub-menus, and edge-aware
placement.

Ported from HeroUI Native (`src/components/menu/`). The API deliberately differs
— HeroUI is compound (`Menu.Item`, `Menu.Group`), ours is data-driven. See
[Why not compound](#why-not-compound). Behaviour matches upstream in geometry,
positioning, and press feedback; the gaps are listed under
[Not ported](#not-ported).

## Import

```tsx
import { Menu } from "@shared/components";
import type { MenuItem } from "@shared/components";
```

## Anatomy

```tsx
<Menu
  trigger={<IconButton icon={<MoreVerticalIcon />} />}
  items={[
    { id: "edit", label: "Edit", Icon: PenIcon },
    { id: "delete", label: "Delete", variant: "danger" },
  ]}
  onSelect={(item) => handle(item.id)}
/>
```

- **trigger** — any node. Wrapped in a measurable `View`; touches are captured
  before reaching it, so `Button`/`IconButton` work as triggers.
- **items** — the rows. An item with `children` becomes an expandable sub-menu.
- The surface renders into a portal, above bottom sheets and the keyboard.

## Usage

### Basic

```tsx
<Menu
  trigger={<Button label="Actions" type="secondary" />}
  items={[
    { id: "edit", label: "Edit", Icon: PenIcon },
    { id: "share", label: "Share", Icon: ShareIcon },
  ]}
  onSelect={(item) => console.log(item.id)}
/>
```

### With descriptions

```tsx
items={[
  { id: "new", label: "New file", description: "Create a new file" },
  { id: "copy", label: "Copy link", description: "Copy the file link" },
]}
```

### Single selection

A selected row shows a checkmark. Controlled via `selectedKeys`:

```tsx
const [theme, setTheme] = useState<string[]>(["system"]);

<Menu
  trigger={<Button label="Theme" type="secondary" />}
  label="Appearance"
  selectionMode="single"
  selectedKeys={theme}
  onSelectionChange={setTheme}
  items={[
    { id: "light", label: "Light" },
    { id: "dark", label: "Dark" },
    { id: "system", label: "System" },
  ]}
/>
```

Uncontrolled works too — pass `defaultSelectedKeys` and omit `selectedKeys`.

### Multiple selection

`closeOnSelect={false}` keeps the menu open while toggling several rows:

```tsx
<Menu
  trigger={<Button label="Text Style" type="secondary" />}
  selectionMode="multiple"
  defaultSelectedKeys={["bold"]}
  closeOnSelect={false}
  items={[
    { id: "bold", label: "Bold" },
    { id: "italic", label: "Italic" },
  ]}
/>
```

### Dot indicator

```tsx
<Menu selectionMode="single" indicator="dot" ... />
```

### Sub-menu

An item with `children` renders as an expandable row with a rotating chevron:

```tsx
items={[
  { id: "new", label: "New Space" },
  {
    id: "focus",
    label: "Focus",
    children: [
      { id: "zen", label: "Zen Mode" },
      { id: "reader", label: "Reader Mode" },
    ],
  },
]}
```

Nesting is one level deep. `children` on a nested item is ignored.

### Danger variant

```tsx
items={[
  { id: "edit", label: "Edit" },
  { id: "delete", label: "Delete", variant: "danger" },
]}
```

### Placement

```tsx
<Menu placement="right" align="start" offset={12} width={240} ... />
```

`placement` is a preference, not a guarantee — see [Positioning](#positioning).

## API Reference

### Menu

| prop | type | default | description |
| --- | --- | --- | --- |
| `items` | `MenuItem[]` | — | **Required.** The rows to render. |
| `trigger` | `ReactNode` | — | **Required.** Node that opens the menu. |
| `onSelect` | `(item: MenuItem) => void` | — | Fired when a row is pressed. Not fired for sub-menu parents. |
| `selectionMode` | `"none" \| "single" \| "multiple"` | `"none"` | Enables indicators. `"none"` hides the indicator column. |
| `selectedKeys` | `string[]` | — | Controlled selection. |
| `defaultSelectedKeys` | `string[]` | `[]` | Uncontrolled initial selection. |
| `onSelectionChange` | `(keys: string[]) => void` | — | Fired with the next selection. |
| `indicator` | `"checkmark" \| "dot"` | `"checkmark"` | Selected-row marker. |
| `placement` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | Preferred side. |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment along the trigger. |
| `offset` | `number` | `8` | Gap between trigger and surface. |
| `alignOffset` | `number` | `0` | Shift along the alignment axis. |
| `width` | `number` | — | Fixed width. Defaults to a `180` minimum, content-sized. |
| `label` | `string` | — | Non-interactive heading above the rows. |
| `closeOnSelect` | `boolean` | `true` | Whether pressing a row closes the menu. |
| `animated` | `boolean` | `true` | Fade in/out. |
| `isDisabled` | `boolean` | `false` | Prevents the menu from opening. |
| `style` | `StyleProp<ViewStyle>` | — | Applied to the surface. |

### MenuItem

| prop | type | default | description |
| --- | --- | --- | --- |
| `id` | `string` | — | **Required.** Unique key; also the selection key. |
| `label` | `string` | — | **Required.** Row text. |
| `description` | `string` | — | Secondary line, up to 2 lines. |
| `Icon` | `ComponentType<SvgProps>` | — | Leading icon. Pass the component, not an element: `Icon: PenIcon`. |
| `variant` | `"default" \| "danger"` | `"default"` | `danger` tints label and icon red. |
| `isDisabled` | `boolean` | `false` | Dims the row and blocks presses. |
| `children` | `MenuItem[]` | — | Turns the row into an expandable sub-menu. |

## Positioning

`placement` is a preference. Before painting, the menu measures the trigger
(`measureInWindow`), converts that into the portal host's coordinate space (see
[Coordinate spaces](#coordinate-spaces)), measures its own content, then:

1. **Flips** to the opposite side when the preferred one cannot fit the content.
   Room is compared against the size actually needed — a gap can be positive and
   still too small, which would leave the menu overlapping its trigger.
2. **Clamps** to the safe area (insets + 12px) when it still overhangs.
3. Caps `maxHeight` to the space on the chosen side, so a long menu scrolls
   rather than running off screen.

The surface is invisible (`opacity: 0`) for the first frame, while its height is
unknown. Without that, placement computed against a height of zero would paint on
the wrong side and visibly jump once measured.

### Coordinate spaces

`measureInWindow` is misleadingly named. Under Fabric it resolves against the
**React root**, not the OS window — `getLayoutMetricsFromRoot` with
`includeViewportOffset`. The portal host is not always at the root's origin:

| | host location | offset from the measured space |
| --- | --- | --- |
| iOS | `FullWindowOverlay`, a separate native window above the root | non-zero |
| Android | a plain `View` inside the root tree | zero |

So a trigger rect cannot be used as-is. `PortalHost` measures its own origin on
layout and records it; `useAnchorRect` subtracts it, which is correct on both
platforms without a `Platform.OS` branch. Skipping this shifts the menu by
however far the host sits from the root — on Android it landed on top of its own
trigger.

A fixed status-bar offset does **not** work here: this app is edge-to-edge
(transparent `statusBarColor`, RN 0.85 on Android 15+), so the root already
starts at window `y=0` and subtracting `StatusBar.currentHeight` overshoots.

`PortalHost` stays mounted while empty for the same reason. Returning `null` with
no portals meant the host first mounted *during* the opening menu's `measure()`,
so the very first menu of a session read an unset origin and appeared shifted,
then corrected itself on the second open.

## Notes

**Portal, not `Modal`.** The surface renders through `PortalHost`, mounted in
`AppProviders` as the last sibling inside `BottomSheetModalProvider`. RN's `Modal`
is a separate native window, as is `@gorhom/bottom-sheet` — stacking two is not
ordered reliably on iOS, so a menu opened from inside a sheet could land behind
it. The portal keeps everything in one tree.

**The overlay is invisible.** It only catches outside taps; it paints no scrim.
This matches HeroUI, whose `.menu__overlay` is `position: absolute; inset: 0`
with no background.

**Row geometry is inset, and the row owns its radius.** Values match HeroUI's
`.menu__item` / `.menu__content`:

| | surface | row |
| --- | --- | --- |
| `paddingHorizontal` | 6 | 10 |
| `paddingVertical` | 12 | 8 |
| `borderRadius` | `radius.xl` | `radius["2xl"]` (16) |

Both halves matter. The radius sits on the **row**, not the surface, so a pressed
row's highlight has rounded corners. The surface's 6px inset keeps that highlight
from running edge to edge, so it reads as an island. Without either, the press
feedback is a flat rectangle spanning the full width. `label` and `submenuInner`
repeat the row's 10px indent so headings and nested rows stay flush with titles.

**Press feedback comes from `PressableScale`.** Rows pass
`scaleTo={MENU_PRESS_SCALE}` (0.98, HeroUI's value) plus
`pressedStyle={styles.rowPressed}`, and `activeOpacity={1}` — the highlight
carries the feedback, not a fade. See [PressableScale](./pressable-scale.md) for
why scale, opacity, and background share one timing curve.

Two rows deviate on purpose, both following HeroUI:

- **Nested rows get no scale** (`isNested`). The sub-menu container already
  animates as a whole; scaling a row inside it compounds two transforms.
- **The sub-menu trigger keeps its highlight** while open, because nothing paints
  a surface behind an open sub-menu here. HeroUI suppresses it, but only because
  `SubMenu.Background` tints that row — a layer this port does not have.

**The sub-menu has no open/closed React state.** A single `progress` shared value
is the state: it drives the height and the chevron rotation on the UI thread, so
toggling never re-renders. The toggle reads `progress.value > 0.5` rather than
`!== 0`, so pressing mid-animation reverses instead of restarting the same
direction. The cost is that `accessibilityState.expanded` is gone — restoring it
means reintroducing React state.

**Trigger touches are captured.** `Button` and `IconButton` render their own
`Pressable`, which would swallow the touch. The wrapper claims the gesture in the
capture phase instead. It is also `collapsable={false}` — Android drops plain
views from the native tree, and a dropped view cannot be measured.

**Layering.** The two layers split four concerns that conflict if combined:

| | outer (`position`) | inner (`surface`) |
| --- | --- | --- |
| position, `maxHeight`, `opacity` | ✓ | |
| iOS shadow (`shadowColor`…) | ✓ | |
| background, clipping, `elevation` | | ✓ |
| enter/exit animation | | ✓ |

Each split is load-bearing. An iOS shadow on the clipping layer would not be
drawn. `opacity` on the animated view makes Reanimated warn that the layout
animation may overwrite it. And **`elevation` must sit with the background** —
Android derives the shadow from the view's own background shape, so an elevated
view with no background paints a plain black rectangle, visible as a dark smear
while the menu fades.

## Why not compound

HeroUI exposes `Menu.Trigger` / `Menu.Content` / `Menu.Item` / `Menu.Group`. We
took the behaviour and left the shape, because here compound would cost:

- **A context.** `Menu.Item` would need to reach open state, selection, and the
  close callback. The only context in this codebase is the theme.
- **Logic at the call site.** Menu contents are usually conditional
  (`canEdit && …`), which becomes conditional JSX — against the "no logic in
  screens" rule in `CLAUDE.md`. With `items`, the array is built in a hook.
- **Roughly twice the code**, since every part is its own memoised component.

Most HeroUI features are still reachable; only the syntax differs. The
exceptions are listed below. `Card` went the other way — its content is genuinely
open-ended, so compound earned its keep there.

## Not ported

- **`presentation="bottom-sheet"`** — a second layout engine. `BottomSheet` and
  `ActionSheet` already cover that shape.
- **`asChild` / Slot** — HeroUI's primitive layer; `trigger` does the same job.
- **Glass theme / `SubMenu.Background`** — the `default | glass` axis was not
  ported (needs `expo-blur`).
- **Sub-menu shadow suppression** — HeroUI drops the parent's shadow while a
  sub-menu is open (`.menu__content--is-sub-menu-open`) so the two surfaces do
  not stack. Ours keeps it.
- **`disallowEmptySelection`** — upstream's single-select groups take this prop.
  Ours always behaves as if it were set: re-pressing the selected row keeps it
  selected, so single-select can never be emptied and there is no toggle-off.
- **Per-item / per-group `shouldCloseOnSelect`** — upstream sets it at both
  levels; ours has one root `closeOnSelect`. A menu whose sub-menu groups stay
  open while its outer rows dismiss cannot be expressed.
- **`width` strategies** — upstream accepts
  `'content-fit' | 'trigger' | 'full' | number`. Ours takes a number, falling
  back to a 180px minimum.
- **Scale + fade content entrance** — upstream's popover scales as it fades in;
  ours is a plain `FadeIn`/`FadeOut`.
- **Danger press colour** — upstream tints a pressed danger row with `danger-soft`
  at 10% alpha. Every row here uses the same `surfaceHover`, so pressing *Delete*
  highlights grey rather than red.
- **`Menu.Close`, per-group `Menu.Label`, `Separator`, `forceMount`, and the
  `useMenu` / `useMenuItem` hooks** — consequences of not being compound.
