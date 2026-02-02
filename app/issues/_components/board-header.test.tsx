import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BoardHeader } from "./board-header";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      product: "Produit",
      board: "Tableau",
      kanban_view: "Vue Kanban des tickets en cours.",
      filter: "Filtrer",
      create_ticket: "Nouveau ticket",
    };
    return translations[key] ?? key;
  },
}));

describe("BoardHeader", () => {
  it("affiche le titre du board", () => {
    render(<BoardHeader onCreateTicket={() => {}} />);
    expect(screen.getByText("Tableau")).toBeInTheDocument();
  });

  it("affiche la description du board", () => {
    render(<BoardHeader onCreateTicket={() => {}} />);
    expect(screen.getByText("Vue Kanban des tickets en cours.")).toBeInTheDocument();
  });

  it("affiche le bouton Nouveau ticket", () => {
    render(<BoardHeader onCreateTicket={() => {}} />);
    expect(screen.getByRole("button", { name: "Nouveau ticket" })).toBeInTheDocument();
  });

  it("appelle onCreateTicket au clic sur le bouton", () => {
    const onCreateTicket = vi.fn();
    render(<BoardHeader onCreateTicket={onCreateTicket} />);

    fireEvent.click(screen.getByRole("button", { name: "Nouveau ticket" }));

    expect(onCreateTicket).toHaveBeenCalledTimes(1);
  });

  it("affiche le bouton Filtrer", () => {
    render(<BoardHeader onCreateTicket={() => {}} />);
    expect(screen.getByRole("button", { name: "Filtrer" })).toBeInTheDocument();
  });
});
