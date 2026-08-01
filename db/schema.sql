-- Trip Vote (vylet) schema. Run this once against your Neon database
-- (Neon console -> SQL Editor -> paste -> run), before starting the app.
--
-- IDs are plain text, generated in app code with nanoid (not a Postgres
-- extension) -- matches the /trip/[nanoid] URLs and keeps the schema boring.
--
-- vibe/transport are text + check constraints rather than native Postgres
-- enums, so adding a new option later is a one-line constraint edit.

create table trips (
  id text primary key,
  name text not null,
  common_location text,
  created_at timestamptz not null default now()
);

create table participants (
  id text primary key,
  trip_id text not null references trips(id) on delete cascade,
  display_name text not null,
  is_out boolean not null default false,
  excuse text,
  created_at timestamptz not null default now()
);

create table options (
  id text primary key,
  trip_id text not null references trips(id) on delete cascade,
  contributed_by text not null references participants(id) on delete cascade,
  title text not null,
  url text,
  image_url text,
  price_per_person int,
  currency text not null default 'CZK',
  date_range_start date,
  date_range_end date,
  vibe text check (vibe in ('cosy', 'rural', 'bougie', 'party', 'active', 'chill')),
  transport text check (transport in ('car', 'public', 'either')),
  distance_note text,
  created_at timestamptz not null default now()
);

create table votes (
  id text primary key,
  option_id text not null references options(id) on delete cascade,
  participant_id text not null references participants(id) on delete cascade,
  value text not null check (value in ('yes', 'no')),
  created_at timestamptz not null default now(),
  unique (option_id, participant_id)
);

create index participants_trip_id_idx on participants(trip_id);
create index options_trip_id_idx on options(trip_id);
create index votes_option_id_idx on votes(option_id);
