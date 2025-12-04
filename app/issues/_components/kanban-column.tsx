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
      className={`flex min-h-[360px] flex-col rounded-[28px] bg-white/80 p-5 shadow-[0_15px_40px_rgba(15,23,42,0.08)] ring-1 ring-white/60 transition ${
        isOver ? "ring-2 ring-[#2563eb]" : ""
      }`}
    >
      <header className="mb-4 flex items-center justify-between text-sm font-semibold text-[#475569]">
        <span>{title}</span>
        <span className="text-xs font-normal text-[#94a3b8]">{cards.length}</span>
      </header>
      <div className="flex flex-1 flex-col gap-3">
        {cards.length === 0 && <p className="text-xs text-[#94a3b8]">Aucun ticket.</p>}
        {cards.map((card) => (
          <KanbanCard key={card.issueId} {...card} />
        ))}
      </div>
    </article>
  );
}
