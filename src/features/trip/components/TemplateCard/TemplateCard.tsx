import { memo } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Divider, PressableScale, Text } from "@shared/components";
import { ArrowRightIcon, CalendarMonthIcon, MapIcon } from "@shared/assets/icons";
import { useStyles } from "@shared/hooks";
import { PLACE_TYPE_META } from "@/features/places/constants";
import type { TemplateCard as TemplateCardType } from "../../types";
import { MetaInfo } from "../MetaInfo";
import { templateCardStyles } from "./TemplateCard.styles";
import { brand } from "@/shared/styles";

const MAX_VISIBLE_CHIPS = 2;
const ACTION_ICON_SIZE = 20;

export type TemplateCardProps = {
  title: string;
  placesCount: number;
  daysCount: number;
  placeTypes?: TemplateCardType["place_types"];
  coverPhoto?: string | null;
  /** The card the map is following. */
  isActive?: boolean;
  onPress?: () => void;
};

function TemplateCardComponent({
  title,
  placesCount,
  daysCount,
  placeTypes,
  coverPhoto,
  isActive = false,
  onPress,
}: TemplateCardProps) {
  const { t } = useTranslation();
  const styles = useStyles(templateCardStyles);

  const typeChips = Array.from(new Set(placeTypes ?? [])).map((type) => ({
    type,
    ...PLACE_TYPE_META[type],
  }));

  const visibleChips = typeChips.slice(0, MAX_VISIBLE_CHIPS);

  return (
    <PressableScale
      style={[styles.card, isActive && styles.cardActive]}
      onPress={onPress}
    >
      <View style={styles.info}>
        <Text variant="h5" color={brand.text.main} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.metaRow}>
          <MetaInfo
            Icon={MapIcon}
            label={t("template.place.placesCount", { count: placesCount })}
          />
          <Divider orientation="vertical" margin={12} />
          <MetaInfo
            Icon={CalendarMonthIcon}
            label={t("template.overview.dayCount", { count: daysCount })}
          />
        </View>

        {typeChips.length > 0 && (
          <View style={styles.chips}>
            {visibleChips.map((chip) => (
              <View key={chip.type} style={styles.chip}>
                <Text variant="captionMedium" color="muted">
                  {`${chip.icon} ${chip.label}`}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.action}>
        <ArrowRightIcon
          width={ACTION_ICON_SIZE}
          height={ACTION_ICON_SIZE}
          color={brand.text.inverse}
        />
      </View>
    </PressableScale>
  );
}

export const TemplateCard = memo(TemplateCardComponent);
