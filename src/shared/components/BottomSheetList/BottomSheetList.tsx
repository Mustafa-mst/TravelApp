import { Platform, useWindowDimensions, View } from "react-native";
import type { FlatListProps } from "react-native";
import { BottomSheetFlatList } from "@expo/ui/community/bottom-sheet";

import { styles } from "./BottomSheetList.styles";

export type BottomSheetListProps<ItemT> = {
  heightFraction?: number;
} & FlatListProps<ItemT>;

export function BottomSheetList<ItemT>({
  heightFraction = 0.66,
  style,
  contentContainerStyle,
  ...listProps
}: BottomSheetListProps<ItemT>) {
  const { height: windowHeight } = useWindowDimensions();
  const cardSizing =
    Platform.OS === "android"
      ? { height: Math.round(windowHeight * heightFraction) }
      : styles.cardFill;

  return (
    <View style={[styles.card, cardSizing]}>
      <BottomSheetFlatList
        style={[styles.list, style]}
        contentContainerStyle={[styles.content, contentContainerStyle]}
        initialNumToRender={12}
        windowSize={7}
        removeClippedSubviews
        {...listProps}
      />
    </View>
  );
}
