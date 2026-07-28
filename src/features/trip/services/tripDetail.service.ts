import { supabase } from "@shared/services";
import type { TemplateDetail, TripDetail } from "../types";
import { mapTemplateDetail, mapTripDetail } from "./tripDetail.mapper";
import { initializeTemplateDays } from "./templateWrite.service";

/**
 * Read path for the detail screen, both modes. Each mode has one RPC that
 * returns the whole tree (detail + days + items) in a single round trip; the
 * raw payloads are normalized into the unified model by `tripDetail.mapper`.
 *
 * Writes live in `templateWrite.service`. The two are split on read/write
 * rather than on template/trip because the screen reads through one interface
 * (`useTripDetail`) while only templates are writable.
 *
 * `viewerId` decides `can_edit` in both modes — it is ownership, not mode, so
 * it cannot be inferred from the payload. Pass the signed-in user's id, or null
 * when anonymous.
 */

/**
 * Loads a trip via `get_trip_detail`, which joins the linked template for the
 * title, cover and city — a `trips` row carries only the pointer, start date
 * and status.
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

async function fetchTemplateDetail(templateId: string) {
  const { data, error } = await supabase.rpc("get_template_detail", {
    p_template_id: templateId,
  });

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error(`Template not found: ${templateId}`);
  }

  return data;
}

/**
 * Loads a template via `get_template_detail`.
 *
 * A template records how long it runs in `days_count`, but its day rows are
 * created lazily, so one saved before those rows existed returns no days and
 * would render an empty plan. When the RPC comes back with none but the
 * template claims some, the rows are seeded and the RPC is re-read. Seeding
 * requires ownership, so a viewer looking at someone else's template just gets
 * the empty result.
 */
export async function getTemplateDetail(
  templateId: string,
  viewerId: string | null,
): Promise<TemplateDetail> {
  const detail = mapTemplateDetail(
    await fetchTemplateDetail(templateId),
    viewerId,
  );

  if (detail.days.length > 0 || detail.days_count <= 0 || !detail.can_edit) {
    return detail;
  }

  await initializeTemplateDays(templateId);
  return mapTemplateDetail(await fetchTemplateDetail(templateId), viewerId);
}
