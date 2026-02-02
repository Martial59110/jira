import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { KanbanCard } from "./kanban-card";

vi.mock("@dnd-kit/core", () => ({
  useDraggable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: vi.fn(),
    transform: null,
    isDragging: false,
  }),
}));

vi.mock("@dnd-kit/utilities", () => ({
  CSS: {
    Translate: {
      toString: () => "",
    },
  },
}));

describe("KanbanCard", () => {
  const defaultProps = {
    issueId: "123",
    code: "MYJ-001",
    title: "Test ticket",
    assignee: "John Doe",
    dueDate: "12 févr.",
  };

  it("affiche le code du ticket", () => {
    render(<KanbanCard {...defaultProps} />);
    expect(screen.getByText("MYJ-001")).toBeInTheDocument();
  });

  it("affiche le titre du ticket", () => {
    render(<KanbanCard {...defaultProps} />);
    expect(screen.getByText("Test ticket")).toBeInTheDocument();
  });

  it("affiche l'assigné du ticket", () => {
    render(<KanbanCard {...defaultProps} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("affiche la date d'échéance", () => {
    render(<KanbanCard {...defaultProps} />);
    expect(screen.getByText("12 févr.")).toBeInTheDocument();
  });
});
