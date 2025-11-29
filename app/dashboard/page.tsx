"use client";

import Link from "next/link";
import { Suspense } from "react";
import { ActivityList } from "./_components/activity-list";
import { DashboardShell } from "./_components/dashboard-shell";
import { SummaryCards } from "./_components/summary-cards";

function SummaryCardsFallback() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-dashed border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="h-1 w-12 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="mt-4 h-4 w-24 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="mt-2 h-8 w-16 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-700" />
        </div>
      ))}
    </div>
  );
}

function ActivityListFallback() {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-6 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
      Chargement de l’activité…
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen font-sans">
      <DashboardShell
        title="Tableau de bord"
        description="Surveille l’activité de ton espace produit en un coup d’œil."
        actions={
          <Link
            href="/issues"
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Créer un ticket
          </Link>
        }
      >
        <Suspense fallback={<SummaryCardsFallback />}>
          <SummaryCards />
        </Suspense>
        <Suspense fallback={<ActivityListFallback />}>
          <ActivityList />
        </Suspense>
      </DashboardShell>
    </main>
  );
}
