import { useEffect, useRef, useState } from "react";

/** Returns a ref + scale factor so a fixed-width design canvas fits its container width. */
export function useFitScale<T extends HTMLElement>(designWidth: number) {
  const ref = useRef<T>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / designWidth) || 1);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth]);

  return { ref, scale };
}
