import { useEffect, useRef, useState } from "react";
import interior from "@/assets/interior.jpg";
import dj from "@/assets/dj.jpg";
import crowd from "@/assets/crowd.jpg";
import cocktail from "@/assets/cocktail.jpg";

const frames = [
  { src: interior, caption: "22:00 — The room awakens." },
  { src: cocktail, caption: "23:14 — A drink is poured." },
  { src: dj, caption: "01:00 — The needle drops." },
  { src: crowd, caption: "03:42 — Nothing is the same." },
];

export function Cinematic() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const idx = Math.min(frames.length - 1, Math.floor(progress * frames.length));

  return (
    <section ref={ref} className="relative" style={{ height: `${frames.length * 100}vh` }}>
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden vignette">
        {frames.map((f, i) => (
          <img
            key={i}
            src={f.src}
            alt={f.caption}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
            style={{
              opacity: i === idx ? 1 : 0,
              filter: "brightness(0.65) contrast(1.1)",
              transform: `scale(${1 + (progress * 0.05)})`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />

        {/* Timecode */}
        <div className="absolute top-6 md:top-10 left-5 md:left-10 right-5 md:right-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-cine text-bone/70">
          <span>SEQ 04 — One Night.</span>
          <span className="tabular-nums">{String(idx + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}</span>
        </div>

        {/* Caption */}
        <div className="absolute inset-x-0 bottom-0 px-5 md:px-10 pb-16 md:pb-24">
          <div className="font-mono text-[10px] uppercase tracking-cine text-crimson mb-4">Now playing</div>
          <h3 key={idx} className="font-display text-bone leading-[0.85] reveal-mask" style={{ fontSize: "clamp(2.5rem, 8vw, 9rem)" }}>
            <span>{frames[idx].caption}</span>
          </h3>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-bone/15">
          <div className="h-full bg-crimson" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </section>
  );
}
