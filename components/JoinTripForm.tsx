"use client";

import { useState } from "react";
import {
  identifyParticipant,
  trackParticipantJoined,
} from "@/lib/analytics";
import { storeParticipant } from "@/lib/participant";

export function JoinTripForm({
  tripId,
  onJoined,
}: {
  tripId: string;
  onJoined: (participant: { id: string; displayName: string }) => void;
}) {
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = displayName.trim();
    if (!name || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/trips/${tripId}/participants`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: name }),
      });

      if (!res.ok) throw new Error("Could not join trip");

      const { id, participantCount } = await res.json();

      storeParticipant(tripId, { id, displayName: name });
      identifyParticipant(tripId, id);
      trackParticipantJoined({ tripId, participantCount });

      onJoined({ id, displayName: name });
    } catch {
      setError("Something went wrong. Try again?");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label htmlFor="displayName" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        What should we call you?
      </label>
      <div className="flex gap-2">
        <input
          id="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Your name"
          maxLength={40}
          required
          className="flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-100"
        />
        <button
          type="submit"
          disabled={submitting || !displayName.trim()}
          className="rounded-xl bg-zinc-900 px-5 py-3 text-base font-semibold text-white transition-colors disabled:opacity-40 dark:bg-white dark:text-zinc-900"
        >
          {submitting ? "..." : "Join"}
        </button>
      </div>
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
    </form>
  );
}
