"use client";

import { useState } from "react";
import { PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { useIssuesBoard } from "../_hooks/use-issues-board";
import { useMoveIssue } from "../_hooks/use-move-issue";
import { CreateIssueModal } from "./create-issue-modal";
import { BoardHeader } from "./board-header";
import { BoardGrid } from "./board-grid";

export function KanbanBoard() {
  const { data } = useIssuesBoard();
  const columns = data?.columns ?? [];
  const issues = data?.issues ?? [];
  const [showForm, setShowForm] = useState(false);
  const [moveError, setMoveError] = useState<string | null>(null);
  const { moveIssue } = useMoveIssue();
  const sensors = useSensors(useSensor(PointerSensor));

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
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-2">
      <BoardHeader onCreateTicket={() => setShowForm(true)} onFilter={() => null} />

      {showForm ? <CreateIssueModal onClose={() => setShowForm(false)} /> : null}

      <BoardGrid
        columns={columns}
        issues={issues}
        sensors={sensors}
        onDragEnd={handleDragEnd}
        moveError={moveError}
      />
    </section>
  );
}
