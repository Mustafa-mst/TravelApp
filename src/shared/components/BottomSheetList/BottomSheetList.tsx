import { Keyboard } from "react-native";
import type { FlatListProps } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import { useStyles } from "@shared/hooks";
import { bottomSheetListStyles } from "./BottomSheetList.styles";

export type BottomSheetListProps<ItemT> = FlatListProps<ItemT>;

/** A sheet-aware FlatList: keyboard and virtualisation defaults, no styling. */
export function BottomSheetList<ItemT>({
  style,
  onScrollBeginDrag,
  ...listProps
}: BottomSheetListProps<ItemT>) {
  const styles = useStyles(bottomSheetListStyles);

  return (
    <BottomSheetFlatList
      style={[styles.list, style]}
      initialNumToRender={12}
      windowSize={7}
      keyboardShouldPersistTaps="always"
      keyboardDismissMode="on-drag"
      {...listProps}
      onScrollBeginDrag={(event) => {
        Keyboard.dismiss();
        onScrollBeginDrag?.(event);
      }}
    />
  );
}
