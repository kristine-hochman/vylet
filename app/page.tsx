import { CreateTripForm } from "@/components/CreateTripForm";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-16 dark:bg-black">
      <main className="flex w-full max-w-md flex-col gap-8">
        <div className="flex flex-col gap-2 text-center">
          <span className="text-4xl">🧳</span>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            vylet
          </h1>
          <p className="text-base text-zinc-500 dark:text-zinc-400">
            Get the group trip out of the group chat.
          </p>
        </div>
        <CreateTripForm />
      </main>
    </div>
  );
}
