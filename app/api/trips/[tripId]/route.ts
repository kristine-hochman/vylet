import { getTripDetails } from "@/lib/queries";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ tripId: string }> }
) {
  const { tripId } = await params;
  const details = await getTripDetails(tripId);

  if (!details) {
    return Response.json({ error: "Trip not found" }, { status: 404 });
  }

  return Response.json(details);
}
