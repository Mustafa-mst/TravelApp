export type Category = {
  id: number;
  category: string;
  image_url?: string;
  created_at: string;
};

export type CategoryItem = {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
  category_id: number;
  country_code: string;
  created_at: string;
};

export type CategoryWithItems = Category & {
  category_items: CategoryItem[];
};
