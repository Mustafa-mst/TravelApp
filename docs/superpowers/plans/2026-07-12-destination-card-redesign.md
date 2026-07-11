# DestinationCard Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign `DestinationCard` to a clean Qantas-style card (image on top, white body below, accent category badge overlaid on the image) driven by our brand colors.

**Architecture:** Rewrite the presentational `DestinationCard` component and its styles; thread a new optional `category` label from `HomeScreen` → `CategorySection` → `DestinationCard`. No data-model or query changes.

**Tech Stack:** React Native, expo-image, TypeScript. Shared design tokens from `@shared/styles` (`colors`, `spacing`, `radius`, `shadows`). Shared `Text` component from `@shared/components`.

## Global Constraints

- Use design tokens only — no hardcoded colors/sizes except where the existing file already does (e.g. numeric `gap`).
- Primary accent color for subtitle: `colors.primary` (`#0E7C66`). Category badge background: `colors.accent` (`#FF3830`), text `colors.white`.
- Card sizing logic (`CARDS_PER_SCREEN`, `useWindowDimensions`) is preserved verbatim.
- No component test framework exists in this repo; verification is visual via running the app.
- Do not add a `Co-Authored-By: Claude` trailer to commits (user preference).

---

### Task 1: Rewrite DestinationCard component + styles

**Files:**
- Modify: `src/features/home/components/DestinationCard/DestinationCard.tsx`
- Modify: `src/features/home/components/DestinationCard/DestinationCard.styles.ts`

**Interfaces:**
- Consumes: `colors`, `spacing`, `radius`, `shadows` from `@shared/styles`; `Text` from `@shared/components`; `Image` from `expo-image`.
- Produces: `DestinationCard` component and `DestinationCardProps` type:
  ```ts
  type DestinationCardProps = {
    title: string;
    location: string;
    image: ImageSource | string;
    category?: string;
    onPress?: () => void;
  };
  ```

- [ ] **Step 1: Replace the styles file**

Write `src/features/home/components/DestinationCard/DestinationCard.styles.ts`:

```ts
import { StyleSheet } from "react-native";
import { colors, radius, shadows, spacing } from "@shared/styles";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    overflow: "hidden",
    ...shadows.level2,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },

  image: {
    width: "100%",
    aspectRatio: 4 / 3,
  },
  badge: {
    position: "absolute",
    top: spacing.sm,
    left: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.accent,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
    backgroundColor: colors.white,
  },

  body: {
    padding: spacing.md,
    gap: spacing.xs,
  },
});
```

- [ ] **Step 2: Replace the component file**

Write `src/features/home/components/DestinationCard/DestinationCard.tsx`:

```tsx
import { Image, type ImageSource } from "expo-image";
import { memo } from "react";
import { Pressable, useWindowDimensions, View } from "react-native";

import { Text } from "@shared/components";
import { spacing } from "@shared/styles";
import { styles } from "./DestinationCard.styles";

const CARDS_PER_SCREEN = 1.1;

export type DestinationCardProps = {
  title: string;
  location: string;
  image: ImageSource | string;
  category?: string;
  onPress?: () => void;
};

function DestinationCardComponent({
  title,
  location,
  image,
  category,
  onPress,
}: DestinationCardProps) {
  const { width } = useWindowDimensions();
  const cardWidth =
    (width - spacing.md * 2 - spacing.md * (CARDS_PER_SCREEN - 1)) /
    CARDS_PER_SCREEN;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { width: cardWidth },
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
    >
      <View>
        <Image source={image} style={styles.image} contentFit="cover" />
        {category ? (
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text variant="caption" color="white" numberOfLines={1}>
              {category}
            </Text>
          </View>
        ) : null}
      </View>
      <View style={styles.body}>
        <Text variant="h6" color="text" numberOfLines={2}>
          {title}
        </Text>
        <Text variant="bodyMedium" color="primary" numberOfLines={1}>
          {location}
        </Text>
      </View>
    </Pressable>
  );
}

export const DestinationCard = memo(DestinationCardComponent);
```

- [ ] **Step 3: Typecheck**

Run: `cd /Users/mustafa.gulay/Desktop/projects/myApp && yarn tsc --noEmit`
Expected: PASS (no errors in DestinationCard files). If the script name differs, use the project's typecheck command.

- [ ] **Step 4: Commit**

```bash
git add src/features/home/components/DestinationCard/
git commit -m "Redesign DestinationCard to clean image-top card with accent category badge"
```

---

### Task 2: Thread category label through CategorySection and HomeScreen

**Files:**
- Modify: `src/features/home/components/CategorySection/CategorySection.tsx`
- Modify: `src/features/home/screens/HomeScreen/HomeScreen.tsx:45`

**Interfaces:**
- Consumes: `DestinationCardProps.category` from Task 1.
- Produces: `CategorySectionProps` gains `categoryLabel?: string`:
  ```ts
  type CategorySectionProps = {
    items: CategoryItem[];
    categoryLabel?: string;
  };
  ```

- [ ] **Step 1: Add `categoryLabel` prop to CategorySection**

In `src/features/home/components/CategorySection/CategorySection.tsx`, update the props type and destructuring, and pass `category` to `DestinationCard`.

Replace:
```tsx
export type CategorySectionProps = {
  items: CategoryItem[];
};

function CategorySectionComponent({ items }: CategorySectionProps) {
```
with:
```tsx
export type CategorySectionProps = {
  items: CategoryItem[];
  categoryLabel?: string;
};

function CategorySectionComponent({ items, categoryLabel }: CategorySectionProps) {
```

Replace the `renderItem` `DestinationCard` block:
```tsx
          <DestinationCard
            title={item.title}
            location={item.subtitle}
            image={item.image_url}
          />
```
with:
```tsx
          <DestinationCard
            title={item.title}
            location={item.subtitle}
            image={item.image_url}
            category={categoryLabel}
          />
```

- [ ] **Step 2: Pass `categoryLabel` from HomeScreen**

In `src/features/home/screens/HomeScreen/HomeScreen.tsx`, replace line 45:
```tsx
        {category && <CategorySection items={category.category_items ?? []} />}
```
with:
```tsx
        {category && (
          <CategorySection
            items={category.category_items ?? []}
            categoryLabel={category.category}
          />
        )}
```

- [ ] **Step 3: Typecheck**

Run: `cd /Users/mustafa.gulay/Desktop/projects/myApp && yarn tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/features/home/components/CategorySection/CategorySection.tsx src/features/home/screens/HomeScreen/HomeScreen.tsx
git commit -m "Pass category label through CategorySection to DestinationCard badge"
```

---

## Verification (after both tasks)

Run the app and open the Home screen. Confirm:
- Category section cards show image on top with rounded top corners, white body below.
- Title in dark text (h6, up to 2 lines), subtitle in teal (`primary`) below it.
- An accent (`#FF3830`) badge with a white dot + category text sits in the image's
  top-left corner.
- Cards scroll horizontally; press gives the slight scale/opacity feedback.
