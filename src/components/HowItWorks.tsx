import { asset, Card, LightChip, PixelCluster, SectionTag, Sparkle } from "./ui";

const STEPS = [
  { title: "שיחת איפיון", desc: "מבינים את היעדים, המיקום והתקציב, וממליצים על הטכנולוגיה הנכונה.", img: "project-5.png" },
  { title: "תכנון הנדסי ועיצובי", desc: "גודל, רזולוציה, זווית צפייה וקונסטרוקציה בטוחה. הכל סגור מראש, בלי הפתעות.", img: "product-p4.png" },
  { title: "התקנה ומסירה", desc: "צוות מקצועי מתקין, מגדיר את מערכת התוכן ומדריך אתכם לעבודה שוטפת.", img: "project-4.png" },
];

const rule = "h-px w-full bg-[rgba(14,18,48,0.16)]";

export default function HowItWorks() {
  return (
    <Card id="process" className="px-[20px] pb-[28px] pt-[32px] sm:px-[40px] xl:px-[89px] xl:pb-[95px] xl:pt-[83.2px]">
      <PixelCluster color="indigo" style={{ left: 30, top: 30 }} className="hidden xl:block" />

      <div className="flex items-start justify-between gap-[12px] xl:h-[32.8px]">
        <SectionTag label="איך זה עובד" num="05" className="xl:-mr-[1px]" />
        <span className="font-heebo text-[13px] font-medium leading-[19px] tracking-[0.78px] text-slate-muted xl:mt-[0.8px]">תהליך עבודה · 3 שלבים</span>
      </div>
      <div className={`mt-[16px] xl:mt-0 ${rule}`} />

      <div className="flex flex-col gap-[28px] py-[32px] xl:h-[361px] xl:flex-row xl:justify-between xl:gap-[24px] xl:py-0">
        <h2 className="font-rubik text-[56px] font-bold leading-[56px] tracking-[-0.04em] text-navy sm:text-[80px] sm:leading-[76px] xl:mt-[47px] xl:whitespace-nowrap xl:text-[clamp(72px,8.2vw,118px)] xl:leading-[0.949]">
          <span className="block">שלושה צעדים</span>
          <span className="block">
            למסך המושלם<span className="text-indigo">.</span>
          </span>
        </h2>
        <div className="flex shrink-0 flex-col items-start gap-[28px] xl:mt-[59px] xl:w-[300px] xl:items-end">
          <p className="font-heebo text-[17px] leading-[28px] text-slate-muted xl:text-left">בלי הפתעות ובלי כאבי ראש. תהליך אחד, ברור ושקוף, מהשיחה הראשונה ועד שהמסך דולק.</p>
          <div className="relative size-[150px] shrink-0">
            <span className="orbit pointer-events-none absolute left-[-12px] top-[-12px] size-[174px]" aria-hidden>
              <img src={asset("orbit-ring.png")} alt="" className="absolute inset-0 size-full" />
              <img src={asset("orbit-satellite.svg")} alt="" className="absolute left-[82px] top-[-5px] size-[10px]" />
            </span>
            <a href="#contact" className="group absolute inset-0 overflow-hidden rounded-full bg-lime transition-[filter] hover:brightness-105">
              <span className="absolute left-1/2 top-[46px] -translate-x-1/2 whitespace-nowrap text-center font-rubik text-[17px] font-bold leading-[22px] text-ink">
                קבעו
                <br />
                שיחת איפיון
              </span>
              <img src={asset("arrow-down-dark.svg")} alt="" className="absolute left-[64px] top-[98px] size-[22px] transition-transform group-hover:translate-y-[2px]" />
            </a>
            <LightChip icon="icon-check-chip.svg" className="absolute left-[13px] top-[168px] hidden xl:inline-flex">
              ללא התחייבות
            </LightChip>
            <Sparkle src="sparkle-10.svg" size={10} style={{ left: 177, top: -18 }} className="hidden xl:block" />
            <Sparkle src="sparkle-6.svg" size={6} style={{ left: 163, top: 132 }} className="hidden xl:block" />
          </div>
        </div>
      </div>

      <ol>
        {STEPS.map((s, i) => (
          <li key={s.title} className="relative">
            <div className={rule} />
            <div className="flex flex-col gap-[14px] py-[28px] xl:h-[219px] xl:flex-row xl:items-start xl:gap-0 xl:py-0">
              <span className="outline-num text-right font-mont text-[72px] font-light leading-[72px] tracking-[-0.04em] xl:mt-[39px] xl:w-[267px] xl:shrink-0 xl:text-[120px] xl:leading-[120px]" dir="ltr">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="xl:mt-[43px] xl:w-[400px] xl:shrink-0">
                <h3 className="font-rubik text-[30px] font-semibold leading-[38px] tracking-[-0.6px] text-navy xl:whitespace-nowrap xl:text-[40px] xl:leading-[46px]">{s.title}</h3>
                <p className="mt-[10px] font-heebo text-[17px] leading-[28px] text-slate-muted xl:mt-[14px]">{s.desc}</p>
              </div>
              <span className="hidden flex-1 xl:block" />
              <span className="hidden font-mont text-[12px] font-medium leading-[15px] tracking-[0.72px] text-slate-muted xl:ml-[20px] xl:mt-[31px] xl:block" dir="ltr">
                ({String(i + 1).padStart(2, "0")})
              </span>
              <img src={asset(s.img)} alt={s.title} className="h-[180px] w-full rounded-[18px] object-cover sm:w-[270px] xl:mt-[29px] xl:h-[160px] xl:shrink-0" />
            </div>
          </li>
        ))}
      </ol>
      <div className={rule} />
    </Card>
  );
}
