import { sql } from "./db";

export type Trip = {
  id: string;
  name: string;
  common_location: string | null;
  created_at: string;
};

export type Participant = {
  id: string;
  display_name: string;
  is_out: boolean;
  excuse: string | null;
  created_at: string;
};

export type TripOption = {
  id: string;
  contributed_by: string;
  title: string;
  url: string | null;
  image_url: string | null;
  price_per_person: number | null;
  currency: string;
  date_range_start: string | null;
  date_range_end: string | null;
  vibe: string | null;
  transport: string | null;
  distance_note: string | null;
  created_at: string;
};

export type TripDetails = {
  trip: Trip;
  participants: Participant[];
  options: TripOption[];
};

export async function getTripDetails(tripId: string): Promise<TripDetails | null> {
  const [trip] = await sql<Trip[]>`
    select id, name, common_location, created_at
    from trips
    where id = ${tripId}
  `;

  if (!trip) return null;

  const participants = await sql<Participant[]>`
    select id, display_name, is_out, excuse, created_at
    from participants
    where trip_id = ${tripId}
    order by created_at asc
  `;

  const options = await sql<TripOption[]>`
    select id, contributed_by, title, url, image_url, price_per_person,
           currency, date_range_start, date_range_end, vibe, transport,
           distance_note, created_at
    from options
    where trip_id = ${tripId}
    order by created_at asc
  `;

  return { trip, participants, options };
}
