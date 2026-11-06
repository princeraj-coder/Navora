import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Navora — AI Travel Intelligence Platform",
  description: "Next-generation travel intelligence and planning powered by AI. Seamlessly discover, validate, budget and experience coordinated journeys.",
  keywords: ["AI travel planner", "travel intelligence", "itinerary validation", "smart budget", "travel reality engine", "Navora"],
  authors: [{ name: "Navora Intelligence" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-[#050505] text-[#F5F5F5]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#050505] text-[#F5F5F5] selection:bg-teal-500/30 selection:text-teal-200`}
      >
        {children}
      </body>
    </html>
  );
}
