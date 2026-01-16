"use client";

import { howWeWorkSteps } from "@/data/about-data";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function HowWeWorkVisual() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    return (
        <div ref={containerRef} className="w-full py-20 relative">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-16 md:mb-40 uppercase tracking-widest">
                How We Work
            </h2>

            <div className="relative max-w-7xl mx-auto px-4 pb-10">
                <div className="flex flex-col md:flex-row items-center justify-between relative gap-12 md:gap-0">

                    {/* Desktop Horizontal Connector Line (Behind) */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full hidden md:block" />

                    {/* Mobile Vertical Connector Line (Behind) */}
                    <div className="absolute top-0 left-1/2 w-1 h-full bg-white/10 -translate-x-1/2 rounded-full md:hidden" />

                    {howWeWorkSteps.map((step, idx) => {
                        const isEven = idx % 2 === 0;
                        const isLast = idx === howWeWorkSteps.length - 1;

                        return (
                            <div key={step.id} className="relative flex-1 flex flex-col md:flex-row items-center group w-full md:w-auto">

                                {/* Content Desktop (Top/Bottom) */}
                                <div className={cn(
                                    "absolute w-48 text-center flex-col items-center hidden md:flex",
                                    isEven ? "bottom-[calc(50%+40px)]" : "top-[calc(50%+40px)]"
                                )}>
                                    <h3 className={cn("text-lg font-bold mb-2")} style={{ color: step.color }}>
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-neutral-400">
                                        {step.description}
                                    </p>
                                    <span className={cn(
                                        "hidden group-hover:block absolute w-px h-8 border-l border-dashed border-white/30",
                                        isEven ? "-bottom-8" : "-top-8"
                                    )} />
                                </div>

                                {/* Content Mobile (Side of Icon) */}
                                <div className={cn(
                                    "flex flex-col items-center md:hidden text-center z-10 bg-[#0a0a0a] p-4 rounded-2xl border border-white/5 w-full",
                                )}>
                                    <h3 className="text-lg font-bold mb-2" style={{ color: step.color }}>
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-neutral-400">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Icon Node */}
                                <div className="relative z-10 w-16 h-16 bg-[#0a0a0a] border-4 border-[#0a0a0a] rounded-full flex items-center justify-center shrink-0 order-first md:order-none">
                                    {/* Outer Pulse */}
                                    {isInView && (
                                        <motion.div
                                            initial={{ scale: 1, opacity: 0.5 }}
                                            animate={{ scale: 1.5, opacity: 0 }}
                                            transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.4 }}
                                            className="absolute inset-0 rounded-full border border-white/20"
                                        />
                                    )}

                                    {/* Inner Circle */}
                                    <div
                                        className="w-full h-full rounded-full flex items-center justify-center text-white shadow-xl"
                                        style={{ backgroundColor: step.color }}
                                    >
                                        <step.icon className="w-8 h-8" />
                                    </div>
                                </div>


                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
