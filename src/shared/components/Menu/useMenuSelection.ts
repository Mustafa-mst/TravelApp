import { useCallback, useState } from "react";

import type { MenuSelectionMode } from "./menu.types";

type UseMenuSelectionParams = {
  selectionMode: MenuSelectionMode;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
};

export function useMenuSelection({
  selectionMode,
  selectedKeys,
  defaultSelectedKeys,
  onSelectionChange,
}: UseMenuSelectionParams) {
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

  return { isSelected, toggle };
}
