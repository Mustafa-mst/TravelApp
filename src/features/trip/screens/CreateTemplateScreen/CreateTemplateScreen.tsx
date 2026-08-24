import { useRef } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, type RouteProp } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { Button, type BottomSheet } from "@shared/components";
import type { RootStackParamList } from "@shared/navigation";
import {
  CitySearchSheet,
  CreateTemplateHeader,
  TripDetailsSection,
} from "../../components";
import { useTemplateForm } from "../../hooks";
import { styles } from "./CreateTemplateScreen.styles";

export function CreateTemplateScreen() {
  const { t } = useTranslation();
  const route = useRoute<RouteProp<RootStackParamList, "CreateTemplate">>();
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
    <SafeAreaView edges={["top", "bottom"]} style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.content}>
          <CreateTemplateHeader
            isEditing={isEditing}
            isSubmitting={isSubmitting}
            onCancel={cancel}
          />
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
        </View>

        <View style={styles.footer}>
          <Button
            fullWidth
            label={t(isEditing ? "template.save" : "template.add")}
            state={
              isSubmitting ? "loading" : !canSubmit ? "disabled" : undefined
            }
            onPress={submit}
          />
        </View>
      </KeyboardAvoidingView>

      <CitySearchSheet
        bottomSheetRef={citySheetRef}
        selectedCity={selectedCity}
        onSelectCity={selectCity}
      />
    </SafeAreaView>
  );
}
