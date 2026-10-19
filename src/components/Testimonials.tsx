import { useEffect, useRef } from "react";
import { countUp } from "./useReveal";
import { asset, Card, LimeButton, PixelCluster, SectionTag, Sparkle } from "./ui";

type Side = { label: string; img: string; labelSide: "left" | "right"; dim: number };

// Cover-flow geometry (px offsets from the centre of a 1440 canvas)
const OUTER = { w: 270, h: 350, top: 85 };
const MID = { w: 330, h: 430, top: 45 };

const CARDS: (Side & { x: number; size: typeof OUTER })[] = [
  { label: "קולנוע ביתי", img: "domain-cinema.png", labelSide: "left", dim: 0.4, x: -655, size: OUTER },
  { label: "רשת חנויות", img: "domain-stores.png", labelSide: "right", dim: 0.4, x: 385, size: OUTER },
  { label: "מוזיאון", img: "domain-museum.png", labelSide: "left", dim: 0.18, x: -455, size: MID },
  { label: "חברת הפקות", img: "testi-production.png", labelSide: "right", dim: 0.18, x: 125, size: MID },
];

const QUOTE = "המסך בכניסה שינה את התנועה במתחם. אנשים עוצרים, מצלמים ונכנסים.";

function SideCard({ c, className = "", style }: { c: Side; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`card-lift tilt zoom-parent group overflow-hidden rounded-[24px] shadow-[0_24px_50px_rgba(10,14,41,0.28)] ${className}`} style={style}>
      <img loading="lazy" src={asset(c.img)} alt={c.label} className="zoom-img absolute inset-0 size-full object-cover" />
      <span className="absolute inset-0 bg-gradient-to-b from-[rgba(5,8,26,0)] from-45% to-[rgba(5,8,26,0.85)]" />
      <span className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0" style={{ background: `rgba(21,21,25,${c.dim})` }} />
      <span className={`absolute bottom-[20px] whitespace-nowrap font-heebo text-[16px] font-bold leading-[24px] text-white ${c.labelSide === "left" ? "left-[20px]" : "right-[20px]"}`}>
        {c.label}
      </span>
    </div>
  );
}

function ActiveCard({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <figure className={`card-lift tilt zoom-parent m-0 overflow-hidden rounded-[24px] shadow-[0_30px_60px_rgba(10,14,41,0.4)] ${className}`} style={style}>
      <img loading="lazy" src={asset("project-2.png")} alt="קיר וידאו באטריום קניון" className="zoom-img absolute inset-0 size-full object-cover" />
      <span className="absolute inset-0 bg-gradient-to-b from-[rgba(5,8,26,0)] from-45% to-[rgba(5,8,26,0.85)]" />
      <span className="absolute right-[20px] top-[20px] rounded-full bg-white/[0.18] px-[10px] py-[5px] font-heebo text-[12px] font-medium leading-[18px] text-white backdrop-blur-[5px]">
        המלצת וידאו · 0:48
      </span>
      <img loading="lazy" src={asset("stars-87.svg")} alt="5 כוכבים" className="absolute bottom-[159px] right-[28px] h-[15px] w-[87px]" />
      <blockquote className="absolute bottom-[89px] right-[28px] m-0 w-[calc(100%-80px)] max-w-[320px] font-heebo text-[19px] font-medium leading-[29px] text-white">{QUOTE}</blockquote>
      <figcaption className="absolute bottom-[28px] right-[28px] flex flex-col items-start">
        <span className="font-heebo text-[16px] font-bold leading-[24px] text-white">שם הלקוח</span>
        <span className="font-heebo text-[13px] leading-[19px] text-white/75">מנהל/ת שיווק · קניון</span>
      </figcaption>
      <button className="pulse-ring absolute bottom-[28px] left-[28px] flex size-[54px] items-center justify-center rounded-full bg-white transition-transform hover:scale-110" aria-label="הפעלת סרטון">
        <img loading="lazy" src={asset("icon-play.svg")} alt="" className="ml-[2px] size-[22px]" />
      </button>
    </figure>
  );
}

export default function Testimonials() {
  const rating = useRef<HTMLSpanElement>(null);
  useEffect(() => countUp(rating.current, 5, 1), []);
  return (
    <Card id="testimonials" className="px-[20px] pb-[32px] pt-[40px] sm:px-[40px] xl:px-[89px] xl:pb-[96px] xl:pt-[110px]">
      <PixelCluster color="indigo" style={{ left: 30, top: 30 }} className="hidden xl:block" />
      <span className="pointer-events-none absolute left-[306px] top-[72px] hidden font-mont text-[260px] font-bold leading-[220px] text-[rgba(84,87,224,0.07)] xl:block" aria-hidden>
        ”
      </span>
      <Sparkle src="sparkle-16a.svg" size={16} style={{ left: 420.5, top: 163.4 }} className="hidden xl:block" />
      <Sparkle src="sparkle-8a.svg" size={8} style={{ left: 440.5, top: 151.4 }} className="hidden xl:block" />

      {/* Header */}
      <div className="relative flex flex-col items-center gap-[24px] xl:block xl:h-[166px]">
        <div className="flex flex-col items-center gap-[14px] xl:absolute xl:left-1/2 xl:top-0 xl:-translate-x-[calc(50%+4px)]">
          <SectionTag label="המלצות" num="06" />
          <h2 className="sd-text whitespace-nowrap text-center font-rubik text-[32px] font-semibold leading-[40px] text-navy sm:text-[46px] sm:leading-[58px] xl:text-[40px] min-[1380px]:text-[46px]">
            מה הלקוחות שלנו <span className="text-indigo">אומרים</span>
          </h2>
        </div>
        <div className="flex items-center gap-[16px] rounded-[18px] bg-white px-[24px] py-[16px] drop-shadow-[0_10px_15px_rgba(27,33,64,0.08)] xl:absolute xl:right-0 xl:top-[15px] xl:h-[81px] xl:w-[299px]">
          <span className="font-mont text-[40px] font-bold leading-[49px] text-indigo" dir="ltr">
            G
          </span>
          <span ref={rating} className="font-mont text-[40px] font-extrabold leading-[49px] text-navy" dir="ltr">
            5.0
          </span>
          <span className="flex flex-col items-start gap-[4px]">
            <img loading="lazy" src={asset("stars-102.svg")} alt="5 כוכבים" className="h-[18px] w-[102px]" />
            <span className="whitespace-nowrap font-heebo text-[14px] leading-[21px] text-slate-body">על סמך ביקורות בגוגל</span>
          </span>
        </div>
        <LimeButton label="לכל ההמלצות" arrow="arrow-dark-32.svg" arrowSize={32} textClass="text-[16px]" href="#testimonials" className="h-[54px] w-[210px] xl:absolute xl:left-0 xl:top-[53.4px]" />
      </div>

      {/* Desktop cover flow */}
      <div className="relative -mx-[89px] hidden h-[520px] xl:block">
        <div className="absolute left-1/2 top-0 h-[520px] w-0">
          {CARDS.map((c) => (
            <div key={c.label} data-reveal="scale" className="absolute" style={{ left: c.x, top: c.size.top, width: c.size.w, height: c.size.h, ["--d" as string]: `${c.size === MID ? 150 : 300}ms` }}>
              <SideCard c={c} className="relative size-full" />
            </div>
          ))}
          <div data-reveal="scale" className="absolute left-[-200px] top-0 h-[520px] w-[400px]">
            <ActiveCard className="relative size-full" />
          </div>
        </div>
      </div>

      {/* Mobile: swipeable row */}
      <div className="-mx-[20px] mt-[32px] flex snap-x snap-mandatory gap-[14px] overflow-x-auto px-[20px] pb-[20px] sm:-mx-[40px] sm:px-[40px] xl:hidden [scrollbar-width:none]">
        <ActiveCard className="relative h-[460px] w-[320px] shrink-0 snap-center" />
        {CARDS.map((c) => (
          <SideCard key={c.label} c={c} className="relative h-[460px] w-[280px] shrink-0 snap-center" />
        ))}
      </div>

      <div className="mt-[16px] flex justify-center gap-[8px] xl:mt-[40px]" dir="ltr" aria-hidden>
        <span className="size-[8px] rounded-[4px] bg-[rgba(21,21,25,0.18)]" />
        <span className="size-[8px] rounded-[4px] bg-[rgba(21,21,25,0.18)]" />
        <span className="h-[8px] w-[26px] rounded-[4px] bg-indigo" />
        <span className="size-[8px] rounded-[4px] bg-[rgba(21,21,25,0.18)]" />
        <span className="size-[8px] rounded-[4px] bg-[rgba(21,21,25,0.18)]" />
      </div>
    </Card>
  );
}
