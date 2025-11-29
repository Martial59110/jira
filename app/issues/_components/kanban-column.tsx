"use client";

import { useDroppable } from "@dnd-kit/core";
import { KanbanCard } from "./kanban-card";

type KanbanColumnProps = {
  title: string;
  status: string;
  cards: {
    issueId: string;
    code: string;
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
      className={`flex min-h-[360px] flex-col rounded-2xl bg-[#f8f9ff] p-4 transition shadow-sm ring-1 ring-[var(--border-color)] ${
        isOver ? "ring-2 ring-[var(--brand)]" : ""
      }`}
    >
      <header className="mb-4 flex items-center justify-between text-sm font-semibold text-[var(--muted)]">
        <span>{title}</span>
        <span className="text-xs font-normal text-[var(--muted)]">{cards.length}</span>
      </header>
      <div className="flex flex-1 flex-col gap-3">
        {cards.length === 0 && <p className="text-xs text-[var(--muted)]">Aucun ticket.</p>}
        {cards.map((card) => (
          <KanbanCard key={card.issueId} {...card} />
        ))}
      </div>
    </article>
  );
}
