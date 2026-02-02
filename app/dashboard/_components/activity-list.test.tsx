import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ActivityList } from "./activity-list";

vi.mock("../_hooks/use-activity-list", () => ({
  useActivityList: vi.fn(),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, params?: Record<string, unknown>) => {
    const translations: Record<string, string> = {
      recent_activity: "Activité récente",
      all_actions: "Toutes les actions sur le workspace",
      no_recent_activity: "Aucune activité récente.",
      view_all: "Voir tout",
      reduce: "Réduire",
      previous: "Précédent",
      next: "Suivant",
      page: "Page",
      of: "sur",
      just_now: "À l'instant",
      minutes_ago: `Il y a ${params?.count} min`,
      hours_ago: `Il y a ${params?.count}h`,
      days_ago: `Il y a ${params?.count}j`,
      moved_to: `a déplacé ${params?.code} vers ${params?.status}`,
      created_ticket: `a créé le ticket ${params?.code}`,
      todo: "À faire",
      inProgress: "En cours",
      blocked: "Bloqué",
      done: "Fait",
    };
    return translations[key] ?? key;
  },
}));

import { useActivityList } from "../_hooks/use-activity-list";

const mockUseActivityList = vi.mocked(useActivityList);

describe("ActivityList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("affiche le titre Activité récente", () => {
    mockUseActivityList.mockReturnValue({
      visibleItems: [],
      hasMore: false,
      showAll: false,
      toggleShowAll: vi.fn(),
      canGoPrev: false,
      canGoNext: false,
      page: 0,
      totalPages: 1,
      goPrev: vi.fn(),
      goNext: vi.fn(),
    });

    render(<ActivityList />);
    expect(screen.getByText("Activité récente")).toBeInTheDocument();
  });

  it("affiche un message quand il n'y a pas d'activité", () => {
    mockUseActivityList.mockReturnValue({
      visibleItems: [],
      hasMore: false,
      showAll: false,
      toggleShowAll: vi.fn(),
      canGoPrev: false,
      canGoNext: false,
      page: 0,
      totalPages: 1,
      goPrev: vi.fn(),
      goNext: vi.fn(),
    });

    render(<ActivityList />);
    expect(screen.getByText("Aucune activité récente.")).toBeInTheDocument();
  });

  it("affiche les activités avec l'auteur", () => {
    mockUseActivityList.mockReturnValue({
      visibleItems: [
        {
          id: "1",
          author: "Alice",
          action: "a créé le ticket MYJ-001",
          timestamp: new Date().toISOString(),
        },
      ],
      hasMore: false,
      showAll: false,
      toggleShowAll: vi.fn(),
      canGoPrev: false,
      canGoNext: false,
      page: 0,
      totalPages: 1,
      goPrev: vi.fn(),
      goNext: vi.fn(),
    });

    render(<ActivityList />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("affiche le bouton Voir tout quand il y a plus d'activités", () => {
    mockUseActivityList.mockReturnValue({
      visibleItems: [
        { id: "1", author: "Alice", action: "test", timestamp: new Date().toISOString() },
      ],
      hasMore: true,
      showAll: false,
      toggleShowAll: vi.fn(),
      canGoPrev: false,
      canGoNext: false,
      page: 0,
      totalPages: 2,
      goPrev: vi.fn(),
      goNext: vi.fn(),
    });

    render(<ActivityList />);
    expect(screen.getByText("Voir tout")).toBeInTheDocument();
  });

  it("appelle toggleShowAll au clic sur Voir tout", () => {
    const toggleShowAll = vi.fn();
    mockUseActivityList.mockReturnValue({
      visibleItems: [
        { id: "1", author: "Alice", action: "test", timestamp: new Date().toISOString() },
      ],
      hasMore: true,
      showAll: false,
      toggleShowAll,
      canGoPrev: false,
      canGoNext: false,
      page: 0,
      totalPages: 2,
      goPrev: vi.fn(),
      goNext: vi.fn(),
    });

    render(<ActivityList />);
    fireEvent.click(screen.getByText("Voir tout"));
    expect(toggleShowAll).toHaveBeenCalledTimes(1);
  });
});
