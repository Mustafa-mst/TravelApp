import { supabase } from "@shared/services";
import type { TemplateCard, TemplateDetail } from "../types";
import { mapTemplateDetail } from "./trip-detail.mapper";
import { initializeItineraryDays } from "./trip-template.service";

export async function getFeaturedTemplates(): Promise<TemplateCard[]> {
  const { data, error } = await supabase
    .from("v_template_cards")
    .select("*")
    .eq("visibility", "public")
    .eq("source", "system")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getPopularTemplates(): Promise<TemplateCard[]> {
  const { data, error } = await supabase
    .from("v_template_cards")
    .select("*")
    .eq("visibility", "public")
    .order("saves_count", { ascending: false })
    .limit(10);

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getRecentTemplates(): Promise<TemplateCard[]> {
  const { data, error } = await supabase
    .from("v_template_cards")
    .select("*")
    .eq("visibility", "public")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getMyTemplates(userId: string): Promise<TemplateCard[]> {
  const { data, error } = await supabase
    .from("v_template_cards")
    .select("*")
    .eq("author_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

/**
 * Loads a template with its days and items via the `get_template_detail` RPC.
 *
 * `viewerId` decides `can_edit` — a template you authored is editable, so this
 * cannot be inferred from the fact that it is a template. Pass the signed-in
 * user's id, or null when anonymous.
 *
 * A template records how long it runs in `days_count`, but its day rows are
 * created lazily, so one saved before those rows existed returns no days and
 * would render an empty plan. When the RPC comes back with none but the
 * template claims some, the rows are seeded and the RPC is re-read. Seeding
 * requires ownership, so a viewer looking at someone else's template just gets
 * the empty result.
 */
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

export async function getTemplateDetail(
  templateId: string,
  viewerId: string | null,
): Promise<TemplateDetail> {
  const raw = await fetchTemplateDetail(templateId);
  const detail = mapTemplateDetail(raw, viewerId);

  if (detail.days.length > 0 || detail.days_count <= 0 || !detail.can_edit) {
    return detail;
  }

  await initializeItineraryDays(templateId);
  return mapTemplateDetail(await fetchTemplateDetail(templateId), viewerId);
}
