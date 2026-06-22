"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  businessGoals,
  goalBucket,
  initialAnswers,
  organizationTypes,
  teamSizes,
  toolGroups,
  type AssessmentAnswers,
  type OrganizationType,
} from "@/lib/assessment";
import { scoreAssessment } from "@/lib/scoring";

type ContactInfo = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  website: string;
  linkedinUrl: string;
  phone: string;
};

const initialContact: ContactInfo = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  website: "",
  linkedinUrl: "",
  phone: "",
};

const steps = ["Contact", "Business", "Goal", "Scale", "Stack", "Drag", "Finance"];

export default function AssessmentPage() {
  const router = useRouter();
  const [contact, setContact] = useState<ContactInfo>(initialContact);
  const [answers, setAnswers] = useState<AssessmentAnswers>(initialAnswers);
  const [step, setStep] = useState(0);
  const currentGoals = useMemo(
    () => businessGoals[goalBucket(answers.organizationType)],
    [answers.organizationType],
  );

  function updateContact<T extends keyof ContactInfo>(key: T, value: string) {
    setContact((current) => ({ ...current, [key]: value }));
  }

  function update<T extends keyof AssessmentAnswers>(key: T, value: AssessmentAnswers[T]) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function toggleTool(tool: string) {
    setAnswers((current) => ({
      ...current,
      tools: current.tools.includes(tool) ? current.tools.filter((item) => item !== tool) : [...current.tools, tool],
    }));
  }

  function next() {
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }
    const scores = scoreAssessment(answers);
    window.localStorage.setItem("frugality-assessment", JSON.stringify({ contact, answers, scores }));
    router.push("/results");
  }

  const canContinue =
    step === 0
      ? Boolean(contact.firstName && contact.email && contact.company)
      : step === 1
        ? Boolean(answers.organizationType)
        : step === 2
          ? Boolean(answers.businessGoal)
          : step === 3
            ? Boolean(answers.teamSize)
            : true;

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Frugality Scanner</div>
            <h1 className="mt-2 text-4xl font-bold text-white">Operational Intelligence Assessment</h1>
          </div>
          <div className="text-sm text-[var(--ink-muted)]">5-7 minute diagnostic</div>
        </header>

        <div className="mb-8 grid grid-cols-7 gap-2">
          {steps.map((label, index) => (
            <div key={label} className="h-2 rounded-full bg-white/10">
              <div className={`h-2 rounded-full ${index <= step ? "bg-[var(--accent)]" : "bg-transparent"}`} />
            </div>
          ))}
        </div>

        <section className="rounded-lg border border-[var(--line)] bg-[rgba(13,28,24,0.9)] p-6 shadow-2xl">
          <div className="mb-6 text-sm uppercase tracking-[0.16em] text-[var(--ink-muted)]">
            Section {step + 1}: {steps[step]}
          </div>

          {step === 0 && (
            <div>
              <h2 className="text-3xl font-bold text-white">Let&apos;s get started</h2>
              <p className="mt-2 text-[var(--ink-muted)]">We&apos;ll send your personalised Operational Intelligence Report to this email once you complete the assessment.</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <ContactInput label="First name" value={contact.firstName} onChange={(v) => updateContact("firstName", v)} required />
                <ContactInput label="Last name" value={contact.lastName} onChange={(v) => updateContact("lastName", v)} />
                <ContactInput label="Business email" type="email" value={contact.email} onChange={(v) => updateContact("email", v)} required />
                <ContactInput label="Company name" value={contact.company} onChange={(v) => updateContact("company", v)} required />
                <ContactInput label="Website" value={contact.website} onChange={(v) => updateContact("website", v)} />
                <ContactInput label="LinkedIn URL" value={contact.linkedinUrl} onChange={(v) => updateContact("linkedinUrl", v)} />
                <ContactInput label="Phone" type="tel" value={contact.phone} onChange={(v) => updateContact("phone", v)} />
              </div>
            </div>
          )}

          {step === 1 && (
            <ChoiceGrid
              title="What type of organization are you?"
              options={organizationTypes}
              value={answers.organizationType}
              onSelect={(value) => update("organizationType", value as OrganizationType)}
            />
          )}

          {step === 2 && (
            <ChoiceGrid
              title="What is the main business goal?"
              options={currentGoals}
              value={answers.businessGoal}
              onSelect={(value) => update("businessGoal", value)}
            />
          )}

          {step === 3 && (
            <ChoiceGrid
              title="What is the current scale of your core organization?"
              options={teamSizes}
              value={answers.teamSize}
              onSelect={(value) => update("teamSize", value)}
            />
          )}

          {step === 4 && (
            <div>
              <h2 className="text-3xl font-bold text-white">Which tools are active in the operation?</h2>
              <div className="mt-6 grid gap-5">
                {toolGroups.map((group) => (
                  <div key={group.label}>
                    <div className="mb-3 text-sm font-semibold text-[var(--ink-muted)]">{group.label}</div>
                    <div className="flex flex-wrap gap-2">
                      {group.tools.map((tool) => (
                        <button
                          key={tool}
                          type="button"
                          onClick={() => toggleTool(tool)}
                          className={`rounded-md border px-3 py-2 text-sm transition ${
                            answers.tools.includes(tool)
                              ? "border-[var(--accent)] bg-[rgba(112,228,165,0.14)] text-white"
                              : "border-[var(--line)] bg-white/[0.035] text-[#bdd0c6] hover:border-white/30"
                          }`}
                        >
                          {tool}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-3xl font-bold text-white">Operational drag metrics</h2>
              <div className="mt-6 grid gap-5">
                <Slider label="Data Re-entry" detail="Manual copy-pasting or re-typing across systems" value={answers.dataReentry} onChange={(value) => update("dataReentry", value)} />
                <Slider label="Lead Drop-Off" detail="Inbound inquiries slipping through the cracks" value={answers.leadDropOff} onChange={(value) => update("leadDropOff", value)} />
                <Slider label="Founder Fatigue" detail="Leadership hours spent on administrative work" value={answers.founderFatigue} onChange={(value) => update("founderFatigue", value)} />
                <Slider label="Process Complexity" detail="Difficulty completing a customer workflow end to end" value={answers.processComplexity} onChange={(value) => update("processComplexity", value)} />
                <Slider label="Documentation Maturity" detail="How much process lives in SOPs instead of people's heads" value={answers.documentationMaturity} onChange={(value) => update("documentationMaturity", value)} />
                <Slider label="Founder Dependency" detail="How often leadership must step in to move work forward" value={answers.founderDependency} onChange={(value) => update("founderDependency", value)} />
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              <h2 className="text-3xl font-bold text-white">Financial metrics</h2>
              <div className="mt-6 grid gap-6">
                <Range label="Average Strategic Hourly Value" prefix="$" suffix="/hr" min={25} max={150} step={5} value={answers.hourlyValue} onChange={(value) => update("hourlyValue", value)} />
                <Range label="Monthly Inbound Opportunities" min={0} max={500} step={10} value={answers.monthlyOpportunities} onChange={(value) => update("monthlyOpportunities", value)} />
                <Range label="Average Deal Size / Contract Value" prefix="$" min={100} max={10000} step={100} value={answers.averageDealSize} onChange={(value) => update("averageDealSize", value)} />
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between border-t border-[var(--line)] pt-5">
            <button
              type="button"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="inline-flex h-11 items-center gap-2 rounded-md border border-[var(--line)] px-4 text-sm text-[#c8d8cf] disabled:opacity-40"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!canContinue}
              className="inline-flex h-11 items-center gap-2 rounded-md bg-[var(--accent)] px-5 text-sm font-bold text-[#06100d] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {step === steps.length - 1 ? "See My Results" : "Continue"} <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function ContactInput({
  label,
  type = "text",
  value,
  onChange,
  required = false,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm text-[#c5d6ce]">
        {label}
        {required && <span className="text-[var(--accent)]"> *</span>}
      </span>
      <input
        className="mt-2 h-12 w-full rounded-md border border-[var(--line)] bg-[#07120f] px-3 text-white outline-none focus:border-[var(--accent)]"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </label>
  );
}

function ChoiceGrid({
  title,
  options,
  value,
  onSelect,
}: {
  title: string;
  options: string[];
  value: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white">{title}</h2>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={`rounded-md border p-4 text-left transition ${
              value === option
                ? "border-[var(--accent)] bg-[rgba(112,228,165,0.14)] text-white"
                : "border-[var(--line)] bg-white/[0.035] text-[#c4d4cc] hover:border-white/30"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function Slider({ label, detail, value, onChange }: { label: string; detail: string; value: number; onChange: (value: number) => void }) {
  return <Range label={label} detail={detail} min={1} max={5} value={value} onChange={onChange} />;
}

function Range({
  label,
  detail,
  value,
  min,
  max,
  step = 1,
  prefix = "",
  suffix = "",
  onChange,
}: {
  label: string;
  detail?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block rounded-md border border-[var(--line)] bg-white/[0.03] p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-semibold text-white">{label}</div>
          {detail ? <div className="mt-1 text-sm text-[var(--ink-muted)]">{detail}</div> : null}
        </div>
        <div className="rounded-md bg-white/10 px-3 py-1 text-sm font-bold text-[var(--accent)]">
          {prefix}
          {value}
          {suffix}
        </div>
      </div>
      <input className="mt-4 w-full accent-[#70e4a5]" type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}
