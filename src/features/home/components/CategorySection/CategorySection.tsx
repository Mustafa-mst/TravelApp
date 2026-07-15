import { memo } from "react";
import { FlatList, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Text } from "@shared/components";
import type { RootStackParamList } from "@shared/navigation";
import type { CategoryItem } from "@/features/country";
import { DestinationCard } from "../DestinationCard";
import { styles } from "./CategorySection.styles";

export type CategorySectionProps = {
  items: CategoryItem[];
  categoryLabel?: string;
};

function CategorySectionComponent({
  items,
  categoryLabel,
}: CategorySectionProps) {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (items.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text variant="bodyLargeMedium" style={styles.title}>
        {t("home.explorePlaces")}
      </Text>
      <FlatList
        horizontal
        data={items}
        keyExtractor={(item) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <DestinationCard
            title={item.title}
            location={item.subtitle}
            image={item.image_url}
            category={categoryLabel}
            onPress={() =>
              navigation.navigate("CountryDetail", {
                countryCode: item.country_code,
              })
            }
          />
        )}
      />
    </View>
  );
}

export const CategorySection = memo(CategorySectionComponent);
