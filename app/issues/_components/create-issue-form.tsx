"use client";

import { useFormStatus } from "react-dom";
import { useCreateIssueForm } from "../_hooks/use-create-issue-form";

const statusOptions = [
  { value: "todo", label: "Pas commencé" },
  { value: "inProgress", label: "En cours" },
  { value: "blocked", label: "Bloqué" },
  { value: "done", label: "Fait" },
] as const;

type CreateIssueFormProps = {
  onSuccess?: () => void;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-70"
    >
      {pending ? "Création en cours…" : "Enregistrer"}
    </button>
  );
}

export function CreateIssueForm({ onSuccess }: CreateIssueFormProps) {
  const { state, formAction } = useCreateIssueForm(onSuccess);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="text-sm text-zinc-600 dark:text-zinc-300">
        Titre
        <input
          name="title"
          type="text"
          required
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          placeholder="Nom du ticket"
        />
      </label>

      <label className="text-sm text-zinc-600 dark:text-zinc-300">
        Assignee
        <input
          name="assignee"
          type="text"
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          placeholder="Ex : Victor"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-zinc-600 dark:text-zinc-300">
          Statut
          <select
            name="status"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
            defaultValue="todo"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm text-zinc-600 dark:text-zinc-300">
          Échéance
          <input
            name="dueDate"
            type="date"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          />
        </label>
      </div>

      {state.error ? <p className="text-sm text-rose-500">{state.error}</p> : null}

      <SubmitButton />
    </form>
  );
}
