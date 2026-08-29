import { memo, useCallback, useState } from "react";
import { Pressable, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { useAnchorRect, useOptionSelection, useStyles } from "@shared/hooks";
import { Portal } from "../Portal";
import { Text } from "../Text";
import { menuStyles } from "./Menu.styles";
import {
  MENU_ENTER_MS,
  MENU_EXIT_MS,
  MENU_MIN_WIDTH,
  MENU_OFFSET,
  MENU_SCREEN_PADDING,
} from "./menu.constants";
import { MenuItemRow } from "./MenuItemRow";
import { MenuSubMenu } from "./MenuSubMenu";
import type { MenuItem, MenuProps } from "./menu.types";

function MenuComponent({
  items,
  trigger,
  onSelect,
  selectionMode = "none",
  selectedKeys,
  defaultSelectedKeys,
  onSelectionChange,
  indicator = "checkmark",
  placement = "bottom",
  align = "center",
  offset = MENU_OFFSET,
  alignOffset = 0,
  width,
  label,
  closeOnSelect = true,
  animated = true,
  isDisabled = false,
  style,
}: MenuProps) {
  const styles = useStyles(menuStyles);
  const [isOpen, setIsOpen] = useState(false);

  const { triggerRef, measure, position, setContentHeight } = useAnchorRect({
    placement,
    align,
    offset,
    alignOffset,
    minWidth: MENU_MIN_WIDTH,
    screenPadding: MENU_SCREEN_PADDING,
    width,
  });
  const { isSelected, toggle } = useOptionSelection({
    selectionMode,
    selectedKeys,
    defaultSelectedKeys,
    onSelectionChange,
  });

  const open = useCallback(async () => {
    await measure();
    setIsOpen(true);
  }, [measure]);

  // The rect is left in place so the exit animation still has a position to
  // animate from; `open` re-measures anyway.
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSelect = useCallback(
    (item: MenuItem) => {
      toggle(item.id);
      onSelect?.(item);
      if (closeOnSelect) {
        close();
      }
    },
    [close, closeOnSelect, onSelect, toggle],
  );

  const showIndicator = selectionMode !== "none";

  return (
    <>
      {/* Capture phase: triggers are usually Buttons with their own
          Pressable, which would otherwise swallow the touch. */}
      <View
        ref={triggerRef}
        collapsable={false}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen, disabled: isDisabled }}
        onStartShouldSetResponderCapture={() => !isDisabled}
        onResponderRelease={open}
      >
        {trigger}
      </View>

      {isOpen && position ? (
        <Portal>
          <Pressable style={styles.backdrop} onPress={close} />
          {/* Position and pre-measure visibility live on the plain wrapper;
              the layout animation owns opacity on the inner view alone. */}
          <View
            onLayout={(event) =>
              setContentHeight(event.nativeEvent.layout.height)
            }
            style={[
              styles.position,
              {
                top: position.top,
                left: position.left,
                maxWidth: position.maxWidth,
                opacity: position.isMeasured ? 1 : 0,
              },
              position.width ? { width: position.width } : null,
            ]}
          >
            {/* maxHeight goes on the surface, which owns the overflow clip.
                It is undefined during the measuring pass, so onLayout above
                reports the natural height rather than the clipped one. */}
            <Animated.View
              entering={animated ? FadeIn.duration(MENU_ENTER_MS) : undefined}
              exiting={animated ? FadeOut.duration(MENU_EXIT_MS) : undefined}
              style={[styles.surface, { maxHeight: position.maxHeight }, style]}
            >
              {label ? (
                <View style={styles.label}>
                  <Text variant="captionMedium" color="muted">
                    {label}
                  </Text>
                </View>
              ) : null}

              {items.map((item) =>
                item.children?.length ? (
                  <MenuSubMenu
                    key={item.id}
                    item={item}
                    indicator={indicator}
                    showIndicator={showIndicator}
                    isItemSelected={isSelected}
                    onSelectItem={handleSelect}
                  />
                ) : (
                  <MenuItemRow
                    key={item.id}
                    item={item}
                    isSelected={isSelected(item.id)}
                    showIndicator={showIndicator}
                    indicator={indicator}
                    onPress={handleSelect}
                  />
                ),
              )}
            </Animated.View>
          </View>
        </Portal>
      ) : null}
    </>
  );
}

export const Menu = memo(MenuComponent);
