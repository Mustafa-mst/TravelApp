import { useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";

import { PlaceTypes } from "@/features/places/constants";
import { useNearbyPlaces } from "@/features/places/hooks";
import type { PlaceType } from "@/features/places/types";
import { useCreateTemplateItem } from "../../hooks";
import type { NewTripTemplateItemInput } from "../../types";

type UseAddPlacesSheetOptions = {
  templateId: string;
  dayId: string | null;
  initialSelectedPlaceIds?: string[];
  latitude?: number | null;
  longitude?: number | null;
  onAdded?: () => void;
  onDone?: () => void;
};

function toItemInput(
  dayId: string,
  place: PlaceType,
  placeType: PlaceTypes,
): NewTripTemplateItemInput {
  return {
    template_day_id: dayId,
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
}

export function useAddPlacesSheet({
  templateId,
  dayId,
  initialSelectedPlaceIds,
  latitude,
  longitude,
  onAdded,
  onDone,
}: UseAddPlacesSheetOptions) {
  const { t } = useTranslation();

  const [selectedType, setSelectedType] = useState<PlaceTypes>(
    PlaceTypes.TouristAttraction,
  );
  const [pendingPlaces, setPendingPlaces] = useState<
    Map<string, { place: PlaceType; placeType: PlaceTypes }>
  >(new Map());

  const { mutateAsync: createItem, isPending: isCreating } =
    useCreateTemplateItem();

  const {
    data: places = [],
    isLoading,
    isError,
  } = useNearbyPlaces({ latitude, longitude, type: selectedType });

  // Derived, not state — nothing but the prop ever changes it.
  const alreadyAddedIds = useMemo(
    () => new Set(initialSelectedPlaceIds ?? []),
    [initialSelectedPlaceIds],
  );

  const resetSelection = useCallback(() => {
    setPendingPlaces(new Map());
  }, []);

  const togglePlace = useCallback((place: PlaceType, placeType: PlaceTypes) => {
    setPendingPlaces((prev) => {
      const next = new Map(prev);
      if (next.has(place.id)) {
        next.delete(place.id);
      } else {
        next.set(place.id, { place, placeType });
      }
      return next;
    });
  }, []);

  // Dismissing the sheet drops the pending selection, so reopening starts clean.
  const handleSheetChange = useCallback(
    (index: number) => {
      if (index < 0) {
        resetSelection();
      }
    },
    [resetSelection],
  );

  const addPlaces = useCallback(async () => {
    if (pendingPlaces.size === 0) {
      return;
    }
    if (!dayId) {
      Alert.alert(t("template.nearby.addError"));
      return;
    }

    const queued = [...pendingPlaces.values()];
    let added = 0;

    try {
      for (const { place, placeType } of queued) {
        await createItem({
          templateId,
          input: toItemInput(dayId, place, placeType),
        });
        added += 1;
      }
      resetSelection();
      onDone?.();
      onAdded?.();
    } catch {
      // Whatever landed before the failure is already saved. Drop those from
      // the selection so a retry does not add them a second time.
      if (added > 0) {
        const remaining = queued.slice(added);
        setPendingPlaces(
          new Map(remaining.map((entry) => [entry.place.id, entry])),
        );
      }
      Alert.alert(t("template.nearby.addError"));
    }
  }, [
    createItem,
    dayId,
    onAdded,
    onDone,
    pendingPlaces,
    resetSelection,
    t,
    templateId,
  ]);

  const selectedCount = pendingPlaces.size;

  return {
    places,
    isLoading,
    isEmpty: !isLoading && (isError || places.length === 0),
    selectedType,
    setSelectedType,
    isAlreadyAdded: useCallback(
      (placeId: string) => alreadyAddedIds.has(placeId),
      [alreadyAddedIds],
    ),
    isPending: useCallback(
      (placeId: string) => pendingPlaces.has(placeId),
      [pendingPlaces],
    ),
    togglePlace,
    selectedCount,
    isCreating,
    addLabel:
      selectedCount > 0
        ? t("template.nearby.addCountLabel", { count: selectedCount })
        : t("template.nearby.addLabel"),
    addPlaces,
    handleSheetChange,
  };
}
