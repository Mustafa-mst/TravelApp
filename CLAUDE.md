# myApp

Expo (SDK 56) + React Native 0.85 travel app. TypeScript strict. Supabase backend, TanStack Query for server state, Zustand for client state, MapLibre for maps, i18next (en/tr).

## Commands

```bash
yarn start          # Expo dev server
yarn ios            # expo run:ios
yarn android        # expo run:android
yarn types:db       # regenerate src/shared/services/supabase/database.types.ts
npx tsc --noEmit    # typecheck
```

No test runner, no linter configured. Typecheck is the gate.

## Structure

```
src/
  features/<feature>/     home, search, country, trip, exchange, places, routes, auth, dashboard
    components/<Name>/    Name.tsx + Name.styles.ts + index.ts
    screens/<Name>Screen/ same triple
    hooks/query/          useXQuery + query keys
    hooks/mutation/       useXMutation
    hooks/                view-model hooks (useTripDetail, useCountrySearch, ...)
    services/             Supabase / REST calls
    schemas/              zod
    types/ utils/ constants/ navigation/ store/
    index.ts              public API
  shared/
    components/           design system (Button, Text, Card, BottomSheet, MapView, StateView, ...)
    styles/               colors, typography, spacing, radius, shadows
    navigation/ providers/ services/ hooks/ i18n/ assets/ types/ utils/ constants/
```

Aliases: `@/*` → `src/*`, `@shared/*` → `src/shared/*`.

## Non-negotiables

**No logic in screens/components.** A screen wires props to JSX. Every piece of state, derivation, effect, and handler lives in a hook. `SearchScreen.tsx` is the reference: it destructures one `useCountrySearch()` call and renders. `TripDetailScreen` is the ceiling of acceptable complexity — a few `??` fallbacks, nothing more.

**No complex logic anywhere.** Small named functions, early returns, one job each. If a hook grows branches, split it (`useTripDetail` / `useTripDetailActions` / `useTripMapData`). If a service grows conditionals, split it (`templateDiscovery` / `templateWrite` / `tripDetail`).

**No long comment blocks.** Comment only what the code can't say — a non-obvious constraint or a "why". One or two lines, above the thing. Never narrate what the next line does. Never add file-header or section-banner comments.

**No inline styles.** Every style goes in the sibling `*.styles.ts` via `StyleSheet.create`. Dynamic values only (`{ backgroundColor }`) are allowed inline.

**No hardcoded values.** Colors, sizes, spacing, radii come from `@shared/styles`. User-facing strings come from `t()`. Magic numbers become named constants (`const FIVE_MINUTES_IN_MS = 1000 * 60 * 5`).

**No deep imports across features.** Import from `@/features/x`, never `@/features/x/hooks/query/...`. Inside a feature use relative paths (`../../components`, `./query`).

## Conventions

**Components**

```tsx
function ButtonComponent({ label, type = 'primary', ...rest }: ButtonProps) { ... }
export const Button = memo(ButtonComponent);
```

- `type` for props, never `interface`. Named `XProps`.
- Default via destructuring, not `defaultProps`.
- `memo` on reusable/list components; plain export is fine for one-off sections.
- Variants are a union of string literals mapped through a lookup object in the styles file (see `buttonColors`), not if/else chains.

**Styles**

```ts
export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background, padding: spacing.md },
});
```

Compose arrays for conditionals: `style={[styles.base, isActive && styles.active]}`.

**Data**

- Query keys in a `xKeys` object (`templateKeys`, `tripKeys`) with `all` at the root so a mutation can invalidate the tree.
- Query hook = key + `queryFn` + `enabled` + `staleTime`. Nothing else.
- Supabase access lives in `services/`, never in a component or screen. Services throw on `error` and return typed rows.
- Mutations invalidate in `onSuccess`.
- Loading/error/empty rendering goes through `<StateView>`, not ad-hoc ternaries.

**Types** come from `database.types.ts` where the data is a DB row. Regenerate rather than hand-write.

**Forms**: react-hook-form + zod via `@hookform/resolvers`. Schemas in `schemas/`, error messages through `i18n.t()`.

**Navigation**: types in `@shared/navigation/types.ts`. `RootNavigator` renders `LayerStack` (front stack + back layers for exchange/create-template). Screens are registered in `FrontNavigator` / `TabNavigator` / feature navigators.

**Icons**: drop the `.svg` into `shared/assets/icons/`, export it as `XIcon` from `icons/index.ts`. They accept a `color` prop.

**Barrels**: every folder has an `index.ts`. A feature's root `index.ts` is its contract — export only what other features may use.

## When adding a feature

1. `src/features/<name>/` with the folder layout above.
2. Service → query/mutation hook → view-model hook → screen.
3. Register the route in `@shared/navigation/types.ts` and the right navigator.
4. Add both `en` and `tr` locale keys.
5. Export the screen from the feature's `index.ts`.
