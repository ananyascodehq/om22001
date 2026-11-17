import Link from "next/link";
import { Sigma } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-[#1a2d4a] bg-white/50 dark:bg-[#080e1c] mt-auto transition-colors relative overflow-hidden">
      {/* Decorative math identities — dark mode only, non-interactive */}
      <div
        className="pointer-events-none select-none absolute inset-0 hidden dark:flex items-center justify-around px-12 overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[#e8f4ff] font-mono text-4xl"
          style={{ opacity: 0.04 }}
        >
          x&#x0304; = &#x03A3;x&#x1D62;/n
        </span>
        <span
          className="text-[#e8f4ff] font-mono text-4xl"
          style={{ opacity: 0.04 }}
        >
          &#x03C3;&#xB2; = &#x03A3;(x&#x1D62;&#x2212;&#x03BC;)&#xB2;/n
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Subject Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1d6fce] to-[#0d9488] flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-900/20">
                <Sigma className="w-4 h-4" />
              </div>
              {/* Normal distribution bell curve SVG */}
              <svg
                width="48"
                height="24"
                viewBox="0 0 48 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="hidden dark:block"
                style={{ opacity: 0.6 }}
              >
                <path
                  d="M2 22 C8 22, 10 18, 14 10 C18 2, 20 2, 24 2 C28 2, 30 2, 34 10 C38 18, 40 22, 46 22"
                  stroke="#2278e0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <span className="font-bold text-slate-900 dark:text-[#e8f4ff] text-base">
                OM22001 Statistical Methods for Engineers
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-[#7ea8cc] max-w-md leading-relaxed">
              Anna University Regulation 2022 curriculum support platform. Common course for AE, CE, CS, EC, EE, IT, ME, MN, BT, and CH branches. Includes worked end-semester solutions, FAT tests, and exam reference aids.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-[#7ea8cc] pt-1">
              <span>B.E. / B.Tech Regulation 2022</span>
              <span>•</span>
              <span>3 Credits (L-T-P: 3-0-0)</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-[#e8f4ff] uppercase tracking-wider">
              Academic Repositories
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-[#7ea8cc]">
              <li>
                <Link href="/" className="hover:text-blue-900 dark:hover:text-cyan-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/fat" className="hover:text-blue-900 dark:hover:text-cyan-400 transition-colors">
                  FAT Question Papers &amp; Answers
                </Link>
              </li>
              <li>
                <Link href="/semester" className="hover:text-blue-900 dark:hover:text-cyan-400 transition-colors">
                  Semester Question Papers &amp; Answers
                </Link>
              </li>
              <li>
                <Link href="/study-materials" className="hover:text-blue-900 dark:hover:text-cyan-400 transition-colors">
                  Study Materials &amp; Notes
                </Link>
              </li>
              <li>
                <Link href="/formulas" className="hover:text-blue-900 dark:hover:text-cyan-400 transition-colors">
                  Unit-wise Formula Sheets
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Reference Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-[#e8f4ff] uppercase tracking-wider">
              Exam Tools &amp; Reference
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-[#7ea8cc]">
              <li>
                <Link href="/tables" className="hover:text-primary-600 dark:hover:text-cyan-400 transition-colors">
                  Statistical Tables (Z, t, χ², F)
                </Link>
              </li>
              <li>
                <Link href="/repeated" className="hover:text-primary-600 dark:hover:text-cyan-400 transition-colors">
                  Repeated Exam Questions
                </Link>
              </li>
              <li>
                <Link href="/topics" className="hover:text-primary-600 dark:hover:text-cyan-400 transition-colors">
                  Syllabus Topic Bank
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-primary-600 dark:hover:text-cyan-400 transition-colors">
                  Instant Question Search
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-[#1a2d4a] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-[#7ea8cc]">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p>© {new Date().getFullYear()} OM22001 Stats Hub. Built for engineering students.</p>
            {/* Greek symbols row at very low opacity */}
            <p
              className="font-mono tracking-widest hidden dark:block"
              style={{ opacity: 0.15 }}
            >
              α β μ σ χ² Σ
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              Static Export Ready
            </span>
            <span>•</span>
            <Link href="/admin/import" className="hover:text-slate-700 dark:hover:text-slate-300">
              Admin Helper
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
