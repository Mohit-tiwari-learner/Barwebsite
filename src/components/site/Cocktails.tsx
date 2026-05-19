import cocktail from "@/assets/cocktail.jpg";

const list = [
  { n: "01", name: "Obsidian", spec: "Mezcal · Black Cardamom · Smoked Honey", price: "24" },
  { n: "02", name: "Velvet Hour", spec: "Cognac · Crème de Cassis · Rose", price: "26" },
  { n: "03", name: "Midnight Mass", spec: "Rye · Amaro · Burnt Orange", price: "22" },
  { n: "04", name: "Crimson Letter", spec: "Tequila · Hibiscus · Aleppo", price: "23" },
  { n: "05", name: "Ember", spec: "Islay Scotch · Maple · Lapsang", price: "28" },
];

export function Cocktails() {
  return (
    <section id="cocktails" className="relative px-5 md:px-10 py-32 md:py-48 bg-ink overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-5 md:sticky md:top-24 self-start">
          <div className="font-mono text-[10px] uppercase tracking-cine text-bone/50 mb-4">(03) — The Bar</div>
          <h2 className="font-display text-bone leading-[0.82] mb-8" style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}>
            DRINKS<br/>BUILT FOR<br/><span className="italic font-serif font-light text-crimson">the night</span>.
          </h2>
          <div className="img-frame relative aspect-[3/4] max-w-sm">
            <img src={cocktail} alt="Signature cocktail" loading="lazy" width={1280} height={1600} className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="md:col-span-7">
          <ul className="divide-y divide-bone/10 border-y border-bone/10">
            {list.map((c) => (
              <li key={c.n} className="group flex items-baseline gap-6 py-8 transition-colors hover:bg-bone/[0.02] cursor-pointer">
                <span className="font-mono text-[10px] uppercase tracking-cine text-bone/40 w-8">{c.n}</span>
                <div className="flex-1">
                  <div className="font-display text-bone leading-none transition-transform duration-500 group-hover:translate-x-1" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
                    {c.name}
                  </div>
                  <div className="mt-2 font-mono text-[11px] uppercase tracking-cine text-bone/50">{c.spec}</div>
                </div>
                <span className="font-display text-bone/80 text-2xl">${c.price}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-md font-serif italic text-bone/60">
            "Every cocktail is composed for a moment, not a menu."
            <span className="block mt-2 font-mono not-italic text-[10px] uppercase tracking-cine text-bone/40">— ELIO RAVEN, Head Bar</span>
          </p>
        </div>
      </div>
    </section>
  );
}
