import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CreateIssueForm } from "./create-issue-form";

// Mock des hooks
vi.mock("react-dom", async () => {
  const actual = await vi.importActual("react-dom");
  return {
    ...actual,
    useFormStatus: () => ({ pending: false }),
  };
});

vi.mock("../_hooks/use-create-issue-form", () => ({
  useCreateIssueForm: () => ({
    state: { success: false, error: null },
    formAction: vi.fn(),
  }),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      title: "Titre",
      assignee: "Assigné",
      status: "Statut",
      due_date: "Échéance",
      create_ticket_submit: "Créer un ticket",
      create_ticket_pending: "Création...",
      title_placeholder: "Nom du ticket",
      assignee_placeholder: "Ex : Victor",
      todo: "À faire",
      inProgress: "En cours",
      blocked: "Bloqué",
      done: "Fait",
    };
    return translations[key] ?? key;
  },
}));

describe("CreateIssueForm", () => {
  it("affiche le champ titre", () => {
    render(<CreateIssueForm />);
    expect(screen.getByText("Titre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nom du ticket")).toBeInTheDocument();
  });

  it("affiche le champ assigné", () => {
    render(<CreateIssueForm />);
    expect(screen.getByText("Assigné")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ex : Victor")).toBeInTheDocument();
  });

  it("affiche le sélecteur de statut avec les 4 options", () => {
    render(<CreateIssueForm />);
    expect(screen.getByText("Statut")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "À faire" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "En cours" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Bloqué" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Fait" })).toBeInTheDocument();
  });

  it("affiche le champ date d'échéance", () => {
    render(<CreateIssueForm />);
    expect(screen.getByText("Échéance")).toBeInTheDocument();
  });

  it("affiche le bouton de soumission", () => {
    render(<CreateIssueForm />);
    expect(screen.getByRole("button", { name: "Créer un ticket" })).toBeInTheDocument();
  });
});
