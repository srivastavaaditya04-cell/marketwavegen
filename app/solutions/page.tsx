"use client";

import { Container } from "@/components/ui/container";
import { solutionsData, solutionsFAQ } from "@/data/solutions-data";
import { FAQ } from "@/components/sections/faq";
import {
    DataVisual,
    ContentVisual,
    LanguageVisual,
    MantechVisual,
    EngineVisual,
    LPVisual,
    EmailVisual
} from "@/components/sections/solution-visuals";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const visuals = [
    DataVisual,
    ContentVisual,
    LanguageVisual,
    MantechVisual,
    EngineVisual,
    LPVisual,
    EmailVisual
];

export default function SolutionsPage() {
    return (
        <div className="relative min-h-screen w-full bg-[#0A0A0A] overflow-hidden antialiased pt-28 md:pt-40 pb-12 md:pb-24">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(1,88,230,0.05),transparent_40%)]" />

            <Container className="relative z-10">
                {/* Header */}
                <div className="mb-12 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-6xl"
                    >
                        <h1 className="text-3xl md:text-6xl font-bold text-white mb-6 tracking-normal leading-none">
                            Intelligence, Localization, and<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0158e6] to-[#33b5ff]">Execution Working as One System</span>
                        </h1>
                       
                         <h2 className="text-xl md:text-2xl font-light text-white/90 border-l-4 border-[#efef39] pl-4 italic mb-8">
                            Your data, content, signals, and outreach connected end-to-end.
                            </h2>
                    </motion.div>
                </div>

                {/* Solutions List (Zig Zag Layout) */}
                <div className="flex flex-col gap-16 md:gap-32">
                    {solutionsData.map((solution, idx) => {
                        const VisualComponent = visuals[idx];
                        const isEven = idx % 2 === 0;

                        return (
                            <div
                                key={solution.id}
                                className={cn(
                                    "flex flex-col md:flex-row items-center gap-12 md:gap-20",
                                    !isEven && "md:flex-row-reverse"
                                )}
                            >
                                {/* Text Content */}
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="flex-1 space-y-8"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-4xl md:text-5xl font-bold text-white/10">{solution.id}</span>
                                        <div className="h-px bg-white/10 flex-1" />
                                    </div>

                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{solution.title}</h2>
                                        <p className="text-lg text-[#33b5ff] mb-6">{solution.subtitle}</p>
                                    </div>

                                    {/* Details List */}
                                    <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">
                                            {solution.details.title}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {solution.details.items.map((item, i) => (
                                                <span key={i} className="px-3 py-1 bg-black/40 border border-white/10 rounded-full text-sm text-neutral-300">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Outcome */}
                                    <div className="flex items-start gap-4 p-4 rounded-xl">
                                        <div className="p-2 bg-[#0158e6]/10 rounded-lg shrink-0">
                                            <CheckCircle2 className="w-5 h-5 text-[#0158e6]" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-[#0158e6] mb-1">
                                                You Get
                                            </h4>
                                            <p className="text-white font-medium">
                                                {solution.outcome}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Visual Side */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="flex-1 w-full aspect-[4/3] max-w-lg"
                                >
                                    <VisualComponent />
                                </motion.div>
                            </div>
                        );
                    })}
                </div>

                {/* FAQ Section */}
                <div className="mt-32">
                    <FAQ items={solutionsFAQ} variant="embedded" />
                </div>

            </Container>
        </div>
    );
}
