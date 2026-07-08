import { useMemo } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFrontLayer } from "react-native-layer-stack";
import { CurvedView } from "@shared/components";
import type { BackTarget } from "@shared/navigation";
import { CollectionsCarousel, HomeSignRow } from "../../components";
import { styles } from "./HomeScreen.styles";
import {
  CategoryList,
  CountryPreviewList,
  useGetCountryRevealsQuery,
  useGetDestinationsQuery,
} from "@/features/country";
import { useGetCollectionsQuery } from "../../hooks/query";

export function HomeScreen() {
  const { open } = useFrontLayer<BackTarget>();
  const { data: collections } = useGetCollectionsQuery();
  const { data: countryReveals } = useGetCountryRevealsQuery();
  const { data: destinations } = useGetDestinationsQuery();

  const categories = useMemo(
    () =>
      (destinations ?? []).map(({ id, category, image_url }) => ({
        id,
        category,
        image_url,
      })),
    [destinations],
  );

  const onPressCategory = (categoryId: string) => {
    const selected = categories.find(({ id }) => String(id) === categoryId);
    if (!selected) return;
    open({ target: "categories", params: { category: selected.category } });
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <CurvedView scrollable style={styles.curved}>
        <View style={styles.header}>
          <View style={styles.image}>
            <CollectionsCarousel collections={collections ?? []} />
          </View>
          <HomeSignRow />
          <CategoryList data={categories} onPressCategory={onPressCategory} />
          <CountryPreviewList variant="reveal" data={countryReveals ?? []} />
        </View>
      </CurvedView>
    </SafeAreaView>
  );
}
