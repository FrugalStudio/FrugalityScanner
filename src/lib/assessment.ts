export type OrganizationType =
  | "Tech Startup"
  | "Hardware / DeepTech Startup"
  | "Real Estate / Professional Services"
  | "Commercial Firm"
  | "NGO / Non-Profit / Educational"
  | "Other";

export type AssessmentAnswers = {
  organizationType: OrganizationType | "";
  businessGoal: string;
  teamSize: string;
  tools: string[];
  dataReentry: number;
  leadDropOff: number;
  founderFatigue: number;
  processComplexity: number;
  documentationMaturity: number;
  founderDependency: number;
  hourlyValue: number;
  monthlyOpportunities: number;
  averageDealSize: number;
};

export type ScoreResult = {
  operationalIntelligenceIndex: number;
  operationalFrictionScore: number;
  founderDependencyIndex: number;
  structuralDebtScore: number;
  opportunityLow: number;
  opportunityHigh: number;
  topFindings: string[];
};

export const initialAnswers: AssessmentAnswers = {
  organizationType: "",
  businessGoal: "",
  teamSize: "",
  tools: [],
  dataReentry: 3,
  leadDropOff: 3,
  founderFatigue: 3,
  processComplexity: 3,
  documentationMaturity: 3,
  founderDependency: 3,
  hourlyValue: 75,
  monthlyOpportunities: 80,
  averageDealSize: 2500,
};

export const organizationTypes: OrganizationType[] = [
  "Tech Startup",
  "Hardware / DeepTech Startup",
  "Real Estate / Professional Services",
  "Commercial Firm",
  "NGO / Non-Profit / Educational",
  "Other",
];

export const businessGoals: Record<string, string[]> = {
  startup: [
    "Secure funding or grant support",
    "Launch or scale a product",
    "Validate MVP or new feature",
    "Stop founders/developers from doing admin work",
    "Other",
  ],
  commercial: [
    "Stop lead leakage and automate onboarding",
    "Protect operating margins by lowering internal costs",
    "Reclaim executive time from paperwork",
    "Standardize internal team workflows",
    "Other",
  ],
  ngo: [
    "Optimize donor or participant onboarding",
    "Improve internal project coordination",
    "Streamline reporting structures",
    "Other",
  ],
};

export const teamSizes = [
  "Solo / 1 person",
  "Lean Core / 2-5 people",
  "Scaling Team / 6-15 people",
  "Established Operation / 15+ people",
];

export const toolGroups = [
  { label: "Communication", tools: ["WhatsApp", "Slack", "Microsoft Teams"] },
  { label: "Email", tools: ["Gmail", "Outlook"] },
  { label: "CRM", tools: ["HubSpot", "Salesforce", "Pipedrive", "Zoho CRM", "Leadsales", "Kommo", "ManyChat"] },
  { label: "Project Management", tools: ["ClickUp", "Asana", "Monday", "Trello", "Jira", "Linear"] },
  { label: "Data / Documentation", tools: ["Google Sheets", "Excel", "Notion", "Google Drive", "OneDrive"] },
  { label: "Finance", tools: ["Stripe", "PayPal", "QuickBooks"] },
  { label: "Customer Support / Intake", tools: ["Zendesk", "Intercom", "Freshdesk", "Typeform", "Tally", "Google Forms"] },
];

export function goalBucket(type: OrganizationType | "") {
  if (type.includes("Startup")) return "startup";
  if (type.includes("NGO")) return "ngo";
  return "commercial";
}

export function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
