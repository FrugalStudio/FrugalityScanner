import { currency, type AssessmentAnswers, type ScoreResult } from "./assessment";

const BOOKING_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2_Rp7RRFppwCG3x-cR9AguNsBnlwt84k5EWDaKDTewkmc72flE0i_IH3m0YJVABnEhaakYuAdE";

export function generateFallbackReport(
  answers: AssessmentAnswers,
  scores: ScoreResult,
  contactName?: string,
  companyName?: string,
) {
  const greeting = contactName ? `Hi ${contactName},` : "Hi,";
  const company = companyName ? ` for ${companyName}` : "";

  return [
    "═══════════════════════════════════════════════════════",
    "  FRUGALITY SCANNER — OPERATIONAL INTELLIGENCE REPORT",
    "  Frugal Studio powered by Mindful Tech",
    "═══════════════════════════════════════════════════════",
    "",
    greeting,
    `Here is your complete Frugality Scanner diagnostic report${company}.`,
    "",
    "───────────────────────────────────────────────────────",
    "  RECOMMENDED NEXT STEPS",
    "───────────────────────────────────────────────────────",
    "",
    "Your diagnostic is complete. The next step is to review your highest-value operational bottlenecks and decide which fixes deserve priority.",
    "",
    "▶ Book a Discovery Call with Frugal Studio powered by Mindful Tech:",
    BOOKING_URL,
    "",
    "We will walk through your results, identify the highest-impact automation opportunities, and outline an execution roadmap tailored to your business.",
    "",
    "───────────────────────────────────────────────────────",
    "  YOUR FRUGALITY SCORES",
    "───────────────────────────────────────────────────────",
    "",
    `  Operational Intelligence Index:  ${scores.operationalIntelligenceIndex}/100`,
    `  (${oiiLabel(scores.operationalIntelligenceIndex)})`,
    "",
    `  Operational Friction Score:       ${scores.operationalFrictionScore}/100`,
    `  (${inverseLabel(scores.operationalFrictionScore)})`,
    "",
    `  Founder Dependency Index:         ${scores.founderDependencyIndex}/100`,
    `  (${inverseLabel(scores.founderDependencyIndex)})`,
    "",
    `  Structural Debt Score:            ${scores.structuralDebtScore}/100`,
    "",
    `  Estimated Savings Opportunity:    ${currency(scores.opportunityLow)}–${currency(scores.opportunityHigh)}/month`,
    `  (Diagnostic estimate — not a guarantee)`,
    "",
    "───────────────────────────────────────────────────────",
    "  TOP OPERATIONAL BOTTLENECKS",
    "───────────────────────────────────────────────────────",
    "",
    ...scores.topFindings.map((finding, i) => `  ${i + 1}. ${finding}`),
    "",
    "───────────────────────────────────────────────────────",
    "  FULL DIAGNOSTIC SUMMARY",
    "───────────────────────────────────────────────────────",
    "",
    "Below you will find detailed explanations for each finding.",
    "",
    "OPERATIONAL INTELLIGENCE INDEX",
    `Score: ${scores.operationalIntelligenceIndex}/100 — ${oiiLabel(scores.operationalIntelligenceIndex)}`,
    "This composite index measures how efficiently your business operates across all assessed dimensions. A higher score indicates more streamlined, autonomous operations with less structural drag.",
    "",
    "OPERATIONAL FRICTION SCORE",
    `Score: ${scores.operationalFrictionScore}/100 — ${inverseLabel(scores.operationalFrictionScore)}`,
    "This score reflects manual handoffs, slow response loops, data re-entry, and fragmented process ownership. A lower score is better. Friction above 60 indicates structural improvements are overdue.",
    "",
    "FOUNDER DEPENDENCY INDEX",
    `Score: ${scores.founderDependencyIndex}/100 — ${inverseLabel(scores.founderDependencyIndex)}`,
    "This index measures how much daily execution depends on the founder's presence, approvals, or memory. A score above 60 means the business lacks the systems to operate autonomously — a significant growth ceiling.",
    "",
    "STRUCTURAL DEBT ASSESSMENT",
    `Score: ${scores.structuralDebtScore}/100 — reflecting ${answers.tools.length} active tool(s) across the stack.`,
    "Structural debt accumulates when tools multiply without integration, workflows are undocumented, and process ownership is unclear. Each item adds coordination overhead that compounds over time.",
    "",
    "POTENTIAL SAVINGS OPPORTUNITY",
    `${currency(scores.opportunityLow)}–${currency(scores.opportunityHigh)} per month could potentially be recovered through better process design, targeted automation, and tighter operating cadence.`,
    "This is a diagnostic estimate based on your inputs — not a guaranteed outcome.",
    "",
    "───────────────────────────────────────────────────────",
    "  RECOMMENDED OPERATIONAL FIXES",
    "───────────────────────────────────────────────────────",
    "",
    "  1. Document the current lead-to-delivery workflow and identify every manual handoff.",
    "  2. Define clear response-time ownership for all inbound opportunities.",
    "  3. Consolidate duplicate data capture and establish a single source-of-truth policy.",
    "  4. Automate only after process ownership and exception paths are clearly defined.",
    "",
    "───────────────────────────────────────────────────────",
    "  THE FRUGAL AUDIT — YOUR NEXT STEP",
    "───────────────────────────────────────────────────────",
    "",
    "The Frugal Audit is a 1-day operational intelligence sprint where Frugal Studio and",
    "Mindful Tech review your workflows, software stack, lead flow, manual bottlenecks,",
    "documentation gaps, and founder dependency.",
    "",
    "You receive a clear operational roadmap showing what to simplify, what to automate,",
    "and what to fix first — so you can recover capacity and scale without adding overhead.",
    "",
    "▶ Book your Discovery Call:",
    BOOKING_URL,
    "",
    "───────────────────────────────────────────────────────",
    "Frugal Studio powered by Mindful Tech",
    "felipe@frugalstudio.design",
    "───────────────────────────────────────────────────────",
  ].join("\n");
}

function oiiLabel(score: number) {
  if (score >= 80) return "Optimized";
  if (score >= 60) return "Moderate";
  if (score >= 40) return "Needs Attention";
  return "Critical";
}

function inverseLabel(score: number) {
  if (score > 70) return "Critical";
  if (score > 50) return "Needs Attention";
  if (score > 30) return "Moderate";
  return "Optimized";
}
