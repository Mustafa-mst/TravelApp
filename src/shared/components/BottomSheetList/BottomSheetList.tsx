import { Keyboard, View } from "react-native";
import type { FlatListProps } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import { styles } from "./BottomSheetList.styles";

export type BottomSheetListProps<ItemT> = FlatListProps<ItemT>;

export function BottomSheetList<ItemT>({
  style,
  contentContainerStyle,
  onScrollBeginDrag,
  ...listProps
}: BottomSheetListProps<ItemT>) {
  return (
    <View style={[styles.card, styles.cardFill]}>
      <BottomSheetFlatList
        style={[styles.list, style]}
        contentContainerStyle={[styles.content, contentContainerStyle]}
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
    </View>
  );
}
