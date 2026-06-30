"use client";

import { ArrowRight, Gauge, Layers3, LineChart, Workflow } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import type { LucideIcon } from "lucide-react";

// TODO: Download the consulting photo from Google Drive and place at /public/consulting-photo.jpg
// Drive link: https://drive.google.com/open?id=1gh7kpkcx5sGfTmA8qJrFXJ6akkZxYrMZ
const CONSULTING_PHOTO = "/consulting-photo.jpg";

const measures: [string, string, LucideIcon][] = [
  ["Workflow Friction", "Where manual handoffs and redundant approvals slow down your daily execution velocity.", Workflow],
  ["Revenue Leakage", "Where unoptimized response times and delivery gaps quietly bleed high-intent opportunities.", LineChart],
  ["Founder Dependency", "Where leadership remains the default operating system for routine task execution.", Layers3],
  ["System Fragmentation", "Where disconnected tools and scattered data containers create heavy structural debt.", Gauge],
];

const infoBoxes = [
  {
    title: "Who it is for",
    text: "Built for tech founders, service operators, real estate, and organizations wrestling with improving operational efficiency.",
  },
  {
    title: "What you receive",
    text: "Get immediate operational scores across your critical workflows, identify your primary execution bottleneck, and get an actionable strategy roadmap.",
  },
  {
    title: "Why friction costs money",
    text: "Startups and small businesses rarely fail because their vision is too small. They fail because their execution model is structurally too heavy.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="executive-grid brand-shell border-b border-[var(--line)] px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="mb-8">
              <img
                src="/logo-cobranded.png"
                alt="Frugal Studio powered by Mindful Tech Automations"
                className="h-20 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <h1 className="text-5xl font-bold leading-[1.06] text-[var(--petrol)] md:text-6xl">
              How Much Operational Waste Is Hiding Inside Your Business?
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--charcoal)]">
              A 10-minute diagnostic to spot the hidden leaks draining your business. Reclaim the time and
              resources you need to scale.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--ink-muted)]">
              Our AI Process Automation Consulting transforms these operational bottlenecks into autonomous
              workflows, securing your margins and providing the structural agility required for high-velocity
              growth. Start here.
            </p>
            <div className="mt-10 flex flex-col items-start gap-2">
              <span className="text-sm text-[var(--ink-muted)]">Scroll down to learn more</span>
              <svg className="animate-bounce text-[var(--tangerine)]" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Frugal Scanner Assessment pillars ─────────────────────────────── */}
      <section className="border-b border-[var(--line)] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--tangerine)]">
              Frugal Scanner Assessment
            </div>
            <h2 className="mt-2 text-3xl font-bold text-[var(--petrol)]">Four diagnostic pillars</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {measures.map(([title, text, Icon]) => (
              <div key={title} className="flex gap-4 rounded-xl border border-[var(--line)] bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(32,80,90,0.08)] text-[var(--petrol)]">
                  <Icon size={20} />
                </div>
                <div>
                  <div className="font-bold text-[var(--petrol)]">{title}</div>
                  <div className="mt-1 text-sm leading-6 text-[var(--ink-muted)]">{text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who it is for — two columns with face photo ───────────────────── */}
      <section className="section-alt border-b border-[var(--line)] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Info boxes */}
            <div className="flex flex-col gap-5">
              {infoBoxes.map(({ title, text }) => (
                <div key={title} className="rounded-xl border border-[var(--line)] bg-white p-6 shadow-sm">
                  <h3 className="font-bold text-[var(--petrol)]">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--charcoal)]">{text}</p>
                </div>
              ))}
            </div>

            {/* Face / consulting photo */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img
                  src={CONSULTING_PHOTO}
                  alt="Felipe Hernández Villa-Roel — Frugal Studio"
                  className="h-[480px] w-[360px] rounded-2xl object-cover shadow-xl"
                  onError={(e) => {
                    // Hide the broken image placeholder gracefully
                    (e.currentTarget.parentElement as HTMLElement).style.display = "none";
                  }}
                />
                {/* Decorative petrol border accent */}
                <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-2xl border-2 border-[var(--petrol)] opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-[var(--petrol)]">Built for sharper operating decisions.</h2>
          <p className="mt-3 max-w-2xl text-[var(--charcoal)]">
            This FREE diagnostic serves as the direct entry point to a paid Operational Intelligence Audit
            with Frugal Studio powered by Mindful Tech Automations, setting the framework for full workflow
            automation implementation.
          </p>
          <div className="mt-8">
            <ButtonLink href="/assessment" variant="cta">
              <span className="inline-flex items-center gap-2">
                Start Free Diagnostic <ArrowRight size={18} />
              </span>
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
