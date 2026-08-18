import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
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
        <Script id="zsiq-init" strategy="afterInteractive">
          {`window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`}
        </Script>
        <Script
          id="zsiqscript"
          src="https://salesiq.zohopublic.in/widget?wc=siq340374aa0da85a384d7c0918a5eba0a222fef3e1806d59ac3b5190b0990a89df"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
