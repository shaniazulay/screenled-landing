import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lime: "#d4ff5a",
        ink: "#111114",
        navy: "#121633",
        indigo: { DEFAULT: "#5457e0", deep: "#4b4fd8" },
        slate: { body: "#4a4f68", muted: "#5b6078" },
        night: "#151519",
        canvas: "#efebfb",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
        heebo: ["Heebo", "sans-serif"],
        mont: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
