import { memo, useMemo } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";

import { Card, PressableScale, Text } from "@shared/components";
import { colors } from "@shared/styles";
import { CheckboxCheckedIcon } from "@/shared/assets/icons";
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

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text variant="bodyLarge" color="textPrimary">
          {t("itinerary.coverPhoto")}
        </Text>
        <Pressable
          accessibilityRole="button"
          hitSlop={8}
          onPress={onUploadPress}
        >
          <Text variant="bodyMedium" color="primary">
            {t("itinerary.uploadPhoto")}
          </Text>
        </Pressable>
      </View>

      <Card style={styles.card}>
        {isFetching ? (
          <ActivityIndicator color={colors.primary} style={styles.loading} />
        ) : null}
        <View style={styles.grid}>
          {photos.map((uri) => {
            const isSelected = uri === selectedUri;

            return (
              <PressableScale
                key={uri}
                containerStyle={styles.tileWrap}
                onPress={() => onSelect(uri)}
              >
                <View style={[styles.tile, isSelected && styles.tileSelected]}>
                  <Image
                    source={{ uri }}
                    style={styles.tileImage}
                    contentFit="cover"
                  />
                  {isSelected ? (
                    <View style={styles.checkBadge}>
                      <CheckboxCheckedIcon
                        width={18}
                        height={18}
                        color={colors.white}
                      />
                    </View>
                  ) : null}
                </View>
              </PressableScale>
            );
          })}
        </View>
      </Card>
    </View>
  );
}

export const CoverPhotoSection = memo(CoverPhotoSectionComponent);
