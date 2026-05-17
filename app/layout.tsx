import type { Metadata } from "next";
import { Geist, Allura, Italiana } from "next/font/google";
import "./globals.css";
import { BUSINESS_CONFIG } from "@/lib/config/business.config";
import { Navbar } from "@/components/ui/Navbar";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: ["400"],
});

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: `${BUSINESS_CONFIG.name} — ${BUSINESS_CONFIG.tagline}`,
  description: BUSINESS_CONFIG.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className={`${geist.variable} ${allura.variable} ${italiana.variable} h-full antialiased`}>
        <body className={`${allura.variable} ${italiana.variable} min-h-full bg-[#FAF8F5] text-stone-900`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
