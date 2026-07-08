export type DestinationItem = {
  id: string;
  category: number;
  cca2: string;
  location: string;
  image_url: string;
  country_code: string;
};

export type Destination = {
  id: number;
  category: string;
  image_url: string;
};

export type DestinationWithItems = Destination & {
  destination_items: DestinationItem[];
};
