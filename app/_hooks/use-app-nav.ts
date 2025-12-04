"use client";

import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/issues", label: "Board" },
] as const;

export function useAppNav() {
  const pathname = usePathname();
  const { status } = useSession();

  const links = useMemo(
    () =>
      navLinks.map((link) => {
        const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
        return {
          ...link,
          isActive,
        };
      }),
    [pathname],
  );

  return {
    links,
    status,
    isAuthenticated: status === "authenticated",
  };
}
