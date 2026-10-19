import { Glow } from "../ui";
import { MHero, MMarquee, MProblemSolution, MProducts, MProjects, MWhyUs } from "./MobileTop";
import { MContact, MDomains, MFooter, MHowItWorks, MStickyBar, MTestimonials } from "./MobileBottom";

// Canvas glows from the 390px mobile frame (left/top in px)
const GLOWS = [
  { left: 210, top: 600 },
  { left: 210, top: 2600 },
  { left: -140, top: 4700 },
  { left: -140, top: 6900 },
  { left: 210, top: 8800 },
];

/** Mobile & tablet layout (below 1024px), built from the "מובייל דף בית סטיקי" Figma frame. */
export default function MobileHome() {
  return (
    <div className="relative overflow-clip lg:hidden">
      {GLOWS.map((g, i) => (
        <Glow key={i} src="m/canvas-glow.svg" box={{ ...g, width: 320, height: 320 }} inset="-43.75%" />
      ))}
      <main className="relative mx-auto flex max-w-[640px] flex-col gap-[12px] px-[12px] pb-[96px] pt-[12px]">
        <MHero />
        <MMarquee />
        <MWhyUs />
        <MProducts />
        <MProjects />
        <MProblemSolution />
        <MDomains />
        <MHowItWorks />
        <MTestimonials />
        <MContact />
        <MFooter />
      </main>
      <MStickyBar />
    </div>
  );
}
