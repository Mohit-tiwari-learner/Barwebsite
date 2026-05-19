import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Cursor } from "@/components/site/Cursor";
import { Preloader } from "@/components/site/Preloader";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Manifesto } from "@/components/site/Manifesto";
import { Nights } from "@/components/site/Nights";
import { Cinematic } from "@/components/site/Cinematic";
import { Cocktails } from "@/components/site/Cocktails";
import { Membership } from "@/components/site/Membership";
import { Reserve } from "@/components/site/Reserve";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="grain relative bg-ink text-bone selection:bg-crimson">
      <Preloader />
      <SmoothScroll />
      <Cursor />
      <Nav />
      <Hero />
      <Marquee items={["AFTER DARK", "SINCE MMXXV", "NOT FOR EVERYONE", "THE NIGHT STARTS HERE", "VOLUME I"]} />
      <Manifesto />
      <Nights />
      <Cinematic />
      <Cocktails />
      <Membership />
      <Reserve />
      <Footer />
    </main>
  );
}
