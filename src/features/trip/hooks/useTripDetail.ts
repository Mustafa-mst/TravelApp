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
  const isOwner = data?.can_edit ?? false;

  // Structural editing (adding days/places) is a template-only capability, so
  // it stays gated on mode. A trip is an instance of a template and has no
  // writable tree of its own yet.
  const canEdit = isOwner && mode === "template";

  // The primary action is edit whenever the plan is the viewer's to change —
  // their own template, or any trip they opened. Otherwise the template belongs
  // to someone else and the slot becomes a bookmark instead.
  const canEditAction = isOwner || mode === "trip";

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
