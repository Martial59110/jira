"use server";

import { cookies } from "next/headers";
import { locales, type Locale, defaultLocale } from "@/app/i18n/request";

export async function setLocaleAction(locale: string): Promise<void> {
  const validLocale: Locale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  const cookieStore = await cookies();
  cookieStore.set("locale", validLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, 
    sameSite: "lax",
  });
}
