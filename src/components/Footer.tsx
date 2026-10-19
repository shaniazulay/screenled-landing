import { asset, PixelCluster } from "./ui";

const NAV = [
  ["פתרונות", "#domains"],
  ["מוצרים", "#products"],
  ["פרויקטים", "#projects"],
  ["תהליך עבודה", "#process"],
  ["אודות", "#why"],
  ["צור קשר", "#contact"],
];
const SOLUTIONS = ["חנויות וקניונים", "פרסום חוצות", "מוזיאונים ומרכזי מבקרים", "אירועים ותערוכות", "קולנוע ביתי ואולמות", "חצר ובריכה"];
const CONTACT = [
  { text: "054-4228606", icon: "ficon-phone.svg", href: "tel:054-4228606", ltr: true },
  { text: "וואטסאפ", icon: "ficon-whatsapp.svg", href: "https://wa.me/972544228606" },
  { text: "info@screenled.co.il", icon: "ficon-mail.svg", href: "mailto:info@screenled.co.il", ltr: true },
  { text: "אולם תצוגה: כתובת העסק", icon: "ficon-pin.svg" },
];

const link = "whitespace-nowrap font-heebo text-[15px] leading-[22px] text-[#aeb3cf] transition-colors hover:text-white";

function ColTitle({ children }: { children: string }) {
  return <h4 className="mb-[16px] font-heebo text-[17px] font-bold leading-[25px] text-white">{children}</h4>;
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden rounded-[28px] bg-night px-[20px] pb-[20px] pt-[40px] sm:px-[40px] lg:rounded-[36px] xl:px-[89px] xl:pb-[17px] xl:pt-[78px]">
      <PixelCluster color="lime" mirror style={{ right: 30, top: 30 }} className="hidden xl:block" />

      <div className="grid grid-cols-2 gap-x-[24px] gap-y-[36px] sm:grid-cols-3 xl:flex xl:h-[320px] xl:items-start xl:gap-0">
        {/* Brand */}
        <div className="col-span-2 flex flex-col items-start gap-[14px] sm:col-span-3 xl:w-[24.71%] xl:shrink-0">
          <a href="#top" className="flex items-center gap-[10px]" dir="ltr" aria-label="SCREENLED">
            <span className="rounded-[6px] bg-white px-[10px] py-[4px] font-mont text-[20px] font-extrabold leading-[24px] text-ink">SCREEN</span>
            <span className="font-mont text-[22px] font-bold leading-[27px] text-white">LED</span>
          </a>
          <p className="font-heebo text-[18px] font-semibold leading-[26px] text-lime">כל פיקסל עובד בשבילכם</p>
          <p className="max-w-[300px] font-heebo text-[15px] leading-[25px] text-[#8a90b4]">תכנון, אספקה והתקנה של קירות וידאו ומסכי LED לעסקים ולבית.</p>
          <div className="flex gap-[10px]">
            {["social-4.svg", "social-3.svg", "social-2.svg", "social-1.svg"].map((s) => (
              <a key={s} href="#" className="flex size-[42px] items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] transition-colors hover:bg-white/[0.14]" aria-label="רשת חברתית">
                <img src={asset(s)} alt="" className="size-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <nav className="flex flex-col items-start gap-[14px] xl:mr-[8.81%] xl:w-[80px] xl:shrink-0" aria-label="ניווט תחתון">
          <ColTitle>ניווט</ColTitle>
          {NAV.map(([t, h]) => (
            <a key={t} href={h} className={link}>
              {t}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-start gap-[14px] xl:mr-[9.885%] xl:w-[153px] xl:shrink-0">
          <ColTitle>פתרונות</ColTitle>
          {SOLUTIONS.map((t) => (
            <a key={t} href="#domains" className={link}>
              {t}
            </a>
          ))}
        </div>

        <div className="col-span-2 flex flex-col items-start gap-[14px] sm:col-span-1 xl:mr-[10.46%] xl:w-[185px] xl:shrink-0">
          <ColTitle>צרו קשר</ColTitle>
          {CONTACT.map((c) => {
            const inner = (
              <>
                <img src={asset(c.icon)} alt="" className="size-[16px]" />
                <span dir={c.ltr ? "ltr" : undefined}>{c.text}</span>
              </>
            );
            return c.href ? (
              <a key={c.text} href={c.href} className={`flex items-center gap-[10px] ${link}`}>
                {inner}
              </a>
            ) : (
              <span key={c.text} className={`flex items-center gap-[10px] ${link}`}>
                {inner}
              </span>
            );
          })}
          <span className={link}>אזורי שירות: כל הארץ</span>
        </div>

        <span className="hidden flex-1 xl:block" />
        <a href="#top" className="group col-span-2 flex w-fit flex-col items-center gap-[8px] justify-self-end sm:col-span-3 xl:mt-[12px]">
          <span className="flex size-[56px] items-center justify-center rounded-full bg-lime transition-transform group-hover:-translate-y-[3px]">
            <img src={asset("icon-arrow-up.svg")} alt="" className="size-[22px]" />
          </span>
          <span className="font-heebo text-[12px] font-medium leading-[18px] text-white/60">למעלה</span>
        </a>
      </div>

      <div className="mt-[28px] h-px bg-white/[0.08] xl:mt-0" />
      <div className="flex flex-col-reverse items-start gap-[12px] pt-[18px] sm:flex-row sm:items-center sm:justify-between xl:pt-[27px]">
        <p className="font-heebo text-[14px] leading-[21px] text-[#6e7497]">‏© 2026 SCREENLED. כל הזכויות שמורות.</p>
        <div className="flex gap-[28px]">
          {["הצהרת נגישות", "מדיניות פרטיות", "תקנון"].map((t) => (
            <a key={t} href="#" className="font-heebo text-[14px] leading-[21px] text-[#8a90b4] transition-colors hover:text-white">
              {t}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
