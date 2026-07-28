import { PlaceTypes } from "@/features/places/constants";
import type {
  SelectedCity,
  TemplateDetail,
  TripDetail,
  TripDetailDay,
  TripDetailItem,
  TripStatus,
} from "../types";

/**
 * Normalizes the `get_template_detail` / `get_trip_detail` payloads into the
 * unified detail model.
 *
 * Both RPCs are generated as plain `Json`, so their shape is asserted by hand
 * either way. Doing it here — rather than casting at the call site — gives one
 * place to absorb backend drift: the day foreign key is normalized, absent
 * collections default to empty, and unrecognized enum values fall back instead
 * of reaching the UI as invalid data.
 */

const PLACE_TYPES = new Set<string>(Object.values(PlaceTypes));

const TRIP_STATUSES = new Set<string>([
  "planned",
  "active",
  "completed",
  "cancelled",
]);

/** Raw RPC shapes. Only the fields the mapper reads are described. */
type RawItem = Record<string, unknown>;
type RawDay = Record<string, unknown>;
type RawDetail = Record<string, unknown>;

function toPlaceType(value: unknown): PlaceTypes {
  return typeof value === "string" && PLACE_TYPES.has(value)
    ? (value as PlaceTypes)
    : PlaceTypes.TouristAttraction;
}

function toTripStatus(value: unknown): TripStatus {
  // `trips.status` is a plain text column, not an enum, so an unknown value is
  // possible; treat it as not-yet-started rather than rendering it raw.
  return typeof value === "string" && TRIP_STATUSES.has(value)
    ? (value as TripStatus)
    : "planned";
}

function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function toNumberOrNull(value: unknown): number | null {
  return typeof value === "number" ? value : null;
}

function mapItem(raw: RawItem): TripDetailItem {
  return {
    id: String(raw.id),
    // Templates key items by `template_day_id`, trips by `trip_day_id`. Accept
    // a pre-normalized `day_id` too, in case the RPCs start emitting one.
    day_id: String(raw.day_id ?? raw.trip_day_id ?? raw.template_day_id ?? ""),
    name: typeof raw.name === "string" ? raw.name : "",
    description: toStringOrNull(raw.description),
    starts_at: toStringOrNull(raw.starts_at),
    ends_at: toStringOrNull(raw.ends_at),
    latitude: toNumberOrNull(raw.latitude),
    longitude: toNumberOrNull(raw.longitude),
    address: toStringOrNull(raw.address),
    google_place_id: toStringOrNull(raw.google_place_id),
    image_url: toStringOrNull(raw.image_url),
    notes: toStringOrNull(raw.notes),
    place_type: toPlaceType(raw.place_type),
    order_index: typeof raw.order_index === "number" ? raw.order_index : 0,
  };
}

function mapDays(raw: unknown): TripDetailDay[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return (raw as RawDay[])
    .map((day) => ({
      id: String(day.id),
      day_number: typeof day.day_number === "number" ? day.day_number : 0,
      // Only trips have dates; the RPC omits the field for templates.
      date: toStringOrNull(day.date),
      // The RPC omits `items` entirely for days with no places.
      items: Array.isArray(day.items)
        ? (day.items as RawItem[])
            .map(mapItem)
            .sort((a, b) => a.order_index - b.order_index)
        : [],
    }))
    .sort((a, b) => a.day_number - b.day_number);
}

function mapCity(raw: unknown): SelectedCity | null {
  if (raw == null || typeof raw !== "object") {
    return null;
  }

  const city = raw as Record<string, unknown>;
  return {
    geoname_id: typeof city.geoname_id === "number" ? city.geoname_id : 0,
    name: typeof city.name === "string" ? city.name : "",
    country_code:
      typeof city.country_code === "string" ? city.country_code : "",
    latitude: toNumberOrNull(city.latitude),
    longitude: toNumberOrNull(city.longitude),
  };
}

/** Fields shared by both modes. */
function mapBase(raw: RawDetail, viewerId: string | null) {
  const authorId = String(raw.author_id ?? "");

  return {
    id: String(raw.id),
    title: typeof raw.title === "string" ? raw.title : "",
    cover_photo: toStringOrNull(raw.cover_photo),
    city: mapCity(raw.city),
    city_geoname_id:
      typeof raw.city_geoname_id === "number" ? raw.city_geoname_id : 0,
    days_count: typeof raw.days_count === "number" ? raw.days_count : 0,
    places_count: typeof raw.places_count === "number" ? raw.places_count : 0,
    days: mapDays(raw.days),
    author_id: authorId,
    can_edit: Boolean(viewerId) && authorId === viewerId,
  };
}

export function mapTemplateDetail(
  raw: unknown,
  viewerId: string | null,
): TemplateDetail {
  const detail = raw as RawDetail;

  return {
    ...mapBase(detail, viewerId),
    mode: "template",
    is_saved: Boolean(detail.is_saved),
    saves_count: typeof detail.saves_count === "number" ? detail.saves_count : 0,
  };
}

export function mapTripDetail(
  raw: unknown,
  viewerId: string | null,
): TripDetail {
  const detail = raw as RawDetail;

  return {
    ...mapBase(detail, viewerId),
    mode: "trip",
    template_id: String(detail.template_id ?? ""),
    start_date: toStringOrNull(detail.start_date) ?? "",
    status: toTripStatus(detail.status),
  };
}
