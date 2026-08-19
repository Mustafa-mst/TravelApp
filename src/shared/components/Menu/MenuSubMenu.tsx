import { memo } from "react";
import { View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { ChevronRightIcon } from "@shared/assets/icons";
import { useStyles, useThemeColors } from "@shared/hooks";
import { PressableScale } from "../PressableScale";
import { Text } from "../Text";
import { menuItemVariants, menuStyles } from "./Menu.styles";
import {
  MENU_CHEVRON_SIZE,
  MENU_ICON_SIZE,
  MENU_PRESS_SCALE,
  SUBMENU_CHEVRON_ROTATION,
  SUBMENU_SPRING,
} from "./menu.constants";
import { MenuItemRow } from "./MenuItemRow";
import type { MenuIndicator, MenuItem } from "./menu.types";

type MenuSubMenuProps = {
  item: MenuItem;
  indicator: MenuIndicator;
  showIndicator: boolean;
  isItemSelected: (id: string) => boolean;
  onSelectItem: (item: MenuItem) => void;
};

function MenuSubMenuComponent({
  item,
  indicator,
  showIndicator,
  isItemSelected,
  onSelectItem,
}: MenuSubMenuProps) {
  const styles = useStyles(menuStyles);
  const colors = useThemeColors();

  const progress = useSharedValue(0);
  const measured = useSharedValue(0);

  const toggle = () => {
    progress.value = withSpring(progress.value > 0.5 ? 0 : 1, SUBMENU_SPRING);
  };

  const contentStyle = useAnimatedStyle(() => ({
    height: progress.value * measured.value,
  }));

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(progress.value, [0, 1], SUBMENU_CHEVRON_ROTATION)}deg`,
      },
    ],
  }));

  const palette = menuItemVariants[item.variant ?? "default"];

  return (
    <View style={item.isDisabled ? styles.disabled : null}>
      <PressableScale
        scaleTo={MENU_PRESS_SCALE}
        activeOpacity={1}
        accessibilityRole="button"
        accessibilityState={{ disabled: item.isDisabled }}
        disabled={item.isDisabled}
        style={styles.row}
        pressedStyle={styles.rowPressed}
        onPress={toggle}
      >
        {item.Icon ? (
          <item.Icon
            width={MENU_ICON_SIZE}
            height={MENU_ICON_SIZE}
            color={colors[palette.icon]}
          />
        ) : null}

        <View style={styles.rowContent}>
          <Text variant="bodyLargeMedium" color={palette.label}>
            {item.label}
          </Text>
          {item.description ? (
            <Text variant="body" color="muted" numberOfLines={2}>
              {item.description}
            </Text>
          ) : null}
        </View>

        <Animated.View style={chevronStyle}>
          <ChevronRightIcon
            width={MENU_CHEVRON_SIZE}
            height={MENU_CHEVRON_SIZE}
            color={colors.muted}
          />
        </Animated.View>
      </PressableScale>

      <Animated.View style={[styles.submenu, contentStyle]}>
        <View
          style={styles.submenuMeasure}
          onLayout={(event) => {
            measured.value = event.nativeEvent.layout.height;
          }}
        >
          <View style={styles.submenuInner}>
            {item.children?.map((child) => (
              <MenuItemRow
                key={child.id}
                item={child}
                isSelected={isItemSelected(child.id)}
                showIndicator={showIndicator}
                indicator={indicator}
                isNested
                onPress={onSelectItem}
              />
            ))}
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

export const MenuSubMenu = memo(MenuSubMenuComponent);
