import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { Input, Text } from "@shared/components";
import { SearchIcon } from "@shared/assets/icons";
import { CategorySection, HomeSignRow, ItineraryCard } from "../../components";
import { styles } from "./HomeScreen.styles";
import { useGetCategoriesQuery } from "@/features/country";

export function HomeScreen() {
  const { t } = useTranslation();
  const { data: categories } = useGetCategoriesQuery();
  const [query, setQuery] = useState("");

  const category = categories?.[0];

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View style={styles.header}>
          <Text color="textPrimary" variant="h1">{t("home.title")}</Text>
        </View>

        <HomeSignRow />

        <View style={styles.itinerarySection}>
          <ItineraryCard
            title="İstanbul Gezisi"
            location="İstanbul"
            dateLabel="12–15 Tem"
            members={[
              { id: "1", name: "Mustafa" },
              { id: "2", name: "Ayşe" },
              { id: "3", name: "Can" },
            ]}
          />
        </View>

        {category && (
          <CategorySection
            items={category.category_items ?? []}
            categoryLabel={category.category}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
