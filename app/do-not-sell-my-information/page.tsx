"use client";

import { Container } from "@/components/ui/container";
import { doNotSellContent, gdprContent } from "@/data/privacy-policy-data";
import { motion } from "framer-motion";

export default function DoNotSellPage() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] overflow-hidden antialiased pt-28 md:pt-40 pb-12 md:pb-24">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(1,88,230,0.05)_0%,transparent_50%)]" />

            <Container className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto mb-16 text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight uppercase">
                        {doNotSellContent.title}
                    </h1>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#efef39]/30 bg-[#efef39]/10 backdrop-blur-sm">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#efef39]">
                            Effective Date: 24 December 2022
                        </span>
                    </div>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-24">
                    {/* CCPA Section */}
                    <div className="space-y-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#0158e6]/5 border-l-4 border-[#0158e6] p-8 rounded-r-3xl"
                        >
                            <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4">
                                CALIFORNIA PRIVACY RIGHTS
                            </h2>
                            <p className="text-[#33b5ff] font-medium">{doNotSellContent.subtitle}</p>
                        </motion.div>

                        <div className="space-y-6 text-neutral-400 leading-relaxed text-lg ml-10">
                            {doNotSellContent.intro.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>

                        {doNotSellContent.sections.map((section, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="space-y-6"
                            >
                                <h3 className="text-2xl font-bold text-white uppercase tracking-wider border-l-4 border-[#0158e6] pl-6">
                                    {section.title}
                                </h3>
                                <div className="space-y-4 text-neutral-400 leading-relaxed text-lg ml-10">
                                    {section.content.map((p, i) => (
                                        <p key={i}>{p}</p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    {/* GDPR Section */}
                    <div className="space-y-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                                {gdprContent.title}
                            </h2>
                            <div className="w-20 h-1 bg-[#33b5ff] mx-auto" />
                        </motion.div>

                        {gdprContent.sections.map((section, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="space-y-6"
                            >
                                <h3 className="text-2xl font-bold text-white uppercase tracking-wider">
                                    {section.title}
                                </h3>
                                <div className="space-y-4 text-neutral-400 leading-relaxed text-lg">
                                    {section.content.map((p, i) => (
                                        <p key={i}>{p}</p>
                                    ))}
                                </div>

                                {section.subsections && (
                                    <div className="grid md:grid-cols-2 gap-8 mt-8">
                                        {section.subsections.map((sub, i) => (
                                            <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                                <h4 className="text-lg font-bold text-[#33b5ff] mb-4">
                                                    {sub.title}
                                                </h4>
                                                <div className="space-y-3 text-sm text-neutral-400 font-mono">
                                                    {sub.content.map((p, j) => (
                                                        <p key={j}>{p}</p>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
}
