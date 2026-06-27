type ScoreDialProps = {
  label: string;
  value: number;
  /** When true (default), high score = good (green). When false, high score = bad (red). */
  highIsGood?: boolean;
};

function scoreLabel(value: number, highIsGood: boolean): { text: string; color: string } {
  if (highIsGood) {
    if (value >= 80) return { text: "Optimized", color: "text-[#5ecb8a]" };
    if (value >= 60) return { text: "Moderate", color: "text-[#a3d9b5]" };
    if (value >= 40) return { text: "Needs Attention", color: "text-[var(--tangerine)]" };
    return { text: "Critical", color: "text-[#ff8e7d]" };
  } else {
    if (value > 70) return { text: "Critical", color: "text-[#ff8e7d]" };
    if (value > 50) return { text: "Needs Attention", color: "text-[var(--tangerine)]" };
    if (value > 30) return { text: "Moderate", color: "text-[#f5c97a]" };
    return { text: "Optimized", color: "text-[#5ecb8a]" };
  }
}

export function ScoreDial({ label, value, highIsGood = true }: ScoreDialProps) {
  const { text, color } = scoreLabel(value, highIsGood);
  const barColor = color
    .replace("text-[", "bg-[")
    .replace("]", "]");

  return (
    <div className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-5">
      <div className="text-xs uppercase tracking-[0.18em] text-[var(--ink-muted)]">{label}</div>
      <div className={`mt-4 text-5xl font-bold ${color}`}>{value}</div>
      <div className="mt-4 h-2 rounded-full bg-white/10">
        <div className={`h-2 rounded-full ${barColor}`} style={{ width: `${value}%` }} />
      </div>
      <div className={`mt-2 text-xs font-semibold ${color}`}>{text}</div>
    </div>
  );
}
