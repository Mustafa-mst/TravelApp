import { useMemo, useRef, useState } from "react";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";

import {
  type BottomSheet,
  type MapCoordinates,
  type MapMarker,
  type SheetAction,
} from "@shared/components";
import { PenIcon, TrashBin } from "@shared/assets/icons";
import type { Itinerary, ItineraryItem } from "../types";
import { resolveActiveDayNumber } from "../utils";
import { useDeleteItineraryItem } from "./mutation";
import { useFullItinerary } from "./query";

export type ItineraryTab = "overview" | "days";

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
  const { t } = useTranslation();

  const [tab, setTab] = useState<ItineraryTab>("overview");
  // The day a new item targets, and the item being edited (null = create).
  const [activeDayId, setActiveDayId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<ItineraryItem | null>(null);
  const [actionItem, setActionItem] = useState<ItineraryItem | null>(null);

  const itemSheetRef = useRef<BottomSheet>(null);
  const actionSheetRef = useRef<BottomSheet>(null);

  const { data, isLoading, isError, refetch } = useFullItinerary(itinerary.id);
  const { mutateAsync: deleteItem } = useDeleteItineraryItem();

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

  const openAddItem = (dayId: string) => {
    setEditingItem(null);
    setActiveDayId(dayId);
    itemSheetRef.current?.present();
  };

  const activeDayPlaceIds = useMemo(() => {
    if (!activeDayId) {
      return [];
    }
    const day = days.find((d) => d.id === activeDayId);
    return (day?.items ?? [])
      .map((item) => item.google_place_id)
      .filter((id): id is string => id != null);
  }, [activeDayId, days]);

  const openEditItem = (item: ItineraryItem) => {
    setEditingItem(item);
    setActiveDayId(item.day_id);
    itemSheetRef.current?.present();
  };

  const openItemActions = (item: ItineraryItem) => {
    setActionItem(item);
    actionSheetRef.current?.present();
  };

  const confirmDelete = (item: ItineraryItem) => {
    Alert.alert(
      t("itinerary.deleteItemConfirmTitle"),
      t("itinerary.deleteItemConfirmMessage", { title: item.name }),
      [
        { text: t("itinerary.cancel"), style: "cancel" },
        {
          text: t("itinerary.delete"),
          style: "destructive",
          onPress: async () => {
            try {
              await deleteItem({
                id: item.id,
                itineraryId: itinerary.id,
                dayId: item.day_id,
              });
            } catch {
              Alert.alert(t("itinerary.deleteItemError"));
            }
          },
        },
      ],
    );
  };

  const itemActions: SheetAction[] = [
    {
      id: "edit",
      label: t("itinerary.editActivity"),
      Icon: PenIcon,
      onPress: () => {
        if (actionItem) {
          openEditItem(actionItem);
        }
      },
    },
    {
      id: "delete",
      label: t("itinerary.delete"),
      Icon: TrashBin,
      destructive: true,
      onPress: () => {
        if (actionItem) {
          confirmDelete(actionItem);
        }
      },
    },
  ];

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
    // tab state
    tab,
    setTab,
    // sheet state + refs
    activeDayId,
    activeDayPlaceIds,
    editingItem,
    actionItem,
    itemSheetRef,
    actionSheetRef,
    itemActions,
    // handlers
    openAddItem,
    openEditItem,
    openItemActions,
  };
}
