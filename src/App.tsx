import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WhyUs from "@/components/WhyUs";
import Products from "@/components/Products";
import Projects from "@/components/Projects";
import ProblemSolution from "@/components/ProblemSolution";
import Domains from "@/components/Domains";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { asset, Glow } from "@/components/ui";
import MobileHome from "@/components/mobile/MobileHome";
import FitSection from "@/components/FitSection";
import { useReveal } from "@/components/useReveal";
import { useMotion } from "@/components/useMotion";
import Preloader, { ExitSwitch } from "@/components/Preloader";

const CANVAS_GLOWS = [
  { left: 1100, top: 600 },
  { left: -200, top: 3000 },
  { left: 1000, top: 5600 },
  { left: -150, top: 8060 },
];

export default function App() {
  useReveal();
  useMotion();
  return (
    <>
    <Preloader />
    <ExitSwitch />
    <div className="scroll-progress" aria-hidden />
    <MobileHome />
    <div className="relative mx-auto hidden max-w-[1440px] overflow-clip lg:block">
      {CANVAS_GLOWS.map((g, i) => (
        <Glow key={i} src="canvas-glow.svg" box={{ ...g, width: 700, height: 700 }} inset="-31.43%" className="hidden lg:block" />
      ))}

      <main className="relative flex flex-col gap-[12px] p-[12px] lg:gap-[24px] lg:p-[24px]">
        <Hero />
        <Marquee />
        <FitSection>
          <WhyUs />
        </FitSection>
        <FitSection>
          <Products />
        </FitSection>
        <FitSection>
          <Projects />
        </FitSection>
        <FitSection>
          <ProblemSolution />
        </FitSection>
        <FitSection>
          <Domains />
        </FitSection>
        {/* Shown at its natural design size (taller than a short laptop screen) so it matches Figma exactly */}
        <HowItWorks />
        {/* Full design size so the title and the cover flow stay large */}
        <Testimonials />
        <FitSection>
          <Contact />
        </FitSection>
        <FitSection>
          <Footer />
        </FitSection>
      </main>

      <a
        href="https://wa.me/972544228606"
        aria-label="שיחה בוואטסאפ"
        style={{ ["--ring" as string]: "rgba(37,211,102,0.55)" }}
        className="pulse-ring slide-up-in fixed bottom-[20px] right-[16px] z-50 flex size-[64px] items-center justify-center rounded-full bg-[#25d366] drop-shadow-[0_8px_12px_rgba(37,211,102,0.45)] transition-transform hover:scale-105"
      >
        <img src={asset("whatsapp-white.svg")} alt="" className="size-[26px] lg:size-[30px]" />
      </a>
    </div>
    </>
  );
}
