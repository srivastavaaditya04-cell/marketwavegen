"use client";

import { Container } from "@/components/ui/container";
import { aboutContent } from "@/data/about-data";
import { HowWeWorkVisual } from "@/components/sections/how-we-work";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { FAQ } from "@/components/sections/faq";

export default function AboutPage() {
    return (
        <div className="relative min-h-screen w-full bg-[#0A0A0A] overflow-hidden antialiased pt-28 md:pt-40 pb-12 md:pb-24">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(239,239,57,0.05)_0%,transparent_50%)]" />

            <Container className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mb-12"
                >
                    <h1 className="text-3xl md:text-6xl font-bold text-white mb-6 tracking-normal leading-none">
                        A Global Signal-Driven Engine <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0158e6] to-[#33b5ff]">for Predictable B2B Pipeline</span>
                    </h1>
                    <h2 className="text-xl md:text-2xl font-light text-white/90 border-l-4 border-[#efef39] pl-4 italic mb-8">
                               {aboutContent.hero.subtitle}
                      </h2>
                </motion.div>

                {/* Who We Are & Purpose Section */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-32">
                    {/* Who We Are */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="p-8 md:p-12 rounded-[2rem] bg-white/5 border border-white/5 backdrop-blur-md relative overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 w-24 h-24 bg-[#33b5ff]/10 blur-3xl -translate-x-1/2 -translate-y-1/2" />
                        <h2 className="text-2xl font-bold text-[#33b5ff] uppercase tracking-wider mb-8 flex items-center gap-3">
                            {/* <span className="w-8 h-[1px] bg-[#33b5ff]" /> */}
                            {aboutContent.whoWeAre.title}
                        </h2>
                        <div className="space-y-6 text-neutral-300 leading-relaxed text-lg relative z-10">
                            {aboutContent.whoWeAre.content.map((paragraph, idx) => (
                                <p key={idx} className="transition-colors group-hover:text-white/90">{paragraph}</p>
                            ))}
                        </div>
                    </motion.div>

                    {/* Purpose */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-neutral-900/50 border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden group"
                    >
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#efef39]/10 blur-3xl translate-x-1/2 translate-y-1/2" />

                        <h2 className="text-2xl font-bold text-[#efef39] uppercase tracking-wider mb-2 flex items-center gap-3">
                            {/* <span className="w-8 h-[1px] bg-[#efef39]" /> */}
                            {aboutContent.purpose.title}
                        </h2>
                        <h3 className="text-xl font-bold text-white mb-8">
                            {aboutContent.purpose.subtitle}
                        </h3>
                        <div className="space-y-6 text-neutral-300 leading-relaxed text-lg relative z-10">
                            {aboutContent.purpose.content.map((paragraph, idx) => (
                                <p key={idx} className="transition-colors group-hover:text-white/90">{paragraph}</p>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* How We Work Visual */}
                <div className="mb-32">
                    <HowWeWorkVisual />
                </div>

                {/* Where It Began */}
                <div className="max-w-3xl mx-auto text-center mb-32">
                    <h2 className="text-3xl font-bold text-white mb-8">
                        {aboutContent.history.title}
                    </h2>
                    <div className="space-y-4 text-neutral-300 text-lg leading-relaxed">
                        {aboutContent.history.content.map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </div>
                </div>

                <div className="mb-20 relative">
                    {/* Subtle section bg glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-[#33b5ff]/5 blur-[120px] -z-10" />

                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter"
                        >
                            Why Market Wavegen <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#efef39] to-[#33b5ff]">Wins</span>
                        </motion.h2>
                    </div>

                    <BentoGrid className="max-w-6xl mx-auto gap-8 px-4 md:auto-rows-auto">
                        {aboutContent.whyWeWin.items.map((item, i) => (
                            <BentoGridItem
                                key={i}
                                title={item.title}
                                description={item.description}
                                header={
                                    <div className="relative flex flex-1 w-full h-full min-h-[14rem] rounded-3xl bg-black border border-white/5 overflow-hidden group/header">
                                        {/* Content Image */}
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover/header:opacity-60 transition-opacity duration-700"
                                        />

                                        {/* Gradient Overlay for contrast */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                                        {/* Abstract grid for texture */}
                                        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />

                                        {/* Animated signal dot for the first item */}
                                        {i === 0 && (
                                            <div className="absolute top-6 right-6 flex gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-[#efef39] animate-pulse shadow-[0_0_15px_#efef39]" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-[#efef39]/20 animate-pulse delay-150" />
                                            </div>
                                        )}
                                    </div>
                                }
                                icon={<item.icon className="w-6 h-6" />}
                                className={cn("md:col-span-1", item.className)}
                            />
                        ))}
                    </BentoGrid>
                </div>

                {/* Compliance Section */}
                <div className="mb-20 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-[#efef39]/5 blur-[120px] -z-10" />

                    <div className="text-center mb-16">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-sm md:text-base font-bold text-[#33b5ff] uppercase tracking-wider mb-4"
                        >
                            {aboutContent.compliance.subtitle}
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl md:text-5xl font-black text-white tracking-tight"
                        >
                            {aboutContent.compliance.title}
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
                        {aboutContent.compliance.certificates.map((cert, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-[#33b5ff]/30 transition-all duration-300 overflow-hidden">
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#33b5ff]/0 to-[#efef39]/0 group-hover:from-[#33b5ff]/5 group-hover:to-[#efef39]/5 transition-all duration-500" />

                                {/* Certificate Image */}
                                <div className="relative z-10 mb-4 flex justify-center">
                                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/10 p-3 group-hover:scale-105 transition-transform duration-300">
                                        <img
                                            src={cert.image}
                                            alt={cert.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Certificate Info */}
                                <div className="relative z-10 text-center">
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#33b5ff] transition-colors duration-300">
                                        {cert.name}
                                    </h3>
                                    <p className="text-sm text-neutral-400 font-mono">
                                        Certificate No.: <span className="text-[#efef39]">{cert.certNo}</span>
                                    </p>
                                </div>

                                {/* Corner accent */}
                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#33b5ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Press Release Section */}
                <div className="mb-20 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-[#33b5ff]/5 blur-[120px] -z-10" />

                    <div className="text-center mb-16">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-sm md:text-base font-bold text-[#efef39] uppercase tracking-wider mb-4"
                        >
                            {aboutContent.pressRelease.subtitle}
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl md:text-5xl font-black text-white tracking-tight"
                        >
                            {aboutContent.pressRelease.title}
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 max-w-7xl mx-auto px-4">
                        {aboutContent.pressRelease.features.map((feature, idx) => (
                            <motion.a
                                key={idx}
                                href={feature.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="group relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-[#efef39]/40 transition-all duration-300 overflow-hidden cursor-pointer aspect-square">
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#efef39]/0 to-[#33b5ff]/0 group-hover:from-[#efef39]/10 group-hover:to-[#33b5ff]/10 transition-all duration-500" />

                                {/* Logo Container with white background */}
                                <div className="relative z-10 w-full h-full p-6 flex items-center justify-center">
                                    <div className="w-full h-full bg-white rounded-xl p-4 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#efef39]/20 transition-all duration-300">
                                        <img
                                            src={feature.image}
                                            alt={feature.name}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Hover overlay with external link hint */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                                    <div className="relative flex flex-col items-center gap-2">
                                        <svg className="w-8 h-8 text-[#efef39]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        <span className="text-sm text-white font-semibold">View Article</span>
                                    </div>
                                </div>

                                {/* Corner accent */}
                                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#efef39]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <FAQ items={aboutContent.faq.items} variant="embedded" />

            </Container >
        </div >
    );
}
