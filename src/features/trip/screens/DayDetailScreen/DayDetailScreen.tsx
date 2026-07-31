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
import { PlusIcon } from "@shared/assets/icons";
import type { RootStackParamList } from "@shared/navigation";
import { formatDistance, formatDuration } from "@/features/routes/utils";
import { AddPlacesSheet, DayTimelineCard } from "../../components";
import { useDayDetail } from "../../hooks";
import { collectPlaceIds } from "../../utils";
import { styles } from "./DayDetailScreen.styles";

type DayDetailRoute = RouteProp<RootStackParamList, "DayDetail">;

function DayDetailScreenComponent() {
  const { t } = useTranslation();
  const { params } = useRoute<DayDetailRoute>();
  const { id, mode, dayId } = params;

  const {
    day,
    detail,
    route,
    isLoading,
    isError,
    canEdit,
    mapCenter,
    mapMarkers,
    mapPolylines,
  } = useDayDetail(id, mode, dayId);

  const itemSheetRef = useRef<BottomSheet>(null);

  const dayPlaceIds = useMemo(() => collectPlaceIds(day?.items), [day?.items]);

  const openAddStop = useCallback(() => {
    itemSheetRef.current?.present();
  }, []);

  const metaData = useMemo(
    () => [
      {
        title: formatDuration(route?.totalDurationSeconds),
        subtitle: t("template.detail.avgTravelTime"),
      },
      {
        title: formatDistance(route?.totalDistanceMeters),
        subtitle: t("template.detail.totalDistance"),
      },
      {
        title: String(day?.items?.length ?? 0),
        subtitle: t("template.detail.plannedStops"),
      },
    ],
    [
      t,
      route?.totalDurationSeconds,
      route?.totalDistanceMeters,
      day?.items?.length,
    ],
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
            errorLabel={t("template.detail.loadError")}
          >
            {day ? (
              <View style={styles.content}>
                <View style={styles.titleBlock}>
                  <Text variant="h2">
                    {t("template.detail.dayLabel", { day: day.day_number })}
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
                    {t("template.detail.stopsTitle")}
                  </Text>
                  {canEdit ? (
                    <PressableScale
                      style={styles.addButton}
                      onPress={openAddStop}
                    >
                      <PlusIcon width={14} height={14} />
                      <Text>{t("template.detail.addStop")}</Text>
                    </PressableScale>
                  ) : null}
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

      {canEdit ? (
        <AddPlacesSheet
          bottomSheetRef={itemSheetRef}
          templateId={id}
          dayId={dayId}
          initialSelectedPlaceIds={dayPlaceIds}
          latitude={detail?.city?.latitude}
          longitude={detail?.city?.longitude}
        />
      ) : null}
    </View>
  );
}

export const DayDetailScreen = memo(DayDetailScreenComponent);
