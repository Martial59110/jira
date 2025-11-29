"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type KanbanCardProps = {
  issueId: string;
  code: string;
  title: string;
  assignee: string;
  dueDate: string;
};

export function KanbanCard({ issueId, code, title, assignee, dueDate }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: issueId,
  });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`rounded-xl border border-white/60 bg-white p-4 shadow-sm transition-colors hover:border-[var(--brand)] ${
        isDragging ? "opacity-70 ring-2 ring-[var(--brand)]" : ""
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">{code}</p>
      <p className="text-sm font-semibold text-[var(--foreground)]">{title}</p>
      <div className="mt-3 flex items-center justify-between text-xs text-[var(--muted)]">
        <span>{assignee}</span>
        <span>{dueDate}</span>
      </div>
    </div>
  );
}
