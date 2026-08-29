import { memo, useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { LayoutChangeEvent } from "react-native";

import { useAnchorRect, useOptionSelection } from "@shared/hooks";
import type { BottomSheet as BottomSheetRef } from "../BottomSheet";
import {
  SELECT_MIN_WIDTH,
  SELECT_OFFSET,
  SELECT_SCREEN_PADDING,
  SELECT_VALUE_SEPARATOR,
} from "./select.constants";
import { SelectPopover } from "./SelectPopover";
import { SelectSheet } from "./SelectSheet";
import { SelectTrigger } from "./SelectTrigger";
import type { SelectOption, SelectProps } from "./select.types";

const toKeys = (value?: string | string[]) => {
  if (value === undefined) {
    return undefined;
  }
  return Array.isArray(value) ? value : [value];
};

function SelectComponent({
  options,
  value,
  defaultValue,
  onValueChange,
  selectionMode = "single",
  presentation = "popover",
  placeholder,
  label,
  description,
  errorMessage,
  listLabel,
  variant = "primary",
  isRequired = false,
  isInvalid = false,
  isDisabled = false,
  animated = true,
  isSearchable = false,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  emptyMessage,
  placement = "bottom",
  align = "start",
  offset = SELECT_OFFSET,
  width = "trigger",
  snapPoints,
  sheetHeader,
  containerStyle,
  fieldStyle,
  labelStyle,
}: SelectProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const sheetRef = useRef<BottomSheetRef>(null);

  const isPopover = presentation === "popover";

  const { triggerRef, measure, position, setContentHeight } = useAnchorRect({
    placement,
    align,
    offset,
    alignOffset: 0,
    minWidth: SELECT_MIN_WIDTH,
    screenPadding: SELECT_SCREEN_PADDING,
    width,
  });

  const handleSelectionChange = useCallback(
    (next: string[]) => {
      // Single mode never empties — useOptionSelection replaces rather than
      // toggles — so the first key is always there to unwrap.
      onValueChange?.(selectionMode === "single" ? next[0] : next);
    },
    [onValueChange, selectionMode],
  );

  const { keys, isSelected, toggle } = useOptionSelection({
    selectionMode,
    selectedKeys: toKeys(value),
    defaultSelectedKeys: toKeys(defaultValue),
    onSelectionChange: handleSelectionChange,
  });

  const open = useCallback(async () => {
    if (isPopover) {
      await measure();
      setIsOpen(true);
      return;
    }
    // The sheet stays mounted, so the ref is live before the state settles.
    sheetRef.current?.present();
  }, [isPopover, measure]);

  // The rect is left in place so the exit animation still has a position to
  // animate from; `open` re-measures anyway.
  const close = useCallback(() => {
    if (isPopover) {
      setIsOpen(false);
      // The query lives with the caller, but only the surface knows it closed —
      // without this it reopens still filtered by the last search.
      onSearchChange?.("");
      return;
    }
    // onChange(-1) flips isOpen once the dismissal finishes, so the trigger
    // keeps its open styling for the length of the animation.
    sheetRef.current?.dismiss();
  }, [isPopover, onSearchChange]);

  const handleSheetChange = useCallback(
    (index: number) => {
      setIsOpen(index !== -1);
      if (index === -1) {
        onSearchChange?.("");
      }
    },
    [onSearchChange],
  );

  const handleSelect = useCallback(
    (option: SelectOption) => {
      toggle(option.value);
      if (selectionMode === "single") {
        close();
      }
    },
    [close, selectionMode, toggle],
  );

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      setContentHeight(event.nativeEvent.layout.height);
    },
    [setContentHeight],
  );

  const selectedLabel = useMemo(() => {
    const labels = options
      .filter((option) => keys.includes(option.value))
      .map((option) => option.label);
    return labels.length ? labels.join(SELECT_VALUE_SEPARATOR) : null;
  }, [keys, options]);

  const trigger = (
    <SelectTrigger
      triggerRef={triggerRef}
      value={selectedLabel}
      placeholder={placeholder ?? t("common.select")}
      label={label}
      description={description}
      errorMessage={errorMessage}
      variant={variant}
      isOpen={isOpen}
      isRequired={isRequired}
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      animated={animated}
      onPress={open}
      containerStyle={containerStyle}
      fieldStyle={fieldStyle}
      labelStyle={labelStyle}
    />
  );

  if (!isPopover) {
    return (
      <>
        {trigger}
        <SelectSheet
          ref={sheetRef}
          options={options}
          listLabel={listLabel}
          header={sheetHeader}
          snapPoints={snapPoints}
          isSearchable={isSearchable}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          searchPlaceholder={searchPlaceholder}
          emptyMessage={emptyMessage}
          isSelected={isSelected}
          onSelect={handleSelect}
          onChange={handleSheetChange}
        />
      </>
    );
  }

  return (
    <>
      {trigger}
      {isOpen && position ? (
        <SelectPopover
          options={options}
          listLabel={listLabel}
          position={position}
          animated={animated}
          isSearchable={isSearchable}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          searchPlaceholder={searchPlaceholder}
          emptyMessage={emptyMessage}
          isSelected={isSelected}
          onSelect={handleSelect}
          onDismiss={close}
          onLayout={handleLayout}
        />
      ) : null}
    </>
  );
}

export const Select = memo(SelectComponent);
