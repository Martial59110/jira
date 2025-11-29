"use client";

type DashboardShellProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export function DashboardShell({ title, description, actions, children }: DashboardShellProps) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white px-6 py-5 shadow-sm ring-1 ring-[var(--border-color)]">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">Workspace</p>
          <h1 className="mt-1 text-3xl font-semibold text-[var(--foreground)]">{title}</h1>
          {description ? <p className="text-sm text-[var(--muted)]">{description}</p> : null}
        </div>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </header>
      <div className="grid gap-6">{children}</div>
    </section>
  );
}
