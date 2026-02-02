import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./_components/providers";
import { AppNav } from "./_components/app-nav";
import { NextIntlClientProvider } from "next-intl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyJira - Gestion de projets",
  description: "Application de gestion de projets style Jira",
  manifest: "/manifest.json",
  themeColor: "#2563eb",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MyJira",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider>
          <AppProviders>
            <div className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)]">
              <AppNav />
              <div className="flex-1 overflow-y-auto px-10 py-10">{children}</div>
            </div>
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
