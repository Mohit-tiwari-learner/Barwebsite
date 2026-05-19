export function Footer() {
  return (
    <footer className="relative px-5 md:px-10 pt-24 pb-10 bg-ink overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-bone leading-[0.78]" style={{ fontSize: "clamp(5rem, 22vw, 22rem)" }}>
          NOCTURNE<span className="text-crimson">.</span>
        </h2>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-bone/10 pt-10">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-cine text-bone/40 mb-4">Address</div>
            <p className="text-sm text-bone/70 leading-relaxed">12 Velvet Lane<br/>Brooklyn, NY 11211</p>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-cine text-bone/40 mb-4">Hours</div>
            <p className="text-sm text-bone/70 leading-relaxed">Thu — Sun<br/>22:00 — Late</p>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-cine text-bone/40 mb-4">Contact</div>
            <p className="text-sm text-bone/70 leading-relaxed">host@nocturne.club<br/>+1 (212) 555 0114</p>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-cine text-bone/40 mb-4">Follow</div>
            <ul className="space-y-1 text-sm text-bone/70">
              {["Instagram", "RA", "SoundCloud"].map((s) => (
                <li key={s}><a href="#" className="hover:text-crimson transition-colors">{s} →</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-4 font-mono text-[10px] uppercase tracking-cine text-bone/40">
          <span>© MMXXV NOCTURNE — All rights observed.</span>
          <span>The night is what you make it.</span>
        </div>
      </div>
    </footer>
  );
}
