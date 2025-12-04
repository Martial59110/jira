"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { moveIssueAction, type MoveIssueActionResult } from "../_actions/move-issue";

export function useMoveIssue() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();

  const moveIssue = (issueId: string, status: string, onError?: (message: string) => void) => {
    startTransition(async () => {
      const data = new FormData();
      data.append("issueId", issueId);
      data.append("status", status);

      const result: MoveIssueActionResult = await moveIssueAction(data);

      if (!result.success) {
        onError?.(result.error ?? "Impossible de déplacer le ticket.");
        return;
      }

      queryClient.invalidateQueries({
        queryKey: ["issues", "board"],
      });
      router.refresh();
    });
  };

  return { moveIssue, isPending };
}
