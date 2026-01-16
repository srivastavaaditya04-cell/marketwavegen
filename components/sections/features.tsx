"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { features } from "@/data";
import { useState } from "react";

export function Features() {
    const [activeIdx, setActiveIdx] = useState<number | null>(null);

    return (
        <Section className="relative w-full overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0158e6]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#efef39]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />

            <Container className="relative z-10">
                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl"
                    >
                        Why Global B2B Teams Choose <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#efef39] to-white">Market Wavegen</span>
                    </motion.h2>
                    <div className="w-24 h-1 bg-[#0158e6]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            viewport={{ amount: 0.2 }}
                            onViewportEnter={() => {
                                if (window.innerWidth < 768) setActiveIdx(i);
                            }}
                            className={cn(
                                "relative group overflow-hidden p-6 sm:p-8 rounded-[24px] md:rounded-[32px] border backdrop-blur-md transition-all duration-700",
                                activeIdx === i ? "bg-white/10 border-white/20 shadow-xl shadow-blue-500/5" : "bg-white/5 border-white/5",
                                feature.className
                            )}
                        >
                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className={cn(
                                        "text-xl sm:text-2xl md:text-3xl font-bold max-w-[80%] leading-tight transition-colors",
                                        activeIdx === i ? "text-white" : "text-white/80 group-hover:text-white"
                                    )}>
                                        {feature.title}
                                    </h3>
                                    <span className={cn(
                                        "text-4xl sm:text-5xl font-mono font-bold transition-colors select-none",
                                        activeIdx === i ? "text-white/40" : "text-white/5 group-hover:text-white/70"
                                    )}>
                                        {feature.id}
                                    </span>
                                </div>

                                <p className={cn(
                                    "text-lg leading-relaxed font-light transition-colors",
                                    activeIdx === i ? "text-white/90" : "text-white/70 group-hover:text-white/90"
                                )}>
                                    {feature.description}
                                </p>
                            </div>

                            {/* Hover Effect (Desktop) */}
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block" />
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
