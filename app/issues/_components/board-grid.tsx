"use client";

import {
  DndContext,
  type DragEndEvent,
  type SensorDescriptor,
  type SensorOptions,
} from "@dnd-kit/core";
import { KanbanColumn } from "./kanban-column";

type BoardGridProps = {
  columns: { status: string; label: string }[];
  issues: {
    id: string;
    code: string;
    title: string;
    assignee?: string | null;
    dueDate?: string;
    status: string;
  }[];
  sensors: SensorDescriptor<SensorOptions>[];
  onDragEnd: (event: DragEndEvent) => void;
  moveError: string | null;
};

export function BoardGrid({ columns, issues, sensors, onDragEnd, moveError }: BoardGridProps) {
  const mappedColumns = columns.map((column) => ({
    ...column,
    cards: issues
      .filter((issue) => issue.status === column.status)
      .map((issue) => ({
        issueId: issue.id,
        code: issue.code,
        title: issue.title,
        assignee: issue.assignee ?? "Non assigné",
        dueDate: issue.dueDate ?? "",
      })),
  }));

  return (
    <div className="rounded-[36px] bg-white/60 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
      {moveError ? <p className="mb-3 text-sm text-rose-500">{moveError}</p> : null}
      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mappedColumns.length === 0 && (
            <p className="col-span-full text-sm text-[#94a3b8]">Aucune colonne définie.</p>
          )}
          {mappedColumns.map((column) => (
            <KanbanColumn
              key={column.status}
              title={column.label}
              status={column.status}
              cards={column.cards}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
