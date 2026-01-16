"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DemandVisualProps {
    activeStep: number;
    isCompact?: boolean;
}

export function DemandVisual({ activeStep, isCompact }: DemandVisualProps) {
    // Define visual states for each step
    const renderCore = () => {
        switch (activeStep) {
            case 0: // Raw Data - Floating Dust
                return (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
                        {[...Array(40)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: [0, 0.4, 0],
                                    x: (Math.random() - 0.5) * 300,
                                    y: (Math.random() - 0.5) * 300,
                                    scale: Math.random() * 0.5 + 0.5
                                }}
                                transition={{ duration: Math.random() * 2 + 2, repeat: Infinity, delay: i * 0.05 }}
                                className="absolute w-0.5 h-0.5 bg-white rounded-full"
                            />
                        ))}
                    </div>
                );
            case 1: // Intent Detection - Magnetic Pull
                return (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute w-64 h-64 rounded-full bg-[#0158e6]/10 blur-3xl"
                        />
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            {[...Array(24)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        x: (Math.random() - 0.5) * 60,
                                        y: (Math.random() - 0.5) * 60,
                                        opacity: [0.4, 1, 0.4]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                                    className="absolute w-1 h-1 bg-[#33b5ff] rounded-full shadow-[0_0_8px_#33b5ff]"
                                />
                            ))}
                        </div>
                    </div>
                );
            case 2: // Sequencing - Orbital Alignment
                return (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 border border-white/[0.03] rounded-full scale-[0.6]" />
                        <div className="absolute inset-0 border border-white/[0.03] rounded-full scale-[0.8]" />
                        <svg className="absolute inset-0 w-full h-full rotate-45" viewBox="0 0 400 400">
                            {[...Array(12)].map((_, i) => (
                                <motion.circle
                                    key={i}
                                    r="1.5"
                                    fill="#33b5ff"
                                    animate={{
                                        cx: [200 + Math.cos(i) * 180, 200],
                                        cy: [200 + Math.sin(i) * 180, 200],
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: "circIn" }}
                                />
                            ))}
                        </svg>
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="w-40 h-40 border border-[#33b5ff]/20 rounded-full flex items-center justify-center relative"
                        >
                            <div className="w-6 h-6 bg-white rounded-full shadow-[0_0_30px_#fff]" />
                            <div className="absolute top-0 w-2 h-2 bg-[#33b5ff] rounded-full" />
                        </motion.div>
                    </div>
                );
            case 3: // Human Validation - The Guardian Glow
                return (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative w-56 h-56"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-[3px] border-dashed border-[#efef39]/30 rounded-full"
                            />
                            <div className="absolute inset-4 rounded-full border border-[#efef39]/10 bg-[#efef39]/5 backdrop-blur-xl flex flex-col items-center justify-center">
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-12 h-12 rounded-2xl bg-[#efef39] flex items-center justify-center shadow-[0_0_40px_rgba(239,239,57,0.5)]"
                                >
                                    <div className="w-5 h-5 border-2 border-black/20 rounded-full animate-spin-slow" />
                                </motion.div>
                                <span className="mt-4 text-[10px] font-black text-[#efef39] uppercase tracking-widest">Verified</span>
                            </div>
                        </motion.div>
                    </div>
                );
            case 4: // Sales Handoff - High Voltage Pulse
                return (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                boxShadow: ["0 0 20px #0158e6", "0 0 80px #0158e6", "0 0 20px #0158e6"]
                            }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="w-32 h-32 bg-gradient-to-br from-[#0158e6] to-[#33b5ff] rounded-3xl flex items-center justify-center"
                        >
                            <svg className="w-12 h-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </motion.div>
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
                                className="absolute w-32 h-32 border border-[#0158e6] rounded-3xl"
                            />
                        ))}
                    </div>
                );
            case 5: // Optimization - Infinite Synthesis
                return (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,rgba(1,88,230,0.1),transparent,rgba(239,239,57,0.1),transparent,rgba(1,88,230,0.1))] animate-spin-slow opacity-50" />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="relative w-72 h-72 border border-white/5 rounded-full"
                        >
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    style={{ rotate: `${i * 60}deg` }}
                                    className="absolute inset-0 flex justify-center"
                                >
                                    <div className="w-3 h-3 bg-white rounded-full -mt-1.5 shadow-[0_0_15px_#fff]" />
                                </motion.div>
                            ))}
                        </motion.div>
                        <div className="absolute flex flex-col items-center">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="text-white font-black text-4xl tracking-tighter uppercase leading-none text-center"
                            >
                                Revenue<br /><span className="text-[#efef39]">Ready</span>
                            </motion.div>
                            <div className="mt-4 h-[2px] w-20 bg-gradient-to-r from-transparent via-[#0158e6] to-transparent" />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={cn(
            "relative aspect-square transition-all duration-500",
            isCompact
                ? "w-24 h-24 lg:w-32 lg:h-32"
                : "w-full max-w-[300px] lg:max-w-[500px] bg-black/40 rounded-[24px] lg:rounded-[40px] border border-white/5 overflow-hidden backdrop-blur-sm group shadow-2xl"
        )}>
            {/* Background Atmosphere */}
            <div className={cn(
                "absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(1,88,230,0.05)_0%,transparent_70%)]",
                isCompact && "opacity-0"
            )} />

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className={cn(
                        "relative w-full h-full",
                        isCompact ? "scale-[0.4] lg:scale-[0.5]" : "scale-100"
                    )}>
                        {renderCore()}
                    </div>
                </motion.div>
            </AnimatePresence>

            {!isCompact && (
                <>
                    {/* Corner Accents */}
                    <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-white/20 rounded-tl-lg" />
                    <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-white/20 rounded-tr-lg" />
                    <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-white/20 rounded-bl-lg" />
                    <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-white/20 rounded-br-lg" />

                    {/* Stage Label */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0158e6] animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                            Phase 0{activeStep + 1}
                        </span>
                    </div>
                </>
            )}
        </div>
    );
}
