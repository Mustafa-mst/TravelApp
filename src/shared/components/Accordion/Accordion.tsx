import { memo, useCallback, useState } from "react";
import { View } from "react-native";

import { styles } from "./Accordion.styles";
import { AccordionRow } from "./AccordionRow";
import { type AccordionProps, type AccordionValue } from "./accordion.types";
import { toKeySet } from "./accordion.utils";

function AccordionComponent({
  items,
  selectionMode = "single",
  collapsible = true,
  defaultValue,
  value: valueProp,
  onValueChange,
  variant = "plain",
  hideSeparator = false,
  disabled = false,
  style,
}: AccordionProps) {
  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState<AccordionValue>(
    defaultValue ?? (selectionMode === "multiple" ? [] : undefined),
  );

  const value = isControlled ? valueProp : internalValue;
  const openKeys = toKeySet(value);
  const isSurface = variant === "surface";

  const handlePress = useCallback(
    (key: string) => {
      const current = isControlled ? valueProp : internalValue;

      let next: AccordionValue;

      if (selectionMode === "single") {
        next = collapsible ? (current === key ? undefined : key) : key;
      } else {
        const list = Array.isArray(current)
          ? current
          : current === undefined
            ? []
            : [current];

        next = collapsible
          ? list.includes(key)
            ? list.filter((item) => item !== key)
            : [...list, key]
          : [...new Set([...list, key])];
      }

      if (!isControlled) {
        setInternalValue(next);
      }
      onValueChange?.(next);
    },
    [
      collapsible,
      internalValue,
      isControlled,
      onValueChange,
      selectionMode,
      valueProp,
    ],
  );

  return (
    <View
      style={[styles.container, isSurface && styles.containerSurface, style]}
    >
      {items.map((item, index) => (
        <View key={item.key}>
          {index > 0 && !hideSeparator ? (
            <View
              style={[
                styles.separator,
                isSurface && styles.separatorSurface,
              ]}
            />
          ) : null}

          <AccordionRow
            item={item}
            isOpen={openKeys.has(item.key)}
            isSurface={isSurface}
            isDisabled={disabled || !!item.disabled}
            onPress={handlePress}
          />
        </View>
      ))}
    </View>
  );
}

export const Accordion = memo(AccordionComponent);
