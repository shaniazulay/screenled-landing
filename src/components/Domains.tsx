import { useState } from "react";
import { asset, Card, PixelCluster, SectionTag } from "./ui";

const FEATURED = [
  { title: "חנויות וקניונים", sub: "הלקוחות ייכנסו כי הם לא יוכלו שלא להסתכל", img: "domain-stores.png" },
  { title: "פרסום חוצות", sub: "נראה מכל זווית, בכל מזג אוויר", img: "domain-outdoor.png" },
  { title: "מוזיאונים", sub: "מוזיאונים ומרכזי מבקרים", img: "domain-museum.png" },
  { title: "אירועים ותערוכות", sub: "הבמה שלכם, בגדול. מסכים ניידים ומודולריים.", img: "project-4.png" },
  { title: "חצר ובריכה", sub: "המסך שעובד גם בחוץ", img: "domain-pool.png" },
  { title: "קולנוע ביתי ואולמות", sub: "תמונה של אולם קולנוע, בבית", img: "domain-cinema.png" },
];

const violet = (deg: number) => ({ backgroundImage: `linear-gradient(${deg}deg, #4b4fd8 0%, #6a55e8 71.429%)` });

function PhotoCaption({ children, left, top }: { children: string; left: number; top: number }) {
  return (
    <span
      className="absolute whitespace-nowrap rounded-[3px] bg-[rgba(21,21,25,0.72)] px-[10px] py-[5px] font-heebo text-[12px] font-medium leading-[18px] text-white"
      style={{ left, top }}
    >
      {children}
    </span>
  );
}

function TextTile({ title, sub, deg, className }: { title: string; sub: string; deg: number; className: string }) {
  return (
    <a href="#contact" className={`group relative block overflow-hidden rounded-[20px] ${className}`} style={violet(deg)}>
      <span className="absolute right-[24px] top-[22px] whitespace-nowrap font-rubik text-[22px] font-bold leading-[26px] text-white">{title}</span>
      <span className="absolute right-[24px] top-[58px] w-[215px] font-heebo text-[13px] leading-[20px] text-white/75">{sub}</span>
      <img loading="lazy" src={asset("icon-arrow-diag.svg")} alt="" className="absolute left-[20px] top-[24px] size-[20px] transition-transform group-hover:-translate-x-[3px] group-hover:-translate-y-[3px]" />
    </a>
  );
}

export default function Domains() {
  const [idx, setIdx] = useState(0);
  const f = FEATURED[idx];
  const go = (d: number) => setIdx((i) => (i + d + FEATURED.length) % FEATURED.length);

  return (
    <Card id="domains" dark className="px-[12px] pb-[12px] pt-[32px] sm:px-[24px] xl:px-[89px] xl:pb-[84px] xl:pt-[66.2px]">
      <PixelCluster color="lime" mirror style={{ right: 30, top: 30 }} className="hidden xl:block" />

      <div className="relative mb-[20px] flex items-start justify-between px-[8px] xl:mb-0 xl:h-[49.8px] xl:px-0">
        <div className="flex items-start gap-[14px]">
          <SectionTag label="תחומי פעילות" num="04" dark className="mt-[5px] xl:-mr-[1px]" />
          <span className="rounded-full bg-lime px-[12px] py-[6px] font-rubik text-[13px] font-medium leading-[15px] text-ink shadow-[0_6px_18px_rgba(212,255,90,0.5)]">6 תחומים</span>
        </div>
        <span className="mt-[13.8px] font-mont text-[13px] font-medium leading-[16px] tracking-[1.3px] text-white/60" dir="ltr">
          {String(idx + 1).padStart(2, "0")} / 06
        </span>
      </div>

      <div className="relative grid gap-[12px] rounded-[28px] bg-[#1c1c22] p-[12px] xl:h-[682px] xl:grid-cols-[minmax(0,592fr)_minmax(0,285fr)_minmax(0,285fr)] xl:p-[14px]">
        {/* Column 1 (right): featured + intro + controls */}
        <div className="flex flex-col gap-[12px]">
          <div className="relative h-[312px] overflow-hidden rounded-[20px]">
            <img key={f.img} loading="lazy" src={asset(f.img)} alt={f.title} className="absolute inset-0 size-full object-cover" />
            <span className="absolute inset-0 bg-gradient-to-l from-[rgba(5,8,26,0.75)] to-[rgba(5,8,26,0)] to-60%" />
            <div className="absolute bottom-[32px] left-[24px] right-[24px] flex flex-col items-start gap-[4px] xl:left-[32px] xl:right-[32px]">
              <span className="font-rubik text-[34px] font-bold leading-[40px] tracking-[-0.52px] text-white sm:text-[52px] sm:leading-[58px]">{f.title}</span>
              <span className="font-heebo text-[15px] leading-[22px] text-white/85">{f.sub}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-[12px] sm:h-[246px] sm:grid-cols-2">
            <div className="relative h-[246px] overflow-hidden rounded-[20px] text-right" style={violet(147.5352)}>
              <span className="absolute right-[26px] top-[26px] font-heebo text-[13px] font-bold leading-[19px] tracking-[0.52px] text-[#b4b2ff]">תחומי פעילות</span>
              <h2 className="absolute right-[26px] top-[55px] w-[238px] font-rubik text-[26px] font-bold leading-[32px] text-white">
                <span className="block">פתרון מותאם</span>
                <span className="block text-lime">לכל תחום</span>
              </h2>
              <p className="absolute right-[26px] top-[131px] w-[238px] font-heebo text-[14px] leading-[22px] text-white/75">
                כל תחום מקבל עמוד משלו: הפתרון, המפרט המומלץ ופרויקטים מאותו עולם.
              </p>
            </div>
            <div className="relative h-[246px] overflow-hidden rounded-[20px]">
              <img loading="lazy" src={asset("domain-museum.png")} alt="מוזיאון עם קיר וידאו" className="absolute inset-0 size-full object-cover" />
              <PhotoCaption left={134} top={206}>
                מוזיאונים ומרכזי מבקרים
              </PhotoCaption>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[12px] sm:h-[72px] sm:grid-cols-[minmax(0,290fr)_minmax(0,139fr)_minmax(0,139fr)] [&>*]:h-[72px]">
            <a href="#contact" className="group relative col-span-2 overflow-hidden rounded-[20px] bg-lime transition-[filter] hover:brightness-105 sm:col-span-1">
              <span className="absolute left-[61%] top-[25.5px] -translate-x-1/2 whitespace-nowrap font-rubik text-[13px] font-bold leading-[17px] tracking-[0.28px] text-ink sm:text-[14px]">
                לייעוץ חינם לפי התחום שלכם
              </span>
              <img loading="lazy" src={asset("arrow-dark-34.svg")} alt="" className="absolute left-[16px] top-[19px] hidden size-[34px] transition-transform group-hover:rotate-45 sm:block" />
            </a>
            <button onClick={() => go(-1)} className="rounded-[20px] bg-[#4b4fd8] font-rubik text-[14px] font-semibold leading-[17px] tracking-[0.56px] text-white transition-colors hover:bg-[#5a5ee6]">
              הקודם
            </button>
            <button onClick={() => go(1)} className="rounded-[20px] bg-[#4b4fd8] font-rubik text-[14px] font-semibold leading-[17px] tracking-[0.56px] text-white transition-colors hover:bg-[#5a5ee6]">
              הבא
            </button>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-[12px]">
          <TextTile title="פרסום חוצות" sub="נראה מכל זווית, בכל מזג אוויר" deg={160.4417} className="h-[135px] shrink-0" />
          <div className="relative h-[355px] shrink-0 overflow-hidden rounded-[20px]">
            <img loading="lazy" src={asset("domain-outdoor.png")} alt="מסך פרסום חוצות" className="absolute inset-0 size-full object-cover" />
          </div>
          <TextTile title="אירועים ותערוכות" sub="הבמה שלכם, בגדול. מסכים ניידים ומודולריים." deg={159.7751} className="h-[140px] shrink-0" />
        </div>

        {/* Column 3 (left) */}
        <div className="flex flex-col gap-[12px]">
          <div className="relative h-[320px] shrink-0 overflow-hidden rounded-[20px]">
            <img loading="lazy" src={asset("domain-pool.png")} alt="מסך LED ליד בריכה" className="absolute inset-0 size-full object-cover" />
            <PhotoCaption left={80} top={280}>
              חצר ובריכה · המסך שעובד גם בחוץ
            </PhotoCaption>
          </div>
          <div className="relative h-[322px] shrink-0 overflow-hidden rounded-[20px] bg-[#b4b2ff]">
            <span className="absolute right-[24px] top-[22px] whitespace-nowrap font-rubik text-[22px] font-bold leading-[26px] text-white">קולנוע ביתי ואולמות</span>
            <span className="absolute right-[24px] top-[58px] whitespace-nowrap font-heebo text-[13px] leading-[19px] text-white/80">תמונה של אולם קולנוע, בבית</span>
            <img loading="lazy"
              src={asset("domain-cinema.png")}
              alt="קולנוע ביתי"
              className="absolute inset-x-[24px] top-[118px] h-[180px] w-[calc(100%-48px)] rounded-[4px] object-cover shadow-[0_12px_24px_rgba(0,0,0,0.3)]"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
