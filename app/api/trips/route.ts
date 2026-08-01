import { sql } from "@/lib/db";
import { newId } from "@/lib/ids";

export async function POST(request: Request) {
  const body = await request.json();
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const commonLocation =
    typeof body.commonLocation === "string" ? body.commonLocation.trim() : "";

  if (!name) {
    return Response.json({ error: "Trip name is required" }, { status: 400 });
  }

  const id = newId();

  await sql`
    insert into trips (id, name, common_location)
    values (${id}, ${name}, ${commonLocation || null})
  `;

  return Response.json({ id }, { status: 201 });
}
