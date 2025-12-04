"use client";

import { useDashboardStats } from "@/app/_hooks/use-dashboard-stats";

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
  const { data } = useDashboardStats();
  const items = data?.activity ?? [];

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[var(--border-color)]">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Activité récente</h2>
          <p className="text-sm text-[var(--muted)]">Toutes les actions sur le workspace MyJira</p>
        </div>
        <button className="text-sm font-medium text-[var(--brand)] hover:text-blue-600">
          Voir tout
        </button>
      </header>

      <ol className="space-y-4">
        {items.length === 0 && (
          <li className="text-sm text-[var(--muted)]">Aucune activité récente.</li>
        )}
        {items.map((item) => (
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
    </section>
  );
}
