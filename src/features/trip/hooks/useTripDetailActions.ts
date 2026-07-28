import { useCallback, useMemo, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { BottomSheet } from "@shared/components";
import type { RootStackParamList } from "@shared/navigation";
import type { TripDetailDay, TripDetailMode } from "../types";

const EMPTY_DAYS: TripDetailDay[] = [];

type UseTripDetailActionsOptions = {
  id: string;
  mode: TripDetailMode;
  days: TripDetailDay[] | undefined;
};

/**
 * The write half of the detail screen: add-item sheet state and day
 * navigation. Split from `useTripDetail` so the read path stays pure and
 * shareable — the old detail hook owned both, which is why it could
 * not serve a read-only view.
 *
 * Always call this; gate the handlers on `detail.can_edit` at the render site
 * rather than conditionally calling the hook.
 */
export function useTripDetailActions({
  id,
  mode,
  days,
}: UseTripDetailActionsOptions) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // The day a newly added item targets.
  const [activeDayId, setActiveDayId] = useState<string | null>(null);

  const itemSheetRef = useRef<BottomSheet>(null);

  const source = days ?? EMPTY_DAYS;

  const openAddItem = useCallback((dayId: string) => {
    setActiveDayId(dayId);
    itemSheetRef.current?.present();
  }, []);

  const openDay = useCallback(
    (dayId: string) => {
      navigation.navigate("DayDetail", { id, mode, dayId });
    },
    [navigation, id, mode],
  );

  const goToActiveDay = useCallback(() => {
    if (activeDayId) {
      navigation.navigate("DayDetail", { id, mode, dayId: activeDayId });
    }
  }, [navigation, id, mode, activeDayId]);

  const activeDayPlaceIds = useMemo(() => {
    if (!activeDayId) {
      return [];
    }
    const day = source.find((d) => d.id === activeDayId);
    return (day?.items ?? [])
      .map((item) => item.google_place_id)
      .filter((placeId): placeId is string => placeId != null);
  }, [activeDayId, source]);

  return {
    activeDayId,
    activeDayPlaceIds,
    itemSheetRef,
    openAddItem,
    openDay,
    goToActiveDay,
  };
}
