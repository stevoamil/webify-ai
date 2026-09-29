export default function PageHeader({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-serif text-3xl italic text-text">{title}</h1>
        <p className="mt-1.5 text-sm text-muted">{description}</p>
      </div>
      {action}
    </div>
  );
}
