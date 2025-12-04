"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { createIssueAction, type CreateIssueActionState } from "../_actions/create-issue";

export function useCreateIssueForm(onSuccess?: () => void) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const initialState: CreateIssueActionState = { success: false };

  const [state, formAction] = useActionState<CreateIssueActionState, FormData>(
    createIssueAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      queryClient.invalidateQueries({
        queryKey: ["issues", "board"],
      });
      router.refresh();
      onSuccess?.();
    }
  }, [state.success, onSuccess, queryClient, router]);

  return { state, formAction };
}
