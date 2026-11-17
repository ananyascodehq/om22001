import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        academic: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        unit1: {
          light: "#ecfdf5",
          DEFAULT: "#059669",
          dark: "#065f46",
          badge: "#10b981",
        },
        unit2: {
          light: "#eef2ff",
          DEFAULT: "#4f46e5",
          dark: "#3730a3",
          badge: "#6366f1",
        },
        unit3: {
          light: "#f5f3ff",
          DEFAULT: "#7c3aed",
          dark: "#5b21b6",
          badge: "#8b5cf6",
        },
        unit4: {
          light: "#fffbeb",
          DEFAULT: "#d97706",
          dark: "#92400e",
          badge: "#f59e0b",
        },
        unit5: {
          light: "#fff1f2",
          DEFAULT: "#e11d48",
          dark: "#9f1239",
          badge: "#f43f5e",
        },
        // Deep midnight navy palette
        navy: {
          900: "#060b18",
          850: "#080e1c",
          800: "#0a1628",
          750: "#0d1b33",
          700: "#0f2040",
          600: "#122444",
          500: "#1a3360",
        },
        // Mathematical blue accent
        mathblue: {
          DEFAULT: "#2278e0",
          600: "#1d6fce",
          400: "#60a5fa",
          300: "#93c5fd",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-merriweather)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains-mono)", "Menlo", "monospace"],
        jakarta: ["var(--font-plus-jakarta-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 10px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)",
        card: "0 4px 20px -2px rgba(15, 23, 42, 0.06)",
        cardHover: "0 10px 25px -4px rgba(15, 23, 42, 0.1), 0 4px 8px -2px rgba(15, 23, 42, 0.06)",
      },
      keyframes: {
        "float-slow": {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "float-slow": "float-slow 6s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
