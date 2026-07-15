import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { Text } from "@shared/components";
import { spacing } from "@shared/styles";
import { backgroundImage } from "@shared/assets/images";
import {
  CategoryGrid,
  CategorySection,
  HeroBanner,
  ItineraryCard,
} from "../../components";
import { styles } from "./HomeScreen.styles";
import { useGetCategoriesQuery } from "@/features/country";

export function HomeScreen() {
  const { t } = useTranslation();
  const { data: categories } = useGetCategoriesQuery();
  const insets = useSafeAreaInsets();

  const category = categories?.[0];

  return (
    <View style={styles.safe}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <HeroBanner image={backgroundImage} height={insets.top + 300}>
          <View
            style={[styles.header, { paddingTop: insets.top + spacing.sm }]}
          >
            <View style={styles.heroText}>
              <Text color="white" variant="h2" style={styles.heroTitle}>
                {t("home.hero.title")}
              </Text>
              <Text variant="bodyLargeMedium" style={styles.heroSubtitle}>
                {t("home.hero.subtitle")}
              </Text>
            </View>

            <CategoryGrid />
          </View>
        </HeroBanner>

        {category && (
          <CategorySection
            items={category.category_items ?? []}
            categoryLabel={category.category}
          />
        )}
        <View style={styles.block}>
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
      </ScrollView>
    </View>
  );
}
