import { useEffect, useRef, useState } from "react";
import CoverFlow, { CoverDots, DESKTOP_SLOTS, MOBILE_SLOTS } from "./CoverFlow";
import { countUp } from "./useReveal";
import { asset, Card, LimeButton, PixelCluster, SectionTag, Sparkle } from "./ui";

export default function Testimonials() {
  const rating = useRef<HTMLSpanElement>(null);
  useEffect(() => countUp(rating.current, 5, 1), []);
  const [active, setActive] = useState(0);
  // Spread the cover flow across the available width (design: cards span 1310px of 1440).
  const stage = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(1303);
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const size = Math.max(0.85, Math.min(1.18, w / 1310));
  const spread = Math.max(1, (w - 270 * size) / (1040 * size));
  return (
    <Card id="testimonials" className="px-[20px] pb-[32px] pt-[40px] sm:px-[40px] xl:px-[89px] xl:pb-[96px] xl:pt-[110px]">
      <PixelCluster color="indigo" style={{ left: 30, top: 30 }} className="hidden xl:block" />
      <span className="pointer-events-none absolute left-[340px] top-[60px] hidden font-mont text-[260px] font-bold leading-[220px] text-[rgba(84,87,224,0.07)] xl:block" aria-hidden>
        ”
      </span>
      <Sparkle src="sparkle-16a.svg" size={16} style={{ left: 420.5, top: 163.4 }} className="hidden xl:block" />
      <Sparkle src="sparkle-8a.svg" size={8} style={{ left: 440.5, top: 151.4 }} className="hidden xl:block" />

      {/* Header */}
      <div className="relative flex flex-col items-center gap-[24px] xl:block xl:h-[200px]">
        <div className="flex flex-col items-center gap-[14px] xl:absolute xl:left-1/2 xl:top-[100px] xl:-translate-x-1/2">
          <SectionTag label="המלצות" num="06" />
          <h2 className="sd-text whitespace-nowrap text-center font-rubik text-[32px] font-semibold leading-[40px] text-navy sm:text-[46px] sm:leading-[58px] xl:text-[58px] xl:leading-[68px]">
            מה הלקוחות שלנו <span className="text-indigo">אומרים</span>
          </h2>
        </div>
        <div className="flex items-center gap-[16px] rounded-[18px] bg-white px-[24px] py-[16px] drop-shadow-[0_10px_15px_rgba(27,33,64,0.08)] xl:absolute xl:right-0 xl:top-0 xl:h-[81px] xl:w-[299px]">
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
        <LimeButton label="לכל ההמלצות" arrow="arrow-dark-32.svg" arrowSize={32} textClass="text-[16px]" href="#testimonials" className="h-[54px] w-[210px] xl:absolute xl:left-0 xl:top-[13.5px]" />
      </div>

      {/* Auto-rotating cover flow */}
      <div ref={stage} className="relative -mx-[20px] mt-[28px] sm:-mx-[40px] xl:-mx-[65px] xl:mt-0">
        <div className="hidden xl:block">
          <CoverFlow slots={DESKTOP_SLOTS} height={520} size={size} spread={spread} active={active} onActive={setActive} />
        </div>
        <div className="xl:hidden">
          <CoverFlow slots={MOBILE_SLOTS} height={380} size={1.25} compact active={active} onActive={setActive} />
        </div>
      </div>

      <div className="mt-[24px] xl:mt-[40px]">
        <CoverDots active={active} onActive={setActive} />
      </div>
    </Card>
  );
}
