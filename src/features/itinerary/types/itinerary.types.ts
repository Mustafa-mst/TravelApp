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
