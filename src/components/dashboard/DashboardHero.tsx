"use client";

import React from "react";

/** Landing banner with the quick links. */
export function DashboardHero() {
  return (
    <section className="stats-hero math-grid-bg relative overflow-hidden rounded-3xl border border-slate-200 dark:border-[#1a2d4a] px-6 py-9 sm:px-10 sm:py-12">
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="math-symbol font-serif text-[#60a5fa] text-7xl right-[43%] top-5">Σ</span>
        <span className="math-symbol font-serif text-[#20b9ca] text-6xl left-[45%] bottom-7">σ²</span>
        <span className="math-symbol font-serif text-[#60a5fa] text-6xl right-8 top-5">χ²</span>
      </div>

      <svg
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:block w-[48%] max-w-[610px] h-auto"
        viewBox="0 0 560 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.72 }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="density-area" x1="280" y1="42" x2="280" y2="218" gradientUnits="userSpaceOnUse">
            <stop stopColor="#20B9CA" stopOpacity=".28" />
            <stop offset="1" stopColor="#20B9CA" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke="#6E9BC0" strokeOpacity=".22" strokeWidth="1">
          <path d="M56 48H520M56 88H520M56 128H520M56 168H520M56 208H520" />
          <path d="M96 32V218M156 32V218M216 32V218M276 32V218M336 32V218M396 32V218M456 32V218" />
        </g>
        <path d="M56 218H520M276 32V218" stroke="#83AFCF" strokeOpacity=".72" strokeWidth="1.5" />
        <path d="M56 218C118 218 164 203 202 174C238 145 248 48 276 48C304 48 314 145 350 174C388 203 434 218 496 218V218H56Z" fill="url(#density-area)" />
        <path
          d="M56 218C118 218 164 203 202 174C238 145 248 48 276 48C304 48 314 145 350 174C388 203 434 218 496 218"
          stroke="#43C7D3"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M276 48V218" stroke="#A8D9E5" strokeOpacity=".7" strokeDasharray="5 6" />
        <path d="M198 212V224M276 212V224M354 212V224" stroke="#83AFCF" strokeWidth="1.4" />
        <g fill="#A8D9E5" fontFamily="ui-monospace, monospace" fontSize="12">
          <text x="188" y="244">μ − σ</text>
          <text x="268" y="244">μ</text>
          <text x="346" y="244">μ + σ</text>
          <text x="282" y="44">f(x)</text>
        </g>
      </svg>

      <div className="relative z-10 max-w-none md:max-w-[48%] space-y-5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-blue-100 dark:bg-[#1a2d4a] text-blue-900 dark:text-[#60a5fa] font-mono tracking-wider">
            REGULATION 2022
          </span>
          <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-[#8ba3bd]">
            Engineering statistics · Anna University
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-[3.4rem] font-extrabold tracking-[-0.045em] leading-[1.08] sm:leading-[1.15] text-slate-950 dark:text-[#e8f4ff]">
          OM22001 <span className="text-blue-700 dark:text-[#64b5f6]">– Statistical Methods for Engineers</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-[#a2b7ce] max-w-lg leading-relaxed">
          A focused mathematics workspace for exam papers, worked solutions, unit notes, and statistical reference.
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {["Descriptive statistics", "Hypothesis testing", "ANOVA", "Quality control"].map((chip) => (
            <span
              key={chip}
              className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-white/70 dark:bg-[#10223a]/80 text-slate-700 dark:text-[#b5cbe0] border border-slate-200/80 dark:border-[#264363]"
            >
              {chip}
            </span>
          ))}
        </div>
        <p className="math-display stats-equation-strip pt-1 text-[13px] sm:text-sm text-blue-800 dark:text-[#66c9d1]">
          <span>x̄ = Σxᵢ / n</span>
          <span className="stats-equation-separator" aria-hidden="true">·</span>
          <span>z = (x̄ − μ) / (σ / √n)</span>
          <span className="stats-equation-separator" aria-hidden="true">·</span>
          <span>H₀ ⇄ H₁</span>
        </p>
      </div>
    </section>
  );
}
