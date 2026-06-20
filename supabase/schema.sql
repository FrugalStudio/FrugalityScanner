create extension if not exists pgcrypto;

create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text,
  last_name text,
  email text not null,
  phone text,
  linkedin_url text,
  company text,
  website text,
  organization_type text,
  business_goal text,
  team_size text,
  operational_intelligence_index integer,
  operational_friction_score integer,
  founder_dependency_index integer,
  structural_debt_score integer,
  opportunity_low integer,
  opportunity_high integer,
  top_findings jsonb,
  full_report text,
  n8n_status text default 'not_sent',
  email_status text default 'pending'
);

create table if not exists public.assessment_responses (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid references public.assessments(id) on delete cascade,
  question_key text not null,
  answer_value jsonb,
  created_at timestamptz not null default now()
);

create index if not exists assessments_created_at_idx on public.assessments(created_at desc);
create index if not exists assessment_responses_assessment_id_idx on public.assessment_responses(assessment_id);
