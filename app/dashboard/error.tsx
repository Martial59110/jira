"use client";

type DashboardErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <div className="rounded-3xl bg-white px-10 py-12 text-center shadow-2xl ring-1 ring-[var(--border-color)]">
        <h1 className="text-2xl font-semibold text-[var(--foreground)]">Impossible de charger</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {error.message ?? "Une erreur inattendue est survenue."}
        </p>
        <button
          onClick={() => reset()}
          className="mt-6 rounded-full bg-[var(--brand)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
