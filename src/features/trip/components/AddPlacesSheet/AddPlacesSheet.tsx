import { useCallback, type RefObject } from "react";
import { View } from "react-native";
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
import { PLACE_CATEGORIES } from "@/features/places/constants";
import type { PlaceType } from "@/features/places/types";
import { useAddPlacesSheet } from "./useAddPlacesSheet";
import { styles } from "./AddPlacesSheet.styles";

export type AddPlacesSheetProps = {
  bottomSheetRef: RefObject<BottomSheet | null>;
  templateId: string;
  dayId: string | null;
  /** Places already on this day; shown as added and not selectable again. */
  initialSelectedPlaceIds?: string[];
  latitude?: number | null;
  longitude?: number | null;
  onAdded?: () => void;
};

const CATEGORY_OPTIONS = PLACE_CATEGORIES.map((category) => ({
  key: category.value,
  label: category.title,
}));

/**
 * Picks from the places near a template's city and adds them to one day. All of
 * its behaviour lives in `useAddPlacesSheet`.
 */
export function AddPlacesSheet({
  bottomSheetRef,
  templateId,
  dayId,
  initialSelectedPlaceIds,
  latitude,
  longitude,
  onAdded,
}: AddPlacesSheetProps) {
  const { t } = useTranslation();

  const {
    places,
    isLoading,
    isEmpty,
    selectedType,
    setSelectedType,
    isAlreadyAdded,
    isPending,
    togglePlace,
    selectedCount,
    isCreating,
    addLabel,
    addPlaces,
    handleSheetChange,
  } = useAddPlacesSheet({
    templateId,
    dayId,
    initialSelectedPlaceIds,
    latitude,
    longitude,
    onAdded,
    onDone: () => bottomSheetRef.current?.dismiss(),
  });

  const renderPlace = useCallback(
    ({ item }: { item: PlaceType }) => {
      const added = isAlreadyAdded(item.id);
      const selected = added || isPending(item.id);

      return (
        <PressableScale
          onPress={() => !added && togglePlace(item, selectedType)}
          disabled={added}
          style={[styles.row, selected && styles.rowSelected]}
        >
          <View style={styles.rowInfo}>
            <Text variant="bodyMedium" numberOfLines={1}>
              {item.name}
            </Text>
            {Boolean(item.address) && (
              <Text variant="caption" color="textMuted" numberOfLines={1}>
                {item.address}
              </Text>
            )}
          </View>
          {added ? (
            <Text variant="captionMedium" color="textMuted">
              {t("template.nearby.alreadyAdded")}
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
    },
    [isAlreadyAdded, isPending, togglePlace, selectedType, t],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={["75%"]}
      onChange={handleSheetChange}
      header={<Text variant="h4">{t("template.nearby.title")}</Text>}
    >
      <View style={styles.content}>
        <SegmentedControl
          options={CATEGORY_OPTIONS}
          value={selectedType}
          onChange={setSelectedType}
        />

        <View style={styles.listArea}>
          <StateView
            isLoading={isLoading}
            isEmpty={isEmpty}
            emptyLabel={t("template.nearby.empty")}
            style={styles.stateBlock}
          >
            <BottomSheetFlatList
              data={places}
              keyExtractor={(place) => place.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              renderItem={renderPlace}
            />
          </StateView>
        </View>

        <Button
          label={addLabel}
          fullWidth
          state={
            isCreating ? "loading" : selectedCount > 0 ? undefined : "disabled"
          }
          onPress={addPlaces}
        />
      </View>
    </BottomSheet>
  );
}
