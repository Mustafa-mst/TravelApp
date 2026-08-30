create table if not exists public.country_attractions (
  country_code    text        not null,
  language_code   text        not null,
  place_id        text        not null,
  rank            smallint    not null,
  name            text        not null,
  address         text,
  latitude        double precision,
  longitude       double precision,
  rating          numeric(2,1),
  user_rating_count integer,
  primary_type    text,
  photo_name      text,
  fetched_at      timestamptz not null default now(),
  primary key (country_code, language_code, place_id)
);

create index if not exists country_attractions_lookup_idx
  on public.country_attractions (country_code, language_code, rank);

alter table public.country_attractions enable row level security;

drop policy if exists "country_attractions_read" on public.country_attractions;
create policy "country_attractions_read"
  on public.country_attractions for select
  to anon, authenticated
  using (true);
