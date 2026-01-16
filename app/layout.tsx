import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CTA } from "@/components/sections/cta";
import { NProgressProvider } from "@/components/providers/nprogress-provider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Market Wavegen | Precision B2B Demand Gen",
  description: "We use real-time intent, buyer behavior, and tech stack intelligence to plan demand programs that engage the right audience before competitors do.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased font-sans`}
      >
        <NProgressProvider />
        <Navbar />
        {children}
        <CTA />
        <Footer />
      </body>
    </html>
  );
}
