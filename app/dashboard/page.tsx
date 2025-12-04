import { authConfig } from "@/lib/auth/options";
import Link from "next/link";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ActivityList } from "./_components/activity-list";
import { DashboardShell } from "./_components/dashboard-shell";
import { SummaryCards } from "./_components/summary-cards";

function SummaryCardsFallback() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[var(--border-color)]"
        >
          <div className="h-1.5 w-16 animate-pulse rounded-full bg-slate-200" />
          <div className="mt-4 h-4 w-28 animate-pulse rounded-full bg-slate-200" />
          <div className="mt-3 h-10 w-16 animate-pulse rounded-lg bg-slate-200" />
        </div>
      ))}
    </div>
  );
}

function ActivityListFallback() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[var(--border-color)]">
      <div className="mb-4 h-5 w-40 animate-pulse rounded-full bg-slate-200" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-4 w-full animate-pulse rounded-full bg-slate-200" />
        ))}
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const session = await getServerSession(authConfig);
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-10 font-sans">
      <DashboardShell
        title="Tableau de bord"
        description="Surveille l’activité de ton espace produit en un coup d’œil."
        actions={
          <Link
            href="/issues"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#0f172a] shadow-sm transition hover:bg-blue-50"
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
