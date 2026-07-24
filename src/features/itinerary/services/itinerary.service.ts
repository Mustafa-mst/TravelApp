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
import { buildDays, toDateOnly } from "../utils";

/**
 * Dedicated Supabase access layer for the itinerary feature. All queries live
 * here (never inside components); React Query hooks call these functions.
 * The client is untyped, so results are cast to the row types in `../types`.
 */

export async function getItinerary(id: string): Promise<Itinerary> {
  const { data, error } = await supabase
    .from("itineraries")
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
    .from("itinerary_days")
    .select("*")
    .eq("itinerary_id", itineraryId)
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
    .from("itinerary_items")
    .select("*")
    .eq("day_id", dayId)
    .order("order_index", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []) as ItineraryItem[];
}

/**
 * Ensures `itinerary_days` exist for an itinerary, exactly once.
 *
 * Idempotent: if days already exist they are returned untouched. Only when
 * none exist does it create one row per calendar day (day_number from 1, date
 * matching the calendar date). The DB's unique (itinerary_id, day_number)
 * constraint is the backstop against duplicates. Reusable across the app.
 */
export async function initializeItineraryDays(
  itineraryId: string,
): Promise<ItineraryDay[]> {
  const existing = await getItineraryDays(itineraryId);
  if (existing.length > 0) {
    return existing;
  }

  const itinerary = await getItinerary(itineraryId);
  const days = buildDays(itinerary.start_date, itinerary.end_date);

  const rows = days.map((day, index) => ({
    itinerary_id: itineraryId,
    day_number: index + 1,
    date: toDateOnly(day),
  }));

  const { data, error } = await supabase
    .from("itinerary_days")
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
      .from("itinerary_items")
      .select("*")
      .in("day_id", dayIds)
      .order("order_index", { ascending: true });

    if (error) {
      throw error;
    }

    items = (data ?? []) as ItineraryItem[];
  }

  const itemsByDay = new Map<string, ItineraryItem[]>();
  for (const item of items) {
    const bucket = itemsByDay.get(item.day_id);
    if (bucket) {
      bucket.push(item);
    } else {
      itemsByDay.set(item.day_id, [item]);
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
    .from("itinerary_items")
    .select("order_index")
    .eq("day_id", dayId)
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
    input.order_index ?? (await nextOrderIndex(input.day_id));

  // `type` is not a column on itinerary_items; drop it before inserting.
  const { type: _type, ...columns } = input;

  const { data, error } = await supabase
    .from("itinerary_items")
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
  // `type` is not a column on itinerary_items; never send it in a patch.
  const { type: _type, ...columns } = patch;

  const { data, error } = await supabase
    .from("itinerary_items")
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
    .from("itinerary_items")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}
