import { supabase } from "@shared/services";
import type { TripDetail } from "../types";
import { mapTripDetail } from "./trip-detail.mapper";

/**
 * Supabase access layer for real trips (as opposed to the templates they are
 * created from, which live in `trip-template.service.ts`).
 */

/**
 * Loads a trip with its days and items via the `get_trip_detail` RPC, which
 * joins the linked template for the title, cover and city — a `trips` row
 * carries only the pointer, start date and status.
 *
 * `viewerId` decides `can_edit`; pass the signed-in user's id, or null when
 * anonymous.
 */
export async function getTripDetail(
  tripId: string,
  viewerId: string | null,
): Promise<TripDetail> {
  const { data, error } = await supabase.rpc("get_trip_detail", {
    p_trip_id: tripId,
  });

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error(`Trip not found: ${tripId}`);
  }

  return mapTripDetail(data, viewerId);
}
