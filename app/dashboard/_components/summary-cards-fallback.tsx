export function SummaryCardsFallback() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[var(--border-color)]"
        >
          <div className="h-1.5 w-16 animate-pulse rounded-full bg-slate-200" />
          <div className="mt-4 h-4 w-28 animate-pulse rounded-full bg-slate-200" />
          <div className="mt-3 h-10 w-16 animate-pulse rounded-lg bg-slate-200" />
        </div>
      ))}
    </div>
  );
}
