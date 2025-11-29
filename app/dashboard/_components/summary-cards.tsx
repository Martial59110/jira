"use client";

import { useDashboardStats } from "@/app/_hooks/use-dashboard-stats";

const cardsConfig = [
  { key: "backlog", label: "À faire", accent: "bg-zinc-900 dark:bg-zinc-100" },
  { key: "inProgress", label: "En cours", accent: "bg-blue-500" },
  { key: "done", label: "Terminés", accent: "bg-emerald-500" },
  { key: "blocked", label: "Bloqués", accent: "bg-rose-500" },
] as const;

export function SummaryCards() {
  const { data } = useDashboardStats();
  const totals = data?.totals ?? {
    backlog: 0,
    inProgress: 0,
    done: 0,
    blocked: 0,
  };

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cardsConfig.map((card) => {
        const value = totals[card.key];
        return (
          <article
            key={card.key}
            className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className={`h-1 w-12 rounded-full ${card.accent}`} />
            <p className="mt-4 text-sm font-medium text-zinc-500">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-white">{value}</p>
          </article>
        );
      })}
    </section>
  );
}
