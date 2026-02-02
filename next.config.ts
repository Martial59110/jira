import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./app/i18n/request.ts");

const nextConfig: NextConfig = {
  /* config options here */
};

// Configuration de base avec next-intl
let finalConfig = withNextIntl(nextConfig);

// PWA - seulement en production et si le module est disponible
if (process.env.NODE_ENV === "production") {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const withPWAInit = require("next-pwa").default;
    const withPWA = withPWAInit({
      dest: "public",
      register: true,
      skipWaiting: true,
    });
    finalConfig = withPWA(finalConfig);
  } catch {
    // next-pwa n'est pas installé, on continue sans PWA
    console.log("next-pwa not available, skipping PWA configuration");
  }
}

export default finalConfig;
