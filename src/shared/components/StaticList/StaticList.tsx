import { Fragment, memo } from "react";
import type { ComponentType, ReactNode } from "react";
import { View } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";

import { styles } from "./StaticList.styles";

export type StaticListProps<ItemT> = {
  data: ReadonlyArray<ItemT>;
  renderItem: (info: { item: ItemT; index: number }) => ReactNode;
  keyExtractor?: (item: ItemT, index: number) => string;
  ItemSeparatorComponent?: ComponentType;
  horizontal?: boolean;
  style?: StyleProp<ViewStyle>;
};

function StaticListComponent<ItemT>({
  data,
  renderItem,
  keyExtractor,
  ItemSeparatorComponent,
  horizontal = false,
  style,
}: StaticListProps<ItemT>) {
  const lastIndex = data.length - 1;

  return (
    <View
      style={[horizontal ? styles.containerHorizontal : styles.container, style]}
    >
      {data.map((item, index) => (
        <Fragment key={keyExtractor?.(item, index) ?? String(index)}>
          {renderItem({ item, index })}
          {ItemSeparatorComponent && index < lastIndex ? (
            <ItemSeparatorComponent />
          ) : null}
        </Fragment>
      ))}
    </View>
  );
}

export const StaticList = memo(
  StaticListComponent,
) as typeof StaticListComponent;
