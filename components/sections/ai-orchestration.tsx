"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { aiOrchestrationCards } from "@/data";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function AiOrchestration() {
    const [activeIdx, setActiveIdx] = useState<number | null>(null);

    return (
        <Section className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#33b5ff]/5 rounded-full blur-[80px] pointer-events-none" />

            <Container>
                {/* Header Section */}
                <div className="mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold text-ink uppercase mb-6 tracking-tighter leading-tight">
                            AI-Orchestrated <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-ink to-brand-cyan">Demand Execution</span>
                        </h2>
                        <div className="space-y-6">
                            <h3 className="text-2xl md:text-4xl font-bold text-ink/90">
                                AI Runs the Engine. <span className="text-brand-cyan">Your Team Closes.</span>
                            </h3>
                            <p className="text-lg md:text-xl text-ink/60 max-w-3xl leading-relaxed">
                                Artificial intelligence manages prioritization, sequencing, timing, and channel selection so revenue teams focus on closing.
                            </p>
                        </div>
                    </motion.div>
                    <div className="w-24 h-1 bg-[#0158e6] mt-10" />
                </div>

                {/* What the System Handles Section */}
                <div className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink/5 border border-ink/10 mb-8"
                    >
                        <span className="text-xs md:text-sm font-semibold text-ink/75 tracking-wider uppercase">What the System Handles</span>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {aiOrchestrationCards.map((card, i) => (
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
                                    "group relative p-8 rounded-[32px] transition-all duration-700 overflow-hidden h-full flex flex-col border backdrop-blur-md",
                                    activeIdx === i
                                        ? "bg-ink/10 border-ink/20 shadow-xl shadow-blue-500/5"
                                        : "bg-ink/5 border-ink/10"
                                )}
                            >
                                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.color} opacity-5 blur-2xl group-hover:opacity-20 transition-opacity`} />

                                <div className={cn(
                                    "mb-6 p-4 rounded-2xl border transition-all duration-300 w-fit",
                                    activeIdx === i ? "bg-ink/10 border-ink/20" : "bg-ink/5 border-ink/5"
                                )}>
                                    <card.icon className={cn("w-8 h-8 transition-colors", activeIdx === i ? "text-brand-yellow" : "text-brand-yellow/50 group-hover:text-brand-yellow")} />
                                </div>

                                <h3 className={cn(
                                    "text-xl font-bold mb-4 transition-colors",
                                    activeIdx === i ? "text-ink" : "text-ink/80 group-hover:text-ink"
                                )}>
                                    {card.title}
                                </h3>

                                <p className={cn(
                                    "transition-colors leading-relaxed text-sm md:text-base",
                                    activeIdx === i ? "text-ink/75" : "text-ink/50 group-hover:text-ink/60"
                                )}>
                                    {card.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Business Impact Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mt-16 md:mt-24"
                >
                    <div className="relative p-6 md:p-12 rounded-[32px] md:rounded-[40px] bg-gradient-to-br from-[#0158e6]/10 to-transparent border border-[#0158e6]/20 backdrop-blur-md">
                        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16">
                            <div className="space-y-4 text-center lg:text-left flex-1">
                                <h4 className="text-lg md:text-2xl font-bold text-brand-cyan uppercase tracking-wider">Business Impact</h4>
                                <p className="text-base md:text-3xl font-medium text-ink leading-tight">
                                    Pilot programs show <span className="text-brand-yellow font-bold">reduced time-to-first-meeting</span> and <span className="text-brand-yellow font-bold">higher meeting acceptance rates</span>.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 md:gap-8 shrink-0 w-full lg:w-auto">
                                <div className="text-center p-4 rounded-2xl bg-ink/5 border border-ink/10 lg:bg-transparent lg:border-0">
                                    <div className="text-2xl md:text-5xl font-black text-brand-yellow">↓ Time</div>
                                    <div className="text-[10px] md:text-xs text-ink/60 mt-2 uppercase tracking-widest">Meeting Speed</div>
                                </div>
                                <div className="text-center p-4 rounded-2xl bg-ink/5 border border-ink/10 lg:bg-transparent lg:border-0">
                                    <div className="text-2xl md:text-5xl font-black text-brand-cyan">↑ Accept</div>
                                    <div className="text-[10px] md:text-xs text-ink/60 mt-2 uppercase tracking-widest">Acceptance Rate</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </Section>
    );
}
