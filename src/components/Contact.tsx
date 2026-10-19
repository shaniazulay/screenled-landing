import { useState, type FormEvent } from "react";
import { asset, Glow, PixelCluster, SectionTag, Sparkle } from "./ui";

const TYPES_ROW1 = ["חוצות", "חנות", "אולם", "מוזיאון"];
const TYPES_ROW2 = ["אירוע", "פרטי", "אחר"];
const CHECKS = ["ייעוץ מקצועי ללא התחייבות", "התאמה לתקציב, לגודל ולמטרה", "ליווי מלא מהתכנון ועד התחזוקה"];

const field =
  "w-full rounded-[12px] border border-[#dfe2ee] bg-[#f4f5fa] px-[18px] font-heebo text-[16px] text-navy outline-none transition-colors placeholder:text-[#8a8fa8] focus:border-indigo focus:bg-white";

function LeadForm() {
  const [type, setType] = useState("חוצות");
  const [optIn, setOptIn] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const Chip = ({ t }: { t: string }) => (
    <button
      type="button"
      onClick={() => setType(t)}
      aria-pressed={type === t}
      className={`rounded-full border px-[16px] py-[8px] font-rubik text-[15px] leading-[18px] transition-all active:scale-95 ${
        type === t ? "border-indigo bg-lime font-semibold text-indigo" : "border-[#dfe2ee] bg-[#f4f5fa] text-slate-body hover:border-indigo/40"
      }`}
    >
      {t}
    </button>
  );

  return (
    <form
      onSubmit={submit}
      className="relative flex flex-col items-start gap-[14px] rounded-[28px] bg-white px-[20px] pb-[28px] pt-[30px] drop-shadow-[0_30px_35px_rgba(0,0,0,0.35)] sm:px-[36px] sm:pb-[32px] sm:pt-[36px] xl:h-[572px]"
    >
      <h3 className="font-rubik text-[24px] font-bold leading-[33px] text-navy sm:text-[28px]">קבלו הצעת מחיר מותאמת</h3>
      <p className="font-heebo text-[16px] leading-[24px] text-slate-body">נציג יחזור אליכם תוך יום עסקים</p>

      {sent ? (
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-[12px] py-[60px] text-center">
          <span className="flex size-[64px] items-center justify-center rounded-full bg-lime">
            <img loading="lazy" src={asset("icon-check-dark.svg")} alt="" className="size-[28px]" />
          </span>
          <p className="font-rubik text-[22px] font-semibold text-navy">תודה! הפרטים התקבלו</p>
          <p className="font-heebo text-[16px] text-slate-body">נחזור אליכם תוך יום עסקים.</p>
        </div>
      ) : (
        <>
          <div className="grid w-full grid-cols-1 gap-[14px] sm:grid-cols-2">
            <input required name="name" aria-label="שם מלא" placeholder="שם מלא *" className={`${field} h-[56px]`} />
            <input required name="phone" type="tel" aria-label="טלפון" placeholder="טלפון *" className={`${field} h-[56px]`} />
          </div>
          <p className="font-heebo text-[15px] font-semibold leading-[22px] text-navy">סוג הפרויקט</p>
          <div className="flex w-full flex-col items-start gap-[8px]">
            <div className="flex flex-wrap gap-[8px]">
              {TYPES_ROW1.map((t) => (
                <Chip key={t} t={t} />
              ))}
            </div>
            <div className="flex flex-wrap gap-[8px]">
              {TYPES_ROW2.map((t) => (
                <Chip key={t} t={t} />
              ))}
            </div>
          </div>
          <textarea name="details" aria-label="מה הפרויקט שלכם?" placeholder="מה הפרויקט שלכם? (לא חובה)" className={`${field} h-[110px] resize-none pt-[16px]`} />
          <label className="flex cursor-pointer items-center gap-[8px]">
            <input type="checkbox" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} className="peer sr-only" />
            <span className="size-[18px] rounded-[5px] border-[1.4px] border-[#b6bacb] transition-colors peer-checked:border-indigo peer-checked:bg-indigo peer-focus-visible:ring-2 peer-focus-visible:ring-indigo/40" />
            <span className="font-heebo text-[14px] leading-[21px] text-slate-body">אשמח לקבל עדכונים ומבצעים</span>
          </label>
          <button
            type="submit"
            className="btn-lime group flex h-[60px] w-full items-center justify-between rounded-[20px] bg-lime pl-[12px] pr-[22px]"
          >
            <span className="font-rubik text-[18px] font-medium leading-[21px] text-ink">קבלו הצעת מחיר מותאמת</span>
            <img loading="lazy" src={asset("arrow-dark-38.svg")} alt="" className="size-[38px] transition-transform group-hover:rotate-45" />
          </button>
        </>
      )}
    </form>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="sd-zoom spotlight relative overflow-hidden rounded-[28px] px-[16px] pb-[24px] pt-[40px] sm:px-[40px] lg:rounded-[36px] xl:px-[89px] xl:pb-[120px] xl:pt-[110px]"
      style={{ backgroundImage: "linear-gradient(150.0516deg, #4b4fd8 0%, #6a55e8 71.429%)" }}
    >
      <Glow src="glow-cta-violet.svg" box={{ left: 56, top: 138, width: 700, height: 420 }} inset="-42.86% -25.71%" />
      <Glow src="glow-gold.svg" box={{ left: 16, top: 150, width: 800, height: 500 }} inset="-36% -22.5%" />
      <PixelCluster color="lime" style={{ left: 30, top: 738 }} className="hidden xl:block" />
      <Sparkle src="sparkle-16b.svg" size={16} style={{ left: 839, top: 203.4 }} className="hidden xl:block" />
      <Sparkle src="sparkle-8b.svg" size={8} style={{ left: 859, top: 191.4 }} className="hidden xl:block" />
      <Sparkle src="sparkle-14.svg" size={14} style={{ left: 676, top: 78 }} className="hidden xl:block" />
      <Sparkle src="sparkle-7b.svg" size={7} style={{ left: 700, top: 118 }} className="hidden xl:block" />

      <div className="relative grid gap-[40px] xl:grid-cols-[minmax(0,520px)_minmax(0,540px)] xl:justify-between xl:gap-[24px]">
        <div className="flex flex-col items-start gap-[24px] xl:mt-[30px]">
          <SectionTag label="בואו נתחיל" num="07" dark />
          <h2 className="sd-text font-rubik text-[42px] font-semibold leading-[50px] text-white sm:text-[60px] sm:leading-[70px]">
            <span className="block">המסך הבא שלכם</span>
            <span className="block">
              <span className="shimmer">מתחיל כאן</span>
            </span>
          </h2>
          <p className="font-rubik text-[18px] leading-[30px] text-[#c9cde6] sm:text-[20px] sm:leading-[33px]">
            עשרות פרויקטים בארץ ובעולם. ספרו לנו מה אתם מתכננים, ונהפוך את הרעיון למציאות.
          </p>
          <ul className="flex flex-col items-start gap-[14px]">
            {CHECKS.map((c, i) => (
              <li key={c} data-reveal="right" style={{ ["--d" as string]: `${200 + i * 110}ms` }} className="flex items-center gap-[12px]">
                <span className="flex size-[28px] shrink-0 items-center justify-center rounded-full bg-lime">
                  <img loading="lazy" src={asset("icon-check-dark.svg")} alt="" className="size-[16px]" />
                </span>
                <span className="font-rubik text-[17px] font-medium leading-[21px] text-white sm:text-[18px]">{c}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-[14px]">
            <a
              href="tel:054-4228606"
              className="btn-ghost flex h-[56px] w-[190px] items-center justify-center gap-[8px] whitespace-nowrap rounded-full border-[1.5px] border-white/50 px-[16px] hover:border-white hover:bg-white/10"
            >
              <span className="font-rubik text-[18px] font-semibold leading-[21px] text-white" dir="ltr">
                054-4228606
              </span>
              <img loading="lazy" src={asset("icon-phone-white.svg")} alt="" className="size-[20px]" />
            </a>
            <a
              href="https://wa.me/972544228606"
              className="btn-ghost flex h-[56px] w-[160px] items-center justify-center gap-[8px] rounded-full border-[1.5px] border-white/75 px-[24px] hover:border-white hover:bg-white/10"
            >
              <span className="font-rubik text-[18px] font-semibold leading-[21px] text-white">וואטסאפ</span>
              <img loading="lazy" src={asset("icon-whatsapp-outline.svg")} alt="" className="size-[20px]" />
            </a>
          </div>
        </div>

        <div className="relative" data-reveal="left" style={{ ["--d" as string]: "150ms" }}>
          <LeadForm />
          <span className="float-y absolute right-[25px] top-[-16px] flex items-center gap-[7px] rounded-full bg-lime px-[12px] py-[6px] shadow-[0_6px_18px_rgba(212,255,90,0.5)]">
            <img loading="lazy" src={asset("icon-clock.svg")} alt="" className="size-[14px]" />
            <span className="whitespace-nowrap font-rubik text-[13px] font-medium leading-[15px] text-ink">מענה תוך יום עסקים</span>
          </span>
        </div>
      </div>
    </section>
  );
}
