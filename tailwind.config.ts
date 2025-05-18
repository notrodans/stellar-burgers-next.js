import { type Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 16px 8px rgba(51,51,255,.25), 0 0 8px 8px rgba(51,51,255,.25)",
        dark: "0 0 16px 8px rgba(40, 40, 50, 0.25), 0 0 8px 8px rgba(20, 20, 24, 0.25)",
        tab: "inset 0px -1px 0px #2F2F37",
        tabselect: "inset 0px -2px 0px #4C4CFF",
      },
    },
  },
  plugins: await Promise.all([import("tailwindcss-animate")]),
} satisfies Config;
