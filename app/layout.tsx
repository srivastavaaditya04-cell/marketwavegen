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
  title: "Market Wavegen",
  description: "Transform your marketing strategy and achieve long-term success",
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
