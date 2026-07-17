import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBackLayer } from "react-native-layer-stack";
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next";

import { useAuthStore } from "@/features/auth";
import { createItinerarySchema, type CreateItineraryValues } from "../schemas";
import {
  useCreateItineraryMutation,
  useUpdateItineraryMutation,
} from "./mutation";
import { parseDateOnly, toDateOnly, uploadCoverPhoto } from "../utils";
import type { Itinerary, SelectedCity } from "../types";

function startOfToday(): Date {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

function toSelectedCity(itinerary: Itinerary): SelectedCity | null {
  if (!itinerary.cities) {
    return null;
  }

  return {
    geoname_id: itinerary.city_geoname_id,
    name: itinerary.cities.name,
    country_code: itinerary.cities.country_code,
  };
}

export function useCreateItinerary(initial?: Itinerary) {
  const { t } = useTranslation();
  const { close } = useBackLayer();
  const session = useAuthStore((state) => state.session);
  const isEditing = Boolean(initial);

  const { mutateAsync: createItinerary, isPending: isCreating } =
    useCreateItineraryMutation();
  const { mutateAsync: updateItinerary, isPending: isUpdating } =
    useUpdateItineraryMutation();

  const form = useForm<CreateItineraryValues>({
    resolver: zodResolver(createItinerarySchema),
    mode: "onChange",
    defaultValues: {
      name: initial?.title ?? "",
      city: initial?.cities?.name ?? "",
      startDate: initial ? parseDateOnly(initial.start_date) : startOfToday(),
      endDate: initial ? parseDateOnly(initial.end_date) : startOfToday(),
    },
  });

  const { control, setValue, getValues, handleSubmit, formState } = form;

  const city = useWatch({ control, name: "city" });
  const startDate = useWatch({ control, name: "startDate" });
  const endDate = useWatch({ control, name: "endDate" });

  const [coverPhoto, setCoverPhoto] = useState<string | null>(
    initial?.cover_photo ?? null,
  );
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<SelectedCity | null>(
    initial ? toSelectedCity(initial) : null,
  );
  const [isUploading, setIsUploading] = useState(false);

  const selectCoverPhoto = useCallback((uri: string) => {
    setCoverPhoto(uri);
  }, []);

  const selectCity = useCallback(
    (newCity: SelectedCity) => {
      setSelectedCity(newCity);
      setValue("city", newCity.name, { shouldValidate: true });
    },
    [setValue],
  );

  const handleStartDateChange = useCallback(
    (date: Date) => {
      setValue("startDate", date, { shouldValidate: true });
      if (getValues("endDate") < date) {
        setValue("endDate", date, { shouldValidate: true });
      }
    },
    [setValue, getValues],
  );

  const handleEndDateChange = useCallback(
    (date: Date) => {
      setValue("endDate", date, { shouldValidate: true });
    },
    [setValue],
  );

  const pickFromGallery = useCallback(async () => {
    const { granted } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const uri = result.assets[0].uri;
      setUploadedPhoto(uri);
      setCoverPhoto(uri);
    }
  }, []);

  const submit = handleSubmit(async (values) => {
    if (!selectedCity) {
      return;
    }

    if (!session) {
      Alert.alert(t("itinerary.loginRequired"));
      return;
    }

    try {
      setIsUploading(true);

      // Gallery picks are local file:// URIs — upload to Storage first so the
      // saved cover_photo is a public URL that works across devices.
      let coverUrl = coverPhoto;
      if (coverUrl?.startsWith("file:")) {
        coverUrl = await uploadCoverPhoto(session.user.id, coverUrl);
      }

      const payload = {
        title: values.name,
        city_geoname_id: selectedCity.geoname_id,
        start_date: toDateOnly(values.startDate),
        end_date: toDateOnly(values.endDate),
        cover_photo: coverUrl ?? null,
      };

      if (initial) {
        await updateItinerary({ id: initial.id, ...payload });
      } else {
        await createItinerary(payload);
      }
      close();
    } catch (error) {
      Alert.alert(
        t("itinerary.saveError"),
        error instanceof Error ? error.message : undefined,
      );
    } finally {
      setIsUploading(false);
    }
  });

  const cancel = useCallback(() => {
    close();
  }, [close]);

  return {
    control,
    errors: formState.errors,
    canSubmit: formState.isValid && Boolean(selectedCity),
    isSubmitting: isCreating || isUpdating || isUploading,
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
  };
}
