import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { PortfolioProvider } from "@/lib/store";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

const siteUrl = "https://adrianaguero.dev";

export const metadata: Metadata = {
  title: "Adrián Agüero | Data Engineer",
  description:
    "Data Engineer especializado en pipelines ETL, Big Data (Hadoop, Spark, NiFi) y SQL. Experiencia en banca con datos financieros críticos. Portfolio interactivo con IA.",
  keywords: [
    "Data Engineer", "ETL", "SQL", "Hadoop", "Spark", "Apache NiFi",
    "Hive", "PySpark", "Big Data", "Azure", "Data Pipeline",
    "Buenos Aires", "Argentina", "Portfolio"
  ],
  authors: [{ name: "Adrián Agüero", url: siteUrl }],
  creator: "Adrián Agüero",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "Adrián Agüero | Data Engineer",
    title: "Adrián Agüero — Data Engineer | ETL, Spark, SQL, Big Data",
    description:
      "Portfolio interactivo de Data Engineer con IA. Especializado en pipelines ETL sobre Hadoop, integración multi-banco y optimización SQL.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Adrián Agüero — Data Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adrián Agüero — Data Engineer",
    description:
      "Portfolio interactivo con IA. Especializado en ETL, Spark, SQL y Big Data.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Adrián Agüero",
              jobTitle: "Data Engineer",
              url: siteUrl,
              sameAs: [
                "https://github.com/AdrianAguero",
                "https://linkedin.com/in/adrianaguero",
              ],
              knowsAbout: [
                "ETL", "SQL", "Apache Spark", "Apache NiFi", "Hadoop",
                "Hive", "PySpark", "Big Data", "Azure", "Data Pipelines",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Helios System (Banca)",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Buenos Aires",
                addressCountry: "AR",
              },
            }),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${firaCode.variable} antialiased`}
      >
        <div className="bg-background text-textMain md:overflow-hidden min-h-screen md:h-screen w-screen">
          <PortfolioProvider>
            {children}
          </PortfolioProvider>
        </div>
      </body>
    </html>
  );
}
