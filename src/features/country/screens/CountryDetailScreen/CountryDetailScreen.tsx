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
import { useCountryDetail } from "../../hooks";
import { countryDetailScreenStyles } from "./CountryDetailScreen.styles";

function CountryDetailScreenComponent() {
  const styles = useStyles(countryDetailScreenStyles);
  const { countryName, subtitle, heroImages, rows, isLoading } =
    useCountryDetail();

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

        <ListGroup items={rows} variant="default"/>
      </ScrollView>
    </View>
  );
}

export const CountryDetailScreen = memo(CountryDetailScreenComponent);
