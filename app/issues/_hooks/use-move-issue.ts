"use client";

import { useRef, useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { moveIssueAction, type MoveIssueActionResult } from "../_actions/move-issue";
import { type IssuesBoardResponse } from "./use-issues-board";

const queryKey = ["issues", "board"] as const;

export function useMoveIssue() {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const pendingMoves = useRef(0);

  const moveIssue = (issueId: string, status: string, onError?: (message: string) => void) => {
    pendingMoves.current += 1;

    startTransition(async () => {
      await queryClient.cancelQueries({ queryKey, exact: true });
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

      const finalize = (shouldRefetch: boolean) => {
        pendingMoves.current = Math.max(0, pendingMoves.current - 1);
        if (shouldRefetch && pendingMoves.current === 0) {
          queryClient.invalidateQueries({ queryKey });
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
          finalize(false);
          return;
        }

        finalize(true);
      } catch {
        rollback();
        onError?.("Impossible de déplacer le ticket.");
        finalize(false);
      }
    });
  };

  return { moveIssue, isPending };
}
