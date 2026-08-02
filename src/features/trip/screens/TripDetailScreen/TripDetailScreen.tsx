import { memo, useCallback } from "react";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { useRoute, type RouteProp } from "@react-navigation/native";

import {
  BackButton,
  Divider,
  RemoteImage,
  Text,
  MapView,
} from "@shared/components";
import { CalendarMonthIcon, LocationIcon, MapIcon } from "@shared/assets/icons";
import type { RootStackParamList } from "@shared/navigation";
import {
  AddPlacesSheet,
  MetaInfo,
  TripActions,
  TripDetailOverview,
} from "../../components";
import {
  useToggleSavedTemplate,
  useTripDetail,
  useTripDetailActions,
} from "../../hooks";
import { resolveActiveDayNumber } from "../../utils";
import { styles } from "./TripDetailScreen.styles";

type TripDetailRoute = RouteProp<RootStackParamList, "TripDetail">;

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
    canEdit,
    canEditAction,
    mapCenter,
    mapMarkers,
  } = useTripDetail(id, mode);

  const { mutate: toggleSaved } = useToggleSavedTemplate();

  const onToggleSave = useCallback(() => {
    toggleSaved(id);
  }, [toggleSaved, id]);

  const {
    itemSheetRef,
    activeDayId,
    activeDayPlaceIds,
    openAddItem,
    openDay,
    goToActiveDay,
  } = useTripDetailActions({ id, mode, days });

  // Fall back to the list row the user just tapped, so the hero paints
  // immediately instead of waiting on the RPC.
  const title = detail?.title ?? preview?.title ?? "";
  const coverPhoto = detail?.cover_photo ?? preview?.cover_photo ?? null;
  const location = detail?.city?.name ?? "";
  const dateLabel = t("template.overview.dayCount", {
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
            source={{ uri: coverPhoto ?? undefined }}
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
                label={t("template.overview.dayActivityCount", {
                  count: totalActivities,
                })}
              />
              <Divider orientation="vertical" margin={12} />
              <MetaInfo Icon={CalendarMonthIcon} label={dateLabel} />
            </View>
          </View>

          <MapView
            style={styles.mapCard}
            center={mapCenter}
            markers={mapMarkers}
          />
          <Divider variant="dot" />
          <TripDetailOverview
            days={days ?? []}
            activeDayNumber={activeDayNumber}
            isLoading={isLoading}
            isError={isError}
            canEdit={canEdit}
            onRetry={refetch}
            onAddItem={canEdit ? openAddItem : undefined}
            onOpenDay={openDay}
          />
        </View>
      </ScrollView>

      {detail ? (
        <TripActions
          detail={detail}
          canEditAction={canEditAction}
          onToggleSave={onToggleSave}
        />
      ) : null}

      {canEdit && detail ? (
        <AddPlacesSheet
          bottomSheetRef={itemSheetRef}
          templateId={detail.id}
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
