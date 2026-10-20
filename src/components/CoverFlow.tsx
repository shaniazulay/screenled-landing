import { useEffect, useRef, useState } from "react";
import { asset } from "./ui";

export type Testimonial = { label: string; img: string; quote: string; role: string; video: string };

// Order follows the design: centre, then the cards to its left (mid, outer), then the right (outer, mid).
export const TESTIMONIALS: Testimonial[] = [
  { label: "קניון", img: "project-2.png", quote: "המסך בכניסה שינה את התנועה במתחם. אנשים עוצרים, מצלמים ונכנסים.", role: "מנהל/ת שיווק · קניון", video: "0:48" },
  { label: "מוזיאון", img: "domain-museum.png", quote: "המבקרים נשארים מול הקיר דקות ארוכות. בדיוק החוויה שרצינו ליצור.", role: "אוצר/ת · מוזיאון", video: "0:57" },
  { label: "קולנוע ביתי", img: "domain-cinema.png", quote: "תמונה של אולם קולנוע, בסלון שלנו. הליווי היה מקצועי מהרגע הראשון.", role: "לקוח/ה פרטי/ת · קולנוע ביתי", video: "0:41" },
  { label: "רשת חנויות", img: "domain-stores.png", quote: "חלון הראווה הפך למגנט. מאז ההתקנה רואים יותר כניסות לחנות.", role: "מנהל/ת סניפים · רשת חנויות", video: "0:39" },
  { label: "חברת הפקות", img: "testi-production.png", quote: "קיר מודולרי שמתחבר בשעה ונראה מושלם בכל במה. הלקוחות שלנו מתלהבים.", role: "מפיק/ה ראשי/ת · חברת הפקות", video: "0:52" },
];

export type Slot = { x: number; w: number; h: number; top: number; dim: number; z: number; hidden?: boolean };

/** Desktop geometry from the 1440 design: centre card, two mid cards, two outer cards (x = card centre offset). */
export const DESKTOP_SLOTS: Record<number, Slot> = {
  0: { x: 0, w: 400, h: 520, top: 0, dim: 0, z: 5 },
  1: { x: -290, w: 330, h: 430, top: 45, dim: 0.18, z: 4 },
  [-1]: { x: 290, w: 330, h: 430, top: 45, dim: 0.18, z: 4 },
  2: { x: -520, w: 270, h: 350, top: 85, dim: 0.4, z: 3 },
  [-2]: { x: 520, w: 270, h: 350, top: 85, dim: 0.4, z: 3 },
};

/** Mobile geometry from the 390 design (only the centre and the two neighbours are visible). */
export const MOBILE_SLOTS: Record<number, Slot> = {
  0: { x: 0, w: 236, h: 380, top: 0, dim: 0, z: 5 },
  1: { x: -138, w: 170, h: 290, top: 45, dim: 0.3, z: 4 },
  [-1]: { x: 138, w: 170, h: 290, top: 45, dim: 0.3, z: 4 },
  2: { x: -220, w: 140, h: 240, top: 70, dim: 0.5, z: 3, hidden: true },
  [-2]: { x: 220, w: 140, h: 240, top: 70, dim: 0.5, z: 3, hidden: true },
};

/**
 * Auto-rotating 3D-ish cover flow. Cards glide between slots; the centre card shows the quote.
 * `spread` stretches the horizontal offsets (to fill wide screens), `size` scales the cards.
 */
export default function CoverFlow({
  slots,
  spread = 1,
  size = 1,
  height,
  compact = false,
  active,
  onActive,
}: {
  slots: Record<number, Slot>;
  spread?: number;
  size?: number;
  height: number;
  compact?: boolean;
  active: number;
  onActive: (i: number) => void;
}) {
  const n = TESTIMONIALS.length;
  const [hover, setHover] = useState(false);
  const touch = useRef<number | null>(null);

  useEffect(() => {
    if (hover) return;
    const t = window.setInterval(() => onActive((active + 1) % n), 4000);
    return () => window.clearInterval(t);
  }, [hover, active, n, onActive]);

  const go = (d: number) => onActive((active + d + n) % n);

  return (
    <div
      className="relative w-full select-none"
      style={{ height: height * size }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        touch.current = null;
        if (Math.abs(dx) > 40) go(dx > 0 ? 1 : -1);
      }}
    >
      {TESTIMONIALS.map((t, i) => {
        let rel = (i - active + n) % n;
        if (rel > n / 2) rel -= n;
        const s = slots[rel];
        const isActive = rel === 0;
        const w = s.w * size;
        const h = s.h * size;
        return (
          <figure
            key={t.label}
            onClick={() => !isActive && onActive(i)}
            className={`group absolute m-0 overflow-hidden rounded-[24px] ${isActive ? "shadow-[0_30px_60px_rgba(10,14,41,0.4)]" : "cursor-pointer shadow-[0_24px_50px_rgba(10,14,41,0.28)]"}`}
            style={{
              left: `calc(50% + ${s.x * spread * size - w / 2}px)`,
              top: s.top * size,
              width: w,
              height: h,
              zIndex: s.z,
              opacity: s.hidden ? 0 : 1,
              borderRadius: compact ? 20 : 24,
              transition: "left 0.85s cubic-bezier(0.65, 0, 0.25, 1), top 0.85s cubic-bezier(0.65, 0, 0.25, 1), width 0.85s cubic-bezier(0.65, 0, 0.25, 1), height 0.85s cubic-bezier(0.65, 0, 0.25, 1), opacity 0.6s ease",
            }}
          >
            <img loading="lazy" src={asset(t.img)} alt={t.label} className={`absolute inset-0 size-full object-cover transition-transform duration-[6000ms] ease-out ${isActive ? "scale-110" : "scale-100"}`} />
            <span className="absolute inset-0 bg-gradient-to-b from-[rgba(5,8,26,0)] from-40% to-[rgba(5,8,26,0.88)]" />
            <span className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-0" style={{ background: `rgba(21,21,25,${s.dim})` }} />

            {/* side label */}
            <span
              className={`absolute bottom-[18px] whitespace-nowrap font-heebo font-bold text-white transition-opacity duration-500 ${rel > 0 ? "left-[18px]" : "right-[18px]"} ${isActive ? "opacity-0" : "opacity-100"}`}
              style={{ fontSize: compact ? 13 : 16 }}
            >
              {t.label}
            </span>

            {/* active content */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? "opacity-100 delay-300" : "pointer-events-none opacity-0"}`}>
              <span
                className="absolute right-[16px] top-[16px] rounded-full bg-white/[0.18] px-[10px] py-[4px] font-heebo font-medium text-white backdrop-blur-[5px]"
                style={{ fontSize: compact ? 11 : 12 }}
              >
                המלצת וידאו · {t.video}
              </span>
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-[8px]" style={{ padding: compact ? "0 18px 18px" : "0 28px 28px" }}>
                <img loading="lazy" src={asset("stars-87.svg")} alt="5 כוכבים" style={{ width: compact ? 68 : 87, height: compact ? 12 : 15 }} />
                <blockquote key={active} className="cf-quote m-0 font-heebo font-medium text-white" style={{ fontSize: compact ? 15 : 19, lineHeight: compact ? "22px" : "29px" }}>
                  {t.quote}
                </blockquote>
                <span className="flex w-full items-center justify-between">
                  <span className="flex flex-col items-start">
                    <span className="font-heebo font-bold text-white" style={{ fontSize: compact ? 14 : 16 }}>
                      שם הלקוח
                    </span>
                    <span className="font-heebo text-white/75" style={{ fontSize: compact ? 11 : 13 }}>
                      {t.role}
                    </span>
                  </span>
                  <button
                    className="pulse-ring flex shrink-0 items-center justify-center rounded-full bg-white transition-transform hover:scale-110"
                    style={{ width: compact ? 42 : 54, height: compact ? 42 : 54 }}
                    aria-label="הפעלת סרטון"
                  >
                    <img loading="lazy" src={asset("icon-play.svg")} alt="" className="ml-[2px]" style={{ width: compact ? 18 : 22, height: compact ? 18 : 22 }} />
                  </button>
                </span>
              </div>
            </div>
          </figure>
        );
      })}
    </div>
  );
}

/** Clickable dots; the active one stretches into a pill. */
export function CoverDots({ active, onActive, small = false }: { active: number; onActive: (i: number) => void; small?: boolean }) {
  const d = small ? 6 : 8;
  return (
    <div className="flex justify-center" style={{ gap: small ? 6 : 8 }} dir="ltr">
      {TESTIMONIALS.map((t, i) => (
        <button
          key={t.label}
          onClick={() => onActive(i)}
          aria-label={`המלצה ${i + 1}`}
          className="rounded-full transition-all duration-500"
          style={{ height: d, width: i === active ? (small ? 20 : 26) : d, background: i === active ? "#5457e0" : "rgba(21,21,25,0.18)" }}
        />
      ))}
    </div>
  );
}
