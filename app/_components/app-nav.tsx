"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAppNav } from "../_hooks/use-app-nav";

export function AppNav() {
  const { links, isAuthenticated } = useAppNav();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-[#111727] px-4 py-6 text-slate-200">
      <div className="flex items-center gap-2 px-2">
        <span className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-400">
          MyJira
        </span>
        <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs text-blue-200">Beta</span>
      </div>

      <nav className="mt-10 flex flex-1 flex-col gap-1">
        {isAuthenticated
          ? links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-medium transition",
                  link.isActive
                    ? "bg-blue-500/20 text-white ring-1 ring-blue-400"
                    : "text-slate-400 hover:bg-white/5 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            ))
          : null}
      </nav>

      {isAuthenticated ? (
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="rounded-xl border border-white/10 px-3 py-2 text-left text-sm text-white transition hover:bg-white/5"
        >
          Déconnexion
        </button>
      ) : null}
    </aside>
  );
}
