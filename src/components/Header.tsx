"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

// Place co-branded logo at /public/logo-cobranded.png — it renders automatically.
export function Header() {
  const pathname = usePathname();
  const isSpanish = pathname.startsWith("/es");
  const switchPath = isSpanish
    ? pathname.replace(/^\/es/, "") || "/"
    : `/es${pathname === "/" ? "" : pathname}`;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Co-branded logo */}
        <Link href={isSpanish ? "/es" : "/"} className="flex items-center">
          <img
            src="/logo-cobranded.png"
            alt="Frugal Studio powered by Mindful Tech Automations"
            className="h-12 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const fb = e.currentTarget.nextElementSibling as HTMLElement | null;
              if (fb) fb.style.display = "flex";
            }}
          />
          {/* Text fallback */}
          <div className="hidden flex-col leading-tight" aria-hidden="true">
            <span className="text-base font-bold text-[var(--petrol)]">Frugal Studio</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--tangerine)]">
              powered by Mindful Tech Automations
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-muted)] sm:block">
            Frugality Scanner
          </span>
          {/* Language switcher */}
          <Link
            href={switchPath}
            className="rounded-md border border-[var(--line)] px-3 py-1.5 text-xs font-semibold text-[var(--petrol)] transition hover:border-[var(--petrol)] hover:bg-[var(--panel)]"
          >
            {isSpanish ? "EN" : "ES"}
          </Link>
        </div>
      </div>
    </header>
  );
}
