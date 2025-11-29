"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

export default function LoginPage() {
  const { status } = useSession();

  const router = useRouter();
  const [email, setEmail] = useState("marti@example.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Identifiants incorrects.");
        return;
      }

      router.push("/");
      router.refresh();
    });
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f7f9ff] to-[#eef2ff]">
      <div className="absolute left-0 top-0 hidden h-full w-72 bg-[#111727] md:block" />
      {status === "authenticated" ? (
        <div className="relative z-10 w-full max-w-lg rounded-3xl bg-white/90 p-10 text-center shadow-2xl ring-1 ring-[var(--border-color)]">
          <h2 className="text-2xl font-semibold text-[var(--foreground)]">Tu es déjà connecté</h2>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Accède directement au tableau de bord pour continuer.
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-6 rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Retour au dashboard
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="relative z-10 w-full max-w-lg rounded-3xl bg-white p-10 shadow-2xl ring-1 ring-[var(--border-color)]"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--muted)]">Bienvenue</p>
          <h1 className="mt-2 text-3xl font-semibold text-[var(--foreground)]">Connexion</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Utilise les identifiants de test pour accéder à ton workspace.
          </p>

          <div className="mt-6 flex flex-col gap-4">
            <label className="text-sm font-medium text-[var(--foreground)]">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[var(--border-color)] bg-[#f4f6fb] px-4 py-3 text-[var(--foreground)] focus:border-[var(--brand)] focus:bg-white focus:outline-none"
                placeholder="you@company.com"
                required
              />
            </label>

            <label className="text-sm font-medium text-[var(--foreground)]">
              Mot de passe
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[var(--border-color)] bg-[#f4f6fb] px-4 py-3 text-[var(--foreground)] focus:border-[var(--brand)] focus:bg-white focus:outline-none"
                placeholder="••••••••"
                required
              />
            </label>
          </div>

          {error ? <p className="mt-4 text-sm text-rose-500">{error}</p> : null}

          <button
            type="submit"
            disabled={isPending}
            className="mt-8 w-full rounded-full bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-70"
          >
            {isPending ? "Connexion…" : "Se connecter"}
          </button>

          <p className="mt-4 text-xs text-[var(--muted)]">
            Comptes de test : marti@example.com / admin123 ou team@example.com / member123
          </p>
        </form>
      )}
    </main>
  );
}
