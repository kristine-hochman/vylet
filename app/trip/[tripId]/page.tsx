import { notFound } from "next/navigation";
import { getTripDetails } from "@/lib/queries";
import { TripPageClient } from "@/components/TripPageClient";

export default async function TripPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;
  const details = await getTripDetails(tripId);

  if (!details) notFound();

  return (
    <TripPageClient trip={details.trip} initialParticipants={details.participants} />
  );
}
