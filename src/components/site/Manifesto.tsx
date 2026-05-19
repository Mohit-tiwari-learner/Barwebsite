import { useEffect, useRef, useState } from "react";
import WineParticles from "./WineParticles";

const frameModules = import.meta.glob("../../assets/wine-glass/ezgif-frame-*.jpg", { eager: true });
const frames = Object.keys(frameModules)
  .sort()
  .map((path) => (frameModules[path] as any).default);

interface ScrollSplitTextProps {
  text: string;
  startProgress: number;
  endProgress: number;
  scrollProgress: number;
  isDimmed?: boolean;
}

function ScrollSplitText({ text, startProgress, endProgress, scrollProgress, isDimmed }: ScrollSplitTextProps) {
  const words = text.split(" ");
  let globalCharIndex = 0;
  const totalChars = text.length;
  const range = endProgress - startProgress;

  return (
    <>
      {words.map((word, wordIdx) => {
        const wordChars = word.split("");
        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {wordChars.map((char, charIdx) => {
              const charStart = startProgress + (globalCharIndex / totalChars) * range;
              globalCharIndex++;
              
              const charDuration = 0.05; // compact fade duration for individual letter
              const progress = Math.min(Math.max((scrollProgress - charStart) / charDuration, 0), 1);
              const eased = progress * progress * (3 - 2 * progress); // smooth step
              
              return (
                <span
                  key={charIdx}
                  className="inline-block origin-bottom"
                  style={{
                    opacity: isDimmed ? Math.max(eased * 0.4, 0.1) : Math.max(eased, 0.15),
                    transform: `translate3d(0, ${(1 - eased) * 6}px, 0)`,
                    transition: "transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  }}
                >
                  {char}
                </span>
              );
            })}
            {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </>
  );
}

export function Manifesto() {
  const trackRef = useRef<HTMLDivElement>(null);
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
      
      const index = Math.min(Math.floor(clamped * (frames.length - 1)), frames.length - 1);
      setFrameIndex(index);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Run initially
    
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={trackRef} className="relative w-full h-[250vh] bg-ink">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-center px-5 md:px-10 py-12">
        {/* Background animation frames & particles */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Invisible Left-side Hover Pane */}
          <div 
            className="absolute left-0 top-0 w-full md:w-[50%] h-full pointer-events-auto cursor-pointer z-20"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />

          {/* Smooth-fading Image Frames Wrapper (no internal frame transitions to prevent scroll blinking!) */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 ease-in-out"
            style={{
              opacity: isHovered ? 0 : 1,
            }}
          >
            {frames.length > 0 &&
              frames.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-[28%] w-[85vw] h-[60vh] md:w-[55vw] md:h-[75vh] object-cover"
                  style={{
                    opacity: i === frameIndex ? 0.95 : 0,
                    filter: "brightness(1.05) contrast(1.25) saturate(1.1)",
                    pointerEvents: "none",
                  }}
                />
              ))}
          </div>

          {/* Particles overlay container */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-[28%] w-[85vw] h-[60vh] md:w-[55vw] md:h-[75vh] pointer-events-none transition-opacity duration-300 ease-in-out"
            style={{
              opacity: isHovered ? 1 : 0,
            }}
          >
            <WineParticles active={isHovered} />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink opacity-70 pointer-events-none" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 mx-auto w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-4 font-mono text-[11px] uppercase tracking-cine text-bone/50">
            <ScrollSplitText 
              text="(01) — Manifesto" 
              startProgress={0.0} 
              endProgress={0.08} 
              scrollProgress={scrollProgress} 
            />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="font-serif italic font-light text-bone leading-[1.1] text-balance" style={{ fontSize: "clamp(2rem, 3.4vw, 3.4rem)" }}>
              <ScrollSplitText 
                text="Not for everyone." 
                startProgress={0.04} 
                endProgress={0.14} 
                scrollProgress={scrollProgress} 
              />{" "}
              <ScrollSplitText 
                text="A room for the late hours, the long looks, the records that keep playing after the city has gone quiet." 
                startProgress={0.14} 
                endProgress={0.42} 
                scrollProgress={scrollProgress} 
                isDimmed 
              />
            </p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm text-bone/60">
              <div className="leading-relaxed">
                <ScrollSplitText 
                  text="We do not advertise. We do not announce. The door opens for those who already know where it is." 
                  startProgress={0.32} 
                  endProgress={0.52} 
                  scrollProgress={scrollProgress} 
                  isDimmed
                />
              </div>
              <div className="leading-relaxed">
                <ScrollSplitText 
                  text="Inside: low light, low ceilings, high standards. Drinks built to be remembered. Music that was never meant for daylight." 
                  startProgress={0.42} 
                  endProgress={0.62} 
                  scrollProgress={scrollProgress} 
                  isDimmed
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
