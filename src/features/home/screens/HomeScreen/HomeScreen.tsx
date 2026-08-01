import { useCallback } from "react";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@shared/navigation";
import { TripDetailMode } from "@/features/trip";
import type { TemplateCardType } from "@/features/trip";
import { CategorySection, ExploreTemplates } from "../../components";
import { styles } from "./HomeScreen.styles";
import { useGetCategoriesQuery } from "@/features/country";
import { HomeHeader } from "../../components/HomeHeader";
import { Divider } from "@/shared/components";

export function HomeScreen() {
  const { t } = useTranslation();
  const { data: categories } = useGetCategoriesQuery();
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
        mode: TripDetailMode.Template,
        preview: {
          title: template.title ?? "",
          cover_photo: template.cover_photo,
        },
      });
    },
    [navigation],
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <HomeHeader style={styles.sectionPadding} />
        <Divider margin={0} variant="dot" style={styles.sectionPadding} />

        {category && <CategorySection items={category.category_items} />}

        <ExploreTemplates
          onSelect={openTemplate}
          style={styles.sectionPadding}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
