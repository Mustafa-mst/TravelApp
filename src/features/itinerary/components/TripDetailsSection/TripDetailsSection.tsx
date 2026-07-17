import { memo, useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Card, Text } from "@shared/components";
import { colors } from "@shared/styles";
import { ChevronRightIcon } from "@/shared/assets/icons";
import type { CreateItineraryValues } from "../../schemas";
import type { SelectedCity } from "../../types";
import { DateField } from "../DateField";
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
};

type ActivePicker = "start" | "end" | null;

function TripDetailsSectionComponent({
  control,
  errors,
  selectedCity,
  onCityPress,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: TripDetailsSectionProps) {
  const { t } = useTranslation();
  const [activePicker, setActivePicker] = useState<ActivePicker>(null);

  const togglePicker = (picker: Exclude<ActivePicker, null>) => {
    setActivePicker((current) => (current === picker ? null : picker));
  };

  const errorMessage =
    errors.name?.message ?? errors.city?.message ?? errors.endDate?.message;

  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" color="textPrimary">
        {t("itinerary.tripDetails")}
      </Text>

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
          <Text variant="body" color="textPrimary">
            {t("itinerary.city")}
          </Text>
          <View style={styles.valueGroup}>
            {selectedCity ? (
              <Text
                variant="body"
                color="textPrimary"
                numberOfLines={1}
                style={styles.valueLabel}
              >
                {`${selectedCity.name}, ${selectedCity.country_code}`}
              </Text>
            ) : null}
            <ChevronRightIcon
              width={18}
              height={18}
              color={colors.iconTertiary}
            />
          </View>
        </Pressable>

        <View style={styles.separator} />

        <DateField
          label={t("itinerary.startDate")}
          value={startDate}
          expanded={activePicker === "start"}
          onToggle={() => togglePicker("start")}
          onChange={onStartDateChange}
        />

        <View style={styles.separator} />

        <DateField
          label={t("itinerary.endDate")}
          value={endDate}
          minimumDate={startDate}
          expanded={activePicker === "end"}
          onToggle={() => togglePicker("end")}
          onChange={onEndDateChange}
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
