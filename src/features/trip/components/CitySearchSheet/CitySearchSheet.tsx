import { useCallback, useState, type RefObject } from "react";
import {
  Keyboard,
  Pressable,
  View,
  type StyleProp,
  type TextStyle,
} from "react-native";
import { useTranslation } from "react-i18next";

import {
  BottomSheet,
  BottomSheetList,
  SheetSearchHeader,
  Spinner,
  Text,
} from "@shared/components";
import { CheckboxCheckedIcon, LocationIcon } from "@/shared/assets/icons";
import { useSearchCitiesQuery } from "../../hooks";
import { MIN_QUERY_LENGTH, useStyles, useThemeColors } from "@shared/hooks";
import type { City, SelectedCity } from "../../types";
import {
  CITY_CHECK_ICON_SIZE,
  CITY_PIN_ICON_SIZE,
  citySearchSheetStyles,
} from "./CitySearchSheet.styles";

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
  const styles = useStyles(citySearchSheetStyles);
  const colors = useThemeColors();
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
        latitude: city.latitude,
        longitude: city.longitude,
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
            <LocationIcon
              color={colors.accent}
              width={CITY_PIN_ICON_SIZE}
              height={CITY_PIN_ICON_SIZE}
            />
          </View>
          <Text
            variant="bodyMedium"
            color="foreground"
            numberOfLines={1}
            style={styles.rowLabel}
          >
            {`${item.city}, ${item.country}`}
          </Text>
        </View>

        {isSelected ? (
          <CheckboxCheckedIcon
            width={CITY_CHECK_ICON_SIZE}
            height={CITY_CHECK_ICON_SIZE}
            color={colors.accent}
          />
        ) : null}
      </Pressable>
    );
  };

  const renderEmptyState = () => {
    if (searchQuery.trim().length < MIN_QUERY_LENGTH) {
      return renderEmptyText(t("template.cityMinChars"), styles.emptyText);
    }

    if (isLoading) {
      return (
        <Spinner color="accent" style={styles.empty} />
      );
    }

    return renderEmptyText(
      isError ? t("template.searchError") : t("template.noResults"),
      styles.emptyText,
    );
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={["90%"]}
      onChange={handleSheetChange}
      header={
        <SheetSearchHeader
          title={t("template.selectCity")}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t("search.placeholder")}
          autoCapitalize="words"
        />
      }
    >
      <BottomSheetList
        data={results ?? []}
        style={styles.card}
        contentContainerStyle={styles.cardContent}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item: City) => String(item.geoname_id)}
        renderItem={renderCity}
        ListEmptyComponent={renderEmptyState}
      />
    </BottomSheet>
  );
}

function ItemSeparator() {
  const styles = useStyles(citySearchSheetStyles);

  return <View style={styles.rowDivider} />;
}

function renderEmptyText(message: string, style: StyleProp<TextStyle>) {
  return (
    <Text variant="body" color="muted" style={style}>
      {message}
    </Text>
  );
}
