"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/issues", label: "Board" },
] as const;

export function AppNav() {
  const pathname = usePathname();
  const { status } = useSession();

  return (
    <header className="border-b border-zinc-200 bg-white/80 px-6 py-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            MyJira
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">Beta</span>
        </div>
        <nav className="flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  isActive
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {status === "authenticated" ? (
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-900 dark:border-zinc-700 dark:text-zinc-200"
            >
              Déconnexion
            </button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
