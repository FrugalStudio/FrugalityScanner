"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { currency, type AssessmentAnswers, type ScoreResult } from "@/lib/assessment";
import { ScoreDial } from "@/components/ScoreDial";

type ContactInfo = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  website: string;
  linkedinUrl: string;
  phone: string;
};

type StoredAssessment = {
  contact: ContactInfo;
  answers: AssessmentAnswers;
  scores: ScoreResult;
};

export default function ResultsPage() {
  const router = useRouter();
  const submitted = useRef(false);
  const [stored] = useState<StoredAssessment | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem("frugality-assessment");
    return raw ? JSON.parse(raw) : null;
  });
  const [reportStatus, setReportStatus] = useState<"sending" | "sent" | "error">("sending");

  useEffect(() => {
    if (!stored || submitted.current) return;
    submitted.current = true;

    fetch("/api/submit-assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact: {
          ...stored.contact,
          name: `${stored.contact.firstName} ${stored.contact.lastName}`.trim(),
        },
        answers: stored.answers,
        scores: stored.scores,
      }),
    })
      .then((res) => {
        setReportStatus(res.ok ? "sent" : "error");
        if (res.ok) window.localStorage.removeItem("frugality-assessment");
      })
      .catch(() => setReportStatus("error"));
  }, [stored]);

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

  const { scores, contact } = stored;

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Your Results</div>
          <h1 className="mt-2 text-4xl font-bold text-white">Operational Intelligence Report</h1>
        </header>

        {reportStatus === "sending" && (
          <div className="mb-6 rounded-lg border border-[var(--line)] bg-[rgba(112,228,165,0.06)] px-5 py-4 text-sm text-[var(--ink-muted)]">
            Generating your full report...
          </div>
        )}
        {reportStatus === "sent" && (
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-[rgba(112,228,165,0.3)] bg-[rgba(112,228,165,0.08)] px-5 py-4">
            <CheckCircle size={18} className="shrink-0 text-[var(--accent)]" />
            <span className="text-sm text-[#c4d6cd]">
              Your full report is on its way to <strong className="text-white">{contact.email}</strong>
            </span>
          </div>
        )}
        {reportStatus === "error" && (
          <div className="mb-6 rounded-lg border border-red-900/40 bg-red-950/30 px-5 py-4 text-sm text-red-300">
            Report delivery failed — please contact us at info@mindfultech.services
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-4">
          <ScoreDial label="Operational Intelligence Index" value={scores.operationalIntelligenceIndex} />
          <ScoreDial label="Operational Friction Score" value={scores.operationalFrictionScore} />
          <ScoreDial label="Founder Dependency Index" value={scores.founderDependencyIndex} />
          <div className="rounded-lg border border-[var(--line)] bg-[rgba(13,28,24,0.78)] p-5">
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--ink-muted)]">Opportunity Recovery Estimate</div>
            <div className="mt-4 text-3xl font-bold text-[var(--accent)]">
              {currency(scores.opportunityLow)}–{currency(scores.opportunityHigh)}
            </div>
            <div className="mt-2 text-sm text-[var(--ink-muted)]">Estimated monthly recovery range</div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-[var(--line)] bg-[rgba(13,28,24,0.78)] p-6">
          <h2 className="text-2xl font-bold text-white">Top 3 Diagnostic Findings</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {scores.topFindings.map((finding) => (
              <div key={finding} className="rounded-md bg-white/[0.04] p-4 text-[#c4d6cd]">
                {finding}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/thank-you")}
            className="inline-flex h-11 items-center gap-2 rounded-md bg-[var(--accent)] px-6 text-sm font-bold text-[#06100d]"
          >
            Done
          </button>
          <a href="/assessment" className="text-sm text-[var(--ink-muted)] hover:text-white">
            Retake assessment
          </a>
        </div>
      </div>
    </main>
  );
}
