export type Locatable = {
  id: string;
  name: string;
  latitude: number | null;
  longitude: number | null;
  image_url?: string | null;
};

export type Coordinates = {
  latitude: number | null;
  longitude: number | null;
};
