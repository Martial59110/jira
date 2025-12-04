"use client";

import Link from "next/link";
import { useLoginForm } from "./_hooks/use-login-form";

export default function LoginPage() {
  const {
    isPending,
    errorMessage,
    handleSubmit,
    emailControl,
    passwordControl,
    isRedirecting,
    isSubmitting,
  } = useLoginForm();

  if (isRedirecting || isSubmitting) {
    return (
      <main className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#f3f6ff] via-[#e7ecff] to-[#dfe5ff]">
        <div className="flex items-center gap-3 rounded-3xl bg-white/90 px-8 py-5 text-sm text-[#0f172a] shadow-2xl">
          <span className="h-2.5 w-2.5 animate-ping rounded-full bg-[#2563eb]" />
          Connexion sécurisée en cours…
        </div>
      </main>
    );
  }

  return (
    <main className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#f3f6ff] via-[#e7ecff] to-[#dfe5ff]">
      <div
        className="absolute inset-y-0 left-0 hidden w-32 bg-[#050910] md:block"
        aria-hidden="true"
      />

      <section className="relative z-10 w-full max-w-md rounded-[32px] bg-white/95 p-10 shadow-[0_30px_80px_rgba(15,23,42,0.15)] ring-1 ring-[#e0e7ff]">
        <p className="text-xs uppercase tracking-[0.35em] text-[#94a3b8]">Bienvenue</p>
        <h1 className="mt-2 text-2xl font-semibold text-[#0f172a]">Connexion</h1>
        <p className="mt-1 text-sm text-[#4c5773]">
          Entre tes identifiants pour retrouver ton espace.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="text-sm font-medium text-[#0f172a]">
            Email
            <input
              type="email"
              value={emailControl.value}
              onChange={(event) => emailControl.onChange(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none transition focus:border-[#2563eb] focus:bg-white"
              placeholder="you@company.com"
              required
            />
          </label>

          <label className="text-sm font-medium text-[#0f172a]">
            Mot de passe
            <input
              type="password"
              value={passwordControl.value}
              onChange={(event) => passwordControl.onChange(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none transition focus:border-[#2563eb] focus:bg-white"
              placeholder="••••••••"
              required
            />
          </label>

          {errorMessage ? <p className="text-sm text-rose-500">{errorMessage}</p> : null}

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 w-full rounded-full bg-[#1e3fae] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1e3fae]/30 transition hover:bg-[#182f85] disabled:opacity-70"
          >
            {isPending ? "Connexion…" : "Se connecter"}
          </button>
        </form>

        <p className="mt-4 text-xs text-[#94a3b8]">
          Comptes de test : marti@example.com / admin123 ou team@example.com / member123
        </p>

        <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#eff3ff] px-4 py-3 text-sm text-[#475569]">
          <span>Pas encore de compte ?</span>
          <Link
            href="/register"
            className="rounded-full bg-[#0f172a] px-4 py-2 font-semibold text-white transition hover:bg-[#1c2946]"
          >
            Créer un compte
          </Link>
        </div>
      </section>
    </main>
  );
}
