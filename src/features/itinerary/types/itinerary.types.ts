import { PlaceTypes } from "@/features/places/constants/places.constants";
import type { Tables } from "@shared/services";

/**
 * Result row of the `search_cities` RPC (not the `cities` table itself, whose
 * columns are `geoname_id`, `name`, `ascii_name`, …). Used by city search.
 */
export type City = {
  geoname_id: number;
  city: string;
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
  population: number;
};

/** Joined columns from the `cities` table (its city name column is `name`). */
export type ItineraryCity = {
  name: string;
  country_code: string;
  latitude: number | null;
  longitude: number | null;
};

/** Lightweight city selection kept on the create/edit form. */
export type SelectedCity = ItineraryCity & {
  geoname_id: number;
};

/**
 * Row of the `itinerary_templates` table (DB-generated), plus the joined city
 * relation pulled in by `select("*, cities(...)")`. Templates carry no dates —
 * `days_count` is the source of truth for how many days the itinerary spans.
 */
export type Itinerary = Tables<"itinerary_templates"> & {
  cities?: ItineraryCity | null;
};

export type NewItineraryInput = {
  title: string;
  city_geoname_id: number;
  days_count: number;
  cover_photo?: string | null;
};

/** Allowed `type` values on the create form (client-only, not a DB column). */
export type ItineraryItemType = "place" | "activity" | "note";

/** Row of the `itinerary_template_days` table (DB-generated). No `date` column. */
export type ItineraryDay = Tables<"itinerary_template_days">;

/**
 * Row of the `itinerary_template_items` table (DB-generated), with `place_type`
 * narrowed to the app enum, plus the client-only `type` field. `type` is used
 * by the form/schema and validation but is dropped before insert (never a DB
 * column). The DB day foreign key is `template_day_id`.
 */
export type ItineraryItem = Omit<
  Tables<"itinerary_template_items">,
  "place_type"
> & {
  place_type: PlaceTypes;
  type: ItineraryItemType;
};

/**
 * Payload for inserting an item. Server-managed columns are omitted; the
 * service computes `order_index` (last index of the day + 1) unless provided.
 */
export type NewItineraryItemInput = Omit<
  ItineraryItem,
  "id" | "created_at" | "updated_at" | "order_index"
> & { order_index?: number };

/** Partial patch for updating an item; the day and server columns are fixed. */
export type UpdateItineraryItemInput = Partial<
  Omit<ItineraryItem, "id" | "template_day_id" | "created_at" | "updated_at">
>;

/** A day joined with its ordered items — the shape the detail screen renders. */
export type ItineraryDayWithItems = ItineraryDay & {
  items: ItineraryItem[];
};

/** The full itinerary payload consumed by the detail screen. */
export type FullItinerary = {
  itinerary: Itinerary;
  days: ItineraryDayWithItems[];
};
