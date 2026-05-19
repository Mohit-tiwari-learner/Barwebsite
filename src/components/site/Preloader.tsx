import { useEffect, useState } from "react";

export function Preloader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const dur = 2200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setCount(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[300] flex flex-col justify-between p-6 md:p-10 transition-transform duration-[1200ms]"
      style={{
        background: "var(--ink)",
        transform: done ? "translateY(-100%)" : "translateY(0)",
        transitionTimingFunction: "cubic-bezier(.8,0,.15,1)",
        pointerEvents: done ? "none" : "auto",
      }}
    >
      <div className="flex items-center justify-between font-mono text-[10px] tracking-cine uppercase text-bone/60">
        <span>NOCTURNE / 02:14 AM</span>
        <span>EST. MMXXV</span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <h1
          className="font-display leading-[0.82] text-bone"
          style={{ fontSize: "clamp(4rem, 18vw, 18rem)" }}
        >
          AFTER<br/>DARK.
        </h1>
        <div className="hidden md:flex flex-col items-end gap-2">
          <div className="font-mono text-xs tracking-cine text-bone/60">LOADING ATMOSPHERE</div>
          <div className="font-display text-bone tabular-nums" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            {String(count).padStart(3, "0")}
          </div>
        </div>
      </div>

      <div className="relative h-px w-full bg-bone/15 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-crimson"
          style={{ width: `${count}%`, transition: "width 80ms linear" }}
        />
      </div>
    </div>
  );
}
