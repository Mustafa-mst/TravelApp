import { supabase } from "@shared/services";
import type {
  NewTripTemplateItemInput,
  TripTemplateDay,
  TripTemplateItem,
} from "../types";
import { buildDayNumbers } from "../utils";

/**
 * Write path for templates: seeding day rows and adding items. Only templates
 * are writable — trips are read-only until the trip write path lands — so there
 * is no trip equivalent of this file.
 *
 * Reads go through `tripDetail.service` (the detail RPC) or
 * `templateDiscovery.service` (the browse lists). The one exception is the
 * table reads below, which back the seeding check and are deliberately private:
 * the detail RPC is the only supported way to read a template's tree.
 *
 * The client is typed from `database.types.ts`, so plain-column selects return
 * the correct row types. Casts remain only where the app type diverges from the
 * raw row: the narrowed `place_type` enum and the client-only `type` field.
 */

async function getTemplateDaysCount(templateId: string): Promise<number> {
  const { data, error } = await supabase
    .from("trip_templates")
    .select("days_count")
    .eq("id", templateId)
    .single();

  if (error) {
    throw error;
  }

  return data.days_count;
}

async function getTemplateDays(templateId: string): Promise<TripTemplateDay[]> {
  const { data, error } = await supabase
    .from("trip_template_days")
    .select("*")
    .eq("template_id", templateId)
    .order("day_number", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []) as TripTemplateDay[];
}

/**
 * Ensures `trip_template_days` exist for a template, exactly once.
 *
 * Idempotent: if days already exist they are returned untouched. Only when
 * none exist does it create one row per day (day_number 1..days_count).
 * Templates carry no dates, so rows hold only `template_id` + `day_number`.
 * The DB's unique (template_id, day_number) constraint is the backstop against
 * duplicates.
 */
export async function initializeTemplateDays(
  templateId: string,
): Promise<TripTemplateDay[]> {
  const existing = await getTemplateDays(templateId);
  if (existing.length > 0) {
    return existing;
  }

  const daysCount = await getTemplateDaysCount(templateId);
  const rows = buildDayNumbers(daysCount).map((day_number) => ({
    template_id: templateId,
    day_number,
  }));

  const { data, error } = await supabase
    .from("trip_template_days")
    .insert(rows)
    .select();

  if (error) {
    throw error;
  }

  return ((data ?? []) as TripTemplateDay[]).sort(
    (a, b) => a.day_number - b.day_number,
  );
}

/**
 * Returns the next order_index for a day (last index + 1, or 0 when empty).
 */
async function nextOrderIndex(dayId: string): Promise<number> {
  const { data, error } = await supabase
    .from("trip_template_items")
    .select("order_index")
    .eq("template_day_id", dayId)
    .order("order_index", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  const last = (data as { order_index: number } | null)?.order_index;
  return last === undefined || last === null ? 0 : last + 1;
}

export async function toggleSavedTemplate(
  templateId: string,
): Promise<{ is_saved: boolean; saves_count: number }> {
  const { data, error } = await supabase.rpc("toggle_saved_template", {
    p_template_id: templateId,
  });

  if (error) {
    throw error;
  }

  const result = data?.[0];
  if (!result) {
    throw new Error(`Toggle save returned no row: ${templateId}`);
  }

  return result;
}

export async function createTemplateItem(
  input: NewTripTemplateItemInput,
): Promise<TripTemplateItem> {
  const order_index =
    input.order_index ?? (await nextOrderIndex(input.template_day_id));

  // `type` is not a column on trip_template_items; drop it before insert.
  const { type: _type, ...columns } = input;

  const { data, error } = await supabase
    .from("trip_template_items")
    .insert({ ...columns, order_index })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as TripTemplateItem;
}
