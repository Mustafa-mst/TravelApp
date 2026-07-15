import {
  type ComponentType,
  Fragment,
  memo,
  useCallback,
  useMemo,
} from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { type SvgProps } from "react-native-svg";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import type { ParseKeys } from "i18next";
import {
  useNavigation,
  useRoute,
  type RouteProp,
} from "@react-navigation/native";

import { Carousel, IconButton, PressableScale, Text } from "@shared/components";
import {
  ArrowLeftIcon,
  CalendarMonthIcon,
  ChevronRightIcon,
  CurrencyIcon,
  LeafIcon,
  LocationIcon,
  RestaurantsIcon,
} from "@shared/assets/icons";
import { colors } from "@shared/styles";
import { BLUR_HASH } from "@shared/constants";
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
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { params } = useRoute<CountryDetailRoute>();

  const { data: country, isLoading } = useGetCountryDetailQuery(
    params.countryCode,
  );

  const countryName =
    country?.name?.en?.common ?? country?.name?.[i18n.language]?.common ?? "";

  const { data: heroImages } = useCountryImageQuery(countryName);

  const renderHeroImage = useCallback(
    (uri: string) => (
      <Image
        source={uri}
        placeholder={{ blurhash: BLUR_HASH }}
        transition={300}
        style={styles.heroImage}
        contentFit="cover"
      />
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
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
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
        <IconButton
          variant="filled"
          onPress={() => navigation.goBack()}
          style={[styles.backButton, { top: insets.top + 8 }]}
          icon={
            <ArrowLeftIcon width={20} height={20} color={colors.text} />
          }
        />

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
