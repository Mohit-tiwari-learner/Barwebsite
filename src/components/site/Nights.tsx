import { useEffect, useRef } from "react";
import dj from "@/assets/dj.jpg";
import crowd from "@/assets/crowd.jpg";
import portrait from "@/assets/portrait.jpg";
import interior from "@/assets/interior.jpg";

const nights = [
  { date: "FRI 14 NOV", name: "BLACK ROOM", artist: "ARCA b2b SHYGIRL", tag: "Underground / Industrial", img: dj },
  { date: "SAT 15 NOV", name: "VELVET HOUR", artist: "HONEY DIJON", tag: "Disco / Soul / House", img: crowd },
  { date: "THU 20 NOV", name: "AFTER DARK XI", artist: "PEGGY GOU", tag: "Resident Showcase", img: portrait },
  { date: "SAT 22 NOV", name: "MIDNIGHT MASS", artist: "FRED AGAIN..", tag: "Closed Door / Members Only", img: interior },
];

export function Nights() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("is-in");
      });
    }, { threshold: 0.15 });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="nights" className="relative px-5 md:px-10 py-32 md:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-cine text-bone/50 mb-4">(02) — Programme</div>
            <h2 className="font-display text-bone leading-[0.85]" style={{ fontSize: "clamp(3.5rem, 12vw, 12rem)" }}>
              NIGHTS<span className="text-crimson">.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-bone/60">
            Four nights a week. Each one a closed loop of sound, light, and consequence. Tables open thirty days out.
          </p>
        </div>

        <div className="divide-y divide-bone/10 border-y border-bone/10">
          {nights.map((n, i) => (
            <div
              key={n.name}
              ref={(el) => { refs.current[i] = el; }}
              className="group relative grid grid-cols-12 items-center gap-4 py-8 md:py-10 cursor-pointer overflow-hidden transition-colors hover:bg-bone/[0.02]"
            >
              <div className="col-span-12 md:col-span-2 font-mono text-xs uppercase tracking-cine text-bone/60">
                {n.date}
              </div>
              <h3 className="col-span-8 md:col-span-5 font-display text-bone leading-none transition-transform duration-700 group-hover:translate-x-2" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
                {n.name}
              </h3>
              <div className="col-span-4 md:col-span-3 text-right md:text-left">
                <div className="font-mono text-[11px] uppercase tracking-cine text-bone">{n.artist}</div>
                <div className="font-mono text-[10px] uppercase tracking-cine text-bone/40 mt-1">{n.tag}</div>
              </div>
              <div className="col-span-12 md:col-span-2 flex justify-end">
                <span className="font-mono text-[11px] uppercase tracking-cine text-bone/60 border-b border-bone/30 pb-1 transition-all group-hover:text-crimson group-hover:border-crimson">
                  Reserve →
                </span>
              </div>

              {/* Hover preview */}
              <div className="pointer-events-none absolute right-[20%] top-1/2 -translate-y-1/2 h-44 w-32 md:h-56 md:w-40 overflow-hidden opacity-0 scale-95 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 z-10">
                <img src={n.img} alt="" className="h-full w-full object-cover" loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
