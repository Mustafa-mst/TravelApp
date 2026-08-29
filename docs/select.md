# Select

A field that opens a list of options — as a popover anchored to the trigger, or
as a bottom sheet.

Ported from HeroUI Native (`src/components/select/`). The API deliberately
differs — HeroUI is compound (`Select.Trigger`, `Select.Item`), ours is
data-driven. See [Why not compound](#why-not-compound). Geometry, press
feedback, and the chevron animation match upstream; the gaps are listed under
[Not ported](#not-ported).

## Import

```tsx
import { Select, SelectTrigger } from "@shared/components";
import type { SelectOption } from "@shared/components";
```

## Anatomy

```tsx
<Select
  label="Country"
  options={[
    { value: "tr", label: "Türkiye" },
    { value: "de", label: "Germany" },
  ]}
  value={country}
  onValueChange={setCountry}
/>
```

- **trigger** — a field matching `TextField`: label, value/placeholder row,
  description, error. Chevron rotates while open.
- **options** — the rows. Selected rows show a checkmark.
- The popover renders into a portal, above bottom sheets and the keyboard.

## Usage

### Basic

```tsx
<Select
  label={t("trip.country")}
  options={countryOptions}
  value={country}
  onValueChange={(next) => setCountry(next as string)}
/>
```

`placeholder` defaults to `t("common.select")`.

Uncontrolled works too — pass `defaultValue` and omit `value`.

### With descriptions and icons

```tsx
options={[
  { value: "car", label: "Drive", description: "About 4 hours", Icon: CarIcon },
  { value: "bus", label: "Bus", description: "About 6 hours", Icon: BusIcon },
]}
```

### Multiple selection

The list stays open while toggling; the trigger joins the labels with `", "`.

```tsx
<Select
  selectionMode="multiple"
  options={tagOptions}
  value={tags}
  onValueChange={(next) => setTags(next as string[])}
/>
```

### Bottom sheet

```tsx
<Select
  presentation="bottom-sheet"
  snapPoints={["60%"]}
  listLabel={t("trip.pickCity")}
  options={cityOptions}
  value={city}
  onValueChange={(next) => setCity(next as string)}
/>
```

Omit `snapPoints` for a content-hugging sheet. See
[Sheet sizing](#sheet-sizing) for why that changes how rows render.

### Placement

```tsx
<Select placement="top" align="end" offset={12} width={240} ... />
```

`placement` is a preference, not a guarantee — the popover flips and clamps the
same way `Menu` does. See [Positioning](../docs/menu.md#positioning); both use
the shared `useAnchorRect`.

### With react-hook-form

```tsx
<Controller
  control={control}
  name="country"
  render={({ field: { onChange, value } }) => (
    <Select
      label={t("trip.country")}
      options={countryOptions}
      value={value}
      onValueChange={onChange}
      errorMessage={errors.country?.message}
    />
  )}
/>
```

### SelectTrigger on its own

For a field that opens something other than an option list — a search sheet, a
map picker — use the trigger directly. `showIndicator={false}` drops the chevron,
which would otherwise promise an inline list:

```tsx
<SelectTrigger
  placeholder={t("template.selectCity")}
  value={selectedCity ? `${selectedCity.name}, ${selectedCity.country_code}` : null}
  errorMessage={errors.city?.message}
  showIndicator={false}
  onPress={onCityPress}
/>
```

This is what `TripDetailsSection` does, and it is why `SelectTrigger` is
exported at all.

## API Reference

### Select

| prop | type | default | description |
| --- | --- | --- | --- |
| `options` | `SelectOption[]` | — | **Required.** The rows to render. |
| `value` | `string \| string[]` | — | Controlled selection. Array in `multiple` mode. |
| `defaultValue` | `string \| string[]` | — | Uncontrolled initial selection. |
| `onValueChange` | `(value: string \| string[]) => void` | — | Fired with the next selection. `string` in `single` mode, `string[]` in `multiple`. |
| `selectionMode` | `"single" \| "multiple"` | `"single"` | `single` closes on select and cannot be emptied. |
| `presentation` | `"popover" \| "bottom-sheet"` | `"popover"` | Where the list appears. |
| `placeholder` | `string` | `t("common.select")` | Shown until something is selected. |
| `label` | `string` | — | Field label above the trigger. |
| `description` | `string` | — | Hint below the field. Hidden while `errorMessage` is set. |
| `errorMessage` | `string` | — | Replaces the description and reddens the border. |
| `listLabel` | `string` | — | Non-interactive heading above the rows. |
| `variant` | `"primary" \| "secondary"` | `"primary"` | Field background. Matches `TextField`. |
| `isRequired` | `boolean` | `false` | Appends a red asterisk to the label. |
| `isInvalid` | `boolean` | `false` | Error styling without a message. |
| `isDisabled` | `boolean` | `false` | Dims the field and blocks opening. |
| `animated` | `boolean` | `true` | Border tint, chevron spring, surface fade. |
| `placement` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | Preferred side. Popover only. |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Alignment along the trigger. Popover only. |
| `offset` | `number` | `8` | Gap between trigger and surface. Popover only. |
| `width` | `number \| "trigger"` | `"trigger"` | Surface width. `"trigger"` matches the measured field. Popover only. |
| `snapPoints` | `(string \| number)[]` | — | Fixed sheet heights. Omit for dynamic sizing. Sheet only. |
| `sheetHeader` | `ReactNode` | — | Rendered in the sheet header; use for a search field. Sheet only. |
| `containerStyle` | `StyleProp<ViewStyle>` | — | Outer wrapper (layout). |
| `fieldStyle` | `StyleProp<ViewStyle>` | — | The field surface (visual). |
| `labelStyle` | `StyleProp<TextStyle>` | — | The label text. |

### SelectOption

| prop | type | default | description |
| --- | --- | --- | --- |
| `value` | `string` | — | **Required.** Unique key; also the selection key. |
| `label` | `string` | — | **Required.** Row text, and what the trigger shows. |
| `description` | `string` | — | Secondary line, up to 2 lines. |
| `Icon` | `ComponentType<SvgProps>` | — | Leading icon. Pass the component, not an element: `Icon: CarIcon`. |
| `isDisabled` | `boolean` | `false` | Dims the row and blocks presses. |

### SelectTrigger

Everything `Select` passes through — `value`, `placeholder`, `label`,
`description`, `errorMessage`, `variant`, `isRequired`, `isInvalid`,
`isDisabled`, `animated`, the three style props — plus:

| prop | type | default | description |
| --- | --- | --- | --- |
| `onPress` | `() => void` | — | **Required.** Fired when the field is pressed. |
| `value` | `string \| null` | — | Already-formatted text. The trigger does no lookup. |
| `isOpen` | `boolean` | `false` | Drives the focus ring and chevron rotation. |
| `showIndicator` | `boolean` | `true` | Set false when the press opens something other than a list. |
| `triggerRef` | `Ref<View>` | — | For measuring. `Select` supplies this. |

## Notes

**The trigger is a `TextField` in every dimension that shows.** `min-height`
48, `radius.field`, a 1px border always reserved so focus does not shift the
layout, `shadows.level1`, `DISABLED_OPACITY`. Those constants are imported from
`TextField/textField.constants.ts` rather than copied — HeroUI drives both from
the same `--color-field-*` / `--radius-field` token family, so they must not
drift.

**`CLEAR_BORDER`, never `"transparent"`.** The border animates via `withTiming`,
which interpolates rgba but not the `transparent` keyword — animating to the
keyword drops the style outright and the border vanishes. Same reason as
`TextField`.

**Error replaces description.** `showDescription = !!description &&
!errorMessage`, and `hasError = isInvalid || !!errorMessage`. A bare `isInvalid`
recolors the description rather than hiding it.

**Portal, not `Modal`.** Same reasoning as `Menu` — see
[its notes](../docs/menu.md#notes). A popover opened from inside a bottom sheet
draws above it because both live in one tree.

**Row geometry matches `.select__item`.** `gap` 8, `paddingHorizontal` 8,
`paddingVertical` 12, and `borderRadius: radius["2xl"]` on the **row**, so a
pressed row's highlight has rounded corners rather than spanning the surface
edge to edge.

**One deliberate deviation from upstream.** HeroUI's `.select__content` uses
`--radius-3xl` (24) for the surface. We use `radius.xl` (20), matching `Menu` —
two floating surfaces of different roundness sitting on the same screen read as
a bug, and `Menu` shipped first.

### Sheet sizing

`BottomSheetList` is virtualised, which needs a bounded height, and only fixed
`snapPoints` provide one. So:

- **With `snapPoints`** — rows render through `BottomSheetList`. Use this for
  long lists (countries, currencies).
- **Without** — the sheet hugs its content and the rows render inline in a
  plain `View`. Correct for a handful of options; do not use it for a hundred.

### Open and close, per presentation

The two presentations drive `isOpen` from opposite directions, which is worth
knowing before editing `Select.tsx`:

| | popover | bottom sheet |
| --- | --- | --- |
| open | `await measure()`, then set state | `sheetRef.present()` |
| close | set state | `sheetRef.dismiss()` |
| what sets `isOpen` | `Select` directly | the sheet's `onChange` |

The sheet stays **mounted** rather than being conditionally rendered. Mounting
it on `isOpen` would leave `sheetRef.current` null on the tick that tries to
present it, so it would never open; and dismissing it would unmount the sheet
mid-animation. Letting `onChange(-1)` flip `isOpen` also keeps the trigger's
open styling for the length of the dismissal, and means a pan-down-to-close
reports the same as a programmatic one.

## Why not compound

HeroUI Native's Select is compound: `Select.Trigger`, `Select.Value`,
`Select.Portal`, `Select.Overlay`, `Select.Content`, `Select.Item`,
`Select.ItemLabel`, `Select.ItemIndicator`. Faithfully porting that shape would
have meant every call site owning ten-plus lines of JSX and a `.map` over
options — conditional rendering pushed into screens, which
[CLAUDE.md](../CLAUDE.md) rules out ("no logic in screens/components").

`Menu` already made this call and this follows it, for the same reasons and with
the same trade-off: full control over per-item rendering is given up in exchange
for a call site that is one prop-set. When an option needs more than a label,
description, and icon, extend `SelectOption` rather than reaching for children.

The one compound-ish seam kept is `SelectTrigger`, exported separately — because
"a field that opens *something*" turned out to be a real, distinct need (see
`TripDetailsSection`) rather than a hypothetical.

## Not ported

- **`presentation="dialog"`** — the centred modal variant, with its swipe-to-
  dismiss gesture. The bottom sheet covers the same need on mobile.
- **`Select.TriggerBackground` / `Select.ContentBackground`** — slots for a
  custom background layer, upstream used mainly for `expo-blur`. Same reason the
  HeroUI glass theme was skipped: it needs a dependency we do not have.
- **`asChild` / `Slot`** — HeroUI's prop-merging escape hatch. Nothing in a
  data-driven API needs it.
- **Mode-conditional value types** (`SelectValueType<M>`, which narrows `value`
  to `SelectOption` or `SelectOption[]` off `selectionMode`). `value` is a plain
  `string | string[]` union here; the conditional generic fights
  `react-hook-form`'s `Controller`, whose `field.value` is untyped at that seam.
  Cast at the call site in `multiple` mode.
- **`width="content-fit"` / `"full"`** — upstream has four width modes. We keep
  the two that mean something in RN: a number, or `"trigger"`.
