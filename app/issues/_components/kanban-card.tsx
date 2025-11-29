"use client";

type KanbanCardProps = {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
};

export function KanbanCard({ id, title, assignee, dueDate }: KanbanCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-950">
      <p className="text-xs uppercase tracking-wide text-zinc-400">{id}</p>
      <p className="text-sm font-semibold text-zinc-900 dark:text-white">{title}</p>
      <div className="mt-3 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <span>{assignee}</span>
        <span>{dueDate}</span>
      </div>
    </div>
  );
}
