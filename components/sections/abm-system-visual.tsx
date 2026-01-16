"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface OSNodeProps {
    title: string;
    isActive?: boolean;
    color: string;
    className?: string;
}

function OSNode({ title, isActive, color, className }: OSNodeProps) {
    return (
        <motion.div
            animate={{
                scale: isActive ? 1.1 : 1,
                boxShadow: isActive ? `0 0 20px ${color}40` : "0 0 0px transparent"
            }}
            className={cn(
                "px-3 py-1.5 md:p-4 rounded-xl md:rounded-[2rem] border backdrop-blur-md flex items-center justify-center transition-all duration-500",
                isActive ? "bg-white/10 border-white/20" : "bg-white/5 border-white/5",
                className
            )}
        >
            <span className={cn("text-[9px] md:text-xs font-bold uppercase tracking-tight md:tracking-widest", isActive ? "text-white" : "text-white/40")}>
                {title}
            </span>
        </motion.div>
    );
}

export function OperatingSystemVisual({ activeStep }: { activeStep: number | null }) {
    return (
        <div className="relative w-full aspect-square max-w-[320px] sm:max-w-[400px] lg:max-w-[500px] flex items-center justify-center p-8 lg:p-12">
            {/* Grid Background Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

            {/* SVG Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
                {/* Connection Paths - Precisely aligned to Triangle (Top-Left: 128,143 | Top-Right: 272,143 | Bottom: 200,285) */}
                <path d="M 80 80 L 128 135" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" className="opacity-10" />
                <path d="M 320 80 L 272 135" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" className="opacity-10" />
                <path d="M 200 340 L 200 285" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" className="opacity-10" />

                {/* --- STANDARD DATA FLOW (Always Active, Highlights on Step) --- */}

                {/* Global Data -> Engine */}
                <motion.circle r="2" fill="#0158e6">
                    <animateMotion
                        path="M 80 80 L 128 143"
                        dur={activeStep === 0 ? "1s" : "3s"}
                        repeatCount="indefinite"
                        keyPoints="0;1"
                        keyTimes="0;1"
                    />
                    <animate attributeName="opacity" values={activeStep === 0 ? "1;0.5;1" : "0.3;0.1;0.3"} dur="2s" repeatCount="indefinite" />
                    <animate attributeName="r" values={activeStep === 0 ? "3;2;3" : "2"} dur="2s" repeatCount="indefinite" />
                </motion.circle>

                {/* Technographics -> Engine */}
                <motion.circle r="2" fill="#33b5ff">
                    <animateMotion
                        path="M 320 80 L 272 143"
                        dur={activeStep === 1 ? "1s" : "3s"}
                        repeatCount="indefinite"
                        keyPoints="0;1"
                        keyTimes="0;1"
                    />
                    <animate attributeName="opacity" values={activeStep === 1 ? "1;0.5;1" : "0.3;0.1;0.3"} dur="2s" repeatCount="indefinite" />
                    <animate attributeName="r" values={activeStep === 1 ? "3;2;3" : "2"} dur="2s" repeatCount="indefinite" />
                </motion.circle>

                {/* Engine -> Intent Score */}
                <motion.circle r="2" fill="#efef39">
                    <animateMotion
                        path="M 200 285 L 200 340"
                        dur={activeStep === 3 ? "1s" : "3s"}
                        repeatCount="indefinite"
                        keyPoints="0;1"
                        keyTimes="0;1"
                    />
                    <animate attributeName="opacity" values={activeStep === 3 ? "1;0.5;1" : "0.3;0.1;0.3"} dur="2s" repeatCount="indefinite" />
                    <animate attributeName="r" values={activeStep === 3 ? "3;2;3" : "2"} dur="2s" repeatCount="indefinite" />
                </motion.circle>

                {/* --- BUYING BEHAVIOR SPECIAL FLOW (Active only on Step 2) --- */}
                {/* Outward Burst from Engine to All Nodes */}
                {activeStep === 2 && (
                    <>
                        <motion.circle r="2" fill="white" opacity="0.8">
                            <animateMotion path="M 128 143 L 80 80" dur="0.8s" repeatCount="indefinite" />
                        </motion.circle>
                        <motion.circle r="2" fill="white" opacity="0.8">
                            <animateMotion path="M 272 143 L 320 80" dur="0.8s" repeatCount="indefinite" />
                        </motion.circle>
                        <motion.circle r="2" fill="white" opacity="0.8">
                            <animateMotion path="M 200 340 L 200 285" dur="0.8s" repeatCount="indefinite" />
                        </motion.circle>
                    </>
                )}
            </svg>

            {/* Input Nodes */}
            <OSNode
                title="Global Data"
                color="#0158e6"
                isActive={activeStep === 0}
                className="absolute top-[8%] left-[5%] md:top-[15%] md:left-[10%]"
            />
            <OSNode
                title="Technographics"
                color="#33b5ff"
                isActive={activeStep === 1}
                className="absolute top-[8%] right-[5%] md:top-[15%] md:right-[10%]"
            />
            <OSNode
                title="Intent Score"
                color="#efef39"
                isActive={activeStep === 3}
                className="absolute bottom-[5%] md:bottom-[15%] left-1/2 -translate-x-1/2"
            />

            {/* Central Processing Core */}
            {/* Central Processing Core - Triangle Shape */}
            <motion.div
                animate={{
                    scale: activeStep === 2 ? 1.05 : 1,
                    filter: activeStep === 2 ? "drop-shadow(0 0 15px rgba(255,255,255,0.2))" : "drop-shadow(0 0 0px transparent)"
                }}
                className="z-10 w-32 h-28 sm:w-48 sm:h-44 relative flex items-start justify-center pt-6 sm:pt-10 drop-shadow-2xl transition-all duration-500"
            >
                {/* Triangle Shape - Pointing Down */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        d="M 5 5 L 95 5 L 50 85 Z"
                        className="fill-black"
                        stroke="white"
                        strokeOpacity={activeStep === 2 ? 0.8 : 0.2}
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />
                </svg>

                <span className="relative z-10 text-white font-black text-[8px] md:text-sm tracking-tighter uppercase leading-none text-center">
                    Intent<br />Engine™
                </span>
            </motion.div>

            {/* Outer Ring Decoration */}
            <div className="absolute inset-0 border border-white/[0.03] rounded-full scale-[1.1]" />
            <div className="absolute inset-0 border border-white/[0.02] rounded-full scale-[1.4]" />
        </div>
    );
}
