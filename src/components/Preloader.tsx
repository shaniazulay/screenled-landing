import { useEffect, useRef, useState, type CSSProperties } from "react";

const TOTAL = 3000; // visible time before the exit starts
const EXIT = 1250; // longest exit transition

/** Exit variants: pixels (default, the chosen LED mosaic) | window | tv via ?exit= */
export type ExitKind = "window" | "pixels" | "tv";
export const EXITS: { id: ExitKind; label: string }[] = [
  { id: "window", label: "1 · חלון נפתח" },
  { id: "pixels", label: "2 · פסיפס LED" },
  { id: "tv", label: "3 · טלוויזיה נדלקת" },
];
export const exitKind = (): ExitKind => {
  const v = new URLSearchParams(window.location.search).get("exit");
  return v === "window" || v === "tv" ? v : "pixels";
};
const TILE = 72; // mosaic tile size (px)
const FLY = 1250; // particle flight time
const SPREAD = 320; // max launch delay spread

type P = { sx: number; sy: number; tx: number; ty: number; d: number; s: number; c: string; spin: number };

/**
 * 3-second loading screen. The logo assembles from ~1,000 LED particles that spiral in from the screen
 * edges into the exact letter shapes (sampled from the real font), then the white box powers on like a CRT,
 * the letters snap sharp, "LED" flickers on like neon, an RGB sync-glitch and a scan line pass.
 * Finally the screen splits into bands that slide away. Fires `preloader-done` for the page entrance.
 */
export default function Preloader() {
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in");
  const [assembled, setAssembled] = useState(false);
  const [count, setCount] = useState(0);
  // Exit: the dark backdrop gets a rectangular hole (clip-path, even-odd) at the SCREEN box, which then
  // opens to the full viewport; a thin lime frame rides the edge of the opening.
  const [bg, setBg] = useState<CSSProperties>({});
  const [frame, setFrame] = useState<CSSProperties>({ opacity: 0 });
  const [kind] = useState<ExitKind>(exitKind);
  // mosaic: tile grid + the logo centre each tile's delay is measured from
  const [grid, setGrid] = useState({ cols: 0, rows: 0, cx: 0, cy: 0 });
  useEffect(() => {
    if (kind !== "pixels") return;
    const set = () => setGrid((g) => ({ ...g, cols: Math.ceil(window.innerWidth / TILE), rows: Math.ceil(window.innerHeight / TILE) }));
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, [kind]);
  const overlay = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  const led = useRef<HTMLSpanElement>(null);
  const box = useRef<HTMLDivElement>(null);

  /* timers, scroll lock, counter */
  useEffect(() => {
    const html = document.documentElement;
    window.scrollTo(0, 0);
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
      const r = box.current?.getBoundingClientRect();
      const W0 = window.innerWidth;
      const H0 = window.innerHeight;
      const holeAt0 = (l: number, t: number, rr: number, bb: number) =>
        `polygon(evenodd, 0 0, ${W0}px 0, ${W0}px ${H0}px, 0 ${H0}px, 0 0, ${l}px ${t}px, ${rr}px ${t}px, ${rr}px ${bb}px, ${l}px ${bb}px, ${l}px ${t}px)`;
      if (kind === "pixels" && r) {
        setGrid((g) => ({ ...g, cx: (r.left + r.right) / 2, cy: (r.top + r.bottom) / 2 }));
      } else if (kind === "tv") {
        // logo collapses to a line (CSS), then the backdrop opens from a 2px horizontal slit
        setBg({ clipPath: holeAt0(-6, H0 / 2 - 1, W0 + 6, H0 / 2 + 1), transition: "none" });
        window.setTimeout(
          () => setBg({ clipPath: holeAt0(-6, -6, W0 + 6, H0 + 6), transition: "clip-path 0.55s cubic-bezier(0.7, 0, 0.2, 1)" }),
          430,
        );
      } else if (r) {
        const W = window.innerWidth;
        const H = window.innerHeight;
        const holeAt = (l: number, t: number, rr: number, bb: number) =>
          `polygon(evenodd, 0 0, ${W}px 0, ${W}px ${H}px, 0 ${H}px, 0 0, ${l}px ${t}px, ${rr}px ${t}px, ${rr}px ${bb}px, ${l}px ${bb}px, ${l}px ${t}px)`;
        const ease = "cubic-bezier(0.8, 0, 0.15, 1)";
        setBg({ clipPath: holeAt(r.left, r.top, r.right, r.bottom), transition: "none" });
        setFrame({ left: r.left, top: r.top, width: r.width, height: r.height, opacity: 1, transition: "none" });
        // next frames: open the window to the whole screen
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            setBg({ clipPath: holeAt(-6, -6, W + 6, H + 6), transition: `clip-path 0.9s ${ease} 0.15s` });
            setFrame({
              left: -6,
              top: -6,
              width: W + 12,
              height: H + 12,
              opacity: 0,
              transition: `left 0.9s ${ease} 0.15s, top 0.9s ${ease} 0.15s, width 0.9s ${ease} 0.15s, height 0.9s ${ease} 0.15s, opacity 0.35s ease 0.75s`,
            });
          }),
        );
      }
      setPhase("out");
      html.style.overflow = "";
      // let the opening start before the page entrance animations kick in
      window.setTimeout(() => {
        html.dataset.loaded = "1";
        window.dispatchEvent(new Event("preloader-done"));
      }, 350);
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

  /* particle assembly */
  useEffect(() => {
    const cv = canvas.current;
    if (!cv || !word.current || !led.current || !box.current) return;
    // The intro is a one-off 3s brand moment, so it runs even when the OS asks for reduced motion.
    let raf = 0;
    let cancelled = false;
    const failSafe = window.setTimeout(() => setAssembled(true), 2000);

    const run = async () => {
      // Make sure the real font is used for sampling (don't wait long on a slow network).
      await Promise.race([document.fonts.load("800 40px Montserrat").then(() => document.fonts.load("700 40px Montserrat")), new Promise((r) => setTimeout(r, 150))]);
      if (cancelled) return;
      const W = window.innerWidth;
      const H = window.innerHeight;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = W * dpr;
      cv.height = H * dpr;
      const ctx = cv.getContext("2d")!;
      ctx.scale(dpr, dpr);

      // Draw the logo letters off-screen at their real positions and sample them into target points.
      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const o = off.getContext("2d", { willReadFrequently: true })!;
      const drawText = (el: HTMLElement, tag: string) => {
        const cs = getComputedStyle(el);
        o.font = `${cs.fontWeight} ${cs.fontSize} Montserrat, sans-serif`;
        o.textBaseline = "middle";
        o.fillStyle = tag;
        let x = el.getBoundingClientRect().left;
        el.querySelectorAll("span").forEach((s) => {
          const r = s.getBoundingClientRect();
          o.fillText(s.textContent || "", r.left, r.top + r.height / 2);
          x = r.right;
        });
        return x;
      };
      drawText(word.current!, "#f00");
      drawText(led.current!, "#0f0");
      const fs = parseFloat(getComputedStyle(word.current!).fontSize);
      const step = Math.max(3, Math.round(fs / 11));
      const img = o.getImageData(0, 0, W, H).data;
      const pts: P[] = [];
      const cx = W / 2;
      const cy = H / 2;
      const R = Math.hypot(W, H) * 0.5;
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          const i = (y * W + x) * 4;
          if (img[i + 3] < 140) continue;
          const isLed = img[i + 1] > img[i];
          const a = Math.atan2(y - cy, x - cx) + (Math.random() - 0.5) * 1.6;
          const rr = R * (0.45 + Math.random() * 0.5); // starts on screen, visible from the first frame
          pts.push({
            sx: cx + Math.cos(a) * rr,
            sy: cy + Math.sin(a) * rr,
            tx: x,
            ty: y,
            d: Math.random() * SPREAD * 0.6 + (Math.abs(x - cx) / W) * SPREAD * 0.8,
            s: step * (isLed ? 0.95 : 0.9),
            c: isLed ? "#d4ff5a" : Math.random() < 0.18 ? "#8f93ff" : Math.random() < 0.5 ? "#d4ff5a" : "#ffffff",
            spin: (Math.random() < 0.5 ? -1 : 1) * (1.2 + Math.random() * 1.6),
          });
        }
      }
      // Outline of the box, so its shape appears out of the swarm too.
      const b = box.current!.getBoundingClientRect();
      const per = 2 * (b.width + b.height);
      for (let k = 0; k < per; k += step * 1.6) {
        let x: number, y: number;
        if (k < b.width) [x, y] = [b.left + k, b.top];
        else if (k < b.width + b.height) [x, y] = [b.right, b.top + (k - b.width)];
        else if (k < 2 * b.width + b.height) [x, y] = [b.right - (k - b.width - b.height), b.bottom];
        else [x, y] = [b.left, b.bottom - (k - 2 * b.width - b.height)];
        const a = Math.random() * Math.PI * 2;
        pts.push({ sx: cx + Math.cos(a) * R, sy: cy + Math.sin(a) * R, tx: x, ty: y, d: Math.random() * SPREAD, s: step * 0.6, c: "#8f93ff", spin: 1.5 });
      }

      const t0 = performance.now();
      const ease = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
      let done = false;
      const frame = (now: number) => {
        const el = now - t0;
        ctx.clearRect(0, 0, W, H);
        let settled = 0;
        for (const p of pts) {
          const t = Math.max(0, Math.min(1, (el - p.d) / FLY));
          if (t >= 1) settled++;
          const e = ease(t);
          // spiral: rotate the remaining offset around the target as it closes in
          const ang = (1 - e) * p.spin;
          const dx = (p.sx - p.tx) * (1 - e);
          const dy = (p.sy - p.ty) * (1 - e);
          const x = p.tx + dx * Math.cos(ang) - dy * Math.sin(ang);
          const y = p.ty + dx * Math.sin(ang) + dy * Math.cos(ang);
          const tw = t < 1 ? 0.6 + 0.4 * Math.sin(now / 55 + p.tx * 0.7) : 1;
          ctx.globalAlpha = Math.min(1, 0.35 + t * 3) * tw;
          ctx.fillStyle = p.c;
          const s = p.s * (1 + (1 - e) * 1.2);
          // LED glow while in flight
          ctx.shadowColor = p.c;
          ctx.shadowBlur = t < 1 ? 12 : 4;
          ctx.fillRect(x - s / 2, y - s / 2, s, s);
        }
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        if (!done && settled > pts.length * 0.9) {
          done = true;
          window.clearTimeout(failSafe);
          setAssembled(true);
        }
        if (el < FLY + SPREAD + 900) raf = requestAnimationFrame(frame);
        else ctx.clearRect(0, 0, W, H);
      };
      raf = requestAnimationFrame(frame);
    };
    run();
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(failSafe);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      ref={overlay}
      data-lenis-prevent
      className={`preloader exit-${kind} ${phase === "out" ? "is-out" : ""} ${assembled ? "is-assembled" : ""}`}
      role="status"
      aria-label="טוען את האתר"
    >
      {kind === "pixels" ? (
        <span className="pl-mosaic" aria-hidden>
          {Array.from({ length: grid.cols * grid.rows }).map((_, i) => {
            const c = i % grid.cols;
            const rr = Math.floor(i / grid.cols);
            const d = Math.hypot(c * TILE + TILE / 2 - grid.cx, rr * TILE + TILE / 2 - grid.cy);
            return (
              <span
                key={i}
                style={{ left: c * TILE, top: rr * TILE, ["--d" as string]: `${Math.round(d * 0.75 + ((i * 37) % 9) * 14)}ms` }}
              />
            );
          })}
        </span>
      ) : (
        <span className="pl-bg" style={bg} aria-hidden />
      )}
      {kind === "tv" && (
        <>
          <span className="pl-tvline" aria-hidden />
          <span className="pl-scanlines" aria-hidden />
        </>
      )}
      <span className="pl-frame" style={frame} aria-hidden />

      <div className="pl-dots" aria-hidden />
      <div className="pl-glow" aria-hidden />

      <div className="pl-stage">
        <div className="pl-logo" dir="ltr">
          <div ref={box} className="pl-box">
            <span className="pl-fill" aria-hidden />
            <span ref={word} className="pl-word">
              {"SCREEN".split("").map((ch, i) => (
                <span key={i} style={{ ["--d" as string]: `${180 + i * 35}ms` }}>
                  {ch}
                </span>
              ))}
            </span>
            <span className="pl-scan" aria-hidden />
          </div>
          <span ref={led} className="pl-led">
            {"LED".split("").map((ch, i) => (
              <span key={i} style={{ ["--d" as string]: `${120 + i * 110}ms` }}>
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

      <canvas ref={canvas} className="pl-canvas" aria-hidden />
    </div>
  );
}

/** Temporary switcher for comparing the three exit transitions (reloads the page with ?exit=…). */
export function ExitSwitch() {
  const current = exitKind();
  return (
    <nav className="exit-switch" aria-label="השוואת מעברים">
      {EXITS.map((e) => (
        <a key={e.id} href={`?exit=${e.id}`} className={e.id === current ? "on" : ""}>
          {e.label}
        </a>
      ))}
    </nav>
  );
}
