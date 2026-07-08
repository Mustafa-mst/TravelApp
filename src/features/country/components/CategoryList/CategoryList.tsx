import { memo } from "react";
import { FlatList, Pressable, View } from "react-native";
import { Image } from "expo-image";
import { Text } from "@shared/components";
import { styles } from "./CategoryList.styles";
import type { Destination } from "../../types";

export type CategoryListProps = {
  data: Destination[];
  onPressCategory?: (categoryId: string) => void;
};

function CategoryListComponent({ data, onPressCategory }: CategoryListProps) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text variant="h6">Categories</Text>
      </View>
      <FlatList
        data={data}
        numColumns={4}
        scrollEnabled={false}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            onPress={() => onPressCategory?.(String(item.id))}
          >
            <Image style={styles.image} source={{ uri: item.image_url }} />
            <Text variant="body" style={styles.label}>
              {item.category}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

export const CategoryList = memo(CategoryListComponent);
