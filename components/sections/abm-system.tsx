"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { abmSteps } from "@/data";
import { useState, useEffect } from "react";
import { OperatingSystemVisual } from "./abm-system-visual";
import { cn } from "@/lib/utils";

export function AbmSystem() {
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 1024);
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Use hoveredIdx on desktop, activeIdx on mobile
    const currentStep = hoveredIdx !== null ? hoveredIdx : activeIdx;

    return (
        <Section className="relative overflow-visible">
            {/* Background elements with clipping to prevent horizontal scroll */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Background Blueprint Lines */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }}
                />

                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0158e6]/5 rounded-full blur-[120px]" />
            </div>

            <Container>
                <div className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold text-white uppercase tracking-tighter mb-4 leading-[1.1] md:leading-[0.9]">
                            ABM and Intent as the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0158e6] to-[#33b5ff]">Operating System</span>
                        </h2>
                        <h3 className="text-2xl text-white font-medium mb-6">
                            One System That Keeps Sales and Marketing Aligned.
                        </h3>
                        <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed border-l-2 border-[#0158e6] pl-8">
                            Intelligent Database ABM™ unifies firmographics, technographics, and live intent signals.
                        </p>
                    </motion.div>
                </div>

                <div className="lg:grid lg:grid-cols-2 gap-8 lg:gap-32 lg:items-start relative max-w-full">
                    {/* Interactive Visual - Sticky on mobile only, static on desktop */}
                    <div className="sticky lg:static top-[72px] z-30 w-full lg:w-auto h-fit py-4 lg:py-0 lg:order-2 px-4 lg:px-0 lg:mt-0">
                        <div className="w-full flex justify-center scale-75 sm:scale-90 lg:scale-100 transition-transform duration-500">
                            <OperatingSystemVisual activeStep={currentStep} />
                        </div>
                    </div>

                    {/* Content Steps - Scrolling Component */}
                    <div className="space-y-32 lg:space-y-6 lg:order-1 pb-[60vh] lg:pb-0 w-full px-4 lg:px-0 mt-8 lg:mt-0">
                        {abmSteps.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={false}
                                animate={{
                                    opacity: isMobile
                                        ? (currentStep === i ? 1 : 0.05)
                                        : (hoveredIdx === i ? 1 : (hoveredIdx !== null ? 0.4 : 0.6)),
                                    scale: isMobile ? (currentStep === i ? 1 : 0.95) : (hoveredIdx === i ? 1.02 : 1),
                                    y: isMobile ? (currentStep === i ? 0 : 10) : 0,
                                    pointerEvents: (isMobile && currentStep !== i) ? "none" : "auto"
                                }}
                                viewport={{ amount: 0.1, margin: "-40% 0px -30% 0px" }}
                                onViewportEnter={() => {
                                    if (isMobile) setActiveIdx(i);
                                }}
                                onViewportLeave={() => {
                                    if (isMobile && activeIdx === i) setActiveIdx(null);
                                }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                onMouseEnter={() => setHoveredIdx(i)}
                                onMouseLeave={() => setHoveredIdx(null)}
                                className={cn(
                                    "group relative p-8 sm:p-10 rounded-[24px] md:rounded-[40px] border transition-all duration-300 cursor-default",
                                    currentStep === i
                                        ? "bg-white/10 border-white/20 shadow-2xl"
                                        : "bg-white/5 border-white/5"
                                )}
                            >
                                <div className="flex gap-6 md:gap-8 items-start">
                                    <div className={cn(
                                        "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300",
                                        currentStep === i ? "bg-[#0158e6] border-[#0158e6] text-white" : "bg-white/5 border-white/10 text-neutral-500"
                                    )}>
                                        <span className="text-base md:text-lg font-bold font-mono">{i + 1}</span>
                                    </div>
                                    <div>
                                        <h4 className={cn(
                                            "text-xl md:text-2xl font-bold mb-3 transition-colors",
                                            currentStep === i ? "text-white" : "text-neutral-300"
                                        )}>
                                            {item.title}
                                        </h4>
                                        <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-light group-hover:text-neutral-400 transition-colors">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 md:mt-24 border-t border-white/10 pt-8 md:pt-12">
                    <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Result</h3>
                    <p className="text-xl md:text-3xl text-white font-light leading-relaxed max-w-4xl">
                        Dynamic account lists update continuously. <span className="text-[#33b5ff]">Sales and marketing operate from the same priority universe.</span>
                    </p>
                </div>
            </Container>
        </Section>
    );
}
