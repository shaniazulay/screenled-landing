import { useState } from "react";
import { asset, Card, GlassChip, Glow, LimeButton, PixelCluster } from "./ui";

export default function ProblemSolution() {
  const [after, setAfter] = useState(true);

  return (
    <Card id="solution" className="px-[20px] pb-[28px] pt-[40px] sm:px-[40px] xl:px-[89px] xl:pb-[83px] xl:pt-[138px]">
      <Glow src="glow-ps.svg" box={{ left: 16, top: 188, width: 700, height: 500 }} inset="-32% -22.86%" className="hidden xl:block" />
      <Glow src="glow-blue.svg" box={{ left: 776, top: 276, width: 700, height: 500 }} inset="-32% -22.86%" className="hidden xl:block" />
      <PixelCluster color="indigo" style={{ left: 30, top: 30 }} className="hidden xl:block" />

      <div className="relative grid gap-[32px] xl:grid-cols-[minmax(0,560fr)_minmax(0,580fr)] xl:gap-[74px]">
        <div className="flex flex-col items-start gap-[18px] xl:gap-[22px]">
          <span className="rounded-full bg-night px-[14px] py-[5px] font-rubik text-[14px] font-semibold leading-[17px] text-white">הבעיה</span>
          <h2 className="font-rubik text-[30px] font-semibold leading-[40px] text-navy xl:text-[38px] xl:leading-[48px]">תצוגה בינונית היא כסף שהולך לאיבוד</h2>
          <p className="font-heebo text-[17px] leading-[29px] text-slate-body xl:text-[18px] xl:leading-[31px]">
            הלקוחות שלכם מוצפים במסרים מכל כיוון. שלט רגיל או מסך עמום פשוט לא נקלטים. אפשר להשקיע הרבה בתוכן ובשיווק, אבל אם התצוגה עצמה לא מרשימה, המסר לא מגיע ליעדו והלקוח ממשיך הלאה.
          </p>
          <span className="h-px w-full bg-[rgba(27,33,64,0.1)]" />
          <span className="rounded-full bg-lime px-[14px] py-[5px] font-rubik text-[14px] font-semibold leading-[17px] text-ink">הפתרון</span>
          <h2 className="font-rubik text-[30px] font-semibold leading-[40px] text-navy xl:text-[38px] xl:leading-[48px]">
            תצוגה שמושכת את הקהל <span className="text-indigo">פנימה</span>
          </h2>
          <p className="font-heebo text-[17px] leading-[29px] text-slate-body xl:text-[18px] xl:leading-[31px]">
            אנחנו לא רק מתקינים מסכים. אנחנו מתכננים חוויה ויזואלית שמציבה את העסק שלכם במרכז: מושכת את העין, מעוררת סקרנות והופכת עוברים ושבים ללקוחות.
          </p>
          <LimeButton label="לשיחת ייעוץ חינם" className="h-[60px] w-[260px]" />
        </div>

        <div className="relative h-[420px] overflow-hidden rounded-[28px] shadow-[0_30px_60px_rgba(0,0,0,0.4)] sm:h-[520px] xl:h-[603px]">
          <img loading="lazy"
            src={asset("solution.png")}
            alt="חלון ראווה עם מסך LED"
            className="ken-burns absolute inset-0 size-full object-cover transition-[filter] duration-500"
            style={{ filter: after ? "none" : "grayscale(1) brightness(0.55)" }}
          />
          <div className="absolute left-[24px] top-[24px] flex gap-[4px] rounded-full bg-[rgba(21,21,25,0.6)] p-[4px] backdrop-blur-[7px]" role="group" aria-label="לפני ואחרי">
            <button
              onClick={() => setAfter(false)}
              className={`rounded-full px-[16px] py-[6px] font-heebo text-[13px] leading-[19px] transition-colors ${!after ? "bg-lime font-semibold text-ink" : "font-medium text-white/70"}`}
            >
              לפני
            </button>
            <button
              onClick={() => setAfter(true)}
              className={`rounded-full px-[16px] py-[6px] font-heebo text-[13px] leading-[19px] transition-colors ${after ? "bg-lime font-semibold text-ink" : "font-medium text-white/70"}`}
            >
              אחרי
            </button>
          </div>
          <GlassChip icon="icon-chip-white.svg" className="float-y absolute bottom-[28px] right-[23px]">
            חלון ראווה · מסך LED
          </GlassChip>
        </div>
      </div>
    </Card>
  );
}
