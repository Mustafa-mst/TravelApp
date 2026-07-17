import { useCallback, useState, type RefObject } from "react";
import { ActivityIndicator, Keyboard, Pressable, View } from "react-native";
import { useTranslation } from "react-i18next";

import {
  BottomSheet,
  BottomSheetList,
  SheetSearchHeader,
  Text,
} from "@shared/components";
import { colors } from "@shared/styles";
import { CheckboxCheckedIcon, LocationIcon } from "@/shared/assets/icons";
import { useSearchCitiesQuery } from "../../hooks";
import { MIN_QUERY_LENGTH } from "../../hooks/useDebouncedValue";
import type { City, SelectedCity } from "../../types";
import { styles } from "./CitySearchSheet.styles";

export type CitySearchSheetProps = {
  bottomSheetRef: RefObject<BottomSheet | null>;
  selectedCity: SelectedCity | null;
  onSelectCity: (city: SelectedCity) => void;
};

export function CitySearchSheet({
  bottomSheetRef,
  selectedCity,
  onSelectCity,
}: CitySearchSheetProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: results, isLoading, isError } = useSearchCitiesQuery(searchQuery);

  const handleSheetChange = useCallback((index: number) => {
    if (index < 0) {
      setSearchQuery("");
      Keyboard.dismiss();
    }
  }, []);

  const handleSelect = useCallback(
    (city: City) => {
      onSelectCity({
        geoname_id: city.geoname_id,
        name: city.city,
        country_code: city.country_code,
      });
      Keyboard.dismiss();
      bottomSheetRef.current?.dismiss();
    },
    [onSelectCity, bottomSheetRef],
  );

  const renderCity = ({ item }: { item: City }) => {
    const isSelected = selectedCity?.geoname_id === item.geoname_id;

    return (
      <Pressable
        accessibilityRole="button"
        style={styles.row}
        onPress={() => handleSelect(item)}
      >
        <View style={styles.info}>
          <View style={styles.pinContainer}>
            <LocationIcon color={colors.primary} width={20} height={20} />
          </View>
          <Text
            variant="bodyMedium"
            color="textPrimary"
            numberOfLines={1}
            style={styles.rowLabel}
          >
            {`${item.city}, ${item.country}`}
          </Text>
        </View>

        {isSelected ? (
          <CheckboxCheckedIcon width={18} height={18} color={colors.primary} />
        ) : null}
      </Pressable>
    );
  };

  const renderEmptyState = () => {
    if (searchQuery.trim().length < MIN_QUERY_LENGTH) {
      return renderEmptyText(t("itinerary.cityMinChars"));
    }

    if (isLoading) {
      return (
        <ActivityIndicator color={colors.primary} style={styles.emptyText} />
      );
    }

    return renderEmptyText(
      isError ? t("itinerary.searchError") : t("itinerary.noResults"),
    );
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={["90%"]}
      onChange={handleSheetChange}
      header={
        <SheetSearchHeader
          title={t("itinerary.selectCity")}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t("search.placeholder")}
          autoCapitalize="words"
        />
      }
    >
      <BottomSheetList
        data={results ?? []}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item: City) => String(item.geoname_id)}
        renderItem={renderCity}
        ListEmptyComponent={renderEmptyState}
      />
    </BottomSheet>
  );
}

function ItemSeparator() {
  return <View style={styles.rowDivider} />;
}

function renderEmptyText(message: string) {
  return (
    <Text variant="body" color="textTertiary" style={styles.emptyText}>
      {message}
    </Text>
  );
}
