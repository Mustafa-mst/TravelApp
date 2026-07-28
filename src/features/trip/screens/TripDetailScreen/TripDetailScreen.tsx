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
import {
  AddItemSheet,
  MetaInfo,
  TripActions,
  TripDetailOverview,
} from "../../components";
import { useTripDetail, useTripDetailActions } from "../../hooks";
import { resolveActiveDayNumber } from "../../utils";
import { styles } from "./TripDetailScreen.styles";

type TripDetailRoute = RouteProp<RootStackParamList, "TripDetail">;

/**
 * Renders a template or a real trip from the same model. The only thing that
 * branches on the source is `TripActions`; everything here reads the shared
 * fields, and editing is gated on ownership rather than on the mode.
 */
function TripDetailScreenComponent() {
  const { t } = useTranslation();
  const { params } = useRoute<TripDetailRoute>();
  const { id, mode, preview } = params;

  const {
    detail,
    isLoading,
    isError,
    refetch,
    days,
    totalActivities,
    mapCenter,
    mapMarkers,
  } = useTripDetail(id, mode);

  const {
    itemSheetRef,
    activeDayId,
    activeDayPlaceIds,
    openAddItem,
    openDay,
    goToActiveDay,
  } = useTripDetailActions({ id, mode, days });

  // Only the owner may edit, and only templates are writable for now — trip
  // items are read-only until the trip write path lands.
  const canEdit = (detail?.can_edit ?? false) && mode === "template";

  // Fall back to the list row the user just tapped, so the hero paints
  // immediately instead of waiting on the RPC.
  const title = detail?.title ?? preview?.title ?? "";
  const coverPhoto = detail?.cover_photo ?? preview?.cover_photo ?? null;
  const location = detail?.city?.name ?? "";
  const dateLabel = t("itinerary.overview.dayCount", {
    count: detail?.days_count ?? 0,
  });

  const activeDayNumber = canEdit
    ? resolveActiveDayNumber(days?.length ?? 0)
    : 0;

  return (
    <View style={styles.safe}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <RemoteImage
            source={coverPhoto ? { uri: coverPhoto } : backgroundImage}
            style={styles.heroImage}
          />
          <View style={styles.heroScrim} />
        </View>
        <BackButton />
        <View style={styles.body}>
          <View style={styles.titleBlock}>
            <Text variant="h2">{title}</Text>
            <View style={styles.metaContainer}>
              {location ? (
                <>
                  <MetaInfo Icon={LocationIcon} label={location} />
                  <Divider orientation="vertical" margin={12} />
                </>
              ) : null}
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

          {detail ? <TripActions detail={detail} /> : null}

          <ZoomableMap
            style={styles.mapCard}
            center={mapCenter}
            markers={mapMarkers}
          />
          <Divider>
            <View style={styles.dot} />
          </Divider>
          {/* Edit handlers are withheld from viewers who cannot edit. */}
          <TripDetailOverview
            days={days ?? []}
            activeDayNumber={activeDayNumber}
            isLoading={isLoading}
            isError={isError}
            onRetry={refetch}
            onAddItem={canEdit ? openAddItem : undefined}
            onOpenDay={canEdit ? openDay : undefined}
          />
        </View>
      </ScrollView>

      {canEdit && detail ? (
        <AddItemSheet
          bottomSheetRef={itemSheetRef}
          itineraryId={detail.id}
          dayId={activeDayId}
          initialSelectedPlaceIds={activeDayPlaceIds}
          latitude={detail.city?.latitude}
          longitude={detail.city?.longitude}
          onAdded={goToActiveDay}
        />
      ) : null}
    </View>
  );
}

export const TripDetailScreen = memo(TripDetailScreenComponent);
