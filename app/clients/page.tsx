"use client";

import { Container } from "@/components/ui/container";
import { brands } from "@/data";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ClientsPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#0A0A0A] overflow-hidden antialiased pt-28 md:pt-40 pb-24">
      {/* Background Texture similar to other sections */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(1,88,230,0.1)_0%,transparent_50%)]" />

      <Container className="relative z-10">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-6xl font-bold text-white mb-6 tracking-normal leading-none">
              Our Trusted <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0158e6] to-[#33b5ff]">
                Partners
              </span>
            </h1>

            <h2 className="text-xl md:text-2xl font-light text-white/90 border-l-4 border-[#efef39] pl-4 italic mb-8">
              Powering growth for leading B2B enterprises across the globe. We
              are proud to support these visionary companies in their demand
              generation journey.
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {brands.map((brand, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative aspect-[3/2] bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center p-8 hover:bg-white/10 hover:border-white/10 transition-all duration-300"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}
