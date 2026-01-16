"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { signalSources, emotionalContext } from "@/data";
import { Search, UserCheck, Zap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function FlipSignals() {
    const [activeBox, setActiveBox] = useState<number | null>(null);

    return (
        <Section className="relative overflow-hidden py-24 lg:py-40">
            {/* Background Decor */}
            <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#33b5ff]/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-[#0158e6]/5 rounded-full blur-[80px] pointer-events-none" />

            <Container>
                {/* Header */}
                <div className="mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                            <span className="text-xs md:text-sm font-bold text-[#33b5ff] tracking-[0.2em] uppercase">Proprietary Intelligence</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-[1.1]">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">Flip Signals :</span> <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#33b5ff] via-[#33b5ff]/80 to-[#efef39]">Emotional Buyer Intent Intelligence</span>
                        </h2>

                        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                            <div className="space-y-4 max-w-2xl">
                                <p className="text-2xl md:text-3xl font-light text-white leading-tight">
                                    Know Who Is Ready. <span className="text-[#efef39] font-medium italic underline decoration-[#efef39]/30 underline-offset-8">Know Why.</span>
                                </p>
                                <p className="text-lg md:text-xl text-neutral-400 leading-relaxed font-light">
                                    Flip Signals™ reveals buyer motivation, urgency, and readiness by analyzing emotional context behind behavior.
                                </p>
                            </div>
                            <div className="hidden lg:block w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent shrink-0" />
                        </div>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 md:gap-12">
                    {/* Signal Sources Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ amount: 0.3 }}
                        onViewportEnter={() => {
                            if (window.innerWidth < 1024) setActiveBox(0);
                        }}
                        transition={{ duration: 0.6 }}
                        className={cn(
                            "group relative p-8 md:p-12 rounded-[48px] border transition-all duration-700 bg-black/40 backdrop-blur-md flex flex-col",
                            activeBox === 0
                                ? "border-white/20 shadow-xl shadow-blue-500/10"
                                : "border-white/10 lg:opacity-60 lg:grayscale-[0.5] hover:opacity-100 hover:grayscale-0"
                        )}
                        onMouseEnter={() => setActiveBox(0)}
                    >
                        <div className={cn(
                            "w-16 h-16 rounded-3xl border flex items-center justify-center mb-10 transition-all duration-500",
                            activeBox === 0 ? "bg-[#33b5ff]/10 border-[#33b5ff]/40 shadow-[0_0_20px_rgba(51,181,255,0.2)]" : "bg-white/5 border-white/10"
                        )}>
                            <Search className={cn("w-8 h-8 transition-colors duration-500", activeBox === 0 ? "text-[#33b5ff]" : "text-white/30")} />
                        </div>

                        <div className="mb-10">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">What Flip Signals Captures</h3>
                            <div className="text-xs md:text-sm font-black text-[#33b5ff] uppercase tracking-[0.3em] opacity-80">Signal Sources</div>
                        </div>

                        <div className="space-y-8">
                            {signalSources.map((item, i) => (
                                <div key={i} className="flex items-start gap-6 group/item">
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl bg-white/5 border flex items-center justify-center shrink-0 transition-all duration-500",
                                        activeBox === 0 ? "border-[#33b5ff]/30 group-hover/item:bg-[#33b5ff]/5" : "border-white/10"
                                    )}>
                                        <item.icon size={22} className={cn("transition-all duration-500", activeBox === 0 ? "text-[#33b5ff]" : "text-white/20")} />
                                    </div>
                                    <span className={cn("text-lg md:text-xl font-light transition-all duration-500", activeBox === 0 ? "text-white" : "text-neutral-500")}>{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Emotional Context Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ amount: 0.3 }}
                        onViewportEnter={() => {
                            if (window.innerWidth < 1024) setActiveBox(1);
                        }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={cn(
                            "group relative p-8 md:p-12 rounded-[48px] border transition-all duration-700 bg-black/40 backdrop-blur-md flex flex-col",
                            activeBox === 1
                                ? "border-[#0158e6]/40 shadow-xl shadow-blue-500/20"
                                : "border-white/10 lg:opacity-60 lg:grayscale-[0.5] hover:opacity-100 hover:grayscale-0"
                        )}
                        onMouseEnter={() => setActiveBox(1)}
                    >
                        <div className={cn(
                            "w-16 h-16 rounded-3xl border flex items-center justify-center mb-10 transition-all duration-500",
                            activeBox === 1 ? "bg-[#0158e6]/20 border-[#0158e6]/50 shadow-[0_0_20px_rgba(1,88,230,0.2)]" : "bg-white/5 border-white/10"
                        )}>
                            <UserCheck className={cn("w-8 h-8 transition-colors duration-500", activeBox === 1 ? "text-white" : "text-[#33b5ff]/40")} />
                        </div>

                        <div className="mb-10">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Emotional Context Identified</h3>
                            <div className="text-xs md:text-sm font-black text-[#efef39] uppercase tracking-[0.3em] opacity-80">Market Wavegen Analysis</div>
                        </div>

                        <div className="space-y-8">
                            {emotionalContext.map((item, i) => (
                                <div key={i} className="flex items-start gap-6 group/item">
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl bg-white/5 border flex items-center justify-center shrink-0 transition-all duration-500",
                                        activeBox === 1 ? "border-[#efef39]/30 group-hover/item:bg-[#efef39]/5" : "border-white/10"
                                    )}>
                                        <item.icon size={22} className={cn("transition-all duration-500", activeBox === 1 ? "text-[#efef39]" : "text-white/20")} />
                                    </div>
                                    <span className={cn("text-lg md:text-xl font-light transition-all duration-500", activeBox === 1 ? "text-white" : "text-neutral-500")}>{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Insight Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-16 md:mt-24 relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#efef39]/5 via-[#33b5ff]/5 to-transparent rounded-[40px] blur-[80px]" />
                    <div className="relative p-10 md:p-16 rounded-[40px] bg-black/40 backdrop-blur-md border border-white/10 flex flex-col md:flex-row items-center gap-10 md:gap-16">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#efef39] to-[#33b5ff] p-0.5 shrink-0 flex items-center justify-center animate-pulse shadow-xl shadow-yellow-500/10">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                <Zap size={40} className="text-[#efef39] fill-[#efef39]/20" />
                            </div>
                        </div>
                        <div className="space-y-4 text-center md:text-left">
                            <h4 className="text-2xl md:text-4xl font-bold text-white tracking-tight">Why This Converts Better</h4>
                            <p className="text-lg md:text-2xl text-neutral-400 leading-relaxed font-light">
                                Buyer emotion fades quickly. <span className="text-white font-medium">Teams that respond first convert a higher share of motivated buyers.</span>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </Section>
    );
}
