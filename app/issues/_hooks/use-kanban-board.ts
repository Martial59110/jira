"use client";

import { useCallback, useMemo, useState } from "react";
import { PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { useIssuesBoard } from "./use-issues-board";
import { useMoveIssue } from "./use-move-issue";

export function useKanbanBoard() {
  const { data } = useIssuesBoard();
  const columns = useMemo(() => data?.columns ?? [], [data?.columns]);
  const issues = useMemo(() => data?.issues ?? [], [data?.issues]);
  const [showForm, setShowForm] = useState(false);
  const [moveError, setMoveError] = useState<string | null>(null);
  const { moveIssue } = useMoveIssue();
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
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

      const currentIssue = issues.find((issue) => issue.id === issueId);
      if (!currentIssue || currentIssue.status === targetStatus) {
        return;
      }

      moveIssue(issueId, targetStatus, (message) => setMoveError(message));
    },
    [columns, issues, moveIssue],
  );

  const openForm = useCallback(() => setShowForm(true), []);
  const closeForm = useCallback(() => setShowForm(false), []);

  return {
    columns,
    issues,
    showForm,
    openForm,
    closeForm,
    moveError,
    handleDragEnd,
    sensors,
  };
}
