"use client";

import { useState } from "react";
import { useIssuesBoard } from "../_hooks/use-issues-board";
import { KanbanColumn } from "./kanban-column";
import { CreateIssueForm } from "./create-issue-form";

export function KanbanBoard() {
  const { data } = useIssuesBoard();
  const columns = data?.columns ?? [];
  const issues = data?.issues ?? [];
  const [showForm, setShowForm] = useState(false);

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
          <button
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            onClick={() => setShowForm((prev) => !prev)}
            type="button"
          >
            Nouveau ticket
          </button>
        </div>
      </header>

      {showForm ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Créer un ticket</h2>
            <button
              type="button"
              className="text-sm text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              onClick={() => setShowForm(false)}
            >
              Fermer
            </button>
          </div>
          <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
            Les tickets créés ici apparaîtront automatiquement dans la colonne correspondant au
            statut.
          </p>
          <CreateIssueForm onSuccess={() => setShowForm(false)} />
        </div>
      ) : null}

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
