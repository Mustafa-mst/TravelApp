import { PlaceTypes } from "@/features/places/constants";
import { TripDetailMode, TripStatus } from "../constants";
import type { SelectedCity } from "./tripTemplate.types";

/** The mapper normalizes `trip_day_id` / `template_day_id` to `day_id`. */
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

export type TripDetailDay = {
  id: string;
  day_number: number;
  /** Trip mode only — templates have no start date to derive one from. */
  date: string | null;
  items: TripDetailItem[];
};

/** Trip mode sources the title, cover and city from its linked template row. */
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
  /** Ownership, not mode — cannot be derived from `mode` alone. */
  can_edit: boolean;
};

export type TemplateDetail = TripDetailBase & {
  mode: TripDetailMode.Template;
  is_saved: boolean;
  saves_count: number;
};

export type TripDetail = TripDetailBase & {
  mode: TripDetailMode.Trip;
  template_id: string;
  start_date: string;
  status: TripStatus;
};

/** Discriminated on `mode`, so consumers narrow instead of null-checking. */
export type TripDetailView = TemplateDetail | TripDetail;
