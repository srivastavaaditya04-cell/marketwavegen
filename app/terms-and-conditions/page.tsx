"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { termsContent } from "@/data/terms-data";
import { motion } from "framer-motion";

export default function TermsPage() {
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
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        {termsContent.title}
                    </h1>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#efef39]/30 bg-[#efef39]/10 backdrop-blur-sm">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#efef39]">
                            Effective Date: {termsContent.effectiveDate}
                        </span>
                    </div>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-16">
                    {/* Introduction */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold text-[#33b5ff] uppercase tracking-wider">
                            {termsContent.introduction.title}
                        </h2>
                        <div className="space-y-4 text-neutral-400 leading-relaxed text-lg">
                            {termsContent.introduction.content.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>
                    </motion.div>

                    {/* Main Sections */}
                    {termsContent.sections.map((section, idx) => (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl font-bold text-white uppercase tracking-wider border-l-4 border-[#0158e6] pl-6">
                                {section.title}
                            </h2>

                            {section.content && (
                                <div className="space-y-4 text-neutral-400 leading-relaxed text-lg ml-7">
                                    {section.content.map((p, i) => (
                                        <p key={i}>{p}</p>
                                    ))}
                                </div>
                            )}

                            {section.items && (
                                <ul className="space-y-4 text-neutral-400 leading-relaxed text-lg ml-7 list-disc pl-5">
                                    {section.items.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            )}

                            {section.subsections && (
                                <div className="space-y-10 ml-7">
                                    {section.subsections.map((sub, i) => (
                                        <div key={i} className="space-y-4">
                                            <h3 className="text-xl font-bold text-[#efef39]">
                                                {sub.title}
                                            </h3>
                                            <div className="space-y-4 text-neutral-400 leading-relaxed text-lg">
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
            </Container>
        </div>
    );
}
