import { supabase } from "@shared/services";
import type { TemplateDetail, TripDetail } from "../types";
import { mapTemplateDetail, mapTripDetail } from "./tripDetail.mapper";
import { initializeTemplateDays } from "./templateWrite.service";

/**
 * Detail reads for both modes. `viewerId` decides `can_edit` (ownership, not
 * mode), so it cannot be inferred from the payload — pass null when anonymous.
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
 * Day rows are created lazily, so a template saved before they existed returns
 * none and would render an empty plan. Seed and re-read in that case. Seeding
 * needs ownership, so other people's templates just come back empty.
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
