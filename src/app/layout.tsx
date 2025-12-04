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

export const metadata: Metadata = {
  title: "Adrian Agüero | Data Engineer",
  description: "Data Engineer specialized in building reliable data pipelines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
