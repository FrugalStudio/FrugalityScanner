"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { currency, type AssessmentAnswers, type ScoreResult } from "@/lib/assessment";
import { ScoreDial } from "@/components/ScoreDial";

type StoredAssessment = {
  answers: AssessmentAnswers;
  scores: ScoreResult;
};

export default function ResultsPage() {
  const router = useRouter();
  const [stored] = useState<StoredAssessment | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem("frugality-assessment");
    return raw ? JSON.parse(raw) : null;
  });
  const [status, setStatus] = useState("");

  async function submit(formData: FormData) {
    if (!stored) return;
    setStatus("Unlocking report...");
    const response = await fetch("/api/submit-assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact: Object.fromEntries(formData.entries()),
        answers: stored.answers,
        scores: stored.scores,
      }),
    });

    if (!response.ok) {
      setStatus("Something went wrong. Please try again.");
      return;
    }

    window.localStorage.removeItem("frugality-assessment");
    router.push("/thank-you");
  }

  if (!stored) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="rounded-lg border border-[var(--line)] bg-[rgba(13,28,24,0.9)] p-8 text-center">
          <h1 className="text-3xl font-bold text-white">No assessment found</h1>
          <a className="mt-5 inline-flex rounded-md bg-[var(--accent)] px-5 py-3 font-bold text-[#06100d]" href="/assessment">
            Start Free Assessment
          </a>
        </div>
      </main>
    );
  }

  const { scores } = stored;

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Partial Results</div>
          <h1 className="mt-2 text-4xl font-bold text-white">Operational Intelligence Snapshot</h1>
        </header>

        <div className="grid gap-4 md:grid-cols-4">
          <ScoreDial label="Operational Intelligence Index" value={scores.operationalIntelligenceIndex} />
          <ScoreDial label="Operational Friction Score" value={scores.operationalFrictionScore} />
          <ScoreDial label="Founder Dependency Index" value={scores.founderDependencyIndex} />
          <div className="rounded-lg border border-[var(--line)] bg-[rgba(13,28,24,0.78)] p-5">
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--ink-muted)]">Opportunity Recovery Estimate</div>
            <div className="mt-4 text-3xl font-bold text-[var(--accent)]">
              {currency(scores.opportunityLow)}-{currency(scores.opportunityHigh)}
            </div>
            <div className="mt-2 text-sm text-[var(--ink-muted)]">Estimated monthly recovery range</div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-lg border border-[var(--line)] bg-[rgba(13,28,24,0.78)] p-6">
            <h2 className="text-2xl font-bold text-white">Top 3 Diagnostic Findings</h2>
            <div className="mt-5 grid gap-3">
              {scores.topFindings.map((finding) => (
                <div key={finding} className="rounded-md bg-white/[0.04] p-4 text-[#c4d6cd]">
                  {finding}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-[var(--line)] bg-[#10221d] p-6">
            <div className="flex items-center gap-3 text-[var(--accent)]">
              <LockKeyhole size={22} />
              <span className="text-sm font-bold uppercase tracking-[0.16em]">Unlock Full Report</span>
            </div>
            <h2 className="mt-4 text-3xl font-bold text-white">Unlock Your Full Operational Intelligence Report</h2>
            <form action={submit} className="mt-6 grid gap-4 md:grid-cols-2">
              <Input name="firstName" label="First name" required />
              <Input name="lastName" label="Last name" required />
              <Input name="email" label="Business email" type="email" required />
              <Input name="company" label="Company name" required />
              <Input name="website" label="Website" required />
              <Input name="linkedinUrl" label="LinkedIn URL" />
              <Input name="phone" label="Phone" />
              <button className="h-12 rounded-md bg-[var(--accent)] px-5 font-bold text-[#06100d] md:col-span-2" type="submit">
                Unlock My Full Report
              </button>
              {status ? <div className="text-sm text-[var(--ink-muted)] md:col-span-2">{status}</div> : null}
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

function Input({ name, label, type = "text", required = false }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm text-[#c5d6ce]">{label}</span>
      <input
        className="mt-2 h-12 w-full rounded-md border border-[var(--line)] bg-[#07120f] px-3 text-white outline-none focus:border-[var(--accent)]"
        name={name}
        type={type}
        required={required}
      />
    </label>
  );
}
