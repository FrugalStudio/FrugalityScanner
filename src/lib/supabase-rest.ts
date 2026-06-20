const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

type SupabaseRecord = Record<string, unknown>;

export function hasSupabaseConfig() {
  return Boolean(supabaseUrl && serviceKey);
}

async function supabaseFetch(path: string, init: RequestInit = {}) {
  if (!supabaseUrl || !serviceKey) {
    throw new Error("Supabase environment variables are not configured.");
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  if (response.status === 204) return null;
  return response.json();
}

export async function insertAssessment(record: SupabaseRecord) {
  const rows = await supabaseFetch("assessments", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(record),
  });
  return Array.isArray(rows) ? rows[0] : rows;
}

export async function insertResponses(rows: SupabaseRecord[]) {
  if (rows.length === 0) return null;
  return supabaseFetch("assessment_responses", {
    method: "POST",
    body: JSON.stringify(rows),
  });
}

export async function listAssessments() {
  if (!hasSupabaseConfig()) return [];
  return supabaseFetch(
    "assessments?select=id,created_at,first_name,last_name,email,company,organization_type,business_goal,operational_intelligence_index,operational_friction_score,founder_dependency_index,opportunity_low,opportunity_high,n8n_status,email_status&order=created_at.desc",
  );
}

export async function getAssessment(id: string) {
  if (!hasSupabaseConfig()) return null;
  const rows = await supabaseFetch(`assessments?select=*&id=eq.${encodeURIComponent(id)}`);
  const responses = await supabaseFetch(
    `assessment_responses?select=question_key,answer_value,created_at&assessment_id=eq.${encodeURIComponent(id)}&order=created_at.asc`,
  );
  return { assessment: Array.isArray(rows) ? rows[0] : null, responses };
}
