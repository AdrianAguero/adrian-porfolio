import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Serif, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { PortfolioProvider } from "@/lib/store";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-serif",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://adrian-porfolio.vercel.app";

export const metadata: Metadata = {
  title: "Adrián Agüero | Data Engineer",
  description:
    "Data Engineer especializado en pipelines ETL, Big Data (Hadoop, NiFi, Hive) y SQL. Experiencia en banca con datos financieros críticos.",
  keywords: [
    "Data Engineer", "ETL", "SQL", "Hadoop", "Apache NiFi",
    "Hive", "Impala", "Big Data", "Azure", "Data Pipeline",
    "Buenos Aires", "Argentina",
  ],
  authors: [{ name: "Adrián Agüero", url: siteUrl }],
  creator: "Adrián Agüero",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "Adrián Agüero | Data Engineer",
    title: "Adrián Agüero — Data Engineer",
    description: "Portfolio interactivo con IA. ETL, Hadoop, SQL, banca.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${ibmPlexSans.variable} ${ibmPlexSerif.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}
