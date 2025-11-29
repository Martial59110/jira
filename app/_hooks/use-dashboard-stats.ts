"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getApiUrl } from "@/lib/get-api-url";

type DashboardStats = {
  totals: {
    backlog: number;
    inProgress: number;
    done: number;
    blocked: number;
  };
  activity: {
    id: string;
    author: string;
    action: string;
    timestamp: string;
  }[];
};

const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const response = await fetch(getApiUrl("/api/dashboard"));
  if (!response.ok) {
    throw new Error("Impossible de charger les statistiques");
  }
  return response.json();
};

export function useDashboardStats() {
  return useSuspenseQuery<DashboardStats>({
    queryKey: ["dashboard", "stats"],
    queryFn: fetchDashboardStats,
  });
}
