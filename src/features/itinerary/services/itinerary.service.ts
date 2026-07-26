import { supabase } from "@shared/services";
import type {
  FullItinerary,
  Itinerary,
  ItineraryDay,
  ItineraryDayWithItems,
  ItineraryItem,
  NewItineraryItemInput,
  UpdateItineraryItemInput,
} from "../types";
import { buildDayNumbers } from "../utils";

/**
 * Dedicated Supabase access layer for the itinerary feature. All queries live
 * here (never inside components); React Query hooks call these functions.
 *
 * The client is typed from `database.types.ts`, so plain-column selects return
 * the correct row types directly. Casts remain only where the app type diverges
 * from the raw DB row: joined relations (`cities`), the narrowed `place_type`
 * enum, and the client-only `type` field on items.
 */

export async function getItinerary(id: string): Promise<Itinerary> {
  const { data, error } = await supabase
    .from("itinerary_templates")
    .select("*, cities(name, country_code, latitude, longitude)")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data as Itinerary;
}

export async function getItineraryDays(
  itineraryId: string,
): Promise<ItineraryDay[]> {
  const { data, error } = await supabase
    .from("itinerary_template_days")
    .select("*")
    .eq("template_id", itineraryId)
    .order("day_number", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []) as ItineraryDay[];
}

export async function getItineraryItems(
  dayId: string,
): Promise<ItineraryItem[]> {
  const { data, error } = await supabase
    .from("itinerary_template_items")
    .select("*")
    .eq("template_day_id", dayId)
    .order("order_index", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []) as ItineraryItem[];
}

/**
 * Ensures `itinerary_template_days` exist for a template, exactly once.
 *
 * Idempotent: if days already exist they are returned untouched. Only when
 * none exist does it create one row per day (day_number 1..days_count).
 * Templates carry no dates, so rows hold only `template_id` + `day_number`.
 * The DB's unique (template_id, day_number) constraint is the backstop against
 * duplicates. Reusable across the app.
 */
export async function initializeItineraryDays(
  itineraryId: string,
): Promise<ItineraryDay[]> {
  const existing = await getItineraryDays(itineraryId);
  if (existing.length > 0) {
    return existing;
  }

  const itinerary = await getItinerary(itineraryId);
  const dayNumbers = buildDayNumbers(itinerary.days_count);

  const rows = dayNumbers.map((day_number) => ({
    template_id: itineraryId,
    day_number,
  }));

  const { data, error } = await supabase
    .from("itinerary_template_days")
    .insert(rows)
    .select();

  if (error) {
    throw error;
  }

  return ((data ?? []) as ItineraryDay[]).sort(
    (a, b) => a.day_number - b.day_number,
  );
}

/**
 * Loads an itinerary, ensures its days exist, then loads and groups all items
 * by day (each day's items sorted by order_index ascending).
 */
export async function getFullItinerary(
  itineraryId: string,
): Promise<FullItinerary> {
  const itinerary = await getItinerary(itineraryId);
  const days = await initializeItineraryDays(itineraryId);

  const dayIds = days.map((day) => day.id);

  let items: ItineraryItem[] = [];
  if (dayIds.length > 0) {
    const { data, error } = await supabase
      .from("itinerary_template_items")
      .select("*")
      .in("template_day_id", dayIds)
      .order("order_index", { ascending: true });

    if (error) {
      throw error;
    }

    items = (data ?? []) as ItineraryItem[];
  }

  const itemsByDay = new Map<string, ItineraryItem[]>();
  for (const item of items) {
    const bucket = itemsByDay.get(item.template_day_id);
    if (bucket) {
      bucket.push(item);
    } else {
      itemsByDay.set(item.template_day_id, [item]);
    }
  }

  const daysWithItems: ItineraryDayWithItems[] = days.map((day) => ({
    ...day,
    items: itemsByDay.get(day.id) ?? [],
  }));

  return { itinerary, days: daysWithItems };
}

/**
 * Returns the next order_index for a day (last index + 1, or 0 when empty).
 */
async function nextOrderIndex(dayId: string): Promise<number> {
  const { data, error } = await supabase
    .from("itinerary_template_items")
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

export async function createItineraryItem(
  input: NewItineraryItemInput,
): Promise<ItineraryItem> {
  const order_index =
    input.order_index ?? (await nextOrderIndex(input.template_day_id));

  // `type` is not a column on itinerary_template_items; drop it before insert.
  const { type: _type, ...columns } = input;

  const { data, error } = await supabase
    .from("itinerary_template_items")
    .insert({ ...columns, order_index })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as ItineraryItem;
}

export async function updateItineraryItem(
  id: string,
  patch: UpdateItineraryItemInput,
): Promise<ItineraryItem> {
  // `type` is not a column on itinerary_template_items; never send it in a patch.
  const { type: _type, ...columns } = patch;

  const { data, error } = await supabase
    .from("itinerary_template_items")
    .update(columns)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as ItineraryItem;
}

export async function deleteItineraryItem(id: string): Promise<void> {
  const { error } = await supabase
    .from("itinerary_template_items")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}
