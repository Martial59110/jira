"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { useRegisterForm } from "./_hooks/use-register-form";

export default function RegisterPage() {
  const { state, formAction, nameControl, emailControl, passwordControl, autoLoginPending } =
    useRegisterForm();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (autoLoginPending) {
      event.preventDefault();
    }
  }

  return (
    <main className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#f3f6ff] via-[#e7ecff] to-[#dfe5ff]">
      <div
        className="absolute inset-y-0 left-0 hidden w-32 bg-[#030712] md:block"
        aria-hidden="true"
      />
      <form
        action={formAction}
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md rounded-[32px] bg-white/95 p-10 shadow-[0_30px_80px_rgba(15,23,42,0.15)] ring-1 ring-[#e0e7ff]"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-[#94a3b8]">Créer un compte</p>
        <h1 className="mt-2 text-2xl font-semibold text-[#0f172a]">Rejoins MyJira</h1>
        <p className="mt-1 text-sm text-[#4c5773]">
          Indique ton nom, ton email et choisis un mot de passe sécurisé.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <label className="text-sm font-medium text-[#0f172a]">
            Nom complet
            <input
              name="name"
              type="text"
              value={nameControl.value}
              onChange={(event) => nameControl.onChange(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none transition focus:border-[#2563eb] focus:bg-white"
              placeholder="Ex : Claire Martin"
              required
            />
          </label>

          <label className="text-sm font-medium text-[#0f172a]">
            Email
            <input
              name="email"
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
              name="password"
              type="password"
              value={passwordControl.value}
              onChange={(event) => passwordControl.onChange(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none transition focus:border-[#2563eb] focus:bg-white"
              placeholder="••••••••"
              required
            />
          </label>
        </div>

        {state.error ? <p className="mt-4 text-sm text-rose-500">{state.error}</p> : null}

        <button
          type="submit"
          disabled={autoLoginPending}
          className="mt-8 w-full rounded-full bg-[#1e3fae] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1e3fae]/30 transition hover:bg-[#182f85] disabled:opacity-70"
        >
          {autoLoginPending ? "Connexion…" : "Créer le compte"}
        </button>

        <p className="mt-4 text-xs text-[#94a3b8]">
          Déjà inscrit ?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#0f172a] transition hover:text-[#1e3fae]"
          >
            Revenir à la connexion
          </Link>
        </p>
      </form>
    </main>
  );
}
