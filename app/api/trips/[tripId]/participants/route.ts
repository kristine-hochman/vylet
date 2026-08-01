import { sql } from "@/lib/db";
import { newId } from "@/lib/ids";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ tripId: string }> }
) {
  const { tripId } = await params;
  const body = await request.json();
  const displayName =
    typeof body.displayName === "string" ? body.displayName.trim() : "";

  if (!displayName) {
    return Response.json({ error: "Name is required" }, { status: 400 });
  }

  const [trip] = await sql`select id from trips where id = ${tripId}`;
  if (!trip) {
    return Response.json({ error: "Trip not found" }, { status: 404 });
  }

  const id = newId();

  await sql`
    insert into participants (id, trip_id, display_name)
    values (${id}, ${tripId}, ${displayName})
  `;

  const [{ count }] = await sql`
    select count(*)::int as count from participants where trip_id = ${tripId}
  `;

  return Response.json({ id, participantCount: count }, { status: 201 });
}
