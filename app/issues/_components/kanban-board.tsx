"use client";

import { useState } from "react";
import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { useIssuesBoard } from "../_hooks/use-issues-board";
import { useMoveIssue } from "../_hooks/use-move-issue";
import { KanbanColumn } from "./kanban-column";
import { CreateIssuePanel } from "./create-issue-panel";

export function KanbanBoard() {
  const { data } = useIssuesBoard();
  const columns = data?.columns ?? [];
  const issues = data?.issues ?? [];
  const [showForm, setShowForm] = useState(false);
  const [moveError, setMoveError] = useState<string | null>(null);
  const { moveIssue } = useMoveIssue();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setMoveError(null);
    if (!over) {
      return;
    }
    const issueId = String(active.id);
    const targetStatus = String(over.id);

    if (!columns.some((column) => column.status === targetStatus)) {
      return;
    }

    moveIssue(issueId, targetStatus, (message) => setMoveError(message));
  };

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

      {showForm ? <CreateIssuePanel onClose={() => setShowForm(false)} /> : null}

      {moveError ? <p className="text-sm text-rose-500">{moveError}</p> : null}

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="grid auto-cols-[280px] grid-flow-col gap-4 overflow-x-auto pb-4">
          {columns.length === 0 && (
            <p className="col-span-full text-sm text-zinc-500">Aucune colonne définie.</p>
          )}
          {columns.map((column) => {
            const cards = issues
              .filter((issue) => issue.status === column.status)
              .map((issue) => ({
                id: issue.id,
                title: issue.title,
                assignee: issue.assignee ?? "Non assigné",
                dueDate: issue.dueDate,
              }));
            return (
              <KanbanColumn
                key={column.status}
                title={column.label}
                status={column.status}
                cards={cards}
              />
            );
          })}
        </div>
      </DndContext>
    </section>
  );
}
