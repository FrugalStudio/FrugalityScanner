import { ArrowRight, Gauge, Layers3, LineChart, Workflow } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";

const measures = [
  ["Workflow friction", "Where manual handoffs, approvals, and re-entry slow the business down."],
  ["Revenue leakage", "Where leads, follow-up, and delivery gaps quietly drain opportunity value."],
  ["Founder dependency", "Where leadership is still the operating system for routine execution."],
  ["System fragmentation", "Where tools, documents, and data sources create structural debt."],
];

export default function Home() {
  return (
    <main className="min-h-screen executive-grid brand-shell">
      <section className="mx-auto grid min-h-[92vh] max-w-7xl items-center gap-10 px-6 py-10 lg:grid-cols-[1.06fr_0.94fr]">
        <div>
          <div className="mb-6 inline-flex rounded-full border border-[var(--line)] bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            Frugality Scanner - Powered by Mindful Tech
          </div>
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] text-white md:text-7xl">
            How Much Operational Waste Is Hiding Inside Your Business?
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#b8c9c0]">
            Take a 5-7 minute Operational Intelligence Assessment to identify workflow friction, revenue leakage,
            founder dependency, and automation opportunities.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink href="/assessment">Start Free Assessment</ButtonLink>
            <span className="text-sm text-[var(--ink-muted)]">Operational Intelligence Assessment</span>
          </div>
        </div>
        <div className="rounded-lg border border-[var(--line)] bg-[rgba(16,28,24,0.88)] p-5 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
            <div>
              <div className="text-sm font-semibold text-white">Diagnostic Command Center</div>
              <div className="text-xs text-[var(--ink-muted)]">Live assessment model</div>
            </div>
            <Gauge className="text-[var(--accent)]" size={26} />
          </div>
          <div className="grid gap-3 pt-5">
            {measures.map(([title, text], index) => (
              <div key={title} className="grid grid-cols-[36px_1fr] gap-4 rounded-md bg-white/[0.035] p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[rgba(216,199,161,0.12)] text-[var(--accent)]">
                  {index === 0 ? <Workflow size={18} /> : index === 1 ? <LineChart size={18} /> : <Layers3 size={18} />}
                </div>
                <div>
                  <div className="font-semibold text-white">{title}</div>
                  <div className="mt-1 text-sm leading-6 text-[#bdb6a8]">{text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[#101813]/82 px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            ["Who it is for", "Founders, operators, real estate firms, service businesses, NGOs, and lean teams with growing operational complexity."],
            ["What users receive", "Immediate diagnostic scores, top operational findings, and a full report after the contact unlock."],
            ["Why friction costs money", "Slow response loops, duplicate tools, and undocumented processes convert attention into hidden expense."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-lg border border-[var(--line)] bg-white/[0.035] p-6">
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <p className="mt-3 leading-7 text-[#bdb6a8]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Built for sharper operating decisions.</h2>
          <p className="mt-3 max-w-2xl text-[#bdb6a8]">
            The scanner routes qualified leads into a paid Operational Intelligence Audit with Mindful Tech.
          </p>
        </div>
        <ButtonLink href="/assessment">
          <span className="inline-flex items-center gap-2">
            Start Free Assessment <ArrowRight size={18} />
          </span>
        </ButtonLink>
      </section>
    </main>
  );
}
