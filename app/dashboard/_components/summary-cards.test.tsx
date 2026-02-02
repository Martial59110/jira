import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SummaryCards } from "./summary-cards";

vi.mock("@/app/_hooks/use-dashboard-stats", () => ({
  useDashboardStats: vi.fn(),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      todo: "À faire",
      inProgress: "En cours",
      done: "Terminé",
      blocked: "Bloqué",
    };
    return translations[key] ?? key;
  },
}));

import { useDashboardStats } from "@/app/_hooks/use-dashboard-stats";

const mockUseDashboardStats = vi.mocked(useDashboardStats);

describe("SummaryCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("affiche les 4 cartes de statut", () => {
    mockUseDashboardStats.mockReturnValue({
      data: {
        totals: { backlog: 0, inProgress: 0, done: 0, blocked: 0 },
      },
    } as ReturnType<typeof useDashboardStats>);

    render(<SummaryCards />);

    expect(screen.getByText("À faire")).toBeInTheDocument();
    expect(screen.getByText("En cours")).toBeInTheDocument();
    expect(screen.getByText("Terminé")).toBeInTheDocument();
    expect(screen.getByText("Bloqué")).toBeInTheDocument();
  });

  it("affiche les valeurs correctes pour chaque statut", () => {
    mockUseDashboardStats.mockReturnValue({
      data: {
        totals: { backlog: 5, inProgress: 3, done: 12, blocked: 2 },
      },
    } as ReturnType<typeof useDashboardStats>);

    render(<SummaryCards />);

    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("affiche 0 pour tous les statuts quand les données sont undefined", () => {
    mockUseDashboardStats.mockReturnValue({
      data: undefined,
    } as ReturnType<typeof useDashboardStats>);

    render(<SummaryCards />);

    const zeros = screen.getAllByText("0");
    expect(zeros).toHaveLength(4);
  });

  it("affiche les indicateurs colorés pour chaque carte", () => {
    mockUseDashboardStats.mockReturnValue({
      data: {
        totals: { backlog: 1, inProgress: 1, done: 1, blocked: 1 },
      },
    } as ReturnType<typeof useDashboardStats>);

    const { container } = render(<SummaryCards />);

    expect(container.querySelector(".bg-zinc-900")).toBeInTheDocument();
    expect(container.querySelector(".bg-blue-500")).toBeInTheDocument();
    expect(container.querySelector(".bg-emerald-500")).toBeInTheDocument();
    expect(container.querySelector(".bg-rose-500")).toBeInTheDocument();
  });
});
