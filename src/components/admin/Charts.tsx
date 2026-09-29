const BRAND_COLORS = ["#f0579e", "#9b4de0", "#4c8dff", "#ff8a3d", "#2dd4bf", "#a3e635"];

export function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="flex h-48 items-end gap-3">
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex h-40 w-full items-end">
            <div
              className="w-full rounded-t-md bg-ice/80 transition-all"
              style={{ height: `${(d.value / max) * 100}%`, minHeight: d.value > 0 ? 4 : 0 }}
            />
          </div>
          <p className="max-w-[64px] truncate text-center text-[10px] uppercase tracking-wide text-muted" title={d.label}>
            {d.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function DonutChart({ data }: { data: { label: string; value: number }[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  if (total === 0) {
    return (
      <div className="grid h-48 place-items-center text-sm text-dim">
        No data yet
      </div>
    );
  }

  const segments = data.reduce<{ label: string; dash: number; offset: number }[]>((acc, d) => {
    const dash = (d.value / total) * circumference;
    const offset = acc.length > 0 ? acc[acc.length - 1].offset + acc[acc.length - 1].dash : 0;
    acc.push({ label: d.label, dash, offset });
    return acc;
  }, []);

  return (
    <div className="flex h-48 items-center gap-6">
      <svg viewBox="0 0 160 160" className="h-40 w-40 flex-none -rotate-90">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="var(--color-line)" strokeWidth="18" />
        {segments.map((seg, i) => (
          <circle
            key={seg.label}
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={BRAND_COLORS[i % BRAND_COLORS.length]}
            strokeWidth="18"
            strokeDasharray={`${seg.dash} ${circumference - seg.dash}`}
            strokeDashoffset={-seg.offset}
          />
        ))}
      </svg>
      <ul className="space-y-2 text-xs">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center gap-2 text-muted">
            <span className="h-2 w-2 flex-none rounded-full" style={{ background: BRAND_COLORS[i % BRAND_COLORS.length] }} />
            <span className="truncate">{d.label}</span>
            <span className="text-dim">({d.value})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
