import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { countUp } from "../useReveal";
import { asset, PixelCluster, SectionTag } from "../ui";
import { m, MCard, MLimeButton } from "./MobileTop";

const PHONE = "054-4228606";
const WA = "https://wa.me/972544228606";

/* ───────────────────────── Domains (bento) ───────────────────────── */

const blur = "bg-[rgba(21,21,25,0.5)] backdrop-blur-[5px]";
const violet = (deg: number) => ({ backgroundImage: `linear-gradient(${deg}deg, #4b4fd8 0%, #6a55e8 71.429%)` });

function Index({ n, className = "" }: { n: string; className?: string }) {
  return (
    <span className={`absolute top-[12px] rounded-full px-[7px] py-[2px] font-mont text-[10px] font-medium leading-[12px] tracking-[0.6px] text-white ${blur} ${className}`} dir="ltr">
      {n}
    </span>
  );
}

function TileArrow() {
  return (
    <span className="absolute left-[12px] top-[12px] size-[28px] rounded-full border-[1.2px] border-white/70">
      <img loading="lazy" src={m("tile-arrow.svg")} alt="" className="absolute left-[5.1px] top-[5.1px] size-[15.4px]" />
    </span>
  );
}

function PhotoTile({ img, n, title, sub, h, titleTop, className = "", shadeTop = 0 }: { img: string; n: string; title: ReactNode; sub?: string; h: number; titleTop: number; className?: string; shadeTop?: number }) {
  return (
    <a href="#contact-m" data-reveal className={`zoom-parent relative block overflow-hidden rounded-[18px] ${className}`} style={{ height: h }}>
      <img loading="lazy" src={asset(img)} alt="" className="zoom-img absolute inset-0 size-full object-cover" />
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-[rgba(5,8,26,0)] to-[rgba(5,8,26,0.85)]" style={{ top: shadeTop }} />
      <Index n={n} className="right-[12px]" />
      <TileArrow />
      <span className="absolute right-[14px] font-heebo text-[16px] font-bold leading-[20px] text-white" style={{ top: titleTop }}>
        {title}
      </span>
      {sub && (
        <span className="absolute right-[14px] font-heebo text-[11px] leading-[16px] text-white/80" style={{ top: titleTop + 22 }}>
          {sub}
        </span>
      )}
    </a>
  );
}

export function MDomains() {
  return (
    <MCard id="domains-m" dark>
      <PixelCluster color="lime" small style={{ left: 16, top: 16 }} />
      <div className="flex w-full items-center pl-[34px]">
        <div className="flex items-center gap-[10px]">
          <SectionTag label="תחומי פעילות" num="04" dark small />
          <span className="rounded-full bg-lime px-[12px] py-[5px] font-rubik text-[12px] font-semibold leading-[14px] text-ink">6 תחומים</span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-[8px] rounded-[24px] bg-[#1c1c22] p-[8px]">
        {/* Hero tile */}
        <a href="#contact-m" data-reveal className="relative block h-[200px] overflow-hidden rounded-[18px]">
          <img loading="lazy" src={asset("domain-stores.png")} alt="" className="ken-burns absolute inset-0 size-full object-cover" />
          <span className="absolute inset-x-0 bottom-0 top-[50px] bg-gradient-to-b from-[rgba(5,8,26,0)] to-[rgba(5,8,26,0.85)]" />
          <Index n="01" className="right-[12px]" />
          <TileArrow />
          <span className="absolute right-[14px] top-[136px] whitespace-nowrap font-rubik text-[28px] font-bold leading-[32px] tracking-[-0.28px] text-white">חנויות וקניונים</span>
          <span className="absolute right-[14px] top-[170px] whitespace-nowrap font-heebo text-[11px] leading-[16px] text-white/80">הלקוחות ייכנסו כי הם לא יוכלו שלא להסתכל</span>
        </a>

        {/* Masonry */}
        <div className="flex gap-[8px]">
          <div className="flex min-w-0 flex-1 flex-col gap-[8px]">
            <PhotoTile img="domain-outdoor.png" n="02" title="פרסום חוצות" sub="בכל מזג אוויר" h={238} titleTop={186} shadeTop={88} />
            <div className="relative h-[196px] overflow-hidden rounded-[18px] bg-[#b4b2ff]">
              <img loading="lazy" src={asset("domain-cinema.png")} alt="" className="absolute left-[12px] right-[12px] top-[80px] h-[104px] w-[calc(100%-24px)] rounded-[10px] object-cover shadow-[0_8px_16px_rgba(0,0,0,0.3)]" />
              <span className="absolute right-[12px] top-[12px] font-heebo text-[15px] font-bold leading-[19px] text-navy">
                קולנוע ביתי
                <br />
                ואולמות
              </span>
              <span className={`absolute left-[12px] top-[14px] rounded-full px-[7px] py-[2px] font-mont text-[10px] font-medium leading-[12px] tracking-[0.6px] text-white ${blur}`} dir="ltr">
                03
              </span>
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-[8px]">
            <div className="relative h-[150px] overflow-hidden rounded-[18px]" style={violet(143.31)}>
              <span className="absolute left-[8px] top-[84px] font-mont text-[72px] font-bold leading-[72px] text-white/[0.18]">6</span>
              <span className="absolute right-[12px] top-[14px] font-heebo text-[10px] font-bold leading-[15px] text-lime">תחומי פעילות</span>
              <span className="absolute right-[12px] top-[35px] font-heebo text-[17px] font-bold leading-[21px] text-white">
                פתרון מותאם
                <br />
                <span className="text-lime">לכל תחום</span>
              </span>
              <span className="absolute right-[12px] top-[83px] font-heebo text-[11px] leading-[15px] text-white/75">
                עמוד, מפרט ופרויקטים
                <br />
                לכל עולם.
              </span>
            </div>
            <PhotoTile img="domain-museum.png" n="04" title="מוזיאונים" h={138} titleTop={104} />
            <PhotoTile
              img="testi-production.png"
              n="05"
              title={
                <>
                  אירועים
                  <br />
                  ותערוכות
                </>
              }
              h={138}
              titleTop={84}
            />
          </div>
        </div>

        {/* Wide tile */}
        <PhotoTile img="domain-pool.png" n="06" title="חצר ובריכה" sub="המסך שעובד גם בחוץ, כל השנה" h={140} titleTop={88} />

        {/* Actions */}
        <div className="flex items-center gap-[8px]">
          <a href="#contact-m" className="btn-lime flex h-[52px] min-w-0 flex-1 items-center justify-between rounded-[18px] bg-lime pl-[8px] pr-[16px]">
            <span className="font-rubik text-[14px] font-semibold leading-[17px] text-ink">ייעוץ לפי תחום</span>
            <img loading="lazy" src={asset("arrow-dark-32.svg")} alt="" className="size-[32px]" />
          </a>
          <button className="btn-ghost relative size-[52px] shrink-0 rounded-full border-[1.2px] border-white/35" aria-label="הקודם">
            <img loading="lazy" src={m("prev.svg")} alt="" className="absolute left-[13.8px] top-[13.8px] size-[22px]" />
          </button>
          <button className="btn-ghost relative size-[52px] shrink-0 rounded-full" style={violet(143.13)} aria-label="הבא">
            <img loading="lazy" src={m("next.svg")} alt="" className="absolute left-[15px] top-[15px] size-[22px]" />
          </button>
        </div>
      </div>
    </MCard>
  );
}

/* ───────────────────────── How it works ───────────────────────── */

const STEPS = [
  { title: "שיחת איפיון", desc: "מבינים יעדים, מיקום ותקציב וממליצים על הטכנולוגיה.", img: "project-5.png" },
  { title: "תכנון הנדסי ועיצובי", desc: "גודל, רזולוציה וקונסטרוקציה. הכל סגור מראש.", img: "product-p4.png" },
  { title: "התקנה ומסירה", desc: "מתקינים, מגדירים תוכן ומדריכים אתכם.", img: "project-4.png" },
];

export function MHowItWorks() {
  return (
    <MCard id="process-m">
      <PixelCluster color="indigo" small style={{ left: 16, top: 16 }} />
      <div className="flex w-full items-center justify-between border-b border-[rgba(18,22,51,0.14)] pb-[12px] pl-[34px]">
        <SectionTag label="איך זה עובד" num="05" small />
        <span className="font-heebo text-[12px] font-medium leading-[18px] tracking-[0.48px] text-slate-muted">תהליך עבודה · 3 שלבים</span>
      </div>
      <h2 className="sd-text font-rubik text-[44px] font-bold leading-[44px] tracking-[-1.1px] text-navy">
        שלושה צעדים למסך המושלם<span className="text-indigo">.</span>
      </h2>
      <div className="flex w-full items-center gap-[16px]">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-[10px]">
          <p className="font-heebo text-[14px] leading-[22px] text-slate-muted">בלי הפתעות ובלי כאבי ראש. תהליך אחד, ברור ושקוף.</p>
          <span className="flex items-center gap-[5px] rounded-full border border-[rgba(18,22,51,0.14)] px-[10px] py-[4px]">
            <img loading="lazy" src={m("check-12.svg")} alt="" className="size-[12px]" />
            <span className="font-rubik text-[12px] font-medium leading-[14px] text-navy">ללא התחייבות</span>
          </span>
        </div>
        <div className="pulse-ring relative size-[104px] shrink-0">
          <span className="orbit pointer-events-none absolute left-[-9px] top-[-8.8px] size-[122px]" aria-hidden>
            <img loading="lazy" src={m("orbit-ring.png")} alt="" className="absolute inset-0 size-full" />
            <img loading="lazy" src={m("orbit-sat.svg")} alt="" className="absolute left-[57px] top-[-4px] size-[8px]" />
          </span>
          <a href="#contact-m" className="btn-lime absolute inset-0 flex items-start justify-center rounded-full bg-lime pt-[30px] text-center font-rubik text-[13px] font-bold leading-[17px] text-ink">
            קבעו
            <br />
            שיחת איפיון
          </a>
        </div>
      </div>
      <ol className="w-full">
        {STEPS.map((s, i) => (
          <li key={s.title} data-reveal style={{ ["--d" as string]: `${i * 110}ms` }} className={`step-row flex items-center gap-[12px] border-t border-[rgba(18,22,51,0.14)] py-[14px] ${i === STEPS.length - 1 ? "border-b" : ""}`}>
            <span className="outline-num sd-slide font-mont text-[40px] font-light leading-[40px] tracking-[-1.2px] [-webkit-text-stroke-width:1px]" dir="ltr">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
              <span className="font-rubik text-[18px] font-semibold leading-[23px] tracking-[-0.09px] text-navy">{s.title}</span>
              <span className="font-heebo text-[13px] leading-[19px] text-slate-muted">{s.desc}</span>
            </span>
            <span className="size-[76px] shrink-0 overflow-hidden rounded-[14px]">
              <img loading="lazy" src={asset(s.img)} alt={s.title} className="sd-parallax size-full object-cover" />
            </span>
          </li>
        ))}
      </ol>
    </MCard>
  );
}

/* ───────────────────────── Testimonials ───────────────────────── */

function SideCard({ img, label, className, labelRight, labelSize }: { img: string; label: string; className: string; labelRight: number; labelSize: number }) {
  return (
    <div className={`absolute top-[45px] h-[290px] w-[170px] overflow-hidden rounded-[20px] shadow-[0_18px_36px_rgba(10,14,41,0.28)] ${className}`}>
      <img loading="lazy" src={asset(img)} alt={label} className="absolute inset-0 size-full object-cover" />
      <span className="absolute inset-x-0 bottom-0 h-[159.5px] bg-gradient-to-b from-[rgba(5,8,26,0)] to-[rgba(5,8,26,0.85)]" />
      <span className="absolute inset-0 bg-[rgba(10,14,41,0.3)]" />
      <span className="absolute top-[255px] whitespace-nowrap font-heebo font-bold text-white" style={{ right: labelRight, fontSize: labelSize, lineHeight: "19px" }}>
        {label}
      </span>
    </div>
  );
}

export function MTestimonials() {
  const rating = useRef<HTMLSpanElement>(null);
  useEffect(() => countUp(rating.current, 5, 1), []);
  return (
    <MCard id="testimonials-m" className="items-center">
      <PixelCluster color="indigo" small style={{ left: 16, top: 16 }} />
      <span className="pointer-events-none absolute right-[46px] top-[10px] font-mont text-[180px] font-bold leading-[150px] text-[rgba(84,87,224,0.07)]" aria-hidden>
        ”
      </span>
      <SectionTag label="המלצות" num="06" small />
      <h2 className="sd-text text-center font-rubik text-[30px] font-bold leading-[36px] tracking-[-0.3px] text-navy">
        מה הלקוחות שלנו <span className="text-indigo">אומרים</span>
      </h2>
      <div className="flex items-center gap-[10px] rounded-[16px] border border-[rgba(18,22,51,0.08)] bg-white px-[16px] py-[10px]">
        <span className="font-mont text-[28px] font-bold leading-[34px] text-indigo" dir="ltr">
          G
        </span>
        <span ref={rating} className="font-mont text-[28px] font-bold leading-[34px] text-navy" dir="ltr">
          5.0
        </span>
        <span className="flex flex-col items-start gap-[2px]">
          <img loading="lazy" src={m("stars-73.svg")} alt="5 כוכבים" className="h-[13px] w-[73px]" />
          <span className="font-heebo text-[11px] leading-[16px] text-slate-muted">על סמך ביקורות בגוגל</span>
        </span>
      </div>
      <div className="relative h-[380px] w-[326px] shrink-0">
        <SideCard img="domain-museum.png" label="מוזיאון" className="left-[-60px]" labelRight={84} labelSize={13} />
        <SideCard img="testi-production.png" label="חברת הפקות" className="left-[216px]" labelRight={66} labelSize={11} />
        <figure className="absolute left-[45px] top-0 m-0 h-[380px] w-[236px] overflow-hidden rounded-[20px] shadow-[0_18px_36px_rgba(10,14,41,0.28)]">
          <img loading="lazy" src={asset("project-2.png")} alt="קיר וידאו באטריום קניון" className="absolute inset-0 size-full object-cover" />
          <span className="absolute inset-x-0 bottom-0 h-[209px] bg-gradient-to-b from-[rgba(5,8,26,0)] to-[rgba(5,8,26,0.85)]" />
          <span className="absolute right-[14px] top-[14px] rounded-full bg-white/[0.18] px-[10px] py-[4px] font-rubik text-[11px] font-medium leading-[13px] text-white backdrop-blur-[6px]">המלצת וידאו · 0:48</span>
          <figcaption className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-[8px] px-[18px] pb-[18px]">
            <img loading="lazy" src={m("stars-68.svg")} alt="5 כוכבים" className="h-[12px] w-[68px]" />
            <blockquote className="m-0 font-heebo text-[15px] font-medium leading-[22px] text-white">המסך בכניסה שינה את התנועה במתחם. אנשים עוצרים, מצלמים ונכנסים.</blockquote>
            <span className="flex w-full items-center justify-between">
              <span className="flex flex-col items-start">
                <span className="font-heebo text-[14px] font-bold leading-[21px] text-white">שם הלקוח</span>
                <span className="font-heebo text-[11px] leading-[16px] text-white/70">מנהל/ת שיווק · קניון</span>
              </span>
              <button className="pulse-ring relative size-[42px] rounded-full bg-white" aria-label="הפעלת סרטון">
                <img loading="lazy" src={m("play.svg")} alt="" className="absolute left-[13px] top-[12px] size-[18px]" />
              </button>
            </span>
          </figcaption>
        </figure>
      </div>
      <div className="flex gap-[6px]" dir="ltr" aria-hidden>
        <span className="size-[6px] rounded-[3px] bg-[rgba(18,22,51,0.18)]" />
        <span className="size-[6px] rounded-[3px] bg-[rgba(18,22,51,0.18)]" />
        <span className="h-[6px] w-[20px] rounded-[3px] bg-indigo" />
        <span className="size-[6px] rounded-[3px] bg-[rgba(18,22,51,0.18)]" />
        <span className="size-[6px] rounded-[3px] bg-[rgba(18,22,51,0.18)]" />
      </div>
      <MLimeButton label="לכל ההמלצות" href="#testimonials-m" />
    </MCard>
  );
}

/* ───────────────────────── CTA + form ───────────────────────── */

const TYPES = ["מוזיאון", "אירוע", "פרטי", "אחר", "חוצות", "חנות", "אולם"];
const CHECKS = ["ייעוץ מקצועי ללא התחייבות", "התאמה לתקציב, לגודל ולמטרה", "ליווי מלא מהתכנון ועד התחזוקה"];
const field = "w-full rounded-[12px] border border-[#dfe2ee] bg-[#f4f5fa] px-[14px] font-rubik text-[15px] text-navy outline-none placeholder:text-[#8a8fa8] focus:border-indigo focus:bg-white";

export function MContact() {
  const [type, setType] = useState("חוצות");
  const [optIn, setOptIn] = useState(false);
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="contact-m"
      data-reveal
      className="sd-zoom relative flex flex-col items-start gap-[16px] overflow-hidden rounded-[28px] px-[20px] py-[28px]"
      style={{ backgroundImage: "linear-gradient(116.035deg, #4b4fd8 0%, #6a55e8 71.429%)" }}
    >
      <span className="pointer-events-none absolute left-[-80px] top-[120px] size-[320px]" aria-hidden>
        <img loading="lazy" src={m("cta-glow.svg")} alt="" className="absolute inset-[-37.5%] block size-[175%] max-w-none" />
      </span>
      <PixelCluster color="lime" small style={{ left: 16, top: 16 }} />
      <SectionTag label="בואו נתחיל" num="07" dark small className="relative" />
      <h2 className="sd-text relative font-rubik text-[34px] font-bold leading-[40px] tracking-[-0.34px] text-white">
        המסך הבא שלכם <span className="shimmer">מתחיל כאן</span>
      </h2>
      <p className="relative font-rubik text-[15px] leading-[24px] text-white/80">עשרות פרויקטים בארץ ובעולם. ספרו לנו מה אתם מתכננים, ונהפוך את הרעיון למציאות.</p>
      {CHECKS.map((c, i) => (
        <span key={c} data-reveal="right" style={{ ["--d" as string]: `${i * 100}ms` }} className="relative flex items-center gap-[10px]">
          <span className="flex size-[22px] items-center justify-center rounded-full bg-lime">
            <img loading="lazy" src={m("check-dark-12.svg")} alt="" className="size-[12px]" />
          </span>
          <span className="font-rubik text-[15px] font-medium leading-[18px] text-white">{c}</span>
        </span>
      ))}
      <div className="relative flex w-full gap-[8px]">
        <a href={`tel:${PHONE}`} className="flex h-[48px] min-w-0 flex-1 items-center justify-center gap-[8px] rounded-full border-[1.2px] border-white/80 px-[12px]">
          <span className="font-mont text-[14px] font-bold leading-[17px] text-white" dir="ltr">
            {PHONE}
          </span>
          <img loading="lazy" src={m("phone-white.svg")} alt="" className="size-[16px]" />
        </a>
        <a href={WA} className="flex h-[48px] min-w-0 flex-1 items-center justify-center gap-[8px] rounded-full border-[1.2px] border-white/80 px-[12px]">
          <span className="font-rubik text-[14px] font-medium leading-[17px] text-white">וואטסאפ</span>
          <img loading="lazy" src={m("whatsapp.svg")} alt="" className="size-[16px]" />
        </a>
      </div>

      <form onSubmit={submit} data-reveal className="relative flex w-full flex-col items-start gap-[12px] rounded-[22px] bg-white px-[18px] pb-[20px] pt-[22px] shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
        <span className="flex items-center gap-[5px] rounded-full bg-lime px-[10px] py-[4px]">
          <img loading="lazy" src={m("clock.svg")} alt="" className="size-[12px]" />
          <span className="font-rubik text-[12px] font-medium leading-[14px] text-ink">מענה תוך יום עסקים</span>
        </span>
        <h3 className="font-rubik text-[22px] font-bold leading-[26px] text-navy">קבלו הצעת מחיר מותאמת</h3>
        <p className="font-rubik text-[14px] leading-[17px] text-slate-muted">נציג יחזור אליכם תוך יום עסקים</p>
        {sent ? (
          <div className="flex w-full flex-col items-center gap-[10px] py-[40px] text-center">
            <span className="flex size-[56px] items-center justify-center rounded-full bg-lime">
              <img loading="lazy" src={asset("icon-check-dark.svg")} alt="" className="size-[24px]" />
            </span>
            <p className="font-rubik text-[20px] font-semibold text-navy">תודה! הפרטים התקבלו</p>
          </div>
        ) : (
          <>
            <input required aria-label="שם מלא" placeholder="שם מלא *" className={`${field} h-[50px]`} />
            <input required type="tel" aria-label="טלפון" placeholder="טלפון *" className={`${field} h-[50px]`} />
            <p className="font-rubik text-[14px] font-semibold leading-[17px] text-navy">סוג הפרויקט</p>
            <div className="flex w-full flex-wrap gap-[6px]">
              {TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  aria-pressed={type === t}
                  className={`rounded-full border px-[14px] py-[7px] font-rubik text-[14px] leading-[17px] transition-all active:scale-95 ${type === t ? "border-[#9bc21f] bg-lime font-semibold text-ink" : "border-[#dfe2ee] bg-[#f4f5fa] text-slate-muted"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <textarea aria-label="מה הפרויקט שלכם?" placeholder="מה הפרויקט שלכם? (לא חובה)" className={`${field} h-[96px] resize-none pt-[12px]`} />
            <label className="flex items-center gap-[8px]">
              <input type="checkbox" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} className="peer sr-only" />
              <span className="size-[18px] rounded-[5px] border-[1.4px] border-[#b6bacb] peer-checked:border-indigo peer-checked:bg-indigo" />
              <span className="font-rubik text-[13px] leading-[15px] text-slate-muted">אשמח לקבל עדכונים ומבצעים</span>
            </label>
            <button type="submit" className="btn-lime flex h-[56px] w-full items-center justify-between rounded-[18px] bg-lime pl-[10px] pr-[20px]">
              <span className="font-rubik text-[16px] font-medium leading-[19px] text-ink">קבלו הצעת מחיר מותאמת</span>
              <img loading="lazy" src={m("arrow-dark-34.svg")} alt="" className="size-[34px]" />
            </button>
          </>
        )}
      </form>
    </section>
  );
}

/* ───────────────────────── Footer ───────────────────────── */

const SOL = ["חנויות וקניונים", "פרסום חוצות", "מוזיאונים", "אירועים ותערוכות", "קולנוע ביתי", "חצר ובריכה"];
const NAV: [string, string][] = [
  ["פתרונות", "#domains-m"],
  ["מוצרים", "#products-m"],
  ["פרויקטים", "#projects-m"],
  ["תהליך עבודה", "#process-m"],
  ["אודות", "#why-m"],
  ["צור קשר", "#contact-m"],
];
const CONTACT = [
  { t: "054-4228606", i: "f-phone.svg", h: `tel:${PHONE}`, ltr: true },
  { t: "וואטסאפ", i: "f-wa.svg", h: WA },
  { t: "info@screenled.co.il", i: "f-mail.svg", h: "mailto:info@screenled.co.il", ltr: true },
  { t: "אולם תצוגה: כתובת העסק", i: "f-pin.svg" },
];

export function MFooter() {
  return (
    <footer data-reveal className="sd-zoom relative flex flex-col items-start gap-[18px] overflow-hidden rounded-[28px] bg-night px-[20px] py-[28px]">
      <PixelCluster color="lime" small style={{ left: 16, top: 16 }} />
      <a href="#top" className="flex items-center gap-[8px]" dir="ltr" aria-label="SCREENLED">
        <span className="rounded-[5px] bg-white px-[8px] py-[3px] font-mont text-[16px] font-extrabold leading-[20px] text-ink">SCREEN</span>
        <span className="font-mont text-[18px] font-bold leading-[22px] text-white">LED</span>
      </a>
      <p className="font-heebo text-[17px] font-semibold leading-[25px] text-lime">כל פיקסל עובד בשבילכם</p>
      <p className="font-heebo text-[14px] leading-[22px] text-white/60">תכנון, אספקה והתקנה של קירות וידאו ומסכי LED לעסקים ולבית.</p>
      <div className="flex gap-[10px]">
        {["social-4.svg", "social-3.svg", "social-2.svg", "social-1.svg"].map((s) => (
          <a key={s} href="#" className="relative size-[40px] rounded-full border border-white/[0.12] bg-white/[0.06]" aria-label="רשת חברתית">
            <img loading="lazy" src={m(s)} alt="" className="absolute left-[10.5px] top-[10.5px] size-[17px]" />
          </a>
        ))}
      </div>
      <div className="flex w-full gap-[16px]">
        <nav className="flex min-w-0 flex-1 flex-col items-start gap-[10px]" aria-label="ניווט תחתון">
          <span className="font-heebo text-[15px] font-bold leading-[22px] text-white">ניווט</span>
          {NAV.map(([t, h]) => (
            <a key={t} href={h} className="font-heebo text-[14px] leading-[21px] text-white/60">
              {t}
            </a>
          ))}
        </nav>
        <div className="flex min-w-0 flex-1 flex-col items-start gap-[10px]">
          <span className="font-heebo text-[15px] font-bold leading-[22px] text-white">פתרונות</span>
          {SOL.map((t) => (
            <a key={t} href="#domains-m" className="font-heebo text-[14px] leading-[21px] text-white/60">
              {t}
            </a>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-[10px]">
        <span className="font-heebo text-[15px] font-bold leading-[22px] text-white">צרו קשר</span>
        {CONTACT.map((c) => {
          const inner = (
            <>
              <img loading="lazy" src={m(c.i)} alt="" className="size-[15px]" />
              <span dir={c.ltr ? "ltr" : undefined}>{c.t}</span>
            </>
          );
          const cls = "flex items-center gap-[8px] font-heebo text-[14px] leading-[21px] text-white/75";
          return c.h ? (
            <a key={c.t} href={c.h} className={cls}>
              {inner}
            </a>
          ) : (
            <span key={c.t} className={cls}>
              {inner}
            </span>
          );
        })}
      </div>
      <span className="h-px w-full bg-white/10" />
      <div className="flex gap-[18px]">
        {["הצהרת נגישות", "מדיניות פרטיות", "תקנון"].map((t) => (
          <a key={t} href="#" className="font-heebo text-[13px] leading-[19px] text-white/55">
            {t}
          </a>
        ))}
      </div>
      <div className="flex w-full items-center justify-between">
        <p className="font-heebo text-[12px] leading-[18px] text-white/45">‏© 2026 SCREENLED. כל הזכויות שמורות.</p>
        <a href="#top" className="relative size-[44px] rounded-full bg-lime" aria-label="חזרה למעלה">
          <img loading="lazy" src={m("up.svg")} alt="" className="absolute left-[13px] top-[13px] size-[18px]" />
        </a>
      </div>
    </footer>
  );
}

/* ───────────────────────── Sticky bar ───────────────────────── */

export function MStickyBar() {
  return (
    <div className="slide-up-in fixed inset-x-[12px] bottom-[16px] z-50 flex h-[64px] gap-[8px] rounded-[24px] bg-[rgba(21,21,25,0.92)] p-[8px] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-[10px] lg:hidden">
      <a href={`tel:${PHONE}`} className="flex min-w-0 flex-1 items-center justify-center gap-[8px] rounded-full bg-lime px-[12px]">
        <span className="font-rubik text-[14px] font-medium leading-[17px] text-ink">חייגו עכשיו</span>
        <img loading="lazy" src={m("phone-dark.svg")} alt="" className="size-[16px]" />
      </a>
      <a href={WA} className="flex min-w-0 flex-1 items-center justify-center gap-[8px] rounded-full bg-[#25d366] px-[12px]">
        <span className="font-rubik text-[14px] font-medium leading-[17px] text-white">וואטסאפ</span>
        <img loading="lazy" src={m("whatsapp.svg")} alt="" className="size-[16px]" />
      </a>
    </div>
  );
}
