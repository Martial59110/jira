import { authConfig } from "@/lib/auth/options";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { KanbanBoard } from "./_components/kanban-board";

function KanbanBoardFallback() {
  return (
    <section className="mx-auto w-full max-w-6xl px-2">
      <div className="mb-6 h-10 w-64 animate-pulse rounded-full bg-slate-200" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="min-h-[320px] rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[var(--border-color)]"
          >
            <div className="mb-4 h-4 w-24 animate-pulse rounded-full bg-slate-200" />
            <div className="flex flex-col gap-3">
              {Array.from({ length: 2 }).map((__, cardIndex) => (
                <div
                  key={cardIndex}
                  className="h-20 rounded-xl border border-slate-100 bg-slate-50"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function IssuesPage() {
  const session = await getServerSession(authConfig);
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-10 font-sans">
      <Suspense fallback={<KanbanBoardFallback />}>
        <KanbanBoard />
      </Suspense>
    </main>
  );
}
