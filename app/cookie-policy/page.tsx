"use client";

import { Container } from "@/components/ui/container";
import { cookiePolicyContent } from "@/data/privacy-policy-data";
import { motion } from "framer-motion";

export default function CookiePolicyPage() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] overflow-hidden antialiased pt-28 md:pt-40 pb-12 md:pb-24">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(239,239,57,0.05)_0%,transparent_50%)]" />

            <Container className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto mb-16 text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight uppercase">
                        {cookiePolicyContent.title}
                    </h1>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#efef39]/30 bg-[#efef39]/10 backdrop-blur-sm">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#efef39]">
                            Effective Date: {cookiePolicyContent.lastUpdated}
                        </span>
                    </div>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-16">
                    {cookiePolicyContent.sections.map((section) => (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl font-bold text-white uppercase tracking-wider border-l-4 border-[#efef39] pl-6">
                                {section.title}
                            </h2>

                            <div className="space-y-4 text-neutral-400 leading-relaxed text-lg ml-10">
                                {section.content.map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>

                            {section.subsections && (
                                <div className="space-y-8 ml-10 mt-10">
                                    {section.subsections.map((sub, i) => (
                                        <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#efef39]/30 transition-colors group">
                                            <h4 className="text-xl font-bold text-[#33b5ff] mb-4 group-hover:text-[#efef39] transition-colors">
                                                {sub.title}
                                            </h4>
                                            <div className="space-y-4 text-neutral-400 leading-relaxed text-base">
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
