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
      <span className="block" data-reveal style={{ ["--d" as string]: "410ms" }}>
        <span className="shimmer">עובר אורח</span>
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
 * The Figma panel outline for a panel of width `w` (design: 1344×900, every corner radius 28).
 * `k` enlarges the header tab, the top band and the two bottom notches (k = 1 is the exact design),
 * so the header and buttons that sit in them can stay close to their original on-screen size.
 */
function panelPath(w: number, k: number) {
  const T = 282 * k; // tab right edge
  const B = 84 * k; // top band height
  const NX = w - 352 * k; // right notch left edge
  const NY = 900 - 88 * k; // right notch top
  const LX = 166 * k; // left notch right edge
  const LY = 900 - 56 * k; // left notch top
  const c = 12.5356; // 28 − bezier handle
  return [
    `M0 28C0 ${c} ${c} 0 28 0`,
    `H${T - 28}C${T - c} 0 ${T} ${c} ${T} 28`,
    `V${B - 28}C${T} ${B - c} ${T + c} ${B} ${T + 28} ${B}`,
    `H${w - 28}C${w - c} ${B} ${w} ${B + c} ${w} ${B + 28}`,
    `V${NY - 28}C${w} ${NY - c} ${w - c} ${NY} ${w - 28} ${NY}`,
    `H${NX + 28}C${NX + c} ${NY} ${NX} ${NY + c} ${NX} ${NY + 28}`,
    `V872C${NX} ${900 - c} ${NX - c} 900 ${NX - 28} 900`,
    `H${LX + 28}C${LX + c} 900 ${LX} ${900 - c} ${LX} 872`,
    `C${LX} ${LY + c} ${LX - c} ${LY} ${LX - 28} ${LY}`,
    `H28C${c} ${LY} 0 ${LY - c} 0 ${LY - 28}V28Z`,
  ].join("");
}

/** Smallest on-screen size (vs. the 1440 design) for the header and buttons when the hero shrinks to fit. */
const MIN_UI = 0.85;

/**
 * Desktop hero: the 1392×940 Figma composition. It scales to fit the screen height (so the whole hero is
 * visible without scrolling) and widens instead of leaving side gaps. The header, chips and buttons are
 * counter-scaled so they never drop below MIN_UI of their design size, and the panel's tab/notches grow to hold them.
 */
function HeroDesktop() {
  // Fit the content width and the screen height (24px page padding above and below).
  const { ref, scale, width } = useFitScale<HTMLDivElement>(1392, 940, 48);
  const canvasW = Math.max(1392, width / scale);
  const k = Math.min(1.6, Math.max(1, MIN_UI / scale)); // counter-scale for UI chrome
  const P = canvasW - 48; // panel width
  const band = 84 * k; // panel top band (header row)
  const bandMid = 16 + band / 2;
  const notchW = 352 * k;
  const notchTop = 16 + 900 - 88 * k;
  const leftNotchTop = 16 + 900 - 56 * k;
  // The photo keeps its distance to the right-hand copy, so it grows when the canvas widens (design: 760 of 1344).
  const photoW = P - 584;
  const photoTop = band;
  const ui = (origin: string) => ({ transform: `scale(${k})`, transformOrigin: origin });
  const ratingBottom = leftNotchTop - 23 * k;
  const catalogBottom = ratingBottom - 65 * k; // 37px rating + 28px gap
  // The catalog stack shrinks a little if it would run into the LIVE chip above it.
  const liveBottom = 16 + band + 28 * k + 40 * k;
  const kCat = Math.max(1, Math.min(k, (catalogBottom - liveBottom - 16) / 337));

  return (
    <div ref={ref} className="relative hidden overflow-hidden lg:block" style={{ height: 940 * scale }}>
      <div
        className="absolute right-0 top-0 h-[940px] origin-top-right overflow-hidden rounded-[36px] bg-night"
        style={{ width: canvasW, transform: `scale(${scale})` }}
      >
        {/* Shaped violet panel */}
        <div
          className="absolute left-[24px] top-[16px] h-[900px] overflow-hidden"
          style={{ width: P, clipPath: `path("${panelPath(P, k)}")`, backgroundImage: "linear-gradient(153deg, #4b4fd8 0%, #5b4fe0 100%)" }}
        >
          <span className="absolute top-[220px] size-[620px]" style={{ left: 102 + (photoW - 760) / 2 }}>
            <img loading="lazy" src={asset("violet-glow.svg")} alt="" className="absolute inset-[-27.42%] block size-[154.84%] max-w-none" />
          </span>
          <div className="absolute left-0 overflow-hidden" style={{ width: photoW, top: photoTop, height: 904 - photoTop }}>
            <img
              loading="eager"
              {...{ fetchpriority: "high" }}
              src={asset("hero-photo.png")}
              alt="מסך LED ענק על חזית בניין בלילה"
              className="ken-burns sd-hero-photo size-full object-cover opacity-[0.92]"
            />
          </div>
          <span
            className="absolute left-0"
            style={{
              width: photoW,
              top: photoTop,
              height: 904 - photoTop,
              backgroundImage: "linear-gradient(to right, rgba(75,79,216,0.15), rgba(79,79,220,0.35) 55%, #5250de)",
            }}
          />
          {/* soften the photo-fade edge into the panel fill */}
          <span className="absolute w-[260px] bg-gradient-to-r from-[#5250de] to-[rgba(82,80,222,0)]" style={{ left: photoW - 1, top: photoTop, height: 904 - photoTop }} />
          <span style={{ width: photoW, top: photoTop - 84 }} className="absolute left-0 h-[220px] bg-gradient-to-b from-[#4b4fd8] to-[rgba(75,79,216,0)]" />
        </div>

        {/* Header row — centred in the top band */}
        <div className="absolute right-[72px] -translate-y-1/2" style={{ top: bandMid }}>
          <div style={ui("right center")}>
            <Logo />
          </div>
        </div>
        <nav
          className="absolute flex -translate-x-1/2 -translate-y-1/2 gap-[38px]"
          style={{ left: `${(811 / 1392) * 100}%`, top: bandMid }}
          aria-label="ניווט ראשי"
        >
          <span className="flex gap-[38px]" style={ui("center")}>
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className="nav-link whitespace-nowrap font-heebo text-[15px] leading-[22px] text-white">
                {n.label}
              </a>
            ))}
          </span>
        </nav>
        <div className="absolute -translate-y-1/2" style={{ left: 24 + 56 * k, top: bandMid }}>
          <a href="#contact" className="nav-link group flex items-center gap-[14px]" style={ui("left center")}>
            <span className="whitespace-nowrap font-rubik text-[17px] font-medium leading-[20px] text-white">קבלו הצעת מחיר</span>
            <img loading="lazy" src={asset("tab-arrow.svg")} alt="" className="size-[38px] transition-transform duration-200 group-hover:rotate-45" />
          </a>
        </div>

        {/* Copy */}
        <div className="sd-hero-copy absolute right-[110px] flex w-[542px] flex-col items-start gap-[26px]" style={{ top: 16 + band + 46 }}>
          <span data-reveal className="rounded-full border-[1.2px] border-white/90 px-[16px] py-[6px] font-rubik text-[15px] leading-[18px] text-white" style={ui("right top")}>
            קירות וידאו ומסכי LED
          </span>
          <HeroHeadline className="whitespace-nowrap text-[108px] leading-[104px] tracking-[-2.16px]" />
          <p data-reveal style={{ ["--d" as string]: "540ms" }} className="w-[520px] font-heebo text-[19px] leading-[30px] text-white/90">
            {SUB}
          </p>
          <span className="grow-x h-[1.2px] w-[220px] bg-white/80" />
          <div data-reveal style={{ ["--d" as string]: "680ms", ...ui("right top") }}>
            <SecondaryActions />
          </div>
        </div>

        {/* Left column: live chip (top), then quick catalog, rating and dots stacked up from the bottom notch */}
        <GlassChip className="absolute !gap-[6px] !py-[5px] !pl-[8px] !pr-[14px]" style={{ left: 24 + 24 * k, top: 16 + band + 28 * k, ...ui("left top") }}>
          <span className="font-heebo text-[12px] font-medium leading-[18px] text-white/75">· המסך דולק עכשיו</span>
          <span className="font-mont text-[12px] font-bold tracking-[1.68px]" dir="ltr">
            LIVE
          </span>
          <LivePulse />
        </GlassChip>

        <div className="absolute flex w-[300px] flex-col items-end gap-[12px]" style={{ left: 24 + 24 * k, bottom: 940 - catalogBottom, transform: `scale(${kCat})`, transformOrigin: "left bottom" }}>
          <span className="flex items-center gap-[8px] rounded-full bg-[rgba(21,21,25,0.55)] px-[14px] py-[6px] backdrop-blur-[6px]">
            <span className="font-heebo text-[14px] font-medium leading-[21px] text-white">ניווט מהיר לקטלוג</span>
            <img loading="lazy" src={asset("dot-lime.svg")} alt="" className="size-[7px]" />
          </span>
          {CATALOG.map((c, i) => (
            <CatalogButton key={c.name} {...c} i={i} />
          ))}
        </div>

        <div
          data-reveal="left"
          className="absolute flex h-[37px] items-center gap-[6px] rounded-full bg-white/[0.14] px-[14px] backdrop-blur-[6px]"
          style={{ ["--d" as string]: "750ms", left: 24 + 24 * k, bottom: 940 - ratingBottom, ...ui("left bottom") }}
        >
          <Stars size={13} />
          <span className="font-heebo text-[14px] font-medium leading-[21px] text-white">5.0 בגוגל</span>
        </div>

        <div
          className="absolute flex h-[31px] -translate-y-1/2 items-center gap-[6px] rounded-[14px] bg-[#1e1e24] px-[18px]"
          style={{ left: 24 + 28 * k, top: leftNotchTop + (916 - leftNotchTop) / 2 + 3.5 * k, ...ui("left center") }}
          dir="ltr"
          aria-hidden
        >
          <span className="size-[7px] rounded-[4px] bg-[#7c7cf0]" />
          <span className="h-[7px] w-[22px] rounded-[4px] bg-white" />
          <span className="size-[7px] rounded-[4px] bg-[#7c7cf0]" />
          <span className="size-[7px] rounded-[4px] bg-[#7c7cf0]" />
          <span className="size-[7px] rounded-[4px] bg-[#7c7cf0]" />
        </div>

        {/* Primary CTA sitting in the panel notch */}
        <div className="absolute bottom-[24px] right-[24px]" style={ui("right bottom")}>
          <a
            href="#contact"
            data-reveal="scale"
            style={{ ["--d" as string]: "850ms" }}
            className="btn-lime group flex h-[76px] w-[338px] items-center justify-between rounded-[22px] bg-lime pl-[22px] pr-[28px]"
          >
            <span className="font-rubik text-[20px] font-medium leading-[24px] text-ink">לשיחת ייעוץ חינם</span>
            <img loading="lazy" src={asset("hero-cta-arrow.svg")} alt="" className="size-[40px] transition-transform duration-200 group-hover:rotate-45" />
          </a>
        </div>

        {/* Jewels */}
        <GlassChip icon="icon-chip-white.svg" className="float-y absolute top-[720px]" style={{ right: 633 + 430 * (k - 1), ...ui("right top") }}>
          חזית מסחרית · מרכז העיר
        </GlassChip>
        <span
          className="absolute h-[40px] w-[26px] rounded-[13px] border-[1.4px] border-white/60"
          style={{ right: 24 + notchW + 134, top: notchTop - 62, display: k > 1.05 ? "none" : undefined }}
          aria-hidden
        >
          <span className="scroll-wheel absolute left-[8.7px] top-[5.2px] h-[8px] w-[3px] rounded-[2px] bg-lime" />
        </span>
        <Sparkle src="sparkle-hero-22.svg" size={22} style={{ right: 664, top: 226.4 + (band - 84) }} />
        <Sparkle src="sparkle-hero-10.svg" size={10} style={{ right: 650, top: 204.4 + (band - 84) }} />
        <Sparkle src="sparkle-hero-12.svg" size={12} style={{ right: 144, top: 526.4 + (band - 84) }} />
        <Sparkle src="sparkle-9.svg" size={9} style={{ left: 536, top: 276 }} />
        <Sparkle src="sparkle-7.svg" size={7} style={{ left: 446, top: 536 }} />
        <PixelCluster color="lime" mirror style={{ right: 72, top: 916 - 44 * k }} />
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
