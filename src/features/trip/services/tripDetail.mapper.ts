import { PlaceTypes } from "@/features/places/constants";
import {
  toArray,
  toEnum,
  toNumber,
  toNumberOrNull,
  toText,
  toTextOrNull,
} from "@shared/utils/json";
import { TripDetailMode, TripStatus } from "../constants";
import type {
  SelectedCity,
  TemplateDetail,
  TripDetail,
  TripDetailDay,
  TripDetailItem,
} from "../types";

const PLACE_TYPES = new Set<string>(Object.values(PlaceTypes));

const TRIP_STATUSES = new Set<string>(Object.values(TripStatus));

type Raw = Record<string, unknown>;

function mapItem(raw: Raw): TripDetailItem {
  return {
    id: toText(raw.id),
    day_id: toText(raw.day_id ?? raw.trip_day_id ?? raw.template_day_id),
    name: toText(raw.name),
    description: toTextOrNull(raw.description),
    starts_at: toTextOrNull(raw.starts_at),
    ends_at: toTextOrNull(raw.ends_at),
    latitude: toNumberOrNull(raw.latitude),
    longitude: toNumberOrNull(raw.longitude),
    address: toTextOrNull(raw.address),
    google_place_id: toTextOrNull(raw.google_place_id),
    image_url: toTextOrNull(raw.image_url),
    notes: toTextOrNull(raw.notes),
    place_type: toEnum(
      raw.place_type,
      PLACE_TYPES,
      PlaceTypes.TouristAttraction,
    ),
    order_index: toNumber(raw.order_index),
  };
}

function mapDay(raw: Raw): TripDetailDay {
  return {
    id: toText(raw.id),
    day_number: toNumber(raw.day_number),
    date: toTextOrNull(raw.date),
    items: toArray(raw.items)
      .map((item) => mapItem(item as Raw))
      .sort((a, b) => a.order_index - b.order_index),
  };
}

function mapDays(raw: unknown): TripDetailDay[] {
  return toArray(raw)
    .map((day) => mapDay(day as Raw))
    .sort((a, b) => a.day_number - b.day_number);
}

function mapCity(raw: unknown): SelectedCity | null {
  if (raw == null || typeof raw !== "object") {
    return null;
  }

  const city = raw as Raw;
  return {
    geoname_id: toNumber(city.geoname_id),
    name: toText(city.name),
    country_code: toText(city.country_code),
    latitude: toNumberOrNull(city.latitude),
    longitude: toNumberOrNull(city.longitude),
  };
}

function mapBase(raw: Raw, viewerId: string | null) {
  const authorId = toText(raw.author_id);

  return {
    id: toText(raw.id),
    title: toText(raw.title),
    cover_photo: toTextOrNull(raw.cover_photo),
    city: mapCity(raw.city),
    city_geoname_id: toNumber(raw.city_geoname_id),
    days_count: toNumber(raw.days_count),
    places_count: toNumber(raw.places_count),
    days: mapDays(raw.days),
    author_id: authorId,
    can_edit: Boolean(viewerId) && authorId === viewerId,
  };
}

export function mapTemplateDetail(
  raw: unknown,
  viewerId: string | null,
): TemplateDetail {
  const detail = raw as Raw;

  return {
    ...mapBase(detail, viewerId),
    mode: TripDetailMode.Template,
    is_saved: Boolean(detail.is_saved),
    saves_count: toNumber(detail.saves_count),
  };
}

export function mapTripDetail(
  raw: unknown,
  viewerId: string | null,
): TripDetail {
  const detail = raw as Raw;

  return {
    ...mapBase(detail, viewerId),
    mode: TripDetailMode.Trip,
    template_id: toText(detail.template_id),
    start_date: toText(detail.start_date),
    status: toEnum<TripStatus>(
      detail.status,
      TRIP_STATUSES,
      TripStatus.Planned,
    ),
  };
}
