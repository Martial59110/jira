"use client";

import { useQuery } from "@tanstack/react-query";

type DashboardStats = {
  totals: {
    backlog: number;
    inProgress: number;
    done: number;
    blocked: number;
  };
};

const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const response = await fetch("/api/dashboard");
  if (!response.ok) {
    throw new Error("Impossible de charger les statistiques");
  }
  return response.json();
};

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: fetchDashboardStats,
  });
}
