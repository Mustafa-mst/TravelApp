import { ScrollView, useWindowDimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, MapView } from "@shared/components";
import { useStyles, useTheme } from "@shared/hooks";
import { ExploreTemplates } from "../../components";
import { HomeHeader } from "../../components/HomeHeader";
import { useHomeTemplates } from "../../hooks";
import { homeScreenStyles } from "./HomeScreen.styles";

export function HomeScreen() {
  const styles = useStyles(homeScreenStyles);
  const { themeName } = useTheme();
  const { width } = useWindowDimensions();

  const {
    templates,
    activeIndex,
    isLoading,
    isError,
    refetch,
    mapCenter,
    mapMarkers,
    onCardsScroll,
    openTemplate,
  } = useHomeTemplates(width);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style={themeName === "dark" ? "light" : "dark"} />
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <HomeHeader style={styles.sectionPadding} />
        <Divider margin={0} variant="dot" style={styles.sectionPadding} />

        <MapView style={styles.map} center={mapCenter} markers={mapMarkers} />

        <ExploreTemplates
          templates={templates}
          isLoading={isLoading}
          isError={isError}
          cardWidth={width}
          activeIndex={activeIndex}
          onRetry={refetch}
          onScroll={onCardsScroll}
          onSelect={openTemplate}
          headingStyle={styles.sectionPadding}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
