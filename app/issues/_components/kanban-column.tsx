"use client";

import { useDroppable } from "@dnd-kit/core";
import { KanbanCard } from "./kanban-card";

type KanbanColumnProps = {
  title: string;
  status: string;
  cards: {
    id: string;
    title: string;
    assignee: string;
    dueDate: string;
  }[];
};

export function KanbanColumn({ title, status, cards }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <article
      ref={setNodeRef}
      className={`flex min-h-[360px] flex-col rounded-2xl border border-zinc-200 bg-white p-4 transition dark:border-zinc-800 dark:bg-zinc-900 ${
        isOver ? "border-blue-400 bg-blue-50/60 dark:border-blue-400 dark:bg-blue-500/10" : ""
      }`}
    >
      <header className="mb-4 flex items-center justify-between text-sm font-semibold text-zinc-500">
        <span>{title}</span>
        <span className="text-xs font-normal text-zinc-400">{cards.length}</span>
      </header>
      <div className="flex flex-1 flex-col gap-3">
        {cards.length === 0 && <p className="text-xs text-zinc-400">Aucun ticket.</p>}
        {cards.map((card) => (
          <KanbanCard key={card.id} {...card} />
        ))}
      </div>
    </article>
  );
}
