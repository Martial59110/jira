"use client";

import { useActivityList } from "../_hooks/use-activity-list";

const getRelativeTime = (timestamp: string) => {
  const diffMs = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.round(diffMs / 60000);

  if (minutes < 1) return "À l’instant";
  if (minutes < 60) return `Il y a ${minutes} min`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `Il y a ${hours} h`;

  const days = Math.round(hours / 24);
  return `Il y a ${days} j`;
};

export function ActivityList() {
  const {
    visibleItems,
    hasMore,
    showAll,
    toggleShowAll,
    canGoPrev,
    canGoNext,
    page,
    totalPages,
    goPrev,
    goNext,
  } = useActivityList();

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[var(--border-color)]">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Activité récente</h2>
          <p className="text-sm text-[var(--muted)]">Toutes les actions sur le workspace MyJira</p>
        </div>
        {hasMore ? (
          <button
            type="button"
            className="text-sm font-medium text-[var(--brand)] underline-offset-4 hover:text-blue-600 hover:underline"
            onClick={toggleShowAll}
          >
            {showAll ? "Réduire" : "Voir tout"}
          </button>
        ) : null}
      </header>

      <ol className="space-y-4">
        {visibleItems.length === 0 && (
          <li className="text-sm text-[var(--muted)]">Aucune activité récente.</li>
        )}
        {visibleItems.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-[var(--brand)]" />
            <div>
              <p className="text-sm text-[var(--foreground)]">
                <span className="font-semibold">{item.author}</span> {item.action}
              </p>
              <p className="text-xs text-[var(--muted)]">{getRelativeTime(item.timestamp)}</p>
            </div>
          </li>
        ))}
      </ol>

      {showAll && hasMore ? (
        <div className="mt-5 flex items-center justify-between border-t pt-4 text-sm text-[var(--muted)]">
          <button
            type="button"
            onClick={goPrev}
            disabled={!canGoPrev}
            className="rounded-full border border-[var(--border-color)] px-3 py-1 font-medium text-[var(--foreground)] transition hover:border-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Précédent
          </button>
          <span className="text-[var(--foreground)]">
            Page {page + 1} / {totalPages}
          </span>
          <button
            type="button"
            onClick={goNext}
            disabled={!canGoNext}
            className="rounded-full border border-[var(--border-color)] px-3 py-1 font-medium text-[var(--foreground)] transition hover:border-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Suivant
          </button>
        </div>
      ) : null}
    </section>
  );
}
