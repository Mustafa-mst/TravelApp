import { PlaceTypes } from "@/features/places/constants/places.constants";

export type City = {
  geoname_id: number;
  city: string;
  country: string;
  country_code: string;
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

/** Row shape of the `itineraries` table, with the joined city relation. */
export type Itinerary = {
  id: string;
  user_id: string;
  title: string;
  city_geoname_id: number;
  start_date: string;
  end_date: string;
  cover_photo: string | null;
  created_at: string;
  updated_at: string;
  cities?: ItineraryCity | null;
};

export type NewItineraryInput = {
  title: string;
  city_geoname_id: number;
  start_date: string;
  end_date: string;
  cover_photo?: string | null;
};

/** Allowed `type` values on the `itinerary_items` table. */
export type ItineraryItemType = "place" | "activity" | "note";

/** Row shape of the `itinerary_days` table. */
export type ItineraryDay = {
  id: string;
  itinerary_id: string;
  day_number: number;
  date: string; // "YYYY-MM-DD"
  created_at: string;
  updated_at: string;
};

export type ItineraryItem = {
  id: string;
  day_id: string;
  order_index: number;
  type: ItineraryItemType;
  name: string;
  description: string | null;
  starts_at: string | null; // "HH:MM:SS"
  ends_at: string | null;
  google_place_id: string | null;
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  image_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  place_type: PlaceTypes;
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
  Omit<ItineraryItem, "id" | "day_id" | "created_at" | "updated_at">
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
