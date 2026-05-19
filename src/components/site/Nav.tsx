import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Nights", "Cocktails", "Rooms", "Membership", "Contact"];

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-700"
        style={{
          backgroundColor: scrolled ? "color-mix(in oklab, var(--ink) 65%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid color-mix(in oklab, var(--bone) 8%, transparent)" : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex items-center justify-between px-5 md:px-10 h-16 md:h-20">
          <a href="#top" className="font-display text-xl md:text-2xl tracking-[0.18em] text-bone">
            NOCTURNE<span className="text-crimson">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="font-mono text-[11px] uppercase tracking-cine text-bone/70 hover:text-bone transition-colors relative group"
              >
                <span>{l}</span>
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-crimson transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href="#reserve" className="hidden md:inline-flex font-mono text-[11px] uppercase tracking-cine text-bone border border-bone/30 px-4 py-2 hover:bg-bone hover:text-ink transition-colors">
              Reserve
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Menu"
            >
              <span className={`block h-px w-6 bg-bone transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`block h-px w-6 bg-bone transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px w-6 bg-bone transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col justify-between p-8 transition-all duration-700"
        style={{
          background: "var(--ink)",
          clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
        }}
      >
        <div className="h-20" />
        <nav className="flex flex-col gap-4">
          {links.map((l, i) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="font-display text-bone leading-none"
              style={{ fontSize: "clamp(3rem, 14vw, 6rem)", transitionDelay: `${i * 60}ms` }}
            >
              {l}.
            </a>
          ))}
        </nav>
        <div className="font-mono text-[10px] tracking-cine uppercase text-bone/50">
          12 Velvet Lane · Open Thu — Sun · 22:00 — Late
        </div>
      </div>
    </>
  );
}
