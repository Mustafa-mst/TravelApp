export type PlaceType = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  rating?: number;
  userRatingCount?: number;
  primaryType?: string;
  imageUrl?: string | null;
};


