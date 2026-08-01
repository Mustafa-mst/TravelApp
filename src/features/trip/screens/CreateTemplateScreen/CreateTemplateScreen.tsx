import { useRef } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { BackPanel } from "react-native-layer-stack";
import { useRoute, type RouteProp } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { Button, type BottomSheet } from "@shared/components";
import type { TemplateStackParamList } from "@shared/navigation";
import {
  CitySearchSheet,
  CreateTemplateHeader,
  TripDetailsSection,
} from "../../components";
import { useTemplateForm } from "../../hooks";
import { styles } from "./CreateTemplateScreen.styles";

export function CreateTemplateScreen() {
  const { t } = useTranslation();
  const route = useRoute<RouteProp<TemplateStackParamList, "CreateTemplate">>();
  const citySheetRef = useRef<BottomSheet>(null);
  const {
    control,
    errors,
    canSubmit,
    isSubmitting,
    isEditing,
    city,
    selectedCity,
    selectCity,
    daysCount,
    handleDaysCountChange,
    coverPhoto,
    uploadedPhoto,
    selectCoverPhoto,
    pickFromGallery,
    submit,
    cancel,
  } = useTemplateForm(route.params?.template);

  return (
    <BackPanel
      contentStyle={styles.panelContent}
      footer={
        <Button
          fullWidth
          label={t(isEditing ? "template.save" : "template.add")}
          state={isSubmitting ? "loading" : !canSubmit ? "disabled" : undefined}
          onPress={submit}
        />
      }
    >
      <CreateTemplateHeader
        isEditing={isEditing}
        isSubmitting={isSubmitting}
        onCancel={cancel}
      />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.flex}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <TripDetailsSection
            control={control}
            errors={errors}
            selectedCity={selectedCity}
            onCityPress={() => citySheetRef.current?.present()}
            daysCount={daysCount}
            onDaysCountChange={handleDaysCountChange}
            city={city}
            coverPhoto={coverPhoto}
            uploadedPhoto={uploadedPhoto}
            onSelectCoverPhoto={selectCoverPhoto}
            onUploadPhotoPress={pickFromGallery}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <CitySearchSheet
        bottomSheetRef={citySheetRef}
        selectedCity={selectedCity}
        onSelectCity={selectCity}
      />
    </BackPanel>
  );
}
