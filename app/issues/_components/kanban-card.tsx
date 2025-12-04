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

  const accentPalette = ["#7dd3fc", "#a5b4fc", "#fda4af", "#fcd34d", "#c084fc", "#60a5fa"] as const;
  const pickAccentColor = (seed: string) => {
    const total = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return accentPalette[total % accentPalette.length];
  };
  const accentColor = pickAccentColor(issueId + code);

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;
  const cardStyle = {
    ...style,
    borderColor: accentColor,
  };

  return (
    <div
      ref={setNodeRef}
      style={cardStyle}
      {...listeners}
      {...attributes}
      className={`rounded-2xl border-2 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-colors hover:border-[#bfd2ff] hover:shadow-[0_12px_32px_rgba(15,23,42,0.1)] ${
        isDragging ? "opacity-70 ring-2 ring-[#2563eb]" : ""
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#94a3b8]">{code}</p>
      <p className="text-sm font-semibold text-[#0f172a]">{title}</p>
      <div className="mt-3 flex items-center justify-between text-xs text-[#64748b]">
        <span>{assignee}</span>
        <span>{dueDate}</span>
      </div>
    </div>
  );
}
