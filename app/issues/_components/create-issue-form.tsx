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
      <label className="text-sm font-medium text-[#0f172a]">
        Titre
        <input
          name="title"
          type="text"
          required
          className="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-[#f7f9fc] px-4 py-3 text-[#0f172a] outline-none transition focus:border-[#2563eb] focus:bg-white"
          placeholder="Nom du ticket"
        />
      </label>

      <label className="text-sm font-medium text-[#0f172a]">
        Assignee
        <input
          name="assignee"
          type="text"
          className="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-[#f7f9fc] px-4 py-3 text-[#0f172a] outline-none transition focus:border-[#2563eb] focus:bg-white"
          placeholder="Ex : Victor"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-[#0f172a]">
          Statut
          <select
            name="status"
            className="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-[#f7f9fc] px-4 py-3 text-[#0f172a] outline-none transition focus:border-[#2563eb] focus:bg-white"
            defaultValue="todo"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium text-[#0f172a]">
          Échéance
          <input
            name="dueDate"
            type="date"
            className="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-[#f7f9fc] px-4 py-3 text-[#0f172a] outline-none transition focus:border-[#2563eb] focus:bg-white"
          />
        </label>
      </div>

      {state.error ? <p className="text-sm text-rose-500">{state.error}</p> : null}

      <SubmitButton />
    </form>
  );
}
