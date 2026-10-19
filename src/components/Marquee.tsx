import { asset } from "./ui";

const DOMAINS = [
  "חנויות וקניונים",
  "פרסום חוצות",
  "קירות וידאו",
  "מסכי ענק בהתאמה אישית",
  "מסכים לחצר ולבריכה",
  "קולנוע ביתי",
  "אירועים ותערוכות",
  "מוזיאונים ומרכזי מבקרים",
];

function Set() {
  return (
    <>
      {DOMAINS.map((d) => (
        <span key={d} className="flex shrink-0 items-center gap-[28px] pr-[28px]">
          <span className="whitespace-nowrap font-rubik text-[18px] font-bold leading-[26px] text-ink xl:text-[22px]" dir="rtl">
            {d}
          </span>
          <img src={asset("marquee-star.svg")} alt="" className="size-[14px]" />
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <div className="relative h-[60px] overflow-hidden rounded-full bg-lime xl:h-[74px]" aria-label="תחומי פעילות">
      <div className="marquee-track absolute left-0 top-[17px] flex xl:top-[21px]" dir="ltr">
        <Set />
        <Set />
      </div>
    </div>
  );
}
