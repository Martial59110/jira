"use client";

import { useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { moveIssueAction, type MoveIssueActionResult } from "../_actions/move-issue";
import { type IssuesBoardResponse } from "./use-issues-board";

export function useMoveIssue() {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const moveIssue = (issueId: string, status: string, onError?: (message: string) => void) => {
    startTransition(async () => {
      const queryKey = ["issues", "board"];
      const previousData = queryClient.getQueryData<IssuesBoardResponse>(queryKey);
      if (previousData) {
        const optimisticIssues = previousData.issues.map((issue) =>
          issue.id === issueId
            ? {
                ...issue,
                status,
              }
            : issue,
        );
        queryClient.setQueryData<IssuesBoardResponse>(queryKey, {
          ...previousData,
          issues: optimisticIssues,
        });
      }

      const rollback = () => {
        if (previousData) {
          queryClient.setQueryData(queryKey, previousData);
        }
      };

      try {
        const data = new FormData();
        data.append("issueId", issueId);
        data.append("status", status);

        const result: MoveIssueActionResult = await moveIssueAction(data);

        if (!result.success) {
          rollback();
          onError?.(result.error ?? "Impossible de déplacer le ticket.");
          return;
        }

        queryClient.invalidateQueries({
          queryKey,
        });
      } catch {
        rollback();
        onError?.("Impossible de déplacer le ticket.");
      }
    });
  };

  return { moveIssue, isPending };
}
