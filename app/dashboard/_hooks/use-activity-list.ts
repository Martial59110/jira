"use client";

import { useCallback, useMemo, useState } from "react";
import { useDashboardStats } from "@/app/_hooks/use-dashboard-stats";

const DEFAULT_VISIBLE_COUNT = 4;
const PAGE_SIZE = 10;

export function useActivityList() {
  const { data, isLoading, error } = useDashboardStats();
  const items = useMemo(() => data?.activity ?? [], [data?.activity]);
  const [showAll, setShowAll] = useState(false);
  const [page, setPage] = useState(0);

  const hasMore = items.length > DEFAULT_VISIBLE_COUNT;
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));

  const visibleItems = useMemo(() => {
    if (!showAll) {
      return items.slice(0, DEFAULT_VISIBLE_COUNT);
    }
    const start = page * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, page, showAll]);

  const toggleShowAll = useCallback(() => {
    setShowAll((prev) => {
      const next = !prev;
      if (!next) {
        setPage(0);
      }
      return next;
    });
  }, []);

  const canGoPrev = page > 0;
  const canGoNext = page + 1 < totalPages;

  const goPrev = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 0));
  }, []);

  const goNext = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages - 1));
  }, [totalPages]);

  return {
    isLoading,
    error,
    items,
    visibleItems,
    showAll,
    hasMore,
    toggleShowAll,
    page,
    totalPages,
    canGoPrev,
    canGoNext,
    goPrev,
    goNext,
  };
}
