import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/features/auth";
import { getTemplateDetail, getTripDetail } from "../services";
import type { TripDetailMode, TripDetailView } from "../types";
import { templateKeys, tripKeys } from "./query";
import { useTripMapData } from "./useTripMapData";

const FIVE_MINUTES_IN_MS = 1000 * 60 * 5;

export function useTripDetail(id: string, mode: TripDetailMode) {
  const session = useAuthStore((state) => state.session);
  const viewerId = session?.user.id ?? null;

  const query = useQuery<TripDetailView>({
    queryKey: mode === "trip" ? tripKeys.detail(id) : templateKeys.detail(id),
    enabled: Boolean(id),
    staleTime: FIVE_MINUTES_IN_MS,
    queryFn: () =>
      mode === "trip"
        ? getTripDetail(id, viewerId)
        : getTemplateDetail(id, viewerId),
  });

  const { data } = query;
  const { mapCenter, mapMarkers } = useTripMapData(data?.days, data?.city);
  const canEdit = (data?.can_edit ?? false) && mode === "template";

  return {
    detail: data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    days: data?.days,
    totalActivities: data?.places_count ?? 0,
    canEdit,
    mapCenter,
    mapMarkers,
  };
}
