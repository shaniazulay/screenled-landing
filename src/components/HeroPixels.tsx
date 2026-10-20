/** LED pixels drifting up through the hero (deterministic layout, staggered timing). */
export default function HeroPixels({ count = 18, width, height, top = 0 }: { count?: number; width: number; height: number; top?: number }) {
  return (
    <span className="pointer-events-none absolute inset-0" aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
        return (
          <span
            key={i}
            className="hero-pixel"
            style={{
              left: r(1) * width,
              top: top + height * (0.45 + r(2) * 0.55),
              ["--sz" as string]: `${3 + Math.round(r(3) * 5)}px`,
              ["--c" as string]: r(4) < 0.65 ? "#d4ff5a" : r(4) < 0.85 ? "#ffffff" : "#b4b2ff",
              ["--dur" as string]: `${5 + r(5) * 5}s`,
              ["--delay" as string]: `${-r(6) * 9}s`,
              ["--rise" as string]: `${-(140 + r(7) * 260)}px`,
            }}
          />
        );
      })}
    </span>
  );
}
