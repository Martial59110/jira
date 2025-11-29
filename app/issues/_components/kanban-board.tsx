"use client";

import { useIssuesBoard } from "../_hooks/use-issues-board";
import { KanbanColumn } from "./kanban-column";

export function KanbanBoard() {
  const { data } = useIssuesBoard();
  const columns = data?.columns ?? [];
  const issues = data?.issues ?? [];

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white">Board</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Vue Kanban des tickets en cours.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-900 dark:border-zinc-700 dark:text-zinc-200">
            Filtrer
          </button>
          <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500">
            Nouveau ticket
          </button>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {columns.length === 0 && (
          <p className="col-span-full text-sm text-zinc-500">Aucune colonne définie.</p>
        )}
        {columns.map((column) => {
          const cards = issues.filter((issue) => issue.status === column.status);
          return <KanbanColumn key={column.status} title={column.label} cards={cards} />;
        })}
      </div>
    </section>
  );
}
