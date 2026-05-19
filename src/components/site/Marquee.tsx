export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-bone/10 py-6 md:py-8 bg-ink">
      <div className="flex gap-12 whitespace-nowrap animate-marquee">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-bone/90" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            {t}
            <span className="text-crimson">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
