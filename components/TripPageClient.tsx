"use client";

import { useEffect, useState } from "react";
import { ShareLinkButton } from "@/components/ShareLinkButton";
import { JoinTripForm } from "@/components/JoinTripForm";
import { getStoredParticipant } from "@/lib/participant";
import { identifyParticipant } from "@/lib/analytics";
import type { Participant, Trip } from "@/lib/queries";

export function TripPageClient({
  trip,
  initialParticipants,
}: {
  trip: Trip;
  initialParticipants: Participant[];
}) {
  const [participants, setParticipants] = useState(initialParticipants);
  const [me, setMe] = useState<{ id: string; displayName: string } | null>(null);
  const [checkedStorage, setCheckedStorage] = useState(false);

  useEffect(() => {
    const stored = getStoredParticipant(trip.id);
    if (stored) {
      setMe(stored);
      identifyParticipant(trip.id, stored.id);
    }
    setCheckedStorage(true);
  }, [trip.id]);

  function handleJoined(participant: { id: string; displayName: string }) {
    setMe(participant);
    setParticipants((prev) => [
      ...prev,
      {
        id: participant.id,
        display_name: participant.displayName,
        is_out: false,
        excuse: null,
        created_at: new Date().toISOString(),
      },
    ]);
  }

  return (
    <div className="flex min-h-full flex-col bg-zinc-50 dark:bg-black">
      <header className="flex flex-col gap-3 border-b border-zinc-200 px-6 py-6 dark:border-zinc-800">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
              {trip.name}
            </h1>
            {trip.common_location && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                📍 {trip.common_location}
              </p>
            )}
          </div>
          <ShareLinkButton />
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-6 px-6 py-6">
        {checkedStorage && !me && (
          <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <JoinTripForm tripId={trip.id} onJoined={handleJoined} />
          </section>
        )}

        {me && (
          <p className="text-base text-zinc-700 dark:text-zinc-300">
            You're in, <span className="font-semibold">{me.displayName}</span> 👋
          </p>
        )}

        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Who's here ({participants.length})
          </h2>
          <ul className="flex flex-col gap-2">
            {participants.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {p.display_name}
                </span>
                {p.is_out && (
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    🥲 out{p.excuse ? `: ${p.excuse}` : ""}
                  </span>
                )}
              </li>
            ))}
            {participants.length === 0 && (
              <li className="rounded-xl border border-dashed border-zinc-300 px-4 py-3 text-sm text-zinc-400 dark:border-zinc-700">
                No one yet — be the first!
              </li>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
}
