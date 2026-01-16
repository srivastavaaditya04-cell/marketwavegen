"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { User, Search, Zap, CheckCircle2, Send, BarChart3 } from "lucide-react";

interface DemandVisualV2Props {
    activeStep: number;
    isCompact?: boolean;
}

export function DemandVisualV2({ activeStep, isCompact }: DemandVisualV2Props) {
    const renderVisual = () => {
        switch (activeStep) {
            case 0: // ICP & Buying Group
                return (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(1,88,230,0.1)_0%,transparent_70%)]" />
                        <svg className="w-4/5 h-4/5 text-white/10" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
                            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
                        </svg>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative"
                        >
                            <div className={cn("flex gap-3", isCompact ? "scale-[0.85]" : "scale-100")}>
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            y: [0, -6, 0],
                                            borderColor: i === 1 ? "#33b5ff" : "rgba(255,255,255,0.1)"
                                        }}
                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                                        className={cn(
                                            "rounded-xl border bg-black/50 backdrop-blur-xl flex flex-col items-center justify-center p-2",
                                            isCompact ? "w-11 h-14" : "w-16 h-20"
                                        )}
                                    >
                                        <User className={cn(isCompact ? "w-4 h-4 mb-1" : "w-6 h-6 mb-2", i === 1 ? "text-[#33b5ff]" : "text-white/20")} />
                                        <div className={cn("bg-white/5 rounded-full", isCompact ? "h-0.5 w-5" : "h-1 w-8")} />
                                    </motion.div>
                                ))}
                            </div>
                            {isCompact && (
                                <div className="absolute -inset-2 border border-[#33b5ff]/20 rounded-xl pointer-events-none" />
                            )}
                        </motion.div>
                    </div>
                );
            case 1: // Omnichannel Intent
                return (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className={cn("absolute inset-0 flex items-center justify-center", isCompact ? "scale-50" : "scale-100")}>
                            {[...Array(2)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        scale: [1, 1.4, 1],
                                        opacity: [0.1, 0.2, 0.1]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, delay: i * 1.5, ease: "easeOut" }}
                                    className="absolute w-40 h-40 border border-[#0158e6] rounded-full"
                                />
                            ))}
                        </div>
                        <div className={cn("z-10 bg-black/60 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl transition-all", isCompact ? "p-4" : "p-6")}>
                            <Search className={cn("text-[#33b5ff]", isCompact ? "w-6 h-6" : "w-10 h-10")} />
                            <div className="mt-4 space-y-2">
                                <motion.div animate={{ width: [20, 40, 20] }} className="h-1 bg-[#33b5ff]/40 rounded-full" />
                                <motion.div animate={{ width: [30, 20, 30] }} className="h-1 bg-[#33b5ff]/20 rounded-full" />
                            </div>
                        </div>
                        {/* Animated pulses towards center */}
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                style={{ rotate: `${i * 45}deg` }}
                                className="absolute inset-0 flex justify-center"
                            >
                                <motion.div
                                    animate={{ y: [200, 100], opacity: [0, 1, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                    className="w-0.5 h-8 bg-gradient-to-t from-transparent to-[#33b5ff]"
                                />
                            </motion.div>
                        ))}
                    </div>
                );
            case 2: // Targeted Content
                return (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className={cn("grid grid-cols-2 gap-4 transition-all", isCompact ? "w-full h-full p-2" : "w-4/5 h-4/5")}>
                            {[...Array(4)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={cn("border border-white/5 bg-white/5 rounded-2xl flex flex-col justify-between transition-all", isCompact ? "p-2" : "p-4")}
                                >
                                    <div className="flex justify-between items-start">
                                        <Zap className={cn(i === 1 ? "text-[#efef39]" : "text-white/10", isCompact ? "w-3 h-3" : "w-4 h-4")} />
                                        <div className={cn("font-mono text-white/20", isCompact ? "text-[6px]" : "text-[8px]")}>SEQ-0{i + 1}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className={cn("w-full bg-white/10 rounded-full", isCompact ? "h-0.5" : "h-1")} />
                                        <div className={cn("w-2/3 bg-white/5 rounded-full", isCompact ? "h-0.5" : "h-1")} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div
                            animate={{ x: [-100, 100] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute top-1/2 left-0 w-20 h-[1px] bg-gradient-to-r from-transparent via-[#efef39] to-transparent"
                        />
                    </div>
                );
            case 3: // Human Validation
                return (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className={cn("relative flex flex-col items-center justify-center transition-all", isCompact ? "w-32 h-32" : "w-64 h-64")}
                        >
                            <div className="absolute inset-0 border border-white/5 rounded-3xl rotate-45" />
                            <div className={cn("z-10 bg-gradient-to-br from-[#efef39] to-[#d4d433] rounded-full shadow-[0_0_40px_rgba(239,239,57,0.4)] transition-all", isCompact ? "p-3" : "p-8")}>
                                <CheckCircle2 className={cn("text-black", isCompact ? "w-7 h-7" : "w-16 h-16")} />
                            </div>
                            <div className={cn("transition-all", isCompact ? "mt-4" : "mt-8")}>
                                <span className={cn("font-black uppercase tracking-[0.3em] text-[#efef39]", isCompact ? "text-[6px]" : "text-[10px]")}>System Verified</span>
                                {!isCompact && <div className="mt-2 h-0.5 w-12 bg-[#efef39]/50 mx-auto" />}
                            </div>
                        </motion.div>
                    </div>
                );
            case 4: // Sales Handoff
                return (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className={cn("relative z-10 bg-white/[0.03] border border-white/10 backdrop-blur-3xl rounded-3xl shadow-2xl transition-all", isCompact ? "w-32 h-36 p-4" : "w-48 h-56 p-6")}
                        >
                            <div className={cn("flex justify-between items-center", isCompact ? "mb-3" : "mb-6")}>
                                <div className={cn("rounded-lg bg-[#33b5ff] flex items-center justify-center", isCompact ? "w-6 h-6" : "w-8 h-8")}>
                                    <Send className={cn("text-white", isCompact ? "w-3 h-3" : "w-4 h-4")} />
                                </div>
                                <div className={cn("bg-white/10 rounded-full", isCompact ? "h-1 w-8" : "h-2 w-12")} />
                            </div>
                            <div className={isCompact ? "space-y-2" : "space-y-4"}>
                                <div className={cn("w-full bg-white/10 rounded-full", isCompact ? "h-1" : "h-1.5")} />
                                <div className={cn("w-full bg-white/10 rounded-full", isCompact ? "h-1" : "h-1.5")} />
                                <div className={cn("w-3/4 bg-white/5 rounded-full", isCompact ? "h-1" : "h-1.5")} />
                            </div>
                            <div className={cn("border-t border-white/10 flex justify-between items-center", isCompact ? "mt-4 pt-4" : "mt-8 pt-6")}>
                                <div className="flex -space-x-2">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className={cn("rounded-full border-2 border-black bg-white/10", isCompact ? "w-4 h-4" : "w-6 h-6")} />
                                    ))}
                                </div>
                                <div className={cn("rounded-full bg-[#33b5ff]/20 flex items-center justify-center", isCompact ? "w-4 h-4" : "w-6 h-6")}>
                                    <div className={cn("bg-[#33b5ff] rounded-full animate-pulse", isCompact ? "w-1 h-1" : "w-1.5 h-1.5")} />
                                </div>
                            </div>
                        </motion.div>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(1,88,230,0.1)_0%,transparent_70%)]" />
                    </div>
                );
            case 5: // Pipeline Optimization
                return (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className={cn("border border-white/5 rounded-full relative transition-all", isCompact ? "w-36 h-36" : "w-72 h-72")}
                        >
                            {[...Array(12)].map((_, i) => (
                                <div key={i} style={{ rotate: `${i * 30}deg` }} className="absolute inset-x-0 top-0 flex justify-center -mt-1">
                                    <div className={cn("bg-white/20", isCompact ? "w-[0.5px] h-2" : "w-[1px] h-4")} />
                                </div>
                            ))}
                        </motion.div>
                        <div className={cn("absolute z-10 bg-black/80 border border-white/10 backdrop-blur-2xl rounded-[40px] shadow-2xl flex flex-col items-center transition-all", isCompact ? "p-4" : "p-8")}>
                            <BarChart3 className={cn("text-[#33b5ff] transition-all", isCompact ? "w-6 h-6 mb-2" : "w-12 h-12 mb-4")} />
                            <div className={cn("flex gap-1 items-end", isCompact ? "h-4" : "h-8")}>
                                {[3, 5, 2, 7, 4].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: isCompact ? h * 2 : h * 4 }}
                                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1, repeatType: "reverse" }}
                                        className={cn("bg-[#33b5ff] rounded-t-sm", isCompact ? "w-1" : "w-1.5")}
                                    />
                                ))}
                            </div>
                            {!isCompact && <div className="mt-4 text-[8px] font-mono text-white/40 tracking-[0.4em] uppercase">Optimizing</div>}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={cn(
            "relative aspect-square transition-all duration-700 ease-out",
            isCompact
                ? "w-20 h-20 lg:w-24 lg:h-24 bg-white/[0.03] backdrop-blur-md rounded-2xl border border-white/10"
                : "w-full max-w-[350px] lg:max-w-[550px] bg-black/40 rounded-[48px] border border-white/5 overflow-hidden backdrop-blur-sm group shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]"
        )}>
            {/* Background Texture for V2 */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:20px_20px]" />

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    className={cn("absolute inset-0 flex items-center justify-center", isCompact ? "p-0" : "p-8")}
                >
                    <div className={cn(
                        "relative w-full h-full",
                        isCompact ? "scale-[0.55] sm:scale-[0.6] lg:scale-[0.4]" : "scale-100"
                    )}>
                        {renderVisual()}
                    </div>
                </motion.div>
            </AnimatePresence>

            {!isCompact && (
                <>
                    {/* Minimalist Accents */}
                    <div className="absolute top-10 right-10 flex flex-col items-end gap-1">
                        <div className="w-8 h-[1px] bg-white/20" />
                        <div className="w-4 h-[1px] bg-white/10" />
                    </div>

                    {/* Floating Phase Badge */}
                    <div className="absolute top-10 left-10 py-1.5 px-3 bg-white/5 rounded-md border border-white/10 backdrop-blur-md">
                        <span className="text-[9px] font-mono font-bold text-white/40 tracking-wider">REF. LAB // 0{activeStep + 1}</span>
                    </div>

                    {/* Stage Label */}
                    <div className="absolute bottom-10 left-10 flex items-center gap-4">
                        <div className="h-6 w-[1px] bg-[#33b5ff]" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.1em] text-white/60">Stage Status</span>
                            <span className="text-[11px] font-bold text-[#33b5ff] uppercase">In Progress</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
