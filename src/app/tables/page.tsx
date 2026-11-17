"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Table2, Search, Info, ArrowRight } from "lucide-react";

export default function StatisticalTablesPage() {
  const [activeTab, setActiveTab] = useState<"z" | "t" | "chi" | "f" | "sqc">("z");
  const [searchFilter, setSearchFilter] = useState("");

  // ================= DATA =================
  // 1. Z-Table Critical Values
  const zCriticalValues = [
    { level: "10% (α = 0.10)", twoTailed: "1.645", rightTailed: "1.282", leftTailed: "-1.282", confLevel: "90%" },
    { level: "5% (α = 0.05)", twoTailed: "1.960", rightTailed: "1.645", leftTailed: "-1.645", confLevel: "95%" },
    { level: "2.5% (α = 0.025)", twoTailed: "2.241", rightTailed: "1.960", leftTailed: "-1.960", confLevel: "97.5%" },
    { level: "2% (α = 0.02)", twoTailed: "2.326", rightTailed: "2.054", leftTailed: "-2.054", confLevel: "98%" },
    { level: "1% (α = 0.01)", twoTailed: "2.576", rightTailed: "2.326", leftTailed: "-2.326", confLevel: "99%" },
    { level: "0.2% (α = 0.002)", twoTailed: "3.090", rightTailed: "2.878", leftTailed: "-2.878", confLevel: "99.8%" },
    { level: "0.1% (α = 0.001)", twoTailed: "3.291", rightTailed: "3.090", leftTailed: "-3.090", confLevel: "99.9%" },
  ];

  // 2. Student's t Table (df 1..30, 40, 60, 120, inf)
  const tTableData = [
    { df: 1, p010: "6.314", p005: "12.706", p002: "31.821", p001: "63.657" },
    { df: 2, p010: "2.920", p005: "4.303", p002: "6.965", p001: "9.925" },
    { df: 3, p010: "2.353", p005: "3.182", p002: "4.541", p001: "5.841" },
    { df: 4, p010: "2.132", p005: "2.776", p002: "3.747", p001: "4.604" },
    { df: 5, p010: "2.015", p005: "2.571", p002: "3.365", p001: "4.032" },
    { df: 6, p010: "1.943", p005: "2.447", p002: "3.143", p001: "3.707" },
    { df: 7, p010: "1.895", p005: "2.365", p002: "2.998", p001: "3.499" },
    { df: 8, p010: "1.860", p005: "2.306", p002: "2.896", p001: "3.355" },
    { df: 9, p010: "1.833", p005: "2.262", p002: "2.821", p001: "3.250" },
    { df: 10, p010: "1.812", p005: "2.228", p002: "2.764", p001: "3.169" },
    { df: 11, p010: "1.796", p005: "2.201", p002: "2.718", p001: "3.106" },
    { df: 12, p010: "1.782", p005: "2.179", p002: "2.681", p001: "3.055" },
    { df: 13, p010: "1.771", p005: "2.160", p002: "2.650", p001: "3.012" },
    { df: 14, p010: "1.761", p005: "2.145", p002: "2.624", p001: "2.977" },
    { df: 15, p010: "1.753", p005: "2.131", p002: "2.602", p001: "2.947" },
    { df: 16, p010: "1.746", p005: "2.120", p002: "2.583", p001: "2.921" },
    { df: 17, p010: "1.740", p005: "2.110", p002: "2.567", p001: "2.898" },
    { df: 18, p010: "1.734", p005: "2.101", p002: "2.552", p001: "2.878" },
    { df: 19, p010: "1.729", p005: "2.093", p002: "2.539", p001: "2.861" },
    { df: 20, p010: "1.725", p005: "2.086", p002: "2.528", p001: "2.845" },
    { df: 21, p010: "1.721", p005: "2.080", p002: "2.518", p001: "2.831" },
    { df: 22, p010: "1.717", p005: "2.074", p002: "2.508", p001: "2.819" },
    { df: 23, p010: "1.714", p005: "2.069", p002: "2.500", p001: "2.807" },
    { df: 24, p010: "1.711", p005: "2.064", p002: "2.492", p001: "2.797" },
    { df: 25, p010: "1.708", p005: "2.060", p002: "2.485", p001: "2.787" },
    { df: 26, p010: "1.706", p005: "2.056", p002: "2.479", p001: "2.779" },
    { df: 27, p010: "1.703", p005: "2.052", p002: "2.473", p001: "2.771" },
    { df: 28, p010: "1.701", p005: "2.048", p002: "2.467", p001: "2.763" },
    { df: 29, p010: "1.699", p005: "2.045", p002: "2.462", p001: "2.756" },
    { df: 30, p010: "1.697", p005: "2.042", p002: "2.457", p001: "2.750" },
    { df: 40, p010: "1.684", p005: "2.021", p002: "2.423", p001: "2.704" },
    { df: 60, p010: "1.671", p005: "2.000", p002: "2.390", p001: "2.660" },
    { df: 120, p010: "1.658", p005: "1.980", p002: "2.358", p001: "2.617" },
    { df: "∞", p010: "1.645", p005: "1.960", p002: "2.326", p001: "2.576" },
  ];

  // 3. Chi-Square Table (df 1..30)
  const chiTableData = [
    { df: 1, p095: "0.0039", p010: "2.706", p005: "3.841", p002: "5.412", p001: "6.635" },
    { df: 2, p095: "0.103", p010: "4.605", p005: "5.991", p002: "7.824", p001: "9.210" },
    { df: 3, p095: "0.352", p010: "6.251", p005: "7.815", p002: "9.837", p001: "11.345" },
    { df: 4, p095: "0.711", p010: "7.779", p005: "9.488", p002: "11.668", p001: "13.277" },
    { df: 5, p095: "1.145", p010: "9.236", p005: "11.070", p002: "13.388", p001: "15.086" },
    { df: 6, p095: "1.635", p010: "10.645", p005: "12.592", p002: "15.033", p001: "16.812" },
    { df: 7, p095: "2.167", p010: "12.017", p005: "14.067", p002: "16.622", p001: "18.475" },
    { df: 8, p095: "2.733", p010: "13.362", p005: "15.507", p002: "18.168", p001: "20.090" },
    { df: 9, p095: "3.325", p010: "14.684", p005: "16.919", p002: "19.679", p001: "21.666" },
    { df: 10, p095: "3.940", p010: "15.987", p005: "18.307", p002: "21.161", p001: "23.209" },
    { df: 11, p095: "4.575", p010: "17.275", p005: "19.675", p002: "22.618", p001: "24.725" },
    { df: 12, p095: "5.226", p010: "18.549", p005: "21.026", p002: "24.054", p001: "26.217" },
    { df: 13, p095: "5.892", p010: "19.812", p005: "22.362", p002: "25.472", p001: "27.688" },
    { df: 14, p095: "6.571", p010: "21.064", p005: "23.685", p002: "26.873", p001: "29.141" },
    { df: 15, p095: "7.261", p010: "22.307", p005: "24.996", p002: "28.259", p001: "30.578" },
    { df: 16, p095: "7.962", p010: "23.542", p005: "26.296", p002: "29.633", p001: "32.000" },
    { df: 17, p095: "8.672", p010: "24.769", p005: "27.587", p002: "30.995", p001: "33.409" },
    { df: 18, p095: "9.390", p010: "25.989", p005: "28.869", p002: "32.346", p001: "34.805" },
    { df: 19, p095: "10.117", p010: "27.204", p005: "30.144", p002: "33.687", p001: "36.191" },
    { df: 20, p095: "10.851", p010: "28.412", p005: "31.410", p002: "35.020", p001: "37.566" },
    { df: 25, p095: "14.611", p010: "34.382", p005: "37.652", p002: "41.566", p001: "44.314" },
    { df: 30, p095: "18.493", p010: "40.256", p005: "43.773", p002: "47.962", p001: "50.892" },
  ];

  // 4. F-Distribution Critical Values at 5% (v1 along columns, v2 along rows)
  const fTableData = [
    { v2: 1, c1: "161.45", c2: "199.50", c3: "215.71", c4: "224.58", c5: "230.16", c6: "233.99", c8: "238.88", c12: "243.91" },
    { v2: 2, c1: "18.51", c2: "19.00", c3: "19.16", c4: "19.25", c5: "19.30", c6: "19.33", c8: "19.37", c12: "19.41" },
    { v2: 3, c1: "10.13", c2: "9.55", c3: "9.28", c4: "9.12", c5: "9.01", c6: "8.94", c8: "8.85", c12: "8.74" },
    { v2: 4, c1: "7.71", c2: "6.94", c3: "6.59", c4: "6.39", c5: "6.26", c6: "6.16", c8: "6.04", c12: "5.91" },
    { v2: 5, c1: "6.61", c2: "5.79", c3: "5.41", c4: "5.19", c5: "5.05", c6: "4.95", c8: "4.82", c12: "4.68" },
    { v2: 6, c1: "5.99", c2: "5.14", c3: "4.76", c4: "4.53", c5: "4.39", c6: "4.28", c8: "4.15", c12: "4.00" },
    { v2: 7, c1: "5.59", c2: "4.74", c3: "4.35", c4: "4.12", c5: "3.97", c6: "3.87", c8: "3.73", c12: "3.57" },
    { v2: 8, c1: "5.32", c2: "4.46", c3: "4.07", c4: "3.84", c5: "3.69", c6: "3.58", c8: "3.44", c12: "3.28" },
    { v2: 9, c1: "5.12", c2: "4.26", c3: "3.86", c4: "3.63", c5: "3.48", c6: "3.37", c8: "3.23", c12: "3.07" },
    { v2: 10, c1: "4.96", c2: "4.10", c3: "3.71", c4: "3.48", c5: "3.33", c6: "3.22", c8: "3.07", c12: "2.91" },
    { v2: 12, c1: "4.75", c2: "3.89", c3: "3.49", c4: "3.26", c5: "3.11", c6: "3.00", c8: "2.85", c12: "2.69" },
    { v2: 15, c1: "4.54", c2: "3.68", c3: "3.29", c4: "3.06", c5: "2.90", c6: "2.79", c8: "2.64", c12: "2.48" },
    { v2: 16, c1: "4.49", c2: "3.63", c3: "3.24", c4: "3.01", c5: "2.85", c6: "2.74", c8: "2.59", c12: "2.42" },
    { v2: 20, c1: "4.35", c2: "3.49", c3: "3.10", c4: "2.87", c5: "2.71", c6: "2.60", c8: "2.45", c12: "2.28" },
    { v2: 24, c1: "4.26", c2: "3.40", c3: "3.01", c4: "2.78", c5: "2.62", c6: "2.51", c8: "2.36", c12: "2.18" },
    { v2: 30, c1: "4.17", c2: "3.32", c3: "2.92", c4: "2.69", c5: "2.53", c6: "2.42", c8: "2.27", c12: "2.09" },
    { v2: "∞", c1: "3.84", c2: "3.00", c3: "2.60", c4: "2.37", c5: "2.21", c6: "2.10", c8: "1.94", c12: "1.75" },
  ];

  // 5. Control Chart Factors (SQC)
  const sqcData = [
    { n: 2, a2: "1.880", d3: "0", d4: "3.267", d2: "1.128", a: "2.121" },
    { n: 3, a2: "1.023", d3: "0", d4: "2.574", d2: "1.693", a: "1.732" },
    { n: 4, a2: "0.729", d3: "0", d4: "2.282", d2: "2.059", a: "1.500" },
    { n: 5, a2: "0.577", d3: "0", d4: "2.114", d2: "2.326", a: "1.342" },
    { n: 6, a2: "0.483", d3: "0", d4: "2.004", d2: "2.534", a: "1.225" },
    { n: 7, a2: "0.419", d3: "0.076", d4: "1.924", d2: "2.704", a: "1.134" },
    { n: 8, a2: "0.373", d3: "0.136", d4: "1.864", d2: "2.847", a: "1.061" },
    { n: 9, a2: "0.337", d3: "0.184", d4: "1.816", d2: "2.970", a: "1.000" },
    { n: 10, a2: "0.308", d3: "0.223", d4: "1.777", d2: "3.078", a: "0.949" },
    { n: 11, a2: "0.285", d3: "0.256", d4: "1.744", d2: "3.173", a: "0.905" },
    { n: 12, a2: "0.266", d3: "0.283", d4: "1.717", d2: "3.258", a: "0.866" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
          <Link href="/" className="hover:text-sky-600 dark:hover:text-sky-400 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-medium">Statistical Tables</span>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <Table2 className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              Standard Statistical Reference Tables
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Verified critical values for Normal Z, Student&apos;s t, Chi-Square, Fisher F, and SQC Factors.
            </p>
          </div>
          <Link
            href="/formulas"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <span>Formula Sheet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-100 dark:bg-slate-800/60 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab("z")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "z"
              ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Normal Z Critical Values
        </button>
        <button
          onClick={() => setActiveTab("t")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "t"
              ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Student&apos;s t Table
        </button>
        <button
          onClick={() => setActiveTab("chi")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "chi"
              ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Chi-Square (χ²) Table
        </button>
        <button
          onClick={() => setActiveTab("f")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "f"
              ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Snedecor&apos;s F Table (5%)
        </button>
        <button
          onClick={() => setActiveTab("sqc")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "sqc"
              ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Control Chart Factors (SQC)
        </button>
      </div>

      {/* ================= TAB 1: Z TABLE ================= */}
      {activeTab === "z" && (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Standard Normal Distribution (Z) Critical Values
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Critical values $Z_\alpha$ for two-tailed and one-tailed hypothesis tests (Unit 2: Large Sample Tests).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                  <th className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Significance Level (α)</th>
                  <th className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Confidence Level</th>
                  <th className="py-3 px-4 font-semibold text-sky-600 dark:text-sky-400">Two-Tailed (|Z|)</th>
                  <th className="py-3 px-4 font-semibold text-emerald-600 dark:text-emerald-400">Right-Tailed (Z &gt; z)</th>
                  <th className="py-3 px-4 font-semibold text-rose-600 dark:text-rose-400">Left-Tailed (Z &lt; -z)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {zCriticalValues.map((row) => (
                  <tr key={row.level} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{row.level}</td>
                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400">{row.confLevel}</td>
                    <td className="py-3 px-4 font-mono font-bold text-sky-600 dark:text-sky-400">{row.twoTailed}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">+{row.rightTailed}</td>
                    <td className="py-3 px-4 font-mono font-bold text-rose-600 dark:text-rose-400">{row.leftTailed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
            <strong>Decision Rule for Large Samples:</strong>
            <p>If the calculated test statistic |Z| exceeds the table critical value, reject the null hypothesis H₀ at significance level α. Otherwise fail to reject H₀.</p>
          </div>
        </div>
      )}

      {/* ================= TAB 2: t TABLE ================= */}
      {activeTab === "t" && (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Student&apos;s t-Distribution Critical Values ($t_\alpha$)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Two-tailed critical values for degrees of freedom $\nu = n - 1$ (single/paired) or $n_1 + n_2 - 2$ (two-sample).
              </p>
            </div>
            <div className="relative w-48">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Filter by df..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="overflow-x-auto max-h-[500px]">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800 z-10">
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="py-2.5 px-4 font-semibold text-slate-700 dark:text-slate-300">df (ν)</th>
                  <th className="py-2.5 px-4 font-semibold text-slate-700 dark:text-slate-300">α = 0.10 (10%)</th>
                  <th className="py-2.5 px-4 font-semibold text-sky-600 dark:text-sky-400">α = 0.05 (5%)</th>
                  <th className="py-2.5 px-4 font-semibold text-indigo-600 dark:text-indigo-400">α = 0.02 (2%)</th>
                  <th className="py-2.5 px-4 font-semibold text-purple-600 dark:text-purple-400">α = 0.01 (1%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {tTableData
                  .filter((r) => !searchFilter || String(r.df).includes(searchFilter))
                  .map((row) => (
                    <tr key={row.df} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                      <td className="py-2 px-4 font-bold text-slate-900 dark:text-white">{row.df}</td>
                      <td className="py-2 px-4 font-mono text-slate-600 dark:text-slate-400">{row.p010}</td>
                      <td className="py-2 px-4 font-mono font-bold text-sky-600 dark:text-sky-400">{row.p005}</td>
                      <td className="py-2 px-4 font-mono text-indigo-600 dark:text-indigo-400">{row.p002}</td>
                      <td className="py-2 px-4 font-mono font-bold text-purple-600 dark:text-purple-400">{row.p001}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 3: CHI-SQUARE TABLE ================= */}
      {activeTab === "chi" && (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Chi-Square (χ²) Distribution Critical Values
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Upper critical values for Goodness of Fit ($df = k - 1 - p$) and Contingency Tables ($df = (r-1)(c-1)$).
              </p>
            </div>
            <div className="relative w-48">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Filter by df..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="overflow-x-auto max-h-[500px]">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800 z-10">
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="py-2.5 px-4 font-semibold text-slate-700 dark:text-slate-300">df (ν)</th>
                  <th className="py-2.5 px-4 font-semibold text-slate-500 dark:text-slate-400">α = 0.95</th>
                  <th className="py-2.5 px-4 font-semibold text-slate-700 dark:text-slate-300">α = 0.10 (10%)</th>
                  <th className="py-2.5 px-4 font-semibold text-purple-600 dark:text-purple-400">α = 0.05 (5%)</th>
                  <th className="py-2.5 px-4 font-semibold text-indigo-600 dark:text-indigo-400">α = 0.02 (2%)</th>
                  <th className="py-2.5 px-4 font-semibold text-rose-600 dark:text-rose-400">α = 0.01 (1%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {chiTableData
                  .filter((r) => !searchFilter || String(r.df).includes(searchFilter))
                  .map((row) => (
                    <tr key={row.df} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                      <td className="py-2 px-4 font-bold text-slate-900 dark:text-white">{row.df}</td>
                      <td className="py-2 px-4 font-mono text-slate-400">{row.p095}</td>
                      <td className="py-2 px-4 font-mono text-slate-600 dark:text-slate-400">{row.p010}</td>
                      <td className="py-2 px-4 font-mono font-bold text-purple-600 dark:text-purple-400">{row.p005}</td>
                      <td className="py-2 px-4 font-mono text-indigo-600 dark:text-indigo-400">{row.p002}</td>
                      <td className="py-2 px-4 font-mono font-bold text-rose-600 dark:text-rose-400">{row.p001}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 4: F TABLE ================= */}
      {activeTab === "f" && (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Snedecor&apos;s F-Distribution Critical Values at 5% Level ($F_{0.05}$)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              $v_1$ = degrees of freedom for numerator (columns), $v_2$ = degrees of freedom for denominator (rows).
            </p>
          </div>

          <div className="overflow-x-auto max-h-[500px]">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800 z-10">
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-300">v₂ \ v₁</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-300">1</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-300">2</th>
                  <th className="py-2.5 px-3 font-semibold text-amber-600 dark:text-amber-400 font-bold">3</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-300">4</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-300">5</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-300">6</th>
                  <th className="py-2.5 px-3 font-semibold text-amber-600 dark:text-amber-400 font-bold">8</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-300">12</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {fTableData.map((row) => (
                  <tr key={row.v2} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">{row.v2}</td>
                    <td className="py-2 px-3 font-mono text-slate-600 dark:text-slate-400">{row.c1}</td>
                    <td className="py-2 px-3 font-mono text-slate-600 dark:text-slate-400">{row.c2}</td>
                    <td className="py-2 px-3 font-mono font-bold text-amber-600 dark:text-amber-400">{row.c3}</td>
                    <td className="py-2 px-3 font-mono text-slate-600 dark:text-slate-400">{row.c4}</td>
                    <td className="py-2 px-3 font-mono text-slate-600 dark:text-slate-400">{row.c5}</td>
                    <td className="py-2 px-3 font-mono text-slate-600 dark:text-slate-400">{row.c6}</td>
                    <td className="py-2 px-3 font-mono font-bold text-amber-600 dark:text-amber-400">{row.c8}</td>
                    <td className="py-2 px-3 font-mono text-slate-600 dark:text-slate-400">{row.c12}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 5: SQC FACTORS ================= */}
      {activeTab === "sqc" && (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Statistical Quality Control (SQC) Control Chart Factors
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Constants for 3-sigma control limits for Mean (X̄) and Range (R) charts for sample size n.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                  <th className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Subgroup Size (n)</th>
                  <th className="py-3 px-4 font-semibold text-rose-600 dark:text-rose-400">A₂ (Mean Chart)</th>
                  <th className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">D₃ (Range LCL)</th>
                  <th className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">D₄ (Range UCL)</th>
                  <th className="py-3 px-4 font-semibold text-indigo-600 dark:text-indigo-400">d₂ (Std Dev Divisor)</th>
                  <th className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">A (3 / √n)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {sqcData.map((row) => (
                  <tr key={row.n} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white">{row.n}</td>
                    <td className="py-2.5 px-4 font-mono font-bold text-rose-600 dark:text-rose-400">{row.a2}</td>
                    <td className="py-2.5 px-4 font-mono text-slate-600 dark:text-slate-400">{row.d3}</td>
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-800 dark:text-slate-200">{row.d4}</td>
                    <td className="py-2.5 px-4 font-mono text-indigo-600 dark:text-indigo-400">{row.d2}</td>
                    <td className="py-2.5 px-4 font-mono text-slate-500">{row.a}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
            <strong>Key Formulas Using These Factors:</strong>
            <ul className="list-disc pl-4 space-y-0.5 mt-1 text-[11px]">
              <li>Mean Chart (X̄): UCL = X̄̄ + A₂R̄, LCL = X̄̄ - A₂R̄</li>
              <li>Range Chart (R): UCL = D₄R̄, LCL = D₃R̄ (LCL = 0 for n &le; 6)</li>
              <li>Process Standard Deviation: &sigma;&#770; = R̄ / d₂</li>
            </ul>
          </div>
        </div>
      )}

      {/* Standard Footnote Citation */}
      <div className="border-t border-slate-200 dark:border-slate-800 pt-6 text-xs text-slate-500 dark:text-slate-400 space-y-1">
        <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
          <Info className="w-4 h-4 text-sky-500" />
          Standard Citation & Source Footnote:
        </div>
        <p className="leading-relaxed">
          Critical values compiled in accordance with standard university mathematical & statistical tables: 
          <em> Fisher &amp; Yates: Statistical Tables for Biological, Agricultural and Medical Research</em> (Oliver &amp; Boyd), 
          <em> Murdoch &amp; Barnes: Statistical Tables for Students of Science, Engineering and Social Sciences</em> (Macmillan), and 
          <em> ASTM Manual on Presentation of Data and Control Chart Analysis</em> (MNL 7).
        </p>
      </div>
    </div>
  );
}
