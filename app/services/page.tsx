"use client";

import { Container } from "@/components/ui/container";
import { services } from "@/data";
import { servicesFAQ } from "@/data/services-data";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FAQ } from "@/components/sections/faq";

export default function ServicesPage() {
    return (
        <div className="relative min-h-screen w-full bg-[#0A0A0A] overflow-hidden antialiased pt-28 md:pt-40 pb-12 md:pb-24">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(51,181,255,0.05)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(1,88,230,0.05)_0%,transparent_50%)]" />

            <Container className="relative z-10">
                <div className="mb-12 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-5xl"
                    >
                        <h1 className="text-3xl md:text-6xl font-bold text-white mb-6 tracking-normal leading-none">
                            Services Built for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0158e6] to-[#33b5ff]">Revenue Orchestration</span>
                        </h1>
                         <h2 className="text-xl md:text-2xl font-light text-white/90 border-l-4 border-[#efef39] pl-4 italic mb-6">
                               Designed for Continuous Growth.
                            </h2>
                        <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed">
                            You need pipeline that converts. Each service is measured by opportunity creation, not volume.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {services.map((service, idx) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group relative bg-white/5 border border-white/5 rounded-3xl p-8 hover:bg-white/[0.07] hover:border-white/10 transition-all duration-300"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <span className={cn(
                                    "px-3 py-1 bg-white/5 text-white/50 rounded-lg text-sm font-mono font-bold border border-white/5",
                                    "group-hover:text-[#33b5ff] group-hover:border-[#33b5ff]/30 group-hover:bg-[#33b5ff]/10 transition-colors"
                                )}>
                                    {service.id}.
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-8 group-hover:text-[#33b5ff] transition-colors">
                                {service.title}
                            </h3>

                            <div className="space-y-8">
                                {/* Problem Section */}
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Problem</h4>
                                    <p className="text-neutral-300 leading-relaxed text-sm md:text-base">
                                        {service.problem}
                                    </p>
                                </div>

                                {/* Divider */}
                                <div className="h-px w-full bg-white/5" />

                                {/* What We Do Section */}
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#0158e6] mb-2">What We Do</h4>
                                    <p className="text-white leading-relaxed text-sm md:text-base">
                                        {service.whatWeDo}
                                    </p>
                                </div>

                                {/* You Get Section */}
                                <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#33b5ff] mb-2 flex items-center gap-2">
                                        <CheckCircle2 className="w-3 h-3" />
                                        You Get
                                    </h4>
                                    <p className="text-white/90 text-sm font-medium">
                                        {service.youGet}
                                    </p>
                                </div>

                                {/* Proof Section - Conditional */}
                                {service.proof && (
                                    <div className="mt-4 pt-4 border-t border-white/5">
                                        <div className="flex gap-3 items-start">
                                            <span className="text-xs font-bold uppercase tracking-widest text-[#efef39] mt-1 shrink-0">Proof</span>
                                            <p className="text-neutral-400 text-sm italic">
                                                "{service.proof}"
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Hover corner accent */}
                            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <ChevronRight className="w-5 h-5 text-white/20" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="mt-32">
                    <FAQ items={servicesFAQ} variant="embedded" />
                </div>
            </Container>
        </div>
    );
}
