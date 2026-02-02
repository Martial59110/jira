"use client";

import { useKanbanBoard } from "../_hooks/use-kanban-board";
import { CreateIssueModal } from "./create-issue-modal";
import { BoardHeader } from "./board-header";
import { BoardGrid } from "./board-grid";

export function KanbanBoard() {
  const { columns, issues, showForm, openForm, closeForm, moveError, handleDragEnd, sensors } =
    useKanbanBoard();

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-2">
      <BoardHeader onCreateTicket={openForm} onFilter={() => null} />

      {showForm ? <CreateIssueModal onClose={closeForm} /> : null}

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
