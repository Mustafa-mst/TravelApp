import { memo } from "react";
import { View } from "react-native";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  Divider,
  Input,
  QuantityInput,
  SelectField,
  Text,
} from "@shared/components";
import {
  MAX_TEMPLATE_DAYS,
  MIN_TEMPLATE_DAYS,
  type TemplateFormValues,
} from "../../schemas";
import type { SelectedCity } from "../../types";
import { CoverPhotoSection } from "../CoverPhotoSection";
import { styles } from "./TripDetailsSection.styles";

export type TripDetailsSectionProps = {
  control: Control<TemplateFormValues>;
  errors: FieldErrors<TemplateFormValues>;
  selectedCity: SelectedCity | null;
  onCityPress: () => void;
  daysCount: number;
  onDaysCountChange: (next: number) => void;
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
  daysCount,
  onDaysCountChange,
  city,
  coverPhoto,
  uploadedPhoto,
  onSelectCoverPhoto,
  onUploadPhotoPress,
}: TripDetailsSectionProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <CoverPhotoSection
        city={city}
        selectedUri={coverPhoto}
        uploadedUri={uploadedPhoto}
        onSelect={onSelectCoverPhoto}
        onUploadPress={onUploadPhotoPress}
      />

      <Divider />
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder={t("template.namePlaceholder")}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.name?.message}
          />
        )}
      />

      <SelectField
        placeholder={t("template.selectCity")}
        value={
          selectedCity
            ? `${selectedCity.name}, ${selectedCity.country_code}`
            : null
        }
        error={errors.city?.message}
        onPress={onCityPress}
      />

      <QuantityInput
        label={t("template.duration")}
        value={daysCount}
        min={MIN_TEMPLATE_DAYS}
        max={MAX_TEMPLATE_DAYS}
        onChange={onDaysCountChange}
      />

      {errors.daysCount?.message ? (
        <Text variant="caption" color="danger">
          {errors.daysCount.message}
        </Text>
      ) : null}
    </View>
  );
}

export const TripDetailsSection = memo(TripDetailsSectionComponent);
