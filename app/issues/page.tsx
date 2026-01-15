import { authConfig } from "@/lib/auth/options";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { KanbanBoard } from "./_components/kanban-board";
import { KanbanBoardFallback } from "./_components/kanban-board-fallback";

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
