"use client";

export default function ListField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string[];
  onChange: (items: string[]) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium tracking-[0.02em] text-muted">{label} (one per line)</label>
      <textarea
        value={value.join("\n")}
        onChange={(e) => onChange(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
        rows={rows}
        className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-text outline-none focus:border-ice/50"
      />
    </div>
  );
}
