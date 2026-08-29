import {
  type ComponentType,
  Fragment,
  memo,
  useCallback,
  useMemo,
} from "react";
import { ScrollView, View } from "react-native";
import { type SvgProps } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import type { ParseKeys } from "i18next";
import { useRoute, type RouteProp } from "@react-navigation/native";

import {
  BackButton,
  Carousel,
  PressableScale,
  RemoteImage,
  StateView,
  Text,
} from "@shared/components";
import {
  CalendarMonthIcon,
  ChevronRightIcon,
  CurrencyIcon,
  LeafIcon,
  LocationIcon,
  RestaurantsIcon,
} from "@shared/assets/icons";
import { useStyles, useThemeColors } from "@shared/hooks";
import type { RootStackParamList } from "@shared/navigation";
import { resolveCountryName } from "@shared/utils/country";
import {
  useCountryImageQuery,
  useGetCountryDetailQuery,
} from "../../hooks";
import {
  COUNTRY_CHEVRON_SIZE,
  COUNTRY_SECTION_ICON_SIZE,
  countryDetailScreenStyles,
} from "./CountryDetailScreen.styles";

type CountryDetailRoute = RouteProp<RootStackParamList, "CountryDetail">;

type CountrySection = {
  id: string;
  titleKey: ParseKeys;
  subtitleKey: ParseKeys;
  Icon: ComponentType<SvgProps>;
};

const SECTIONS: CountrySection[] = [
  {
    id: "destinations",
    titleKey: "country.sections.destinations.title",
    subtitleKey: "country.sections.destinations.subtitle",
    Icon: LocationIcon,
  },
  {
    id: "bestTime",
    titleKey: "country.sections.bestTime.title",
    subtitleKey: "country.sections.bestTime.subtitle",
    Icon: LeafIcon,
  },
  {
    id: "food",
    titleKey: "country.sections.food.title",
    subtitleKey: "country.sections.food.subtitle",
    Icon: RestaurantsIcon,
  },
  {
    id: "exchange",
    titleKey: "country.sections.exchange.title",
    subtitleKey: "country.sections.exchange.subtitle",
    Icon: CurrencyIcon,
  },
];

function CountryDetailScreenComponent() {
  const { t, i18n } = useTranslation();
  const { params } = useRoute<CountryDetailRoute>();
  const styles = useStyles(countryDetailScreenStyles);
  const colors = useThemeColors();

  const { data: country, isLoading } = useGetCountryDetailQuery(
    params.countryCode,
  );

  const countryName = resolveCountryName(
    country?.name,
    i18n.language,
    params.countryCode,
  );

  const { data: heroImages } = useCountryImageQuery(country?.name);

  const renderHeroImage = useCallback(
    (uri: string) => (
      <RemoteImage source={uri} style={styles.heroImage} />
    ),
    [styles.heroImage],
  );

  const subtitle = [country?.subregion, country?.capital?.[0]]
    .filter(Boolean)
    .join(" | ");

  const sortedSections = useMemo(
    () =>
      [...SECTIONS].sort((a, b) =>
        t(a.titleKey).localeCompare(t(b.titleKey), i18n.language),
      ),
    [t, i18n.language],
  );

  if (isLoading) {
    return <StateView isLoading style={styles.loader} />;
  }

  return (
    <View style={styles.safe}>
      {/* Fixed light: the status bar sits over the dark photo hero, not the themed background. */}
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Carousel
            data={heroImages ?? []}
            indicator="dots"
            keyExtractor={(uri, index) => `${uri}-${index}`}
            renderItem={renderHeroImage}
          />
        </View>
        <BackButton size={20} />

        <View style={styles.titleBlock}>
          <Text variant="h1" textAlign="center">
            {countryName}
          </Text>
          {subtitle ? (
            <Text variant="body" textAlign="center" color="muted">
              {subtitle}
            </Text>
          ) : null}
        </View>

        <View style={styles.sectionDivider} />
        <PressableScale style={styles.section} onPress={() => {}}>
          <CalendarMonthIcon
            width={COUNTRY_SECTION_ICON_SIZE}
            height={COUNTRY_SECTION_ICON_SIZE}
            color={colors.foreground}
          />
          <View style={styles.sectionInfo}>
            <Text variant="bodyMedium">{t("country.createTemplate")}</Text>
          </View>
          <ChevronRightIcon
            width={COUNTRY_CHEVRON_SIZE}
            height={COUNTRY_CHEVRON_SIZE}
            color={colors.foreground}
          />
        </PressableScale>

        {sortedSections.map(({ id, titleKey, subtitleKey, Icon }) => (
          <Fragment key={id}>
            <View style={styles.sectionDivider} />
            <PressableScale style={styles.section} onPress={() => {}}>
              <Icon
                width={COUNTRY_SECTION_ICON_SIZE}
                height={COUNTRY_SECTION_ICON_SIZE}
                color={colors.foreground}
              />
              <View style={styles.sectionInfo}>
                <Text variant="bodyMedium">{t(titleKey)}</Text>
                <Text variant="captionMedium" color="muted">
                  {t(subtitleKey)}
                </Text>
                <Text variant="caption" color="accent" style={styles.seeMore}>
                  {t("country.seeMore")}
                </Text>
              </View>
              <ChevronRightIcon
                width={COUNTRY_CHEVRON_SIZE}
                height={COUNTRY_CHEVRON_SIZE}
                color={colors.foreground}
              />
            </PressableScale>
          </Fragment>
        ))}
      </ScrollView>
    </View>
  );
}

export const CountryDetailScreen = memo(CountryDetailScreenComponent);
