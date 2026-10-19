import { useEffect, useState } from "react";
import { asset, Card, Glow, LimeButton, PixelCluster, SectionTag, Sparkle } from "./ui";

const ITEMS = [
  { title: "טכנולוגיה מהמותגים המובילים", desc: "חדות, בהירות ונאמנות צבע ברמה הגבוהה ביותר, בלי פשרות.", icon: "why-icon-1.svg" },
  { title: "מערכות מודולריות", desc: "כל צורה, גודל ותצורה, כולל מסכים מעוגלים ופינתיים.", icon: "why-icon-2.svg" },
  { title: "עיצוב נקי", desc: "מסגרות דקות ותכנון שמבליט את התוכן ולא את החומרה.", icon: "why-icon-3.svg" },
  { title: "הכל אצלנו", desc: "תכנון הנדסי, התקנה, תוכנה לניהול תוכן ותחזוקה שוטפת.", icon: "why-icon-4.svg" },
];

export default function WhyUs() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // The highlighted benefit advances on its own until the visitor hovers the list.
  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % ITEMS.length), 3800);
    return () => window.clearInterval(t);
  }, [paused]);

  return (
    <Card id="why" className="px-[20px] pb-[28px] pt-[40px] sm:px-[40px] xl:px-[89px] xl:pb-[106px] xl:pt-[108px]">
      <Glow src="glow-blue.svg" box={{ left: 756, top: 368, width: 700, height: 500 }} inset="-32% -22.86%" className="hidden xl:block" />
      <PixelCluster color="indigo" style={{ left: 30, top: 30 }} className="hidden xl:block" />
      <Sparkle src="sparkle-16a.svg" size={16} style={{ left: 911, top: 156 }} className="hidden xl:block" />
      <Sparkle src="sparkle-8a.svg" size={8} style={{ left: 931, top: 144 }} className="hidden xl:block" />

      <div className="relative grid gap-[32px] xl:grid-cols-[minmax(0,640fr)_minmax(0,520fr)] xl:gap-[54px]">
        {/* Copy + list (right column) */}
        <div className="flex flex-col items-start">
          <SectionTag label="למה SCREENLED" num="01" className="xl:-mr-[6px] xl:mt-[3.2px]" />
          <h2 className="mt-[20px] font-rubik text-[40px] font-semibold leading-[46px] tracking-[-0.6px] text-navy xl:mt-[23.8px] xl:text-[64px] xl:leading-[70px] xl:tracking-[-0.96px]">
            <span className="block">כל מה שצריך</span>
            <span className="block">
              למסך <span className="text-indigo">מושלם.</span>
            </span>
          </h2>
          <p className="mt-[18px] max-w-[440px] font-heebo text-[17px] font-light leading-[28px] text-slate-body xl:text-[19px] xl:leading-[31px]">
            צוות אחד שמלווה אתכם מהבחירה בטכנולוגיה ועד התחזוקה השוטפת.
          </p>

          <ul className="mt-[36px] w-full border-b border-[rgba(27,33,64,0.14)] xl:mt-[56px]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            {ITEMS.map((it, i) => {
              const isActive = i === active;
              const hideTop = i > 0 && i - 1 === active;
              return (
                <li
                  key={it.title}
                  data-reveal
                  style={{ ["--d" as string]: `${i * 90}ms` }}
                  onMouseEnter={() => setActive(i)}
                  className={`relative cursor-default py-[24px] pr-[44px] xl:h-[132px] xl:py-0 xl:pl-[60px] xl:pr-[70px] ${hideTop ? "" : "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[rgba(27,33,64,0.14)]"}`}
                >
                  {isActive && <span key={active} className="grow-in absolute inset-x-0 bottom-[-1px] z-10 h-[2px] bg-indigo xl:bottom-auto xl:top-[131px]" />}
                  <span
                    className={`absolute right-0 top-[30px] font-mont text-[14px] font-medium leading-[17px] tracking-[0.84px] xl:top-[36px] ${isActive ? "text-indigo" : "text-slate-body"}`}
                    dir="ltr"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={`font-rubik text-[24px] leading-[32px] tracking-[-0.15px] transition-colors xl:pt-[28px] xl:text-[30px] xl:leading-[38px] ${
                      isActive ? "font-bold text-indigo" : "font-semibold text-navy"
                    }`}
                  >
                    {it.title}
                  </h3>
                  <p className="mt-[8px] max-w-[420px] font-heebo text-[16px] leading-[26px] text-slate-body xl:text-[17px] xl:leading-[28px]">{it.desc}</p>
                  <img
                    loading="lazy"
                    src={asset(it.icon)}
                    alt=""
                    className={`absolute left-0 top-[28px] hidden size-[36px] transition-transform duration-500 sm:block xl:top-[30px] ${isActive ? "-rotate-6 scale-110" : ""}`}
                  />
                </li>
              );
            })}
          </ul>

          <LimeButton label="דברו עם מומחה" className="mt-[31px] h-[60px] w-[250px]" />
        </div>

        {/* Macro photo (left column) */}
        <div className="relative h-[460px] overflow-hidden rounded-[28px] sm:h-[600px] xl:mt-[4px] xl:h-[924px]">
          <img loading="lazy" src={asset("macro-led.png")} alt="תקריב של פיקסלים במסך LED" className="ken-burns absolute inset-0 size-full object-cover" />
          <span className="absolute inset-x-0 bottom-0 h-[220px] bg-gradient-to-b from-[rgba(21,21,25,0)] to-[rgba(21,21,25,0.85)]" />
          <p className="absolute bottom-[32px] right-[32px] font-rubik text-[20px] font-medium leading-[30px] text-white">
            כל פיקסל במקום.
            <br />
            זה ההבדל שרואים מקרוב.
          </p>
          <span className="absolute bottom-[32px] left-[32px] font-mont text-[12px] font-medium leading-[15px] tracking-[1.2px] text-white/75" dir="ltr">
            {String(active + 1).padStart(2, "0")} / 04
          </span>

          {/* Magnifier callout */}
          <span className="float-y absolute left-[187px] top-[272px] hidden size-[104px] xl:block" aria-hidden>
            <img loading="lazy" src={asset("magnifier-ring.svg")} alt="" className="absolute inset-[-15.38%] block size-[130.77%] max-w-none" />
          </span>
          <img loading="lazy" src={asset("dot-lime-6.svg")} alt="" className="absolute left-[236px] top-[321px] hidden size-[6px] xl:block" />
          <span className="absolute left-[291px] top-[324px] hidden h-[1.2px] w-[44px] bg-lime/80 min-[1380px]:block" />
          <span className="glass-dark absolute left-[335px] top-[310px] hidden whitespace-nowrap rounded-full px-[12px] py-[6px] font-rubik text-[13px] font-medium leading-[15px] text-white min-[1380px]:block">
            פיקסל אמיתי, מקרוב
          </span>
        </div>
      </div>
    </Card>
  );
}
