import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1D33",
          deep: "#071425",
          soft: "#12294A",
          line: "#1E3A5F",
        },
        graphite: "#39414D",
        silver: "#C4CDD8",
        mist: "#F5F7FA",
        gold: {
          DEFAULT: "#B8963E",
          light: "#D7BC72",
          pale: "#F3EBD6",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      maxWidth: { site: "76rem" },
      boxShadow: {
        card: "0 1px 2px rgba(11,29,51,0.06), 0 12px 32px -12px rgba(11,29,51,0.14)",
        lift: "0 2px 4px rgba(11,29,51,0.08), 0 24px 48px -16px rgba(11,29,51,0.22)",
      },
      letterSpacing: { caps: "0.18em" },
    },
  },
  plugins: [],
};
export default config;
