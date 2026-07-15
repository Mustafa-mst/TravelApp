import { type ComponentType, memo, useMemo } from "react";
import { View } from "react-native";
import { type SvgProps } from "react-native-svg";
import { useTranslation } from "react-i18next";
import type { ParseKeys } from "i18next";
import { useFrontLayer } from "react-native-layer-stack";

import { PressableScale, Text } from "@shared/components";
import type { BackTarget } from "@shared/navigation";
import { colors } from "@shared/styles";
import {
  BookmarkIcon,
  CalendarMonthIcon,
  CurrencyIcon,
  FavoriteIcon,
  PlusIcon,
} from "@shared/assets/icons";
import { styles } from "./CategoryGrid.styles";

export type CategoryGridItem = {
  id: string;
  labelKey: ParseKeys;
  Icon: ComponentType<SvgProps>;
  onPress?: () => void;
};

const MAX_VISIBLE = 7;

const DEFAULT_ITEMS: CategoryGridItem[] = [
  { id: "exchange", labelKey: "home.grid.exchange", Icon: CurrencyIcon },
  { id: "events", labelKey: "home.grid.events", Icon: CalendarMonthIcon },
  { id: "saved", labelKey: "home.grid.saved", Icon: BookmarkIcon },
  { id: "favorites", labelKey: "home.grid.favorites", Icon: FavoriteIcon },
];

export type CategoryGridProps = {
  items?: CategoryGridItem[];
  onMorePress?: () => void;
};

function CategoryGridComponent({
  items = DEFAULT_ITEMS,
  onMorePress,
}: CategoryGridProps) {
  const { t } = useTranslation();
  const { open } = useFrontLayer<BackTarget>();

  // Wire default tiles that open a back layer (e.g. Exchange) unless the caller
  // provided its own items with explicit handlers.
  const resolvedItems = useMemo(
    () =>
      items.map((item) =>
        item.id === "exchange" && !item.onPress
          ? { ...item, onPress: () => open({ target: "exchange" }) }
          : item,
      ),
    [items, open],
  );

  const visible = resolvedItems.slice(0, MAX_VISIBLE);
  const remaining = resolvedItems.length - visible.length;

  return (
    <View style={styles.card}>
      <View style={styles.grid}>
        {visible.map((item) => (
          <PressableScale
            key={item.id}
            containerStyle={styles.tileContainer}
            style={styles.tile}
            onPress={item.onPress}
          >
            <View style={styles.iconBox}>
              <item.Icon width={24} height={24} color={colors.primary} />
            </View>
            <Text style={styles.label} numberOfLines={1}>
              {t(item.labelKey)}
            </Text>
          </PressableScale>
        ))}

        {remaining > 0 && (
          <PressableScale
            containerStyle={styles.tileContainer}
            style={styles.tile}
            onPress={onMorePress}
          >
            <View style={styles.iconBox}>
              <PlusIcon width={24} height={24} color={colors.primary} />
            </View>
            <Text style={styles.label} numberOfLines={1}>
              {t("home.grid.more", { count: remaining })}
            </Text>
          </PressableScale>
        )}
      </View>
    </View>
  );
}

export const CategoryGrid = memo(CategoryGridComponent);
