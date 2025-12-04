"use client";

type BoardHeaderProps = {
  onCreateTicket: () => void;
  onFilter?: () => void;
};

export function BoardHeader({ onCreateTicket, onFilter }: BoardHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-6 rounded-[32px] bg-gradient-to-r from-[#0f172a] via-[#162952] to-[#1f3c8e] px-8 py-6 text-white shadow-[0_25px_60px_rgba(15,23,42,0.25)]">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">Product</p>
        <h1 className="text-3xl font-semibold">Board</h1>
        <p className="text-sm text-white/70">Vue Kanban des tickets en cours.</p>
      </div>
      <div className="flex gap-3">
        <button
          className="rounded-full bg-white/10 px-5 py-2 text-sm text-white transition hover:bg-white/20"
          type="button"
          onClick={onFilter}
        >
          Filtrer
        </button>
        <button
          className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#0f172a] transition hover:bg-blue-50"
          type="button"
          onClick={onCreateTicket}
        >
          Nouveau ticket
        </button>
      </div>
    </header>
  );
}
