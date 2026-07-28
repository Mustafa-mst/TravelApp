import { useCallback } from "react";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "@shared/components";
import type { RootStackParamList } from "@shared/navigation";
import type { TemplateCardType } from "@/features/trip";
import { spacing } from "@shared/styles";
import { backgroundImage } from "@shared/assets/images";
import {
  CategoryGrid,
  CategorySection,
  ExploreTemplates,
  HeroBanner,
} from "../../components";
import { styles } from "./HomeScreen.styles";
import { useGetCategoriesQuery } from "@/features/country";

export function HomeScreen() {
  const { t } = useTranslation();
  const { data: categories } = useGetCategoriesQuery();
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const category = categories?.[0];

  const openTemplate = useCallback(
    (template: TemplateCardType) => {
      if (!template.id) {
        return;
      }
      navigation.navigate("TripDetail", {
        id: template.id,
        mode: "template",
        preview: {
          title: template.title ?? "",
          cover_photo: template.cover_photo,
        },
      });
    },
    [navigation],
  );

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

        <ExploreTemplates style={styles.exploreList} onSelect={openTemplate} />
      </ScrollView>
    </View>
  );
}
