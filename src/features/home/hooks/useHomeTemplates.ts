import { useCallback, useMemo, useState } from "react";
import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { MAP_DEFAULT_CENTER } from "@shared/components";
import type { RootStackParamList } from "@shared/navigation";
import { buildMarkers } from "@shared/utils/map";
import {
  TripDetailMode,
  useFeaturedTemplatesQuery,
  useMyTemplatesQuery,
  type TemplateCardType,
} from "@/features/trip";
import { stopBadge } from "../utils";
import { TemplateTab } from "../constants";

/** One card fills the row, so the page index is the scrolled card. */
function pageIndex(offsetX: number, pageWidth: number) {
  return pageWidth > 0 ? Math.round(offsetX / pageWidth) : 0;
}

export function useHomeTemplates(pageWidth: number) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(TemplateTab.Explorer);

  const myTemplates = useMyTemplatesQuery();
  const featured = useFeaturedTemplatesQuery();

  const { data, isLoading, isError, refetch } =
    activeTab === TemplateTab.MyTemplates ? myTemplates : featured;
  const templates = data ?? [];

  const active = templates[activeIndex];

  const { mapCenter, mapMarkers } = useMemo(() => {
    const markers = buildMarkers(active?.stops ?? [], { badge: stopBadge });

    return {
      mapCenter: markers[0]?.coordinates ?? MAP_DEFAULT_CENTER,
      mapMarkers: markers,
    };
  }, [active]);

  const onCardsScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      setActiveIndex(
        pageIndex(event.nativeEvent.contentOffset.x, pageWidth),
      );
    },
    [pageWidth],
  );

  /** The new list starts at its own first card, so the map follows it too. */
  const onTabChange = useCallback((tab: TemplateTab) => {
    setActiveTab(tab);
    setActiveIndex(0);
  }, []);

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

  return {
    templates,
    activeIndex,
    activeTab,
    onTabChange,
    isLoading,
    isError,
    refetch,
    mapCenter,
    mapMarkers,
    onCardsScroll,
    openTemplate,
  };
}
