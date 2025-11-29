"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type KanbanCardProps = {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
};

export function KanbanCard({ id, title, assignee, dueDate }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
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
      className={`rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-colors hover:border-blue-200 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-950 ${
        isDragging ? "opacity-70 ring-2 ring-blue-400" : ""
      }`}
    >
      <p className="text-xs uppercase tracking-wide text-zinc-400">{id}</p>
      <p className="text-sm font-semibold text-zinc-900 dark:text-white">{title}</p>
      <div className="mt-3 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <span>{assignee}</span>
        <span>{dueDate}</span>
      </div>
    </div>
  );
}
