export function ScoreDial({ label, value }: { label: string; value: number }) {
  const tone = value >= 70 ? "text-[var(--accent)]" : value >= 45 ? "text-[var(--amber)]" : "text-[#ff8e7d]";

  return (
    <div className="rounded-lg border border-[var(--line)] bg-[rgba(13,28,24,0.78)] p-5">
      <div className="text-xs uppercase tracking-[0.18em] text-[var(--ink-muted)]">{label}</div>
      <div className={`mt-4 text-5xl font-bold ${tone}`}>{value}</div>
      <div className="mt-4 h-2 rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-current" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
