"use client";

import { motion } from "framer-motion";
import { Check, Mail, Globe, Activity, ArrowRight, Layout, Zap, User, FileText, BarChart3, ShieldCheck } from "lucide-react";

// --- 01. Data Empowerment Visual ---
export const DataVisual = () => (
    <div className="relative w-full h-full bg-black/40 border border-white/10 rounded-2xl p-6 overflow-hidden flex flex-col justify-center">
        {/* Glow behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#0158e6]/20 blur-3xl rounded-full" />

        <div className="space-y-3 relative z-10 max-w-[80%] mx-auto">
            {["Identity Verified", "Email Validated", "Phone Confirmed", "Consent Logged"].map((item, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 bg-white/5 border border-white/5 p-3 rounded-lg backdrop-blur-sm"
                >
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                        <Check className="w-3 h-3 text-green-400" />
                    </div>
                    <span className="text-sm font-medium text-white/90">{item}</span>
                </motion.div>
            ))}
        </div>

        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -right-6 -bottom-6 bg-[#0158e6] p-4 rounded-tl-2xl border-t border-l border-white/20 shadow-2xl"
        >
            <ShieldCheck className="w-8 h-8 text-white" />
        </motion.div>
    </div>
);

// --- 02. Content Craft Visual ---
export const ContentVisual = () => (
    <div className="relative w-full h-full flex items-center justify-center p-6">
        {/* Stacked Cards Effect */}
        {[2, 1, 0].map((idx) => (
            <motion.div
                key={idx}
                initial={{ y: 0, rotate: 0 }}
                whileInView={{ y: idx * -15, rotate: idx * -5 }}
                viewport={{ once: true }}
                className="absolute w-48 h-64 bg-neutral-900 border border-white/10 rounded-xl shadow-2xl flex flex-col items-center justify-center p-4"
                style={{ zIndex: 10 - idx }}
            >
                {idx === 0 && <FileText className="w-12 h-12 text-[#33b5ff] mb-4" />}
                {idx === 1 && <BarChart3 className="w-12 h-12 text-purple-400 mb-4" />}
                {idx === 2 && <User className="w-12 h-12 text-pink-400 mb-4" />}

                <div className="w-full h-2 bg-white/10 rounded full mb-2" />
                <div className="w-2/3 h-2 bg-white/10 rounded full mb-2" />
                <div className="w-3/4 h-2 bg-white/10 rounded full" />
            </motion.div>
        ))}
    </div>
);

// --- 03. Language Visual ---
export const LanguageVisual = () => (
    <div className="relative w-full h-full bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
        {/* Abstract Map Background */}
        <div className="absolute inset-0 opacity-20">
            <Globe className="w-full h-full stroke-1 text-white" />
        </div>

        {/* Floating Region Tags */}
        <div className="absolute inset-0">
            {[
                { label: "DACH", x: "20%", y: "30%", color: "#33b5ff" },
                { label: "LATAM", x: "30%", y: "70%", color: "#0158e6" },
                { label: "APAC", x: "70%", y: "40%", color: "#efef39" },
                { label: "EMEA", x: "50%", y: "30%", color: "#purple-400" },
            ].map((region, idx) => (
                <motion.div
                    key={idx}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: idx * 0.2 }}
                    className="absolute px-3 py-1 bg-black/80 border rounded-full text-xs font-bold backdrop-blur-md shadow-lg"
                    style={{ left: region.x, top: region.y, borderColor: region.color, color: 'white' }}
                >
                    {region.label}
                </motion.div>
            ))}
        </div>
    </div>
);

// --- 04. Mantech Mark Visual ---
export const MantechVisual = () => (
    <div className="relative w-full h-full bg-black border border-white/10 rounded-2xl p-6 flex flex-col justify-between overflow-hidden">
        <div className="flex justify-between items-center mb-8">
            <h4 className="text-white font-bold text-sm">Signal Velocity</h4>
            <span className="text-[#efef39] text-xs font-mono">LIVE</span>
        </div>

        {/* Animated Graph Line */}
        <div className="flex items-end gap-1 h-32 w-full">
            {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ height: "20%" }}
                    animate={{ height: ["20%", `${Math.random() * 80 + 20}%`, "20%"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                    className="flex-1 bg-gradient-to-t from-[#0158e6] to-[#33b5ff] rounded-t-sm opacity-60"
                />
            ))}
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 flex justify-between">
            <div className="text-xs text-neutral-400">Total Signals</div>
            <div className="text-sm font-bold text-white">32,450,192</div>
        </div>
    </div>
);

// --- 05. Unified Engine Visual ---
export const EngineVisual = () => (
    <div className="relative w-full h-full flex items-center justify-center bg-black/40 border border-white/10 rounded-2xl p-4">
        <div className="flex items-center gap-2">
            {["Data", "Signal", "Pipeline"].map((step, idx) => (
                <div key={idx} className="flex items-center gap-2">
                    <motion.div
                        initial={{ opacity: 0.5, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: idx * 0.5 }}
                        className="w-16 h-16 md:w-20 md:h-20 bg-[#white]/5 border border-white/10 rounded-full flex flex-col items-center justify-center text-center bg-black"
                    >
                        <div className="w-2 h-2 rounded-full bg-[#33b5ff] mb-2" />
                        <span className="text-[10px] uppercase font-bold text-white/80">{step}</span>
                    </motion.div>

                    {idx < 2 && (
                        <div className="w-8 h-px bg-white/20 relative">
                            <motion.div
                                animate={{ x: [0, 32] }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 bg-white rounded-full opacity-50"
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
);

// --- 06. Landing Page Visual ---
export const LPVisual = () => (
    <div className="relative w-full h-full p-8 flex items-center justify-center">
        <div className="w-full aspect-video bg-neutral-900 border border-white/10 rounded-lg overflow-hidden flex flex-col shadow-2xl">
            <div className="h-6 bg-neutral-800 border-b border-white/5 flex items-center px-2 gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="h-4 w-3/4 bg-white/20 rounded-md"
                    />
                    <div className="h-24 bg-[#0158e6]/10 rounded-md border border-[#0158e6]/20" />
                </div>
                <div className="flex items-center justify-center">
                    <Layout className="w-12 h-12 text-white/20" />
                </div>
            </div>
        </div>
    </div>
);

// --- 07. Email Visual ---
export const EmailVisual = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="w-64 bg-[#0a0a0a] border border-white/10 rounded-xl p-4 shadow-2xl relative"
        >
            <div className="absolute -top-3 -right-3 bg-red-500 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-black">1</div>

            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                    <div className="h-2 w-24 bg-white/20 rounded mb-1" />
                    <div className="h-1.5 w-16 bg-white/10 rounded" />
                </div>
            </div>

            <div className="space-y-2">
                <div className="h-2 w-full bg-white/5 rounded" />
                <div className="h-2 w-full bg-white/5 rounded" />
                <div className="h-2 w-2/3 bg-white/5 rounded" />
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
                <div className="w-full h-8 bg-[#0158e6] rounded-md flex items-center justify-center text-xs font-bold text-white">
                    Review Proposal
                </div>
            </div>
        </motion.div>
    </div>
);
