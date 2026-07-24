import { memo, useCallback, useMemo, useRef } from "react";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { useRoute, type RouteProp } from "@react-navigation/native";

import {
  BackButton,
  BottomSheet,
  Divider,
  PressableScale,
  StateView,
  StaticList,
  Text,
  ZoomableMap,
} from "@shared/components";
import { CalendarMonthIcon, PlusIcon } from "@shared/assets/icons";
import type { RootStackParamList } from "@shared/navigation";
import { formatDistance, formatDuration } from "@/features/routes/utils";
import { AddItemSheet, DayTimelineCard } from "../../components";
import { useDayDetail } from "../../hooks";
import { formatFullDate, parseDateOnly } from "../../utils";
import { styles } from "./DayDetailScreen.styles";

type DayDetailRoute = RouteProp<RootStackParamList, "DayDetail">;

function DayDetailScreenComponent() {
  const { t } = useTranslation();
  const { params } = useRoute<DayDetailRoute>();
  const { itineraryId, dayId } = params;

  const {
    day,
    itinerary,
    route,
    isLoading,
    isError,
    mapCenter,
    mapMarkers,
    mapPolylines,
  } = useDayDetail(itineraryId, dayId);

  const itemSheetRef = useRef<BottomSheet>(null);

  const dayPlaceIds = useMemo(
    () =>
      (day?.items ?? [])
        .map((item) => item.google_place_id)
        .filter((id): id is string => id != null),
    [day?.items],
  );

  const openAddStop = useCallback(() => {
    itemSheetRef.current?.present();
  }, []);

  const metaData = useMemo(
    () => [
      {
        title: formatDuration(route?.totalDurationSeconds),
        subtitle: t("itinerary.detail.avgTravelTime"),
      },
      {
        title: formatDistance(route?.totalDistanceMeters),
        subtitle: t("itinerary.detail.totalDistance"),
      },

      {
        title: String(day?.items?.length ?? 0),
        subtitle: t("itinerary.detail.plannedStops"),
      },
    ],
    [route, day?.items?.length],
  );

  const renderMetaItem = useCallback(
    ({ item }: { item: { title: string; subtitle: string } }) => (
      <View>
        <Text variant="bodySemiBold" color="text">
          {item.title}
        </Text>
        <Text variant="captionMedium" color="textSecondary">
          {item.subtitle}
        </Text>
      </View>
    ),
    [],
  );

  const renderMetaSeparator = useCallback(
    () => (
      <Divider
        orientation="vertical"
        margin={20}
        style={styles.metaSeparator}
      />
    ),
    [],
  );

  return (
    <View style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ZoomableMap
          style={styles.hero}
          center={mapCenter}
          markers={mapMarkers}
          polylines={mapPolylines}
        />
        <BackButton />

        <View style={styles.body}>
          <StateView
            isLoading={isLoading}
            isError={isError || !day}
            errorLabel={t("itinerary.detail.loadError")}
          >
            {day ? (
              <View style={{ paddingTop: 16, gap: 18 }}>
                <View style={styles.titleBlock}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <CalendarMonthIcon width={16} height={16} />
                    <Text variant="captionMedium" color="textSecondary">
                      {formatFullDate(parseDateOnly(day.date))}
                    </Text>
                  </View>

                  <Text variant="h2">
                    {t("itinerary.detail.dayLabel", { day: day.day_number })}
                  </Text>
                </View>
                <StaticList
                  data={metaData}
                  renderItem={renderMetaItem}
                  ItemSeparatorComponent={renderMetaSeparator}
                  horizontal
                  style={styles.metaContainer}
                />
                <Divider margin={0}>
                  <View style={styles.dot} />
                </Divider>
                <View style={styles.sectionHeader}>
                  <Text variant="bodySemiBold" style={styles.sectionTitle}>
                    {t("itinerary.detail.stopsTitle")}
                  </Text>
                  <PressableScale
                    style={styles.addButton}
                    onPress={openAddStop}
                  >
                    <PlusIcon width={14} height={14} />
                    <Text>{t("itinerary.detail.addStop")}</Text>
                  </PressableScale>
                </View>
                <View style={styles.items}>
                  {day.items.map((item, index) => (
                    <DayTimelineCard
                      key={item.id}
                      item={item}
                      isFirst={index === 0}
                      isLast={index === day.items.length - 1}
                    />
                  ))}
                </View>
              </View>
            ) : null}
          </StateView>
        </View>
      </ScrollView>

      <AddItemSheet
        bottomSheetRef={itemSheetRef}
        itineraryId={itineraryId}
        dayId={dayId}
        initialSelectedPlaceIds={dayPlaceIds}
        latitude={itinerary?.cities?.latitude}
        longitude={itinerary?.cities?.longitude}
      />
    </View>
  );
}

export const DayDetailScreen = memo(DayDetailScreenComponent);
