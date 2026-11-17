import type { Metadata } from "next";
import { Inter, Merriweather, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { Footer } from "@/components/layout/Footer";
import { NavigationProgress } from "@/components/layout/NavigationProgress";
import { CursorSoundEffects } from "@/components/layout/CursorSoundEffects";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OM22001 – Statistical Methods for Engineers | Digital Study Material Portal",
  description:
    "Centralized academic repository and material management platform for OM22001 Statistical Methods for Engineers. FAT materials, Semester PYQs, study notes, question-answer pairs, and formulas.",
  keywords: [
    "OM22001",
    "Statistical Methods for Engineers",
    "Anna University",
    "Regulation 2022",
    "FAT Materials",
    "Semester Question Papers",
    "Study Materials",
    "Control Charts",
    "ANOVA",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${merriweather.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable}`}
    >
      <body className="font-sans antialiased bg-slate-50 dark:bg-[#060b18] text-slate-900 dark:text-slate-100 min-h-screen selection:bg-sky-500/20 selection:text-sky-700 dark:selection:text-sky-300">
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <a className="skip-to-content" href="#main-content">
              Skip to content
            </a>
            <NavigationProgress />
            <CursorSoundEffects />
            <TopNavbar />
            <main id="main-content" tabIndex={-1} className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 dark:bg-[#060b18]">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
