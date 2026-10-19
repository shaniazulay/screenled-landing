import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

const RESERVE = 48; // page padding above + below a section
const MIN_VIEWPORT = 1280; // fit only where the full desktop layout is used

function useIsWide() {
  const [wide, setWide] = useState(() => typeof window !== "undefined" && window.matchMedia(`(min-width: ${MIN_VIEWPORT}px)`).matches);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${MIN_VIEWPORT}px)`);
    const on = () => setWide(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return wide;
}

/**
 * Scales a desktop section so it is fully visible in one screen height.
 * When it has to shrink, the section is laid out wider (container width ÷ scale) so it
 * still spans the full page width instead of leaving side gaps.
 */
export default function FitSection({ children }: { children: ReactNode }) {
  const wide = useIsWide();
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    if (!wide) return;
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    let s = 1;
    let passes = 0;
    const fit = () => {
      const w = o.clientWidth;
      i.style.width = `${w / s}px`;
      const h = i.offsetHeight; // layout height, unaffected by the transform
      const next = Math.min(1, (window.innerHeight - RESERVE) / h);
      if (Math.abs(next - s) > 0.002 && passes < 8) {
        passes++;
        s = next;
        setScale(s);
        requestAnimationFrame(fit);
        return;
      }
      setHeight(h * s);
    };
    const reset = () => {
      passes = 0;
      fit();
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(i);
    ro.observe(o);
    window.addEventListener("resize", reset);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", reset);
    };
  }, [wide]);

  if (!wide) return <>{children}</>;

  return (
    <div ref={outer} className="relative" style={{ height }}>
      <div ref={inner} className="absolute right-0 top-0 origin-top-right" style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
