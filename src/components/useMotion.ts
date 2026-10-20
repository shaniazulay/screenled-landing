import { useEffect } from "react";
import Lenis from "lenis";

const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/**
 * Site-wide motion engine:
 * - Lenis smooth scrolling (wheel / trackpad) with smooth anchor jumps
 * - --scroll-p (0–1 page progress) and --vel (scroll velocity) on <html> for CSS
 * - custom cursor ring, magnetic lime buttons, 3D tilt cards, spotlight on dark cards (fine pointers only)
 * - tap ripple on buttons, count-up numbers ([data-count])
 */
export function useMotion() {
  useEffect(() => {
    // Motion is part of the brand experience, so it runs even when the OS asks for reduced motion.
    const root = document.documentElement;
    const cleanups: (() => void)[] = [];

    /* ── Smooth scroll ── */
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: { offset: -16 } });
    root.style.scrollBehavior = "auto";
    let raf = 0;
    let lastY = window.scrollY;
    let vel = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      const y = window.scrollY;
      const max = root.scrollHeight - window.innerHeight || 1;
      vel += (y - lastY - vel) * 0.18;
      lastY = y;
      root.style.setProperty("--scroll-p", (y / max).toFixed(4));
      root.style.setProperty("--vel", Math.max(-30, Math.min(30, vel)).toFixed(2));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    cleanups.push(() => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    });

    /* ── Tap / click ripple ── */
    const onDown = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(".btn-lime, .btn-ghost");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2.2;
      const sx = r.width / el.offsetWidth || 1; // account for scaled (fit) sections
      const dot = document.createElement("span");
      dot.className = "ripple";
      dot.style.width = dot.style.height = `${size / sx}px`;
      dot.style.left = `${(e.clientX - r.left) / sx - size / sx / 2}px`;
      dot.style.top = `${(e.clientY - r.top) / sx - size / sx / 2}px`;
      el.appendChild(dot);
      window.setTimeout(() => dot.remove(), 650);
    };
    document.addEventListener("pointerdown", onDown);
    cleanups.push(() => document.removeEventListener("pointerdown", onDown));

    /* ── Count-up numbers ── */
    const fmt = new Intl.NumberFormat("en-US");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          io.unobserve(en.target);
          const el = en.target as HTMLElement;
          const to = Number(el.dataset.count);
          const pre = el.dataset.prefix ?? "";
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / 1300);
            el.textContent = pre + fmt.format(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }),
      { threshold: 0.6 },
    );
    document.querySelectorAll("[data-count]").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    if (finePointer()) {
      /* ── Magnetic buttons, tilt cards, spotlight ── */
      let magnet: HTMLElement | null = null;
      let tilt: HTMLElement | null = null;
      const onHover = (e: PointerEvent) => {
        const t = e.target as HTMLElement;

        const b = t.closest<HTMLElement>(".btn-lime");
        if (magnet && magnet !== b) magnet.style.transform = "";
        magnet = b;
        if (b) {
          const r = b.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
          const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
          b.style.transform = `translate(${dx * 10}px, ${dy * 8}px)`;
        }

        const c = t.closest<HTMLElement>(".tilt");
        if (tilt && tilt !== c) tilt.style.transform = "";
        tilt = c;
        if (c) {
          const r = c.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          c.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg)`;
          c.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
          c.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
        }

        const s = t.closest<HTMLElement>(".spotlight");
        if (s) {
          const r = s.getBoundingClientRect();
          s.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
          s.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
        }
      };
      const onOut = () => {
        if (magnet) magnet.style.transform = "";
        if (tilt) tilt.style.transform = "";
        magnet = tilt = null;
      };
      document.addEventListener("pointermove", onHover);
      document.addEventListener("pointerleave", onOut);
      cleanups.push(() => {
        document.removeEventListener("pointermove", onHover);
        document.removeEventListener("pointerleave", onOut);
      });
    }

    return () => cleanups.forEach((f) => f());
  }, []);
}
