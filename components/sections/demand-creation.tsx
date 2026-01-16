"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { demandSteps } from "@/data";
import { useRef, useState, useEffect } from "react";
import { DemandVisual } from "./demand-visual";
import { DemandVisualV2 } from "./demand-visual-v2";
import { cn } from "@/lib/utils";

export function DemandCreation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);

    // Track scroll progress to update active step
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            const step = Math.min(
                Math.floor(latest * demandSteps.length),
                demandSteps.length - 1
            );
            if (step !== activeStep && step >= 0) {
                setActiveStep(step);
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress, activeStep]);

    return (
        <Section className="relative" allowOverflow>
            {/* Background Decor with clipping */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(1,88,230,0.03)_0%,transparent_50%)]" />
            </div>

            <Container>
                <div className="mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-7xl font-bold text-white uppercase tracking-tighter mb-8 leading-none">
                            How We Create <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#efef39] to-[#33b5ff]">Demand</span>
                        </h2>
                        <div className="flex flex-wrap gap-4 items-center">
                            <span className="px-4 py-1.5 rounded-full border border-[#0158e6]/30 bg-[#0158e6]/10 text-[#33b5ff] text-xs font-bold uppercase tracking-widest">The Laboratory</span>
                            <div className="h-[1px] w-24 bg-gradient-to-r from-[#0158e6] to-transparent" />
                        </div>
                    </motion.div>
                </div>

                <div ref={containerRef} className="relative flex flex-col lg:flex-row gap-4 lg:gap-20 items-stretch">
                    {/* Visual Side: Sticky for both */}
                    <div className="sticky top-16 md:top-20 lg:top-40 z-30 w-full lg:w-1/2 lg:self-start h-fit flex items-center justify-center lg:py-10 order-1">
                        {/* Mobile Compact Visual Header - Snappy & Contained */}
                        <div className="lg:hidden flex items-center justify-between w-[94%] mx-auto bg-black/98 backdrop-blur-3xl border border-white/10 py-4 px-6 mt-2 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#33b5ff] shadow-[0_0_8px_#33b5ff]" />
                                    <span className="text-[9px] uppercase font-black tracking-[0.2em] text-white/40">Laboratory Phase</span>
                                </div>
                                <span className="text-sm font-bold text-white uppercase tracking-tight leading-none truncate max-w-[180px]">{demandSteps[activeStep].title}</span>
                            </div>
                            <div className="relative shrink-0">
                                <DemandVisualV2 activeStep={activeStep} isCompact />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#0158e6] rounded-full shadow-[0_0_12px_#0158e6] z-20 border-2 border-black" />
                            </div>
                        </div>

                        {/* Desktop Visual - Direct rendering to avoid hidden classes conflict */}
                        <div className="hidden lg:block w-full">
                            <DemandVisualV2 activeStep={activeStep} />
                        </div>
                    </div>

                    {/* Scrolling Content Side */}
                    <div className="w-full lg:w-1/2 space-y-[25vh] lg:space-y-[80vh] py-[15vh] lg:py-[30vh] order-2 px-4 lg:px-0">
                        {demandSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0.1, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                viewport={{ amount: 0.6 }}
                                className={cn(
                                    "relative transition-all duration-500",
                                    activeStep === i ? "scale-100 lg:scale-105" : "scale-[0.98] opacity-10 blur-[2px]"
                                )}
                            >
                                <div className="flex gap-6 lg:gap-8 group">
                                    <div className="relative">
                                        <div className={cn(
                                            "w-12 h-12 lg:w-16 lg:h-16 rounded-lg lg:rounded-2xl border flex items-center justify-center transition-all duration-500",
                                            activeStep === i
                                                ? "bg-[#efef39] border-[#efef39] text-black shadow-[0_0_30px_rgba(239,239,57,0.3)]"
                                                : "bg-white/5 border-white/10 text-white/30"
                                        )}>
                                            <span className="text-xl lg:text-2xl font-black font-mono">{step.num}</span>
                                        </div>
                                        {/* Connecting Line between numbers */}
                                        {i < demandSteps.length - 1 && (
                                            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-white/10 to-transparent" />
                                        )}
                                    </div>
                                    <div className="pt-2">
                                        <h4 className={cn(
                                            "text-xl lg:text-3xl font-bold mb-4 lg:mb-6 transition-colors duration-500",
                                            activeStep === i ? "text-white" : "text-white/20"
                                        )}>
                                            {step.title}
                                        </h4>
                                        <p className={cn(
                                            "text-base lg:text-xl leading-relaxed font-light transition-colors duration-500",
                                            activeStep === i ? "text-neutral-400" : "text-neutral-700"
                                        )}>
                                            {step.desc}
                                        </p>

                                        {/* Features Tag - Dynamic based on step */}
                                        <div className="mt-8 flex flex-wrap gap-2">
                                            {["Automated", "Verified", "High-Velocity"].map((tag, tIdx) => (
                                                <span key={tIdx} className={cn(
                                                    "px-3 py-1 rounded-md text-[10px] uppercase font-bold tracking-tighter transition-all duration-500",
                                                    activeStep === i ? "bg-white/10 text-white/60 border border-white/10" : "bg-transparent text-transparent border-transparent"
                                                )}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
