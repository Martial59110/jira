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
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Activité récente</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Toutes les actions sur le workspace MyJira
          </p>
        </div>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-500">Voir tout</button>
      </header>

      <ol className="space-y-4">
        {items.length === 0 && (
          <li className="text-sm text-zinc-500 dark:text-zinc-400">Aucune activité récente.</li>
        )}
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-500" />
            <div>
              <p className="text-sm text-zinc-800 dark:text-zinc-100">
                <span className="font-semibold">{item.author}</span> {item.action}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {getRelativeTime(item.timestamp)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
