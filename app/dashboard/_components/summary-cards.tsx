"use client";

import { useDashboardStats } from "@/app/_hooks/use-dashboard-stats";
import { useTranslations } from "next-intl";

const cardsConfig = (t: ReturnType<typeof useTranslations>) => [
  { key: "backlog", label: t("todo"), accent: "bg-zinc-900 dark:bg-zinc-100" },
  { key: "inProgress", label: t("inProgress"), accent: "bg-blue-500" },
  { key: "done", label: t("done"), accent: "bg-emerald-500" },
  { key: "blocked", label: t("blocked"), accent: "bg-rose-500" },
] as const;

export function SummaryCards() {
  const { data } = useDashboardStats();
  const t = useTranslations("SummaryCards");
  const totals = data?.totals ?? {
    backlog: 0,
    inProgress: 0,
    done: 0,
    blocked: 0,
  };

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cardsConfig(t).map((card) => {
        const value = totals[card.key];
        return (
          <article
            key={card.key}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[var(--border-color)]"
          >
            <div className={`h-1.5 w-14 rounded-full ${card.accent}`} />
            <p className="mt-4 text-xs uppercase tracking-wide text-[var(--muted)]">{card.label}</p>
            <p className="mt-2 text-4xl font-semibold text-[var(--foreground)]">{value}</p>
          </article>
        );
      })}
    </section>
  );
}
