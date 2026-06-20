import Link from "next/link";
import { currency } from "@/lib/assessment";
import { listAssessments } from "@/lib/supabase-rest";

type SearchParams = Promise<{ password?: string }>;

export default async function AdminPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const unlocked = process.env.ADMIN_PASSWORD ? params.password === process.env.ADMIN_PASSWORD : true;

  if (!unlocked) return <PasswordGate />;

  const leads = await listAssessments();

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Internal</div>
          <h1 className="mt-2 text-4xl font-bold text-white">Lead Dashboard</h1>
        </header>
        <div className="overflow-x-auto rounded-lg border border-[var(--line)] bg-[rgba(13,28,24,0.86)]">
          <table className="w-full min-w-[980px] border-collapse text-left text-sm">
            <thead className="border-b border-[var(--line)] text-[var(--ink-muted)]">
              <tr>
                {["Date", "Name", "Email", "Company", "Type", "Goal", "Scores", "Opportunity", "n8n", "Email"].map((head) => (
                  <th key={head} className="px-4 py-3 font-semibold">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead: Record<string, string | number | null>) => (
                <tr key={String(lead.id)} className="border-b border-[var(--line)] text-[#d6e5dd]">
                  <td className="px-4 py-3">{new Date(String(lead.created_at)).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <Link className="text-[var(--accent)]" href={`/admin/${lead.id}?password=${params.password ?? ""}`}>
                      {lead.first_name} {lead.last_name}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{lead.email}</td>
                  <td className="px-4 py-3">{lead.company}</td>
                  <td className="px-4 py-3">{lead.organization_type}</td>
                  <td className="px-4 py-3">{lead.business_goal}</td>
                  <td className="px-4 py-3">
                    OII {lead.operational_intelligence_index} / OFS {lead.operational_friction_score} / FDI {lead.founder_dependency_index}
                  </td>
                  <td className="px-4 py-3">{currency(Number(lead.opportunity_low))}-{currency(Number(lead.opportunity_high))}</td>
                  <td className="px-4 py-3">{lead.n8n_status}</td>
                  <td className="px-4 py-3">{lead.email_status}</td>
                </tr>
              ))}
              {leads.length === 0 ? (
                <tr>
                  <td className="px-4 py-8 text-center text-[var(--ink-muted)]" colSpan={10}>
                    No leads yet, or Supabase is not configured.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

function PasswordGate() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form className="w-full max-w-sm rounded-lg border border-[var(--line)] bg-[rgba(13,28,24,0.9)] p-6">
        <h1 className="text-2xl font-bold text-white">Admin Access</h1>
        <input className="mt-5 h-12 w-full rounded-md border border-[var(--line)] bg-[#07120f] px-3 text-white" name="password" type="password" placeholder="Password" />
        <button className="mt-4 h-12 w-full rounded-md bg-[var(--accent)] font-bold text-[#06100d]">Enter</button>
      </form>
    </main>
  );
}
