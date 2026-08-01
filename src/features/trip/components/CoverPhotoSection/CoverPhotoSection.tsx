import { memo, useEffect, useMemo } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";

import { PressableScale, Text } from "@shared/components";
import { colors } from "@shared/styles";
import { DEFAULT_COVER_PHOTOS } from "../../constants";
import { useCoverPhotosQuery } from "../../hooks/query";
import { styles } from "./CoverPhotoSection.styles";

export type CoverPhotoSectionProps = {
  city: string;
  selectedUri: string | null;
  uploadedUri: string | null;
  onSelect: (uri: string) => void;
  onUploadPress: () => void;
};

function CoverPhotoSectionComponent({
  city,
  selectedUri,
  uploadedUri,
  onSelect,
  onUploadPress,
}: CoverPhotoSectionProps) {
  const { t } = useTranslation();
  const { data: suggestions, isFetching } = useCoverPhotosQuery(city);

  const photos = useMemo(() => {
    const suggested = suggestions?.length ? suggestions : DEFAULT_COVER_PHOTOS;
    return uploadedUri
      ? [uploadedUri, ...suggested.filter((url) => url !== uploadedUri)]
      : suggested;
  }, [suggestions, uploadedUri]);

  // Nothing picked yet — fall back to the first photo so a cover is always set.
  useEffect(() => {
    if (!selectedUri && photos[0]) {
      onSelect(photos[0]);
    }
  }, [selectedUri, photos, onSelect]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text variant="bodyLargeMedium" color="textPrimary">
          {t("template.coverPhoto")}
        </Text>
        <Pressable
          accessibilityRole="button"
          hitSlop={8}
          onPress={onUploadPress}
        >
          <Text variant="caption" color="primary">
            {t("template.uploadPhoto")}
          </Text>
        </Pressable>
      </View>

      {isFetching ? (
        <ActivityIndicator color={colors.primary} style={styles.loading} />
      ) : null}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {photos.map((uri) => {
          const isSelected = uri === selectedUri;

          return (
            <PressableScale key={uri} onPress={() => onSelect(uri)}>
              <View
                style={[
                  styles.tile,
                  isSelected ? styles.tileSelected : styles.tileUnselected,
                ]}
              >
                <Image
                  source={{ uri }}
                  style={styles.tileImage}
                  contentFit="cover"
                />
              </View>
            </PressableScale>
          );
        })}
      </ScrollView>
    </View>
  );
}

export const CoverPhotoSection = memo(CoverPhotoSectionComponent);
