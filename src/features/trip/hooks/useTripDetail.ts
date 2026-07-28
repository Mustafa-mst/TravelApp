import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/features/auth";
import { getTemplateDetail, getTripDetail } from "../services";
import type { TripDetailMode, TripDetailView } from "../types";
import { templateKeys, tripKeys } from "./query";
import { useTripMapData } from "./useTripMapData";

const FIVE_MINUTES_IN_MS = 1000 * 60 * 5;

/**
 * Loads a detail view from either source behind one interface, so the screen
 * never branches on where the data came from.
 *
 * One query, whose key and fetcher are chosen by `mode` — the caller always
 * knows the mode from its route params, which is more trustworthy than the
 * `mode` the RPC echoes back. The two modes deliberately use separate key
 * namespaces; see `tripKeys`.
 */
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

  return {
    detail: data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    days: data?.days,
    totalActivities: data?.places_count ?? 0,
    mapCenter,
    mapMarkers,
  };
}
