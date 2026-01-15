"use client";

import { useTranslations } from "next-intl";
import { useActivityList } from "../_hooks/use-activity-list";

const getRelativeTime = (timestamp: string, t: ReturnType<typeof useTranslations>) => {
  const diffMs = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.round(diffMs / 60000);

  if (minutes < 1) return t("just_now");
  if (minutes < 60) return t("minutes_ago", { count: minutes });

  const hours = Math.round(minutes / 60);
  if (hours < 24) return t("hours_ago", { count: hours });

  const days = Math.round(hours / 24);
  return t("days_ago", { count: days });
};

const translateActivity = (action: string, tActivity: ReturnType<typeof useTranslations>, tStatus: ReturnType<typeof useTranslations>) => {
  const movedMatch = action.match(/a déplacé ([A-Z]+-\d+) vers (\w+)/);
  if (movedMatch) {
    const [, code, status] = movedMatch;
    const statusKey = status as "todo" | "inProgress" | "blocked" | "done";
    return tActivity("moved_to", { code, status: tStatus(statusKey) });
  }

  const createdMatch = action.match(/a créé le ticket ([A-Z]+-\d+)/);
  if (createdMatch) {
    const [, code] = createdMatch;
    return tActivity("created_ticket", { code });
  }

  return action;
};

export function ActivityList() {
  const {
    visibleItems,
    hasMore,
    showAll,
    toggleShowAll,
    canGoPrev,
    canGoNext,
    page,
    totalPages,
    goPrev,
    goNext,
  } = useActivityList();

  const t = useTranslations("ActivityList");
  const tActivity = useTranslations("Activity");
  const tStatus = useTranslations("CreateIssueForm");

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[var(--border-color)]">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">{t("recent_activity")}</h2>
          <p className="text-sm text-[var(--muted)]">{t("all_actions")}</p>
        </div>
        {hasMore ? (
          <button
            type="button"
            className="text-sm font-medium text-[var(--brand)] underline-offset-4 hover:text-blue-600 hover:underline"
            onClick={toggleShowAll}
          >
            {showAll ? t("reduce") : t("view_all")}
          </button>
        ) : null}
      </header>

      <ol className="space-y-4">
        {visibleItems.length === 0 && (
          <li className="text-sm text-[var(--muted)]">{t("no_recent_activity")}</li>
        )}
        {visibleItems.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-[var(--brand)]" />
            <div>
              <p className="text-sm text-[var(--foreground)]">
                <span className="font-semibold">{item.author}</span> {translateActivity(item.action, tActivity, tStatus)}
              </p>
              <p className="text-xs text-[var(--muted)]">{getRelativeTime(item.timestamp, t)}</p>
            </div>
          </li>
        ))}
      </ol>

      {showAll && hasMore ? (
        <div className="mt-5 flex items-center justify-between border-t pt-4 text-sm text-[var(--muted)]">
          <button
            type="button"
            onClick={goPrev}
            disabled={!canGoPrev}
            className="rounded-full border border-[var(--border-color)] px-3 py-1 font-medium text-[var(--foreground)] transition hover:border-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t("previous")}
          </button>
          <span className="text-[var(--foreground)]">
            {t("page")} {page + 1} {t("of")} {totalPages}
          </span>
          <button
            type="button"
            onClick={goNext}
            disabled={!canGoNext}
            className="rounded-full border border-[var(--border-color)] px-3 py-1 font-medium text-[var(--foreground)] transition hover:border-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t("next")}
          </button>
        </div>
      ) : null}
    </section>
  );
}
