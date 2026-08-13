import type { Metadata, Viewport } from "next";
// TODO: swap to self-hosted .woff2 for perf
import {
  Bricolage_Grotesque,
  Inter,
  JetBrains_Mono,
  Caveat,
} from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { CloudBackdrop } from "@/components/background/CloudBackdrop";
import { SITE } from "@/lib/constants/site";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
  weight: ["500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"), // TODO: real domain
  title: `${SITE.name} — ${SITE.role}, ${SITE.city}`,
  description: `Solo designer and developer based in ${SITE.city}, ${SITE.country}. I build things that are impossible to ignore.`,
  openGraph: {
    title: `${SITE.name} — ${SITE.role}`,
    description: `Solo designer and developer based in ${SITE.city}.`,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#7BB0DA",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${jetbrains.variable} ${caveat.variable}`}
    >
      <body>
        <a href="#content" className="skip-to-content">
          Skip to content
        </a>
        <CloudBackdrop />
        <LenisProvider>
          <main id="content" className="relative">
            {children}
          </main>
        </LenisProvider>
      </body>
    </html>
  );
}
