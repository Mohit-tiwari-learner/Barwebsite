import crowd from "@/assets/crowd.jpg";

export function Membership() {
  return (
    <section id="membership" className="relative px-5 md:px-10 py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={crowd} alt="" className="h-full w-full object-cover" loading="lazy" style={{ filter: "brightness(0.35) contrast(1.1)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="font-mono text-[10px] uppercase tracking-cine text-bone/50 mb-6">(04) — Membership</div>
        <h2 className="font-display text-bone leading-[0.85] mb-16" style={{ fontSize: "clamp(4rem, 14vw, 14rem)" }}>
          NOT FOR<br/>EVERYONE<span className="text-crimson">.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { tier: "GUEST", price: "By invitation", lines: ["Standard reservations", "Two guests per visit", "Public programme"] },
            { tier: "MEMBER", price: "$2,400 / yr", lines: ["Priority bookings", "Private tables", "Members-only nights", "Cellar access"] },
            { tier: "CIRCLE", price: "By committee", lines: ["No door, no list", "Private rooms", "Curated travel", "Direct line to the bar"] },
          ].map((t, i) => (
            <div key={t.tier} className="group relative border border-bone/15 p-8 md:p-10 transition-all duration-700 hover:border-crimson hover:bg-ink/40 backdrop-blur-sm">
              <div className="font-mono text-[10px] uppercase tracking-cine text-bone/40 mb-8">N° 0{i + 1}</div>
              <h3 className="font-display text-bone text-5xl md:text-6xl mb-2">{t.tier}</h3>
              <div className="font-mono text-[11px] uppercase tracking-cine text-crimson mb-10">{t.price}</div>
              <ul className="space-y-3 text-sm text-bone/70">
                {t.lines.map((l) => (
                  <li key={l} className="flex gap-3">
                    <span className="text-crimson">—</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
              <a href="#reserve" className="absolute bottom-8 right-8 font-mono text-[11px] uppercase tracking-cine text-bone/60 group-hover:text-bone transition-colors">
                Apply →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
