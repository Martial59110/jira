"use client";

import { useFormStatus } from "react-dom";
import { useCreateIssueForm } from "../_hooks/use-create-issue-form";
import { useTranslations } from "next-intl";

const statusOptions = (t: ReturnType<typeof useTranslations>) =>
  [
    { value: "todo", label: t("todo") },
    { value: "inProgress", label: t("inProgress") },
    { value: "blocked", label: t("blocked") },
    { value: "done", label: t("done") },
  ] as const;

type CreateIssueFormProps = {
  onSuccess?: () => void;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("CreateIssueForm");
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-70"
    >
      {pending ? t("create_ticket_pending") : t("create_ticket_submit")}
    </button>
  );
}

export function CreateIssueForm({ onSuccess }: CreateIssueFormProps) {
  const { state, formAction } = useCreateIssueForm(onSuccess);
  const t = useTranslations("CreateIssueForm");
  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="text-sm font-medium text-[#0f172a]">
        {t("title")}
        <input
          name="title"
          type="text"
          required
          className="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-[#f7f9fc] px-4 py-3 text-[#0f172a] outline-none transition focus:border-[#2563eb] focus:bg-white"
          placeholder={t("title_placeholder")}
        />
      </label>

      <label className="text-sm font-medium text-[#0f172a]">
        {t("assignee")}
        <input
          name="assignee"
          type="text"
          className="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-[#f7f9fc] px-4 py-3 text-[#0f172a] outline-none transition focus:border-[#2563eb] focus:bg-white"
          placeholder={t("assignee_placeholder")}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-[#0f172a]">
          {t("status")}
          <select
            name="status"
            className="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-[#f7f9fc] px-4 py-3 text-[#0f172a] outline-none transition focus:border-[#2563eb] focus:bg-white"
            defaultValue="todo"
          >
            {statusOptions(t).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium text-[#0f172a]">
          {t("due_date")}
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
