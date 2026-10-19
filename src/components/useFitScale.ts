import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref + scale factor so a fixed-size design canvas fits its container width
 * and, when `designHeight` is given, also fits the viewport height (minus `reserve` px).
 */
export function useFitScale<T extends HTMLElement>(designWidth: number, designHeight?: number, reserve = 0) {
  const ref = useRef<T>(null);
  const [scale, setScale] = useState(1);
  const [width, setWidth] = useState(designWidth);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const byWidth = el.clientWidth / designWidth;
      const byHeight = designHeight ? (window.innerHeight - reserve) / designHeight : Infinity;
      setScale(Math.min(1, byWidth, byHeight) || 1);
      setWidth(el.clientWidth || designWidth);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [designWidth, designHeight, reserve]);

  return { ref, scale, width };
}
