"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

import { useSession } from "next-auth/react";

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
    <main className="flex min-h-[80vh] items-center justify-center">
      {status === "authenticated" ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center text-sm text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          Tu es déjà connecté.{" "}
          <button
            onClick={() => router.push("/")}
            className="text-blue-600 underline dark:text-blue-400"
          >
            Retour au dashboard
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        >
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">Connexion</h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Utilise les identifiants de test indiqués ci-dessous.
          </p>

          <div className="mt-6 flex flex-col gap-4">
            <label className="text-sm text-zinc-600 dark:text-zinc-300">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                required
              />
            </label>

            <label className="text-sm text-zinc-600 dark:text-zinc-300">
              Mot de passe
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                required
              />
            </label>
          </div>

          {error ? <p className="mt-4 text-sm text-rose-500">{error}</p> : null}

          <button
            type="submit"
            disabled={isPending}
            className="mt-6 w-full rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-70"
          >
            {isPending ? "Connexion…" : "Se connecter"}
          </button>

          <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
            Comptes de test : marti@example.com / admin123 ou team@example.com / member123
          </p>
        </form>
      )}
    </main>
  );
}
