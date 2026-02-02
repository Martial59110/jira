export function ActivityListFallback() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[var(--border-color)]">
      <div className="mb-4 h-5 w-40 animate-pulse rounded-full bg-slate-200" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-4 w-full animate-pulse rounded-full bg-slate-200" />
        ))}
      </div>
    </div>
  );
}
