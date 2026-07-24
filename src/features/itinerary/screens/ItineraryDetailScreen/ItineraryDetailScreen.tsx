import { memo } from "react";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { useRoute, type RouteProp } from "@react-navigation/native";

import {
  BackButton,
  Divider,
  RemoteImage,
  Text,
  ZoomableMap,
} from "@shared/components";
import {
  CalendarMonthIcon,
  LocationIcon,
  MapIcon,
} from "@shared/assets/icons";
import { backgroundImage } from "@shared/assets/images";
import type { RootStackParamList } from "@shared/navigation";
import { AddItemSheet, ItineraryOverview, MetaInfo } from "../../components";
import { useItineraryDetail } from "../../hooks";
import { formatDateRange } from "../../utils";
import { styles } from "./ItineraryDetailScreen.styles";

type ItineraryDetailRoute = RouteProp<RootStackParamList, "ItineraryDetail">;

function ItineraryDetailScreenComponent() {
  const { t } = useTranslation();
  const { params } = useRoute<ItineraryDetailRoute>();
  const { itinerary } = params;

  const {
    isLoading,
    isError,
    refetch,
    days,
    totalActivities,
    activeDayNumber,
    mapCenter,
    mapMarkers,
    itemSheetRef,
    activeDayId,
    activeDayPlaceIds,
    openAddItem,
    openDay,
    goToActiveDay,
  } = useItineraryDetail(itinerary);

  const location = itinerary.cities?.name ?? "";
  const dateLabel = formatDateRange(itinerary.start_date, itinerary.end_date);

  return (
    <View style={styles.safe}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <RemoteImage
            source={
              itinerary.cover_photo
                ? { uri: itinerary.cover_photo }
                : backgroundImage
            }
            style={styles.heroImage}
          />
          <View style={styles.heroScrim} />
        </View>
        <BackButton />
        <View style={styles.body}>
          <View style={styles.titleBlock}>
            <Text variant="h2">{itinerary.title}</Text>
            <View style={styles.metaContainer}>
              <MetaInfo Icon={LocationIcon} label={location} />
              <Divider orientation="vertical" margin={12} />
              <MetaInfo
                Icon={MapIcon}
                label={t("itinerary.overview.dayActivityCount", {
                  count: totalActivities,
                })}
              />
              <Divider orientation="vertical" margin={12} />
              <MetaInfo Icon={CalendarMonthIcon} label={dateLabel} />
            </View>
          </View>

          <ZoomableMap
            style={styles.mapCard}
            center={mapCenter}
            markers={mapMarkers}
          />
          <Divider>
            <View style={styles.dot} />
          </Divider>
          <ItineraryOverview
            days={days}
            activeDayNumber={activeDayNumber}
            isLoading={isLoading}
            isError={isError}
            onRetry={refetch}
            onAddItem={openAddItem}
            onOpenDay={openDay}
          />
        </View>
      </ScrollView>

      <AddItemSheet
        bottomSheetRef={itemSheetRef}
        itineraryId={itinerary.id}
        dayId={activeDayId}
        initialSelectedPlaceIds={activeDayPlaceIds}
        latitude={itinerary.cities?.latitude}
        longitude={itinerary.cities?.longitude}
        onAdded={goToActiveDay}
      />
    </View>
  );
}

export const ItineraryDetailScreen = memo(ItineraryDetailScreenComponent);
