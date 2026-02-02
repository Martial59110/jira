import { authConfig } from "@/lib/auth/options";
import Link from "next/link";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ActivityList } from "./_components/activity-list";
import { ActivityListFallback } from "./_components/activity-list-fallback";
import { DashboardShell } from "./_components/dashboard-shell";
import { SummaryCards } from "./_components/summary-cards";
import { SummaryCardsFallback } from "./_components/summary-cards-fallback";

export default async function DashboardPage() {
  const session = await getServerSession(authConfig);
  if (!session) {
    redirect("/login");
  }

  const t = await getTranslations("Dashboard");

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-10 font-sans">
      <DashboardShell title={t("title")} description={t("description")}>
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
