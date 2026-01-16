"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { outcomes } from "@/data";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Outcomes() {
    const [activeIdx, setActiveIdx] = useState<number | null>(null);

    return (
        <Section id="outcomes" className="relative w-full overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#0158e6]/5 blur-[100px] pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#050505] to-transparent z-0 pointer-events-none" />

            <Container className="relative z-10">
                {/* Header Section */}
                <div className="mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tighter">
                            From Signals to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#efef39] via-white to-[#33b5ff]">Revenue Outcomes</span>
                        </h2>
                        <div className="w-24 h-1 bg-[#0158e6]" />
                    </motion.div>
                </div>

                {/* Key Message Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-16 md:mb-20"
                >
                    <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
                        <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight">
                            We Optimize for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#efef39] to-[#33b5ff]">Revenue</span>, Not Lead Volume.
                        </h3>
                        <p className="text-base md:text-xl text-neutral-300 leading-relaxed max-w-3xl mx-auto">
                            Market Wavegen connects buyer signals directly to business outcomes leadership tracks.
                        </p>
                    </div>
                </motion.div>

                {/* Outcomes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
                    {outcomes.map((item, i) => (
                        <OutcomeCard
                            key={i}
                            item={item}
                            index={i}
                            isActive={activeIdx === i}
                            onEnter={() => {
                                if (window.innerWidth < 768) setActiveIdx(i);
                            }}
                        />
                    ))}
                </div>

                {/* Proof Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="relative p-8 md:p-12 lg:p-16 rounded-3xl md:rounded-[48px] bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 backdrop-blur-md overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0158e6]/10 blur-[80px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#efef39]/5 blur-[80px] pointer-events-none" />

                        <div className="relative z-10 space-y-6 md:space-y-8">
                            {/* Proof Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0158e6]/10 border border-[#0158e6]/20">
                                <div className="w-2 h-2 rounded-full bg-[#0158e6] animate-pulse"></div>
                                <span className="text-xs md:text-sm font-semibold text-[#0158e6] tracking-wide uppercase">Proven Results</span>
                            </div>

                            {/* Proof Content */}
                            <div className="space-y-4">
                                <p className="text-lg md:text-2xl lg:text-3xl text-white font-medium leading-relaxed">
                                    Teams consistently report <span className="text-[#efef39] font-bold">stronger meeting quality</span> and <span className="text-[#33b5ff] font-bold">higher pipeline velocity</span> compared to volume-based demand programs.
                                </p>

                                {/* Stats Row */}
                                <div className="grid grid-cols-2 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-white/10">
                                    <div className="space-y-2">
                                        <div className="text-3xl md:text-4xl lg:text-5xl font-black text-[#efef39]">↑ Quality</div>
                                        <p className="text-xs md:text-sm text-neutral-400 uppercase tracking-wider">Meeting Quality</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-3xl md:text-4xl lg:text-5xl font-black text-[#33b5ff]">↑ Velocity</div>
                                        <p className="text-xs md:text-sm text-neutral-400 uppercase tracking-wider">Pipeline Velocity</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </Section>
    );
}

function OutcomeCard({ item, index, isActive, onEnter }: { item: any; index: number; isActive: boolean; onEnter: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: index % 3 * 0.1 }}
            viewport={{ amount: 0.2 }}
            onViewportEnter={onEnter}
            className={cn(
                "group relative h-full backdrop-blur-md p-8 md:p-10 rounded-[32px] md:rounded-[40px] shadow-xl overflow-hidden transition-all duration-700 border",
                isActive
                    ? "bg-white/10 border-white/20 shadow-2xl shadow-blue-500/5"
                    : "bg-white/5 border-white/10 opacity-70 md:opacity-100"
            )}
        >
            <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-10">
                    <div className={cn(
                        "p-5 rounded-3xl border shadow-inner transition-all duration-500",
                        isActive || "group-hover:scale-110",
                        isActive ? "bg-white/10 border-white/20" : "bg-white/5 border-white/10",
                        item.color
                    )}>
                        <item.icon size={36} strokeWidth={1.5} />
                    </div>
                    <div className={cn("text-5xl font-black italic tracking-tighter transition-all duration-500", isActive ? "opacity-100" : "opacity-20 group-hover:opacity-100", item.color)}>
                        {item.impact}
                    </div>
                </div>

                <h3 className={cn(
                    "text-2xl md:text-3xl font-bold mb-6 leading-tight transition-colors",
                    isActive ? "text-white" : "text-white/80 group-hover:text-white"
                )}>
                    {item.title}
                </h3>

                <p className={cn(
                    "text-lg leading-relaxed font-light mt-auto transition-colors",
                    isActive ? "text-neutral-200" : "text-neutral-400 group-hover:text-neutral-200"
                )}>
                    {item.desc}
                </p>
            </div>
        </motion.div>
    );
}
