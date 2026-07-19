import { memo, useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Card, Text } from "@shared/components";
import { colors } from "@shared/styles";
import { ChevronRightIcon, LocationIcon } from "@/shared/assets/icons";
import type { CreateItineraryValues } from "../../schemas";
import type { SelectedCity } from "../../types";
import { CoverPhotoSection } from "../CoverPhotoSection";
import { DateField, type ActiveDatePicker } from "../DateField";
import { styles } from "./TripDetailsSection.styles";

export type TripDetailsSectionProps = {
  control: Control<CreateItineraryValues>;
  errors: FieldErrors<CreateItineraryValues>;
  selectedCity: SelectedCity | null;
  onCityPress: () => void;
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  city: string;
  coverPhoto: string | null;
  uploadedPhoto: string | null;
  onSelectCoverPhoto: (uri: string) => void;
  onUploadPhotoPress: () => void;
};

function TripDetailsSectionComponent({
  control,
  errors,
  selectedCity,
  onCityPress,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  city,
  coverPhoto,
  uploadedPhoto,
  onSelectCoverPhoto,
  onUploadPhotoPress,
}: TripDetailsSectionProps) {
  const { t } = useTranslation();
  const [activePicker, setActivePicker] = useState<ActiveDatePicker>(null);

  const togglePicker = (picker: Exclude<ActiveDatePicker, null>) => {
    setActivePicker((current) => (current === picker ? null : picker));
  };

  const errorMessage =
    errors.name?.message ?? errors.city?.message ?? errors.endDate?.message;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.nameInput}
              placeholder={t("itinerary.namePlaceholder")}
              placeholderTextColor={colors.textTertiary}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        <View style={styles.separator} />

        <Pressable
          accessibilityRole="button"
          style={styles.row}
          onPress={onCityPress}
        >
          <View style={styles.rowLabel}>
            <LocationIcon width={20} height={20} color={colors.iconPrimary} />
            {selectedCity ? (
              <Text
                variant="bodyLarge"
                color="textPrimary"
                numberOfLines={1}
                style={styles.valueLabel}
              >
                {`${selectedCity.name}, ${selectedCity.country_code}`}
              </Text>
            ) : (
              <Text variant="bodyLarge" color="textTertiary">
                {t("itinerary.selectCity")}
              </Text>
            )}
          </View>

          <ChevronRightIcon
            width={20}
            height={20}
            color={colors.iconTertiary}
          />
        </Pressable>

        <View style={styles.separator} />

        <DateField
          startDate={startDate}
          endDate={endDate}
          activePicker={activePicker}
          onToggleStart={() => togglePicker("start")}
          onToggleEnd={() => togglePicker("end")}
          onStartChange={onStartDateChange}
          onEndChange={onEndDateChange}
        />

        <View style={styles.separator} />

        <CoverPhotoSection
          city={city}
          selectedUri={coverPhoto}
          uploadedUri={uploadedPhoto}
          onSelect={onSelectCoverPhoto}
          onUploadPress={onUploadPhotoPress}
        />
      </Card>

      {errorMessage ? (
        <Text variant="caption" color="danger">
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
}

export const TripDetailsSection = memo(TripDetailsSectionComponent);
