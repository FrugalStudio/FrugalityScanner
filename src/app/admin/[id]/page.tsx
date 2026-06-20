import Link from "next/link";
import { currency } from "@/lib/assessment";
import { getAssessment } from "@/lib/supabase-rest";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ password?: string }>;

export default async function LeadDetailPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { id } = await params;
  const query = await searchParams;
  const unlocked = process.env.ADMIN_PASSWORD ? query.password === process.env.ADMIN_PASSWORD : true;

  if (!unlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <Link className="rounded-md bg-[var(--accent)] px-5 py-3 font-bold text-[#06100d]" href="/admin">
          Enter admin password
        </Link>
      </main>
    );
  }

  const data = await getAssessment(id);
  const lead = data?.assessment as Record<string, unknown> | null;

  if (!lead) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 text-white">
        Lead not found, or Supabase is not configured.
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <Link className="text-sm text-[var(--accent)]" href={`/admin?password=${query.password ?? ""}`}>
          Back to dashboard
        </Link>
        <header className="mt-5 rounded-lg border border-[var(--line)] bg-[rgba(13,28,24,0.88)] p-6">
          <h1 className="text-4xl font-bold text-white">{String(lead.company)}</h1>
          <p className="mt-2 text-[#b7c9c0]">
            {String(lead.first_name)} {String(lead.last_name)} - {String(lead.email)}
          </p>
        </header>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Panel title="Contact Info">
            <Field label="Phone" value={lead.phone} />
            <Field label="Website" value={lead.website} />
            <Field label="LinkedIn" value={lead.linkedin_url} />
            <Field label="Organization Type" value={lead.organization_type} />
            <Field label="Business Goal" value={lead.business_goal} />
          </Panel>
          <Panel title="Scores">
            <Field label="Operational Intelligence Index" value={lead.operational_intelligence_index} />
            <Field label="Operational Friction Score" value={lead.operational_friction_score} />
            <Field label="Founder Dependency Index" value={lead.founder_dependency_index} />
            <Field label="Structural Debt Score" value={lead.structural_debt_score} />
            <Field label="Opportunity Estimate" value={`${currency(Number(lead.opportunity_low))}-${currency(Number(lead.opportunity_high))}`} />
          </Panel>
        </div>

        <Panel title="Diagnostic Findings" className="mt-6">
          <ul className="grid gap-3">
            {Array.isArray(lead.top_findings)
              ? lead.top_findings.map((finding) => (
                  <li key={String(finding)} className="rounded-md bg-white/[0.04] p-3 text-[#cfe0d8]">{String(finding)}</li>
                ))
              : null}
          </ul>
        </Panel>

        <Panel title="Responses" className="mt-6">
          <div className="grid gap-2">
            {(data?.responses ?? []).map((response: Record<string, unknown>) => (
              <div key={String(response.question_key)} className="grid gap-2 rounded-md bg-white/[0.04] p-3 md:grid-cols-[220px_1fr]">
                <div className="text-[var(--ink-muted)]">{String(response.question_key)}</div>
                <div className="text-[#dce8e2]">{JSON.stringify(response.answer_value)}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Report" className="mt-6">
          <pre className="whitespace-pre-wrap text-sm leading-7 text-[#dce8e2]">{String(lead.full_report)}</pre>
        </Panel>
      </div>
    </main>
  );
}

function Panel({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-lg border border-[var(--line)] bg-[rgba(13,28,24,0.82)] p-6 ${className}`}>
      <h2 className="mb-4 text-xl font-bold text-white">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, value }: { label: string; value: unknown }) {
  return (
    <div className="mb-3">
      <div className="text-sm text-[var(--ink-muted)]">{label}</div>
      <div className="mt-1 text-[#dce8e2]">{value ? String(value) : "-"}</div>
    </div>
  );
}
