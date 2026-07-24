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
import { colors } from "@shared/styles";
import type { RootStackParamList } from "@shared/navigation";
import {
  useCountryImageQuery,
  useGetCountryDetailQuery,
} from "../../hooks";
import { styles } from "./CountryDetailScreen.styles";

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

  const { data: country, isLoading } = useGetCountryDetailQuery(
    params.countryCode,
  );

  const countryName =
    country?.name?.en?.common ?? country?.name?.[i18n.language]?.common ?? "";

  const { data: heroImages } = useCountryImageQuery(countryName);

  const renderHeroImage = useCallback(
    (uri: string) => (
      <RemoteImage source={uri} style={styles.heroImage} />
    ),
    [],
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
          <Text variant="h2" textAlign="center">
            {countryName}
          </Text>
          {subtitle ? (
            <Text variant="body" textAlign="center" style={styles.subtitle}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        <View style={styles.sectionDivider} />
        <PressableScale style={styles.section} onPress={() => {}}>
          <CalendarMonthIcon
            width={22}
            height={22}
            color={colors.iconPrimary}
          />
          <View style={styles.sectionInfo}>
            <Text variant="bodyMedium">{t("country.createItinerary")}</Text>
          </View>
          <ChevronRightIcon
            width={18}
            height={18}
            color={colors.iconPrimary}
          />
        </PressableScale>

        {sortedSections.map(({ id, titleKey, subtitleKey, Icon }) => (
          <Fragment key={id}>
            <View style={styles.sectionDivider} />
            <PressableScale style={styles.section} onPress={() => {}}>
              <Icon width={22} height={22} color={colors.iconPrimary} />
              <View style={styles.sectionInfo}>
                <Text variant="bodyMedium">{t(titleKey)}</Text>
                <Text variant="captionMedium" style={styles.sectionSubtitle}>
                  {t(subtitleKey)}
                </Text>
                <Text variant="caption" style={styles.seeMore}>
                  {t("country.seeMore")}
                </Text>
              </View>
              <ChevronRightIcon
                width={18}
                height={18}
                color={colors.iconPrimary}
              />
            </PressableScale>
          </Fragment>
        ))}
      </ScrollView>
    </View>
  );
}

export const CountryDetailScreen = memo(CountryDetailScreenComponent);
