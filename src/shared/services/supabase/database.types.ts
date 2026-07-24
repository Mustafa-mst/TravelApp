export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          category: string | null
          created_at: string
          id: number
          image_url: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: number
          image_url?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: number
          image_url?: string | null
        }
        Relationships: []
      }
      category_items: {
        Row: {
          category_id: number | null
          country_code: string | null
          created_at: string
          id: number
          image_url: string | null
          subtitle: string | null
          title: string | null
        }
        Insert: {
          category_id?: number | null
          country_code?: string | null
          created_at?: string
          id?: number
          image_url?: string | null
          subtitle?: string | null
          title?: string | null
        }
        Update: {
          category_id?: number | null
          country_code?: string | null
          created_at?: string
          id?: number
          image_url?: string | null
          subtitle?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "category_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_items_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["cca2"]
          },
        ]
      }
      cities: {
        Row: {
          admin1_code: string | null
          ascii_name: string | null
          country_code: string | null
          geoname_id: number
          latitude: number | null
          longitude: number | null
          name: string
          population: number | null
          timezone: string | null
        }
        Insert: {
          admin1_code?: string | null
          ascii_name?: string | null
          country_code?: string | null
          geoname_id: number
          latitude?: number | null
          longitude?: number | null
          name: string
          population?: number | null
          timezone?: string | null
        }
        Update: {
          admin1_code?: string | null
          ascii_name?: string | null
          country_code?: string | null
          geoname_id?: number
          latitude?: number | null
          longitude?: number | null
          name?: string
          population?: number | null
          timezone?: string | null
        }
        Relationships: []
      }
      collections: {
        Row: {
          banner_image: string | null
          created_at: string
          cta_text: string | null
          id: number
          key: string
          subtitle: string | null
          title: string
        }
        Insert: {
          banner_image?: string | null
          created_at?: string
          cta_text?: string | null
          id?: number
          key: string
          subtitle?: string | null
          title: string
        }
        Update: {
          banner_image?: string | null
          created_at?: string
          cta_text?: string | null
          id?: number
          key?: string
          subtitle?: string | null
          title?: string
        }
        Relationships: []
      }
      countries: {
        Row: {
          area: number | null
          borders: string[] | null
          capital: string[] | null
          capital_info: Json | null
          car: Json | null
          cca2: string
          continents: string[] | null
          currencies: Json | null
          description: string | null
          flags: Json | null
          id: string
          idd: string | null
          landlocked: boolean | null
          languages: string[] | null
          latlng: number[] | null
          maps: Json | null
          name: Json | null
          plug_data: Json | null
          population_data: Json | null
          region: string | null
          start_of_week: string | null
          subregion: string | null
          timezones: string[] | null
          un_member: boolean | null
        }
        Insert: {
          area?: number | null
          borders?: string[] | null
          capital?: string[] | null
          capital_info?: Json | null
          car?: Json | null
          cca2: string
          continents?: string[] | null
          currencies?: Json | null
          description?: string | null
          flags?: Json | null
          id?: string
          idd?: string | null
          landlocked?: boolean | null
          languages?: string[] | null
          latlng?: number[] | null
          maps?: Json | null
          name?: Json | null
          plug_data?: Json | null
          population_data?: Json | null
          region?: string | null
          start_of_week?: string | null
          subregion?: string | null
          timezones?: string[] | null
          un_member?: boolean | null
        }
        Update: {
          area?: number | null
          borders?: string[] | null
          capital?: string[] | null
          capital_info?: Json | null
          car?: Json | null
          cca2?: string
          continents?: string[] | null
          currencies?: Json | null
          description?: string | null
          flags?: Json | null
          id?: string
          idd?: string | null
          landlocked?: boolean | null
          languages?: string[] | null
          latlng?: number[] | null
          maps?: Json | null
          name?: Json | null
          plug_data?: Json | null
          population_data?: Json | null
          region?: string | null
          start_of_week?: string | null
          subregion?: string | null
          timezones?: string[] | null
          un_member?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "countries_description_fkey"
            columns: ["description"]
            isOneToOne: false
            referencedRelation: "country_descriptions"
            referencedColumns: ["country_code"]
          },
        ]
      }
      country_descriptions: {
        Row: {
          country_code: string
          description: Json | null
        }
        Insert: {
          country_code: string
          description?: Json | null
        }
        Update: {
          country_code?: string
          description?: Json | null
        }
        Relationships: []
      }
      exchange_rates: {
        Row: {
          currency_code: string
          flag: string | null
          rate: number
          updated_at: string
        }
        Insert: {
          currency_code: string
          flag?: string | null
          rate: number
          updated_at?: string
        }
        Update: {
          currency_code?: string
          flag?: string | null
          rate?: number
          updated_at?: string
        }
        Relationships: []
      }
      favorites_country: {
        Row: {
          country: string
          created_at: string
          id: string
          user_id: string | null
        }
        Insert: {
          country: string
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Update: {
          country?: string
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favorites_country_country_fkey"
            columns: ["country"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      itineraries: {
        Row: {
          city_geoname_id: number
          cover_photo: string | null
          created_at: string
          end_date: string
          id: string
          start_date: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          city_geoname_id: number
          cover_photo?: string | null
          created_at?: string
          end_date: string
          id?: string
          start_date: string
          title: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          city_geoname_id?: number
          cover_photo?: string | null
          created_at?: string
          end_date?: string
          id?: string
          start_date?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "itineraries_city_geoname_id_fkey"
            columns: ["city_geoname_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["geoname_id"]
          },
        ]
      }
      itinerary_days: {
        Row: {
          created_at: string
          date: string
          day_number: number
          id: string
          itinerary_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          day_number: number
          id?: string
          itinerary_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          day_number?: number
          id?: string
          itinerary_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_days_itinerary_id_fkey"
            columns: ["itinerary_id"]
            isOneToOne: false
            referencedRelation: "itineraries"
            referencedColumns: ["id"]
          },
        ]
      }
      itinerary_items: {
        Row: {
          address: string | null
          created_at: string
          day_id: string
          description: string | null
          ends_at: string | null
          google_place_id: string | null
          id: string
          image_url: string | null
          latitude: number | null
          longitude: number | null
          name: string
          notes: string | null
          order_index: number
          place_type: string
          starts_at: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          day_id: string
          description?: string | null
          ends_at?: string | null
          google_place_id?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          longitude?: number | null
          name: string
          notes?: string | null
          order_index?: number
          place_type: string
          starts_at?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          day_id?: string
          description?: string | null
          ends_at?: string | null
          google_place_id?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          notes?: string | null
          order_index?: number
          place_type?: string
          starts_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_items_day_id_fkey"
            columns: ["day_id"]
            isOneToOne: false
            referencedRelation: "itinerary_days"
            referencedColumns: ["id"]
          },
        ]
      }
      snippets: {
        Row: {
          created_at: string
          id: number
          image_url: string
          snippets_description_id: number | null
          subtitle: string
          tag: string[]
          title: string
        }
        Insert: {
          created_at?: string
          id?: number
          image_url: string
          snippets_description_id?: number | null
          subtitle: string
          tag: string[]
          title: string
        }
        Update: {
          created_at?: string
          id?: number
          image_url?: string
          snippets_description_id?: number | null
          subtitle?: string
          tag?: string[]
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "snippets_snippets_description_id_fkey"
            columns: ["snippets_description_id"]
            isOneToOne: false
            referencedRelation: "snippets_description"
            referencedColumns: ["id"]
          },
        ]
      }
      snippets_description: {
        Row: {
          description: string | null
          id: number
        }
        Insert: {
          description?: string | null
          id?: number
        }
        Update: {
          description?: string | null
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_countries_small_size: {
        Args: never
        Returns: {
          flags: Json
          id: string
          name: Json
        }[]
      }
      get_random_country: { Args: never; Returns: Json }
      search_cities: {
        Args: { q: string }
        Returns: {
          city: string
          country: string
          country_code: string
          geoname_id: number
          latitude: number
          longitude: number
          population: number
        }[]
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      checklist_item: {
        id: string | null
        text: string | null
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
