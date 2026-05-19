import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import * as THREE from "three";
function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    let raf = 0;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}
function Cursor() {
  const ref = useRef(null);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let cx = x, cy = y;
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    let raf = 0;
    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      if (ref.current) ref.current.style.transform = `translate3d(${cx - 12}px, ${cy - 12}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  if (!enabled) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "aria-hidden": true,
      className: "pointer-events-none fixed left-0 top-0 z-[200] size-6 rounded-full mix-blend-difference",
      style: { background: "var(--bone)" }
    }
  );
}
function Preloader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 2200;
    let raf = 0;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      setCount(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "fixed inset-0 z-[300] flex flex-col justify-between p-6 md:p-10 transition-transform duration-[1200ms]",
      style: {
        background: "var(--ink)",
        transform: done ? "translateY(-100%)" : "translateY(0)",
        transitionTimingFunction: "cubic-bezier(.8,0,.15,1)",
        pointerEvents: done ? "none" : "auto"
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between font-mono text-[10px] tracking-cine uppercase text-bone/60", children: [
          /* @__PURE__ */ jsx("span", { children: "NOCTURNE / 02:14 AM" }),
          /* @__PURE__ */ jsx("span", { children: "EST. MMXXV" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between gap-6", children: [
          /* @__PURE__ */ jsxs(
            "h1",
            {
              className: "font-display leading-[0.82] text-bone",
              style: { fontSize: "clamp(4rem, 18vw, 18rem)" },
              children: [
                "AFTER",
                /* @__PURE__ */ jsx("br", {}),
                "DARK."
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "hidden md:flex flex-col items-end gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "font-mono text-xs tracking-cine text-bone/60", children: "LOADING ATMOSPHERE" }),
            /* @__PURE__ */ jsx("div", { className: "font-display text-bone tabular-nums", style: { fontSize: "clamp(2rem, 5vw, 4rem)" }, children: String(count).padStart(3, "0") })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "relative h-px w-full bg-bone/15 overflow-hidden", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-y-0 left-0 bg-crimson",
            style: { width: `${count}%`, transition: "width 80ms linear" }
          }
        ) })
      ]
    }
  );
}
class SoundManager {
  ctx = null;
  isMuted = true;
  // default to muted due to browser Autoplay policies, user unmutes it
  constructor() {
  }
  getContext() {
    if (this.ctx) return this.ctx;
    if (typeof window === "undefined") return null;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    try {
      this.ctx = new AudioContextClass();
    } catch (e) {
      console.warn("Web Audio API is not supported or was blocked.", e);
    }
    return this.ctx;
  }
  mute() {
    this.isMuted = true;
    if (this.ctx && this.ctx.state === "running") {
      this.ctx.suspend();
    }
  }
  unmute() {
    this.isMuted = false;
    const ctx = this.getContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch((err) => console.error("Unmute error:", err));
    }
    this.playSoftChime();
  }
  toggleMute() {
    if (this.isMuted) {
      this.unmute();
    } else {
      this.mute();
    }
    return this.isMuted;
  }
  getMuteState() {
    return this.isMuted;
  }
  playSoftHover() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {
      });
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.035);
    gain.gain.setValueAtTime(8e-3, now);
    gain.gain.exponentialRampToValueAtTime(1e-4, now + 0.035);
    osc.start(now);
    osc.stop(now + 0.04);
  }
  playSoftClick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {
      });
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.065);
    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(1e-4, now + 0.065);
    osc.start(now);
    osc.stop(now + 0.07);
  }
  playSoftChime() {
    const ctx = this.getContext();
    if (!ctx) return;
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {
      });
    }
    const chord = [261.63, 329.63, 392, 493.88];
    const now = ctx.currentTime;
    chord.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + index * 0.08);
      gain.gain.setValueAtTime(1e-4, now + index * 0.08);
      gain.gain.linearRampToValueAtTime(8e-3, now + index * 0.08 + 0.08);
      gain.gain.exponentialRampToValueAtTime(1e-4, now + index * 0.08 + 0.5);
      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 0.55);
    });
  }
}
const soundManager = new SoundManager();
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = ["Nights", "Cocktails", "Rooms", "Membership", "Contact"];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "header",
      {
        className: "fixed inset-x-0 top-0 z-50 transition-all duration-700",
        style: {
          backgroundColor: scrolled ? "color-mix(in oklab, var(--ink) 65%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid color-mix(in oklab, var(--bone) 8%, transparent)" : "1px solid transparent"
        },
        children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex items-center justify-between px-5 md:px-10 h-16 md:h-20", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "#top",
              onMouseEnter: () => soundManager.playSoftHover(),
              onClick: () => soundManager.playSoftClick(),
              className: "font-display text-xl md:text-2xl tracking-[0.18em] text-bone",
              children: [
                "NOCTURNE",
                /* @__PURE__ */ jsx("span", { className: "text-crimson", children: "." })
              ]
            }
          ),
          /* @__PURE__ */ jsx("nav", { className: "hidden md:flex items-center gap-10", children: links.map((l) => /* @__PURE__ */ jsxs(
            "a",
            {
              href: `#${l.toLowerCase()}`,
              onMouseEnter: () => soundManager.playSoftHover(),
              onClick: () => soundManager.playSoftClick(),
              className: "font-mono text-[11px] uppercase tracking-cine text-bone/70 hover:text-bone transition-colors relative group",
              children: [
                /* @__PURE__ */ jsx("span", { children: l }),
                /* @__PURE__ */ jsx("span", { className: "absolute -bottom-1 left-0 h-px w-0 bg-crimson transition-all duration-500 group-hover:w-full" })
              ]
            },
            l
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  const muted = soundManager.toggleMute();
                  setIsMuted(muted);
                },
                onMouseEnter: () => soundManager.playSoftHover(),
                className: "flex items-center gap-2 font-mono text-[11px] uppercase tracking-cine text-bone/70 hover:text-bone transition-colors px-2 py-2 cursor-pointer",
                title: isMuted ? "Unmute sounds" : "Mute sounds",
                children: [
                  /* @__PURE__ */ jsx("span", { children: "Sound" }),
                  /* @__PURE__ */ jsx("span", { className: "flex items-end gap-[2px] h-[10.5px] w-[14px]", children: isMuted ? (
                    // Slanted mute line
                    /* @__PURE__ */ jsx("span", { className: "h-[1.5px] w-3.5 bg-bone/45 rotate-12 relative -top-[4px]" })
                  ) : (
                    // Beautiful CSS animated visualizer bars
                    /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx("span", { className: "block w-[2px] bg-crimson animate-sound-bar-1" }),
                      /* @__PURE__ */ jsx("span", { className: "block w-[2px] bg-crimson animate-sound-bar-2" }),
                      /* @__PURE__ */ jsx("span", { className: "block w-[2px] bg-crimson animate-sound-bar-3" })
                    ] })
                  ) })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "#reserve",
                onMouseEnter: () => soundManager.playSoftHover(),
                onClick: () => soundManager.playSoftClick(),
                className: "hidden md:inline-flex font-mono text-[11px] uppercase tracking-cine text-bone border border-bone/30 px-4 py-2 hover:bg-bone hover:text-ink transition-colors",
                children: "Reserve"
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  soundManager.playSoftClick();
                  setOpen((v) => !v);
                },
                onMouseEnter: () => soundManager.playSoftHover(),
                className: "md:hidden flex flex-col gap-1.5 p-2",
                "aria-label": "Menu",
                children: [
                  /* @__PURE__ */ jsx("span", { className: `block h-px w-6 bg-bone transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}` }),
                  /* @__PURE__ */ jsx("span", { className: `block h-px w-6 bg-bone transition-opacity ${open ? "opacity-0" : ""}` }),
                  /* @__PURE__ */ jsx("span", { className: `block h-px w-6 bg-bone transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}` })
                ]
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "fixed inset-0 z-40 md:hidden flex flex-col justify-between p-8 transition-all duration-700",
        style: {
          background: "var(--ink)",
          clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)"
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "h-20" }),
          /* @__PURE__ */ jsx("nav", { className: "flex flex-col gap-4", children: links.map((l, i) => /* @__PURE__ */ jsxs(
            "a",
            {
              href: `#${l.toLowerCase()}`,
              onMouseEnter: () => soundManager.playSoftHover(),
              onClick: () => {
                soundManager.playSoftClick();
                setOpen(false);
              },
              className: "font-display text-bone leading-none hover:text-crimson transition-colors",
              style: { fontSize: "clamp(3rem, 14vw, 6rem)", transitionDelay: `${i * 60}ms` },
              children: [
                l,
                "."
              ]
            },
            l
          )) }),
          /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] tracking-cine uppercase text-bone/50", children: "12 Velvet Lane · Open Thu — Sun · 22:00 — Late" })
        ]
      }
    )
  ] });
}
const hero = "/assets/hero-O5NvL_cH.jpg";
function Hero() {
  const ref = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const y = window.scrollY;
      ref.current.style.transform = `translate3d(0, ${y * 0.3}px, 0) scale(${1 + y * 3e-4})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxs("section", { id: "top", className: "relative h-[100svh] w-full overflow-hidden vignette", children: [
    /* @__PURE__ */ jsxs("div", { ref, className: "absolute inset-0 will-change-transform", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: hero,
          alt: "Nocturne club interior, crimson lighting",
          width: 1920,
          height: 1280,
          className: "h-full w-full object-cover",
          style: { filter: "brightness(0.7) contrast(1.1) saturate(1.1)" }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: { background: "linear-gradient(180deg, color-mix(in oklab, var(--ink) 40%, transparent) 0%, transparent 30%, color-mix(in oklab, var(--ink) 90%, transparent) 100%)" } })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "absolute top-24 md:top-28 left-5 md:left-10 right-5 md:right-10 z-10 flex items-start justify-between font-mono text-[10px] uppercase tracking-cine text-bone/70", children: [
      /* @__PURE__ */ jsx("div", { className: "reveal-mask", children: /* @__PURE__ */ jsx("span", { style: { animationDelay: ".2s" }, children: "N° 014 — Volume I" }) }),
      /* @__PURE__ */ jsx("div", { className: "reveal-mask hidden md:block", children: /* @__PURE__ */ jsx("span", { style: { animationDelay: ".3s" }, children: "Members & Invited Guests" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex h-full flex-col justify-end px-5 md:px-10 pb-12 md:pb-16", children: [
      /* @__PURE__ */ jsxs("h1", { className: "font-display text-bone leading-[0.82]", style: { fontSize: "clamp(3.8rem, 15vw, 17rem)" }, children: [
        /* @__PURE__ */ jsx("span", { className: "block reveal-mask", children: /* @__PURE__ */ jsx("span", { style: { animationDelay: ".4s" }, children: "THE NIGHT" }) }),
        /* @__PURE__ */ jsx("span", { className: "block reveal-mask", children: /* @__PURE__ */ jsxs("span", { style: { animationDelay: ".55s" }, children: [
          "STARTS ",
          /* @__PURE__ */ jsx("span", { className: "italic font-serif font-light text-crimson", children: "here" }),
          "."
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8", children: [
        /* @__PURE__ */ jsx("p", { className: "max-w-md text-sm md:text-base text-bone/70 leading-relaxed reveal-mask", children: /* @__PURE__ */ jsx("span", { style: { animationDelay: ".8s" }, children: "An after-dark members club where sound becomes atmosphere and every hour is its own short film." }) }),
        /* @__PURE__ */ jsx("div", { className: "reveal-mask", children: /* @__PURE__ */ jsxs("a", { href: "#reserve", style: { animationDelay: ".9s" }, className: "btn-cine", children: [
          "Reserve a Table",
          /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "→" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-cine text-bone/50", children: [
      /* @__PURE__ */ jsx("span", { children: "Scroll" }),
      /* @__PURE__ */ jsx("span", { className: "block h-10 w-px bg-bone/40 animate-pulse" })
    ] })
  ] });
}
function Marquee({ items }) {
  const row = [...items, ...items];
  return /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden border-y border-bone/10 py-6 md:py-8 bg-ink", children: /* @__PURE__ */ jsx("div", { className: "flex gap-12 whitespace-nowrap animate-marquee", children: row.map((t, i) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-12 font-display text-bone/90", style: { fontSize: "clamp(2.5rem, 6vw, 5rem)" }, children: [
    t,
    /* @__PURE__ */ jsx("span", { className: "text-crimson", children: "●" })
  ] }, i)) }) });
}
const ezgifFrame001 = "/assets/ezgif-frame-001-Ce6Klu4l.jpg";
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame001
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame002 = "/assets/ezgif-frame-002-DorSiTTp.jpg";
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame002
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame003 = "/assets/ezgif-frame-003-DyVl1gVT.jpg";
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame003
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame004 = "/assets/ezgif-frame-004-W9V6jkAc.jpg";
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame004
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame005 = "/assets/ezgif-frame-005-BgGvI_8F.jpg";
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame005
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame006 = "/assets/ezgif-frame-006-DGsAvgkm.jpg";
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame006
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame007 = "/assets/ezgif-frame-007-CJtPYhi6.jpg";
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame007
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame008 = "/assets/ezgif-frame-008-u45B8w98.jpg";
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame008
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame009 = "/assets/ezgif-frame-009-8lAJ5aN9.jpg";
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame009
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame010 = "/assets/ezgif-frame-010-Bwv9X-dZ.jpg";
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame010
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame011 = "/assets/ezgif-frame-011-CBiAEhiM.jpg";
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame011
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame012 = "/assets/ezgif-frame-012-BLJTcE9P.jpg";
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame012
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame013 = "/assets/ezgif-frame-013-C_zyXfZG.jpg";
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame013
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame014 = "/assets/ezgif-frame-014-DDyQYjyc.jpg";
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame014
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame015 = "/assets/ezgif-frame-015-DhmF0CHw.jpg";
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame015
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame016 = "/assets/ezgif-frame-016-DX8fw_m4.jpg";
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame016
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame017 = "/assets/ezgif-frame-017-CC1j0o1o.jpg";
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame017
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame018 = "/assets/ezgif-frame-018-Ll0YVw-r.jpg";
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame018
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame019 = "/assets/ezgif-frame-019-1VbRmxSH.jpg";
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame019
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame020 = "/assets/ezgif-frame-020-BaEhOR-D.jpg";
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame020
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame021 = "/assets/ezgif-frame-021-GsJUJFbH.jpg";
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame021
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame022 = "/assets/ezgif-frame-022-D7mGM6TG.jpg";
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame022
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame023 = "/assets/ezgif-frame-023-C6uyK40O.jpg";
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame023
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame024 = "/assets/ezgif-frame-024-BIOiYjhA.jpg";
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame024
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame025 = "/assets/ezgif-frame-025-FraoVdx8.jpg";
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame025
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame026 = "/assets/ezgif-frame-026-DCfZmhhL.jpg";
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame026
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame027 = "/assets/ezgif-frame-027-CryU5Xgq.jpg";
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame027
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame028 = "/assets/ezgif-frame-028-Bu6NoMcA.jpg";
const __vite_glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame028
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame029 = "/assets/ezgif-frame-029-BO_u96pn.jpg";
const __vite_glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame029
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame030 = "/assets/ezgif-frame-030-CcZ2B725.jpg";
const __vite_glob_0_29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame030
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame031 = "/assets/ezgif-frame-031-DoEujU8u.jpg";
const __vite_glob_0_30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame031
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame032 = "/assets/ezgif-frame-032-D_nl4-1k.jpg";
const __vite_glob_0_31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame032
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame033 = "/assets/ezgif-frame-033-CLSsgPxN.jpg";
const __vite_glob_0_32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame033
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame034 = "/assets/ezgif-frame-034-CisvjjX2.jpg";
const __vite_glob_0_33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame034
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame035 = "/assets/ezgif-frame-035-DCqy0r-X.jpg";
const __vite_glob_0_34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame035
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame036 = "/assets/ezgif-frame-036-BzUn2c9U.jpg";
const __vite_glob_0_35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame036
}, Symbol.toStringTag, { value: "Module" }));
const ezgifFrame037 = "/assets/ezgif-frame-037-loAsD2L8.jpg";
const __vite_glob_0_36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ezgifFrame037
}, Symbol.toStringTag, { value: "Module" }));
const wineImg = "/assets/ezgif-frame-038-mlM38n31.jpg";
const __vite_glob_0_37 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wineImg
}, Symbol.toStringTag, { value: "Module" }));
const VERT = (
  /* glsl */
  `
  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  uniform float uPixelRatio;
  uniform float uSize;

  attribute vec3 aTarget;     // assembled (image)
  attribute vec3 aScatter;    // dispersed sphere
  attribute vec3 aColor;
  attribute float aSeed;
  attribute float aBrightness;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vBrightness;

  void main() {
    // particles stay locked to the image shape; only subtle life + mouse push
    vec3 pos = aTarget;

    float t = uTime * 0.35 + aSeed * 6.2831;
    vec3 noise = vec3(
      sin(t * 1.1 + aSeed * 3.0),
      cos(t * 0.9 + aSeed * 5.0),
      sin(t * 1.3 + aSeed * 7.0)
    ) * 0.0025;
    pos += noise;

    vec2 toMouse = pos.xy - uMouse;
    float d = length(toMouse);
    float push = exp(-d * d * 8.0) * uMouseStrength;
    pos.xy += normalize(toMouse + 0.0001) * push * 0.18;
    pos.z += push * 0.08;

    // suppress reference to aScatter so attribute stays alive but unused
    pos += aScatter * 0.0 + uProgress * 0.0;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float size = uSize * (0.6 + aBrightness * 1.4);
    gl_PointSize = size * uPixelRatio * (1.0 / -mv.z);

    vColor = aColor;
    vBrightness = aBrightness;
    vAlpha = 1.0;
  }
`
);
const FRAG = (
  /* glsl */
  `
  precision highp float;
  uniform float uReveal;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vBrightness;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    float core = smoothstep(0.5, 0.0, d);
    float glow = pow(core, 2.2);

    vec3 col = vColor * (0.7 + vBrightness * 1.6);
    col += vColor * glow * 0.8;

    float a = glow * vAlpha * uReveal * (0.55 + vBrightness * 0.6);
    gl_FragColor = vec4(col, a);
  }
`
);
function WineParticles({ active }) {
  const mountRef = useRef(null);
  const stateRef = useRef({ active: false, reveal: 0, progress: 0 });
  useEffect(() => {
    stateRef.current.active = active;
  }, [active]);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 3.2);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0, 0);
    mount.appendChild(renderer.domElement);
    const uniforms = {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uReveal: { value: 0 },
      uMouse: { value: new THREE.Vector2(10, 10) },
      uMouseStrength: { value: 0 },
      uPixelRatio: { value: renderer.getPixelRatio() },
      uSize: { value: 0.9 }
    };
    let points = null;
    let disposed = false;
    const buildParticles = (img2) => {
      const targetW = 1100;
      const ratio = img2.height / img2.width;
      const w = targetW;
      const h = Math.round(targetW * ratio);
      const cnv = document.createElement("canvas");
      cnv.width = w;
      cnv.height = h;
      const ctx = cnv.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img2, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;
      const targets = [];
      const scatters = [];
      const colors = [];
      const seeds = [];
      const brights = [];
      const worldW = 3.4 * 1.2;
      const worldH = worldW * ratio;
      for (let y = 0; y < h; y += 1) {
        for (let x = 0; x < w; x += 1) {
          const i = (y * w + x) * 4;
          const r = data[i] / 255;
          const g = data[i + 1] / 255;
          const b = data[i + 2] / 255;
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          if (lum < 0.03) continue;
          const extra = lum > 0.5 ? 2 : lum > 0.25 ? 1 : 0;
          const reps = 1 + extra;
          for (let k = 0; k < reps; k++) {
            const jx = (Math.random() - 0.5) * 0.9;
            const jy = (Math.random() - 0.5) * 0.9;
            const wx = ((x + jx) / w - 0.5) * worldW;
            const wy = -((y + jy) / h - 0.5) * worldH;
            const wz = (Math.random() - 0.5) * 0.02;
            targets.push(wx, wy, wz);
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const rad = 2 + Math.random() * 1.8;
            scatters.push(
              Math.sin(phi) * Math.cos(theta) * rad,
              Math.sin(phi) * Math.sin(theta) * rad,
              Math.cos(phi) * rad - 0.5
            );
            colors.push(r, g, b);
            seeds.push(Math.random());
            brights.push(Math.min(1, lum * 1.25));
          }
        }
      }
      const count = seeds.length;
      const geo = new THREE.BufferGeometry();
      geo.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(targets), 3)
      );
      geo.setAttribute(
        "aTarget",
        new THREE.BufferAttribute(new Float32Array(targets), 3)
      );
      geo.setAttribute(
        "aScatter",
        new THREE.BufferAttribute(new Float32Array(scatters), 3)
      );
      geo.setAttribute(
        "aColor",
        new THREE.BufferAttribute(new Float32Array(colors), 3)
      );
      geo.setAttribute(
        "aSeed",
        new THREE.BufferAttribute(new Float32Array(seeds), 1)
      );
      geo.setAttribute(
        "aBrightness",
        new THREE.BufferAttribute(new Float32Array(brights), 1)
      );
      const mat = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      points = new THREE.Points(geo, mat);
      scene.add(points);
      console.log(`[WineParticles] ${count.toLocaleString()} particles`);
    };
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = wineImg;
    img.onload = () => {
      if (!disposed) buildParticles(img);
    };
    const mouseWorld = new THREE.Vector2(10, 10);
    const targetMouse = new THREE.Vector2(10, 10);
    const handleMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height * 2 - 1);
      const vFov = camera.fov * Math.PI / 180;
      const hh = 2 * Math.tan(vFov / 2) * camera.position.z;
      const ww = hh * camera.aspect;
      targetMouse.set(nx * (ww / 2), ny * (hh / 2));
      uniforms.uMouseStrength.value = 1;
    };
    const handleLeave = () => {
      uniforms.uMouseStrength.value = 0;
      targetMouse.set(10, 10);
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);
    const onResize = () => {
      const W = mount.clientWidth;
      const H = mount.clientHeight;
      renderer.setSize(W, H);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);
    let lastTime = performance.now();
    let elapsedTime = 0;
    let raf = 0;
    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1e3, 0.05);
      lastTime = now;
      elapsedTime += dt;
      const t = elapsedTime;
      uniforms.uTime.value = t;
      const s = stateRef.current;
      const targetReveal = s.active ? 1 : 0;
      const targetProgress = s.active ? 1 : 0;
      s.reveal += (targetReveal - s.reveal) * Math.min(1, dt * 6);
      s.progress += (targetProgress - s.progress) * Math.min(1, dt * 1.6);
      uniforms.uReveal.value = s.reveal;
      uniforms.uProgress.value = s.progress;
      mouseWorld.lerp(targetMouse, 0.15);
      uniforms.uMouse.value.copy(mouseWorld);
      camera.position.x = Math.sin(t * 0.15) * 0.05;
      camera.position.y = Math.cos(t * 0.12) * 0.03;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
      if (points) {
        points.geometry.dispose();
        points.material.dispose();
        scene.remove(points);
      }
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);
  return /* @__PURE__ */ jsx("div", { ref: mountRef, className: "absolute inset-0" });
}
const frameModules = /* @__PURE__ */ Object.assign({ "../../assets/wine-glass/ezgif-frame-001.jpg": __vite_glob_0_0, "../../assets/wine-glass/ezgif-frame-002.jpg": __vite_glob_0_1, "../../assets/wine-glass/ezgif-frame-003.jpg": __vite_glob_0_2, "../../assets/wine-glass/ezgif-frame-004.jpg": __vite_glob_0_3, "../../assets/wine-glass/ezgif-frame-005.jpg": __vite_glob_0_4, "../../assets/wine-glass/ezgif-frame-006.jpg": __vite_glob_0_5, "../../assets/wine-glass/ezgif-frame-007.jpg": __vite_glob_0_6, "../../assets/wine-glass/ezgif-frame-008.jpg": __vite_glob_0_7, "../../assets/wine-glass/ezgif-frame-009.jpg": __vite_glob_0_8, "../../assets/wine-glass/ezgif-frame-010.jpg": __vite_glob_0_9, "../../assets/wine-glass/ezgif-frame-011.jpg": __vite_glob_0_10, "../../assets/wine-glass/ezgif-frame-012.jpg": __vite_glob_0_11, "../../assets/wine-glass/ezgif-frame-013.jpg": __vite_glob_0_12, "../../assets/wine-glass/ezgif-frame-014.jpg": __vite_glob_0_13, "../../assets/wine-glass/ezgif-frame-015.jpg": __vite_glob_0_14, "../../assets/wine-glass/ezgif-frame-016.jpg": __vite_glob_0_15, "../../assets/wine-glass/ezgif-frame-017.jpg": __vite_glob_0_16, "../../assets/wine-glass/ezgif-frame-018.jpg": __vite_glob_0_17, "../../assets/wine-glass/ezgif-frame-019.jpg": __vite_glob_0_18, "../../assets/wine-glass/ezgif-frame-020.jpg": __vite_glob_0_19, "../../assets/wine-glass/ezgif-frame-021.jpg": __vite_glob_0_20, "../../assets/wine-glass/ezgif-frame-022.jpg": __vite_glob_0_21, "../../assets/wine-glass/ezgif-frame-023.jpg": __vite_glob_0_22, "../../assets/wine-glass/ezgif-frame-024.jpg": __vite_glob_0_23, "../../assets/wine-glass/ezgif-frame-025.jpg": __vite_glob_0_24, "../../assets/wine-glass/ezgif-frame-026.jpg": __vite_glob_0_25, "../../assets/wine-glass/ezgif-frame-027.jpg": __vite_glob_0_26, "../../assets/wine-glass/ezgif-frame-028.jpg": __vite_glob_0_27, "../../assets/wine-glass/ezgif-frame-029.jpg": __vite_glob_0_28, "../../assets/wine-glass/ezgif-frame-030.jpg": __vite_glob_0_29, "../../assets/wine-glass/ezgif-frame-031.jpg": __vite_glob_0_30, "../../assets/wine-glass/ezgif-frame-032.jpg": __vite_glob_0_31, "../../assets/wine-glass/ezgif-frame-033.jpg": __vite_glob_0_32, "../../assets/wine-glass/ezgif-frame-034.jpg": __vite_glob_0_33, "../../assets/wine-glass/ezgif-frame-035.jpg": __vite_glob_0_34, "../../assets/wine-glass/ezgif-frame-036.jpg": __vite_glob_0_35, "../../assets/wine-glass/ezgif-frame-037.jpg": __vite_glob_0_36, "../../assets/wine-glass/ezgif-frame-038.jpg": __vite_glob_0_37 });
const frames$1 = Object.keys(frameModules).sort().map((path) => frameModules[path].default);
function ScrollSplitText({ text, startProgress, endProgress, scrollProgress, isDimmed }) {
  const words = text.split(" ");
  let globalCharIndex = 0;
  const totalChars = text.length;
  const range = endProgress - startProgress;
  return /* @__PURE__ */ jsx(Fragment, { children: words.map((word, wordIdx) => {
    const wordChars = word.split("");
    return /* @__PURE__ */ jsxs("span", { className: "inline-block whitespace-nowrap", children: [
      wordChars.map((char, charIdx) => {
        const charStart = startProgress + globalCharIndex / totalChars * range;
        globalCharIndex++;
        const charDuration = 0.05;
        const progress = Math.min(Math.max((scrollProgress - charStart) / charDuration, 0), 1);
        const eased = progress * progress * (3 - 2 * progress);
        return /* @__PURE__ */ jsx(
          "span",
          {
            className: "inline-block origin-bottom",
            style: {
              opacity: isDimmed ? Math.max(eased * 0.4, 0.1) : Math.max(eased, 0.15),
              transform: `translate3d(0, ${(1 - eased) * 6}px, 0)`,
              transition: "transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)"
            },
            children: char
          },
          charIdx
        );
      }),
      wordIdx < words.length - 1 && /* @__PURE__ */ jsx("span", { className: "inline-block", children: " " })
    ] }, wordIdx);
  }) });
}
function Manifesto() {
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const progress = -rect.top / scrollableHeight;
      const clamped = Math.min(Math.max(progress, 0), 1);
      setScrollProgress(clamped);
      const index = Math.min(Math.floor(clamped * (frames$1.length - 1)), frames$1.length - 1);
      setFrameIndex(index);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsx("section", { ref: trackRef, className: "relative w-full h-[250vh] bg-ink", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-center px-5 md:px-10 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 w-full h-full pointer-events-none", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute left-0 top-0 w-full md:w-[50%] h-full pointer-events-auto cursor-pointer z-20",
          onMouseEnter: () => {
            setIsHovered(true);
            soundManager.playSoftChime();
          },
          onMouseLeave: () => {
            setIsHovered(false);
            soundManager.playSoftHover();
          }
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 ease-in-out",
          style: {
            opacity: isHovered ? 0 : 1
          },
          children: frames$1.length > 0 && frames$1.map((src, i) => /* @__PURE__ */ jsx(
            "img",
            {
              src,
              alt: "",
              className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-[28%] w-[85vw] h-[60vh] md:w-[55vw] md:h-[75vh] object-cover",
              style: {
                opacity: i === frameIndex ? 0.95 : 0,
                filter: "brightness(1.05) contrast(1.25) saturate(1.1)",
                pointerEvents: "none"
              }
            },
            i
          ))
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-[28%] w-[85vw] h-[60vh] md:w-[55vw] md:h-[75vh] pointer-events-none transition-opacity duration-300 ease-in-out",
          style: {
            opacity: isHovered ? 1 : 0
          },
          children: /* @__PURE__ */ jsx(WineParticles, { active: isHovered })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink opacity-70 pointer-events-none" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "md:col-span-4 font-mono text-[11px] uppercase tracking-cine text-bone/50", children: /* @__PURE__ */ jsx(
        ScrollSplitText,
        {
          text: "(01) — Manifesto",
          startProgress: 0,
          endProgress: 0.08,
          scrollProgress
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-6 md:col-start-7", children: [
        /* @__PURE__ */ jsxs("p", { className: "font-serif italic font-light text-bone leading-[1.1] text-balance", style: { fontSize: "clamp(2rem, 3.4vw, 3.4rem)" }, children: [
          /* @__PURE__ */ jsx(
            ScrollSplitText,
            {
              text: "Not for everyone.",
              startProgress: 0.04,
              endProgress: 0.14,
              scrollProgress
            }
          ),
          " ",
          /* @__PURE__ */ jsx(
            ScrollSplitText,
            {
              text: "A room for the late hours, the long looks, the records that keep playing after the city has gone quiet.",
              startProgress: 0.14,
              endProgress: 0.42,
              scrollProgress,
              isDimmed: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm text-bone/60", children: [
          /* @__PURE__ */ jsx("div", { className: "leading-relaxed", children: /* @__PURE__ */ jsx(
            ScrollSplitText,
            {
              text: "We do not advertise. We do not announce. The door opens for those who already know where it is.",
              startProgress: 0.32,
              endProgress: 0.52,
              scrollProgress,
              isDimmed: true
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "leading-relaxed", children: /* @__PURE__ */ jsx(
            ScrollSplitText,
            {
              text: "Inside: low light, low ceilings, high standards. Drinks built to be remembered. Music that was never meant for daylight.",
              startProgress: 0.42,
              endProgress: 0.62,
              scrollProgress,
              isDimmed: true
            }
          ) })
        ] })
      ] })
    ] })
  ] }) });
}
const dj = "/assets/dj-CzHXBebk.jpg";
const crowd = "/assets/crowd-B5lehDky.jpg";
const portrait = "/assets/portrait-CLOTx2_W.jpg";
const interior = "/assets/interior-DaVL50G8.jpg";
const nights = [
  { date: "FRI 14 NOV", name: "BLACK ROOM", artist: "ARCA b2b SHYGIRL", tag: "Underground / Industrial", img: dj },
  { date: "SAT 15 NOV", name: "VELVET HOUR", artist: "HONEY DIJON", tag: "Disco / Soul / House", img: crowd },
  { date: "THU 20 NOV", name: "AFTER DARK XI", artist: "PEGGY GOU", tag: "Resident Showcase", img: portrait },
  { date: "SAT 22 NOV", name: "MIDNIGHT MASS", artist: "FRED AGAIN..", tag: "Closed Door / Members Only", img: interior }
];
function Nights() {
  const refs = useRef([]);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("is-in");
      });
    }, { threshold: 0.15 });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  return /* @__PURE__ */ jsx("section", { id: "nights", className: "relative px-5 md:px-10 py-32 md:py-48", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] uppercase tracking-cine text-bone/50 mb-4", children: "(02) — Programme" }),
        /* @__PURE__ */ jsxs("h2", { className: "font-display text-bone leading-[0.85]", style: { fontSize: "clamp(3.5rem, 12vw, 12rem)" }, children: [
          "NIGHTS",
          /* @__PURE__ */ jsx("span", { className: "text-crimson", children: "." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "max-w-sm text-sm text-bone/60", children: "Four nights a week. Each one a closed loop of sound, light, and consequence. Tables open thirty days out." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "divide-y divide-bone/10 border-y border-bone/10", children: nights.map((n, i) => /* @__PURE__ */ jsxs(
      "div",
      {
        ref: (el) => {
          refs.current[i] = el;
        },
        className: "group relative grid grid-cols-12 items-center gap-4 py-8 md:py-10 cursor-pointer overflow-hidden transition-colors hover:bg-bone/[0.02]",
        children: [
          /* @__PURE__ */ jsx("div", { className: "col-span-12 md:col-span-2 font-mono text-xs uppercase tracking-cine text-bone/60", children: n.date }),
          /* @__PURE__ */ jsx("h3", { className: "col-span-8 md:col-span-5 font-display text-bone leading-none transition-transform duration-700 group-hover:translate-x-2", style: { fontSize: "clamp(2rem, 5vw, 4rem)" }, children: n.name }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-4 md:col-span-3 text-right md:text-left", children: [
            /* @__PURE__ */ jsx("div", { className: "font-mono text-[11px] uppercase tracking-cine text-bone", children: n.artist }),
            /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] uppercase tracking-cine text-bone/40 mt-1", children: n.tag })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "col-span-12 md:col-span-2 flex justify-end", children: /* @__PURE__ */ jsx("span", { className: "font-mono text-[11px] uppercase tracking-cine text-bone/60 border-b border-bone/30 pb-1 transition-all group-hover:text-crimson group-hover:border-crimson", children: "Reserve →" }) }),
          /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute right-[20%] top-1/2 -translate-y-1/2 h-44 w-32 md:h-56 md:w-40 overflow-hidden opacity-0 scale-95 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 z-10", children: /* @__PURE__ */ jsx("img", { src: n.img, alt: "", className: "h-full w-full object-cover", loading: "lazy" }) })
        ]
      },
      n.name
    )) })
  ] }) });
}
const cocktail = "/assets/cocktail-VrwwlWbT.jpg";
const frames = [
  { src: interior, caption: "22:00 — The room awakens." },
  { src: cocktail, caption: "23:14 — A drink is poured." },
  { src: dj, caption: "01:00 — The needle drops." },
  { src: crowd, caption: "03:42 — Nothing is the same." }
];
function Cinematic() {
  const ref = useRef(null);
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
  return /* @__PURE__ */ jsx("section", { ref, className: "relative", style: { height: `${frames.length * 100}vh` }, children: /* @__PURE__ */ jsxs("div", { className: "sticky top-0 h-[100svh] w-full overflow-hidden vignette", children: [
    frames.map((f, i) => /* @__PURE__ */ jsx(
      "img",
      {
        src: f.src,
        alt: f.caption,
        loading: "lazy",
        className: "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
        style: {
          opacity: i === idx ? 1 : 0,
          filter: "brightness(0.65) contrast(1.1)",
          transform: `scale(${1 + progress * 0.05})`
        }
      },
      i
    )),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" }),
    /* @__PURE__ */ jsxs("div", { className: "absolute top-6 md:top-10 left-5 md:left-10 right-5 md:right-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-cine text-bone/70", children: [
      /* @__PURE__ */ jsx("span", { children: "SEQ 04 — One Night." }),
      /* @__PURE__ */ jsxs("span", { className: "tabular-nums", children: [
        String(idx + 1).padStart(2, "0"),
        " / ",
        String(frames.length).padStart(2, "0")
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-x-0 bottom-0 px-5 md:px-10 pb-16 md:pb-24", children: [
      /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] uppercase tracking-cine text-crimson mb-4", children: "Now playing" }),
      /* @__PURE__ */ jsx("h3", { className: "font-display text-bone leading-[0.85] reveal-mask", style: { fontSize: "clamp(2.5rem, 8vw, 9rem)" }, children: /* @__PURE__ */ jsx("span", { children: frames[idx].caption }) }, idx)
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-px bg-bone/15", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-crimson", style: { width: `${progress * 100}%` } }) })
  ] }) });
}
const list = [
  { n: "01", name: "Obsidian", spec: "Mezcal · Black Cardamom · Smoked Honey", price: "24" },
  { n: "02", name: "Velvet Hour", spec: "Cognac · Crème de Cassis · Rose", price: "26" },
  { n: "03", name: "Midnight Mass", spec: "Rye · Amaro · Burnt Orange", price: "22" },
  { n: "04", name: "Crimson Letter", spec: "Tequila · Hibiscus · Aleppo", price: "23" },
  { n: "05", name: "Ember", spec: "Islay Scotch · Maple · Lapsang", price: "28" }
];
function Cocktails() {
  return /* @__PURE__ */ jsx("section", { id: "cocktails", className: "relative px-5 md:px-10 py-32 md:py-48 bg-ink overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-12 gap-10 md:gap-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-5 md:sticky md:top-24 self-start", children: [
      /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] uppercase tracking-cine text-bone/50 mb-4", children: "(03) — The Bar" }),
      /* @__PURE__ */ jsxs("h2", { className: "font-display text-bone leading-[0.82] mb-8", style: { fontSize: "clamp(3.5rem, 10vw, 9rem)" }, children: [
        "DRINKS",
        /* @__PURE__ */ jsx("br", {}),
        "BUILT FOR",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "italic font-serif font-light text-crimson", children: "the night" }),
        "."
      ] }),
      /* @__PURE__ */ jsx("div", { className: "img-frame relative aspect-[3/4] max-w-sm", children: /* @__PURE__ */ jsx("img", { src: cocktail, alt: "Signature cocktail", loading: "lazy", width: 1280, height: 1600, className: "h-full w-full object-cover" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-7", children: [
      /* @__PURE__ */ jsx("ul", { className: "divide-y divide-bone/10 border-y border-bone/10", children: list.map((c) => /* @__PURE__ */ jsxs("li", { className: "group flex items-baseline gap-6 py-8 transition-colors hover:bg-bone/[0.02] cursor-pointer", children: [
        /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] uppercase tracking-cine text-bone/40 w-8", children: c.n }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("div", { className: "font-display text-bone leading-none transition-transform duration-500 group-hover:translate-x-1", style: { fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }, children: c.name }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 font-mono text-[11px] uppercase tracking-cine text-bone/50", children: c.spec })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "font-display text-bone/80 text-2xl", children: [
          "$",
          c.price
        ] })
      ] }, c.n)) }),
      /* @__PURE__ */ jsxs("p", { className: "mt-10 max-w-md font-serif italic text-bone/60", children: [
        '"Every cocktail is composed for a moment, not a menu."',
        /* @__PURE__ */ jsx("span", { className: "block mt-2 font-mono not-italic text-[10px] uppercase tracking-cine text-bone/40", children: "— ELIO RAVEN, Head Bar" })
      ] })
    ] })
  ] }) });
}
function Membership() {
  return /* @__PURE__ */ jsxs("section", { id: "membership", className: "relative px-5 md:px-10 py-32 md:py-48 overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 -z-10", children: [
      /* @__PURE__ */ jsx("img", { src: crowd, alt: "", className: "h-full w-full object-cover", loading: "lazy", style: { filter: "brightness(0.35) contrast(1.1)" } }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] uppercase tracking-cine text-bone/50 mb-6", children: "(04) — Membership" }),
      /* @__PURE__ */ jsxs("h2", { className: "font-display text-bone leading-[0.85] mb-16", style: { fontSize: "clamp(4rem, 14vw, 14rem)" }, children: [
        "NOT FOR",
        /* @__PURE__ */ jsx("br", {}),
        "EVERYONE",
        /* @__PURE__ */ jsx("span", { className: "text-crimson", children: "." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        { tier: "GUEST", price: "By invitation", lines: ["Standard reservations", "Two guests per visit", "Public programme"] },
        { tier: "MEMBER", price: "$2,400 / yr", lines: ["Priority bookings", "Private tables", "Members-only nights", "Cellar access"] },
        { tier: "CIRCLE", price: "By committee", lines: ["No door, no list", "Private rooms", "Curated travel", "Direct line to the bar"] }
      ].map((t, i) => /* @__PURE__ */ jsxs("div", { className: "group relative border border-bone/15 p-8 md:p-10 transition-all duration-700 hover:border-crimson hover:bg-ink/40 backdrop-blur-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "font-mono text-[10px] uppercase tracking-cine text-bone/40 mb-8", children: [
          "N° 0",
          i + 1
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "font-display text-bone text-5xl md:text-6xl mb-2", children: t.tier }),
        /* @__PURE__ */ jsx("div", { className: "font-mono text-[11px] uppercase tracking-cine text-crimson mb-10", children: t.price }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-3 text-sm text-bone/70", children: t.lines.map((l) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "text-crimson", children: "—" }),
          /* @__PURE__ */ jsx("span", { children: l })
        ] }, l)) }),
        /* @__PURE__ */ jsx("a", { href: "#reserve", className: "absolute bottom-8 right-8 font-mono text-[11px] uppercase tracking-cine text-bone/60 group-hover:text-bone transition-colors", children: "Apply →" })
      ] }, t.tier)) })
    ] })
  ] });
}
function Reserve() {
  const [sent, setSent] = useState(false);
  return /* @__PURE__ */ jsx("section", { id: "reserve", className: "relative px-5 md:px-10 py-32 md:py-48 bg-ink", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-6", children: [
      /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] uppercase tracking-cine text-bone/50 mb-6", children: "(05) — Reservation" }),
      /* @__PURE__ */ jsxs("h2", { className: "font-display text-bone leading-[0.82] mb-10", style: { fontSize: "clamp(3.5rem, 11vw, 11rem)" }, children: [
        "BOOK",
        /* @__PURE__ */ jsx("br", {}),
        "YOUR",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "italic font-serif font-light text-crimson", children: "night" }),
        "."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "max-w-md text-bone/60 leading-relaxed", children: "Tables are released thirty days in advance. We will respond within twenty-four hours, often sooner, occasionally with the only word that matters: yes." })
    ] }),
    /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();
          setSent(true);
        },
        className: "md:col-span-6 space-y-6",
        children: [
          [
            { id: "name", label: "Full name", type: "text" },
            { id: "email", label: "Email", type: "email" },
            { id: "date", label: "Preferred date", type: "date" },
            { id: "guests", label: "Number of guests", type: "number" }
          ].map((f) => /* @__PURE__ */ jsxs("div", { className: "relative border-b border-bone/20 pb-2 focus-within:border-crimson transition-colors", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: f.id, className: "block font-mono text-[10px] uppercase tracking-cine text-bone/40 mb-2", children: f.label }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: f.id,
                type: f.type,
                required: true,
                className: "w-full bg-transparent text-bone font-serif text-xl outline-none placeholder:text-bone/30"
              }
            )
          ] }, f.id)),
          /* @__PURE__ */ jsxs("div", { className: "relative border-b border-bone/20 pb-2 focus-within:border-crimson transition-colors", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "note", className: "block font-mono text-[10px] uppercase tracking-cine text-bone/40 mb-2", children: "Note to the host" }),
            /* @__PURE__ */ jsx("textarea", { id: "note", rows: 3, className: "w-full bg-transparent text-bone font-serif text-lg outline-none resize-none" })
          ] }),
          /* @__PURE__ */ jsxs("button", { type: "submit", className: "btn-cine w-full justify-center mt-8", children: [
            sent ? "Request received" : "Send Request",
            /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "→" })
          ] })
        ]
      }
    )
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "relative px-5 md:px-10 pt-24 pb-10 bg-ink overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxs("h2", { className: "font-display text-bone leading-[0.78]", style: { fontSize: "clamp(5rem, 22vw, 22rem)" }, children: [
      "NOCTURNE",
      /* @__PURE__ */ jsx("span", { className: "text-crimson", children: "." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-16 grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-bone/10 pt-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] uppercase tracking-cine text-bone/40 mb-4", children: "Address" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-bone/70 leading-relaxed", children: [
          "12 Velvet Lane",
          /* @__PURE__ */ jsx("br", {}),
          "Brooklyn, NY 11211"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] uppercase tracking-cine text-bone/40 mb-4", children: "Hours" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-bone/70 leading-relaxed", children: [
          "Thu — Sun",
          /* @__PURE__ */ jsx("br", {}),
          "22:00 — Late"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] uppercase tracking-cine text-bone/40 mb-4", children: "Contact" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-bone/70 leading-relaxed", children: [
          "host@nocturne.club",
          /* @__PURE__ */ jsx("br", {}),
          "+1 (212) 555 0114"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] uppercase tracking-cine text-bone/40 mb-4", children: "Follow" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-1 text-sm text-bone/70", children: ["Instagram", "RA", "SoundCloud"].map((s) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "#", className: "hover:text-crimson transition-colors", children: [
          s,
          " →"
        ] }) }, s)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-4 font-mono text-[10px] uppercase tracking-cine text-bone/40", children: [
      /* @__PURE__ */ jsx("span", { children: "© MMXXV NOCTURNE — All rights observed." }),
      /* @__PURE__ */ jsx("span", { children: "The night is what you make it." })
    ] })
  ] }) });
}
function Index() {
  return /* @__PURE__ */ jsxs("main", { className: "grain relative bg-ink text-bone selection:bg-crimson", children: [
    /* @__PURE__ */ jsx(Preloader, {}),
    /* @__PURE__ */ jsx(SmoothScroll, {}),
    /* @__PURE__ */ jsx(Cursor, {}),
    /* @__PURE__ */ jsx(Nav, {}),
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(Marquee, { items: ["AFTER DARK", "SINCE MMXXV", "NOT FOR EVERYONE", "THE NIGHT STARTS HERE", "VOLUME I"] }),
    /* @__PURE__ */ jsx(Manifesto, {}),
    /* @__PURE__ */ jsx(Nights, {}),
    /* @__PURE__ */ jsx(Cinematic, {}),
    /* @__PURE__ */ jsx(Cocktails, {}),
    /* @__PURE__ */ jsx(Membership, {}),
    /* @__PURE__ */ jsx(Reserve, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  Index as component
};
