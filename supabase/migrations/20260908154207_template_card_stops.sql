-- Adds `stops` so a card can draw its own map pins without a detail RPC.
-- Only located items are aggregated, so the array is empty rather than null-filled.
-- `create or replace view` can only append, hence `stops` sits last.
create or replace view public.v_template_cards as
  select
    t.id,
    t.author_id,
    t.title,
    t.cover_photo,
    t.city_geoname_id,
    t.days_count,
    count(distinct i.id) as places_count,
    coalesce(
      array_agg(distinct i.place_type order by i.place_type)
        filter (where i.place_type is not null),
      array[]::place_category[]
    ) as place_types,
    t.saves_count::bigint as saves_count,
    t.source,
    t.visibility,
    t.created_at,
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', i.id,
          'name', i.name,
          'image_url', i.image_url,
          'latitude', i.latitude,
          'longitude', i.longitude,
          'place_type', i.place_type
        )
        order by d.day_number, i.order_index
      ) filter (where i.latitude is not null and i.longitude is not null),
      '[]'::jsonb
    ) as stops
  from trip_templates t
    left join trip_template_days d on d.template_id = t.id
    left join trip_template_items i on i.template_day_id = d.id
  group by
    t.id, t.author_id, t.title, t.cover_photo, t.city_geoname_id,
    t.days_count, t.saves_count, t.source, t.visibility, t.created_at;
