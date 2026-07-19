import { useRef } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { BackPanel } from "react-native-layer-stack";
import { useRoute, type RouteProp } from "@react-navigation/native";

import { type BottomSheet } from "@shared/components";
import type { ItineraryStackParamList } from "@shared/navigation";
import {
  CitySearchSheet,
  CreateItineraryHeader,
  TripDetailsSection,
} from "../../components";
import { useCreateItinerary } from "../../hooks";
import { styles } from "./CreateItineraryScreen.styles";

export function CreateItineraryScreen() {
  const route =
    useRoute<RouteProp<ItineraryStackParamList, "CreateItinerary">>();
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
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
    coverPhoto,
    uploadedPhoto,
    selectCoverPhoto,
    pickFromGallery,
    submit,
    cancel,
  } = useCreateItinerary(route.params?.itinerary);

  return (
    <BackPanel contentStyle={styles.panelContent}>
      <CreateItineraryHeader
        isEditing={isEditing}
        canSubmit={canSubmit}
        isSubmitting={isSubmitting}
        onCancel={cancel}
        onSubmit={submit}
      />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <TripDetailsSection
            control={control}
            errors={errors}
            selectedCity={selectedCity}
            onCityPress={() => citySheetRef.current?.present()}
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
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
