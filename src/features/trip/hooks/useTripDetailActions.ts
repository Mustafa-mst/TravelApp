import { useCallback, useMemo, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { BottomSheet } from "@shared/components";
import type { RootStackParamList } from "@shared/navigation";
import type { TripDetailMode } from "../constants";
import type { TripDetailDay } from "../types";
import { collectPlaceIds } from "../utils";

type UseTripDetailActionsOptions = {
  id: string;
  mode: TripDetailMode;
  days: TripDetailDay[] | undefined;
};

/**
 * The write half of the detail screen: add-item sheet state and day navigation.
 * Always call this and gate the handlers on `can_edit` at the render site.
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
    const day = days?.find(({ id: dayId }) => dayId === activeDayId);
    return collectPlaceIds(day?.items);
  }, [activeDayId, days]);

  return {
    activeDayId,
    activeDayPlaceIds,
    itemSheetRef,
    openAddItem,
    openDay,
    goToActiveDay,
  };
}
