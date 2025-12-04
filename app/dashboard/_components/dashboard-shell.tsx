"use client";

type DashboardShellProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export function DashboardShell({ title, description, actions, children }: DashboardShellProps) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-2">
      <header className="flex flex-wrap items-center justify-between gap-6 rounded-[32px] bg-gradient-to-r from-[#0f172a] via-[#162952] to-[#1f3c8e] px-8 py-6 text-white shadow-[0_25px_60px_rgba(15,23,42,0.25)]">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">Workspace</p>
          <h1 className="mt-1 text-3xl font-semibold">{title}</h1>
          {description ? <p className="text-sm text-white/70">{description}</p> : null}
        </div>
        {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
      </header>
      <div className="grid gap-6">{children}</div>
    </section>
  );
}
