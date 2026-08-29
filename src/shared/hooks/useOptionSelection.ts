import { useCallback, useState } from "react";

import type { SelectionMode } from "@shared/types";

type UseOptionSelectionParams = {
  selectionMode: SelectionMode;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
};

export function useOptionSelection({
  selectionMode,
  selectedKeys,
  defaultSelectedKeys,
  onSelectionChange,
}: UseOptionSelectionParams) {
  const isControlled = selectedKeys !== undefined;
  const [internalKeys, setInternalKeys] = useState<string[]>(
    defaultSelectedKeys ?? [],
  );

  const keys = isControlled ? selectedKeys : internalKeys;

  const toggle = useCallback(
    (id: string) => {
      if (selectionMode === "none") {
        return;
      }

      const current = isControlled ? (selectedKeys ?? []) : internalKeys;
      const next =
        selectionMode === "single"
          ? [id]
          : current.includes(id)
            ? current.filter((key) => key !== id)
            : [...current, id];

      if (!isControlled) {
        setInternalKeys(next);
      }
      onSelectionChange?.(next);
    },
    [
      internalKeys,
      isControlled,
      onSelectionChange,
      selectedKeys,
      selectionMode,
    ],
  );

  const isSelected = useCallback((id: string) => keys.includes(id), [keys]);

  return { keys, isSelected, toggle };
}
