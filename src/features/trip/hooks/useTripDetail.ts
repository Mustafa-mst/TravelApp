import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/features/auth";
import { TripDetailMode } from "../constants";
import { getTemplateDetail, getTripDetail } from "../services";
import type { TripDetailView } from "../types";
import { templateKeys, tripKeys } from "./query";
import { useTripMapData } from "./useTripMapData";

const FIVE_MINUTES_IN_MS = 1000 * 60 * 5;

export function useTripDetail(id: string, mode: TripDetailMode) {
  const session = useAuthStore((state) => state.session);
  const viewerId = session?.user.id ?? null;

  const query = useQuery<TripDetailView>({
    queryKey:
      mode === TripDetailMode.Trip
        ? tripKeys.detail(id)
        : templateKeys.detail(id),
    enabled: Boolean(id),
    staleTime: FIVE_MINUTES_IN_MS,
    queryFn: () =>
      mode === TripDetailMode.Trip
        ? getTripDetail(id, viewerId)
        : getTemplateDetail(id, viewerId),
  });

  const { data } = query;
  const { mapCenter, mapMarkers } = useTripMapData(data?.days, data?.city);
  const isOwner = data?.can_edit ?? false;

  // Trips have no writable tree yet, so structural editing is template-only.
  const canEdit = isOwner && mode === TripDetailMode.Template;

  // Someone else's template shows a bookmark in the primary action slot instead.
  const canEditAction = isOwner || mode === TripDetailMode.Trip;

  return {
    detail: data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    days: data?.days,
    totalActivities: data?.places_count ?? 0,
    canEdit,
    canEditAction,
    mapCenter,
    mapMarkers,
  };
}
