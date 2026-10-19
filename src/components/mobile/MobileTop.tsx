import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { asset, PixelCluster, SectionTag, Sparkle } from "../ui";

export const m = (name: string) => asset(`m/${name}`);

const PHONE = "054-4228606";
const WA = "https://wa.me/972544228606";

/** White rounded mobile card (dark / gradient variants via className). */
export function MCard({ children, className = "", id, style, dark = false }: { children: ReactNode; className?: string; id?: string; style?: CSSProperties; dark?: boolean }) {
  return (
    <section
      id={id}
      style={style}
      data-reveal
      className={`relative flex flex-col items-start gap-[16px] overflow-hidden rounded-[28px] px-[20px] py-[28px] ${
        dark ? "bg-night" : "bg-white shadow-[0_12px_30px_rgba(91,63,208,0.08)]"
      } ${className}`}
    >
      {children}
    </section>
  );
}

export function MLimeButton({ label, href = "#contact-m" }: { label: string; href?: string }) {
  return (
    <a href={href} className="btn-lime group flex h-[56px] w-full items-center justify-between rounded-[18px] bg-lime pl-[10px] pr-[20px]">
      <span className="font-rubik text-[16px] font-medium leading-[19px] text-ink">{label}</span>
      <img loading="lazy" src={m("arrow-dark-34.svg")} alt="" className="size-[34px] transition-transform group-hover:rotate-45" />
    </a>
  );
}

const glass = "bg-[rgba(21,21,25,0.55)] backdrop-blur-[6px]";

/* ───────────────────────── Hero ───────────────────────── */

const CATALOG = [
  { name: "קבינט LED פנים P2.5", price: "₪1,890", img: "product-p25.png" },
  { name: "מסך LED חוץ P4", price: "₪3,450", img: "product-p4.png" },
  { name: "עמוד פרסום LED Poster", price: "₪8,900", img: "product-poster.png" },
  { name: "מסך LED שקוף", price: "₪5,200", img: "product-transparent.png" },
];


/** Mobile panel outline (design 350×779.2) for width `w`: left features keep x, right ones follow the right edge. */
function mPanelPath(w: number) {
  const R = (x: number) => x + (w - 350);
  const N = R(118); // CTA notch left edge
  return `M0 20C0 8.954 8.954 0 20 0H176C187.046 0 196 8.954 196 20V40C196 51.046 204.954 60 216 60H${R(330)}C${R(341.046)} 60 ${w} 68.954 ${w} 80V685.2C${w} 696.246 ${R(341.046)} 705.2 ${R(330)} 705.2H${N + 20}C${N + 8.954} 705.2 ${N} 714.154 ${N} 725.2V759.2C${N} 770.246 ${N - 8.954} 779.2 ${N - 20} 779.2H81C72.7155 779.2 66 772.484 66 764.2C66 755.916 59.2845 749.2 51 749.2H20C8.954 749.2 0 740.246 0 729.2V20Z`;
}

const HERO_H = 787.2;
const STICKY_RESERVE = 112; // page top padding + hero padding + sticky call bar

/**
 * Scale for the mobile hero so it fits the first screen (down to the "לשיחת ייעוץ חינם" button, above the
 * sticky bar). The canvas widens by 1/scale so it still fills the width. Small height changes caused by the
 * mobile URL bar showing/hiding are ignored so the hero doesn’t jump while scrolling.
 */
function useMobileHeroFit() {
  const ref = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ s: 1, w: 350 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let lastW = 0;
    let lastH = 0;
    const update = () => {
      const cw = el.clientWidth;
      const vh = window.innerHeight;
      if (cw === lastW && Math.abs(vh - lastH) < 140) return;
      lastW = cw;
      lastH = vh;
      const s = Math.max(0.72, Math.min(1, (vh - STICKY_RESERVE) / HERO_H, cw / 350));
      setFit({ s, w: cw / s });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);
  return { ref, ...fit };
}

export function MHero() {
  const { ref, s, w } = useMobileHeroFit();
  return (
    <header id="top" className="flex flex-col gap-[8px] overflow-hidden rounded-[28px] bg-night p-[8px]">
      <div ref={ref} className="relative w-full" style={{ height: HERO_H * s }}>
      <div className="absolute right-0 top-0 origin-top-right" style={{ width: w, height: HERO_H, transform: `scale(${s})` }}>
        {/* Panel (tab + notches) */}
        <div
          className="absolute left-0 top-0 h-[779.2px] w-full overflow-hidden"
          style={{ clipPath: `path("${mPanelPath(w)}")`, backgroundImage: "linear-gradient(121deg, #4b4fd8 0px, #5b4fe0 500px)" }}
        >
          <span className="absolute left-[30px] top-[445.2px] size-[300px]">
            <img loading="lazy" src={m("hero-glow.svg")} alt="" className="absolute inset-[-36.67%] block size-[173.34%] max-w-none" />
          </span>
          <div className="absolute left-0 top-[40px] h-[290px] w-full overflow-hidden">
            <img loading="eager" {...{ fetchpriority: "high" }} src={asset("hero-photo.png")} alt="מסך LED ענק על חזית בניין בלילה" className="ken-burns size-full object-cover" />
          </div>
          <span className="absolute left-0 top-[39px] h-[111px] w-full bg-gradient-to-b from-[#4b4fd8] to-[rgba(75,79,216,0)]" />
          <span className="absolute left-0 top-[180px] h-[151px] w-full bg-gradient-to-b from-[rgba(77,79,218,0)] to-[#4d4fda]" />
        </div>

        {/* Copy */}
        <div className="absolute inset-x-0 top-[269px] flex flex-col items-start gap-[16px] px-[20px]">
          <span data-reveal className="rounded-full border-[1.1px] border-white/85 px-[14px] py-[5px] font-rubik text-[13px] font-medium leading-[15px] text-white">קירות וידאו ומסכי LED</span>
          <h1 className="font-rubik text-[42px] font-bold leading-[44px] tracking-[-0.63px] text-white">
            <span className="block" data-reveal style={{ ["--d" as string]: "120ms" }}>
              <span className="font-extrabold">המסך שלכם</span>
            </span>
            <span className="block" data-reveal style={{ ["--d" as string]: "240ms" }}>
              יעצור <span className="text-lime">כל</span>
            </span>
            <span className="block text-lime" data-reveal style={{ ["--d" as string]: "360ms" }}>
              עובר אורח
            </span>
          </h1>
          <p className="font-heebo text-[15px] leading-[24px] text-white/[0.88]">
            ‏SCREENLED מתכננת, מספקת ומתקינה קירות וידאו ומסכי LED מהיצרנים המובילים בעולם, בהתאמה מלאה לכל גודל ומטרה.
          </p>
          <span className="grow-x h-[1.2px] w-[140px] bg-white/75" />
          <a href={`tel:${PHONE}`} data-reveal style={{ ["--d" as string]: "480ms" }} className="btn-ghost flex h-[52px] w-full items-center justify-between rounded-full bg-white pl-[6px] pr-[16px]">
            <span className="font-mont text-[18px] font-bold leading-[22px] text-ink" dir="ltr">
              {PHONE}
            </span>
            <span className="flex size-[40px] items-center justify-center rounded-full bg-lime">
              <img loading="lazy" src={m("phone.svg")} alt="" className="size-[18px]" />
            </span>
          </a>
          <div className="flex w-full gap-[8px]">
            <a href="#contact-m" className="flex h-[46px] flex-1 items-center justify-center rounded-full border-[1.2px] border-white/80 px-[14px] font-rubik text-[14px] font-medium text-white">
              השאירו פרטים
            </a>
            <a href={WA} className="flex h-[46px] flex-1 items-center justify-center gap-[8px] rounded-full border-[1.2px] border-white/80 px-[14px]">
              <span className="font-rubik text-[14px] font-medium text-white">וואטסאפ</span>
              <img loading="lazy" src={m("whatsapp.svg")} alt="" className="size-[16px]" />
            </a>
          </div>
        </div>

        {/* Top bar */}
        <a href="#contact-m" className="absolute left-[25px] top-[14px] flex items-center gap-[10px]">
          <span className="font-rubik text-[15px] font-medium leading-[18px] text-white">קבלו הצעת מחיר</span>
          <img loading="lazy" src={m("tab-arrow.svg")} alt="" className="size-[32px]" />
        </a>
        <a href="#top" className="absolute right-[4px] top-[16px] flex items-center gap-[6px]" dir="ltr" aria-label="SCREENLED">
          <span className="rounded-[5px] bg-white px-[6px] py-[2px] font-mont text-[13px] font-extrabold leading-[16px] text-ink">SCREEN</span>
          <span className="font-mont text-[15px] font-bold leading-[18px] text-white">LED</span>
        </a>
        <button className="absolute right-[124px] top-[14px] size-[24px]" aria-label="תפריט">
          <img loading="lazy" src={m("menu.svg")} alt="" className="size-full" />
        </button>

        <span className={`absolute left-[16px] top-[76px] flex items-center gap-[6px] rounded-full py-[5px] pl-[10px] pr-[12px] ${glass}`}>
          <span className="font-heebo text-[11px] font-medium leading-[16px] text-white/75">· המסך דולק עכשיו</span>
          <span className="font-mont text-[11px] font-bold leading-[13px] tracking-[1.54px] text-white" dir="ltr">
            LIVE
          </span>
          <span className="relative size-[8px]">
            <span className="live-ring absolute inset-0 rounded-full bg-lime/70" />
            <img loading="lazy" src={m("live-dot.svg")} alt="" className="absolute inset-0 size-full" />
          </span>
        </span>
        <span className={`float-y absolute right-[14px] top-[206px] rounded-full border border-white/[0.18] px-[10px] py-[4px] font-rubik text-[11px] font-medium leading-[13px] text-white ${glass}`}>
          חזית מסחרית · מרכז העיר
        </span>
        <Sparkle src="m/sparkle-10.svg" size={10} style={{ left: 40, top: 320 }} />
        <Sparkle src="m/sparkle-6.svg" size={6} style={{ left: 24, top: 340 }} />

        {/* Bottom: rating, dots, CTA */}
        <span className="absolute left-[82px] top-[715.2px] flex flex-col items-center gap-[2px]">
          <span className="relative size-[13px]">
            <span className="absolute inset-[0_2.45%_9.55%_2.45%]">
              <img loading="lazy" src={asset("star-rating.svg")} alt="" className="block size-full" />
            </span>
          </span>
          <span className="font-mont text-[13px] font-bold leading-[16px] text-white">5.0</span>
        </span>
        <span className="absolute left-[12.5px] top-[761.2px] flex gap-[4px]" dir="ltr" aria-hidden>
          <span className="h-[5px] w-[14px] rounded-[3px] bg-white" />
          <span className="size-[5px] rounded-[3px] bg-[#7c7cf0]" />
          <span className="size-[5px] rounded-[3px] bg-[#7c7cf0]" />
          <span className="size-[5px] rounded-[3px] bg-[#7c7cf0]" />
        </span>
        <a href="#contact-m" data-reveal="scale" style={{ ["--d" as string]: "600ms" }} className="btn-lime absolute right-0 top-[713.2px] flex h-[74px] w-[224px] items-center justify-between rounded-[18px] bg-lime pl-[10px] pr-[18px]">
          <span className="font-rubik text-[16px] font-medium leading-[19px] text-ink">לשיחת ייעוץ חינם</span>
          <img loading="lazy" src={m("arrow-dark-34.svg")} alt="" className="size-[34px]" />
        </a>
      </div>
      </div>

      {/* Quick catalog */}
      <div className="flex flex-col items-start gap-[10px] px-[8px] pb-[10px] pt-[4px]">
        <span className="flex items-center gap-[6px]">
          <img loading="lazy" src={asset("dot-lime.svg")} alt="" className="size-[7px]" />
          <span className="font-heebo text-[13px] font-medium leading-[19px] text-white">ניווט מהיר לקטלוג</span>
        </span>
        <div className="grid w-full grid-cols-2 gap-[8px]">
          {CATALOG.map((c, i) => (
            <a key={c.name} href="#products-m" data-reveal style={{ ["--d" as string]: `${i * 80}ms` }} className="btn-lime flex h-[62px] items-center gap-[8px] rounded-[16px] bg-lime py-[6px] pl-[10px] pr-[6px]">
              <img loading="lazy" src={asset(c.img)} alt="" className="size-[48px] shrink-0 rounded-[11px] object-cover" />
              <span className="flex min-w-0 flex-1 flex-col gap-px">
                <span className="font-rubik text-[13px] font-semibold leading-[16px] text-ink">{c.name}</span>
                <span className="font-rubik text-[11px] leading-[13px] text-ink/65">החל מ- {c.price}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

/* ───────────────────────── Marquee ───────────────────────── */

const M_DOMAINS = ["קירות וידאו", "פרסום חוצות", "חנויות וקניונים", "מוזיאונים", "אירועים ותערוכות"];

export function MMarquee() {
  const set = M_DOMAINS.map((d) => (
    <span key={d} className="flex shrink-0 items-center gap-[14px] pr-[14px]">
      <span className="whitespace-nowrap font-heebo text-[16px] font-bold leading-[24px] text-ink" dir="rtl">
        {d}
      </span>
      <img loading="lazy" src={m("marquee-star.svg")} alt="" className="size-[10px]" />
    </span>
  ));
  return (
    <div className="marquee-hover relative h-[52px] overflow-hidden rounded-full bg-lime" aria-label="תחומי פעילות">
      <div className="marquee-track-m absolute left-0 top-[14px] flex" dir="ltr">
        {set}
        {set}
      </div>
    </div>
  );
}

/* ───────────────────────── Why us ───────────────────────── */

const WHY = [
  { title: "טכנולוגיה מהמותגים המובילים", desc: "חדות, בהירות ונאמנות צבע ברמה הגבוהה ביותר, בלי פשרות.", icon: "why-1.svg" },
  { title: "מערכות מודולריות", desc: "כל צורה, גודל ותצורה, כולל מסכים מעוגלים ופינתיים.", icon: "why-2.svg" },
  { title: "עיצוב נקי", desc: "מסגרות דקות ותכנון שמבליט את התוכן ולא את החומרה.", icon: "why-3.svg" },
  { title: "הכל אצלנו", desc: "תכנון הנדסי, התקנה, תוכנה לניהול תוכן ותחזוקה שוטפת.", icon: "why-4.svg" },
];

export function MWhyUs() {
  const [active, setActive] = useState(0);
  // The highlighted benefit advances on its own (tapping a row restarts the timer).
  useEffect(() => {
    const t = window.setInterval(() => setActive((a) => (a + 1) % WHY.length), 3800);
    return () => window.clearInterval(t);
  }, [active]);
  return (
    <MCard id="why-m">
      <PixelCluster color="indigo" small style={{ left: 16, top: 16 }} />
      <SectionTag label="למה SCREENLED" num="01" small />
      <h2 className="font-rubik text-[34px] font-bold leading-[40px] tracking-[-0.34px] text-navy">
        כל מה שצריך למסך <span className="text-indigo">מושלם.</span>
      </h2>
      <p className="font-heebo text-[15px] leading-[24px] text-slate-muted">צוות אחד שמלווה אתכם מהבחירה בטכנולוגיה ועד התחזוקה השוטפת.</p>
      <div className="relative h-[280px] w-full overflow-hidden rounded-[22px]">
        <img loading="lazy" src={asset("macro-led.png")} alt="תקריב של פיקסלים במסך LED" className="ken-burns absolute inset-0 size-full object-cover" />
        <span className="absolute left-[70px] top-[90px] size-[78px]">
          <img loading="lazy" src={m("magnifier.svg")} alt="" className="absolute inset-[-17.95%] block size-[135.9%] max-w-none" />
        </span>
        <span className="absolute inset-x-0 bottom-0 h-[130px] bg-gradient-to-b from-[rgba(10,14,41,0)] to-[rgba(10,14,41,0.85)]" />
        <img loading="lazy" src={m("dot-lime-5.svg")} alt="" className="absolute left-[106.5px] top-[126.5px] size-[5px]" />
        <span className="absolute left-[148px] top-[129px] h-[1.2px] w-[30px] bg-lime/80" />
        <span className={`absolute left-[178px] top-[118px] whitespace-nowrap rounded-full border border-white/[0.18] px-[10px] py-[4px] font-rubik text-[11px] font-medium leading-[13px] text-white ${glass}`}>
          פיקסל אמיתי, מקרוב
        </span>
        <p className="absolute bottom-[16px] right-[16px] font-heebo text-[15px] font-medium leading-[22px] text-white">
          כל פיקסל במקום.
          <br />
          זה ההבדל שרואים מקרוב.
        </p>
        <span className="absolute bottom-[18px] left-[16px] font-mont text-[11px] font-medium leading-[13px] tracking-[1.1px] text-white/70" dir="ltr">
          01 / 04
        </span>
      </div>
      <ul className="flex w-full flex-col gap-[16px]">
        {WHY.map((w, i) => {
          const on = i === active;
          return (
            <li
              key={w.title}
              onClick={() => setActive(i)}
              className={`flex items-start gap-[12px] py-[16px] transition-colors duration-500 ${on ? "border-b-2 border-indigo" : "border-b border-[rgba(18,22,51,0.12)]"}`}
            >
              <span className={`font-mont text-[12px] font-medium leading-[15px] ${on ? "text-indigo" : "text-slate-muted"}`} dir="ltr">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-[4px]">
                <span className={`font-rubik text-[19px] leading-[26px] ${on ? "font-bold text-indigo" : "font-semibold text-navy"}`}>{w.title}</span>
                <span className="font-heebo text-[14px] leading-[22px] text-slate-muted">{w.desc}</span>
              </span>
              <img loading="lazy" src={m(w.icon)} alt="" className={`size-[26px] shrink-0 transition-transform duration-500 ${on ? "-rotate-6 scale-110" : ""}`} />
            </li>
          );
        })}
      </ul>
      <MLimeButton label="דברו עם מומחה" />
    </MCard>
  );
}

/* ───────────────────────── Products ───────────────────────── */

const M_PRODUCTS = [
  { name: "קבינט LED פנים P2.5", spec: "פנים · 800 nits", price: "₪1,890", img: "product-p25.png", cart: true, best: true },
  { name: "מסך LED חוץ P4", spec: "חוץ · IP65", price: "₪3,450", img: "product-p4.png", cart: false },
  { name: "עמוד פרסום LED Poster", spec: "פנים · נייד על גלגלים", price: "₪8,900", img: "product-poster.png", cart: true },
  { name: "מסך LED שקוף", spec: "שקיפות 70% · לחלונות", price: "₪5,200", img: "product-transparent.png", cart: false },
];

function TrustPill({ children }: { children: string }) {
  return (
    <span className="flex items-center gap-[5px] rounded-full border border-[rgba(18,22,51,0.14)] px-[10px] py-[5px]">
      <img loading="lazy" src={m("check-12.svg")} alt="" className="size-[12px]" />
      <span className="font-heebo text-[12px] font-medium leading-[18px] text-navy">{children}</span>
    </span>
  );
}

export function MProducts() {
  return (
    <MCard id="products-m">
      <PixelCluster color="indigo" small style={{ left: 16, top: 16 }} />
      <SectionTag label="מוצרים מובילים" num="02" small />
      <h2 className="font-rubik text-[32px] font-bold leading-[38px] tracking-[-0.32px] text-navy">
        הנבחרים <span className="text-indigo">מהקטלוג שלנו</span>
      </h2>
      <div className="flex w-full flex-wrap gap-[6px]">
        <TrustPill>משלוח או איסוף</TrustPill>
        <TrustPill>התקנה מקצועית</TrustPill>
        <TrustPill>תשלומים נוחים</TrustPill>
      </div>
      <div className="grid w-full grid-cols-2 gap-[10px]">
        {M_PRODUCTS.map((p, i) => (
          <article key={p.name} data-reveal style={{ ["--d" as string]: `${(i % 2) * 100}ms` }} className="card-lift relative flex h-[244px] flex-col overflow-hidden rounded-[18px] border border-[rgba(18,22,51,0.07)] bg-white shadow-[0_8px_20px_rgba(27,33,64,0.07)]">
            <img loading="lazy" src={asset(p.img)} alt={p.name} className="h-[118px] w-full shrink-0 object-cover" />
            {p.best && (
              <span className="absolute right-[4px] top-[8px] rounded-full bg-lime px-[8px] py-[3px] font-rubik text-[10px] font-medium leading-[12px] text-ink">✦ הנמכר ביותר</span>
            )}
            <div className="flex flex-col items-start gap-[4px] p-[10px]">
              <h3 className="font-heebo text-[13px] font-bold leading-[17px] text-navy">{p.name}</h3>
              <p className="font-heebo text-[11px] leading-[16px] text-slate-muted">{p.spec}</p>
              <div className="flex items-baseline gap-[4px]">
                <span className="font-heebo text-[10px] text-slate-muted">החל מ-</span>
                <span className="font-heebo text-[17px] font-bold leading-[25px] text-indigo">{p.price}</span>
              </div>
              {p.cart ? (
                <button className="btn-lime flex h-[34px] w-full items-center justify-center rounded-full bg-lime font-rubik text-[12px] font-semibold text-ink">להוספה לסל</button>
              ) : (
                <a href="#contact-m" className="flex h-[34px] w-full items-center justify-center rounded-full border-[1.2px] border-indigo font-rubik text-[12px] font-semibold text-indigo">
                  להצעת מחיר
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <MLimeButton label="לכל הקטלוג" href="#products-m" />
    </MCard>
  );
}

/* ───────────────────────── Projects ───────────────────────── */

// % of the 326px gallery width
const M_PANELS = [
  { img: "project-5.png", left: -38.04 },
  { img: "project-4.png", left: -2.45 },
  { img: "project-3.png", left: 33.13 },
  { img: "project-2.png", left: 68.71 },
  { img: "project-1.png", left: 104.29 },
];

const wallMask: CSSProperties = {
  WebkitMaskImage: `url(${m("wall-mask.svg")})`,
  maskImage: `url(${m("wall-mask.svg")})`,
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
};

export function MProjects() {
  return (
    <MCard id="projects-m" dark className="items-center">
      <PixelCluster color="lime" small style={{ left: 16, top: 16 }} />
      <SectionTag label="פרויקטים מהשטח" num="03" dark small />
      <h2 className="text-center font-rubik text-[30px] font-bold leading-[36px] tracking-[-0.3px] text-white">
        לא תמונות מקטלוג. <span className="text-lime">פרויקטים אמיתיים שהתקנו.</span>
      </h2>
      <div className="relative h-[270px] w-full overflow-hidden">
        <img loading="lazy" src={m("rim.svg")} alt="" className="absolute inset-0 size-full" />
        <div className="absolute inset-x-0 top-[10px] h-[250px]" style={wallMask}>
          {M_PANELS.map((p) => (
            <img key={p.img} loading="lazy" src={asset(p.img)} alt="" className="absolute top-0 h-full object-cover" style={{ left: `${p.left}%`, width: "33.74%" }} />
          ))}
          <span className="absolute inset-0" style={{ backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.55) 100%)" }} />
        </div>
        <span className="absolute left-1/2 top-[196px] -translate-x-1/2 whitespace-nowrap rounded-full border border-white/[0.18] bg-[rgba(21,21,25,0.6)] px-[10px] py-[4px] font-rubik text-[11px] font-medium leading-[13px] text-white backdrop-blur-[6px]">
          מסך פינתי 3D · חזית מסחרית
        </span>
      </div>
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-[6px] rounded-full border border-white/25 px-[12px] py-[5px]">
          <img loading="lazy" src={asset("icon-drag.svg")} alt="" className="size-[14px]" />
          <span className="font-rubik text-[12px] font-medium leading-[14px] text-white">החליקו לצפייה</span>
        </span>
        <span className="relative h-[2px] w-[70px] overflow-hidden rounded-[1px] bg-white/15">
          <span className="grow-x absolute right-0 top-0 h-[2px] w-[18px] rounded-[1px] bg-lime" />
        </span>
        <span className="font-mont text-[12px] font-medium leading-[15px] text-white/60" dir="ltr">
          01 / 05
        </span>
      </div>
      <MLimeButton label="לכל הפרויקטים" href="#projects-m" />
    </MCard>
  );
}

/* ───────────────────────── Problem & solution ───────────────────────── */

export function MProblemSolution() {
  const [after, setAfter] = useState(true);
  const seg = (on: boolean) => `rounded-full px-[14px] py-[5px] font-rubik text-[13px] leading-[15px] ${on ? "bg-lime font-semibold text-ink" : "font-medium text-white/70"}`;
  return (
    <MCard id="solution-m" className="!pb-[56px]">
      <div className="relative h-[300px] w-full overflow-hidden rounded-[22px]">
        <img loading="lazy"
          src={asset("solution.png")}
          alt="חלון ראווה עם מסך LED"
          className="ken-burns absolute inset-0 size-full object-cover transition-[filter] duration-500"
          style={{ filter: after ? "none" : "grayscale(1) brightness(0.55)" }}
        />
        <div className="absolute left-[14px] top-[14px] flex gap-[4px] rounded-full bg-[rgba(21,21,25,0.6)] p-[4px] backdrop-blur-[6px]">
          <button onClick={() => setAfter(false)} className={seg(!after)}>
            לפני
          </button>
          <button onClick={() => setAfter(true)} className={seg(after)}>
            אחרי
          </button>
        </div>
        <span className="absolute bottom-[14px] right-[14px] rounded-full border border-white/[0.18] bg-[rgba(21,21,25,0.6)] px-[10px] py-[4px] font-rubik text-[11px] font-medium leading-[13px] text-white backdrop-blur-[6px]">
          חלון ראווה · מסך LED
        </span>
      </div>
      <span className="rounded-full bg-night px-[12px] py-[4px] font-rubik text-[12px] font-semibold leading-[14px] text-white">הבעיה</span>
      <h2 className="font-rubik text-[26px] font-bold leading-[32px] text-navy">תצוגה בינונית היא כסף שהולך לאיבוד</h2>
      <p className="font-heebo text-[15px] leading-[25px] text-slate-muted">
        הלקוחות שלכם מוצפים במסרים מכל כיוון. שלט רגיל או מסך עמום פשוט לא נקלטים. אם התצוגה עצמה לא מרשימה, המסר לא מגיע ליעדו והלקוח ממשיך הלאה.
      </p>
      <span className="h-px w-full bg-[rgba(18,22,51,0.1)]" />
      <span className="rounded-full bg-lime px-[12px] py-[4px] font-rubik text-[12px] font-semibold leading-[14px] text-ink">הפתרון</span>
      <h2 className="font-rubik text-[26px] font-bold leading-[32px] text-navy">
        תצוגה שמושכת את הקהל <span className="text-indigo">פנימה</span>
      </h2>
      <p className="font-heebo text-[15px] leading-[25px] text-slate-muted">
        אנחנו לא רק מתקינים מסכים. אנחנו מתכננים חוויה ויזואלית שמציבה את העסק שלכם במרכז והופכת עוברים ושבים ללקוחות.
      </p>
      <MLimeButton label="לשיחת ייעוץ חינם" />
      <PixelCluster color="indigo" small style={{ left: 16, bottom: 16 }} />
    </MCard>
  );
}
