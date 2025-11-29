export function getApiUrl(path: string) {
  if (!path.startsWith("/")) {
    throw new Error("API path must start with '/'");
  }

  const baseUrl =
    typeof window === "undefined"
      ? (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")
      : "";

  return `${baseUrl}${path}`;
}
