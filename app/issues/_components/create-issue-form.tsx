"use client";

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

export function CreateIssueForm({ onSuccess }: CreateIssueFormProps) {
  const t = useTranslations("CreateIssueForm");
  const { register, errors, onSubmit, isPending, isError, error } = useCreateIssueForm(onSuccess);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="text-sm font-medium text-[#0f172a]">
        {t("title")}
        <input
          {...register("title")}
          type="text"
          className={`mt-2 w-full rounded-2xl border bg-[#f7f9fc] px-4 py-3 text-[#0f172a] outline-none transition focus:bg-white ${
            errors.title
              ? "border-rose-500 focus:border-rose-500"
              : "border-[#e2e8f0] focus:border-[#2563eb]"
          }`}
          placeholder={t("title_placeholder")}
        />
        {errors.title && <p className="mt-1 text-sm text-rose-500">{errors.title.message}</p>}
      </label>

      <label className="text-sm font-medium text-[#0f172a]">
        {t("assignee")}
        <input
          {...register("assignee")}
          type="text"
          className={`mt-2 w-full rounded-2xl border bg-[#f7f9fc] px-4 py-3 text-[#0f172a] outline-none transition focus:bg-white ${
            errors.assignee
              ? "border-rose-500 focus:border-rose-500"
              : "border-[#e2e8f0] focus:border-[#2563eb]"
          }`}
          placeholder={t("assignee_placeholder")}
        />
        {errors.assignee && <p className="mt-1 text-sm text-rose-500">{errors.assignee.message}</p>}
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-[#0f172a]">
          {t("status")}
          <select
            {...register("status")}
            className="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-[#f7f9fc] px-4 py-3 text-[#0f172a] outline-none transition focus:border-[#2563eb] focus:bg-white"
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
            {...register("dueDate")}
            type="date"
            className="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-[#f7f9fc] px-4 py-3 text-[#0f172a] outline-none transition focus:border-[#2563eb] focus:bg-white"
          />
        </label>
      </div>

      {isError && (
        <p className="text-sm text-rose-500">{error?.message || "Une erreur est survenue."}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-70"
      >
        {isPending ? t("create_ticket_pending") : t("create_ticket_submit")}
      </button>
    </form>
  );
}
