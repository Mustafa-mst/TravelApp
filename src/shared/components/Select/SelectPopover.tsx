import { memo } from "react";
import { Pressable, ScrollView, View, type LayoutChangeEvent } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useTranslation } from "react-i18next";

import { useStyles } from "@shared/hooks";
import { Portal } from "../Portal";
import { Text } from "../Text";
import { selectStyles } from "./Select.styles";
import { SELECT_ENTER_MS, SELECT_EXIT_MS } from "./select.constants";
import { SelectOptionRow } from "./SelectOptionRow";
import { SelectSearchField } from "./SelectSearchField";
import type { SelectOption } from "./select.types";

const noop = () => {};

type SelectPopoverPosition = {
  top: number;
  left: number;
  width?: number;
  maxWidth: number;
  maxHeight?: number;
  isMeasured: boolean;
};

type SelectPopoverProps = {
  options: SelectOption[];
  listLabel?: string;
  position: SelectPopoverPosition;
  animated: boolean;
  isSearchable?: boolean;
  searchValue?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;
  emptyMessage?: string;
  isSelected: (value: string) => boolean;
  onSelect: (option: SelectOption) => void;
  onDismiss: () => void;
  onLayout: (event: LayoutChangeEvent) => void;
};

function SelectPopoverComponent({
  options,
  listLabel,
  position,
  animated,
  isSearchable = false,
  searchValue = "",
  onSearchChange,
  searchPlaceholder,
  emptyMessage,
  isSelected,
  onSelect,
  onDismiss,
  onLayout,
}: SelectPopoverProps) {
  const { t } = useTranslation();
  const styles = useStyles(selectStyles);

  return (
    <Portal>
      <Pressable style={styles.backdrop} onPress={onDismiss} />
      {/* Position and pre-measure visibility live on the plain wrapper; the
          layout animation owns opacity on the inner view alone. */}
      <View
        onLayout={onLayout}
        style={[
          styles.position,
          {
            top: position.top,
            left: position.left,
            maxWidth: position.maxWidth,
            maxHeight: position.maxHeight,
            opacity: position.isMeasured ? 1 : 0,
          },
          position.width ? { width: position.width } : null,
        ]}
      >
        <Animated.View
          entering={animated ? FadeIn.duration(SELECT_ENTER_MS) : undefined}
          exiting={animated ? FadeOut.duration(SELECT_EXIT_MS) : undefined}
          style={styles.surface}
        >
          {listLabel ? (
            <View style={styles.listLabel}>
              <Text variant="bodyMedium" color="muted">
                {listLabel}
              </Text>
            </View>
          ) : null}

          {/* Outside the scroller, so it stays put as the list moves. */}
          {isSearchable ? (
            <SelectSearchField
              value={searchValue}
              onChangeText={onSearchChange ?? noop}
              placeholder={searchPlaceholder}
            />
          ) : null}

          {options.length ? (
            <ScrollView
              bounces={false}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {options.map((option) => (
                <SelectOptionRow
                  key={option.value}
                  option={option}
                  isSelected={isSelected(option.value)}
                  onPress={onSelect}
                />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.empty}>
              <Text variant="body" color="muted">
                {emptyMessage ?? t("common.noResults")}
              </Text>
            </View>
          )}
        </Animated.View>
      </View>
    </Portal>
  );
}

export const SelectPopover = memo(SelectPopoverComponent);
