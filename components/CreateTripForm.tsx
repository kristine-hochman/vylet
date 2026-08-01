"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { trackTripCreated } from "@/lib/analytics";

export function CreateTripForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [commonLocation, setCommonLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, commonLocation }),
      });

      if (!res.ok) {
        throw new Error("Could not create trip");
      }

      const { id } = await res.json();
      trackTripCreated({ hasCommonLocation: commonLocation.trim().length > 0 });
      router.push(`/trip/${id}?new=1`);
    } catch {
      setError("Something went wrong. Try again?");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          What are we calling this trip?
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Bachelorette 2.0"
          maxLength={100}
          required
          className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-100"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="commonLocation"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Where's everyone starting from? <span className="font-normal text-zinc-400">(optional)</span>
        </label>
        <input
          id="commonLocation"
          value={commonLocation}
          onChange={(e) => setCommonLocation(e.target.value)}
          placeholder="Prague"
          maxLength={100}
          className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-100"
        />
      </div>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={submitting || !name.trim()}
        className="mt-2 rounded-xl bg-zinc-900 px-5 py-3 text-base font-semibold text-white transition-colors disabled:opacity-40 dark:bg-white dark:text-zinc-900"
      >
        {submitting ? "Creating..." : "Start the trip →"}
      </button>
    </form>
  );
}
