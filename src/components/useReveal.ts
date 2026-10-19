import { useEffect } from "react";

const SELECTOR = "[data-reveal], .grow-x";

/**
 * Adds `is-in` to every [data-reveal] element (and .grow-x bars) once it scrolls into view.
 * Watches the DOM too, so elements mounted later (layout switches) are picked up.
 */
export function useReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(SELECTOR).forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    const watch = (root: ParentNode) =>
      root.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (!el.classList.contains("is-in")) io.observe(el);
      });
    // Wait for the loading screen so the hero entrance plays when it is actually visible.
    let started = false;
    const begin = () => {
      if (started) return;
      started = true;
      watch(document);
    };
    if (document.documentElement.dataset.loaded) begin();
    else window.addEventListener("preloader-done", begin, { once: true });
    const mo = new MutationObserver((muts) =>
      muts.forEach((m) =>
        m.addedNodes.forEach((n) => {
          if (started && n instanceof HTMLElement) {
            if (n.matches(SELECTOR)) io.observe(n);
            watch(n);
          }
        }),
      ),
    );
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener("preloader-done", begin);
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}

/** Counts a number up (e.g. the 5.0 rating) the first time the element is visible. */
export function countUp(el: HTMLElement | null, to: number, decimals = 1, ms = 1400) {
  if (!el || !("IntersectionObserver" in window)) return () => {};
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      el.textContent = (to * (1 - Math.pow(1 - p, 3))).toFixed(decimals);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  io.observe(el);
  return () => io.disconnect();
}
