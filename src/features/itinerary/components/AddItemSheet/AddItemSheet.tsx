import { useCallback, useEffect, useMemo, useState, type RefObject } from "react";
import { Alert, View } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useTranslation } from "react-i18next";

import {
  BottomSheet,
  Button,
  PressableScale,
  SegmentedControl,
  StateView,
  Text,
} from "@shared/components";
import { PLACE_CATEGORIES, PlaceTypes } from "@/features/places/constants";
import { useNearbyPlaces } from "@/features/places/hooks";
import type { PlaceType } from "@/features/places/types";
import { useCreateItineraryItem } from "../../hooks";
import type { NewItineraryItemInput } from "../../types";
import { styles } from "./AddItemSheet.styles";

export type AddItemSheetProps = {
  bottomSheetRef: RefObject<BottomSheet | null>;
  itineraryId: string;
  dayId: string | null;
  initialSelectedPlaceIds?: string[];
  latitude?: number | null;
  longitude?: number | null;
  onAdded?: () => void;
};

const CATEGORY_OPTIONS = PLACE_CATEGORIES.map((category) => ({
  key: category.value,
  label: category.title,
}));

export function AddItemSheet({
  bottomSheetRef,
  itineraryId,
  dayId,
  initialSelectedPlaceIds,
  latitude,
  longitude,
  onAdded,
}: AddItemSheetProps) {
  const { t } = useTranslation();

  const [selectedType, setSelectedType] = useState<PlaceTypes>(
    PlaceTypes.TouristAttraction,
  );
  const [initialIds, setInitialIds] = useState<Set<string>>(new Set());
  const [pendingPlaces, setPendingPlaces] = useState<
    Map<string, { place: PlaceType; placeType: PlaceTypes }>
  >(new Map());

  const { mutateAsync: createItem, isPending: isCreating } =
    useCreateItineraryItem();

  const {
    data: places = [],
    isLoading,
    isError,
  } = useNearbyPlaces({ latitude, longitude, type: selectedType });

  const resetSelection = useCallback(() => {
    setPendingPlaces(new Map());
  }, []);

  const initialKey = (initialSelectedPlaceIds ?? []).join(",");
  useEffect(() => {
    setInitialIds(new Set(initialSelectedPlaceIds ?? []));
  }, [initialKey]);

  const handleSheetChange = useCallback(
    (index: number) => {
      if (index < 0) {
        resetSelection();
      }
    },
    [resetSelection],
  );

  const togglePlace = useCallback(
    (place: PlaceType, placeType: PlaceTypes) => {
      setPendingPlaces((prev) => {
        const next = new Map(prev);
        if (next.has(place.id)) {
          next.delete(place.id);
        } else {
          next.set(place.id, { place, placeType });
        }
        return next;
      });
    },
    [],
  );

  const handleAdd = useCallback(async () => {
    if (pendingPlaces.size === 0) {
      return;
    }
    if (!dayId) {
      Alert.alert(t("itinerary.nearby.addError"), "No day selected (dayId).");
      return;
    }
    try {
      for (const { place, placeType } of pendingPlaces.values()) {
        const input: NewItineraryItemInput = {
          day_id: dayId,
          type: "place",
          name: place.name,
          description: null,
          starts_at: null,
          ends_at: null,
          google_place_id: place.id,
          latitude: place.latitude,
          longitude: place.longitude,
          address: place.address,
          image_url: place.imageUrl ?? null,
          place_type: placeType,
          notes: null,
        };
        await createItem({ itineraryId, input });
      }
      resetSelection();
      bottomSheetRef.current?.dismiss();
      onAdded?.();
    } catch {
      Alert.alert(t("itinerary.nearby.addError"));
    }
  }, [
    bottomSheetRef,
    createItem,
    dayId,
    itineraryId,
    onAdded,
    pendingPlaces,
    resetSelection,
    t,
  ]);

  const selectedCount = pendingPlaces.size;
  const addLabel = useMemo(
    () =>
      selectedCount > 0
        ? t("itinerary.nearby.addCountLabel", { count: selectedCount })
        : t("itinerary.nearby.addLabel"),
    [selectedCount, t],
  );

  const showEmpty = !isLoading && !isError && places.length === 0;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={["75%"]}
      onChange={handleSheetChange}
      header={<Text variant="h4">{t("itinerary.nearby.title")}</Text>}
    >
      <View style={styles.content}>
        <SegmentedControl
          options={CATEGORY_OPTIONS}
          value={selectedType}
          onChange={(type) => setSelectedType(type)}
        />

        <View style={styles.listArea}>
          <StateView
            isLoading={isLoading}
            isEmpty={showEmpty || isError}
            emptyLabel={t("itinerary.nearby.empty")}
            style={styles.stateBlock}
          >
            <BottomSheetFlatList
              data={places}
              keyExtractor={(place) => place.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => {
                const isExisting = initialIds.has(item.id);
                const isSelected = isExisting || pendingPlaces.has(item.id);
                return (
                  <PressableScale
                    onPress={() =>
                      !isExisting && togglePlace(item, selectedType)
                    }
                    disabled={isExisting}
                    style={[styles.row, isSelected && styles.rowSelected]}
                  >
                    <View style={styles.rowInfo}>
                      <Text variant="bodyMedium" numberOfLines={1}>
                        {item.name}
                      </Text>
                      {Boolean(item.address) && (
                        <Text
                          variant="caption"
                          color="textMuted"
                          numberOfLines={1}
                        >
                          {item.address}
                        </Text>
                      )}
                    </View>
                    {isExisting ? (
                      <Text variant="captionMedium" color="textMuted">
                        {t("itinerary.nearby.alreadyAdded")}
                      </Text>
                    ) : (
                      item.rating != null && (
                        <Text variant="captionMedium" color="textSecondary">
                          {`★ ${item.rating.toFixed(1)}`}
                        </Text>
                      )
                    )}
                  </PressableScale>
                );
              }}
            />
          </StateView>
        </View>

        <Button
          label={addLabel}
          fullWidth
          state={
            isCreating ? "loading" : selectedCount > 0 ? undefined : "disabled"
          }
          onPress={handleAdd}
        />
      </View>
    </BottomSheet>
  );
}
