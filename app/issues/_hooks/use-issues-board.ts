"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getApiUrl } from "@/lib/get-api-url";

export type IssuesBoardIssue = {
  id: string;
  code: string;
  title: string;
  status: string;
  assignee?: string | null;
  dueDate?: string;
};

export type IssuesBoardResponse = {
  columns: {
    status: string;
    label: string;
  }[];
  issues: IssuesBoardIssue[];
};

const fetchIssues = async (): Promise<IssuesBoardResponse> => {
  const response = await fetch(getApiUrl("/api/issues"));
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error.error || "Failed to fetch issues");
  }
  return response.json();
};

export function useIssuesBoard() {
  return useSuspenseQuery<IssuesBoardResponse>({
    queryKey: ["issues", "board"],
    queryFn: fetchIssues,
  });
}
