"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { brands } from "@/data";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function TrustedBrands() {
    return (
        <Section className="relative overflow-hidden py-24 bg-page">
            <div className="flex flex-col items-center">
                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl sm:text-3xl md:text-5xl font-bold uppercase tracking-wider mb-16 text-center text-ink"
                >
                    Trusted by <span className="text-brand-cyan">Global B2B Brands</span>
                </motion.h3>

                <div className="w-full mb-16 relative px-8 md:px-16">
                    {/* <div className="absolute inset-y-0 left-0 w-32 md:w-80 bg-gradient-to-r from-page via-page/80 to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-32 md:w-80 bg-gradient-to-l from-page via-page/80 to-transparent z-10 pointer-events-none" /> */}

                    <InfiniteMovingCards
                        items={brands}
                        direction="right"
                        speed="slow"
                    />
                </div>

                {/* <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Link href="/clients" className="inline-flex items-center gap-2 text-ink/60 text-sm md:text-base font-medium hover:text-ink transition-colors tracking-widest uppercase group">
                        VIEW ALL CLIENT
                        <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </motion.div> */}
            </div>
        </Section>
    );
}
