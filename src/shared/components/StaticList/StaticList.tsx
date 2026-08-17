import { Fragment, memo } from "react";
import type { ComponentType, ReactNode } from "react";
import { ScrollView, View } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";

import { styles } from "./StaticList.styles";

export type StaticListProps<ItemT> = {
  data: ReadonlyArray<ItemT>;
  renderItem: (info: { item: ItemT; index: number }) => ReactNode;
  keyExtractor?: (item: ItemT, index: number) => string;
  ItemSeparatorComponent?: ComponentType;
  horizontal?: boolean;
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

function StaticListComponent<ItemT>({
  data,
  renderItem,
  keyExtractor,
  ItemSeparatorComponent,
  horizontal = false,
  scrollable = false,
  style,
  contentContainerStyle,
}: StaticListProps<ItemT>) {
  const lastIndex = data.length - 1;

  const containerStyle = horizontal
    ? styles.containerHorizontal
    : styles.container;

  const items = data.map((item, index) => (
    <Fragment key={keyExtractor?.(item, index) ?? String(index)}>
      {renderItem({ item, index })}
      {ItemSeparatorComponent && index < lastIndex ? (
        <ItemSeparatorComponent />
      ) : null}
    </Fragment>
  ));

  if (scrollable) {
    return (
      <ScrollView
        horizontal={horizontal}
        style={style}
        contentContainerStyle={[containerStyle, contentContainerStyle]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {items}
      </ScrollView>
    );
  }

  return <View style={[containerStyle, style]}>{items}</View>;
}

export const StaticList = memo(
  StaticListComponent,
) as typeof StaticListComponent;
