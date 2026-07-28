import { memo } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Divider, PressableScale, RemoteImage, Text } from "@shared/components";
import { CalendarMonthIcon, MapIcon } from "@shared/assets/icons";
import { backgroundImage } from "@shared/assets/images";
import { PLACE_TYPE_META } from "@/features/places/constants";
import type { TemplateCard as TemplateCardType } from "../../types";
import { MetaInfo } from "../MetaInfo";
import { styles } from "./TemplateCard.styles";

const MAX_VISIBLE_CHIPS = 2;

export type TemplateCardProps = {
  title: string;
  placesCount: number;
  daysCount: number;
  placeTypes?: TemplateCardType["place_types"];
  coverPhoto?: string | null;
  onPress?: () => void;
};

function TemplateCardComponent({
  title,
  placesCount,
  daysCount,
  placeTypes,
  coverPhoto,
  onPress,
}: TemplateCardProps) {
  const { t } = useTranslation();

  const typeChips = Array.from(new Set(placeTypes ?? [])).map((type) => ({
    type,
    ...PLACE_TYPE_META[type],
  }));

  const visibleChips = typeChips.slice(0, MAX_VISIBLE_CHIPS);

  return (
    <PressableScale style={styles.card} onPress={onPress}>
      <View style={styles.info}>
        <Text variant="subtitle" numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.metaRow}>
          <MetaInfo
            Icon={MapIcon}
            label={t("itinerary.template.placesCount", { count: placesCount })}
          />
          <Divider orientation="vertical" margin={12} />
          <MetaInfo
            Icon={CalendarMonthIcon}
            label={t("itinerary.overview.dayCount", { count: daysCount })}
          />
        </View>

        {typeChips.length > 0 && (
          <View style={styles.chips}>
            {visibleChips.map((chip) => (
              <View key={chip.type} style={styles.chip}>
                <Text variant="captionMedium" color="textSecondary">
                  {`${chip.icon} ${chip.label}`}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <RemoteImage
        source={coverPhoto ? { uri: coverPhoto } : backgroundImage}
        style={styles.image}
      />
    </PressableScale>
  );
}

export const TemplateCard = memo(TemplateCardComponent);
