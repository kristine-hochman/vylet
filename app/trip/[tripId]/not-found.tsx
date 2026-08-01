import Link from "next/link";

export default function TripNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
      <span className="text-4xl">🧭</span>
      <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
        Can't find that trip
      </h1>
      <p className="text-base text-zinc-500 dark:text-zinc-400">
        The link might be off, or the trip never existed.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-zinc-900"
      >
        Start a new one
      </Link>
    </div>
  );
}
