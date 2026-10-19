import { asset, GlassChip, PixelCluster, Sparkle } from "./ui";
import { useFitScale } from "./useFitScale";

const NAV = [
  { label: "פתרונות", href: "#domains" },
  { label: "מוצרים", href: "#products" },
  { label: "פרויקטים", href: "#projects" },
  { label: "תהליך עבודה", href: "#process" },
  { label: "אודות", href: "#why" },
  { label: "צור קשר", href: "#contact" },
];

const CATALOG = [
  { name: "קבינט LED פנים P2.5", price: "₪1,890" },
  { name: "מסך LED חוץ P4", price: "₪3,450" },
  { name: "עמוד פרסום LED Poster", price: "₪8,900" },
  { name: "מסך LED שקוף", price: "₪5,200" },
];

const PHONE = "054-4228606";

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-[10px]" dir="ltr" aria-label="SCREENLED">
      <span className="rounded-[6px] bg-white px-[10px] py-[4px] font-mont text-[20px] font-extrabold leading-[24px] text-ink">SCREEN</span>
      <span className="font-mont text-[22px] font-bold leading-[27px] text-white">LED</span>
    </a>
  );
}

function CatalogButton({ name, price, i = 0 }: { name: string; price: string; i?: number }) {
  return (
    <a
      href="#products"
      data-reveal="left"
      style={{ ["--d" as string]: `${350 + i * 90}ms` }}
      className="btn-lime group flex h-[64px] w-full items-center justify-between rounded-[20px] bg-lime pl-[14px] pr-[22px] drop-shadow-[0_10px_12px_rgba(0,0,0,0.22)]"
    >
      <span className="flex flex-col items-start text-right">
        <span className="whitespace-nowrap font-heebo text-[17px] font-semibold leading-[25px] text-ink">{name}</span>
        <span className="whitespace-nowrap font-heebo text-[13px] leading-[19px] text-ink/70">החל מ- {price}</span>
      </span>
      <img loading="lazy" src={asset("catalog-arrow.svg")} alt="" className="size-[36px] transition-transform duration-[250ms] ease-out group-hover:rotate-45" />
    </a>
  );
}

function Stars({ size }: { size: number }) {
  return (
    <span className="flex gap-[6px]" dir="ltr">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="relative" style={{ width: size, height: size }}>
          <span className="absolute inset-[0_2.45%_9.55%_2.45%]">
            <img loading="lazy" src={asset("star-rating.svg")} alt="" className="block size-full max-w-none" />
          </span>
        </span>
      ))}
    </span>
  );
}

function LivePulse() {
  return (
    <span className="relative block size-[28px]">
      <span className="live-ring absolute left-[9px] top-[9px] size-[10px] rounded-full bg-lime/70" />
      <img loading="lazy" src={asset("live-pulse.svg")} alt="" className="absolute inset-0 size-full" />
    </span>
  );
}

function HeroHeadline({ className = "" }: { className?: string }) {
  return (
    <h1 className={`font-rubik font-bold text-white ${className}`}>
      <span className="block" data-reveal style={{ ["--d" as string]: "150ms" }}>
        המסך שלכם
      </span>
      <span className="block" data-reveal style={{ ["--d" as string]: "280ms" }}>
        יעצור <span className="text-lime">כל</span>
      </span>
      <span className="block text-lime" data-reveal style={{ ["--d" as string]: "410ms" }}>
        עובר אורח
      </span>
    </h1>
  );
}

const SUB = "‏SCREENLED מתכננת, מספקת ומתקינה קירות וידאו ומסכי LED מהיצרנים המובילים בעולם, בהתאמה מלאה לכל גודל ומטרה.";

function SecondaryActions() {
  return (
    <div className="flex flex-wrap items-center gap-[12px]">
      <a
        href={`tel:${PHONE}`}
        className="btn-ghost flex items-center gap-[10px] rounded-full bg-white py-[6px] pl-[6px] pr-[18px] shadow-[0_8px_20px_rgba(0,0,0,0.18)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.28)]"
      >
        <span className="font-mont text-[17px] font-bold leading-[21px] text-ink" dir="ltr">
          {PHONE}
        </span>
        <span className="flex size-[34px] items-center justify-center rounded-full bg-lime">
          <img loading="lazy" src={asset("phone-icon.svg")} alt="" className="size-[16px]" />
        </span>
      </a>
      <a href="https://wa.me/972544228606" className="btn-ghost rounded-full border-[1.2px] border-white/80 px-[18px] py-[10px] font-rubik text-[15px] font-medium leading-[18px] text-white hover:border-white hover:bg-white/10">
        וואטסאפ
      </a>
      <a href="#contact" className="btn-ghost rounded-full border-[1.2px] border-white/80 px-[18px] py-[10px] font-rubik text-[15px] font-medium leading-[18px] text-white hover:border-white hover:bg-white/10">
        השאירו פרטים
      </a>
    </div>
  );
}

/**
 * The Figma panel outline (tab top-left, notches bottom-left/right) for a panel of width `w` (design: 1344).
 * Left features keep their x; right features move with the right edge so corners never distort.
 */
function panelPath(w: number) {
  const r = (x: number) => x + (w - 1344);
  return `M0 28C0 12.5356 12.5356 0 28 0H254C269.464 0 282 12.5356 282 28V56C282 71.4644 294.536 84 310 84H${r(1316)}C${r(1331.46)} 84 ${r(1344)} 96.5356 ${r(1344)} 112V784C${r(1344)} 799.464 ${r(1331.46)} 812 ${r(1316)} 812H${r(1020)}C${r(1004.54)} 812 ${r(992)} 824.536 ${r(992)} 840V872C${r(992)} 887.464 ${r(979.464)} 900 ${r(964)} 900H194C178.536 900 166 887.464 166 872C166 856.536 153.464 844 138 844H28C12.5356 844 0 831.464 0 816V28Z`;
}

/**
 * Desktop hero: the 1392×940 Figma composition. It scales to fit the screen height
 * (so the whole hero is visible without scrolling) and, when that makes it narrower than the page,
 * the canvas widens instead of leaving side gaps: left/right-anchored elements stay pinned to their edges.
 */
function HeroDesktop() {
  // Fit the content width and the screen height (24px page padding above and below).
  const { ref, scale, width } = useFitScale<HTMLDivElement>(1392, 940, 48);
  const canvasW = Math.max(1392, width / scale);
  // The photo keeps its distance to the right-hand copy, so it grows when the canvas widens (design: 760 of 1344).
  const photoW = canvasW - 48 - 584;
  return (
    <div ref={ref} className="relative hidden overflow-hidden lg:block" style={{ height: 940 * scale }}>
      <div
        className="absolute right-0 top-0 h-[940px] origin-top-right overflow-hidden rounded-[36px] bg-night"
        style={{ width: canvasW, transform: `scale(${scale})` }}
      >
        {/* Shaped violet panel */}
        <div
          className="absolute left-[24px] top-[16px] h-[900px] overflow-hidden"
          style={{
            width: canvasW - 48,
            clipPath: `path("${panelPath(canvasW - 48)}")`,
            backgroundImage: "linear-gradient(153deg, #4b4fd8 0%, #5b4fe0 100%)",
          }}
        >
          <span className="absolute top-[220px] size-[620px]" style={{ left: 102 + (photoW - 760) / 2 }}>
            <img loading="lazy" src={asset("violet-glow.svg")} alt="" className="absolute inset-[-27.42%] block size-[154.84%] max-w-none" />
          </span>
          <img loading="eager" {...{ fetchpriority: "high" }} src={asset("hero-photo.png")} alt="מסך LED ענק על חזית בניין בלילה" className="ken-burns absolute left-0 top-[84px] h-[820px] object-cover opacity-[0.92]"
            style={{ width: photoW }} />
          <span
            className="absolute left-0 top-[84px] h-[820px]"
            style={{ width: photoW, backgroundImage: "linear-gradient(to right, rgba(75,79,216,0.15), rgba(79,79,220,0.35) 55%, #5250de)" }}
          />
          {/* soften the photo-fade edge into the panel fill */}
          <span className="absolute top-[84px] h-[820px] w-[260px] bg-gradient-to-r from-[#5250de] to-[rgba(82,80,222,0)]" style={{ left: photoW - 1 }} />
          <span style={{ width: photoW }} className="absolute left-0 top-0 h-[220px] bg-gradient-to-b from-[#4b4fd8] to-[rgba(75,79,216,0)]" />
        </div>

        {/* Header row */}
        <div className="absolute right-[72px] top-[42px]">
          <Logo />
        </div>
        <nav className="absolute right-[325px] top-[47px] flex gap-[38px]" aria-label="ניווט ראשי">
          {NAV.map((n) => (
            <a key={n.label} href={n.href} className="nav-link whitespace-nowrap font-heebo text-[15px] leading-[22px] text-white">
              {n.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="nav-link group absolute left-[80px] top-[39px] flex items-center gap-[14px]">
          <span className="whitespace-nowrap font-rubik text-[17px] font-medium leading-[20px] text-white">קבלו הצעת מחיר</span>
          <img loading="lazy" src={asset("tab-arrow.svg")} alt="" className="size-[38px] transition-transform duration-200 group-hover:rotate-45" />
        </a>

        {/* Copy */}
        <div className="absolute right-[110px] top-[146px] flex w-[542px] flex-col items-start gap-[26px]">
          <span data-reveal className="rounded-full border-[1.2px] border-white/90 px-[16px] py-[6px] font-rubik text-[15px] leading-[18px] text-white">
            קירות וידאו ומסכי LED
          </span>
          <HeroHeadline className="whitespace-nowrap text-[108px] leading-[104px] tracking-[-2.16px]" />
          <p data-reveal style={{ ["--d" as string]: "540ms" }} className="w-[520px] font-heebo text-[19px] leading-[30px] text-white/90">
            {SUB}
          </p>
          <span className="grow-x h-[1.2px] w-[220px] bg-white/80" />
          <div data-reveal style={{ ["--d" as string]: "680ms" }}>
            <SecondaryActions />
          </div>
        </div>

        {/* Left column: live chip, quick catalog, rating, dots */}
        <GlassChip className="absolute left-[48px] top-[128px] !gap-[6px] !py-[5px] !pl-[8px] !pr-[14px]">
          <span className="font-heebo text-[12px] font-medium leading-[18px] text-white/75">· המסך דולק עכשיו</span>
          <span className="font-mont text-[12px] font-bold tracking-[1.68px]" dir="ltr">
            LIVE
          </span>
          <LivePulse />
        </GlassChip>

        <div className="absolute left-[48px] top-[435px] flex w-[300px] flex-col items-end gap-[12px]">
          <span className="flex items-center gap-[8px] rounded-full bg-[rgba(21,21,25,0.55)] px-[14px] py-[6px] backdrop-blur-[6px]">
            <span className="font-heebo text-[14px] font-medium leading-[21px] text-white">ניווט מהיר לקטלוג</span>
            <img loading="lazy" src={asset("dot-lime.svg")} alt="" className="size-[7px]" />
          </span>
          {CATALOG.map((c, i) => (
            <CatalogButton key={c.name} {...c} i={i} />
          ))}
        </div>

        <div data-reveal="left" style={{ ["--d" as string]: "750ms" }} className="absolute left-[48px] top-[800px] flex h-[37px] items-center gap-[6px] rounded-full bg-white/[0.14] px-[14px] backdrop-blur-[6px]">
          <Stars size={13} />
          <span className="font-heebo text-[14px] font-medium leading-[21px] text-white">5.0 בגוגל</span>
        </div>

        <div className="absolute left-[52px] top-[876px] flex h-[31px] items-center gap-[6px] rounded-[14px] bg-[#1e1e24] px-[18px]" dir="ltr" aria-hidden>
          <span className="size-[7px] rounded-[4px] bg-[#7c7cf0]" />
          <span className="h-[7px] w-[22px] rounded-[4px] bg-white" />
          <span className="size-[7px] rounded-[4px] bg-[#7c7cf0]" />
          <span className="size-[7px] rounded-[4px] bg-[#7c7cf0]" />
          <span className="size-[7px] rounded-[4px] bg-[#7c7cf0]" />
        </div>

        {/* Primary CTA sitting in the panel notch */}
        <a
          href="#contact"
          data-reveal="scale"
          style={{ ["--d" as string]: "850ms" }}
          className="btn-lime group absolute right-[24px] top-[840px] flex h-[76px] w-[338px] items-center justify-between rounded-[22px] bg-lime pl-[22px] pr-[28px]"
        >
          <span className="font-rubik text-[20px] font-medium leading-[24px] text-ink">לשיחת ייעוץ חינם</span>
          <img loading="lazy" src={asset("hero-cta-arrow.svg")} alt="" className="size-[40px] transition-transform duration-200 group-hover:rotate-45" />
        </a>

        {/* Jewels */}
        <GlassChip icon="icon-chip-white.svg" className="float-y absolute right-[633px] top-[720px]">
          חזית מסחרית · מרכז העיר
        </GlassChip>
        <span className="absolute right-[510px] top-[766px] h-[40px] w-[26px] rounded-[13px] border-[1.4px] border-white/60" aria-hidden>
          <span className="scroll-wheel absolute left-[8.7px] top-[5.2px] h-[8px] w-[3px] rounded-[2px] bg-lime" />
        </span>
        <Sparkle src="sparkle-hero-22.svg" size={22} style={{ right: 664, top: 226.4 }} />
        <Sparkle src="sparkle-hero-10.svg" size={10} style={{ right: 650, top: 204.4 }} />
        <Sparkle src="sparkle-hero-12.svg" size={12} style={{ right: 144, top: 526.4 }} />
        <Sparkle src="sparkle-9.svg" size={9} style={{ left: 536, top: 276 }} />
        <Sparkle src="sparkle-7.svg" size={7} style={{ left: 446, top: 536 }} />
        <PixelCluster color="lime" mirror style={{ right: 72, top: 872 }} />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <header id="top">
      <HeroDesktop />
    </header>
  );
}
