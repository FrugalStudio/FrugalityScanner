import Link from "next/link";
import type { ReactNode } from "react";

export function ButtonLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--accent)] px-5 text-sm font-bold text-[#08110e] transition hover:bg-[var(--accent-strong)]"
    >
      {children}
    </Link>
  );
}
