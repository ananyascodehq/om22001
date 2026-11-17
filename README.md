# OM22001 — Statistical Methods for Engineers 📊

[![Production Status](https://img.shields.io/badge/Vercel-Live_Deployment-success?style=for-the-badge&logo=vercel)](https://om22001.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![KaTeX](https://img.shields.io/badge/KaTeX-Math_Engine-3298dc?style=for-the-badge&logo=latex)](https://katex.org/)

A modern, high-performance, mobile-responsive academic web portal engineered specifically for **OM22001 – Statistical Methods for Engineers** (Anna University Regulation 2022).

Designed with a rich, mathematics-focused dark aesthetic featuring KaTeX mathematical typography, probability density curves, unit-wise formula sheets, interactive document previews, and worked solutions.

🌐 **Live URL**: [https://om22001.vercel.app/](https://om22001.vercel.app/)

---

## 🎯 Key Sections & Features

### 1. 📑 FAT Question Papers & Answers (`/fat`)
- Complete repository for Faculty Assessment Tests: **FAT 1**, **FAT 2**, and **FAT 3**.
- Strict separation between **Question Papers** and **Answers**.
- Clean action toolbar with direct PDF preview, download, file rename, and deletion.
- Direct links to worked step-by-step solutions hosted on ChatGPT.

### 2. 🎓 Semester Question Papers & Answers (`/semester`)
- Curated coverage of university semester examinations:
  - **SEM PYQ 1** (Dec 2024, Sem 5, Q.Code: 147184)
  - **SEM PYQ 2** (May 2025, Sem 5, Q.Code: 405686)
  - **SEM PYQ 3** (Dec 2025, Sem 6, Q.Code: 133554)
  - **SEM PYQ 4** (May 2026, Sem 6, Q.Code: 323580)
- Deep links to complete step-by-step worked solutions for every session.

### 3. 📚 Study Materials (`/study-materials`)
- Dedicated unit folders:
  - **Unit 1 — Descriptive Statistics**: 32-page handwritten class notes (Measures of Central Tendency, Dispersion, Moments, Skewness, Kurtosis).
  - **Unit 2 — Testing of Hypothesis (Large Samples)**: 14-page handwritten class notes ($Z$-tests for single mean, difference of means, proportions, standard errors).
  - **Unit 3 — Testing of Hypotheses (Small Samples)**: 18-page handwritten class notes (Student's $t$-test, Paired $t$-test, Snedecor's $F$-test, $\chi^2$ Goodness of Fit, Contingency Tables).
  - **Unit 4 — Analysis of Variance (ANOVA)**: One-way and two-way classifications, Latin square design.
  - **Unit 5 — Statistical Quality Control (SQC)**: Control charts ($\bar{X}$, $R$, $p$, $c$ charts), UCL, LCL.
  - **Statistical Tables & Reference Guides**: Standard normal distribution, Student's $t$, Chi-square, and $F$-tables.

### 4. 📐 Formula Sheets (`/formulas`)
- High-fidelity **KaTeX** mathematical rendering for all 5 units.
- View and interactive edit modes with live LaTeX preview.
- One-click print / PDF export with academic layout styling.

### 5. 🔍 Responsive PDF & Document Viewer
- Integrated modal viewer for PDFs and documents.
- Mobile drawer overlay navigation for quick document switching.
- Dedicated mobile toolbar supporting zoom, page navigation, and download.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Actions)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with Lucide React icons
- **Math Formatting**: [KaTeX](https://katex.org/) for fast LaTeX mathematical notation
- **Database & ORM**: PostgreSQL / Neon with [Prisma ORM](https://www.prisma.io/)
- **Cloud Storage**: [@vercel/blob](https://vercel.com/docs/storage/vercel-blob) for secure PDF and document storage
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aneeshkashyap/om22001.git
   cd om22001
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Provide your database URL and Vercel Blob token:
   ```env
   DATABASE_URL="postgresql://..."
   BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Initialize Prisma Client:**
   ```bash
   npx prisma generate
   ```

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 Mobile Responsiveness

The portal is optimized for:
- Mobile devices (320px – 430px) with custom hamburger navigation drawers
- Tablets & iPads (768px – 1024px)
- Ultra-wide desktop displays (1366px – 1920px)

---

## 📄 License

This repository is maintained for academic and educational purposes under the MIT License.
