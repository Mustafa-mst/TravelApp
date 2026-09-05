import { memo, useCallback } from "react";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import {
  BackButton,
  Carousel,
  ListGroup,
  RemoteImage,
  StateView,
  Text,
} from "@shared/components";
import { useStyles } from "@shared/hooks";
import {
  AttractionsSheet,
  CountryLocalTime,
  CountryQuickFacts,
} from "../../components";
import { useCountryDetail } from "../../hooks";
import { countryDetailScreenStyles } from "./CountryDetailScreen.styles";

function CountryDetailScreenComponent() {
  const styles = useStyles(countryDetailScreenStyles);
  const {
    countryName,
    countryCode,
    subtitle,
    heroImages,
    localTime,
    quickFacts,
    rows,
    isLoading,
    attractionsSheetRef,
    isAttractionsOpen,
    handleAttractionsChange,
  } = useCountryDetail();

  const renderHeroImage = useCallback(
    (uri: string) => <RemoteImage source={uri} style={styles.heroImage} />,
    [styles.heroImage],
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
        <BackButton size={20} />
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
          <CountryQuickFacts facts={quickFacts} />

          <ListGroup items={rows} variant="default" />
        </View>
      </ScrollView>

      <AttractionsSheet
        sheetRef={attractionsSheetRef}
        countryName={countryName}
        countryCode={countryCode}
        isOpen={isAttractionsOpen}
        onSheetChange={handleAttractionsChange}
      />
    </View>
  );
}

export const CountryDetailScreen = memo(CountryDetailScreenComponent);
