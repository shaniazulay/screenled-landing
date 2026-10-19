import { useEffect, useRef, useState } from "react";

const TOTAL = 3000; // visible time before the exit starts
const EXIT = 750; // band wipe duration (incl. stagger)
const COLS = 24;
const ROWS = 7;
const BANDS = 7;

/**
 * 3-second loading screen: an LED dot field, the SCREEN box "printed" pixel by pixel in a diagonal wave,
 * letters focusing in, "LED" flickering on like neon, a scan line, a 000→100 counter, then the screen
 * splits into horizontal bands that slide away. Signals `preloader-done` so entrance animations start after.
 */
export default function Preloader() {
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in");
  const [count, setCount] = useState(0);
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    window.scrollTo(0, 0);
    // Block scrolling under the overlay (Lenis skips [data-lenis-prevent]; native scroll is cancelled here).
    const stop = (e: Event) => e.preventDefault();
    const el = overlay.current;
    el?.addEventListener("wheel", stop, { passive: false });
    el?.addEventListener("touchmove", stop, { passive: false });
    html.style.overflow = "hidden";

    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (TOTAL - 250));
      setCount(Math.round(100 * (1 - Math.pow(1 - p, 2.2))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const t1 = window.setTimeout(() => {
      setPhase("out");
      html.style.overflow = "";
      html.dataset.loaded = "1";
      window.dispatchEvent(new Event("preloader-done"));
    }, TOTAL);
    const t2 = window.setTimeout(() => setPhase("gone"), TOTAL + EXIT + 100);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      el?.removeEventListener("wheel", stop);
      el?.removeEventListener("touchmove", stop);
      html.style.overflow = "";
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div ref={overlay} data-lenis-prevent className={`preloader ${phase === "out" ? "is-out" : ""}`} role="status" aria-label="טוען את האתר">
      {/* exit bands (they carry the background) */}
      {Array.from({ length: BANDS }).map((_, i) => (
        <span key={i} className="pl-band" style={{ top: `${(i * 100) / BANDS}%`, height: `${100 / BANDS + 0.5}%`, ["--i" as string]: i }} />
      ))}

      <div className="pl-dots" aria-hidden />
      <div className="pl-glow" aria-hidden />

      <div className="pl-stage">
        <div className="pl-logo" dir="ltr">
          <div className="pl-box">
            <div className="pl-grid" aria-hidden>
              {Array.from({ length: COLS * ROWS }).map((_, i) => {
                const c = i % COLS;
                const r = Math.floor(i / COLS);
                const d = (c + r * 1.6) * 22 + ((i * 37) % 7) * 12;
                return <span key={i} style={{ ["--d" as string]: `${d}ms` }} />;
              })}
            </div>
            <span className="pl-fill" aria-hidden />
            <span className="pl-word">
              {"SCREEN".split("").map((ch, i) => (
                <span key={i} style={{ ["--d" as string]: `${1050 + i * 70}ms` }}>
                  {ch}
                </span>
              ))}
            </span>
            <span className="pl-scan" aria-hidden />
          </div>
          <span className="pl-led">
            {"LED".split("").map((ch, i) => (
              <span key={i} style={{ ["--d" as string]: `${1550 + i * 140}ms` }}>
                {ch}
              </span>
            ))}
          </span>
        </div>

        <p className="pl-tag">כל פיקסל עובד בשבילכם</p>

        <div className="pl-meter" dir="ltr">
          <span className="pl-bar">
            <span style={{ width: `${count}%` }} />
          </span>
          <span className="pl-count">{String(count).padStart(3, "0")}</span>
        </div>
      </div>
    </div>
  );
}
