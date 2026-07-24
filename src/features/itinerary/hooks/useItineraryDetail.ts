import { useCallback, useMemo, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  type BottomSheet,
  type MapCoordinates,
  type MapMarker,
} from "@shared/components";
import type { RootStackParamList } from "@shared/navigation";
import type { Itinerary } from "../types";
import { resolveActiveDayNumber } from "../utils";
import { useFullItinerary } from "./query";

// Fallback center (Istanbul) used until an itinerary has located activities.
const DEFAULT_MAP_CENTER: MapCoordinates = {
  latitude: 41.0082,
  longitude: 28.9784,
};

/**
 * Owns everything the detail screen needs beyond pure rendering: the full
 * itinerary query, the derived map/stat data, and the create/edit/delete sheet
 * orchestration. The screen consumes the returned values and handlers.
 */
export function useItineraryDetail(itinerary: Itinerary) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // The day a newly added item targets.
  const [activeDayId, setActiveDayId] = useState<string | null>(null);

  const itemSheetRef = useRef<BottomSheet>(null);

  const { data, isLoading, isError, refetch } = useFullItinerary(itinerary.id);

  const days = data?.days ?? [];
  const totalActivities = days.reduce((sum, day) => sum + day.items.length, 0);
  const activeDayNumber = resolveActiveDayNumber(
    itinerary.start_date,
    itinerary.end_date,
    days.length,
  );

  // Center the map on the itinerary's selected city; fall back to any located
  // activity, then to a default center. Markers are dropped on located items.
  const { mapCenter, mapMarkers } = useMemo(() => {
    const markers: MapMarker[] = [];
    for (const day of days) {
      for (const item of day.items) {
        if (item.latitude != null && item.longitude != null) {
          markers.push({
            id: item.id,
            coordinates: { latitude: item.latitude, longitude: item.longitude },
            title: item.name,
          });
        }
      }
    }
    const city = itinerary.cities;
    const cityCenter: MapCoordinates | null =
      city?.latitude != null && city?.longitude != null
        ? { latitude: city.latitude, longitude: city.longitude }
        : null;
    const center: MapCoordinates =
      cityCenter ?? markers[0]?.coordinates ?? DEFAULT_MAP_CENTER;
    return { mapCenter: center, mapMarkers: markers };
  }, [days, itinerary.cities]);

  const openAddItem = useCallback((dayId: string) => {
    setActiveDayId(dayId);
    itemSheetRef.current?.present();
  }, []);

  const openDay = useCallback(
    (dayId: string) => {
      navigation.navigate("DayDetail", { itineraryId: itinerary.id, dayId });
    },
    [navigation, itinerary.id],
  );

  const goToActiveDay = useCallback(() => {
    if (activeDayId) {
      navigation.navigate("DayDetail", {
        itineraryId: itinerary.id,
        dayId: activeDayId,
      });
    }
  }, [navigation, itinerary.id, activeDayId]);

  const activeDayPlaceIds = useMemo(() => {
    if (!activeDayId) {
      return [];
    }
    const day = days.find((d) => d.id === activeDayId);
    return (day?.items ?? [])
      .map((item) => item.google_place_id)
      .filter((id): id is string => id != null);
  }, [activeDayId, days]);

  return {
    // query state
    isLoading,
    isError,
    refetch,
    // derived data
    days,
    totalActivities,
    activeDayNumber,
    mapCenter,
    mapMarkers,
    // add-item sheet
    activeDayId,
    activeDayPlaceIds,
    itemSheetRef,
    // handlers
    openAddItem,
    openDay,
    goToActiveDay,
  };
}
