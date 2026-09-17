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
  type TemplateCardType,
} from "@/features/trip";
import { templateCardWidth } from "../constants";
import { stopBadge } from "../utils";

/** The row snaps by one card, so the index is the scrolled card. */
function pageIndex(offsetX: number, step: number) {
  return step > 0 ? Math.round(offsetX / step) : 0;
}

export function useHomeTemplates(rowWidth: number) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeIndex, setActiveIndex] = useState(0);

  const { data, isLoading, isError, refetch } = useFeaturedTemplatesQuery();
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
        pageIndex(
          event.nativeEvent.contentOffset.x,
          templateCardWidth(rowWidth),
        ),
      );
    },
    [rowWidth],
  );

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
    isLoading,
    isError,
    refetch,
    mapCenter,
    mapMarkers,
    onCardsScroll,
    openTemplate,
  };
}
