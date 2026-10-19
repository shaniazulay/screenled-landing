import type { CSSProperties, ReactNode } from "react";

export const asset = (name: string) => `${import.meta.env.BASE_URL}figma/${name}`;

/** Small "pixels" mark used inside section tags (3×3 grid without the last cell). */
export function PixelsMark({ dark = false }: { dark?: boolean }) {
  const rgb = dark ? "212,255,90" : "84,87,224";
  const cells: [number, number, number][] = [
    [0, 0, 1], [5.3, 0, 0.8], [10.6, 0, 0.6],
    [0, 5.3, 0.8], [5.3, 5.3, 0.6], [10.6, 5.3, 0.4],
    [0, 10.6, 0.6], [5.3, 10.6, 0.4],
  ];
  return (
    <span className="relative block size-[14px] shrink-0 overflow-hidden" aria-hidden>
      {cells.map(([l, t, a], i) => (
        <span
          key={i}
          className="absolute size-[3.4px] rounded-[0.8px]"
          style={{ left: l, top: t, background: `rgba(${rgb},${a})` }}
        />
      ))}
    </span>
  );
}

/** Section label: "label —— 01 ▦" (reads right-to-left). */
export function SectionTag({ label, num, dark = false, className = "" }: { label: string; num: string; dark?: boolean; className?: string }) {
  return (
    <div className={`flex items-center gap-[10px] ${className}`}>
      <PixelsMark dark={dark} />
      <span className={`font-mont text-[13px] font-bold leading-none tracking-[0.78px] ${dark ? "text-lime" : "text-indigo"}`} dir="ltr">
        {num}
      </span>
      <span className={`h-[1.2px] w-[28px] ${dark ? "bg-white/35" : "bg-[rgba(18,22,51,0.35)]"}`} />
      <span className={`whitespace-nowrap font-rubik text-[14px] font-medium leading-[17px] tracking-[0.56px] ${dark ? "text-white" : "text-navy"}`}>
        {label}
      </span>
    </div>
  );
}

/** Decorative 3×3 pixel cluster (34×34) placed in card corners. */
export function PixelCluster({ color, mirror = false, style, className = "" }: { color: "lime" | "indigo"; mirror?: boolean; style?: CSSProperties; className?: string }) {
  const rgb = color === "lime" ? "212,255,90" : "84,87,224";
  // [col, row, alpha] — col 0 is the "anchor" corner
  const cells: [number, number, number][] = [
    [0, 0, 0.85], [1, 0, 0.68], [2, 0, 0.5],
    [0, 1, 0.68], [1, 1, 0.5], [2, 1, 0.32],
    [0, 2, 0.5], [1, 2, 0.32],
  ];
  return (
    <span className={`pointer-events-none absolute size-[34px] overflow-hidden ${className}`} style={style} aria-hidden>
      {cells.map(([c, r, a], i) => (
        <span
          key={i}
          className="absolute size-[6px] rounded-[1.5px]"
          style={{ [mirror ? "right" : "left"]: c * 14, top: r * 14, background: `rgba(${rgb},${a})` }}
        />
      ))}
    </span>
  );
}

/** Glowing 4-point sparkle. `size` is the star's box; the svg glow bleeds 60% around it. */
export function Sparkle({ src, size, style, className = "" }: { src: string; size: number; style?: CSSProperties; className?: string }) {
  return (
    <span className={`pointer-events-none absolute ${className}`} style={{ width: size, height: size, ...style }} aria-hidden>
      <img src={asset(src)} alt="" className="absolute inset-[-60%] block size-[220%] max-w-none" />
    </span>
  );
}

/** Lime pill-ish CTA with a circular arrow on the left. */
export function LimeButton({
  label,
  arrow = "arrow-dark-38.svg",
  arrowSize = 38,
  className = "",
  textClass = "text-[18px]",
  href = "#contact",
}: {
  label: string;
  arrow?: string;
  arrowSize?: number;
  className?: string;
  textClass?: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className={`group flex items-center justify-between rounded-[20px] bg-lime pl-[12px] pr-[22px] transition-[filter,box-shadow] duration-200 hover:shadow-[0_8px_24px_rgba(212,255,90,0.45)] hover:brightness-105 ${className}`}
    >
      <span className={`whitespace-nowrap font-rubik font-medium leading-none text-ink ${textClass}`}>{label}</span>
      <img
        src={asset(arrow)}
        alt=""
        className="shrink-0 transition-transform duration-200 group-hover:rotate-45"
        style={{ width: arrowSize, height: arrowSize }}
      />
    </a>
  );
}

/** Dark translucent chip with optional trailing icon (icon sits on the right in RTL). */
export function GlassChip({ children, icon, className = "", style }: { children: ReactNode; icon?: string; className?: string; style?: CSSProperties }) {
  return (
    <span className={`glass-dark inline-flex items-center gap-[7px] whitespace-nowrap rounded-full px-[12px] py-[6px] font-rubik text-[13px] font-medium leading-[15px] text-white ${className}`} style={style}>
      {icon && <img src={asset(icon)} alt="" className="size-[14px]" />}
      {children}
    </span>
  );
}

/** White outlined chip used on light cards. */
export function LightChip({ children, icon, className = "", style }: { children: ReactNode; icon?: string; className?: string; style?: CSSProperties }) {
  return (
    <span
      className={`inline-flex items-center gap-[7px] whitespace-nowrap rounded-full border border-[rgba(18,22,51,0.14)] bg-white px-[12px] py-[6px] font-rubik text-[13px] font-medium leading-[15px] text-navy ${className}`}
      style={style}
    >
      {icon && <img src={asset(icon)} alt="" className="size-[14px]" />}
      {children}
    </span>
  );
}

/** Soft blurred ellipse rendered from the Figma glow svgs (which already include blur padding). */
export function Glow({ src, box, inset, className = "" }: { src: string; box: CSSProperties; inset: string; className?: string }) {
  return (
    <span className={`pointer-events-none absolute ${className}`} style={box} aria-hidden>
      <span className="absolute" style={{ inset }}>
        <img src={asset(src)} alt="" className="block size-full max-w-none" />
      </span>
    </span>
  );
}

export function Card({ children, className = "", id, dark = false }: { children: ReactNode; className?: string; id?: string; dark?: boolean }) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden rounded-[28px] lg:rounded-[36px] ${
        dark ? "bg-night" : "bg-white shadow-[0_20px_60px_rgba(91,63,208,0.08)]"
      } ${className}`}
    >
      {children}
    </section>
  );
}
