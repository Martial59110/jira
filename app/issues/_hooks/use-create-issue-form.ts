"use client";

import { useRouter } from "next/navigation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getApiUrl } from "@/lib/get-api-url";

const createIssueSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères."),
  status: z.enum(["todo", "inProgress", "blocked", "done"]).default("todo"),
  assignee: z.string().optional(),
  dueDate: z.string().optional(),
});

export type CreateIssueFormData = z.infer<typeof createIssueSchema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function zodResolver(schema: z.ZodSchema<any>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (data: any) => {
    const result = schema.safeParse(data);
    if (result.success) {
      return { values: result.data, errors: {} };
    }
    const errors: Record<string, { type: string; message: string }> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.join(".");
      if (!errors[path]) {
        errors[path] = { type: issue.code, message: issue.message };
      }
    }
    return { values: {}, errors };
  };
}

async function createIssue(data: CreateIssueFormData) {
  const response = await fetch(getApiUrl("/api/issues"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erreur lors de la création du ticket.");
  }

  return response.json();
}

export function useCreateIssueForm(onSuccess?: () => void) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<CreateIssueFormData>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      title: "",
      status: "todo",
      assignee: "",
      dueDate: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues", "board"] });
      router.refresh();
      form.reset();
      onSuccess?.();
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return {
    register: form.register,
    errors: form.formState.errors,
    onSubmit,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
