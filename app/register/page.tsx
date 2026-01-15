"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { useTranslations } from "next-intl";
import { useRegisterForm } from "./_hooks/use-register-form";

export default function RegisterPage() {
  const { state, formAction, nameControl, emailControl, passwordControl, autoLoginPending } =
    useRegisterForm();
  const t = useTranslations("Register");

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
        <p className="text-xs uppercase tracking-[0.35em] text-[#94a3b8]">{t("create_account")}</p>
        <h1 className="mt-2 text-2xl font-semibold text-[#0f172a]">{t("join_myjira")}</h1>
        <p className="mt-1 text-sm text-[#4c5773]">{t("description")}</p>

        <div className="mt-6 flex flex-col gap-4">
          <label className="text-sm font-medium text-[#0f172a]">
            {t("full_name")}
            <input
              name="name"
              type="text"
              value={nameControl.value}
              onChange={(event) => nameControl.onChange(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none transition focus:border-[#2563eb] focus:bg-white"
              placeholder={t("full_name_placeholder")}
              required
            />
          </label>

          <label className="text-sm font-medium text-[#0f172a]">
            {t("email")}
            <input
              name="email"
              type="email"
              value={emailControl.value}
              onChange={(event) => emailControl.onChange(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none transition focus:border-[#2563eb] focus:bg-white"
              placeholder={t("email_placeholder")}
              required
            />
          </label>

          <label className="text-sm font-medium text-[#0f172a]">
            {t("password")}
            <input
              name="password"
              type="password"
              value={passwordControl.value}
              onChange={(event) => passwordControl.onChange(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-[#0f172a] outline-none transition focus:border-[#2563eb] focus:bg-white"
              placeholder={t("password_placeholder")}
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
          {autoLoginPending ? t("connecting") : t("create_account_button")}
        </button>

        <p className="mt-4 text-xs text-[#94a3b8]">
          {t("already_registered")}{" "}
          <Link
            href="/login"
            className="font-semibold text-[#0f172a] transition hover:text-[#1e3fae]"
          >
            {t("back_to_login")}
          </Link>
        </p>
      </form>
    </main>
  );
}
