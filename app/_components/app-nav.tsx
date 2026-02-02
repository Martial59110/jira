"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAppNav } from "../_hooks/use-app-nav";
import { useTranslations, useLocale } from "next-intl";
import { setLocaleAction } from "../_actions/set-locale";

export function AppNav() {
  const { links, isAuthenticated } = useAppNav();
  const t = useTranslations("AppNav");
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleLocaleChange(newLocale: string) {
    startTransition(async () => {
      await setLocaleAction(newLocale);
      router.refresh();
    });
  }

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

      <div className="mb-3">
        <label className="mb-1 block text-xs text-slate-400">{t("language")}</label>
        <select
          value={locale}
          onChange={(e) => handleLocaleChange(e.target.value)}
          disabled={isPending}
          className="w-full rounded-xl border border-white/10 bg-[#1a2332] px-3 py-2 text-sm text-white outline-none transition hover:bg-white/5 focus:border-blue-400 disabled:opacity-50"
        >
          <option value="en" className="bg-[#1a2332] text-white">{t("language_en")}</option>
          <option value="fr" className="bg-[#1a2332] text-white">{t("language_fr")}</option>
        </select>
      </div>

      {isAuthenticated ? (
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="rounded-xl border border-white/10 px-3 py-2 text-left text-sm text-white transition hover:bg-white/5"
        >
          {t("logout")}
        </button>
      ) : null}
    </aside>
  );
}
