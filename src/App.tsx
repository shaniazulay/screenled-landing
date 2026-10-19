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

const CANVAS_GLOWS = [
  { left: 1100, top: 600 },
  { left: -200, top: 3000 },
  { left: 1000, top: 5600 },
  { left: -150, top: 8060 },
];

export default function App() {
  return (
    <>
    <MobileHome />
    <div className="relative mx-auto hidden max-w-[1440px] overflow-x-clip lg:block">
      {CANVAS_GLOWS.map((g, i) => (
        <Glow key={i} src="canvas-glow.svg" box={{ ...g, width: 700, height: 700 }} inset="-31.43%" className="hidden lg:block" />
      ))}

      <main className="relative flex flex-col gap-[12px] p-[12px] lg:gap-[24px] lg:p-[24px]">
        <Hero />
        <Marquee />
        <WhyUs />
        <Products />
        <Projects />
        <ProblemSolution />
        <Domains />
        <HowItWorks />
        <Testimonials />
        <Contact />
        <Footer />
      </main>

      <a
        href="https://wa.me/972544228606"
        aria-label="שיחה בוואטסאפ"
        className="fixed bottom-[20px] right-[16px] z-50 flex size-[64px] items-center justify-center rounded-full bg-[#25d366] drop-shadow-[0_8px_12px_rgba(37,211,102,0.45)] transition-transform hover:scale-105"
      >
        <img src={asset("whatsapp-white.svg")} alt="" className="size-[26px] lg:size-[30px]" />
      </a>
    </div>
    </>
  );
}
