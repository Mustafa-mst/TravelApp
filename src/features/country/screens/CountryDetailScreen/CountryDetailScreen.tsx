import { memo, useCallback } from "react";
import { ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import {
  BackButton,
  Carousel,
  ListGroup,
  RemoteImage,
  StateView,
  Text,
  TripButton,
} from "@shared/components";
import { useStyles, useThemeColors } from "@shared/hooks";
import {
  AttractionsSheet,
  CountryLocalTime,
  EssentialsSheet,
} from "../../components";
import { useCountryDetail } from "../../hooks";
import { countryDetailScreenStyles } from "./CountryDetailScreen.styles";

const MIN_FOOTER_BOTTOM_INSET = 24;
const FOOTER_HEIGHT = 96;

function CountryDetailScreenComponent() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const styles = useStyles(countryDetailScreenStyles);
  const {
    countryName,
    countryCode,
    subtitle,
    heroImages,
    localTime,
    essentialGroups,
    essentialsSheetRef,
    rows,
    isLoading,
    attractionsSheetRef,
    isAttractionsOpen,
    handleAttractionsChange,
  } = useCountryDetail();

  const bottomInset = Math.max(insets.bottom, MIN_FOOTER_BOTTOM_INSET);

  const renderHeroImage = useCallback(
    (uri: string) => <RemoteImage source={uri} style={styles.heroImage} />,
    [styles.heroImage],
  );

  if (isLoading) {
    return <StateView isLoading style={styles.loader} />;
  }

  return (
    <View style={styles.safe}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: FOOTER_HEIGHT + bottomInset }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.hero}>
          <Carousel
            data={heroImages}
            indicator="dots"
            keyExtractor={(uri, index) => `${uri}-${index}`}
            renderItem={renderHeroImage}
          />
        </View>
        <BackButton />
        <View style={styles.body}>
          <View style={styles.titleRow}>
            <View style={styles.titleBlock}>
              <Text variant="h3">{countryName}</Text>
              {subtitle ? (
                <Text variant="body" color="muted">
                  {subtitle}
                </Text>
              ) : null}
            </View>
            {localTime ? <CountryLocalTime {...localTime} /> : null}
          </View>
          <View style={styles.listCard}>
            <ListGroup items={rows} />
          </View>
        </View>
      </ScrollView>
      <View
        style={[styles.footer, { paddingBottom: bottomInset }]}
      >
        <LinearGradient
          pointerEvents="none"
          colors={["transparent", colors.surface]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.footerFade}
        />
        <TripButton label={t("country.startTrip")} />
      </View>

      <AttractionsSheet
        sheetRef={attractionsSheetRef}
        countryName={countryName}
        countryCode={countryCode}
        isOpen={isAttractionsOpen}
        onSheetChange={handleAttractionsChange}
      />

      <EssentialsSheet sheetRef={essentialsSheetRef} groups={essentialGroups} />
    </View>
  );
}

export const CountryDetailScreen = memo(CountryDetailScreenComponent);
