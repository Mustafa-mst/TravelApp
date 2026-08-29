import { memo } from "react";
import { View } from "react-native";

import { CheckIcon } from "@shared/assets/icons";
import { useStyles, useThemeColors } from "@shared/hooks";
import { PressableScale } from "../PressableScale";
import { Text } from "../Text";
import { menuItemVariants, menuStyles } from "./Menu.styles";
import {
  MENU_ICON_SIZE,
  MENU_INDICATOR_SIZE,
  MENU_PRESS_SCALE,
} from "./menu.constants";
import type { MenuIndicator, MenuItem } from "./menu.types";

type MenuItemRowProps = {
  item: MenuItem;
  isSelected: boolean;
  showIndicator: boolean;
  indicator: MenuIndicator;
  isNested?: boolean;
  onPress: (item: MenuItem) => void;
};

function MenuItemRowComponent({
  item,
  isSelected,
  showIndicator,
  indicator,
  isNested = false,
  onPress,
}: MenuItemRowProps) {
  const styles = useStyles(menuStyles);
  const colors = useThemeColors();

  const palette = menuItemVariants[item.variant ?? "default"];

  return (
    <PressableScale
      scaleTo={isNested ? 1 : MENU_PRESS_SCALE}
      activeOpacity={1}
      accessibilityRole="menuitem"
      accessibilityState={{ selected: isSelected, disabled: item.isDisabled }}
      disabled={item.isDisabled}
      containerStyle={styles.rowContainer}
      style={[styles.row, item.isDisabled && styles.disabled]}
      pressedStyle={styles.rowPressed}
      onPress={() => onPress(item)}
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

      {showIndicator ? (
        <View style={[styles.indicatorSlot, { width: MENU_INDICATOR_SIZE }]}>
          {isSelected ? (
            indicator === "dot" ? (
              <View style={styles.dot} />
            ) : (
              <CheckIcon
                width={MENU_INDICATOR_SIZE}
                height={MENU_INDICATOR_SIZE}
                color={colors.accent}
              />
            )
          ) : null}
        </View>
      ) : null}
    </PressableScale>
  );
}

export const MenuItemRow = memo(MenuItemRowComponent);
