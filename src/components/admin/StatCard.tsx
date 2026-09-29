export default function StatCard({ label, value, sublabel }: { label: string; value: string; sublabel: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white/60 p-5">
      <p className="eyebrow text-[10px]">{label}</p>
      <p className="mt-3 font-serif text-3xl italic text-text">{value}</p>
      <p className="mt-1 text-xs text-muted">{sublabel}</p>
    </div>
  );
}
