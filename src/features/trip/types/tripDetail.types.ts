import { PlaceTypes } from "@/features/places/constants";
import type { SelectedCity } from "./tripTemplate.types";

/**
 * Which source a detail view was loaded from. A template is a reusable plan
 * with no dates; a trip is a real journey created from one, anchored to a
 * start date. The route param is the source of truth — the RPC also echoes a
 * `mode`, but the caller always knows it first.
 */
export type TripDetailMode = "template" | "trip";

export type TripStatus = "planned" | "active" | "completed" | "cancelled";

/**
 * A place inside a day. `trip_items` and `trip_template_items` carry the same
 * columns apart from their day foreign key (`trip_day_id` vs
 * `template_day_id`), which the mapper normalizes to `day_id`.
 */
export type TripDetailItem = {
  id: string;
  day_id: string;
  name: string;
  description: string | null;
  starts_at: string | null;
  ends_at: string | null;
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  google_place_id: string | null;
  image_url: string | null;
  notes: string | null;
  place_type: PlaceTypes;
  order_index: number;
};

/**
 * A day joined with its ordered items. `date` exists only in trip mode —
 * `trip_template_days` has no date column and a template has no start date to
 * derive one from — so it is null for templates.
 */
export type TripDetailDay = {
  id: string;
  day_number: number;
  date: string | null;
  items: TripDetailItem[];
};

/**
 * Everything both modes render. Trip mode sources the title, cover and city
 * from its linked template row, which is where those columns actually live —
 * a `trips` row holds only the pointer, dates and status.
 */
type TripDetailBase = {
  id: string;
  title: string;
  cover_photo: string | null;
  city: SelectedCity | null;
  city_geoname_id: number;
  days_count: number;
  places_count: number;
  days: TripDetailDay[];
  author_id: string;
  /**
   * Whether the viewer may edit this. Ownership, not mode — a template you
   * authored is editable, so this cannot be derived from `mode` alone.
   */
  can_edit: boolean;
};

export type TemplateDetail = TripDetailBase & {
  mode: "template";
  is_saved: boolean;
  saves_count: number;
};

export type TripDetail = TripDetailBase & {
  mode: "trip";
  template_id: string;
  start_date: string;
  status: TripStatus;
};

/**
 * The unified model the detail screen renders. A discriminated union rather
 * than one type with optional fields, so `mode` narrows template-only and
 * trip-only fields instead of every consumer null-checking them.
 */
export type TripDetailView = TemplateDetail | TripDetail;
