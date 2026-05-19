import { useEffect, useRef } from "react";
import hero from "@/assets/hero.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const y = window.scrollY;
      ref.current.style.transform = `translate3d(0, ${y * 0.3}px, 0) scale(${1 + y * 0.0003})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative h-[100svh] w-full overflow-hidden vignette">
      <div ref={ref} className="absolute inset-0 will-change-transform">
        <img
          src={hero}
          alt="Nocturne club interior, crimson lighting"
          width={1920}
          height={1280}
          className="h-full w-full object-cover"
          style={{ filter: "brightness(0.7) contrast(1.1) saturate(1.1)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, color-mix(in oklab, var(--ink) 40%, transparent) 0%, transparent 30%, color-mix(in oklab, var(--ink) 90%, transparent) 100%)" }} />
      </div>

      {/* Top markers */}
      <div className="absolute top-24 md:top-28 left-5 md:left-10 right-5 md:right-10 z-10 flex items-start justify-between font-mono text-[10px] uppercase tracking-cine text-bone/70">
        <div className="reveal-mask"><span style={{ animationDelay: ".2s" }}>N° 014 — Volume I</span></div>
        <div className="reveal-mask hidden md:block"><span style={{ animationDelay: ".3s" }}>Members &amp; Invited Guests</span></div>
      </div>

      {/* Center title */}
      <div className="relative z-10 flex h-full flex-col justify-end px-5 md:px-10 pb-12 md:pb-16">
        <h1 className="font-display text-bone leading-[0.82]" style={{ fontSize: "clamp(3.8rem, 15vw, 17rem)" }}>
          <span className="block reveal-mask"><span style={{ animationDelay: ".4s" }}>THE NIGHT</span></span>
          <span className="block reveal-mask"><span style={{ animationDelay: ".55s" }}>STARTS <span className="italic font-serif font-light text-crimson">here</span>.</span></span>
        </h1>

        <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p className="max-w-md text-sm md:text-base text-bone/70 leading-relaxed reveal-mask">
            <span style={{ animationDelay: ".8s" }}>
              An after-dark members club where sound becomes atmosphere and every hour is its own short film.
            </span>
          </p>
          <div className="reveal-mask">
            <a href="#reserve" style={{ animationDelay: ".9s" }} className="btn-cine">
              Reserve a Table
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-cine text-bone/50">
        <span>Scroll</span>
        <span className="block h-10 w-px bg-bone/40 animate-pulse" />
      </div>
    </section>
  );
}
