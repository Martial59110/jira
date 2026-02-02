import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: ["app/**/*.test.{ts,tsx}"],
    exclude: ["app/e2e/**", "node_modules/**"],
    setupFiles: ["./vitest.setup.ts"],
    typecheck: {
      tsconfig: "tsconfig.vitest.json",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});


