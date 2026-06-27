type ScoreDialProps = {
  label: string;
  value: number;
  highIsGood?: boolean;
};

function scoreLabel(value: number, highIsGood: boolean): { text: string; color: string; bar: string } {
  if (highIsGood) {
    if (value >= 80) return { text: "Optimized", color: "text-[#1a8a50]", bar: "bg-[#1a8a50]" };
    if (value >= 60) return { text: "Moderate", color: "text-[#2fa866]", bar: "bg-[#2fa866]" };
    if (value >= 40) return { text: "Needs Attention", color: "text-[var(--tangerine)]", bar: "bg-[var(--tangerine)]" };
    return { text: "Critical", color: "text-[#c94040]", bar: "bg-[#c94040]" };
  } else {
    if (value > 70) return { text: "Critical", color: "text-[#c94040]", bar: "bg-[#c94040]" };
    if (value > 50) return { text: "Needs Attention", color: "text-[var(--tangerine)]", bar: "bg-[var(--tangerine)]" };
    if (value > 30) return { text: "Moderate", color: "text-[#d4a017]", bar: "bg-[#d4a017]" };
    return { text: "Optimized", color: "text-[#1a8a50]", bar: "bg-[#1a8a50]" };
  }
}

export function ScoreDial({ label, value, highIsGood = true }: ScoreDialProps) {
  const { text, color, bar } = scoreLabel(value, highIsGood);
  return (
    <div className="rounded-xl border border-[var(--line)] bg-white p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink-muted)]">{label}</div>
      <div className={`mt-4 text-5xl font-bold ${color}`}>{value}</div>
      <div className="mt-4 h-2 rounded-full bg-[var(--panel-2)]">
        <div className={`h-2 rounded-full ${bar}`} style={{ width: `${value}%` }} />
      </div>
      <div className={`mt-2 text-xs font-semibold ${color}`}>{text}</div>
    </div>
  );
}
